import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Pause, Play, SkipForward, X } from "lucide-react";
import type { CatalogTrack } from "@/lib/music.functions";

type PlayerValue = {
  current: CatalogTrack | null;
  playing: boolean;
  progress: number;
  play: (track: CatalogTrack, queue?: CatalogTrack[]) => void;
  toggle: () => void;
  next: () => void;
  stop: () => void;
};

const PlayerContext = createContext<PlayerValue | null>(null);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<CatalogTrack[]>([]);
  const [current, setCurrent] = useState<CatalogTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const start = useCallback((track: CatalogTrack) => {
    if (!audio.current) audio.current = new Audio();
    const el = audio.current;
    el.src = track.preview;
    setCurrent(track);
    setProgress(0);
    void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const next = useCallback(() => {
    setQueue((q) => {
      const idx = current ? q.findIndex((t) => t.id === current.id) : -1;
      const nextTrack = q[idx + 1];
      if (nextTrack) start(nextTrack);
      else { audio.current?.pause(); setPlaying(false); }
      return q;
    });
  }, [current, start]);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0);
    const onEnd = () => next();
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    el.addEventListener("timeupdate", onTime); el.addEventListener("ended", onEnd);
    el.addEventListener("pause", onPause); el.addEventListener("play", onPlay);
    return () => { el.removeEventListener("timeupdate", onTime); el.removeEventListener("ended", onEnd); el.removeEventListener("pause", onPause); el.removeEventListener("play", onPlay); };
  }, [current, next]);

  const value = useMemo<PlayerValue>(() => ({
    current, playing, progress,
    play: (track, q) => {
      if (current?.id === track.id && audio.current) { if (audio.current.paused) void audio.current.play(); else audio.current.pause(); return; }
      setQueue(q && q.length ? q.filter((t) => t.preview) : [track]);
      start(track);
    },
    toggle: () => { const el = audio.current; if (!el) return; if (el.paused) void el.play(); else el.pause(); },
    next,
    stop: () => { audio.current?.pause(); setCurrent(null); setPlaying(false); },
  }), [current, playing, progress, start, next]);

  return <PlayerContext.Provider value={value}>{children}<MiniPlayer /></PlayerContext.Provider>;
}

export function useMusicPlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("useMusicPlayer fuera de MusicPlayerProvider");
  return ctx;
}

function MiniPlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx?.current) return null;
  const { current, playing, progress, toggle, next, stop } = ctx;
  return (
    <div className="fixed inset-x-0 bottom-[88px] z-40 mx-auto w-full max-w-[440px] px-3">
      <div className="overflow-hidden rounded-2xl border border-border bg-card/95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div className="flex items-center gap-3 p-2">
          {current.cover && <img src={current.cover} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{current.title}</p>
            <p className="truncate text-[11px] text-muted-foreground">{current.artist} · vista previa</p>
          </div>
          <button aria-label={playing ? "Pausar" : "Reproducir"} onClick={toggle} className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button aria-label="Siguiente" onClick={next} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground"><SkipForward className="h-4 w-4" /></button>
          <button aria-label="Cerrar reproductor" onClick={stop} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="h-0.5 bg-muted"><div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} /></div>
      </div>
    </div>
  );
}
