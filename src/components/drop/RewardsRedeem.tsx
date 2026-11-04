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
      {state.rewards.length === 0 ? <p className="text-xs text-muted-foreground">No hay recompensas habilitadas todavía.</p> : state.rewards.map((r) => <Button key={r.id} className="mt-2 w-full" disabled={redeeming || mode !== "user" || generalPoints < r.cost || state.redemptions.some((x) => x.reward_id === r.id)} onClick={async () => { setRedeeming(true); try { await redeem({ data: { action: "redeem", payload: { reward_id: r.id } } }); await refresh(); toast.success("Recompensa registrada"); } catch (e) { toast.error(e instanceof Error ? e.message : "No pudimos canjear"); } finally { setRedeeming(false); } }}>{r.title} · {r.cost} pts</Button>)}
      {state.redemptions.map((r) => <p key={r.id} className="mt-3 text-xs font-bold">{r.title} · obtenida el {new Date(r.created_at).toLocaleDateString("es-AR")}</p>)}
    </section>
  );
}
