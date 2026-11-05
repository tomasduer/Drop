import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as cn } from "./router-DGyjqzCS.mjs";
import { C as Compass, e as Activity, f as ShoppingBag, g as UserRound } from "../_libs/lucide-react.mjs";
const items = [
  { to: "/explorar", label: "Explorar", icon: Compass },
  { to: "/actividad", label: "Mi actividad", icon: Activity },
  { to: "/tienda", label: "Tienda", icon: ShoppingBag },
  { to: "/mi-drop", label: "Mi perfil", icon: UserRound }
];
function GlobalNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[440px] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-1 rounded-3xl border border-border bg-card/90 p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl", children: items.map((it) => {
    const Icon = it.icon;
    const isActive = path.startsWith(it.to);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: it.to,
        "aria-current": isActive ? "page" : void 0,
        className: cn("flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium transition-colors", isActive ? "text-foreground" : "text-muted-foreground"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn("grid h-9 w-9 place-items-center rounded-xl transition-all", isActive && "text-primary-foreground shadow-[var(--shadow-glow)]"),
              style: isActive ? { backgroundImage: "var(--gradient-drop)" } : void 0,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-none", children: it.label })
        ]
      },
      it.label
    );
  }) }) });
}
export {
  GlobalNav as G
};
