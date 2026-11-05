import { useState } from "react";
import { TicketCheck } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { pointsAction } from "@/lib/drop.functions";
import { useDropAuth } from "./AuthProvider";

export function RewardsRedeem() {
  const { state, refresh, mode, profile } = useDropAuth();
  const redeem = useServerFn(pointsAction);
  const [redeeming, setRedeeming] = useState(false);
  const generalPoints = profile?.general_points ?? 0;

  return (
    <section className="rounded-3xl border border-border bg-card p-4">
      <div className="mb-4 flex items-start gap-3"><TicketCheck className="text-primary" /><div><h2 className="text-sm font-black">Canjear recompensas</h2><p className="text-xs text-muted-foreground">Solo se descuentan puntos generales. Tu puntaje de campaña no cambia.</p></div></div>
      {state.rewards.length === 0 ? <p className="text-xs text-muted-foreground">No hay recompensas habilitadas todavía.</p> : state.rewards.map((r) => {
        const owned = state.redemptions.some((x) => x.reward_id === r.id);
        const missing = Math.max(0, r.cost - generalPoints);
        return (
          <Button key={r.id} className="mt-2 h-auto w-full justify-between gap-3 whitespace-normal px-4 py-3 text-left" disabled={redeeming || mode !== "user" || missing > 0 || owned}
            onClick={async () => { setRedeeming(true); try { await redeem({ data: { action: "redeem", payload: { reward_id: r.id } } }); await refresh(); toast.success("Recompensa registrada"); } catch (e) { toast.error(e instanceof Error ? e.message : "No pudimos canjear"); } finally { setRedeeming(false); } }}>
            <span className="min-w-0 flex-1 break-words text-sm font-bold leading-snug">{r.title}</span>
            <span className="shrink-0 rounded-full bg-black/20 px-2.5 py-1 text-xs font-black">{owned ? "Canjeada" : `${r.cost} pts`}</span>
          </Button>
        );
      })}
      {state.redemptions.map((r) => <p key={r.id} className="mt-3 break-words text-xs font-bold leading-snug">{r.title} · obtenida el {new Date(r.created_at).toLocaleDateString("es-AR")}</p>)}
    </section>
  );
}
