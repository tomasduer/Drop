import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-BMTgKipR.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";


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
import "./router-DPkzXVOt.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./AuthProvider-D2KCkFDO.mjs";
import "./server-CjQeGcFR.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/unenv.mjs";

import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-v6mqcjDu.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
function Reset() {
  const navigate = useNavigate();
  const [ready, setReady] = reactExports.useState(false);
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setReady(true);
    const {
      data
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  async function submit(e) {
    e.preventDefault();
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    setBusy(true);
    const {
      error: error2
    } = await supabase.auth.updateUser({
      password
    });
    setBusy(false);
    if (error2) {
      setError(error2.message);
      return;
    }
    toast.success("Contraseña actualizada");
    void navigate({
      to: "/mi-drop",
      replace: true
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto min-h-screen max-w-[440px] px-7 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: "Nueva contraseña" }),
    !ready ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Abrí esta página desde el enlace que te enviamos por email." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: "Volver a iniciar sesión" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-semibold", children: [
        "Nueva contraseña",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", autoComplete: "new-password", value: password, onChange: (e) => setPassword(e.target.value), className: "mt-2 h-12 w-full rounded-lg border border-input bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-ring" })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, className: "h-12 w-full font-bold", children: "Guardar contraseña" })
    ] })
  ] });
}
export {
  Reset as component
};
