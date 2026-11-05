// Build de DROP.
// - Localmente (o con "npm run build:prebuilt"): compila con Vite.
// - En Cloudflare (Workers Builds) el build del servidor falla por cómo resuelve paquetes ese entorno,
//   así que se usa la versión ya compilada que está en prebuilt/ (se genera con "npm run build:prebuilt").
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from "node:fs";

const run = (cmd) => execSync(cmd, { stdio: "inherit" });
const usePrebuilt = process.env.WORKERS_CI && existsSync("prebuilt/.output/server/wrangler.json");

if (usePrebuilt) {
  console.log("Usando la versión precompilada de prebuilt/ (" + readFileSync("prebuilt/STAMP", "utf8").trim() + ")");
  rmSync(".output", { recursive: true, force: true });
  cpSync("prebuilt/.output", ".output", { recursive: true });
} else {
  run("npx vite build");
}
mkdirSync(".wrangler/deploy", { recursive: true });
writeFileSync(".wrangler/deploy/config.json", JSON.stringify({ configPath: "../../.output/server/wrangler.json" }));

if (process.argv.includes("--save-prebuilt")) {
  rmSync("prebuilt", { recursive: true, force: true });
  mkdirSync("prebuilt", { recursive: true });
  cpSync(".output", "prebuilt/.output", { recursive: true });
  let rev = "sin git";
  try { rev = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim(); } catch { /* sin git */ }
  writeFileSync("prebuilt/STAMP", `compilado sobre ${rev} el ${new Date().toISOString()}\n`);
  console.log("Guardado en prebuilt/. Commitealo junto con los cambios.");
}
