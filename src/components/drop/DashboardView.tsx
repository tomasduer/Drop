import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Activity, Bookmark, Heart, Loader2, MessageSquare, Music, Share2, Sparkles, Star, Target, TrendingUp, UserPlus, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getRanking } from "@/lib/drop.functions";
import { useDrops, type DropInfo } from "@/lib/drops";
import { useDropAuth } from "./AuthProvider";

// Dashboard para administradoras. Las métricas salen de la base vía las RPC
// drop_admin_overview / drop_admin_stats (supabase/demo/17-dashboard-admin.sql).
// Si esas funciones todavía no están instaladas, se usa el ranking público como respaldo.

type Overview = { campaign_id: string; participants: number; points: number; completions: number; active_7d: number; saves: number };
type Stats = {
  participants: number; points: number; saves: number; completions: number; active_7d: number; new_7d: number;
  posts: number; likes: number;
  missions: { id: string; title: string; kind: string; completions: number; fans: number }[];
  daily: { day: string; completions: number }[];
  top: { display_name: string; avatar_url: string | null; score: number; missions: number }[];
};

type Rpc = (fn: string, args?: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>;
const rpc: Rpc = (fn, args) => (supabase.rpc as unknown as Rpc)(fn, args);
const n = (v: number) => v.toLocaleString("es-AR");
const STATUS: Record<DropInfo["status"], string> = { active: "Activo", upcoming: "Próximo", archived: "Finalizado" };

export function DashboardView() {
  const drops = useDrops();
  const [sel, setSel] = useState<string>("todos");
  const drop = drops.find((d) => d.id === sel);

  return (
    <div className="space-y-5 px-4 pb-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Solo administradoras</p>
        <h2 className="text-2xl font-black">Dashboard analítico</h2>
        <p className="text-sm text-muted-foreground">{drop ? `${drop.artist} · ${drop.title}` : "Resumen de todos los drops"}</p>
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1" role="tablist" aria-label="Elegir drop">
        <Chip active={sel === "todos"} onClick={() => setSel("todos")}>Todos</Chip>
        {drops.map((d) => (
          <Chip key={d.id} active={sel === d.id} onClick={() => setSel(d.id)}>
            <img src={d.cover} alt="" className="h-5 w-5 rounded-full object-cover" />{d.artist}{drops.filter((x) => x.artist === d.artist).length > 1 ? ` · ${d.title}` : ""}
          </Chip>
        ))}
      </div>

      {drop ? <DropDetail key={drop.id} drop={drop} /> : <AllDrops drops={drops} onPick={setSel} />}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}>
      {children}
    </button>
  );
}

/** Tabla comparativa de todos los drops. */
function AllDrops({ drops, onPick }: { drops: DropInfo[]; onPick: (id: string) => void }) {
  const fetchRanking = useServerFn(getRanking);
  const [rows, setRows] = useState<Overview[] | null>(null);
  const [partial, setPartial] = useState(false);

  useEffect(() => {
    let alive = true;
    void rpc("drop_admin_overview").then(async ({ data, error }) => {
      if (!alive) return;
      if (!error && Array.isArray(data)) { setRows(data as Overview[]); return; }
      // Respaldo: armamos el resumen con el ranking de cada drop (hasta 50 fans por drop).
      setPartial(true);
      const list = await Promise.all(drops.map(async (d) => {
        const r = await fetchRanking({ data: { campaign: d.id, scope: "Global" } }).catch(() => null);
        const fans = (r?.rows ?? []).filter((f) => f.score > 0);
        return { campaign_id: d.id, participants: fans.length, points: fans.reduce((s, f) => s + f.score, 0), completions: fans.reduce((s, f) => s + f.missions, 0), active_7d: -1, saves: -1 };
      }));
      if (alive) setRows(list);
    });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drops.length]);

  if (!rows) return <Loading />;
  const byId = new Map(rows.map((r) => [r.campaign_id, r]));
  const list = drops.map((d) => ({ d, r: byId.get(d.id) })).sort((a, b) => (b.r?.participants ?? 0) - (a.r?.participants ?? 0));
  const total = rows.reduce((acc, r) => ({ participants: acc.participants + r.participants, points: acc.points + r.points, completions: acc.completions + r.completions }), { participants: 0, points: 0, completions: 0 });

  return (
    <>
      <section className="grid grid-cols-3 gap-2">
        <Kpi icon={Users} label="Participaciones" value={n(total.participants)} />
        <Kpi icon={Target} label="Misiones hechas" value={n(total.completions)} />
        <Kpi icon={Sparkles} label="Puntos" value={n(total.points)} />
      </section>
      <section className="space-y-2">
        {list.map(({ d, r }) => (
          <button key={d.id} type="button" onClick={() => onPick(d.id)} className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/50">
            <img src={d.cover} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{d.artist} <span className="font-semibold text-muted-foreground">{d.title}</span> <span className="text-[11px] font-semibold text-muted-foreground">· {STATUS[d.status]}</span></p>
              <p className="text-[11px] text-muted-foreground">
                {n(r?.completions ?? 0)} misiones · {n(r?.points ?? 0)} pts{r && r.active_7d >= 0 ? ` · ${n(r.active_7d)} activos 7d` : ""}{r && r.saves >= 0 ? ` · ${n(r.saves)} guardados` : ""}
              </p>
            </div>
            <div className="text-right"><p className="text-lg font-black tabular-nums leading-none">{n(r?.participants ?? 0)}</p><p className="text-[11px] text-muted-foreground">fans</p></div>
          </button>
        ))}
      </section>
      {partial && <PartialNote />}
    </>
  );
}

/** Métricas de un drop. */
function DropDetail({ drop }: { drop: DropInfo }) {
  const { state } = useDropAuth();
  const fetchRanking = useServerFn(getRanking);
  const [stats, setStats] = useState<Stats | null>(null);
  const [partial, setPartial] = useState(false);

  useEffect(() => {
    let alive = true;
    void rpc("drop_admin_stats", { p_campaign: drop.id }).then(async ({ data, error }) => {
      if (!alive) return;
      if (!error && data && typeof data === "object") { setStats(data as Stats); return; }
      setPartial(true);
      const r = await fetchRanking({ data: { campaign: drop.id, scope: "Global" } }).catch(() => null);
      const fans = (r?.rows ?? []).filter((f) => f.score > 0);
      const missions = state.missions.filter((m) => m.campaign_id === drop.id && m.status === "verified").map((m) => ({ id: m.id, title: m.title, kind: m.kind, completions: -1, fans: -1 }));
      if (alive) setStats({
        participants: fans.length, points: fans.reduce((s, f) => s + f.score, 0), saves: -1, completions: fans.reduce((s, f) => s + f.missions, 0),
        active_7d: -1, new_7d: -1, posts: -1, likes: -1, missions, daily: [],
        top: fans.slice(0, 10).map((f) => ({ display_name: f.display_name, avatar_url: f.avatar_url, score: f.score, missions: f.missions })),
      });
    });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drop.id]);

  const maxDaily = useMemo(() => Math.max(1, ...(stats?.daily ?? []).map((d) => d.completions)), [stats]);
  if (!stats) return <Loading />;
  const v = (x: number) => (x < 0 ? "—" : n(x));
  const avg = stats.participants > 0 ? Math.round(stats.points / stats.participants) : 0;

  return (
    <>
      <section className="grid grid-cols-2 gap-2">
        <Kpi icon={Users} label="Fans participando" value={v(stats.participants)} />
        <Kpi icon={Activity} label="Activos últimos 7 días" value={v(stats.active_7d)} />
        <Kpi icon={UserPlus} label="Nuevos últimos 7 días" value={v(stats.new_7d)} />
        <Kpi icon={Target} label="Misiones completadas" value={v(stats.completions)} />
        <Kpi icon={Sparkles} label="Puntos repartidos" value={v(stats.points)} sub={stats.participants > 0 ? `${n(avg)} por fan` : undefined} />
        <Kpi icon={Bookmark} label="Lo guardaron" value={v(stats.saves)} />
      </section>

      {stats.daily.length > 0 && (
        <Card icon={TrendingUp} title="Misiones completadas · últimos 14 días">
          <div className="flex h-28 items-end gap-1">
            {stats.daily.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center justify-end gap-1" title={`${new Date(d.day + "T12:00:00").toLocaleDateString("es-AR")}: ${d.completions}`}>
                <span className="text-[9px] font-bold tabular-nums text-muted-foreground">{d.completions || ""}</span>
                <div className="w-full rounded-t" style={{ height: `${Math.max(3, (d.completions / maxDaily) * 100)}%`, backgroundImage: "var(--gradient-drop)", opacity: d.completions ? 1 : 0.25 }} />
              </div>
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>{new Date(stats.daily[0].day + "T12:00:00").toLocaleDateString("es-AR", { day: "numeric", month: "short" })}</span><span>hoy</span>
          </div>
        </Card>
      )}

      <Card icon={Target} title="Rendimiento de misiones">
        {stats.missions.length === 0 ? <p className="text-xs text-muted-foreground">Este drop todavía no tiene misiones activas.</p> : (
          <div className="space-y-3">
            {stats.missions.map((m) => {
              const pct = m.fans >= 0 && stats.participants > 0 ? Math.round((m.fans / stats.participants) * 100) : null;
              return (
                <div key={m.id}>
                  <div className="mb-1 flex justify-between gap-2 text-xs">
                    <span className="truncate font-semibold">{m.title}</span>
                    <span className="shrink-0 text-muted-foreground">{m.fans >= 0 ? <><b className="text-foreground">{n(m.fans)}</b> fans · {n(m.completions)} veces</> : "—"}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ width: `${pct ?? 0}%`, backgroundImage: "var(--gradient-drop)" }} /></div>
                  {pct !== null && <p className="mt-0.5 text-[10px] text-muted-foreground">{pct}% de los fans del drop</p>}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card icon={Star} title="Top 10 superfans">
        {stats.top.length === 0 ? <p className="text-xs text-muted-foreground">Todavía nadie sumó puntos en este drop.</p> : (
          <div className="space-y-2">
            {stats.top.map((s, i) => (
              <div key={`${s.display_name}-${i}`} className="flex items-center gap-3 text-xs">
                <span className="w-4 text-center font-bold text-muted-foreground">{i + 1}</span>
                {s.avatar_url ? <img src={s.avatar_url} alt="" className="h-8 w-8 rounded-full object-cover" /> : <div className="grid h-8 w-8 place-items-center rounded-full bg-muted font-bold">{(s.display_name || "?")[0].toUpperCase()}</div>}
                <div className="min-w-0 flex-1"><p className="truncate font-semibold">{s.display_name || "fan"}</p><p className="text-[11px] text-muted-foreground">{n(s.missions)} misiones</p></div>
                <p className="font-black tabular-nums text-primary">{n(s.score)}</p>
              </div>
            ))}
          </div>
        )}
        {drop.prizes && drop.prizes.length > 0 && <p className="mt-3 text-[11px] text-muted-foreground">Premios: {drop.prizes.map((p) => `top ${p.top}: ${p.label}`).join(" · ")}</p>}
      </Card>

      <section className="grid grid-cols-2 gap-2">
        <Kpi icon={MessageSquare} label="Posteos en comunidad" value={v(stats.posts)} />
        <Kpi icon={Heart} label="Me gusta" value={v(stats.likes)} />
      </section>

      <details className="rounded-2xl border border-dashed border-border bg-card/50 p-4">
        <summary className="cursor-pointer text-xs font-bold text-muted-foreground">Próximas integraciones (datos de ejemplo)</summary>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Kpi icon={Share2} label="Alcance en redes" value="4.2M" sub="ejemplo" />
          <Kpi icon={Music} label="Streams verificados" value="1.4M" sub="ejemplo" />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">Redes y streaming se van a poder medir cuando conectemos esas plataformas.</p>
      </details>

      {partial && <PartialNote />}
    </>
  );
}

function Kpi({ icon: Icon, label, value, sub }: { icon: LucideIcon; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <span className="mb-2 grid h-7 w-7 place-items-center rounded-lg text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}><Icon className="h-3.5 w-3.5" /></span>
      <p className="text-xl font-black tabular-nums leading-tight">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      {sub && <p className="text-[10px] text-primary">{sub}</p>}
    </div>
  );
}

function Card({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2"><Icon className="h-4 w-4 text-primary" /><h3 className="text-xs font-bold uppercase tracking-widest">{title}</h3></div>
      {children}
    </section>
  );
}

function Loading() {
  return <div className="grid place-items-center py-10"><Loader2 className="animate-spin text-primary" /></div>;
}

function PartialNote() {
  return <p className="rounded-xl border border-border bg-card/50 p-3 text-[11px] text-muted-foreground">Datos parciales (salen del ranking): falta instalar la actualización del dashboard en la base para ver actividad diaria, misiones, guardados y comunidad.</p>;
}
