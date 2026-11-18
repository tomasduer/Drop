import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

// Catálogo musical público de Deezer (no necesita claves). Se consulta desde el servidor
// porque la API no habilita CORS para el navegador. Las vistas previas son de 30 segundos.
const API = 'https://api.deezer.com';

export type CatalogArtist = { id: number; name: string; picture: string; fans: number };
export type CatalogAlbum = { id: number; title: string; artist: string; artistId: number; cover: string; year: string; tracks: number; type: string };
export type CatalogTrack = { id: number; title: string; artist: string; album: string; cover: string; preview: string; duration: number; link: string };
export type CatalogSearch = { artists: CatalogArtist[]; albums: CatalogAlbum[]; tracks: CatalogTrack[] };
export type CatalogAlbumDetail = CatalogAlbum & { label: string; trackList: CatalogTrack[] };
export type CatalogArtistDetail = CatalogArtist & { top: CatalogTrack[]; albums: CatalogAlbum[] };

/* eslint-disable @typescript-eslint/no-explicit-any */
async function get(path: string): Promise<any> {
  const res = await fetch(`${API}${path}`, { headers: { accept: 'application/json', 'user-agent': 'DROP/1.0 (+https://drop.appdrop.workers.dev)' } });
  if (!res.ok) throw new Error('No pudimos conectar con el catálogo musical.');
  const json = await res.json();
  if (json?.error) throw new Error('No pudimos conectar con el catálogo musical.');
  return json;
}
const artist = (a: any): CatalogArtist => ({ id: a.id, name: a.name, picture: a.picture_medium ?? a.picture ?? '', fans: a.nb_fan ?? 0 });
const album = (a: any, fallbackArtist?: any): CatalogAlbum => ({
  id: a.id, title: a.title, artist: a.artist?.name ?? fallbackArtist?.name ?? '', artistId: a.artist?.id ?? fallbackArtist?.id ?? 0,
  cover: a.cover_medium ?? a.cover ?? '', year: (a.release_date ?? '').slice(0, 4), tracks: a.nb_tracks ?? 0, type: a.record_type ?? 'album',
});
const track = (t: any, fallbackAlbum?: any): CatalogTrack => ({
  id: t.id, title: t.title_short ?? t.title, artist: t.artist?.name ?? '', album: t.album?.title ?? fallbackAlbum?.title ?? '',
  cover: t.album?.cover_medium ?? fallbackAlbum?.cover_medium ?? '', preview: t.preview ?? '', duration: t.duration ?? 0, link: t.link ?? '',
});
/* eslint-enable @typescript-eslint/no-explicit-any */

const query = z.object({ q: z.string().trim().min(2).max(80) });
const idInput = z.object({ id: z.number().int().positive() });

export const searchCatalog = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => query.parse(input))
  .handler(async ({ data }): Promise<CatalogSearch> => {
    const q = encodeURIComponent(data.q);
    const [artists, albums, tracks] = await Promise.all([
      get(`/search/artist?q=${q}&limit=6`), get(`/search/album?q=${q}&limit=10`), get(`/search/track?q=${q}&limit=10`),
    ]);
    return {
      artists: (artists.data ?? []).map(artist),
      albums: (albums.data ?? []).map((a: unknown) => album(a)),
      tracks: (tracks.data ?? []).map((t: unknown) => track(t)).filter((t: CatalogTrack) => t.preview),
    };
  });

export const getCatalogAlbum = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => idInput.parse(input))
  .handler(async ({ data }): Promise<CatalogAlbumDetail> => {
    const a = await get(`/album/${data.id}`);
    return { ...album(a), label: a.label ?? '', trackList: (a.tracks?.data ?? []).map((t: unknown) => track(t, a)) };
  });

export const getCatalogArtist = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => idInput.parse(input))
  .handler(async ({ data }): Promise<CatalogArtistDetail> => {
    const [a, top, albums] = await Promise.all([get(`/artist/${data.id}`), get(`/artist/${data.id}/top?limit=10`), get(`/artist/${data.id}/albums?limit=25`)]);
    return { ...artist(a), top: (top.data ?? []).map((t: unknown) => track(t)), albums: (albums.data ?? []).map((x: unknown) => album(x, a)) };
  });

// Catálogo de un género: artistas, álbumes y canciones de música de ese género (no de cosas que
// tengan la palabra del género en el nombre). Parte de una lista curada de artistas y suma el
// ranking de ese género en Deezer (/editorial/{id}/charts) cuando existe.
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const hasPhoto = (a: CatalogArtist) => !!a.picture && !a.picture.includes('/artist//');
const safe = async <T,>(p: Promise<T>, fallback: T): Promise<T> => { try { return await p; } catch { return fallback; } };
export const getGenreCatalog = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ names: z.array(z.string().trim().min(1).max(60)).max(24), deezerGenre: z.number().int().positive().optional() }).parse(input))
  .handler(async ({ data }): Promise<CatalogSearch> => {
    const [resolved, chart] = await Promise.all([
      Promise.all(data.names.map((name) => safe((async () => {
        // Solo el artista con el nombre exacto y foto propia (si hay homónimos, el de más fans).
        // Nada de "el primer resultado": así no aparecen artistas equivocados con fotos raras.
        const list: CatalogArtist[] = ((await get(`/search/artist?q=${encodeURIComponent(name)}&limit=10`)).data ?? []).map(artist);
        return list.filter((a) => norm(a.name) === norm(name) && hasPhoto(a)).sort((a, b) => b.fans - a.fans)[0] ?? null;
      })(), null as CatalogArtist | null))),
      data.deezerGenre ? safe(get(`/editorial/${data.deezerGenre}/charts`), null) : Promise.resolve(null),
    ]);
    const curated = resolved.filter((a): a is CatalogArtist => !!a);
    // Para no hacer demasiados pedidos, álbumes y canciones salen de los primeros 6 artistas.
    const firsts = curated.slice(0, 6);
    const [albumLists, trackLists] = await Promise.all([
      Promise.all(firsts.map((a) => safe(get(`/artist/${a.id}/albums?limit=4`).then((r) => (r.data ?? []).map((x: unknown) => album(x, a)) as CatalogAlbum[]), [] as CatalogAlbum[]))),
      Promise.all(firsts.map((a) => safe(get(`/artist/${a.id}/top?limit=3`).then((r) => (r.data ?? []).map((t: unknown) => track(t)) as CatalogTrack[]), [] as CatalogTrack[]))),
    ]);
    // Intercala (uno de cada artista) para que no quede todo de uno solo.
    const interleave = <T,>(lists: T[][], per: number) => { const out: T[] = []; for (let i = 0; i < per; i++) for (const l of lists) if (l[i]) out.push(l[i]); return out; };
    const uniq = <T extends { id: number }>(xs: T[]) => { const seen = new Set<number>(); return xs.filter((x) => !seen.has(x.id) && !!seen.add(x.id)); };
    const chartArtists: CatalogArtist[] = (chart?.artists?.data ?? []).map(artist).filter(hasPhoto);
    const chartAlbums: CatalogAlbum[] = (chart?.albums?.data ?? []).map((x: unknown) => album(x));
    const chartTracks: CatalogTrack[] = (chart?.tracks?.data ?? []).map((t: unknown) => track(t));
    return {
      artists: uniq([...curated, ...chartArtists]).slice(0, 20),
      albums: uniq([...interleave(albumLists.map((l) => l.filter((x) => x.type === 'album')), 2), ...chartAlbums]).slice(0, 14),
      tracks: uniq([...interleave(trackLists, 2), ...chartTracks]).filter((t) => t.preview).slice(0, 14),
    };
  });

// Agenda de shows de Ticketmaster (Discovery API). Necesita el secreto TICKETMASTER_API_KEY en Cloudflare.
export type ExternalShow = { id: string; title: string; artist: string; event_date: string | null; city: string; venue: string; image_url: string | null; url: string; /** true si `url` es una ticketera oficial; false si es solo información. */ official?: boolean; lat?: number; lng?: number; /** Ciudad buscada cuando el show vino de "recitales en <ciudad>". */ area?: string };
export const DEFAULT_SHOW_ARTISTS = ['Ricardo Arjona', 'Airbag', 'Dillom', 'LALI', 'Adéla', 'María Becerra', 'TINI'];

/* eslint-disable @typescript-eslint/no-explicit-any */
type Geo = { lat: number; lng: number };
/** Busca en Ticketmaster. Con `keyword` filtra por artista; con `near` busca shows de música a menos de `radiusKm`. */
async function ticketmaster(keyword: string, size: number, near?: Geo, radiusKm = 150): Promise<ExternalShow[]> {
  const key = process.env['TICKETMASTER_API_KEY'];
  if (!key) {
    console.warn('[shows] Falta el secreto TICKETMASTER_API_KEY: no se buscan shows externos.');
    return [];
  }
  const geo = near ? `&latlong=${near.lat.toFixed(4)},${near.lng.toFixed(4)}&radius=${radiusKm}&unit=km` : '';
  const kw = keyword ? `&keyword=${encodeURIComponent(keyword)}` : '';
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${encodeURIComponent(key)}${kw}${geo}&classificationName=music&sort=date,asc&size=${size}`;
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) {
    console.warn(`[shows] Ticketmaster respondió ${res.status}`);
    return [];
  }
  const json: any = await res.json();
  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const k = norm(keyword);
  return (json?._embedded?.events ?? [])
    .filter((e: any) => !k || (e._embedded?.attractions ?? []).some((a: any) => norm(a.name ?? '').includes(k)) || norm(e.name ?? '').includes(k))
    .map((e: any): ExternalShow => {
      const venue = e._embedded?.venues?.[0];
      const img = [...(e.images ?? [])].filter((i: any) => i.ratio === '16_9').sort((a: any, b: any) => Math.abs(a.width - 640) - Math.abs(b.width - 640))[0] ?? e.images?.[0];
      return {
        id: `tm-${e.id}`, title: e.name, artist: e._embedded?.attractions?.[0]?.name ?? keyword,
        event_date: e.dates?.start?.dateTime ?? e.dates?.start?.localDate ?? null,
        city: [venue?.city?.name, venue?.country?.countryCode].filter(Boolean).join(', '), venue: venue?.name ?? '',
        image_url: img?.url ?? null, url: e.url ?? '',
        lat: venue?.location?.latitude ? Number(venue.location.latitude) : undefined,
        lng: venue?.location?.longitude ? Number(venue.location.longitude) : undefined,
      };
    });
}
// Eventos de Google vía SerpApi: cubre Argentina (Ticketek, All Access, Enigma…). Necesita el secreto SERPAPI_KEY.
// Plan gratis con cupo chico: cada búsqueda se guarda 24 h en la caché del Worker.
const MONTHS: Record<string, number> = { ene: 0, jan: 0, feb: 1, mar: 2, abr: 3, apr: 3, may: 4, jun: 5, jul: 6, ago: 7, aug: 7, sep: 8, set: 8, oct: 9, nov: 10, dic: 11, dec: 11 };
function serpDate(when: string | undefined, start: string | undefined): string | null {
  const txt = `${start ?? ''} ${when ?? ''}`.toLowerCase();
  let day = 0, mon: number | undefined;
  for (const m of txt.matchAll(/(\d{1,2})\s+(?:de\s+)?([a-zñ]{3})|([a-z]{3})[a-z]*\.?\s+(\d{1,2})\b/g)) {
    const [d, mo] = m[1] ? [Number(m[1]), MONTHS[m[2]]] : [Number(m[4]), MONTHS[m[3]]];
    if (mo != null && d >= 1 && d <= 31) { day = d; mon = mo; break; }
  }
  if (mon == null || !day) return null;
  // "21:00", "9 PM", "9:30 pm"
  const t = (when ?? '').toLowerCase().match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/) ?? (when ?? '').match(/(\d{1,2}):(\d{2})/);
  let hour = t ? Number(t[1]) % (t[3] ? 12 : 24) + (t[3] === 'pm' ? 12 : 0) : null;
  if (hour != null && (hour < 0 || hour > 23)) hour = null;
  const minute = t?.[2] ? Number(t[2]) : 0;
  const now = new Date();
  let year = now.getUTCFullYear();
  if (new Date(Date.UTC(year, mon, day + 1)) < now) year += 1;
  // Hora de Argentina (UTC-3).
  return new Date(Date.UTC(year, mon, day, hour != null ? hour + 3 : 3, hour != null ? minute : 0)).toISOString();
}

/**
 * Ticketeras oficiales (Argentina y región) y sitios de salas, por nombre: se reconocen con cualquier
 * dominio (.com, .com.ar, subdominios), por ejemplo "ticketek" en "premier.ticketek.com.ar".
 */
const OFFICIAL_TICKETS = [
  'ticketek', 'allaccess', 'enigmatickets', 'passline', 'entradauno', 'tuentrada', 'plateanet', 'alternativateatral',
  'venti', 'livepass', 'ticketmaster', 'eventbrite', 'autoentrada', 'ticketportal', 'paseshow', 'entradaweb', 'tickethoy',
  'ticketway', 'eticket', 'boleteria', 'deportick', 'superboletos', 'puntoticket', 'tuboleta', 'dice',
  'movistararena', 'lunapark', 'vorterix', 'niceto', 'latrastienda', 'teatrogranrex', 'artmedia', 'quality', 'plazadelamusica',
  'ticketeralibre', 'paylogic', 'flashpass', 'tickethub', 'entradasya', 'bombo', 'cultura', 'gob',
];
/** Reventa o agregadores con recargo: nunca se usan. */
const RESALE = ['viagogo', 'stubhub', 'seatgeek', 'vividseats', 'ticketnetwork', 'tickpick', 'gametime', 'ticketsmarter', 'ticombo', 'fanpass', 'ticketswap', 'ticketcity', 'megaseats', 'boxofficeticketsales', 'tixel', 'goldstar', 'eventticketscenter', 'concerttickets', 'ticketsonsale', 'coastaltickets'];

function hostOf(link: string): string {
  try { return new URL(link).hostname.replace(/^www\./, '').toLowerCase(); } catch { return ''; }
}
const isResale = (h: string) => !h || RESALE.some((r) => h.includes(r));
const labels = (h: string) => h.split('.').flatMap((l) => [l, ...l.split('-')]);
/** Oficial si el dominio es de una ticketera conocida o tiene el nombre de la sala (p. ej. "estadioobras.com.ar"). */
const isOfficial = (h: string, venue = '') => {
  if (!h || isResale(h)) return false;
  const parts = labels(h);
  if (OFFICIAL_TICKETS.some((n) => parts.includes(n) || parts.some((p) => p.startsWith(n) && p.length - n.length <= 3))) return true;
  const words = venue.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 5 && !['estadio', 'teatro', 'buenos', 'aires', 'centro', 'arena', 'club'].includes(w));
  return words.some((w) => h.includes(w));
};

/** Elige el link oficial de venta; si no hay, uno informativo que no sea reventa; si tampoco, ninguno. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function officialLink(tickets: any[] | undefined, fallback: string | undefined, venue = ''): { url: string; official: boolean } {
  const links = (tickets ?? []).map((t) => ({ link: String(t?.link ?? ''), type: String(t?.link_type ?? ''), host: hostOf(String(t?.link ?? '')) }));
  const official = links.find((t) => t.type === 'tickets' && isOfficial(t.host, venue)) ?? links.find((t) => isOfficial(t.host, venue));
  if (official) return { url: official.link, official: true };
  const info = [...links.filter((t) => t.type !== 'tickets'), ...links.filter((t) => t.type === 'tickets'), ...(fallback ? [{ link: fallback, type: 'info', host: hostOf(fallback) }] : [])]
    .find((t) => !isResale(t.host) && !t.host.endsWith('google.com'));
  return info ? { url: info.link, official: false } : { url: '', official: false };
}

/** KV de Cloudflare (binding SHOWS_CACHE). Nitro deja los bindings en globalThis.__env__. */
type Kv = { get: (k: string) => Promise<string | null>; put: (k: string, v: string, o?: { expirationTtl?: number }) => Promise<void> };
const showsKv = (): Kv | undefined => (globalThis as any).__env__?.SHOWS_CACHE as Kv | undefined;

// La Cache API no guarda nada en *.workers.dev, por eso se usa KV (con la Cache API como respaldo).
async function cached<T>(key: string, load: () => Promise<T>, maxAge = 86400): Promise<T> {
  const kv = showsKv();
  const cache = (globalThis as any).caches?.default as Cache | undefined;
  const req = new Request(`https://drop-cache.local/${encodeURIComponent(key)}`);
  try {
    if (kv) { const hit = await kv.get(key); if (hit) return JSON.parse(hit) as T; }
    else if (cache) { const hit = await cache.match(req); if (hit) return (await hit.json()) as T; }
  } catch { /* sin caché */ }
  const value = await load();
  // Una lista vacía se guarda solo 6 horas: se reintenta, pero sin gastar una búsqueda en cada visita.
  const ttl = Array.isArray(value) && value.length === 0 ? Math.min(maxAge, 6 * 3600) : maxAge;
  {
    try {
      if (kv) await kv.put(key, JSON.stringify(value), { expirationTtl: Math.max(60, ttl) });
      else if (cache) await cache.put(req, new Response(JSON.stringify(value), { headers: { 'content-type': 'application/json', 'cache-control': `max-age=${ttl}` } }));
    } catch { /* sin caché */ }
  }
  return value;
}

/**
 * Busca en Eventos de Google. Con `artist` trae sus fechas (se guarda 3 días);
 * con `city` trae recitales de cualquier artista en esa ciudad (se guarda 1 día).
 */
async function googleEvents(artist: string, size: number, city?: string, opts: { query?: string; start?: number; maxAge?: number } = {}): Promise<ExternalShow[]> {
  const key = process.env['SERPAPI_KEY'];
  if (!key) return [];
  // En español Google Events no devuelve resultados; en inglés sí (probado con el diagnóstico).
  const q = opts.query ?? (city ? `Concerts in ${city}` : `${artist} concert`);
  const start = opts.start ?? 0;
  return cached(`serp2:${q.toLowerCase()}:${start}`, async () => {
    const url = `https://serpapi.com/search.json?engine=google_events&q=${encodeURIComponent(q)}&hl=en&gl=ar${start ? `&start=${start}` : ''}&api_key=${encodeURIComponent(key)}`;
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    // Un error se lanza (no se guarda en la caché) para reintentar en la próxima visita.
    if (!res.ok) throw new Error(`SerpApi respondió ${res.status}`);
    const json: any = await res.json();
    if (json?.error && !/hasn't returned any results|no results/i.test(String(json.error))) throw new Error(`SerpApi: ${json.error}`);
    const norm = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const k = norm(artist);
    return (json?.events_results ?? [])
      .filter((e: any) => {
        if (city) return true;
        const text = norm(`${e.title ?? ''} ${e.description ?? ''}`);
        return text.includes(k) || k.split(/\s+/).filter((w) => w.length >= 4).some((w) => text.includes(w));
      })
      .map((e: any): ExternalShow => {
        const addr: string[] = Array.isArray(e.address) ? e.address : [];
        // En la búsqueda por ciudad el artista no viene aparte: se toma del título ("Artista en Lugar", "Artista - Gira").
        const who = city ? String(e.title ?? '').split(/\s+(?:en|at|@|-|–|\|)\s+/i)[0].trim() || 'Recital' : artist;
        return {
          id: `gg-${norm(`${e.title ?? ''}-${e.date?.start_date ?? ''}`).replace(/\W+/g, '-').slice(0, 60)}`,
          title: e.title ?? artist, artist: who,
          event_date: serpDate(e.date?.when, e.date?.start_date),
          venue: e.venue?.name ?? addr[0] ?? '', city: addr[1] ?? addr[0] ?? '',
          image_url: e.image ?? e.thumbnail ?? null,
          ...officialLink(e.ticket_info, e.link, e.venue?.name ?? addr[0] ?? ''),
          ...(city ? { area: city } : {}),
        };
      })
      .filter((s: ExternalShow) => !s.event_date || s.event_date >= new Date().toISOString())
      .slice(0, size);
  }, opts.maxAge ?? (city ? 86400 : 3 * 86400));
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Salas donde tocan artistas nacionales: Google las busca como "Concerts at <sala>" y trae su agenda.
 * Cada sala se guarda 3 días para no gastar el cupo gratis de SerpApi.
 */
const CITY_VENUES: Record<string, string[]> = {
  'Buenos Aires': ['Movistar Arena', 'Estadio Luna Park', 'Teatro Vorterix', 'Niceto Club', 'C Art Media', 'La Trastienda Club', 'Estadio Obras', 'Teatro Gran Rex'],
  'Córdoba': ['Quality Espacio', 'Plaza de la Música Córdoba'],
  'Rosario': ['Teatro Broadway Rosario', 'Distrito Rock Rosario'],
  'La Plata': ['Teatro Ópera La Plata'],
};

/** Recitales de la ciudad: dos páginas de "Concerts in <ciudad>" (1 día) + la agenda de sus salas (3 días). */
/** Estadios: los recitales se anuncian con meses de anticipación, así que alcanza con buscar una vez por semana. */
const CITY_STADIUMS: Record<string, string[]> = {
  'Buenos Aires': ['Estadio River Plate Mas Monumental', 'Estadio Ferro Carril Oeste', 'Estadio Velez Sarsfield', 'Estadio Huracan Tomas Duco', 'Estadio La Bombonera', 'Hipodromo de Palermo', 'Campo Argentino de Polo', 'Estadio Racing Club'],
  'Córdoba': ['Estadio Mario Alberto Kempes'],
  'Rosario': ['Estadio Gigante de Arroyito'],
  'La Plata': ['Estadio Unico Diego Armando Maradona'],
};

function cityJobs(city: string): Promise<ExternalShow[]>[] {
  return [
    ...(CITY_STADIUMS[city] ?? []).map((v) => googleEvents('', 20, city, { query: `Concerts at ${v}`, maxAge: 7 * 86400 })),
    googleEvents('', 20, city),
    googleEvents('', 20, city, { start: 10 }),
    ...(CITY_VENUES[city] ?? []).map((v) => googleEvents('', 20, city, { query: `Concerts at ${v} ${city}`, maxAge: 3 * 86400 })),
  ];
}

export const getExternalShows = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({
    q: z.string().trim().max(80).optional(),
    artists: z.array(z.string().trim().min(2).max(60)).max(10).optional(),
    near: z.object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }).optional(),
    /** Ciudad del fan: suma recitales de cualquier artista en esa ciudad. */
    city: z.string().trim().min(2).max(60).optional(),
  }).parse(input ?? {}))
  .handler(async ({ data }): Promise<ExternalShow[]> => {
    try {
      const artists = data.artists?.length ? data.artists : DEFAULT_SHOW_ARTISTS;
      // Cada fuente por separado: si una falla, las demás igual se muestran.
      const settle = async (jobs: Promise<ExternalShow[]>[]) => (await Promise.allSettled(jobs)).map((r) => {
        if (r.status === 'fulfilled') return r.value;
        console.warn('[shows]', r.reason instanceof Error ? r.reason.message : r.reason);
        return [];
      });
      const lists = data.q && data.q.length >= 2
        ? await settle([ticketmaster(data.q, 10), googleEvents(data.q, 10)])
        : await settle([
            ...artists.map((a) => ticketmaster(a, 4)),
            ...artists.map((a) => googleEvents(a, 4)),
            ...(data.city ? cityJobs(data.city) : []),
            // Shows de música cerca del fan, de cualquier artista.
            ...(data.near ? [ticketmaster('', 20, data.near, 50)] : []),
          ]);
      const seen = new Set<string>();
      return lists.flat().filter((s) => (seen.has(s.id) ? false : (seen.add(s.id), true)))
        .sort((a, b) => (a.event_date ?? '9').localeCompare(b.event_date ?? '9')).slice(0, 120);
    } catch {
      return [];
    }
  });

/** Respuesta cruda de SerpApi (sin caché), resumida para el diagnóstico. */
/* eslint-disable @typescript-eslint/no-explicit-any */
async function serpRaw(q: string): Promise<string> {
  const key = process.env['SERPAPI_KEY'];
  if (!key) return `SerpApi "${q}": sin clave`;
  try {
    const res = await fetch(`https://serpapi.com/search.json?engine=google_events&q=${encodeURIComponent(q)}&hl=en&gl=ar&no_cache=true&api_key=${encodeURIComponent(key)}`);
    const json: any = await res.json().catch(() => ({}));
    const ev: any[] = json?.events_results ?? [];
    return `SerpApi crudo "${q}": HTTP ${res.status} · estado ${json?.search_metadata?.status ?? '?'} · error: ${json?.error ?? 'ninguno'} · ${ev.length} eventos` +
      ev.slice(0, 5).map((e) => `\n   - ${e.title} | ${e.date?.start_date ?? ''} | ${(e.address ?? []).join(' / ')}\n     links: ${(e.ticket_info ?? []).map((t: any) => `${t.link_type}:${hostOf(String(t.link ?? ''))}`).join(', ') || 'ninguno'} → ${officialLink(e.ticket_info, e.link, e.venue?.name ?? '').url ? (officialLink(e.ticket_info, e.link, e.venue?.name ?? '').official ? 'oficial' : 'info') : 'sin link'}`).join('');
  } catch (e) {
    return `SerpApi crudo "${q}": falla de red (${e instanceof Error ? e.message : String(e)})`;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** Búsquedas de SerpApi usadas y restantes (consultar la cuenta no gasta búsquedas). */
async function serpAccount(): Promise<string> {
  const key = process.env['SERPAPI_KEY'];
  if (!key) return 'SerpApi cuenta: sin clave';
  try {
    const res = await fetch(`https://serpapi.com/account.json?api_key=${encodeURIComponent(key)}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const a: any = await res.json().catch(() => ({}));
    return `SerpApi cuenta: plan ${a?.plan_name ?? '?'} · usadas este mes ${a?.this_month_usage ?? '?'} de ${a?.searches_per_month ?? '?'} · quedan ${a?.plan_searches_left ?? a?.total_searches_left ?? '?'}${a?.error ? ` · error: ${a.error}` : ''}`;
  } catch (e) {
    return `SerpApi cuenta: falla (${e instanceof Error ? e.message : String(e)})`;
  }
}

/** Diagnóstico de las fuentes de shows (para revisar claves): cuántos trae cada una o qué error da. */
export const getShowsDiag = createServerFn({ method: 'POST' })
  .handler(async () => {
    const run = async (name: string, job: () => Promise<ExternalShow[]>) => {
      try { const r = await job(); return `${name}: ${r.length} shows`; } catch (e) { return `${name}: error (${e instanceof Error ? e.message : String(e)})`; }
    };
    return [
      `TICKETMASTER_API_KEY: ${process.env['TICKETMASTER_API_KEY'] ? 'cargada' : 'NO cargada'}`,
      `SERPAPI_KEY: ${process.env['SERPAPI_KEY'] ? 'cargada' : 'NO cargada'}`,
      `Caché KV: ${showsKv() ? 'activa' : 'NO activa'}`,
      await run('Ticketmaster "Ricardo Arjona"', () => ticketmaster('Ricardo Arjona', 5)),
      await run('Google "Concerts in Buenos Aires"', () => googleEvents('', 20, 'Buenos Aires')),
      await serpAccount(),
      await ticketDiag('Maria Becerra Pop Tickets'),
      await ticketDiag('Paula Mattheus'),
      await ticketDiag('Easykid'),
      `Artistas de las fichas: ${(await googleEvents('', 20, 'Buenos Aires').catch(() => [])).map((x) => `${x.artist}${x.url ? (x.official ? ' (oficial)' : ' (info)') : ''}`).join(' · ')}`,
      await ticketDiag('Abel 30 Años'),
    ];
  });

/** Ticketeras oficiales donde se busca un show cuando la fuente no trae su link de venta. */
export const TICKET_SITES = ['passline.com', 'ticketek.com.ar', 'allaccess.com.ar', 'enigmatickets.com', 'tuentrada.com', 'livepass.com.ar', 'ticketmaster.com.ar', 'venti.com.ar', 'plateanet.com', 'eventbrite.com.ar', 'entradauno.com', 'alternativateatral.com', 'ticketeralibre.com.ar'];
const fold = (t: string) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
/** "Maria Becerra Pop Tickets" → "Maria Becerra Pop": saca palabras de relleno de los títulos de Google. */
export const cleanArtist = (a: string) =>
  a.replace(/\b(tickets?|entradas|concerts?|concierto|live|en vivo|tour|gira|show|world tour)\b/gi, ' ').replace(/[|·,–-]+\s*$/, '').replace(/\s+/g, ' ').trim() || a;
/** Búsqueda simple (sin operadores a la vista) para cuando no se encuentra la página oficial. */
export const ticketSearchUrl = (artist: string) => `https://www.google.com/search?q=${encodeURIComponent(`${cleanArtist(artist)} entradas`)}`;

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Páginas de ticketeras oficiales que mencionan al artista (búsqueda de Google por SerpApi, 3 días en KV). */
async function ticketLinks(artist: string): Promise<{ link: string; text: string }[]> {
  const key = process.env['SERPAPI_KEY'];
  if (!key) throw new Error('sin SERPAPI_KEY');
  const name = cleanArtist(artist);
  // Palabras propias del nombre ("Abel 30 Años" → abel): alcanza con que la página nombre alguna.
  const GENERIC = ['anos', 'tour', 'gira', 'live', 'show', 'concierto', 'entradas', 'presenta', 'festival', 'buenos', 'aires', 'world', 'championship', 'open', 'the'];
  const words = fold(name).split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !GENERIC.includes(w)).slice(0, 3);
  const search = async (q: string) => {
    const res = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&hl=es&gl=ar&google_domain=google.com.ar&location=${encodeURIComponent('Buenos Aires, Argentina')}&num=20&api_key=${encodeURIComponent(key)}`, { headers: { accept: 'application/json' } });
    const json: any = await res.json().catch(() => ({}));
    if (!res.ok || json?.error) {
      if (/hasn't returned any results|no results/i.test(String(json?.error ?? ''))) return [];
      throw new Error(`SerpApi ${res.status}: ${json?.error ?? 'sin detalle'}`);
    }
    return ((json?.organic_results ?? []) as any[])
      .map((r) => ({ link: String(r?.link ?? ''), text: fold(`${r?.title ?? ''} ${r?.snippet ?? ''} ${r?.link ?? ''}`).replace(/[^a-z0-9]+/g, '') }))
      // De una ticketera oficial y que nombre al artista (no cualquier evento del sitio).
      .filter((r) => isOfficial(hostOf(r.link)) && (!words.length || words.some((w) => r.text.includes(w))))
      .slice(0, 5);
  };
  // Se guarda también "no encontrado" (1 día) para no gastar búsquedas en cada clic.
  const hit = await cached(`tix6:${fold(name)}`, async () => {
    let links = await search(`${name} (${TICKET_SITES.map((d) => `site:${d}`).join(' OR ')})`);
    // Segunda vuelta, más amplia: la búsqueda común de entradas, quedándose con las ticketeras oficiales.
    if (!links.length) links = await search(`${name} entradas`);
    return { links };
  }, 86400);
  return hit.links;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Página de venta oficial de un artista: primer resultado de una ticketera oficial (prefiere la de la sala).
 * Si no la encuentra, devuelve "" y la ficha usa el link informativo o una búsqueda simple.
 */
export const findTicketLink = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ artist: z.string().trim().min(2).max(80), venue: z.string().trim().max(80).optional() }).parse(input))
  .handler(async ({ data }): Promise<string> => {
    try {
      const links = await ticketLinks(data.artist);
      const venue = fold(data.venue ?? '').split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !['estadio', 'teatro', 'club', 'arena'].includes(w));
      return (links.find((l) => venue.some((w) => l.text.includes(w))) ?? links[0])?.link ?? '';
    } catch (e) {
      console.warn('[entradas]', e instanceof Error ? e.message : e);
      return '';
    }
  });

/** Para el diagnóstico: qué encuentra la búsqueda de entradas para un artista. */
/* eslint-disable @typescript-eslint/no-explicit-any */
/** Resultados crudos de la búsqueda de entradas (sin caché), para ver qué devuelve Google. */
async function ticketRaw(q: string): Promise<string> {
  const key = process.env['SERPAPI_KEY'];
  if (!key) return 'sin clave';
  try {
    const res = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&hl=es&gl=ar&google_domain=google.com.ar&num=20&no_cache=true&api_key=${encodeURIComponent(key)}`);
    const json: any = await res.json().catch(() => ({}));
    const r: any[] = json?.organic_results ?? [];
    return `Crudo "${q}": HTTP ${res.status} · error: ${json?.error ?? 'ninguno'} · ${r.length} resultados` + r.slice(0, 8).map((x) => `\n   - ${hostOf(String(x.link ?? ''))} | ${String(x.title ?? '').slice(0, 60)}`).join('');
  } catch (e) {
    return `Crudo "${q}": falla (${e instanceof Error ? e.message : String(e)})`;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

async function ticketDiag(artist: string): Promise<string> {
  try {
    const links = await ticketLinks(artist);
    return `Entradas "${cleanArtist(artist)}": ${links.length ? links.map((l) => l.link).join(' , ') : 'ninguna página oficial'}`;
  } catch (e) {
    return `Entradas "${cleanArtist(artist)}": error (${e instanceof Error ? e.message : String(e)})`;
  }
}
