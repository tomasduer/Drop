import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-Br3nJU-_.mjs";
import { u as useDropAuth } from "./AuthProvider-ilRck-0r.mjs";
import { l as logoViolet } from "./drop-logo-negativo-DidhibxV.mjs";
import "../_libs/sonner.mjs";

import { r as UserRound, _ as Camera, X, A as ArrowRight } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./router-DcRqoyom.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tailwind-merge.mjs";
import "./client-B2itNBhI.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/unenv.mjs";

import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./server-IdDI15gT.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-DO11k-BB.mjs";
import "../_libs/zod.mjs";
const logo = { url: logoViolet };
function GuestEntry() {
  const [name, setName] = reactExports.useState("");
  const [photo, setPhoto] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [reading, setReading] = reactExports.useState(false);
  const { enterGuest } = useDropAuth();
  const navigate = useNavigate();
  async function choosePhoto(file) {
    if (!file) return;
    setError("");
    if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Elegí una foto JPG, PNG o WebP de hasta 5 MB.");
      return;
    }
    setReading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setPhoto(reader.result);
      setReading(false);
    };
    reader.onerror = () => {
      setError("No pudimos abrir esa foto.");
      setReading(false);
    };
    reader.readAsDataURL(file);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-background px-7 py-8 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[440px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logo.url, alt: "DROP", className: "h-auto w-44 object-contain" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-3xl font-black", children: "Tu DROP sin cuenta." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Tu perfil de invitado queda en este navegador hasta que salgas. Para sumar puntos al ranking, creá una cuenta." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-7 space-y-5", onSubmit: (event) => {
      event.preventDefault();
      if (!name.trim()) {
        setError("Elegí un nombre temporal.");
        return;
      }
      enterGuest({ name: name.trim(), avatar: photo });
      window.scrollTo(0, 0);
      void navigate({ to: "/explorar" });
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-semibold", children: [
        "Usuario temporal",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoComplete: "off", maxLength: 80, value: name, onChange: (e) => setName(e.target.value), className: "mt-2 h-12 w-full rounded-lg border border-input bg-card px-4 text-foreground outline-none focus:ring-2 focus:ring-ring" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-card", children: photo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: photo, alt: "Tu foto temporal", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-7 w-7 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4" }),
            "Foto (opcional)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { "aria-label": "Foto opcional", type: "file", accept: "image/jpeg,image/png,image/webp", className: "mt-2 block w-full min-w-0 text-xs text-muted-foreground", onChange: (e) => {
            void choosePhoto(e.target.files?.[0]);
            e.target.value = "";
          } })
        ] }),
        photo && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", "aria-label": "Quitar foto", onClick: () => setPhoto(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: reading, className: "h-12 w-full", children: [
        "Entrar a DROP ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "mt-4 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Volver al inicio" }) })
  ] }) });
}
const SplitComponent = GuestEntry;
export {
  SplitComponent as component
};
