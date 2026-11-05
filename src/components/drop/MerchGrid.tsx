import { useEffect, useState } from "react";
import { Check, Lock, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { DropInfo } from "@/lib/drops";
import { formatPrice, getReservations, toggleReservation, type MerchItem } from "@/lib/merch";
import { useDropAuth } from "./AuthProvider";

/** Merch oficial del drop. La exclusiva se reserva solo desde cierto puesto del ranking. */
export function MerchGrid({ drop, rank }: { drop: DropInfo; rank: number | null }) {
  const { mode } = useDropAuth();
  const [reserved, setReserved] = useState<string[]>([]);
  useEffect(() => { setReserved(getReservations().filter((r) => r.dropId === drop.id).map((r) => r.id)); }, [drop.id]);

  function reserve(item: MerchItem) {
    if (mode !== "user") { toast.message("Creá tu cuenta para reservar merch"); return; }
    const on = toggleReservation({ dropId: drop.id, artist: drop.artist, id: item.id, name: item.name, image: item.image, at: new Date().toISOString() });
    setReserved((r) => (on ? [...r, item.id] : r.filter((x) => x !== item.id)));
    toast[on ? "success" : "message"](on ? "¡Reservado!" : "Reserva cancelada", { description: on ? "Quedó en tu pasaporte. Te avisamos cuando abra la venta." : undefined });
  }

  return (
    <section>
      <div className="grid grid-cols-2 gap-3">
        {drop.merch!.map((item) => {
          const locked = item.top !== undefined && (rank === null || rank > item.top);
          const isReserved = reserved.includes(item.id);
          return (
            <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-square bg-muted">
                <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ opacity: locked ? 0.35 : 1 }} />
                {item.top !== undefined && (
                  <span className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>
                    Exclusivo top {item.top}
                  </span>
                )}
                {locked && <span className="absolute inset-0 grid place-items-center"><Lock className="h-7 w-7 text-foreground/80" /></span>}
              </div>
              <div className="p-3">
                <p className="text-sm font-bold leading-tight">{item.name}</p>
                <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">{item.detail}</p>
                <p className="mt-1 text-sm font-black tabular-nums">{formatPrice(item.price)}</p>
                {locked ? (
                  <p className="mt-2 text-[11px] font-semibold text-muted-foreground">
                    {rank === null ? `Se desbloquea en el top ${item.top}` : `Vas #${rank}: llegá al top ${item.top}`}
                  </p>
                ) : (
                  <Button size="sm" variant={isReserved ? "outline" : "default"} className="mt-2 w-full" onClick={() => reserve(item)}>
                    {isReserved ? <><Check /> Reservado</> : <><ShoppingBag /> Reservar</>}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
