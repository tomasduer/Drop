// En Cloudflare (Workers Builds) npm instala con la estrategia "linked" (node_modules/.store),
// y con esa estructura Vite no encuentra dependencias internas como "isbot" o "@tanstack/query-core".
// Si detectamos esa instalación, reinstalamos todo con la estructura clásica ("hoisted").
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
if (process.env.WORKERS_CI || process.env.FORCE_CI_INSTALL) {
  if (existsSync("node_modules/.store")) {
    console.log("Instalación 'linked' detectada: reinstalando con install-strategy=hoisted…");
    execSync("rm -rf node_modules", { stdio: "inherit" });
    execSync("npm ci --install-strategy=hoisted --include=dev --no-audit --no-fund", {
      stdio: "inherit",
      env: { ...process.env, npm_config_install_strategy: "hoisted" },
    });
  } else {
    console.log("Dependencias con estructura hoisted: nada que hacer.");
  }
}

// Diagnóstico para el log de Cloudflare.
if (process.env.WORKERS_CI || process.env.FORCE_CI_INSTALL) {
  try {
    const { createRequire } = await import("node:module");
    const req = createRequire(import.meta.url);
    console.log("isbot ->", req.resolve("isbot", { paths: [process.cwd()] }));
    console.log("isbot instalado:", existsSync("node_modules/isbot/index.mjs"), "| node", process.version, "| cwd", process.cwd());
  } catch (e) { console.log("isbot NO se resuelve:", e.message); }
}
