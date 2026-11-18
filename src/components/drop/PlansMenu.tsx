import { useEffect, useState } from "react";
import { Check, ChevronRight, Crown, Disc3, Gem, Gift, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { DropLogo } from "./DropLogo";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useDropAuth } from "./AuthProvider";
import { NotificationsButton } from "./NotificationsMenu";

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
    id: "box", name: "Mystery Box", price: "$24.990", period: "desde, por caja", icon: Gift,
    tagline: "Una caja sorpresa de tus artistas.",
    perks: ["3 cajas para elegir", "Merch, vinilos y coleccionables", "Armada según lo que escuchás", "Envío a todo el país"],
  },
];

// Tres tamaños de Mystery Box. Cada caja se arma según los artistas y drops del fan.
type BoxId = "esencial" | "coleccionista" | "superfan";
type Box = { id: BoxId; name: string; price: string; tagline: string; perks: string[]; icon: LucideIcon; featured?: boolean };
const BOXES: Box[] = [
  {
    id: "esencial", name: "Esencial", price: "$24.990", icon: Gift,
    tagline: "Para arrancar tu colección.",
    perks: ["2 o 3 productos de merch oficial", "Stickers y póster del drop", "1 mes de DROP+"],
  },
  {
    id: "coleccionista", name: "Coleccionista", price: "$44.990", icon: Disc3, featured: true,
    tagline: "Música en formato físico.",
    perks: ["Un vinilo o CD de tus artistas", "Merch oficial y un pin numerado", "Ítem de edición limitada", "2 meses de DROP+"],
  },
  {
    id: "superfan", name: "Superfan", price: "$74.990", icon: Gem,
    tagline: "Lo más exclusivo de cada drop.",
    perks: ["Vinilo firmado o edición especial", "Buzo o campera oficial", "Lugar asegurado en un sorteo de meet & greet", "3 meses de DROP+"],
  },
];
const BOX_KEY = "drop-mystery-box";

const KEY = "drop-plan-interes";

export function PlansBar() {
  const [open, setOpen] = useState(false);
  const plan = useChosenPlan(open);
  return (
    <>
      <div className="flex items-center justify-between gap-2 px-4 pt-3">
        <DropLogo className="h-8 w-20 object-contain object-left" />
        <div className="flex items-center gap-2">
          <NotificationsButton />
          <button type="button" onClick={() => setOpen(true)} aria-label="Ver planes DROP+"
            className="flex h-10 items-center gap-1.5 rounded-full px-3.5 text-xs font-black text-primary-foreground shadow-[var(--shadow-glow)] transition-transform active:scale-95"
            style={{ backgroundImage: "var(--gradient-drop)" }}>
            <Crown className="h-4 w-4" />DROP+
            {plan !== "free" && <Check className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <PlansSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

/** Plan en el que el fan se anotó en este dispositivo (se relee cada vez que cambia `dep`). */
function useChosenPlan(dep?: unknown): PlanId {
  const [plan, setPlan] = useState<PlanId>("free");
  useEffect(() => {
    try { const v = localStorage.getItem(KEY); setPlan(v === "plus" || v === "box" ? v : "free"); } catch { /* sin almacenamiento */ }
  }, [dep]);
  return plan;
}

/** Tarjeta "Tu plan" para el perfil: muestra el plan actual y abre los planes. */
export function PlanCard() {
  const [open, setOpen] = useState(false);
  const chosen = useChosenPlan(open);
  const plan = PLANS.find((p) => p.id === chosen) ?? PLANS[0];
  const Icon = plan.icon;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-3 text-left transition-colors active:bg-primary/20">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}><Icon className="h-5 w-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Tu plan</span>
          <span className="block text-sm font-black">{plan.name}{chosen !== "free" && <span className="ml-1 font-semibold text-muted-foreground">· anotado</span>}</span>
          <span className="block truncate text-xs text-muted-foreground">{chosen === "free" ? "Pasate a DROP+: preventas y acceso anticipado" : "Te avisamos cuando abran los pagos"}</span>
        </span>
        <span className="flex shrink-0 items-center text-xs font-bold text-primary">{chosen === "free" ? "Ver planes" : "Cambiar"}<ChevronRight className="h-4 w-4" /></span>
      </button>
      <PlansSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

function PlansSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { mode } = useDropAuth();
  const [chosen, setChosen] = useState<PlanId>("free");
  const [box, setBox] = useState<BoxId | null>(null);
  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY); if (v === "plus" || v === "box") setChosen(v);
      const b = localStorage.getItem(BOX_KEY); setBox(BOXES.some((x) => x.id === b) ? (b as BoxId) : null);
    } catch { /* sin almacenamiento */ }
  }, [open]);

  const pickBox = (b: Box) => {
    if (mode !== "user") { toast("Creá tu cuenta para pedir tu Mystery Box"); return; }
    const next = box === b.id ? null : b.id;
    try {
      if (next) { localStorage.setItem(BOX_KEY, next); localStorage.setItem(KEY, "box"); } else { localStorage.removeItem(BOX_KEY); if (chosen === "box") localStorage.removeItem(KEY); }
    } catch { /* sin almacenamiento */ }
    setBox(next); if (next) setChosen("box"); else if (chosen === "box") setChosen("free");
    toast.success(next ? `Te anotamos para la Mystery Box ${b.name}. Te avisamos cuando abran los pagos.` : "Sacaste tu Mystery Box");
  };
  const showBoxes = () => document.getElementById("mystery-boxes")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const subscribe = (plan: Plan) => {
    if (mode !== "user") { toast("Creá tu cuenta para suscribirte a un plan"); return; }
    const next: PlanId = chosen === plan.id ? "free" : plan.id;
    try { if (next === "free") localStorage.removeItem(KEY); else localStorage.setItem(KEY, next); } catch { /* sin almacenamiento */ }
    setChosen(next);
    toast.success(next === "free" ? "Volviste a DROP Free" : `Te anotamos en ${plan.name}. Te avisamos cuando abran los pagos.`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-[440px] overflow-y-auto px-3 sm:max-w-[440px]">
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
                ) : p.id === "box" ? (
                  <button type="button" onClick={showBoxes}
                    className={`mt-3 w-full rounded-lg py-2 text-[11px] font-black ${active ? "border border-primary text-primary" : "text-primary-foreground"}`}
                    style={active ? undefined : { backgroundImage: "var(--gradient-drop)" }}>
                    {active ? "Anotado" : "Ver cajas"}
                  </button>
                ) : (
                  <button type="button" onClick={() => subscribe(p)}
                    className={`mt-3 w-full rounded-lg py-2 text-[11px] font-black ${active ? "border border-primary text-primary" : "text-primary-foreground"}`}
                    style={active ? undefined : { backgroundImage: "var(--gradient-drop)" }}>
                    {active ? "Anotado" : "Suscribirme"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
        <section id="mystery-boxes" className="mt-6 scroll-mt-4">
          <h3 className="text-xl font-black">Elegí tu Mystery Box</h3>
          <p className="mt-1 text-xs text-muted-foreground">Ninguna caja es igual a otra: la armamos con lo que escuchás, los artistas que seguís y los drops en los que participás.</p>
          <div className="mt-3 space-y-2">
            {BOXES.map((b) => {
              const Icon = b.icon;
              const active = box === b.id;
              return (
                <article key={b.id} className={`relative rounded-2xl border p-3 ${b.featured ? "border-primary/70 bg-primary/10" : "border-border bg-card"}`}>
                  {b.featured && <span className="absolute -top-2 right-3 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-primary-foreground">La más pedida</span>}
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}><Icon className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Mystery Box</p>
                      <h4 className="text-base font-black leading-tight">{b.name}</h4>
                      <p className="text-[11px] text-muted-foreground">{b.tagline}</p>
                    </div>
                    <p className="shrink-0 text-right"><span className="block text-lg font-black leading-none">{b.price}</span><span className="text-[10px] text-muted-foreground">por caja</span></p>
                  </div>
                  <ul className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5">
                    {b.perks.map((perk) => (
                      <li key={perk} className="flex gap-1 text-[11px] leading-snug"><Check className="mt-px h-3 w-3 shrink-0 text-primary" />{perk}</li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => pickBox(b)}
                    className={`mt-3 w-full rounded-lg py-2 text-xs font-black ${active ? "border border-primary text-primary" : "text-primary-foreground"}`}
                    style={active ? undefined : { backgroundImage: "var(--gradient-drop)" }}>
                    {active ? "Anotada" : "La quiero"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
        <p className="mt-4 text-[11px] text-muted-foreground">Precios de referencia en pesos. Los pagos abren pronto: anotate y te avisamos.</p>
      </SheetContent>
    </Sheet>
  );
}
