// Conexión con Spotify (Authorization Code + PKCE, sin secreto). Sirve para validar misiones de escucha
// leyendo las reproducciones recientes del fan. La app de Spotify está en modo desarrollo: solo
// funcionan las cuentas cargadas en "User Management" del panel de Spotify.
export const SPOTIFY_CLIENT_ID = "9075c340b88a4378b3dc2ff2bf524787";
const SCOPES = "user-read-recently-played user-library-read user-library-modify";
const TOKENS = "drop-spotify";
const PENDING = "drop-spotify-pkce";

type Tokens = { access: string; refresh: string; expires: number; scope?: string };
export type RecentPlay = { id: string; name: string; artists: string[]; playedAt: string };

const redirectUri = () => `${window.location.origin}/spotify`;

function readTokens(): Tokens | null {
  try { return JSON.parse(localStorage.getItem(TOKENS) ?? "null") as Tokens | null; } catch { return null; }
}
function saveTokens(t: Tokens | null) {
  try { if (t) localStorage.setItem(TOKENS, JSON.stringify(t)); else localStorage.removeItem(TOKENS); } catch { /* sin almacenamiento */ }
  window.dispatchEvent(new Event("drop-spotify"));
}
export const isSpotifyConnected = () => readTokens() !== null;
/** Las conexiones viejas no tienen permiso para guardar en la biblioteca: hay que reconectar. */
export const canSaveToLibrary = () => (readTokens()?.scope ?? "").includes("user-library-modify");
export const disconnectSpotify = () => saveTokens(null);

const b64url = (bytes: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/** Manda al fan a Spotify para autorizar; vuelve a /spotify y de ahí a `returnTo`. */
export async function connectSpotify(returnTo: string) {
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(48)));
  const challenge = b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
  const state = b64url(crypto.getRandomValues(new Uint8Array(12)));
  localStorage.setItem(PENDING, JSON.stringify({ verifier, state, returnTo }));
  const url = new URL("https://accounts.spotify.com/authorize");
  url.search = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID, response_type: "code", redirect_uri: redirectUri(), scope: SCOPES,
    code_challenge_method: "S256", code_challenge: challenge, state,
  }).toString();
  window.location.href = url.toString();
}

async function tokenRequest(body: Record<string, string>): Promise<Tokens> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: SPOTIFY_CLIENT_ID, ...body }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.access_token) throw new Error("Spotify no aceptó la conexión.");
  return { access: json.access_token, refresh: json.refresh_token ?? body.refresh_token ?? "", expires: Date.now() + (json.expires_in ?? 3600) * 1000 - 60_000, scope: json.scope ?? readTokens()?.scope };
}

/** Completa la conexión al volver de Spotify. Devuelve a dónde volver. */
export async function finishSpotifyLogin(params: URLSearchParams): Promise<string> {
  let pending: { verifier: string; state: string; returnTo: string } | null = null;
  try { pending = JSON.parse(localStorage.getItem(PENDING) ?? "null"); } catch { pending = null; }
  localStorage.removeItem(PENDING);
  const returnTo = pending?.returnTo ?? "/mi-drop";
  if (params.get("error")) throw Object.assign(new Error(params.get("error") === "access_denied" ? "Cancelaste la conexión con Spotify." : "Spotify no permitió la conexión."), { returnTo });
  const code = params.get("code");
  if (!pending || !code || params.get("state") !== pending.state) throw Object.assign(new Error("La conexión con Spotify venció. Probá de nuevo."), { returnTo });
  saveTokens(await tokenRequest({ grant_type: "authorization_code", code, redirect_uri: redirectUri(), code_verifier: pending.verifier }));
  return returnTo;
}

async function accessToken(): Promise<string> {
  const t = readTokens();
  if (!t) throw new Error("Conectá tu cuenta de Spotify.");
  if (Date.now() < t.expires) return t.access;
  try {
    const next = await tokenRequest({ grant_type: "refresh_token", refresh_token: t.refresh });
    saveTokens(next);
    return next.access;
  } catch {
    saveTokens(null);
    throw new Error("Tu sesión de Spotify venció. Conectala de nuevo.");
  }
}

/** Últimas 50 canciones que el fan escuchó (Spotify solo cuenta las que sonaron 30 segundos o más). */
export async function recentPlays(): Promise<RecentPlay[]> {
  const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", { headers: { authorization: `Bearer ${await accessToken()}` } });
  if (res.status === 401) { saveTokens(null); throw new Error("Tu sesión de Spotify venció. Conectala de nuevo."); }
  if (res.status === 403) throw new Error("Tu cuenta de Spotify todavía no está habilitada en DROP.");
  if (!res.ok) throw new Error("No pudimos leer tu actividad de Spotify.");
  const json = await res.json();
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return (json.items ?? []).map((i: any) => ({ id: i.track?.id ?? "", name: i.track?.name ?? "", artists: (i.track?.artists ?? []).map((a: any) => a.name), playedAt: i.played_at }));
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.spotify.com/v1${path}`, { ...init, headers: { authorization: `Bearer ${await accessToken()}`, ...(init.headers ?? {}) } });
  if (res.status === 401) { saveTokens(null); throw new Error("Tu sesión de Spotify venció. Conectala de nuevo."); }
  if (res.status === 403) throw new Error("Tu cuenta de Spotify todavía no está habilitada en DROP.");
  if (!res.ok) throw new Error("Spotify no respondió. Probá de nuevo.");
  return res.status === 204 || res.headers.get("content-length") === "0" ? null : res.json().catch(() => null);
}

export type SpotifyAlbum = { id: string; name: string; artist: string; cover: string; url: string };
const simplify = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Busca el álbum en Spotify. Devuelve null si todavía no salió. */
export async function findAlbum(artist: string, album: string): Promise<SpotifyAlbum | null> {
  const q = encodeURIComponent(`album:${album} artist:${artist}`);
  const json = await api(`/search?type=album&limit=10&q=${q}`);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const items: any[] = json?.albums?.items ?? [];
  const hit = items.find((a) => simplify(a.name).startsWith(simplify(album)) && (a.artists ?? []).some((x: any) => simplify(x.name) === simplify(artist)));
  /* eslint-enable @typescript-eslint/no-explicit-any */
  return hit ? { id: hit.id, name: hit.name, artist: hit.artists?.[0]?.name ?? artist, cover: hit.images?.[0]?.url ?? "", url: hit.external_urls?.spotify ?? "" } : null;
}
export async function isAlbumSaved(id: string): Promise<boolean> {
  const json = await api(`/me/albums/contains?ids=${id}`);
  return Array.isArray(json) && json[0] === true;
}
export async function saveAlbum(id: string): Promise<void> {
  await api(`/me/albums?ids=${id}`, { method: "PUT" });
}
