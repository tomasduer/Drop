import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ChevronDown, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRanking } from "@/lib/drop.functions";
import type { DropProgress } from "@/lib/progress";
import { useDropAuth } from "./AuthProvider";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Puntos y estadísticas de cada drop en el que participa el fan, dentro de su perfil.
export function DropStatsSection({ progress }: { progress: DropProgress[] }) {
  const { mode } = useDropAuth();
  const mine = progress.filter((p) => p.participating).sort((a, b) => b.score - a.score);
  return (
    <section id="perfil-por-drop" className="mt-7 scroll-mt-4">
      <div className="mb-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Tus fandoms</p>
        <h2 className="text-xl font-black">Puntos por drop</h2>
        <p className="mt-1 text-xs text-muted-foreground">Cada drop tiene su propio puntaje y ranking. Tocá uno para ver el detalle.</p>
      </div>
      {mine.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
          <p className="text-sm font-bold">Todavía no sumaste puntos en ningún drop</p>
          <p className="mt-1 text-xs text-muted-foreground">Jugá las misiones de un drop y acá vas a ver tus puntos, tu puesto y tu avance.</p>
          <Button asChild size="sm" className="mt-3"><Link to="/explorar">Elegir un drop</Link></Button>
        </div>
      ) : (
        <div className="space-y-2">
          {mine.map((p, i) => <DropStatCard key={p.drop.id} p={p} canRank={mode === "user"} defaultOpen={i === 0} />)}
        </div>
      )}
    </section>
  );
}

function DropStatCard({ p, canRank, defaultOpen }: { p: DropProgress; canRank: boolean; defaultOpen: boolean }) {
  const { state, revision } = useDropAuth();
  const fetchRanking = useServerFn(getRanking);
  const [open, setOpen] = useState(defaultOpen);
  const [rank, setRank] = useState<{ global: number | null; weekly: number | null } | null>(null);
  const { drop } = p;

  useEffect(() => {
    if (!open || !canRank || drop.status === "upcoming") return;
    let alive = true;
    Promise.all([
      fetchRanking({ data: { campaign: drop.id, scope: "Global" } }).catch(() => null),
      fetchRanking({ data: { campaign: drop.id, scope: "Semanal" } }).catch(() => null),
    ]).then(([g, w]) => { if (alive) setRank({ global: g?.me?.rank ?? null, weekly: w?.me && w.me.score > 0 ? w.me.rank : null }); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, canRank, drop.id, revision]);

  const now = Date.now();
  const movements = state.movements.filter((m) => m.campaign_id === drop.id && m.campaign_delta > 0);
  const weekPoints = movements.filter((m) => now - new Date(m.created_at).getTime() < WEEK_MS).reduce((s, m) => s + m.campaign_delta, 0);
  const last = movements.reduce<string | null>((acc, m) => (!acc || m.created_at > acc ? m.created_at : acc), null);
  const pct = p.total > 0 ? Math.round((p.done / p.total) * 100) : 0;
  const prize = rank?.global ? drop.prizes?.slice().sort((a, b) => a.top - b.top).find((pr) => rank.global! <= pr.top) : undefined;
  const finished = drop.status === "archived";

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-center gap-3 p-3 text-left">
        <img loading="lazy" decoding="async" src={drop.cover} alt="" className={`h-12 w-12 shrink-0 rounded-xl object-cover ${finished ? "sepia-[0.5]" : ""}`} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{drop.artist}</p>
          <p className="truncate text-xs text-muted-foreground">{drop.title}{finished ? " · finalizado" : ""}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-black tabular-nums leading-none">{p.score.toLocaleString("es-AR")}</p>
          <p className="text-[11px] text-muted-foreground">pts</p>
        </div>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border p-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <Mini value={canRank ? (rank ? (rank.global ? `#${rank.global}` : "—") : "…") : "—"} label="Ranking" />
            <Mini value={canRank ? (rank ? (rank.weekly ? `#${rank.weekly}` : "—") : "…") : "—"} label="Semanal" />
            <Mini value={`+${weekPoints.toLocaleString("es-AR")}`} label="Esta semana" />
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-[11px] text-muted-foreground"><span>Misiones completadas</span><span className="font-bold text-foreground">{p.done}/{p.total}</span></div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
          </div>
          {prize && <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold"><Trophy className="h-3.5 w-3.5 text-primary" />Estás en el top {prize.top}: {prize.label}</p>}
          {!canRank && <p className="mt-3 text-[11px] text-muted-foreground">Creá tu cuenta para ver tu puesto en el ranking.</p>}
          {last && <p className="mt-2 text-[11px] text-muted-foreground">Último punto sumado el {new Date(last).toLocaleDateString("es-AR")}</p>}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button asChild size="sm" variant="outline"><Link to="/drop" search={{ d: drop.id, tab: "ranking" }}>Ver ranking</Link></Button>
            <Button asChild size="sm"><Link to="/drop" search={{ d: drop.id, tab: "misiones" }}>{finished ? "Ver drop" : "Seguir sumando"}</Link></Button>
          </div>
        </div>
      )}
    </article>
  );
}

function Mini({ value, label }: { value: string; label: string }) {
  return <div className="rounded-xl bg-muted/50 p-2"><p className="text-base font-black tabular-nums">{value}</p><p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p></div>;
}
