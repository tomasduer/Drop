// En Cloudflare (Workers Builds) reinstalamos las dependencias desde cero antes de compilar,
// con un caché de npm vacío: el caché de dependencias de Cloudflare deja node_modules incompleto.
import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
if (process.env.WORKERS_CI) {
  const run = (cmd) => execSync(cmd, { stdio: "inherit" });
  run("npm --version");
  run("npm config ls");
  rmSync("node_modules", { recursive: true, force: true });
  console.log("Workers Builds: instalando dependencias limpias…");
  run("npm ci --no-audit --no-fund --cache /tmp/npm-cache-limpio --prefer-online --include=dev --include=optional --include=peer");
  for (const pkg of ["isbot", "@supabase/functions-js"]) {
    console.log(`${pkg}: ${existsSync(`node_modules/${pkg}/package.json`) ? "ok" : "FALTA"}`);
  }
}
