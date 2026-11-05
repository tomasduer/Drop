import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { M as MobileShell } from "./MobileShell-Q_Sur2x5.mjs";
import { G as GlobalNav } from "./GlobalNav-zQb9bOxv.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { h as Route, u as useDropAuth, a as useServerFn, g as getRanking } from "./router-Dfsr2sSX.mjs";
import { u as useDrops } from "./drops-BcyLcwgZ.mjs";
import { a as artistSlug, g as getReservations, f as formatPrice, t as toggleReservation } from "./merch-DJnpgWW5.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-QSSMUzOR.mjs";

import { a4 as Search, i as ShoppingBag, k as ArrowLeft, N as Lock, f as Check } from "../_libs/lucide-react.mjs";

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
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/isbot.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "./server-DS0mNS9X.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-iLMSaA3R.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/zod.mjs";
function MerchGrid({ drop, rank }) {
  const { mode } = useDropAuth();
  const [reserved, setReserved] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setReserved(getReservations().filter((r) => r.dropId === drop.id).map((r) => r.id));
  }, [drop.id]);
  function reserve(item) {
    if (mode !== "user") {
      toast.message("Creá tu cuenta para reservar merch");
      return;
    }
    const on = toggleReservation({ dropId: drop.id, artist: drop.artist, id: item.id, name: item.name, image: item.image, at: (/* @__PURE__ */ new Date()).toISOString() });
    setReserved((r) => on ? [...r, item.id] : r.filter((x) => x !== item.id));
    toast[on ? "success" : "message"](on ? "¡Reservado!" : "Reserva cancelada", { description: on ? "Quedó en tu pasaporte. Te avisamos cuando abra la venta." : void 0 });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: drop.merch.map((item) => {
    const locked = item.top !== void 0 && (rank === null || rank > item.top);
    const isReserved = reserved.includes(item.id);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, loading: "lazy", decoding: "async", className: "h-full w-full object-cover", style: { opacity: locked ? 0.35 : 1 } }),
        item.top !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: [
          "Exclusivo top ",
          item.top
        ] }),
        locked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-7 w-7 text-foreground/80" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold leading-tight", children: item.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 line-clamp-2 text-[11px] text-muted-foreground", children: item.detail }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-black tabular-nums", children: formatPrice(item.price) }),
        locked ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] font-semibold text-muted-foreground", children: rank === null ? `Se desbloquea en el top ${item.top}` : `Vas #${rank}: llegá al top ${item.top}` }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: isReserved ? "outline" : "default", className: "mt-2 w-full", onClick: () => reserve(item), children: isReserved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, {}),
          " Reservado"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, {}),
          " Reservar"
        ] }) })
      ] })
    ] }, item.id);
  }) }) });
}
function TiendaView({ artist }) {
  const drops = useDrops();
  const [q, setQ] = reactExports.useState("");
  const stores = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const d of drops) {
      if (!d.merch?.length) continue;
      const slug = artistSlug(d.artist);
      const s = map.get(slug) ?? { slug, artist: d.artist, cover: d.cover, hero: d.hero, drops: [], count: 0 };
      if (d.status === "active" && !s.drops.some((x) => x.status === "active")) {
        s.cover = d.cover;
        s.hero = d.hero;
      }
      s.drops.push(d);
      s.count += d.merch.length;
      map.set(slug, s);
    }
    return [...map.values()];
  }, [drops]);
  const store = artist ? stores.find((s) => s.slug === artist) : void 0;
  if (store) return /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistStore, { store });
  const norm = (t) => artistSlug(t).replace(/-/g, " ");
  const results = q.trim() ? stores.filter((s) => norm(s.artist).includes(norm(q))) : stores;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Merch oficial" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black", children: "Tienda" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Buscá a tu artista favorito y entrá a su tienda. Algunos productos son exclusivos para los primeros del ranking." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar artista", className: "flex-1 bg-transparent text-sm outline-none" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
      results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-sm text-muted-foreground", children: "Todavía no hay tienda de ese artista." }),
      results.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tienda", search: { a: s.slug }, className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.cover, alt: "", loading: "lazy", decoding: "async", className: "h-14 w-14 rounded-xl object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-bold", children: s.artist }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            s.count,
            " ",
            s.count === 1 ? "producto" : "productos"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5 text-primary" })
      ] }, s.slug))
    ] })
  ] });
}
function ArtistStore({ store }) {
  const { mode } = useDropAuth();
  const fetchRanking = useServerFn(getRanking);
  const [ranks, setRanks] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (mode !== "user") return;
    for (const d of store.drops) {
      if (d.status === "upcoming" || !d.merch?.some((m) => m.top)) continue;
      fetchRanking({ data: { campaign: d.id, scope: "Global" } }).then((r) => setRanks((x) => ({ ...x, [d.id]: r.me?.rank ?? null }))).catch(() => void 0);
    }
  }, [mode, store.slug]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: store.hero, alt: store.artist, decoding: "async", className: "h-56 w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tienda", "aria-label": "Volver a la tienda", className: "absolute left-4 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-5 bottom-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Tienda oficial" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black leading-tight", children: store.artist })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 px-5 pt-2", children: [
      store.drops.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-end justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black leading-tight", children: d.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/drop", search: { d: d.id }, className: "shrink-0 text-xs font-bold text-primary", children: "Ver drop" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MerchGrid, { drop: d, rank: ranks[d.id] ?? null })
      ] }, d.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Precios de referencia. La venta abre pronto: reservá y te avisamos." })
    ] })
  ] });
}
function Tienda() {
  const {
    a
  } = Route.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TiendaView, { artist: a }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalNav, {})
  ] });
}
export {
  Tienda as component
};
