import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { M as MobileShell } from "./MobileShell-Cx-MBua7.mjs";
import { G as GlobalNav } from "./GlobalNav-D1VlwGix.mjs";
import { a as useNearbyShows, j as joinDates, L as LocationBar, E as EmptyShows, b as ShowCard, N as NewReviewDialog } from "./NewReviewDialog-CCwDvO2S.mjs";
import "../_libs/sonner.mjs";

import "../_libs/vaul.mjs";
import { t as ArrowLeft, f as Search, X } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "./drop-logo-negativo-DidhibxV.mjs";
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
import "./router-B9ShjKiR.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./AuthProvider-I8UVz6Kx.mjs";
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
import "./server-2EdEl0AJ.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-DjBQWXVJ.mjs";
import "../_libs/zod.mjs";
import "../_libs/tailwind-merge.mjs";
import "./fan-avatars-_RI7rXqd.mjs";
import "./drops-CcYTjoad.mjs";
import "./button-DRgo5ETH.mjs";
import "./music.functions-krtWFmbn.mjs";
import "./textarea-DpY_5gbT.mjs";
import "./dialog-DOZNCV7i.mjs";
const PERIODS = [{
  id: "todas",
  label: "Todas"
}, {
  id: "semana",
  label: "Esta semana"
}, {
  id: "mes",
  label: "Este mes"
}, {
  id: "proximo",
  label: "Próximo mes"
}];
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function inPeriod(g, period, day) {
  const now = /* @__PURE__ */ new Date();
  return g.dates.some(({
    date
  }) => {
    if (!date) return period === "todas" && !day;
    const d = new Date(date);
    if (day && d.toLocaleDateString("en-CA") !== day) return false;
    if (period === "semana") return d.getTime() - now.getTime() <= 7 * 864e5;
    if (period === "mes") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    if (period === "proximo") {
      const n = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
    }
    return true;
  });
}
function ShowsPage() {
  const nearby = useNearbyShows();
  const [reviewing, setReviewing] = reactExports.useState(null);
  const [q, setQ] = reactExports.useState("");
  const [venue, setVenue] = reactExports.useState("");
  const [period, setPeriod] = reactExports.useState("todas");
  const [day, setDay] = reactExports.useState("");
  const venues = reactExports.useMemo(() => [...new Set(nearby.groups.map((g) => g.show.venue).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es")), [nearby.groups]);
  const filtered = nearby.groups.filter((g) => {
    const text = norm([g.show.title, g.show.artist, g.show.venue, g.show.city, joinDates(g.dates.map((d) => d.date)), ...g.dates.map((d) => d.date ? new Date(d.date).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long"
    }) + " " + new Date(d.date).toLocaleDateString("es-AR") : "")].join(" "));
    return norm(q).split(/\s+/).every((w) => !w || text.includes(w)) && (!venue || g.show.venue === venue) && inPeriod(g, period, day);
  });
  const hasFilters = !!(q || venue || day || period !== "todas");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-5 pb-28 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/resenas", hash: "shows", "aria-label": "Volver", className: "grid h-9 w-9 place-items-center rounded-full border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black leading-tight", children: "Shows cerca tuyo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: nearby.loading ? "Buscando…" : `${filtered.length} ${filtered.length === 1 ? "show" : "shows"} en ${nearby.city}` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LocationBar, { nearby }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Artista, sala, fecha…", className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" }),
          q && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Borrar búsqueda", onClick: () => setQ(""), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: venue, onChange: (e) => setVenue(e.target.value), "aria-label": "Filtrar por sala", className: "min-w-0 flex-1 rounded-full border border-border bg-card px-3 py-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Todas las salas" }),
            venues.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v, children: v }, v))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: day, onChange: (e) => setDay(e.target.value), "aria-label": "Filtrar por día", className: "rounded-full border border-border bg-card px-3 py-2 text-xs [color-scheme:dark]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mx-5 flex gap-2 overflow-x-auto px-5", children: [
          PERIODS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPeriod(p.id), className: `shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${period === p.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground"}`, children: p.label }, p.id)),
          hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setQ("");
            setVenue("");
            setDay("");
            setPeriod("todas");
          }, className: "shrink-0 px-2 text-xs font-semibold text-primary", children: "Limpiar" })
        ] })
      ] }),
      nearby.groups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyShows, { city: nearby.city, loading: nearby.loading }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center text-sm font-bold", children: "Ningún show coincide con la búsqueda" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: filtered.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(ShowCard, { group: g, showKm: !!nearby.location, onReview: setReviewing, className: "w-full" }, g.key)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalNav, {}),
    reviewing && /* @__PURE__ */ jsxRuntimeExports.jsx(NewReviewDialog, { initialKind: "show", initialShow: reviewing, shows: nearby.shows, onClose: () => setReviewing(null), onPublished: () => setReviewing(null) })
  ] });
}
export {
  ShowsPage as component
};
