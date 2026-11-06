import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as finishSpotifyLogin } from "./spotify-Dtcb9M3c.mjs";
import { L as LoaderCircle } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
function SpotifyCallback() {
  const navigate = useNavigate();
  const [msg, setMsg] = reactExports.useState("Conectando tu cuenta de Spotify…");
  reactExports.useEffect(() => {
    finishSpotifyLogin(new URLSearchParams(window.location.search)).then((to) => {
      toast.success("¡Spotify conectado!");
      window.location.replace(to);
    }).catch((e) => {
      setMsg(e.message);
      toast.error(e.message);
      setTimeout(() => e.returnTo ? window.location.replace(e.returnTo) : void navigate({
        to: "/mi-drop"
      }), 1800);
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center bg-background p-6 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto mb-3 h-6 w-6 animate-spin text-primary" }),
    msg
  ] }) });
}
export {
  SpotifyCallback as component
};
