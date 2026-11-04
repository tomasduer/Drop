import { Disc3, Gift, Sparkles, Target, TicketCheck } from "lucide-react";
import { useDropAuth } from "./AuthProvider";

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

export function ActividadView() {
  const { state, mode } = useDropAuth();

  return (
    <div className="px-5 pb-4">
      <header className="pt-2">
        <h1 className="text-3xl font-black tracking-tight">Actividad</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tu historial verificado dentro de DROP.</p>
      </header>

      {mode !== "user" && (
        <p className="mt-4 rounded-2xl border border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground">
          En modo invitado la actividad no se guarda. Creá una cuenta para sumar puntos.
        </p>
      )}

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-black">Movimientos de puntos</h2>
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
                      {m.evidence_type === "drop_verified" ? "Validación DROP" : m.evidence_type === "legacy" ? "Histórico" : "Declaración manual"} · {new Date(m.created_at).toLocaleDateString("es-AR")}
                    </p>
                  </div>
                  <p className={`text-sm font-black tabular-nums ${m.amount >= 0 ? "text-primary" : "text-muted-foreground"}`}>
                    {m.amount > 0 ? "+" : ""}{m.amount}
                  </p>
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
