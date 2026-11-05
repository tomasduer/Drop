import { useEffect, useState } from "react";
import { Check, Crown, Gift, Menu, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/drop-logo-negativo.webp";
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
    perks: ["Tu diario musical, reseñas y recitales", "Todos los drops con misiones y rankings", "Puntos DROP y premios del ranking", "Comunidad de fans"],
  },
  {
    id: "plus", name: "DROP+", price: "$2.999", period: "por mes", icon: Crown, featured: true,
    tagline: "Viví cada lanzamiento antes que nadie.",
    perks: ["Todo lo de DROP Free", "Sin publicidad", "Acceso anticipado a drops y preventas", "Insignia DROP+ en tu perfil"],
  },
  {
    id: "box", name: "DROP Mystery Box", price: "$24.990", period: "por caja", icon: Gift,
    tagline: "Una caja sorpresa de tus artistas.",
    perks: ["Merch oficial, vinilos y coleccionables", "Ediciones limitadas que no se venden en la tienda", "Envío a todo el país", "Incluye 1 mes de DROP+"],
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
        <img decoding="async" src={logo} alt="DROP" className="h-8 w-20 object-contain object-left" />
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
      <SheetContent side="left" className="w-[88%] max-w-sm overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl font-black">Planes DROP</SheetTitle>
          <SheetDescription>Jugar es gratis. Si querés ir más allá, elegí tu plan.</SheetDescription>
        </SheetHeader>
        <div className="mt-5 space-y-3">
          {PLANS.map((p) => {
            const Icon = p.icon;
            const active = chosen === p.id;
            return (
              <article key={p.id} className={`rounded-2xl border p-4 ${p.featured ? "border-primary/60 bg-primary/5" : "border-border bg-card"}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-lg font-black leading-tight">{p.name}</h3>
                  </div>
                  {p.featured && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-primary-foreground">Recomendado</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-2"><span className="text-2xl font-black">{p.price}</span>{p.period && <span className="ml-1 text-xs text-muted-foreground">{p.period}</span>}</p>
                <ul className="mt-3 space-y-1.5">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{perk}</li>
                  ))}
                </ul>
                {p.id === "free" ? (
                  <p className="mt-4 rounded-xl border border-border py-2.5 text-center text-sm font-bold text-muted-foreground">{active ? "Tu plan actual" : "Incluido siempre"}</p>
                ) : (
                  <button type="button" onClick={() => subscribe(p)}
                    className={`mt-4 w-full rounded-xl py-2.5 text-sm font-black ${active ? "border border-primary text-primary" : "text-primary-foreground"}`}
                    style={active ? undefined : { backgroundImage: "var(--gradient-drop)" }}>
                    {active ? "Anotado · Cancelar" : p.id === "box" ? "Quiero mi caja" : "Suscribirme"}
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
