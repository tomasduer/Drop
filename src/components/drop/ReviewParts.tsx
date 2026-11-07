import { useEffect, useState } from "react";
import { Loader2, Music2, Pause, Play, Search, Star, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { searchCatalog, type CatalogTrack } from "@/lib/music.functions";
import type { ReviewSong } from "@/lib/explore-data";
import { useMusicPlayer } from "./MusicPlayer";

/** Buscador de canciones del catálogo (Deezer), embebido en un formulario. */
export function SongSearch({ onPick, placeholder = "Buscá una canción o artista" }: { onPick: (t: CatalogTrack) => void; placeholder?: string }) {
  const search = useServerFn(searchCatalog);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [tracks, setTracks] = useState<CatalogTrack[]>([]);
  useEffect(() => {
    const text = q.trim();
    if (text.length < 2) { setTracks([]); return; }
    let cancelled = false;
    setLoading(true); setFailed(false);
    const t = setTimeout(() => {
      search({ data: { q: text } })
        .then((r) => { if (!cancelled) setTracks(r.tracks.slice(0, 6)); })
        .catch(() => { if (!cancelled) setFailed(true); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 350);
    return () => { cancelled = true; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
        {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      </label>
      {failed && <p className="text-center text-xs text-muted-foreground">No pudimos buscar en el catálogo. Probá de nuevo.</p>}
      {!loading && !failed && q.trim().length >= 2 && tracks.length === 0 && <p className="text-center text-xs text-muted-foreground">No encontramos canciones.</p>}
      {tracks.map((t) => (
        <button key={t.id} type="button" onClick={() => { onPick(t); setQ(""); setTracks([]); }} className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2 text-left transition-colors hover:border-primary/50">
          <img src={t.cover} alt="" loading="lazy" className="h-10 w-10 rounded-lg object-cover" />
          <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{t.title}</span><span className="block truncate text-[11px] text-muted-foreground">{t.artist} · {t.album}</span></span>
        </button>
      ))}
    </div>
  );
}

export const toReviewSong = (t: CatalogTrack): ReviewSong => ({ id: t.id, title: t.title, artist: t.artist, cover: t.cover, link: t.link });

/**
 * Reproduce la vista previa de una canción guardada en una reseña. Las vistas previas
 * de Deezer vencen, así que se busca una fresca en el catálogo al momento de reproducir.
 */
export function useSongPlayback(song: ReviewSong | undefined | null) {
  const player = useMusicPlayer();
  const search = useServerFn(searchCatalog);
  const [loading, setLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const isCurrent = !!song && player.current?.id === song.id;
  const playing = isCurrent && player.playing;
  async function play() {
    if (!song) return;
    if (isCurrent) { player.toggle(); return; }
    setLoading(true); setUnavailable(false);
    try {
      const r = await search({ data: { q: `${song.artist} ${song.title}`.slice(0, 80) } });
      const t = r.tracks.find((x) => x.id === song.id) ?? r.tracks.find((x) => x.title.toLowerCase() === song.title.toLowerCase()) ?? r.tracks[0];
      if (t?.preview) player.play({ ...t, id: song.id, title: song.title, artist: song.artist, cover: song.cover || t.cover });
      else setUnavailable(true);
    } catch { setUnavailable(true); } finally { setLoading(false); }
  }
  return { play, stop: () => { if (isCurrent) player.stop(); }, playing, loading, unavailable };
}

/** Chip de canción con play, al estilo de la música en las historias. */
export function SongChip({ song, onRemove, autoPlay = false, className = "" }: { song: ReviewSong; onRemove?: () => void; autoPlay?: boolean; className?: string }) {
  const pb = useSongPlayback(song);
  useEffect(() => {
    if (autoPlay) void pb.play();
    return () => pb.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song.id, autoPlay]);
  return (
    <div className={`flex items-center gap-2 rounded-full bg-background/80 py-1 pl-1 pr-2 text-xs backdrop-blur ${className}`}>
      <img src={song.cover} alt="" className="h-7 w-7 rounded-full object-cover" />
      <span className="min-w-0 flex-1"><span className="flex items-center gap-1 truncate font-bold"><Music2 className="h-3 w-3 shrink-0 text-primary" /><span className="truncate">{song.title}</span></span><span className="block truncate text-[10px] text-muted-foreground">{pb.unavailable ? "Vista previa no disponible" : song.artist}</span></span>
      <button type="button" onClick={() => void pb.play()} aria-label={pb.playing ? "Pausar" : "Escuchar"} className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
        {pb.loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : pb.playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
      </button>
      {onRemove && <button type="button" onClick={onRemove} aria-label="Quitar canción" className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted-foreground"><X className="h-3.5 w-3.5" /></button>}
    </div>
  );
}

export function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <fieldset>
      <legend className="mb-1 text-sm font-bold">Puntuación</legend>
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((v) => (
          <Button key={v} type="button" variant="ghost" size="icon" aria-label={`${v} ${v === 1 ? "estrella" : "estrellas"}`} aria-pressed={value === v} onClick={() => onChange(v)} className={value >= v ? "text-primary" : "text-muted-foreground"}>
            <Star className={`h-6 w-6 ${value >= v ? "fill-current" : ""}`} />
          </Button>
        ))}
      </div>
    </fieldset>
  );
}
