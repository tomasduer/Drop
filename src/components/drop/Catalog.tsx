import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, ExternalLink, Pause, Play, Plus, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import {
  getCatalogAlbum, getCatalogArtist, getExternalShows, searchCatalog, type ExternalShow,
  type CatalogAlbum, type CatalogAlbumDetail, type CatalogArtist, type CatalogArtistDetail, type CatalogSearch, type CatalogTrack,
} from "@/lib/music.functions";
import { useMusicPlayer } from "./MusicPlayer";
import { useDropAuth } from "./AuthProvider";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const spotifySearch = (q: string) => `https://open.spotify.com/search/${encodeURIComponent(q)}`;

/** Resultados del catálogo musical para una búsqueda (artistas, álbumes, canciones). */
export function CatalogResults({ query }: { query: string }) {
  const search = useServerFn(searchCatalog);
  const searchShows = useServerFn(getExternalShows);
  const [shows, setShows] = useState<ExternalShow[]>([]);
  const [data, setData] = useState<CatalogSearch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [album, setAlbum] = useState<number | null>(null);
  const [artist, setArtist] = useState<number | null>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) { setData(null); setShows([]); return; }
    let cancelled = false;
    setLoading(true); setError(false);
    const t = setTimeout(() => {
      searchShows({ data: { q } }).then((r) => { if (!cancelled) setShows(r); }).catch(() => { if (!cancelled) setShows([]); });
      search({ data: { q } })
        .then((r) => { if (!cancelled) setData(r); })
        .catch(() => { if (!cancelled) setError(true); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 350);
    return () => { cancelled = true; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (query.trim().length < 2) return null;
  return (
    <section className="mt-6 space-y-5">
      <h2 className="text-xl font-black">En el catálogo</h2>
      {loading && !data && <p className="text-sm text-muted-foreground">Buscando…</p>}
      {error && <p className="text-sm text-muted-foreground">No pudimos conectar con el catálogo. Probá de nuevo en un rato.</p>}
      {data && data.artists.length + data.albums.length + data.tracks.length === 0 && <p className="text-sm text-muted-foreground">Sin resultados para “{query}”.</p>}
      {data && data.artists.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Artistas</p>
          <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-1">
            {data.artists.map((a) => <ArtistChip key={a.id} artist={a} onOpen={() => setArtist(a.id)} />)}
          </div>
        </div>
      )}
      {data && data.albums.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Álbumes</p>
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
            {data.albums.map((a) => <AlbumCard key={a.id} album={a} onOpen={() => setAlbum(a.id)} />)}
          </div>
        </div>
      )}
      {data && data.tracks.length > 0 && (
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Canciones</p>
          <TrackList tracks={data.tracks} showCover />
        </div>
      )}
      {shows.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Próximos shows</p>
          <ul className="divide-y divide-border">
            {shows.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 py-2.5">
                  {s.image_url && <img loading="lazy" src={s.image_url} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" />}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{s.title}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{s.event_date ? new Date(s.event_date).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" }) : "Fecha a confirmar"} · {s.venue}{s.city ? `, ${s.city}` : ""}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-primary" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <AlbumSheet id={album} onClose={() => setAlbum(null)} onArtist={(id) => { setAlbum(null); setArtist(id); }} />
      <ArtistSheet id={artist} onClose={() => setArtist(null)} onAlbum={(id) => { setArtist(null); setAlbum(id); }} />
    </section>
  );
}

function ArtistChip({ artist, onOpen }: { artist: CatalogArtist; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="w-20 shrink-0 text-center">
      <img loading="lazy" src={artist.picture} alt={artist.name} className="mx-auto h-20 w-20 rounded-full object-cover" />
      <p className="mt-1 truncate text-xs font-bold">{artist.name}</p>
    </button>
  );
}

function AlbumCard({ album, onOpen }: { album: CatalogAlbum; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="w-32 shrink-0 text-left">
      <img loading="lazy" src={album.cover} alt={album.title} className="aspect-square w-full rounded-xl object-cover" />
      <p className="mt-1.5 truncate text-sm font-bold">{album.title}</p>
      <p className="truncate text-[11px] text-muted-foreground">{album.artist}{album.year ? ` · ${album.year}` : ""}</p>
    </button>
  );
}

export function TrackList({ tracks, showCover }: { tracks: CatalogTrack[]; showCover?: boolean }) {
  const { current, playing, play } = useMusicPlayer();
  return (
    <ol className="divide-y divide-border">
      {tracks.map((t, i) => {
        const active = current?.id === t.id;
        return (
          <li key={t.id}>
            <button disabled={!t.preview} onClick={() => play(t, tracks)} className="flex w-full items-center gap-3 py-2.5 text-left disabled:opacity-50">
              {showCover && t.cover ? <img loading="lazy" src={t.cover} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" /> : <span className="w-6 shrink-0 text-center text-xs text-muted-foreground">{i + 1}</span>}
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-sm font-semibold ${active ? "text-primary" : ""}`}>{t.title}</span>
                <span className="block truncate text-[11px] text-muted-foreground">{t.artist}{showCover && t.album ? ` · ${t.album}` : ""}</span>
              </span>
              <span className="text-[11px] text-muted-foreground">{fmt(t.duration)}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border">
                {active && playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export function AlbumSheet({ id, onClose, onArtist }: { id: number | null; onClose: () => void; onArtist?: (id: number) => void }) {
  const load = useServerFn(getCatalogAlbum);
  const { customAlbums, addAlbum, mode } = useDropAuth();
  const { play } = useMusicPlayer();
  const [album, setAlbum] = useState<CatalogAlbumDetail | null>(null);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!id) { setAlbum(null); return; }
    setError(false); setAlbum(null);
    load({ data: { id } }).then(setAlbum).catch(() => setError(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const libraryId = album ? `dz-${album.id}` : "";
  const inLibrary = customAlbums.some((a) => a.id === libraryId);
  return (
    <Drawer open={id !== null} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DrawerContent className="mx-auto max-h-[90dvh] max-w-[440px]">
        {!album ? (
          <DrawerHeader><DrawerTitle>{error ? "No pudimos abrir el álbum" : "Cargando álbum…"}</DrawerTitle><DrawerDescription>{error ? "Probá de nuevo en un rato." : "Un segundo."}</DrawerDescription></DrawerHeader>
        ) : (
          <div className="overflow-y-auto px-4 pb-8">
            <DrawerHeader className="px-0">
              <div className="flex gap-4">
                <img src={album.cover} alt={album.title} className="h-28 w-28 shrink-0 rounded-xl object-cover shadow-lg" />
                <div className="min-w-0 text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">{album.type === "single" ? "Single" : album.type === "ep" ? "EP" : "Álbum"}</p>
                  <DrawerTitle className="text-xl font-black leading-tight">{album.title}</DrawerTitle>
                  <button className="mt-1 text-sm font-semibold text-muted-foreground underline-offset-2 hover:underline" onClick={() => onArtist?.(album.artistId)}>{album.artist}</button>
                  <DrawerDescription className="text-xs">{[album.year, `${album.trackList.length} canciones`, album.label].filter(Boolean).join(" · ")}</DrawerDescription>
                </div>
              </div>
            </DrawerHeader>
            <div className="mb-3 grid grid-cols-2 gap-2">
              <Button onClick={() => album.trackList[0] && play(album.trackList[0], album.trackList)}><Play /> Escuchar</Button>
              <Button variant="outline" disabled={inLibrary || saving} onClick={async () => {
                setSaving(true);
                const ok = await addAlbum({ id: libraryId, title: album.title, artist: album.artist, year: album.year, cover: album.cover });
                setSaving(false);
                if (ok) toast.success("Álbum sumado a tu biblioteca", { description: mode === "user" ? "Marcalo como escuchado en Mi DROP para sumar 120 puntos." : "En modo invitado se guarda solo durante esta visita." });
              }}>{inLibrary ? <><Check /> En tu biblioteca</> : <><Plus /> Sumar a mi biblioteca</>}</Button>
            </div>
            <TrackList tracks={album.trackList} />
            <a href={spotifySearch(`${album.artist} ${album.title}`)} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-primary"><ExternalLink className="h-3.5 w-3.5" /> Escuchar completo en Spotify</a>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">Vistas previas de 30 segundos · catálogo de Deezer</p>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export function ArtistSheet({ id, onClose, onAlbum }: { id: number | null; onClose: () => void; onAlbum: (id: number) => void }) {
  const load = useServerFn(getCatalogArtist);
  const { play } = useMusicPlayer();
  const [artist, setArtist] = useState<CatalogArtistDetail | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!id) { setArtist(null); return; }
    setError(false); setArtist(null);
    load({ data: { id } }).then(setArtist).catch(() => setError(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <Drawer open={id !== null} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DrawerContent className="mx-auto max-h-[90dvh] max-w-[440px]">
        {!artist ? (
          <DrawerHeader><DrawerTitle>{error ? "No pudimos abrir el artista" : "Cargando artista…"}</DrawerTitle><DrawerDescription>{error ? "Probá de nuevo en un rato." : "Un segundo."}</DrawerDescription></DrawerHeader>
        ) : (
          <div className="overflow-y-auto px-4 pb-8">
            <DrawerHeader className="px-0 text-center">
              <img src={artist.picture} alt={artist.name} className="mx-auto h-28 w-28 rounded-full object-cover shadow-lg" />
              <DrawerTitle className="mt-2 text-2xl font-black">{artist.name}</DrawerTitle>
              <DrawerDescription className="flex items-center justify-center gap-1 text-xs"><Users className="h-3 w-3" />{artist.fans.toLocaleString("es-AR")} fans</DrawerDescription>
            </DrawerHeader>
            <Button className="mb-3 w-full" onClick={() => artist.top[0] && play(artist.top[0], artist.top)}><Play /> Escuchar lo más popular</Button>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Populares</p>
            <TrackList tracks={artist.top} showCover />
            {artist.albums.length > 0 && <>
              <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Discografía</p>
              <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
                {artist.albums.map((a) => <AlbumCard key={a.id} album={a} onOpen={() => onAlbum(a.id)} />)}
              </div>
            </>}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
