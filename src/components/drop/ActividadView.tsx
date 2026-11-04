import { Disc3, Gift, Sparkles, Target, TicketCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useDropAuth } from "./AuthProvider";
import { useDrops } from "@/lib/drops";
import { achievements, dropProgress, type DropProgress } from "@/lib/progress";

function movementTitle(reason: string): string {
  switch (reason) {
    case "mission_reward": return "Misión validada";
    case "reward_redeem": return "Canje de recompensa";
    case "album_listened": return "Álbum marcado como escuchado";
    case "album_unlistened": return "Álbum desmarcado";
    default: return "Movimiento histórico";
  }
}

function movementIcon(reason: string) {
  switch (reason) {
    case "mission_reward": return Target;
    case "reward_redeem": return Gift;
    case "album_listened": case "album_unlistened": return Disc3;
    default: return Sparkles;
  }
}

function DropRow({ p, cta }: { p: DropProgress; cta: string }) {
  const pct = p.total ? Math.round((100 * p.done) / p.total) : 0;
  return (
    <Link to="/drop" search={{ d: p.drop.id }} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
      <img loading="lazy" decoding="async" src={p.drop.cover} alt="" className={`h-14 w-14 shrink-0 rounded-xl object-cover ${p.drop.status === "archived" ? "sepia-[0.4]" : ""}`} />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-primary">{p.drop.artist}</p>
        <p className="truncate text-sm font-black">{p.drop.title}</p>
        {p.drop.status !== "upcoming" ? (
          <>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundImage: "var(--gradient-drop)" }} /></div>
            <p className="mt-1 text-[11px] text-muted-foreground">{p.score.toLocaleString("es-AR")} pts · {p.done}/{p.total} misiones</p>
          </>
        ) : <p className="text-[11px] text-muted-foreground">{p.drop.dates}</p>}
      </div>
      <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-primary">{cta}<ArrowRight className="h-3.5 w-3.5" /></span>
    </Link>
  );
}

export function ActividadView() {
  const { state, mode, profile } = useDropAuth();
  const drops = useDrops();
  const progress = dropProgress(state, drops);
  const active = progress.filter((p) => p.drop.status === "active");
  const mine = active.filter((p) => p.participating);
  const others = active.filter((p) => !p.participating);
  const upcoming = progress.filter((p) => p.drop.status === "upcoming");
  const archived = progress.filter((p) => p.drop.status === "archived");
  const logros = achievements(state, progress, profile.listened_albums?.length ?? 0);
  const unlocked = logros.filter((l) => l.unlocked).length;
  const artistOf = (id: string | null) => drops.find((d) => d.id === id)?.artist;

  return (
    <div className="px-5 pb-4">
      <header className="pt-2">
        <h1 className="text-3xl font-black tracking-tight">Mi actividad</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tus drops en curso, lo que se viene y lo que ya viviste.</p>
      </header>

      {mode !== "user" && (
        <p className="mt-4 rounded-2xl border border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground">
          En modo invitado la actividad no se guarda. Creá una cuenta para sumar puntos.
        </p>
      )}

      <section className="mt-6">
        <h2 className="text-xl font-black">Mis drops activos</h2>
        <p className="mb-3 text-xs text-muted-foreground">Donde estás sumando puntos ahora.</p>
        <div className="space-y-2">
          {mine.map((p) => <DropRow key={p.drop.id} p={p} cta="Seguir" />)}
          {mine.length === 0 && <p className="rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">Todavía no empezaste ningún drop. Elegí uno abajo o desde Explorar.</p>}
        </div>
        {others.length > 0 && (
          <>
            <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">También podés sumarte a</p>
            <div className="space-y-2">{others.map((p) => <DropRow key={p.drop.id} p={p} cta="Entrar" />)}</div>
          </>
        )}
      </section>

      {upcoming.length > 0 && (
        <section className="mt-7">
          <h2 className="text-xl font-black">Mis próximos drops</h2>
          <p className="mb-3 text-xs text-muted-foreground">Anunciados. Entrá para activar el aviso.</p>
          <div className="space-y-2">{upcoming.map((p) => <DropRow key={p.drop.id} p={p} cta="Ver" />)}</div>
        </section>
      )}

      {archived.length > 0 && (
        <section className="mt-7">
          <h2 className="text-xl font-black">📼 Experiencias finalizadas</h2>
          <p className="mb-3 text-xs text-muted-foreground">Revisitá sus misiones, tu resultado y el ranking final.</p>
          <div className="space-y-2">{archived.map((p) => <DropRow key={p.drop.id} p={p} cta="Revisitar" />)}</div>
        </section>
      )}

      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-black">Mis logros</h2>
          <span className="text-xs font-bold text-primary">{unlocked} de {logros.length}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {logros.map((l) => (
            <div key={l.id} className={`rounded-2xl border p-3 text-center ${l.unlocked ? "border-primary/50 bg-primary/10" : "border-border bg-card opacity-60"}`}>
              <p className={`text-2xl ${l.unlocked ? "" : "grayscale"}`}>{l.icon}</p>
              <p className="mt-1 text-xs font-bold leading-tight">{l.title}</p>
              <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{l.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="mb-3 text-lg font-black">Historial de puntos</h2>
        {state.movements.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
            <p className="text-sm font-bold">Todavía no hay movimientos</p>
            <p className="mt-1 text-xs text-muted-foreground">Acá aparecen los puntos que sumás por misiones validadas, álbumes y canjes.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {state.movements.map((m) => {
              const Icon = movementIcon(m.reason);
              return (
                <article key={m.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{movementTitle(m.reason)}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {artistOf(m.campaign_id) ? `${artistOf(m.campaign_id)} · ` : ""}{new Date(m.created_at).toLocaleDateString("es-AR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black tabular-nums ${m.amount >= 0 ? "text-primary" : "text-muted-foreground"}`}>
                      {m.amount > 0 ? "+" : ""}{m.amount} <span className="text-[11px] font-semibold">generales</span>
                    </p>
                    {(m.campaign_delta ?? 0) !== 0 && <p className="text-[11px] text-muted-foreground">+{m.campaign_delta} de {artistOf(m.campaign_id) ?? "artista"}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-7">
        <h2 className="mb-3 text-lg font-black">Recompensas obtenidas</h2>
        {state.redemptions.length === 0 ? (
          <p className="text-xs text-muted-foreground">Cuando canjees recompensas van a quedar registradas acá.</p>
        ) : (
          <div className="space-y-2">
            {state.redemptions.map((r) => (
              <article key={r.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                <TicketCheck className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{r.title}</p>
                  <p className="text-[11px] text-muted-foreground">{new Date(r.created_at).toLocaleDateString("es-AR")}</p>
                </div>
                <p className="text-xs font-bold text-muted-foreground">-{r.cost} pts</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
