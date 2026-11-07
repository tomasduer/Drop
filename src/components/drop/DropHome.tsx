import { ListenButtons } from "./ListenButtons";
import { FORMAT_INFO, formatOfDay, isDailyRotation } from "@/lib/game-styles";
import { Countdown } from "./Countdown";
import { Fragment, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Bell, BellRing, Gift, Lock, Medal, ShoppingBag, Target, Trophy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getRanking } from "@/lib/drop.functions";
import type { DropInfo } from "@/lib/drops";
import { NEEDS_OPEN, resolveLayout, type BlockId } from "@/lib/drop-layout";
import { DropHero } from "./DropHeroes";
import { SetlistBlock, ShowDatesBlock, TracklistBlock } from "./DropBlocks";
import { artistSlug } from "@/lib/merch";
import { useDropAuth } from "./AuthProvider";
import { MapaView } from "./MapaView";
import { PasaporteView } from "./PasaporteView";
import type { DropTab } from "./DropNav";

// Recompensas genéricas para drops que todavía no tienen una colección propia.
const GENERIC_REWARDS = [
  { label: "Insignia de fan", need: 1 },
  { label: "Wallpaper exclusivo", need: 2 },
  { label: "Participación en el sorteo de entradas", need: 3 },
];

export function DropHome({ drop, onGo }: { drop: DropInfo; onGo: (tab: DropTab) => void }) {
  const { state, mode } = useDropAuth();
  const fetchRanking = useServerFn(getRanking);
  const [rank, setRank] = useState<number | null>(null);
  const [remind, setRemind] = useState(() => { try { return localStorage.getItem(`drop-aviso-${drop.id}`) === "1"; } catch { return false; } });

  useEffect(() => {
    setRank(null);
    if (mode !== "user" || drop.status === "upcoming") return;
    fetchRanking({ data: { campaign: drop.id, scope: "Global" } }).then((r) => setRank(r.me?.rank ?? null)).catch(() => setRank(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, drop.id, drop.status]);

  const missions = state.missions.filter((m) => m.campaign_id === drop.id && m.status === "verified");
  const doneIds = new Set(state.attempts.filter((a) => a.status === "completed").map((a) => a.mission_id));
  const done = missions.filter((m) => doneIds.has(m.id)).length;
  const score = state.balances.find((b) => b.campaign_id === drop.id)?.score ?? 0;
  const pct = missions.length ? Math.round((100 * done) / missions.length) : 0;
  const todayKey = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires" }).format(new Date());
  const dailyGame = missions.find((m) => isDailyRotation(m.id) && !state.attempts.some((a) => a.mission_id === m.id && a.status === "completed" && a.period_key === todayKey));
  const featured = dailyGame ?? missions.find((m) => !doneIds.has(m.id)) ?? missions[0];
  const todayFormat = featured ? formatOfDay(featured.id) : undefined;
  const active = drop.status === "active";

  const layout = resolveLayout(drop);
  const render = (id: BlockId): React.ReactNode => {
    if (drop.status === "upcoming" && NEEDS_OPEN.includes(id)) return null;
    switch (id) {
      case "intro": return <>{drop.description && <p className="text-sm leading-relaxed text-muted-foreground">{drop.description}</p>}
      {drop.kind !== "noticia" && <ListenButtons query={drop.kind === "show" ? drop.artist : `${drop.artist} ${drop.title}`} />}</>;
      case "progreso": return drop.status !== "upcoming" && (
        <section className="rounded-3xl p-4 text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>
          <p className="text-[11px] font-bold uppercase tracking-widest opacity-80">{drop.status === "archived" ? "Tu resultado final" : "Tu progreso en este drop"}</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div><p className="text-2xl font-black tabular-nums">{score.toLocaleString("es-AR")}</p><p className="text-[11px] opacity-80">pts de {drop.artist}</p></div>
            <div><p className="text-2xl font-black tabular-nums">{rank ? `#${rank}` : "—"}</p><p className="text-[11px] opacity-80">ranking</p></div>
            <div><p className="text-2xl font-black tabular-nums">{done}/{missions.length}</p><p className="text-[11px] opacity-80">misiones</p></div>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background/25"><div className="h-full rounded-full bg-background" style={{ width: `${pct}%` }} /></div>
          <p className="mt-2 text-xs opacity-90">
            {mode !== "user" ? "Creá una cuenta para sumar puntos y aparecer en el ranking." : drop.status === "archived" ? "Este drop finalizó: tu resultado quedó guardado." : pct === 100 ? "¡Completaste todo! Mantené tu racha con las misiones diarias." : "Los puntos de este drop cuentan solo para su ranking. Tus puntos generales están en tu perfil."}
          </p>
          {mode !== "user" && <Button asChild size="sm" variant="secondary" className="mt-3 w-full"><Link to="/auth" search={{ mode: "signup" }}>Crear cuenta</Link></Button>}
        </section>
      );
      case "proximamente": return drop.status === "upcoming" && (
        <section className="rounded-3xl border border-border bg-card p-5 text-center">
          {drop.launchAt ? <Countdown to={drop.launchAt} /> : <p className="text-lg font-black">Muy pronto</p>}
          <p className="mt-3 text-sm text-muted-foreground">Las misiones, el ranking y las recompensas se habilitan cuando abra el drop. Mientras tanto, pre-guardá el álbum en Spotify desde Misiones.</p>
          <Button className="mt-4 w-full" variant={remind ? "secondary" : "default"} onClick={() => {
            const next = !remind; setRemind(next);
            try { localStorage.setItem(`drop-aviso-${drop.id}`, next ? "1" : "0"); } catch { /* sin almacenamiento */ }
            toast.success(next ? `Te avisamos cuando abra el drop de ${drop.artist}` : "Aviso desactivado");
          }}>{remind ? <BellRing /> : <Bell />}{remind ? "Aviso activado" : "Avisarme cuando abra"}</Button>
        </section>
      );
      case "mision": return featured && drop.status !== "upcoming" && (
        <section>
          <h2 className="mb-3 text-xl font-black">{active ? "Tu próxima misión" : "Misiones del drop"}</h2>
          <button onClick={() => onGo("misiones")} className="relative block w-full overflow-hidden rounded-3xl border border-primary/40 text-left">
            <img decoding="async" src={drop.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="relative p-5">
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-primary"><Target className="h-3.5 w-3.5" />{todayFormat ? `Juego del día · ${FORMAT_INFO[todayFormat].icon} ${FORMAT_INFO[todayFormat].name}` : <>{featured.kind === "trivia" ? "Trivia" : featured.kind === "clue" ? "Acertijo" : featured.kind === "order" ? "Para ordenar" : "Desafío"}{featured.repeat_period === "daily" ? " · diaria" : ""}</>}</span>
              <p className="mt-1 text-lg font-black leading-tight">{featured.title}</p>
              <p className="mt-1 text-sm font-bold text-primary">+{featured.campaign_reward} pts de {drop.artist}</p>
              <span className="mt-4 inline-flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-black text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>
                {active ? (doneIds.has(featured.id) ? "Ver misiones" : "Jugar ahora") : "Ver misiones"} <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </button>
          <Button variant="outline" className="mt-3 w-full" onClick={() => onGo("misiones")}>Ver las {missions.length} misiones</Button>
        </section>
      );
      case "premios": return drop.prizes?.length && drop.status !== "upcoming" ? (
        <section>
          <h2 className="text-xl font-black">Premios del ranking</h2>
          <p className="mb-3 text-sm text-muted-foreground">{drop.status === "archived" ? "Lo que se ganaron los primeros del ranking." : "Cuando cierre el drop, los primeros del ranking se llevan:"}</p>
          <div className="space-y-2">
            {drop.prizes.map((p, i) => {
              const inside = rank !== null && rank <= p.top;
              return (
                <div key={p.top} className={`flex items-center gap-3 rounded-2xl border p-3 ${inside ? "border-primary/60 bg-primary/10" : "border-border bg-card"}`}>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>
                    {i === 0 ? <Medal className="h-5 w-5" /> : <Gift className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-black uppercase tracking-widest text-primary">Top {p.top}</p>
                    <p className="text-sm font-bold leading-snug">{p.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {rank === null ? `Los primeros ${p.top} del ranking` : inside ? `¡Estás adentro! Vas #${rank}` : `Vas #${rank}: te faltan ${rank - p.top} puestos`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {active && <Button variant="outline" className="mt-3 w-full" onClick={() => onGo("ranking")}><Trophy /> Ver el ranking</Button>}
        </section>
      ) : null;
      case "merch": return drop.merch?.length ? (
        <Link to="/tienda" search={{ a: artistSlug(drop.artist) }} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <img src={drop.merch[0].image} alt="" loading="lazy" decoding="async" className="h-14 w-14 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">Tienda oficial de {drop.artist}</p>
            <p className="text-xs text-muted-foreground">{drop.merch.length} productos{drop.merch.some((m) => m.top) ? ", algunos exclusivos del ranking" : ""}</p>
          </div>
          <ShoppingBag className="h-5 w-5 text-primary" />
        </Link>
      ) : null;
      case "recorrido": return drop.id === "lali" && <MapaView embedded onGoMisiones={() => onGo("misiones")} />;
      case "recompensas": return drop.id === "lali" ? <PasaporteView embedded /> : drop.status !== "upcoming" && !drop.prizes?.length && (
        <section>
          <h2 className="text-xl font-black">Recompensas</h2>
          <p className="mb-3 text-sm text-muted-foreground">{drop.status === "archived" ? "Lo que se podía ganar en este drop." : "Completá misiones para desbloquearlas."}</p>
          <div className="space-y-2">
            {GENERIC_REWARDS.map((r) => {
              const got = done >= r.need;
              return (
                <div key={r.label} className={`flex items-center gap-3 rounded-2xl border p-3 ${got ? "border-primary/50 bg-primary/10" : "border-border bg-card"}`}>
                  <span className={`grid h-10 w-10 place-items-center rounded-xl ${got ? "text-primary-foreground" : "bg-muted text-muted-foreground"}`} style={got ? { backgroundImage: "var(--gradient-drop)" } : undefined}>
                    {got ? <Gift className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{got ? "Desbloqueada" : `Completá ${r.need} ${r.need === 1 ? "misión" : "misiones"} (${Math.min(done, r.need)}/${r.need})`}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      );
      case "accesos": return drop.status !== "upcoming" && (
        <section className="grid grid-cols-2 gap-3">
          <button onClick={() => onGo("ranking")} className="rounded-2xl border border-border bg-card p-4 text-left">
            {drop.status === "archived" ? <Medal className="h-5 w-5 text-primary" /> : <Trophy className="h-5 w-5 text-primary" />}
            <p className="mt-2 text-sm font-bold">{drop.status === "archived" ? "Ranking final" : "Ranking"}</p>
            <p className="text-xs text-muted-foreground">Los fans que más sumaron</p>
          </button>
          <button onClick={() => onGo("comunidad")} className="rounded-2xl border border-border bg-card p-4 text-left">
            <span className="text-lg">💬</span>
            <p className="mt-1 text-sm font-bold">{drop.fandom}</p>
            <p className="text-xs text-muted-foreground">La comunidad del drop</p>
          </button>
        </section>
      );
      case "fechas": return <ShowDatesBlock drop={drop} />;
      case "tracklist": return <TracklistBlock drop={drop} pct={pct} />;
      case "setlist": return <SetlistBlock drop={drop} />;
    }
  };

  return (
    <div className="space-y-6 px-5">
      <DropHero drop={drop} style={layout.hero} />
      {layout.blocks.filter((b) => !b.hidden).map((b) => <Fragment key={b.id}>{render(b.id)}</Fragment>)}
    </div>
  );
}
