import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate } from "../_libs/tanstack__react-router.mjs";
import { u as useDropAuth } from "./AuthProvider-BQJkBTYx.mjs";
import { W as WelcomeView } from "./WelcomeView-B2penYHN.mjs";
import "../_libs/sonner.mjs";


import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
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
import "./server-CdsCYb-t.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-GhtpbD3-.mjs";
import "../_libs/zod.mjs";
import "./button-Dwt4JfwG.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./router-B_Jvgt1s.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "./drop-logo-negativo-DidhibxV.mjs";
function Home() {
  const {
    mode
  } = useDropAuth();
  if (mode === "user" || mode === "guest") return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/explorar", replace: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WelcomeView, {});
}
export {
  Home as component
};
