import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-Cf-v8i6O.mjs";
import { l as logoViolet } from "./drop-logo-negativo-DidhibxV.mjs";
import { M as Map, b as Trophy, D as Disc3, A as ArrowRight } from "../_libs/lucide-react.mjs";
const logo = { url: logoViolet };
const steps = [
  { icon: Map, title: "Elegí los drops de tus artistas" },
  { icon: Trophy, title: "Completá misiones y subí en el ranking" },
  { icon: Disc3, title: "Desbloqueá premios y experiencias" }
];
function WelcomeView() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background px-7 py-8 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[440px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logo.url, alt: "DROP", className: "h-auto w-44 object-contain" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs font-bold uppercase text-primary", children: "Bienvenid@ a DROP" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 text-3xl font-black leading-tight", children: [
      "La música se vive.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "Y también suma."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3", children: steps.map(({ icon: Icon, title }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) }),
      title
    ] }, title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "h-12 w-full font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", search: { mode: "login" }, children: [
        "Empezar ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "h-12 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/invitado", children: "Probar sin cuenta" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/privacidad", className: "text-xs text-muted-foreground underline", children: "Política de privacidad" }) })
  ] }) });
}
export {
  WelcomeView as W
};
