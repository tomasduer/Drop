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
