import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as logoViolet } from "./drop-logo-negativo-DidhibxV.mjs";
import { b as Dialog, c as DialogPortal, d as DialogContent, f as DialogClose, D as DialogTitle, a as DialogDescription, e as DialogOverlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./router-CQmtJhd4.mjs";
import { u as useDropAuth } from "./AuthProvider-Bp3qOufl.mjs";
import { e as Menu, d as Sparkles, C as Crown, G as Gift, f as Check, X } from "../_libs/lucide-react.mjs";
const Sheet = Dialog;
const SheetPortal = DialogPortal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogOverlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = DialogContent.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogTitle.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogDescription.displayName;
const PLANS = [
  {
    id: "free",
    name: "DROP Free",
    price: "Gratis",
    icon: Sparkles,
    tagline: "Todo lo que necesitás para jugar.",
    perks: ["Diario musical y reseñas", "Todos los drops", "Rankings y premios", "Comunidad"]
  },
  {
    id: "plus",
    name: "DROP+",
    price: "$2.999",
    period: "por mes",
    icon: Crown,
    featured: true,
    tagline: "Viví cada lanzamiento antes que nadie.",
    perks: ["Todo lo de Free", "Sin publicidad", "Acceso anticipado y preventas", "Insignia DROP+"]
  },
  {
    id: "box",
    name: "Mystery Box",
    price: "$24.990",
    period: "por caja",
    icon: Gift,
    tagline: "Una caja sorpresa de tus artistas.",
    perks: ["Merch, vinilos y coleccionables", "Ediciones limitadas", "Envío a todo el país", "1 mes de DROP+"]
  }
];
const KEY = "drop-plan-interes";
function PlansBar() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setOpen(true),
          "aria-label": "Abrir menú de planes",
          className: "grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logoViolet, alt: "DROP", className: "h-8 w-20 object-contain object-left" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlansSheet, { open, onOpenChange: setOpen })
  ] });
}
function PlansSheet({ open, onOpenChange }) {
  const { mode } = useDropAuth();
  const [chosen, setChosen] = reactExports.useState("free");
  reactExports.useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "plus" || v === "box") setChosen(v);
    } catch {
    }
  }, [open]);
  const subscribe = (plan) => {
    if (mode !== "user") {
      toast("Creá tu cuenta para suscribirte a un plan");
      return;
    }
    const next = chosen === plan.id ? "free" : plan.id;
    try {
      if (next === "free") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch {
    }
    setChosen(next);
    toast.success(next === "free" ? "Volviste a DROP Free" : `Te anotamos en ${plan.name}. Te avisamos cuando abran los pagos.`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "left", className: "w-full max-w-[440px] overflow-y-auto px-3 sm:max-w-[440px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-2xl font-black", children: "Planes DROP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Jugar es gratis. Si querés ir más allá, elegí tu plan." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid grid-cols-3 items-stretch gap-2", children: PLANS.map((p) => {
      const Icon = p.icon;
      const active = chosen === p.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: `relative flex flex-col rounded-2xl border p-2.5 ${p.featured ? "border-primary/70 bg-primary/10" : "border-border bg-card"}`, children: [
        p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-primary-foreground", children: "Recomendado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto mt-1 grid h-9 w-9 place-items-center rounded-xl text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 flex min-h-[2.5em] items-center justify-center text-center text-sm font-black leading-tight", children: p.id === "box" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "DROP",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Mystery Box"
        ] }) : p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-lg font-black leading-none", children: p.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: p.period ?? "para siempre" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 flex-1 space-y-1.5", children: p.perks.map((perk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-1 text-[11px] leading-snug", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-px h-3 w-3 shrink-0 text-primary" }),
          perk
        ] }, perk)) }),
        p.id === "free" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 rounded-lg border border-border py-2 text-center text-[11px] font-bold text-muted-foreground", children: active ? "Tu plan" : "Incluido" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => subscribe(p),
            className: `mt-3 w-full rounded-lg py-2 text-[11px] font-black ${active ? "border border-primary text-primary" : "text-primary-foreground"}`,
            style: active ? void 0 : { backgroundImage: "var(--gradient-drop)" },
            children: active ? "Anotado" : p.id === "box" ? "La quiero" : "Suscribirme"
          }
        )
      ] }, p.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[11px] text-muted-foreground", children: "Precios de referencia en pesos. Los pagos abren pronto: anotate y te avisamos." })
  ] }) });
}
function MobileShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen w-full bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative mx-auto min-h-screen w-full max-w-[440px] overflow-hidden pb-40",
      style: { backgroundImage: "var(--gradient-glow)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlansBar, {}),
        children
      ]
    }
  ) });
}
export {
  MobileShell as M,
  Sheet as S,
  SheetContent as a,
  SheetHeader as b,
  SheetTitle as c,
  SheetDescription as d
};
