import { useEffect, useState } from "react";
import { Check, Crown, Gift, Menu, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { DropLogo } from "./DropLogo";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useDropAuth } from "./AuthProvider";

// Planes para fans (B2C). Todavía no hay pagos: "Suscribirme" anota el interés en este
// dispositivo y le avisamos al fan cuando abran las suscripciones.
type PlanId = "free" | "plus" | "box";
type Plan = { id: PlanId; name: string; price: string; period?: string; tagline: string; perks: string[]; icon: LucideIcon; featured?: boolean };

const PLANS: Plan[] = [
  {
    id: "free", name: "DROP Free", price: "Gratis", icon: Sparkles,
    tagline: "Todo lo que necesitás para jugar.",
    perks: ["Diario musical y reseñas", "Todos los drops", "Rankings y premios", "Comunidad"],
  },
  {
    id: "plus", name: "DROP+", price: "$2.999", period: "por mes", icon: Crown, featured: true,
    tagline: "Viví cada lanzamiento antes que nadie.",
    perks: ["Todo lo de Free", "Sin publicidad", "Acceso anticipado y preventas", "Insignia DROP+"],
  },
  {
    id: "box", name: "Mystery Box", price: "$24.990", period: "por caja", icon: Gift,
    tagline: "Una caja sorpresa de tus artistas.",
    perks: ["Merch, vinilos y coleccionables", "Ediciones limitadas", "Envío a todo el país", "1 mes de DROP+"],
  },
];

const KEY = "drop-plan-interes";

export function PlansBar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex items-center gap-2 px-4 pt-3">
        <button type="button" onClick={() => setOpen(true)} aria-label="Abrir menú de planes"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted">
          <Menu className="h-5 w-5" />
        </button>
        <DropLogo className="h-8 w-20 object-contain object-left" />
      </div>
      <PlansSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

function PlansSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { mode } = useDropAuth();
  const [chosen, setChosen] = useState<PlanId>("free");
  useEffect(() => {
    try { const v = localStorage.getItem(KEY); if (v === "plus" || v === "box") setChosen(v); } catch { /* sin almacenamiento */ }
  }, [open]);

  const subscribe = (plan: Plan) => {
    if (mode !== "user") { toast("Creá tu cuenta para suscribirte a un plan"); return; }
    const next: PlanId = chosen === plan.id ? "free" : plan.id;
    try { if (next === "free") localStorage.removeItem(KEY); else localStorage.setItem(KEY, next); } catch { /* sin almacenamiento */ }
    setChosen(next);
    toast.success(next === "free" ? "Volviste a DROP Free" : `Te anotamos en ${plan.name}. Te avisamos cuando abran los pagos.`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full max-w-[440px] overflow-y-auto px-3 sm:max-w-[440px]">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl font-black">Planes DROP</SheetTitle>
          <SheetDescription>Jugar es gratis. Si querés ir más allá, elegí tu plan.</SheetDescription>
        </SheetHeader>
        <div className="mt-5 grid grid-cols-3 items-stretch gap-2">
          {PLANS.map((p) => {
            const Icon = p.icon;
            const active = chosen === p.id;
            return (
              <article key={p.id} className={`relative flex flex-col rounded-2xl border p-2.5 ${p.featured ? "border-primary/70 bg-primary/10" : "border-border bg-card"}`}>
                {p.featured && <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-primary-foreground">Recomendado</span>}
                <span className="mx-auto mt-1 grid h-9 w-9 place-items-center rounded-xl text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="mt-2 flex min-h-[2.5em] items-center justify-center text-center text-sm font-black leading-tight">{p.id === "box" ? <>DROP<br />Mystery Box</> : p.name}</h3>
                <p className="mt-2 text-center"><span className="block text-lg font-black leading-none">{p.price}</span><span className="text-[10px] text-muted-foreground">{p.period ?? "para siempre"}</span></p>
                <ul className="mt-3 flex-1 space-y-1.5">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-1 text-[11px] leading-snug"><Check className="mt-px h-3 w-3 shrink-0 text-primary" />{perk}</li>
                  ))}
                </ul>
                {p.id === "free" ? (
                  <p className="mt-3 rounded-lg border border-border py-2 text-center text-[11px] font-bold text-muted-foreground">{active ? "Tu plan" : "Incluido"}</p>
                ) : (
                  <button type="button" onClick={() => subscribe(p)}
                    className={`mt-3 w-full rounded-lg py-2 text-[11px] font-black ${active ? "border border-primary text-primary" : "text-primary-foreground"}`}
                    style={active ? undefined : { backgroundImage: "var(--gradient-drop)" }}>
                    {active ? "Anotado" : p.id === "box" ? "La quiero" : "Suscribirme"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
        <p className="mt-4 text-[11px] text-muted-foreground">Precios de referencia en pesos. Los pagos abren pronto: anotate y te avisamos.</p>
      </SheetContent>
    </Sheet>
  );
}
