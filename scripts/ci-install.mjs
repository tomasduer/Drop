// En Cloudflare (Workers Builds) reinstalamos las dependencias desde cero antes de compilar:
// el caché de dependencias de Cloudflare a veces deja node_modules incompleto.
import { execSync } from "node:child_process";
if (process.env.WORKERS_CI) {
  console.log("Workers Builds: instalando dependencias limpias con npm ci…");
  execSync("npm ci --no-audit --no-fund", { stdio: "inherit" });
}
