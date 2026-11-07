import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, Loader2, MapPin, Pause, Play } from "lucide-react";
import { STATUS_LABEL, type DropInfo } from "@/lib/drops";
import type { HeroStyle } from "@/lib/drop-layout";
import { searchCatalog } from "@/lib/music.functions";
import { ArtistLine } from "./ArtistLine";
import { useMusicPlayer } from "./MusicPlayer";

// Las cinco portadas posibles del inicio de un drop.

function StatusBadge({ drop, className = "" }: { drop: DropInfo; className?: string }) {
  const active = drop.status === "active";
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wider ${active ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground"} ${className}`}>
      {drop.status === "archived" ? "📼 Archivo" : STATUS_LABEL[drop.status]}
    </span>
  );
}

const faded = (drop: DropInfo) => (drop.status === "archived" ? "grayscale-[60%]" : "");

export function DropHero({ drop, style }: { drop: DropInfo; style: HeroStyle }) {
  if (style === "vinilo") return <VinylHero drop={drop} />;
  if (style === "ticket") return <TicketHero drop={drop} />;
  if (style === "single") return <SingleHero drop={drop} />;
  if (style === "revista") return <MagazineHero drop={drop} />;
  return <CinematicHero drop={drop} />;
}

function CinematicHero({ drop }: { drop: DropInfo }) {
  return (
    <section className="relative -mx-5 -mt-2 overflow-hidden">
      <img decoding="async" src={drop.hero} alt={drop.artist} className={`h-72 w-full object-cover ${faded(drop)}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-x-5 bottom-4">
        <StatusBadge drop={drop} />
        <p className="mt-2 text-sm font-bold text-primary"><ArtistLine drop={drop} /></p>
        <h1 className="text-3xl font-black leading-tight">{drop.title}</h1>
        {drop.tagline && <p className="mt-1 text-sm text-muted-foreground">{drop.tagline}</p>}
      </div>
    </section>
  );
}

/** Álbum: la tapa del disco con el vinilo asomando, sobre la portada desenfocada. */
function VinylHero({ drop }: { drop: DropInfo }) {
  return (
    <section className="relative -mx-5 -mt-2 overflow-hidden px-5 pb-5 pt-8">
      <img decoding="async" src={drop.hero} alt="" aria-hidden className={`absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl ${faded(drop)}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      <div className="relative mx-auto w-fit pr-16">
        <div className="absolute right-0 top-1/2 h-44 w-44 -translate-y-1/2 animate-[spin_9s_linear_infinite] rounded-full shadow-xl motion-reduce:animate-none"
          style={{ background: "repeating-radial-gradient(circle, #111 0 2px, #1d1d1d 2px 4px)" }} aria-hidden>
          <img src={drop.album} alt="" className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover ring-2 ring-black" />
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
        </div>
        <img decoding="async" src={drop.album} alt={`Tapa de ${drop.title}`} className={`relative h-48 w-48 rounded-md object-cover shadow-2xl ${faded(drop)}`} />
      </div>
      <div className="relative mt-5 text-center">
        <StatusBadge drop={drop} />
        <p className="mt-2 text-sm font-bold text-primary"><ArtistLine drop={drop} /></p>
        <h1 className="text-3xl font-black leading-tight">{drop.title}</h1>
        {drop.tagline && <p className="mt-1 text-sm text-muted-foreground">{drop.tagline}</p>}
      </div>
    </section>
  );
}

/** Show: como una entrada, con el talón troquelado que dice dónde y cuándo. */
function TicketHero({ drop }: { drop: DropInfo }) {
  const dates = drop.showDates?.dates ?? [];
  const where = drop.showDates?.label ?? drop.dates;
  return (
    <section className="pt-2">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div className="relative">
          <img decoding="async" src={drop.hero} alt={drop.artist} className={`h-52 w-full object-cover ${faded(drop)}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <StatusBadge drop={drop} className="absolute left-4 top-4" />
          <span className="absolute right-4 top-4 rounded-md border border-white/60 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.25em] text-white">Admit one</span>
        </div>
        <div className="px-5 pb-4">
          <p className="text-sm font-bold text-primary"><ArtistLine drop={drop} /></p>
          <h1 className="text-3xl font-black leading-tight">{drop.title}</h1>
          {drop.tagline && <p className="mt-1 text-sm text-muted-foreground">{drop.tagline}</p>}
        </div>
        {/* Troquel */}
        <div className="relative flex items-center">
          <span className="-ml-3 h-6 w-6 rounded-full border border-border bg-background" />
          <span className="flex-1 border-t-2 border-dashed border-border" />
          <span className="-mr-3 h-6 w-6 rounded-full border border-border bg-background" />
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-4">
          <div className="min-w-0 space-y-1 text-xs">
            {where && <p className="flex items-center gap-1.5 font-bold"><MapPin className="h-3.5 w-3.5 shrink-0 text-primary" /><span className="truncate">{where}</span></p>}
            {dates.length > 0 && <p className="flex items-center gap-1.5 text-muted-foreground"><CalendarDays className="h-3.5 w-3.5 shrink-0 text-primary" />{dates.length} funciones · {dates[0]} a {dates[dates.length - 1]}</p>}
          </div>
          {/* Código de barras decorativo */}
          <div className="flex h-10 items-stretch gap-[2px]" aria-hidden>
            {Array.from({ length: 18 }, (_, i) => <span key={i} className="bg-foreground" style={{ width: (i * 7) % 3 === 0 ? 3 : 1 }} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Single: la tapa ocupa todo y se puede escuchar sin salir del drop. */
function SingleHero({ drop }: { drop: DropInfo }) {
  const player = useMusicPlayer();
  const search = useServerFn(searchCatalog);
  const [trackId, setTrackId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const isCurrent = trackId !== null && player.current?.id === trackId;
  const playing = isCurrent && player.playing;

  async function play() {
    if (isCurrent) { player.toggle(); return; }
    setLoading(true); setFailed(false);
    try {
      const r = await search({ data: { q: `${drop.artist} ${drop.spotifyAlbum ?? drop.title}`.slice(0, 80) } });
      const t = r.tracks[0];
      if (t) { setTrackId(t.id); player.play(t); } else setFailed(true);
    } catch { setFailed(true); } finally { setLoading(false); }
  }

  return (
    <section className="relative -mx-5 -mt-2 overflow-hidden">
      <img decoding="async" src={drop.album} alt={`Tapa de ${drop.title}`} className={`aspect-square w-full object-cover ${faded(drop)}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <StatusBadge drop={drop} className="absolute left-5 top-4" />
      <div className="absolute inset-x-5 bottom-4 flex items-end gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-primary"><ArtistLine drop={drop} /></p>
          <h1 className="text-4xl font-black leading-none">{drop.title}</h1>
          {drop.tagline && <p className="mt-1 text-sm text-muted-foreground">{drop.tagline}</p>}
          {failed && <p className="mt-1 text-xs text-muted-foreground">La vista previa no está disponible ahora.</p>}
        </div>
        <button type="button" onClick={() => void play()} aria-label={playing ? "Pausar" : "Escuchar el single"}
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full text-primary-foreground shadow-xl" style={{ backgroundImage: "var(--gradient-drop)" }}>
          {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : playing ? <Pause className="h-7 w-7" /> : <Play className="ml-1 h-7 w-7" />}
        </button>
      </div>
      {playing && (
        <div className="absolute inset-x-5 top-14 flex h-6 items-end gap-1" aria-hidden>
          {Array.from({ length: 24 }, (_, i) => <span key={i} className="w-1 flex-1 origin-bottom animate-pulse rounded-full bg-white/80" style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 6) * 120}ms` }} />)}
        </div>
      )}
    </section>
  );
}

/** Novedad: titular de diario con fecha, foto y bajada. */
function MagazineHero({ drop }: { drop: DropInfo }) {
  const today = new Date().toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
  return (
    <section className="pt-2">
      <div className="flex items-center justify-between border-y-2 border-foreground py-1 text-[10px] font-black uppercase tracking-[0.2em]">
        <span>DROP · Novedades</span><span className="font-bold text-muted-foreground">{today}</span>
      </div>
      <div className="mt-3 flex items-center gap-2"><StatusBadge drop={drop} /><p className="text-xs font-bold uppercase tracking-widest text-primary">{drop.artist}</p></div>
      <h1 className="mt-2 text-4xl font-black leading-[0.95]">{drop.title}</h1>
      {drop.tagline && <p className="mt-3 border-l-4 border-primary pl-3 text-base font-bold leading-snug">{drop.tagline}</p>}
      <figure className="mt-4">
        <img decoding="async" src={drop.hero} alt={drop.artist} className={`aspect-[4/3] w-full rounded-xl object-cover ${faded(drop)}`} />
        <figcaption className="mt-1 text-[11px] text-muted-foreground">{drop.artist}{drop.dates ? ` · ${drop.dates}` : ""}</figcaption>
      </figure>
    </section>
  );
}
