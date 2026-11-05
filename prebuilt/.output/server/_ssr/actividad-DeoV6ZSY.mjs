import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { M as MobileShell } from "./MobileShell-Q_Sur2x5.mjs";
import { G as GlobalNav } from "./GlobalNav-zQb9bOxv.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useDropAuth } from "./router-Dfsr2sSX.mjs";
import { u as useDrops } from "./drops-BcyLcwgZ.mjs";
import { A as ArtistLine } from "./ArtistLine-DL2TRXoc.mjs";
import { d as dropProgress, a as achievements } from "./progress-Bd-N7bnm.mjs";
import "../_libs/sonner.mjs";

import { c as TicketCheck, A as ArrowRight, d as Sparkles, D as Disc3, G as Gift, T as Target } from "../_libs/lucide-react.mjs";

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
function movementTitle(reason) {
  switch (reason) {
    case "mission_reward":
      return "Misión validada";
    case "reward_redeem":
      return "Canje de recompensa";
    case "album_listened":
      return "Álbum marcado como escuchado";
    case "album_unlistened":
      return "Álbum desmarcado";
    default:
      return "Movimiento histórico";
  }
}
function movementIcon(reason) {
  switch (reason) {
    case "mission_reward":
      return Target;
    case "reward_redeem":
      return Gift;
    case "album_listened":
    case "album_unlistened":
      return Disc3;
    default:
      return Sparkles;
  }
}
function DropRow({ p, cta }) {
  const pct = p.total ? Math.round(100 * p.done / p.total) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/drop", search: { d: p.drop.id }, className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: p.drop.status === "archived" ? p.drop.album : p.drop.cover, alt: "", className: `h-14 w-14 shrink-0 rounded-xl object-cover ${p.drop.status === "archived" ? "sepia-[0.4]" : ""}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistLine, { drop: p.drop }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-black", children: p.drop.title }),
      p.drop.status !== "upcoming" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full", style: { width: `${pct}%`, backgroundImage: "var(--gradient-drop)" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] text-muted-foreground", children: [
          p.score.toLocaleString("es-AR"),
          " pts · ",
          p.done,
          "/",
          p.total,
          " misiones"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: p.drop.dates })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center gap-1 text-xs font-bold text-primary", children: [
      cta,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
    ] })
  ] });
}
function ActividadView() {
  const { state, mode, profile } = useDropAuth();
  const drops = useDrops();
  const progress = dropProgress(state, drops);
  const active = progress.filter((p) => p.drop.status === "active");
  const mine = active.filter((p) => p.participating);
  const others = active.filter((p) => !p.participating);
  const upcoming = progress.filter((p) => p.drop.status === "upcoming");
  const archived = progress.filter((p) => p.drop.status === "archived");
  const logros = achievements(state, progress, profile.listened_albums?.length ?? 0);
  const unlocked = logros.filter((l) => l.unlocked).length;
  const artistOf = (id) => drops.find((d) => d.id === id)?.artist;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight", children: "Mi actividad" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Tus drops en curso, lo que se viene y lo que ya viviste." })
    ] }),
    mode !== "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-2xl border border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground", children: "En modo invitado la actividad no se guarda. Creá una cuenta para sumar puntos." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Mis drops activos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Donde estás sumando puntos ahora." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        mine.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(DropRow, { p, cta: "Seguir" }, p.drop.id)),
        mine.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground", children: "Todavía no empezaste ningún drop. Elegí uno abajo o desde Explorar." })
      ] }),
      others.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "También podés sumarte a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: others.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(DropRow, { p, cta: "Entrar" }, p.drop.id)) })
      ] })
    ] }),
    upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Mis próximos drops" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Anunciados. Entrá para activar el aviso." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: upcoming.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(DropRow, { p, cta: "Ver" }, p.drop.id)) })
    ] }),
    archived.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "📼 Experiencias finalizadas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Revisitá sus misiones, tu resultado y el ranking final." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: archived.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(DropRow, { p, cta: "Revisitar" }, p.drop.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Mis logros" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary", children: [
          unlocked,
          " de ",
          logros.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: logros.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-3 text-center ${l.unlocked ? "border-primary/50 bg-primary/10" : "border-border bg-card opacity-60"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl ${l.unlocked ? "" : "grayscale"}`, children: l.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-bold leading-tight", children: l.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] leading-tight text-muted-foreground", children: l.detail })
      ] }, l.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-lg font-black", children: "Historial de puntos" }),
      state.movements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Todavía no hay movimientos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Acá aparecen los puntos que sumás por misiones validadas, álbumes y canjes." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: state.movements.map((m) => {
        const Icon = movementIcon(m.reason);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: movementTitle(m.reason) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
              artistOf(m.campaign_id) ? `${artistOf(m.campaign_id)} · ` : "",
              new Date(m.created_at).toLocaleDateString("es-AR")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-sm font-black tabular-nums ${m.amount >= 0 ? "text-primary" : "text-muted-foreground"}`, children: [
              m.amount > 0 ? "+" : "",
              m.amount,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold", children: "generales" })
            ] }),
            (m.campaign_delta ?? 0) !== 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
              "+",
              m.campaign_delta,
              " de ",
              artistOf(m.campaign_id) ?? "artista"
            ] })
          ] })
        ] }, m.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-lg font-black", children: "Recompensas obtenidas" }),
      state.redemptions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Cuando canjees recompensas van a quedar registradas acá." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: state.redemptions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TicketCheck, { className: "h-4 w-4 shrink-0 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: r.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: new Date(r.created_at).toLocaleDateString("es-AR") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-muted-foreground", children: [
          "-",
          r.cost,
          " pts"
        ] })
      ] }, r.id)) })
    ] })
  ] });
}
function Actividad() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActividadView, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalNav, {})
  ] });
}
export {
  Actividad as component
};
