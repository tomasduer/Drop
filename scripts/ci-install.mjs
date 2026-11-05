// En Cloudflare (Workers Builds) la instalación de dependencias deja paquetes afuera
// (por ejemplo "isbot"). Antes de compilar buscamos los que faltan y los instalamos.
import { execSync } from "node:child_process";
if (process.env.WORKERS_CI) {
  const run = (cmd) => execSync(cmd, { stdio: "inherit" });
  try { run("npm config ls"); } catch { /* solo diagnóstico */ }
  for (let round = 1; round <= 3; round++) {
    let out = "";
    try { out = execSync("npm ls --all --json", { encoding: "utf8", maxBuffer: 64 << 20, stdio: ["ignore", "pipe", "ignore"] }); }
    catch (e) { out = e.stdout?.toString() ?? ""; }
    let problems = [];
    try { problems = JSON.parse(out).problems ?? []; } catch { /* sin JSON */ }
    const missing = [...new Set(problems.map((p) => /^missing: (\S+), required by/.exec(p)?.[1]).filter(Boolean))];
    if (!missing.length) { console.log("Dependencias completas."); break; }
    console.log(`Faltan ${missing.length} paquetes, instalándolos: ${missing.join(" ")}`);
    run(`npm install --no-save --no-audit --no-fund --include=dev --include=optional --include=peer ${missing.map((m) => `"${m}"`).join(" ")}`);
  }
}
