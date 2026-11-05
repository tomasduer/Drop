import { useEffect, useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { searchCatalog, type CatalogArtist, type CatalogTrack } from "@/lib/music.functions";

// Canciones favoritas: por ahora quedan guardadas en este dispositivo.
export type FavoriteSong = { id: number; title: string; artist: string; cover: string; link: string };
const SONGS_KEY = "drop-canciones-favoritas";

export function getFavoriteSongs(): FavoriteSong[] {
  try { return JSON.parse(localStorage.getItem(SONGS_KEY) ?? "[]") as FavoriteSong[]; } catch { return []; }
}
export function setFavoriteSongs(list: FavoriteSong[]) {
  try { localStorage.setItem(SONGS_KEY, JSON.stringify(list)); } catch { /* sin almacenamiento */ }
}

/** Buscador del catálogo para sumar un artista o una canción favorita al perfil. */
export function FavoritesPicker({ kind, onClose, onPickArtist, onPickSong }: {
  kind: "artist" | "song";
  onClose: () => void;
  onPickArtist: (a: CatalogArtist) => void;
  onPickSong: (t: CatalogTrack) => void;
}) {
  const search = useServerFn(searchCatalog);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [artists, setArtists] = useState<CatalogArtist[]>([]);
  const [tracks, setTracks] = useState<CatalogTrack[]>([]);

  useEffect(() => {
    const text = q.trim();
    if (text.length < 2) { setArtists([]); setTracks([]); return; }
    let cancelled = false;
    setLoading(true); setFailed(false);
    const t = setTimeout(() => {
      search({ data: { q: text } })
        .then((r) => { if (!cancelled) { setArtists(r.artists); setTracks(r.tracks); } })
        .catch(() => { if (!cancelled) setFailed(true); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 350);
    return () => { cancelled = true; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const isArtist = kind === "artist";
  const empty = q.trim().length >= 2 && !loading && !failed && (isArtist ? artists : tracks).length === 0;

  return (
    <Dialog open onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>{isArtist ? "Sumar un artista" : "Sumar una canción"}</DialogTitle>
          <DialogDescription>{isArtist ? "Buscá a tu artista y sumalo a tus favoritos." : "Buscá una canción y sumala a tu perfil."}</DialogDescription>
        </DialogHeader>
        <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={isArtist ? "Nombre del artista" : "Canción o artista"} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </label>
        <div className="space-y-2">
          {failed && <p className="py-3 text-center text-xs text-muted-foreground">No pudimos buscar en el catálogo. Probá de nuevo en un rato.</p>}
          {empty && <p className="py-3 text-center text-xs text-muted-foreground">No encontramos resultados.</p>}
          {isArtist ? artists.map((a) => (
            <button key={a.id} type="button" onClick={() => onPickArtist(a)} className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2 text-left">
              <img src={a.picture} alt="" loading="lazy" className="h-11 w-11 rounded-full object-cover" />
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{a.name}</span><span className="text-[11px] text-muted-foreground">{a.fans.toLocaleString("es-AR")} fans</span></span>
              <Plus className="h-4 w-4 text-primary" />
            </button>
          )) : tracks.map((t) => (
            <button key={t.id} type="button" onClick={() => onPickSong(t)} className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2 text-left">
              <img src={t.cover} alt="" loading="lazy" className="h-11 w-11 rounded-lg object-cover" />
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{t.title}</span><span className="block truncate text-[11px] text-muted-foreground">{t.artist} · {t.album}</span></span>
              <Plus className="h-4 w-4 text-primary" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
