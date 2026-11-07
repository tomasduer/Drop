import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, Lock, Pause, Play, Ticket } from "lucide-react";
import { toast } from "sonner";
import type { DropInfo } from "@/lib/drops";
import { getCatalogAlbum, getCatalogArtist, searchCatalog, type CatalogTrack } from "@/lib/music.functions";
import { useMusicPlayer } from "./MusicPlayer";

// Bloques propios de cada tipo de drop: tracklist (álbum), fechas y setlist (show).

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const readLocal = <T,>(key: string, fallback: T): T => { try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; } };
const writeLocal = (key: string, v: unknown) => { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* sin almacenamiento */ } };
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

// Lo que se trae del catálogo se guarda por drop para no pedirlo de nuevo al cambiar de pestaña.
const tracklistCache = new Map<string, CatalogTrack[]>();
const setlistCache = new Map<string, CatalogTrack[]>();

function useCatalogList(cache: Map<string, CatalogTrack[]>, key: string, load: () => Promise<CatalogTrack[]>) {
  const [tracks, setTracks] = useState<CatalogTrack[] | null>(() => cache.get(key) ?? null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (cache.has(key)) { setTracks(cache.get(key)!); return; }
    let alive = true;
    setTracks(null); setFailed(false);
    load().then((t) => { cache.set(key, t); if (alive) setTracks(t); }).catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return { tracks, failed };
}

function PlayButton({ track, queue }: { track: CatalogTrack; queue: CatalogTrack[] }) {
  const player = useMusicPlayer();
  const isCurrent = player.current?.id === track.id;
  const playing = isCurrent && player.playing;
  return (
    <button type="button" disabled={!track.preview} onClick={() => (isCurrent ? player.toggle() : player.play(track, queue))} aria-label={playing ? "Pausar" : `Escuchar ${track.title}`}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-40">
      {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
    </button>
  );
}

/** Álbum: las canciones se van liberando a medida que el fan completa misiones. */
export function TracklistBlock({ drop, pct }: { drop: DropInfo; pct: number }) {
  const search = useServerFn(searchCatalog);
  const getAlbum = useServerFn(getCatalogAlbum);
  const { tracks, failed } = useCatalogList(tracklistCache, drop.id, async () => {
    const name = drop.spotifyAlbum ?? drop.title;
    const r = await search({ data: { q: `${drop.artist} ${name}`.slice(0, 80) } });
    const album = r.albums.find((a) => norm(a.title) === norm(name)) ?? r.albums.find((a) => norm(a.artist) === norm(drop.artist)) ?? r.albums[0];
    if (!album) return [];
    return (await getAlbum({ data: { id: album.id } })).trackList;
  });
  if (failed || (tracks && tracks.length === 0)) return null;
  const total = tracks?.length ?? 0;
  const open = drop.status === "archived" ? total : Math.max(1, Math.min(total, Math.ceil((total * pct) / 100)));
  const playable = (tracks ?? []).slice(0, open);

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black">Tracklist</h2>
          <p className="text-sm text-muted-foreground">{drop.status === "archived" ? "El disco completo, para volver a escucharlo." : "Cada misión que completás libera más canciones."}</p>
        </div>
        {tracks && <span className="shrink-0 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-black tabular-nums text-primary">{open}/{total}</span>}
      </div>
      {!tracks ? (
        <div className="grid h-24 place-items-center rounded-2xl border border-border bg-card"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
      ) : (
        <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {tracks.map((t, i) => {
            const locked = i >= open;
            return (
              <li key={t.id} className="flex items-center gap-3 px-3 py-2.5">
                <span className="w-5 shrink-0 text-right text-xs font-bold tabular-nums text-muted-foreground">{i + 1}</span>
                <span className={`min-w-0 flex-1 truncate text-sm font-bold ${locked ? "select-none blur-[5px]" : ""}`} aria-hidden={locked}>{t.title}</span>
                {locked ? (
                  <><span className="sr-only">Canción bloqueada</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"><Lock className="h-3.5 w-3.5" /></span></>
                ) : (
                  <><span className="text-[11px] tabular-nums text-muted-foreground">{t.duration ? mmss(t.duration) : ""}</span><PlayButton track={t} queue={playable} /></>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

/** Show: las funciones, y el fan marca a cuál va. */
export function ShowDatesBlock({ drop }: { drop: DropInfo }) {
  const key = `drop-mi-fecha-${drop.id}`;
  const [mine, setMine] = useState<string | null>(() => readLocal<string | null>(key, null));
  if (!drop.showDates?.dates.length) return null;
  const pick = (d: string) => {
    const next = mine === d ? null : d;
    setMine(next); writeLocal(key, next);
    if (next) toast.success(`Listo: vas el ${next}`);
  };
  return (
    <section>
      <h2 className="text-xl font-black">Fechas</h2>
      <p className="mb-3 text-sm text-muted-foreground">{drop.showDates.dates.length} funciones · {drop.showDates.label}. Tocá la tuya.</p>
      <div className="grid grid-cols-4 gap-2">
        {drop.showDates.dates.map((d) => {
          const [day, num] = d.split(" ");
          const on = mine === d;
          return (
            <button key={d} type="button" onClick={() => pick(d)} aria-pressed={on}
              className={`rounded-xl border px-1 py-2 text-center transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>
              <span className="block text-[10px] font-bold uppercase opacity-70">{day}</span>
              <span className="block text-sm font-black tabular-nums">{num ?? d}</span>
            </button>
          );
        })}
      </div>
      {mine && <p className="mt-3 flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-sm font-bold"><Ticket className="h-4 w-4 text-primary" />Tu fecha: {mine}</p>}
    </section>
  );
}

/** Votos de demo, siempre los mismos para cada canción, para que la votación no arranque vacía. */
function seededVotes(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return 140 + ((h >>> 0) % 2300);
}

/** Show: los fans votan hasta 3 canciones que quieren escuchar en vivo. */
export function SetlistBlock({ drop }: { drop: DropInfo }) {
  const search = useServerFn(searchCatalog);
  const getArtist = useServerFn(getCatalogArtist);
  const key = `drop-setlist-${drop.id}`;
  const [votes, setVotes] = useState<number[]>(() => readLocal<number[]>(key, []));
  const { tracks, failed } = useCatalogList(setlistCache, drop.id, async () => {
    const r = await search({ data: { q: drop.artist.slice(0, 80) } });
    const artist = r.artists.find((a) => norm(a.name) === norm(drop.artist)) ?? r.artists[0];
    if (!artist) return [];
    return (await getArtist({ data: { id: artist.id } })).top.slice(0, 8);
  });
  if (failed || (tracks && tracks.length === 0)) return null;

  const toggle = (id: number) => {
    const next = votes.includes(id) ? votes.filter((v) => v !== id) : votes.length >= 3 ? null : [...votes, id];
    if (!next) { toast("Ya elegiste 3 canciones. Sacá una para votar otra."); return; }
    setVotes(next); writeLocal(key, next);
  };
  const rows = (tracks ?? []).map((t) => ({ t, count: seededVotes(`${drop.id}-${t.id}`) + (votes.includes(t.id) ? 1 : 0) })).sort((a, b) => b.count - a.count);
  const max = rows[0]?.count ?? 1;

  return (
    <section>
      <h2 className="text-xl font-black">Votá el setlist</h2>
      <p className="mb-3 text-sm text-muted-foreground">Elegí hasta 3 canciones que querés escuchar en el show ({votes.length}/3).</p>
      {!tracks ? (
        <div className="grid h-24 place-items-center rounded-2xl border border-border bg-card"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="space-y-2">
          {rows.map(({ t, count }) => {
            const on = votes.includes(t.id);
            return (
              <div key={t.id} className={`relative flex items-center gap-3 overflow-hidden rounded-2xl border p-2 ${on ? "border-primary" : "border-border"} bg-card`}>
                <span className="absolute inset-y-0 left-0 bg-primary/15" style={{ width: `${Math.round((100 * count) / max)}%` }} aria-hidden />
                <img src={t.cover} alt="" loading="lazy" className="relative h-10 w-10 rounded-lg object-cover" />
                <span className="relative min-w-0 flex-1"><span className="block truncate text-sm font-bold">{t.title}</span><span className="block text-[11px] tabular-nums text-muted-foreground">{count.toLocaleString("es-AR")} votos</span></span>
                <span className="relative"><PlayButton track={t} queue={tracks} /></span>
                <button type="button" onClick={() => toggle(t.id)} aria-pressed={on} aria-label={on ? `Quitar voto a ${t.title}` : `Votar ${t.title}`}
                  className={`relative grid h-8 shrink-0 place-items-center rounded-full px-3 text-xs font-black ${on ? "bg-primary text-primary-foreground" : "border border-border bg-background"}`}>
                  {on ? <Check className="h-3.5 w-3.5" /> : "Votar"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
