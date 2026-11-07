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
  const res = await fetch(`${API}${path}`, { headers: { accept: 'application/json', 'user-agent': 'DROP/1.0 (+https://drop.duerluli.workers.dev)' } });
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

// Artistas de un género: primero la lista curada (busca cada nombre y se queda con el artista que
// coincide), después los artistas destacados de ese género en Deezer. No busca la palabra del
// género en los nombres: "Pop" no trae artistas o discos que se llamen "pop".
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
export const getGenreArtists = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ names: z.array(z.string().trim().min(1).max(60)).max(24), deezerGenre: z.number().int().positive().optional() }).parse(input))
  .handler(async ({ data }): Promise<CatalogArtist[]> => {
    const curated = await Promise.all(data.names.map(async (name) => {
      try {
        const r = await get(`/search/artist?q=${encodeURIComponent(name)}&limit=5`);
        const list: CatalogArtist[] = (r.data ?? []).map(artist);
        return list.find((a) => norm(a.name) === norm(name)) ?? list[0] ?? null;
      } catch { return null; }
    }));
    let extra: CatalogArtist[] = [];
    if (data.deezerGenre) {
      try { extra = ((await get(`/genre/${data.deezerGenre}/artists`)).data ?? []).map(artist); } catch { extra = []; }
    }
    const seen = new Set<number>();
    return [...curated, ...extra].filter((a): a is CatalogArtist => !!a && !seen.has(a.id) && !!seen.add(a.id)).slice(0, 30);
  });

// Agenda de shows de Ticketmaster (Discovery API). Necesita el secreto TICKETMASTER_API_KEY en Cloudflare.
export type ExternalShow = { id: string; title: string; artist: string; event_date: string | null; city: string; venue: string; image_url: string | null; url: string };
export const DEFAULT_SHOW_ARTISTS = ['LALI', 'María Becerra', 'TINI', 'Dillom'];

/* eslint-disable @typescript-eslint/no-explicit-any */
async function ticketmaster(keyword: string, size: number): Promise<ExternalShow[]> {
  const key = process.env['TICKETMASTER_API_KEY'];
  if (!key) return [];
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${encodeURIComponent(key)}&keyword=${encodeURIComponent(keyword)}&classificationName=music&sort=date,asc&size=${size}`;
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) return [];
  const json: any = await res.json();
  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const k = norm(keyword);
  return (json?._embedded?.events ?? [])
    .filter((e: any) => (e._embedded?.attractions ?? []).some((a: any) => norm(a.name ?? '').includes(k)) || norm(e.name ?? '').includes(k))
    .map((e: any): ExternalShow => {
      const venue = e._embedded?.venues?.[0];
      const img = [...(e.images ?? [])].filter((i: any) => i.ratio === '16_9').sort((a: any, b: any) => Math.abs(a.width - 640) - Math.abs(b.width - 640))[0] ?? e.images?.[0];
      return {
        id: `tm-${e.id}`, title: e.name, artist: e._embedded?.attractions?.[0]?.name ?? keyword,
        event_date: e.dates?.start?.dateTime ?? e.dates?.start?.localDate ?? null,
        city: [venue?.city?.name, venue?.country?.countryCode].filter(Boolean).join(', '), venue: venue?.name ?? '',
        image_url: img?.url ?? null, url: e.url ?? '',
      };
    });
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const getExternalShows = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ q: z.string().trim().max(80).optional() }).parse(input ?? {}))
  .handler(async ({ data }): Promise<ExternalShow[]> => {
    try {
      const lists = data.q && data.q.length >= 2
        ? [await ticketmaster(data.q, 10)]
        : await Promise.all(DEFAULT_SHOW_ARTISTS.map((a) => ticketmaster(a, 5)));
      const seen = new Set<string>();
      return lists.flat().filter((s) => (seen.has(s.id) ? false : (seen.add(s.id), true)))
        .sort((a, b) => (a.event_date ?? '9').localeCompare(b.event_date ?? '9')).slice(0, 20);
    } catch {
      return [];
    }
  });
