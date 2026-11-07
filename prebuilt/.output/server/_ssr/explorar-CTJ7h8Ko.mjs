import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { M as MobileShell } from "./MobileShell-CZ6O6dp1.mjs";
import { G as GlobalNav } from "./GlobalNav-CWzfmkg-.mjs";
import { E as ExplorarView } from "./ExplorarView-CM3es9AJ.mjs";
import { B as Button } from "./button-CZ7dCyRi.mjs";
import { l as logoViolet } from "./drop-logo-negativo-DidhibxV.mjs";
import "../_libs/sonner.mjs";

import "../_libs/vaul.mjs";
import { d as Sparkles, U as Users, aa as Compass, T as Target, ab as QrCode, y as MapPin, b as Trophy, G as Gift, ac as Archive } from "../_libs/lucide-react.mjs";

import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./router-Dh5wP28I.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/isbot.mjs";
import "./AuthProvider-Ddz0m4HJ.mjs";
import "./client-B2itNBhI.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/unenv.mjs";

import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./server-B0Q_JaUW.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-VmvLvGcb.mjs";
import "../_libs/zod.mjs";
import "../_libs/tailwind-merge.mjs";
import "./drops-CmJTucAX.mjs";
import "./dialog-D1MVsfOw.mjs";
import "./albums-CchT2yb0.mjs";
import "./ArtistLine-BZsL6z93.mjs";
import "./music.functions-CqokNr-k.mjs";
import "./ListenButtons-CeJ9S7Cf.mjs";
const crowd = "/assets/onboarding-1-BnjF0pCR.webp";
const phone = "/assets/onboarding-2-CGWDofjh.webp";
const street = "/assets/onboarding-3-DMGvFSKM.webp";
const stage = "/assets/onboarding-4-Bn5pM3qS.webp";
const logo = { url: logoViolet };
const KEY = "drop-onboarding-visto";
const slides = [
  { image: null, title: "La música se vive. Y también suma.", points: [{ icon: Sparkles, text: "Cada lanzamiento se convierte en un juego" }, { icon: Users, text: "Participá con miles de fans" }] },
  { image: crowd, title: "Elegí tus drops", points: [{ icon: Compass, text: "En Drops están todos los artistas" }, { icon: Users, text: "Sumate a los drops que quieras, a la vez" }] },
  { image: phone, title: "Completá misiones", points: [{ icon: Target, text: "Trivias, acertijos y desafíos diarios" }, { icon: Sparkles, text: "Cada misión te dice cuántos puntos da" }] },
  { image: street, title: "Salí a buscar", points: [{ icon: QrCode, text: "Escaneá afiches con QR en la calle" }, { icon: MapPin, text: "El mapa te muestra dónde está la acción" }] },
  { image: stage, title: "Subí en el ranking y ganá", points: [{ icon: Trophy, text: "Cada artista tiene su propio ranking" }, { icon: Gift, text: "Desbloqueá premios y experiencias" }, { icon: Archive, text: "Los drops que terminan quedan en el Archivo" }] }
];
function Onboarding() {
  const [open, setOpen] = reactExports.useState(false);
  const [i, setI] = reactExports.useState(0);
  reactExports.useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
    }
  }, []);
  if (!open) return null;
  const close = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
    }
    setOpen(false);
  };
  const s = slides[i];
  const last = i === slides.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "dialog", "aria-modal": "true", "aria-label": "Cómo funciona DROP", className: "fixed inset-0 z-50 mx-auto flex max-w-[440px] flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[52%] shrink-0 overflow-hidden", children: [
      s.image ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: s.image, alt: "", className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logo.url, alt: "DROP", className: "absolute left-5 top-[max(1rem,env(safe-area-inset-top))] h-9 w-24 object-contain object-left" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center", style: { backgroundImage: "radial-gradient(circle at 50% 45%, oklch(0.62 0.24 25 / 0.45), transparent 65%)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logo.url, alt: "DROP", className: "w-64 object-contain" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: close, className: "absolute right-4 top-[max(1rem,env(safe-area-inset-top))] rounded-full bg-background/70 px-3 py-1.5 text-xs font-bold backdrop-blur", children: "Saltear" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col px-7 pb-[max(1.5rem,env(safe-area-inset-bottom))]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold uppercase tracking-widest text-primary", children: [
        "Paso ",
        i + 1,
        " de ",
        slides.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl font-black leading-tight", children: s.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3", children: s.points.map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) }),
        text
      ] }, text)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center gap-3 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 gap-1.5", children: slides.map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-primary" : "w-1.5 bg-muted"}` }, k)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-12 px-6 font-bold", onClick: () => last ? close() : setI(i + 1), children: last ? "Empezar" : "Siguiente" })
      ] })
    ] })
  ] });
}
function Explorar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExplorarView, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Onboarding, {})
  ] });
}
export {
  Explorar as component
};
