// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import type { Plugin } from "vite";

// Fotos locales (rama sin Lovable): si existe src/assets/fotos/<nombre>.(webp|png|jpg|jpeg), se usa esa
// en lugar de la URL alojada en Lovable. Así la app funciona fuera de Lovable sin tocar
// los componentes, que siguen importando los archivos *.asset.json.
const VIRTUAL = "\0drop-photo:";
const FALLBACKS = ["album-cover", "drop-photo-18", "drop-photo-19"];
const LOCAL_EXTS = [".webp", ".avif", ".png", ".jpg", ".jpeg"];
function localPhotos(): Plugin {
  return {
    name: "drop-local-photos",
    enforce: "pre",
    async resolveId(source, importer, options) {
      if (!source.endsWith(".asset.json")) return null;
      const resolved = await this.resolve(source, importer, { ...options, skipSelf: true });
      return resolved ? VIRTUAL + resolved.id + ".js" : null;
    },
    load(id) {
      if (!id.startsWith(VIRTUAL)) return null;
      const file = id.slice(VIRTUAL.length, -".js".length);
      const meta = JSON.parse(readFileSync(file, "utf8")) as { original_filename?: string; url: string };
      const original = meta.original_filename ?? basename(file, ".asset.json");
      const stem = basename(original, extname(original));
      const folder = join(dirname(file), "fotos");
      const find = (base: string, name: string) =>
        [name, ...LOCAL_EXTS.map((ext) => base + ext)].map((n) => join(folder, n)).find((c) => existsSync(c));
      // Si falta una foto (por ejemplo, avatares de fans de demo), se usa una portada local
      // para que no aparezcan imágenes rotas fuera de Lovable.
      const local = find(stem, original) ?? FALLBACKS.map((f) => find(f, f)).find(Boolean);
      // Sin foto local se mantiene la URL alojada en Lovable.
      const url = local ? `import url from ${JSON.stringify(local + "?url")};` : `const url = ${JSON.stringify(meta.url)};`;
      return `${url}\nexport default { ...${JSON.stringify(meta)}, url };`;
    },
  };
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [localPhotos()],
  },
});
