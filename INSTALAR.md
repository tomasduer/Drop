# DROP sin Lovable

Esta rama (`sin-lovable`) corre la app con tu propio Supabase y tu propio hosting.
Las pantallas y la lógica son las mismas que en Lovable.

## 1. Base de datos (Supabase)
1. Creá un proyecto gratis en https://supabase.com.
2. En **SQL Editor**, pegá todo el contenido de `supabase/instalar-base.sql` y tocá **Run**.
   Crea las 16 tablas, las funciones de puntos y los permisos.
3. Cargá el contenido (campañas, misiones, reglas de validación y shows) exportado de Lovable Cloud.
   Usá **Table Editor → Import data from CSV**, en este orden: `campaigns`, `missions`,
   `mission_validation_rules`, `reward_catalog`, `shows`.
4. En **Authentication → Providers**, activá **Email** y **Google**. Google necesita un
   Client ID y un Secret de Google Cloud; la guía está en la página del proveedor.
5. En **Authentication → URL Configuration**, poné como Site URL el link donde publiques la app
   y agregá `https://TU-LINK/auth` y `https://TU-LINK/explorar` a Redirect URLs.

## 2. Claves
Copiá `.env.example` como `.env` y completalo con **Project Settings → API**.

## 3. Fotos
Poné las imágenes en `src/assets/fotos/` con el mismo nombre que su archivo `*.asset.json`
(por ejemplo `album-cover.png` o `album-cover.webp`). Si una foto no está ahí, la app usa la
copia de Lovable, que solo carga desde el dominio de Lovable.

## 4. Correr y publicar
```bash
npm install
npx vite dev --host 127.0.0.1   # local
npm run build                   # genera .output/
npx wrangler login && npx wrangler deploy --config .output/server/wrangler.json   # publica en Cloudflare (gratis)
```
En Cloudflare, cargá las mismas variables del `.env` (Settings → Variables); marcá
`SUPABASE_SERVICE_ROLE_KEY` como secreta.
