import { p as performance } from "../_libs/unenv.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { M as MobileShell, D as DropLogo } from "./MobileShell-CQghwIf2.mjs";
import { D as Drawer, a as DrawerContent, b as DrawerHeader, c as DrawerTitle, d as DrawerDescription, L as ListenButtons, f as fanLali, e as fanMaria } from "./drop-photo-33.png.asset.json-CeDT6q8u.mjs";
import { R as Route$7, D as DropNav } from "./router-kRkf_k-2.mjs";
import { u as useDropAuth, a as useServerFn, g as getRanking, f as followFan, m as missionAction } from "./AuthProvider-ufFKHFhq.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-CmBBmRLo.mjs";
import { c as useCurrentDrop, b as useDropContent, t as themeCss, S as STATUS_LABEL, l as laliCover, d as adelaGlitter, e as arjonaRojo, f as arjonaCover, g as arjonaRed, h as airbagBanda, i as airbagVivo, j as lnvGira, k as lnvPoster, m as arjonaSeco, n as coverMechon, o as useCurrentDropId, p as eventCrowd } from "./drops-CJmd4uez.mjs";
import { a as artistSlug } from "./merch-YaTn1SEj.mjs";
import { A as ArtistLine } from "./ArtistLine-gxIHuyOJ.mjs";
import { f as findAlbum, i as isAlbumSaved, a as isSpotifyConnected, c as canSaveToLibrary, b as connectSpotify, s as saveAlbum, d as disconnectSpotify, r as recentPlays } from "./spotify-DWadGKCI.mjs";
import { c as coverLali, a as coverNena, s as searchCatalog } from "./AlbumReviewDialog-Dq-zToI-.mjs";
import { P as PHOTOS, A as AlbumsSection, a as avatarFor, D as DropSelector, R as RewardsRedeem } from "./RewardsRedeem-Bh9c5LKS.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";
import "../_libs/vaul.mjs";

import { k as ArrowLeft, j as UserRound, D as Disc3, s as PhoneCall, b as Trophy, G as Gift, U as Users, X, t as ChartColumn, B as Bell, u as Download, h as Activity$1, c as TicketCheck, v as MapPin, w as TrendingUp, x as Star, y as Share2, z as Music, F as FileText, J as BellRing, T as Target, A as ArrowRight, K as Medal, i as ShoppingBag, N as Lock, O as Headphones, Q as Puzzle, R as Camera, d as Sparkles, L as LoaderCircle, V as Send, W as Heart, Y as MessageCircle, q as Trash2, Z as ChevronRight, _ as Phone, $ as Clock, a0 as ShieldCheck, a1 as Ticket, a2 as Calendar, a3 as UserPlus, a4 as Search, a5 as UserCheck, a6 as PhoneOff, f as Check, a7 as ArrowUp, a8 as ArrowDown, a9 as ScanLine, P as Pause, a as Play } from "../_libs/lucide-react.mjs";



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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./server-DQE0uBY2.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-gmTWcNTu.mjs";
import "../_libs/zod.mjs";
import "./dialog-BjGLE7AR.mjs";
import "./input-tV2rOYDx.mjs";
const NOTIFS = [
  {
    id: 1,
    icon: PhoneCall,
    title: "Llamada entrante · 20:30",
    body: "El demonio llama hoy a las 20:30. Atendé desde El Mapa para desbloquear el Drop #04.",
    time: "hace 3 min"
  },
  {
    id: 2,
    icon: Trophy,
    title: "Subiste 4 posiciones",
    body: "Estás #47 en el ranking global. Te faltan 3 lugares para entrar al Top 50.",
    time: "hace 1 h"
  },
  {
    id: 3,
    icon: Gift,
    title: "Nueva recompensa en tu Pasaporte",
    body: "Desbloqueaste el sticker 'LALIVERSE' del Día 7.",
    time: "hace 4 h"
  },
  {
    id: 4,
    icon: Users,
    title: "Team CABA te mencionó",
    body: "@lalisters te etiquetó en la caza de QR de Recoleta.",
    time: "ayer"
  }
];
function TopBar({
  title,
  dashboardOpen,
  onToggleDashboard,
  onOpenProfile,
  back,
  avatar
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [read, setRead] = reactExports.useState([]);
  const unread = NOTIFS.filter((n) => !read.includes(n.id)).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex items-center justify-between bg-background/70 px-5 pb-3 pt-5 backdrop-blur-xl", children: [
      back ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/explorar", "aria-label": `Volver a ${back}`, className: "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        avatar && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: avatar, alt: "", className: "h-9 w-9 shrink-0 rounded-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Drop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-black leading-tight", children: title })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropLogo, { className: "h-12 w-28 shrink-0 object-contain" }),
        title && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-sm font-medium text-muted-foreground", children: [
          "/ ",
          title
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        onToggleDashboard && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onToggleDashboard,
            className: "grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted",
            "aria-label": "Dashboard sello",
            children: dashboardOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" })
          }
        ),
        onOpenProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onOpenProfile,
            className: "grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted",
            "aria-label": "Abrir Mi DROP",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen(true),
            className: "relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted",
            "aria-label": "Notificaciones",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
              unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[11px] font-black text-primary-foreground", children: unread })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerContent, { className: "max-h-[85vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "text-xl font-black", children: "Notificaciones" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { className: "text-xs", children: unread > 0 ? `${unread} sin leer` : "Estás al día" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 overflow-y-auto px-4 pb-6", children: [
        NOTIFS.map((n) => {
          const Icon = n.icon;
          const isRead = read.includes(n.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setRead((r) => r.includes(n.id) ? r : [...r, n.id]),
              className: `flex w-full gap-3 rounded-2xl border p-3 text-left transition-colors ${isRead ? "border-border bg-card" : "border-primary/40 bg-primary/5"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground",
                    style: { backgroundImage: "var(--gradient-drop)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm font-bold", children: n.title }),
                    !isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 shrink-0 rounded-full bg-primary" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 block text-xs text-muted-foreground", children: n.body }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] uppercase tracking-wider text-muted-foreground", children: n.time })
                ] })
              ]
            },
            n.id
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setRead(NOTIFS.map((n) => n.id)),
            className: "w-full rounded-xl border border-primary/40 py-3 text-sm font-bold text-primary",
            children: "Marcar todas como leídas"
          }
        )
      ] })
    ] }) })
  ] });
}
function Countdown({ to, label = "Abre en" }) {
  const target = new Date(to).getTime();
  const [now, setNow] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, target - (now ?? target));
  const parts = [
    { v: Math.floor(left / 864e5), l: "días" },
    { v: Math.floor(left / 36e5) % 24, l: "horas" },
    { v: Math.floor(left / 6e4) % 60, l: "minutos" },
    { v: Math.floor(left / 1e3) % 60, l: "segundos" }
  ];
  const tz = "America/Argentina/Buenos_Aires";
  const raw = new Date(target).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: tz });
  const date = raw.charAt(0).toUpperCase() + raw.slice(1);
  const time = new Date(target).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: tz });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: now !== null && left === 0 ? "¡Ya abrió!" : label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-4 gap-2", role: "timer", "aria-live": "off", children: parts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background/60 px-1 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black tabular-nums leading-none", children: now === null ? "--" : String(p.v).padStart(2, "0") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground", children: p.l })
    ] }, p.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
      date,
      " · ",
      time,
      " h (hora argentina)"
    ] })
  ] });
}
const heroPhone = "/assets/hero-phone-DkNtcsYZ.jpg";
const qrStreet = "/assets/qr-street-C1c4M060.jpg";
const url$8 = "/assets/lali-phones-CunQ4AL-.webp";
const laliPhones = { url: url$8 };
const url$7 = "/assets/stencil-wall-CFz6uIIx.webp";
const stencilWall = { url: url$7 };
function dayLabel(offset) {
  return new Date(Date.now() + offset * 864e5).toLocaleDateString("es-AR", { day: "2-digit", month: "short" }).replace(".", "").replace("-", " ");
}
function unlockAt(offset) {
  const d = new Date(Date.now() + offset * 864e5);
  d.setHours(20, 30, 0, 0);
  return d.getTime();
}
function useCountdown(target) {
  const [now, setNow] = reactExports.useState(() => Date.now());
  reactExports.useEffect(() => {
    if (!target) return;
    const t = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(t);
  }, [target]);
  if (!target) return "";
  const left = Math.max(0, target - now);
  const d = Math.floor(left / 864e5), h = Math.floor(left % 864e5 / 36e5), m = Math.floor(left % 36e5 / 6e4), sec = Math.floor(left % 6e4 / 1e3);
  return d > 0 ? `${d}d ${h}h ${m}m` : `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
function useRingtone(active) {
  reactExports.useEffect(() => {
    if (!active || typeof window === "undefined") return;
    const AC = window.AudioContext ?? window.webkitAudioContext;
    let ctx = null;
    try {
      ctx = AC ? new AC() : null;
    } catch {
      ctx = null;
    }
    const ring = () => {
      try {
        navigator.vibrate?.([400, 200, 400]);
      } catch {
      }
      if (!ctx) return;
      const t0 = ctx.currentTime;
      for (const [start, freq] of [[0, 440], [0, 480], [0.5, 440], [0.5, 480]]) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.frequency.value = freq;
        o.type = "sine";
        g.gain.setValueAtTime(0, t0 + start);
        g.gain.linearRampToValueAtTime(0.08, t0 + start + 0.02);
        g.gain.setValueAtTime(0.08, t0 + start + 0.38);
        g.gain.linearRampToValueAtTime(0, t0 + start + 0.42);
        o.connect(g).connect(ctx.destination);
        o.start(t0 + start);
        o.stop(t0 + start + 0.45);
      }
    };
    ring();
    const t = setInterval(ring, 2500);
    return () => {
      clearInterval(t);
      try {
        navigator.vibrate?.(0);
      } catch {
      }
      void ctx?.close();
    };
  }, [active]);
}
const drops = [
  {
    id: 1,
    title: "Llamada #1 · Fragmentos",
    date: dayLabel(-14),
    offset: -14,
    status: "done",
    x: 18,
    y: 12,
    desc: "Atendiste la primera llamada y armaste el fragmento de audio oculto en el contestador.",
    pts: 300,
    reward: "Sticker 'Corazón LALI'"
  },
  {
    id: 2,
    title: "Pre-save del álbum",
    date: dayLabel(-10),
    offset: -10,
    status: "done",
    x: 62,
    y: 22,
    desc: "Guardaste el álbum antes del estreno y desbloqueaste el arte de tapa animado.",
    pts: 180,
    reward: "Wallpaper animado"
  },
  {
    id: 3,
    title: "Llamada #2 · Mensaje oculto",
    date: dayLabel(-6),
    offset: -6,
    status: "done",
    x: 28,
    y: 38,
    desc: "Escuchaste el mensaje al revés y descifraste el nombre del próximo track.",
    pts: 420,
    reward: "Fragmento 'Fanático'"
  },
  {
    id: 4,
    title: "QR en Palermo",
    date: "Hoy",
    offset: 0,
    status: "active",
    x: 72,
    y: 52,
    desc: "Tres afiches escondidos entre Plaza Serrano y Thames. Escaneá los QR antes de que se agoten los cupos.",
    pts: 500,
    reward: "Entrada al sorteo VIP"
  },
  {
    id: 5,
    title: "Llamada #3 · Número perdido",
    date: dayLabel(2),
    offset: 2,
    status: "locked",
    x: 30,
    y: 68,
    desc: "Un número desconocido va a llamar. Solo los que estén en el Top 200 pueden atender.",
    pts: 600,
    reward: "Preview del track 8"
  },
  {
    id: 6,
    title: "Listening Party",
    date: dayLabel(9),
    offset: 9,
    status: "locked",
    x: 68,
    y: 84,
    desc: "El evento final. Escuchás el álbum completo con LALI antes que nadie. Solo Top 50.",
    pts: 1e3,
    reward: "Souvenir 'Estuve el Día 1'"
  }
];
function MapaView({ onGoMisiones, embedded = false }) {
  const { state } = useDropAuth();
  const dropId = useCurrentDropId();
  const score = state.balances.find((b) => b.campaign_id === dropId)?.score ?? 0;
  const dropMissions = state.missions.filter((m) => m.campaign_id === dropId && m.status === "verified");
  const doneMissions = new Set(state.attempts.filter((a) => a.status === "completed").map((a) => a.mission_id));
  const progressPct = dropMissions.length ? Math.round(100 * dropMissions.filter((m) => doneMissions.has(m.id)).length / dropMissions.length) : 0;
  const [node, setNode] = reactExports.useState(null);
  const [call, setCall] = reactExports.useState(false);
  const [answered, setAnswered] = reactExports.useState(false);
  const [reminders, setReminders] = reactExports.useState([]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: embedded ? "space-y-4" : "space-y-5 px-4", children: [
    embedded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "El recorrido" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Cada punto es una etapa del drop. Tocalos para ver qué pasa en cada lugar." })
    ] }),
    embedded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setCall(true),
        className: "flex w-full items-center gap-3 rounded-2xl border border-primary/40 bg-card p-2 text-left transition-colors active:bg-primary/10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 shrink-0 animate-pulse place-items-center rounded-xl text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] uppercase tracking-widest text-muted-foreground", children: "Llamada entrante" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-bold", children: "Número desconocido · tocá para atender" })
          ] })
        ]
      }
    ),
    !embedded && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-3xl border border-border p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          decoding: "async",
          src: heroPhone,
          alt: "Teléfono rojo entre humo",
          className: "absolute inset-0 h-full w-full object-cover opacity-80"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          decoding: "async",
          src: laliCover.url,
          alt: "Tapa del álbum 'No vayas a atender cuando el demonio llama'",
          className: "absolute -right-5 -top-5 h-32 w-32 rotate-12 rounded-2xl border border-border object-cover shadow-2xl"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3 inline-flex items-center gap-1 rounded-full bg-primary/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-foreground backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " DROP #01 · LALI"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "relative text-2xl font-black leading-tight", children: [
        "No vayas a atender ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        " cuando el demonio llama"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mt-2 text-xs text-muted-foreground", children: "Cada día se desbloquea una nueva llamada. Atendé, resolvé y sumá puntos." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setCall(true),
          className: "relative mt-4 flex w-full items-center gap-3 rounded-2xl border border-primary/40 bg-background/40 p-2 text-left backdrop-blur transition-colors active:bg-primary/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "grid h-14 w-14 shrink-0 animate-pulse place-items-center rounded-2xl text-primary-foreground shadow-[var(--shadow-glow)]",
                style: { backgroundImage: "var(--gradient-drop)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] uppercase tracking-widest text-muted-foreground", children: "Llamada entrante" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-bold", children: "Número desconocido · tocá para atender" })
            ] })
          ]
        }
      )
    ] }),
    !embedded && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: [
          "Tu progreso · ",
          progressPct,
          "% del drop"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
          score,
          " pts de campaña"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full rounded-full",
          style: { width: `${progressPct}%`, backgroundImage: "var(--gradient-drop)" }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative h-[460px] overflow-hidden rounded-3xl border border-border",
        style: {
          backgroundImage: "radial-gradient(circle at 30% 10%, oklch(0.5 0.08 250 / 0.35), transparent 55%), radial-gradient(circle at 80% 90%, oklch(0.7 0.09 70 / 0.22), transparent 55%), linear-gradient(180deg, oklch(0.18 0.012 60), oklch(0.11 0.008 60))"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              loading: "lazy",
              decoding: "async",
              src: stencilWall.url,
              alt: "",
              "aria-hidden": true,
              className: "absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-luminosity"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              className: "absolute inset-0 h-full w-full",
              viewBox: "0 0 100 100",
              preserveAspectRatio: "none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "pathGrad", x1: "0", x2: "1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "oklch(0.8 0.09 78)", stopOpacity: "0.9" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "oklch(0.5 0.08 250)", stopOpacity: "0.5" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: drops.map((d, i) => `${i === 0 ? "M" : "L"} ${d.x} ${d.y}`).join(" "),
                    stroke: "url(#pathGrad)",
                    strokeWidth: "0.6",
                    strokeDasharray: "1.4 1.4",
                    fill: "none"
                  }
                )
              ]
            }
          ),
          drops.map((d) => {
            const active = d.status === "active";
            const locked = d.status === "locked";
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setNode(d),
                className: "absolute -translate-x-1/2 -translate-y-1/2 transition-transform active:scale-90",
                style: { left: `${d.x}%`, top: `${d.y}%` },
                "aria-label": d.title,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center", children: [
                  active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "absolute inset-0 -m-2 animate-ping rounded-full opacity-60",
                      style: { backgroundImage: "var(--gradient-drop)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "relative grid h-11 w-11 place-items-center rounded-full border-2 " + (active ? "border-transparent text-primary-foreground shadow-[var(--shadow-glow)]" : "border-border bg-muted text-muted-foreground"),
                      style: active ? { backgroundImage: "var(--gradient-drop)" } : void 0,
                      children: locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 whitespace-nowrap rounded-full bg-background/80 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide backdrop-blur", children: locked ? `en ${Math.max(1, d.offset)}d` : d.date })
                ] })
              },
              d.id
            );
          })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-2xl border border-primary/40 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          decoding: "async",
          src: qrStreet,
          alt: "Afiche con QR en la calle",
          loading: "lazy",
          className: "h-32 w-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-primary", children: "Llamada activa" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-lg font-bold", children: "QR en Palermo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "3 afiches con QR escondidos entre Plaza Serrano y Thames. Escanealos y sumá 500 puntos." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onGoMisiones,
            className: "mt-3 w-full rounded-xl py-3 text-sm font-bold text-primary-foreground",
            style: { backgroundImage: "var(--gradient-drop)" },
            children: "Atender llamada →"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open: !!node, onOpenChange: (o) => !o && setNode(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContent, { className: "max-h-[85vh]", children: node && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: node.status === "done" ? "Demostración" : node.status === "active" ? "Demostración" : `Se desbloquea el ${node.date}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "text-xl font-black", children: node.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { className: "text-sm", children: node.desc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-4 pb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Puntos de muestra" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-black text-primary", children: [
              "+",
              node.pts
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Recompensa" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold leading-snug", children: node.reward })
          ] })
        ] }),
        node.status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-4 w-4 shrink-0 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Recompensa de muestra; no fue acreditada a tu cuenta." })
        ] }),
        node.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setNode(null);
              onGoMisiones();
            },
            className: "w-full rounded-xl py-3 text-sm font-black text-primary-foreground",
            style: { backgroundImage: "var(--gradient-drop)" },
            children: "Ir a la misión"
          }
        ),
        node.status === "locked" && /* @__PURE__ */ jsxRuntimeExports.jsx(LockedCountdown, { offset: node.offset }),
        node.status === "locked" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setReminders((r) => r.includes(node.id) ? r : [...r, node.id]);
              toast.success("Te avisamos cuando se desbloquee", {
                description: `Fecha de desbloqueo: ${node.date}.`
              });
            },
            className: "flex w-full items-center justify-center gap-2 rounded-xl border border-primary/40 py-3 text-sm font-bold text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
              reminders.includes(node.id) ? "Recordatorio activado ✓" : "Avisarme cuando abra"
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IncomingCall,
      {
        open: call,
        answered,
        onAnswer: () => setAnswered(true),
        onClose: () => {
          setCall(false);
          setTimeout(() => setAnswered(false), 300);
        },
        onGoMisiones: () => {
          setCall(false);
          setAnswered(false);
          onGoMisiones();
        }
      }
    )
  ] });
}
function IncomingCall({
  open,
  answered,
  onAnswer,
  onClose,
  onGoMisiones
}) {
  const [secs, setSecs] = reactExports.useState(0);
  useRingtone(open && !answered);
  reactExports.useEffect(() => {
    if (!answered) {
      setSecs(0);
      return;
    }
    const t = setInterval(() => setSecs((s) => s + 1), 1e3);
    return () => clearInterval(t);
  }, [answered]);
  const mmss = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerContent, { className: "max-h-[85vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: answered ? `Demostración de llamada · ${mmss}` : "Llamada entrante" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { className: "sr-only", children: "Llamada del drop" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 px-6 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative ${answered ? "" : "animate-pulse"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            decoding: "async",
            src: laliPhones.url,
            alt: "LALI atendiendo dos teléfonos",
            className: "h-28 w-28 rounded-full border-2 border-primary/60 object-cover shadow-[var(--shadow-glow)]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full text-primary-foreground",
            style: { backgroundImage: "var(--gradient-drop)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black", children: "Número desconocido" }),
      answered ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wider text-primary", children: "Transcripción" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 italic text-muted-foreground", children: "“…te dije que no atiendas. Ahora ya es tarde. El afiche está a tres cuadras de Plaza Serrano, debajo de algo rojo. Tenés hasta las 23:59.”" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full items-end gap-1", children: Array.from({ length: 28 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "flex-1 rounded-sm bg-primary/70",
            style: { height: `${8 + i * 7 % 26}px` }
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onGoMisiones,
            className: "w-full rounded-xl py-3 text-sm font-black text-primary-foreground",
            style: { backgroundImage: "var(--gradient-drop)" },
            children: "Ver la pista en Misiones"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: onClose,
            className: "flex items-center gap-2 text-xs font-bold text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "h-4 w-4" }),
              " Cortar"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex w-full items-center justify-around", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "grid h-16 w-16 place-items-center rounded-full bg-muted text-foreground",
            "aria-label": "Rechazar",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "h-6 w-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onAnswer,
            className: "grid h-16 w-16 place-items-center rounded-full text-primary-foreground",
            style: { backgroundImage: "var(--gradient-drop)" },
            "aria-label": "Atender",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "h-6 w-6" })
          }
        )
      ] })
    ] })
  ] }) });
}
function LockedCountdown({ offset }) {
  const left = useCountdown(unlockAt(offset));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-3 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Se desbloquea en" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-2xl font-black tabular-nums", children: left })
  ] });
}
const url$6 = "/assets/sticker-nvaa-B32RZAqu.webp";
const stickerNvaa = { url: url$6 };
const url$5 = "/assets/simbolos-33-B1fpzSeA.webp";
const simbolos33 = { url: url$5 };
const url$4 = "/assets/lali-logo-Cn0h4Q1S.webp";
const laliLogo = { url: url$4 };
const url$3 = "/assets/fanatico-single-B5Uzvt3s.webp";
const fanaticoSingle = { url: url$3 };
const url$2 = "/assets/lali-auto-IlawJ0OP.webp";
const laliAuto = { url: url$2 };
const rewards = [
  { img: stickerNvaa.url, label: "Sticker: No vayas a atender cuando el demonio llama", need: 1 },
  { img: fanaticoSingle.url, label: "Fragmento: 'Fanático'", need: 2 },
  { img: laliAuto.url, label: "Foto exclusiva #01", need: 4 },
  { img: simbolos33.url, label: "Sticker: pentagrama 33", need: 6 },
  { img: laliCover.url, label: "Arte alternativo del álbum", need: 9 },
  { img: laliLogo.url, label: "Insignia LALIVERSE", need: 12 }
];
const DROP_MISSIONS = ["lali-stream", "lali-trivia", "lali-order", "lali-qr", "lali-ar"];
function PasaporteView({ embedded = false }) {
  const { state, mode } = useDropAuth();
  const isUser = mode === "user";
  const completed = state.attempts.filter((a) => a.status === "completed" && a.general_award > 0);
  const done = isUser ? completed.length : 5;
  const missionsDone = isUser ? new Set(completed.map((a) => a.mission_id).filter((id) => DROP_MISSIONS.includes(id))).size : 3;
  const vip = missionsDone >= DROP_MISSIONS.length;
  const unlockedCount = rewards.filter((r) => done >= r.need).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: embedded ? "" : "px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      embedded ? /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Recompensas" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black", children: "Pasaporte" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: embedded ? "Completá misiones para desbloquear premios y el acceso VIP." : "Tus recompensas del recorrido LALI." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mb-6 overflow-hidden rounded-3xl border border-primary/50 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-28 w-full overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            decoding: "async",
            src: eventCrowd,
            alt: "Público en el listening party",
            loading: "lazy",
            className: "h-full w-full object-cover opacity-70"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Acceso VIP · Primeros 150" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Listening Party" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "LALI · No vayas a atender cuando el demonio llama" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6 text-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mx-auto my-2 grid h-40 w-40 place-items-center rounded-2xl border p-3 ${vip ? "border-primary bg-primary/15" : "border-dashed border-primary/40 bg-primary/5"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 place-items-center rounded-full bg-primary/15", children: vip ? /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-6 w-6 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold leading-tight", children: vip ? "¡Estás en la lista!" : "Acceso bloqueado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-snug text-muted-foreground", children: vip ? "Completaste todos los retos. Te confirmamos el lugar por mail." : `Completá los ${DROP_MISSIONS.length} retos del drop para entrar a los primeros 150.` })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Retos del drop" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              missionsDone,
              " de ",
              DROP_MISSIONS.length
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all", style: { width: `${missionsDone / DROP_MISSIONS.length * 100}%`, backgroundImage: "var(--gradient-drop)" } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 -translate-x-6 rounded-full bg-background" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 border-t border-dashed border-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 translate-x-6 rounded-full bg-background" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }), label: "Sábado 2 Abr · 21:00 hs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }), label: "Complejo Art Media" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground", children: [
      "Colección · ",
      unlockedCount,
      " de ",
      rewards.length
    ] }),
    !isUser && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "-mt-2 mb-3 text-xs text-muted-foreground", children: "Colección de ejemplo. Ingresá con tu cuenta para armar la tuya." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: rewards.map((r) => {
      const locked = done < r.need;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "overflow-hidden rounded-2xl border border-border bg-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-24 bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  decoding: "async",
                  src: r.img,
                  alt: r.label,
                  loading: "lazy",
                  className: "h-full w-full object-cover",
                  style: { opacity: locked ? 0.25 : 1 }
                }
              ),
              locked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-7 w-7 text-muted-foreground" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: locked ? `${r.need} ${r.need === 1 ? "misión" : "misiones"}` : "Desbloqueado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-semibold", children: locked ? "Bloqueado" : r.label })
            ] })
          ]
        },
        r.label
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl border border-dashed border-border bg-card/50 p-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold", children: '🏆 Souvenir "Estuve el Día 1"' }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: vip ? "Se activa el día del evento al escanear tu QR en la entrada." : "Se activa cuando se desbloquee tu acceso al evento." })
    ] })
  ] });
}
function Row({ icon, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-6 w-6 place-items-center rounded-full bg-primary/20 text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
  ] });
}
const GENERIC_REWARDS = [
  { label: "Insignia de fan", need: 1 },
  { label: "Wallpaper exclusivo", need: 2 },
  { label: "Participación en el sorteo de entradas", need: 3 }
];
function DropHome({ drop, onGo }) {
  const { state, mode } = useDropAuth();
  const fetchRanking = useServerFn(getRanking);
  const [rank, setRank] = reactExports.useState(null);
  const [remind, setRemind] = reactExports.useState(() => {
    try {
      return localStorage.getItem(`drop-aviso-${drop.id}`) === "1";
    } catch {
      return false;
    }
  });
  reactExports.useEffect(() => {
    setRank(null);
    if (mode !== "user" || drop.status === "upcoming") return;
    fetchRanking({ data: { campaign: drop.id, scope: "Global" } }).then((r) => setRank(r.me?.rank ?? null)).catch(() => setRank(null));
  }, [mode, drop.id, drop.status]);
  const missions2 = state.missions.filter((m) => m.campaign_id === drop.id && m.status === "verified");
  const doneIds = new Set(state.attempts.filter((a) => a.status === "completed").map((a) => a.mission_id));
  const done = missions2.filter((m) => doneIds.has(m.id)).length;
  const score = state.balances.find((b) => b.campaign_id === drop.id)?.score ?? 0;
  const pct = missions2.length ? Math.round(100 * done / missions2.length) : 0;
  const featured = missions2.find((m) => !doneIds.has(m.id)) ?? missions2[0];
  const active = drop.status === "active";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative -mx-5 -mt-2 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: drop.hero, alt: drop.artist, className: `h-72 w-full object-cover ${drop.status === "archived" ? "grayscale-[60%]" : ""}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-5 bottom-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wider ${active ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground"}`, children: drop.status === "archived" ? "📼 Archivo" : STATUS_LABEL[drop.status] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-bold text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistLine, { drop }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black leading-tight", children: drop.title }),
        drop.tagline && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: drop.tagline })
      ] })
    ] }),
    drop.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: drop.description }),
    drop.kind !== "noticia" && /* @__PURE__ */ jsxRuntimeExports.jsx(ListenButtons, { query: drop.kind === "show" ? drop.artist : `${drop.artist} ${drop.title}` }),
    drop.status !== "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl p-4 text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest opacity-80", children: drop.status === "archived" ? "Tu resultado final" : "Tu progreso en este drop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black tabular-nums", children: score.toLocaleString("es-AR") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] opacity-80", children: [
            "pts de ",
            drop.artist
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black tabular-nums", children: rank ? `#${rank}` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] opacity-80", children: "ranking" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-black tabular-nums", children: [
            done,
            "/",
            missions2.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] opacity-80", children: "misiones" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 overflow-hidden rounded-full bg-background/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-background", style: { width: `${pct}%` } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs opacity-90", children: mode !== "user" ? "Creá una cuenta para sumar puntos y aparecer en el ranking." : drop.status === "archived" ? "Este drop finalizó: tu resultado quedó guardado." : pct === 100 ? "¡Completaste todo! Mantené tu racha con las misiones diarias." : "Los puntos de este drop cuentan solo para su ranking. Tus puntos generales están en tu perfil." }),
      mode !== "user" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "secondary", className: "mt-3 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: { mode: "signup" }, children: "Crear cuenta" }) })
    ] }),
    drop.status === "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-border bg-card p-5 text-center", children: [
      drop.launchAt ? /* @__PURE__ */ jsxRuntimeExports.jsx(Countdown, { to: drop.launchAt }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black", children: "Muy pronto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Las misiones, el ranking y las recompensas se habilitan cuando abra el drop. Mientras tanto, pre-guardá el álbum en Spotify desde Misiones." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4 w-full", variant: remind ? "secondary" : "default", onClick: () => {
        const next = !remind;
        setRemind(next);
        try {
          localStorage.setItem(`drop-aviso-${drop.id}`, next ? "1" : "0");
        } catch {
        }
        toast.success(next ? `Te avisamos cuando abra el drop de ${drop.artist}` : "Aviso desactivado");
      }, children: [
        remind ? /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, {}),
        remind ? "Aviso activado" : "Avisarme cuando abra"
      ] })
    ] }),
    featured && drop.status !== "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-xl font-black", children: active ? "Tu próxima misión" : "Misiones del drop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onGo("misiones"), className: "relative block w-full overflow-hidden rounded-3xl border border-primary/40 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: drop.cover, alt: "", className: "absolute inset-0 h-full w-full object-cover opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3.5 w-3.5" }),
            featured.kind === "trivia" ? "Trivia" : featured.kind === "clue" ? "Acertijo" : "Desafío",
            featured.repeat_period === "daily" ? " · diaria" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-lg font-black leading-tight", children: featured.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm font-bold text-primary", children: [
            "+",
            featured.campaign_reward,
            " pts de ",
            drop.artist
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-black text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: [
            active ? doneIds.has(featured.id) ? "Ver misiones" : "Jugar ahora" : "Ver misiones",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "mt-3 w-full", onClick: () => onGo("misiones"), children: [
        "Ver las ",
        missions2.length,
        " misiones"
      ] })
    ] }),
    drop.showDates && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Fechas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-3 text-sm text-muted-foreground", children: [
        drop.showDates.dates.length,
        " funciones · ",
        drop.showDates.label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: drop.showDates.dates.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold", children: d }, d)) })
    ] }),
    drop.prizes?.length && drop.status !== "upcoming" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Premios del ranking" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm text-muted-foreground", children: drop.status === "archived" ? "Lo que se ganaron los primeros del ranking." : "Cuando cierre el drop, los primeros del ranking se llevan:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: drop.prizes.map((p, i) => {
        const inside = rank !== null && rank <= p.top;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 rounded-2xl border p-3 ${inside ? "border-primary/60 bg-primary/10" : "border-border bg-card"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: i === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-black uppercase tracking-widest text-primary", children: [
              "Top ",
              p.top
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold leading-snug", children: p.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: rank === null ? `Los primeros ${p.top} del ranking` : inside ? `¡Estás adentro! Vas #${rank}` : `Vas #${rank}: te faltan ${rank - p.top} puestos` })
          ] })
        ] }, p.top);
      }) }),
      active && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "mt-3 w-full", onClick: () => onGo("ranking"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, {}),
        " Ver el ranking"
      ] })
    ] }) : null,
    drop.merch?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tienda", search: { a: artistSlug(drop.artist) }, className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: drop.merch[0].image, alt: "", loading: "lazy", decoding: "async", className: "h-14 w-14 rounded-xl object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold", children: [
          "Tienda oficial de ",
          drop.artist
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          drop.merch.length,
          " productos",
          drop.merch.some((m) => m.top) ? ", algunos exclusivos del ranking" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5 text-primary" })
    ] }) : null,
    drop.id === "lali" && /* @__PURE__ */ jsxRuntimeExports.jsx(MapaView, { embedded: true, onGoMisiones: () => onGo("misiones") }),
    drop.id === "lali" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PasaporteView, { embedded: true }) : drop.status !== "upcoming" && !drop.prizes?.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Recompensas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm text-muted-foreground", children: drop.status === "archived" ? "Lo que se podía ganar en este drop." : "Completá misiones para desbloquearlas." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: GENERIC_REWARDS.map((r) => {
        const got = done >= r.need;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 rounded-2xl border p-3 ${got ? "border-primary/50 bg-primary/10" : "border-border bg-card"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-10 w-10 place-items-center rounded-xl ${got ? "text-primary-foreground" : "bg-muted text-muted-foreground"}`, style: got ? { backgroundImage: "var(--gradient-drop)" } : void 0, children: got ? /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: r.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: got ? "Desbloqueada" : `Completá ${r.need} ${r.need === 1 ? "misión" : "misiones"} (${Math.min(done, r.need)}/${r.need})` })
          ] })
        ] }, r.label);
      }) })
    ] }),
    drop.status !== "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onGo("ranking"), className: "rounded-2xl border border-border bg-card p-4 text-left", children: [
        drop.status === "archived" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "h-5 w-5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-bold", children: drop.status === "archived" ? "Ranking final" : "Ranking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Los fans que más sumaron" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onGo("comunidad"), className: "rounded-2xl border border-border bg-card p-4 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "💬" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-bold", children: drop.fandom }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "La comunidad del drop" })
      ] })
    ] })
  ] });
}
const guestQuestions = [
  { question: "¿Cuál de estos álbumes es de LALI?", options: ["BRAVA", "Quimera", "Por cesárea"], answer: 0 },
  { question: "¿Quién lanzó Quimera?", options: ["Dillom", "María Becerra", "LALI"], answer: 1 },
  { question: "¿Quién lanzó Por cesárea?", options: ["TINI", "LALI", "Dillom"], answer: 2 }
];
function guestPracticeResult(answers) {
  return { correct: guestQuestions.filter((q, i) => answers[i] === q.answer).length, total: guestQuestions.length, generalAward: 0, campaignAward: 0 };
}
const url$1 = "/assets/drop-logo-2026-Bp3vcWT7.webp";
const logo = { url: url$1 };
function MissionGame({ kind, missionId, verified, onFinish }) {
  const { mode, refresh } = useDropAuth();
  const drop = useCurrentDrop();
  if (missionId.endsWith("-presave") && drop.status !== "active") return /* @__PURE__ */ jsxRuntimeExports.jsx(PresaveMission, { onDone: () => toast.success(drop.status === "upcoming" ? "¡Pre-guardado! Tus puntos se suman cuando abra el drop." : "¡Guardado en tu Spotify!") });
  if (verified && mode === "user") return /* @__PURE__ */ jsxRuntimeExports.jsx(VerifiedGame, { missionId, kind, onFinish: async (result) => {
    await refresh();
    onFinish(result.general_award);
  } });
  if (kind === "trivia" && mode === "guest") return /* @__PURE__ */ jsxRuntimeExports.jsx(GuestTrivia, {});
  if (kind === "order") return /* @__PURE__ */ jsxRuntimeExports.jsx(OrderDemo, {});
  if (kind === "stream" || kind === "scan" || kind === "ar") return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SimulatedExperience, { kind, missionId, onDone: () => toast.success(mode === "user" ? "¡Completado!" : "¡Completado! En modo invitado los puntos no se guardan.") }),
    mode !== "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Modo invitado: creá una cuenta para sumar estos puntos al ranking." })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: laliCover.url, alt: "Arte de la experiencia", className: "mx-auto h-24 w-24 rounded-2xl object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "mx-auto h-10 w-10 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: mode !== "user" ? "Ingresá con tu cuenta para jugar esta misión" : "Esta misión se habilita pronto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: mode !== "user" ? "Los acertijos guardan tu progreso, por eso necesitan una cuenta." : "Te avisamos cuando esté disponible." })
  ] });
}
function GuestTrivia() {
  const [answers, setAnswers] = reactExports.useState([]);
  const question = guestQuestions[answers.length];
  const result = guestPracticeResult(answers);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Trivia de práctica · sin puntos ni ranking" }),
    question ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Pregunta ",
        answers.length + 1,
        " / ",
        guestQuestions.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: question.question }),
      question.options.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "h-auto w-full justify-start whitespace-normal py-3 text-left", onClick: () => setAnswers((previous) => [...previous, index]), children: option }, option))
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { role: "status", className: "font-bold", children: [
        "Resultado: ",
        result.correct,
        " / ",
        result.total,
        " respuestas correctas"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", onClick: () => setAnswers([]), children: "Volver a jugar" })
    ] })
  ] });
}
function VerifiedGame({ missionId, kind, onFinish }) {
  const action = useServerFn(missionAction);
  const [attempt, setAttempt] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [seconds, setSeconds] = reactExports.useState(20);
  const [code, setCode] = reactExports.useState("");
  const [sequence, setSequence] = reactExports.useState([2, 4, 1, 3]);
  async function send(type, payload) {
    setBusy(true);
    setError("");
    try {
      const result = await action({ data: { action: type, payload } });
      setAttempt(result);
      if (result.status === "completed") await onFinish(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos validar la respuesta.");
    } finally {
      setBusy(false);
    }
  }
  reactExports.useEffect(() => {
    void send("start", { mission_id: missionId });
  }, [missionId]);
  reactExports.useEffect(() => {
    if (!attempt || attempt.status === "completed") return;
    const update = () => setSeconds(Math.max(0, Math.ceil((new Date(attempt.deadline).getTime() - Date.now()) / 1e3)));
    update();
    const timer = setInterval(update, 1e3);
    return () => clearInterval(timer);
  }, [attempt]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "alert", className: "text-sm text-destructive", children: [
      error,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => send("start", { mission_id: missionId }), children: "Retomar intento" })
    ] }),
    !attempt && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cargando intento…" }),
    attempt?.question && kind === "trivia" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-bold text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Pregunta ",
          attempt.index + 1,
          " / ",
          attempt.total
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          seconds,
          "s"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: attempt.question.q }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: attempt.question.options.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", disabled: busy, className: "h-auto w-full justify-start whitespace-normal py-3 text-left", onClick: () => send("answer", { attempt_id: attempt.id, index: attempt.index, answer: seconds === 0 ? -1 : index }), children: option }, option)) }),
      seconds === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tiempo agotado; la respuesta de esta pregunta no suma." })
    ] }),
    attempt?.status === "playing" && kind === "clue" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm", children: [
        "Código de la pista",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "mt-2 w-full rounded-lg border border-input bg-background p-3", value: code, onChange: (e) => setCode(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: busy || !code.trim(), onClick: () => send("check", { attempt_id: attempt.id, code }), children: "Verificar pista" })
    ] }),
    attempt?.status === "playing" && (kind === "stream" || kind === "scan" || kind === "ar") && /* @__PURE__ */ jsxRuntimeExports.jsx(SimulatedExperience, { kind, missionId, busy, onDone: () => send("check", { attempt_id: attempt.id }) }),
    attempt?.status === "playing" && kind === "order" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      sequence.map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rounded-xl border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Fragmento ",
          id
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", "aria-label": "Subir fragmento", disabled: busy || i === 0, onClick: () => setSequence((s) => {
          const n = [...s];
          [n[i], n[i - 1]] = [n[i - 1], n[i]];
          return n;
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, {}) })
      ] }, id)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: busy, onClick: () => send("check", { attempt_id: attempt.id, sequence }), children: "Confirmar orden" })
    ] }),
    busy && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Validando…" })
  ] });
}
function OrderDemo() {
  const [order, setOrder] = reactExports.useState([2, 4, 1, 3]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Ordená los fragmentos · práctica" }),
    order.map((id, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1", children: [
        "Fragmento ",
        id
      ] }),
      [-1, 1].map((dir) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", "aria-label": dir === -1 ? "Subir" : "Bajar", disabled: index + dir < 0 || index + dir >= order.length, onClick: () => setOrder((s) => {
        const n = [...s];
        [n[index], n[index + dir]] = [n[index + dir], n[index]];
        return n;
      }), children: dir === -1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, {}) }, dir))
    ] }, id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", onClick: () => toast.message(order.every((id, i) => id === i + 1) ? "Orden correcto · práctica sin puntos" : "Probá otra secuencia"), children: "Confirmar orden" })
  ] });
}
function SimulatedExperience({ kind, missionId, busy, onDone }) {
  if (missionId?.endsWith("-presave")) return /* @__PURE__ */ jsxRuntimeExports.jsx(PresaveMission, { busy, onDone });
  if (kind === "stream") return /* @__PURE__ */ jsxRuntimeExports.jsx(StreamSim, { busy, onDone });
  if (kind === "scan") return /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSim, { busy, onDone });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ArSim, { busy, onDone });
}
function DemoStream({ busy, onDone }) {
  const PLAYS = 3;
  const SECONDS = 6;
  const [plays, setPlays] = reactExports.useState(0);
  const [progress, setProgress] = reactExports.useState(0);
  const [playing, setPlaying] = reactExports.useState(false);
  const search = useServerFn(searchCatalog);
  const audio = reactExports.useRef(null);
  reactExports.useEffect(() => {
    search({ data: { q: "LALI Fanático" } }).then((r) => {
      const t = r.tracks.find((x) => /fan[aá]tico/i.test(x.title)) ?? r.tracks[0];
      if (t?.preview) audio.current = new Audio(t.preview);
    }).catch(() => {
    });
    return () => {
      audio.current?.pause();
    };
  }, []);
  reactExports.useEffect(() => {
    const el = audio.current;
    if (el) {
      if (playing) {
        el.currentTime = 0;
        void el.play().catch(() => {
        });
      } else el.pause();
    }
  }, [playing]);
  reactExports.useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setProgress((p) => {
      const next = p + 100 / (SECONDS * 10);
      if (next >= 100) {
        setPlaying(false);
        setPlays((n) => n + 1);
        return 0;
      }
      return next;
    }), 100);
    return () => clearInterval(timer);
  }, [playing]);
  const done = plays >= PLAYS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: fanaticoSingle.url, alt: "Portada de Fanático", className: `mx-auto h-40 w-40 rounded-2xl object-cover shadow-lg transition-transform ${playing ? "scale-105" : ""}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black", children: "Fanático" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "LALI · No vayas a atender cuando el demonio llama" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary transition-[width] duration-100", style: { width: `${done ? 100 : progress}%` } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2", children: Array.from({ length: PLAYS }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-8 w-8 place-items-center rounded-full border text-xs font-bold ${i < plays ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`, children: i < plays ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : i + 1 }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: done ? "¡Listo! Escuchaste Fanático 3 veces." : `Reproducción ${Math.min(plays + 1, PLAYS)} de ${PLAYS}` }),
    done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", disabled: busy, onClick: onDone, children: "Sumar mis puntos" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", onClick: () => setPlaying((p) => !p), children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, {}),
      " Pausar"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, {}),
      " Reproducir"
    ] }) })
  ] });
}
function StreamSim({ busy, onDone }) {
  const [connected, setConnected] = reactExports.useState(false);
  const [demo, setDemo] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const sync = () => setConnected(isSpotifyConnected());
    sync();
    window.addEventListener("drop-spotify", sync);
    return () => window.removeEventListener("drop-spotify", sync);
  }, []);
  if (demo) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DemoStream, { busy, onDone }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDemo(false), className: "w-full text-center text-xs font-bold text-muted-foreground", children: "Volver a Spotify" })
  ] });
  if (connected) return /* @__PURE__ */ jsxRuntimeExports.jsx(SpotifyStream, { busy, onDone });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: fanaticoSingle.url, alt: "Portada de Fanático", className: "mx-auto h-40 w-40 rounded-2xl object-cover shadow-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black", children: 'Escuchá "Fanático" 3 veces' }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Conectá tu Spotify y contamos tus reproducciones de verdad." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-[#1DB954] text-black hover:bg-[#1ed760]", onClick: () => void connectSpotify(window.location.pathname + window.location.search), children: "Conectar Spotify" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDemo(true), className: "text-xs font-bold text-muted-foreground underline-offset-2 hover:underline", children: "Probar en modo demo" })
  ] });
}
function SpotifyStream({ busy, onDone }) {
  const PLAYS = 3;
  const [plays, setPlays] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const check = async () => {
    setLoading(true);
    setError(null);
    try {
      const since = Date.now() - 24 * 3600 * 1e3;
      const list = await recentPlays();
      setPlays(list.filter((p) => /fan[aá]tico/i.test(p.name) && p.artists.some((a) => /lali/i.test(a)) && new Date(p.playedAt).getTime() >= since).length);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos leer tu Spotify.");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    void check();
    const onFocus = () => void check();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);
  const count = Math.min(plays ?? 0, PLAYS);
  const done = count >= PLAYS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: fanaticoSingle.url, alt: "Portada de Fanático", className: "mx-auto h-40 w-40 rounded-2xl object-cover shadow-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black", children: "Fanático" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Contamos tus reproducciones en Spotify de las últimas 24 horas" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2", children: Array.from({ length: PLAYS }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-8 w-8 place-items-center rounded-full border text-xs font-bold ${i < count ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`, children: i < count ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : i + 1 }, i)) }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: plays === null ? "Revisando tu Spotify…" : done ? "¡Listo! Spotify confirma tus 3 reproducciones." : `Llevás ${count} de ${PLAYS}. Escuchala completa y volvé.` }),
    done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", disabled: busy, onClick: onDone, children: "Sumar mis puntos" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "bg-[#1DB954] text-black hover:bg-[#1ed760]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://open.spotify.com/search/LALI%20Fan%C3%A1tico", target: "_blank", rel: "noreferrer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, {}),
        " Abrir Spotify"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", disabled: loading, onClick: () => void check(), children: loading ? "Revisando…" : "Actualizar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => disconnectSpotify(), className: "text-[11px] text-muted-foreground underline-offset-2 hover:underline", children: "Desconectar Spotify" })
  ] });
}
function PresaveMission({ busy, onDone }) {
  const drop = useCurrentDrop();
  const albumName = drop.spotifyAlbum ?? drop.title;
  const presaveKey = `drop-presave-${drop.id}`;
  const [connected, setConnected] = reactExports.useState(false);
  const [scoped, setScoped] = reactExports.useState(false);
  const [album, setAlbum] = reactExports.useState(void 0);
  const [saved, setSaved] = reactExports.useState(false);
  const [working, setWorking] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const sync = () => {
      setConnected(isSpotifyConnected());
      setScoped(canSaveToLibrary());
    };
    sync();
    window.addEventListener("drop-spotify", sync);
    return () => window.removeEventListener("drop-spotify", sync);
  }, []);
  reactExports.useEffect(() => {
    if (!connected || !scoped) return;
    let cancelled = false;
    (async () => {
      try {
        const found = await findAlbum(drop.artist, albumName);
        if (cancelled) return;
        setAlbum(found);
        if (found) setSaved(await isAlbumSaved(found.id));
        else {
          try {
            setSaved(localStorage.getItem(presaveKey) === "1");
          } catch {
          }
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "No pudimos conectar con Spotify.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [connected, scoped, drop.id]);
  const save = async () => {
    setWorking(true);
    setError(null);
    try {
      if (album) {
        await saveAlbum(album.id);
        if (!await isAlbumSaved(album.id)) throw new Error("Spotify no confirmó el guardado. Probá de nuevo.");
      } else {
        try {
          localStorage.setItem(presaveKey, "1");
        } catch {
        }
      }
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos guardar el álbum.");
    } finally {
      setWorking(false);
    }
  };
  const reconnect = () => void connectSpotify(window.location.pathname + window.location.search);
  const cover = album?.cover || drop.album;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: cover, alt: `Portada de ${albumName}`, className: "mx-auto h-40 w-40 rounded-2xl object-cover shadow-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black", children: albumName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: drop.artist })
    ] }),
    !connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Conectá tu Spotify y ",
        drop.status === "upcoming" ? "pre-guardá el álbum para tenerlo apenas salga" : "guardá el álbum en tu biblioteca",
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-[#1DB954] text-black hover:bg-[#1ed760]", onClick: reconnect, children: "Conectar Spotify" })
    ] }) : !scoped ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Para guardar el álbum, DROP necesita un permiso nuevo en tu Spotify." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-[#1DB954] text-black hover:bg-[#1ed760]", onClick: reconnect, children: "Dar permiso en Spotify" })
    ] }) : album === void 0 && !error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Buscando el álbum en Spotify…" }) : saved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center justify-center gap-1 text-sm font-bold text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
        album ? "Ya está en tu biblioteca de Spotify" : "Pre-guardado: lo vas a tener apenas salga"
      ] }),
      album?.url && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: album.url, target: "_blank", rel: "noreferrer", className: "block text-xs font-bold text-muted-foreground underline-offset-2 hover:underline", children: "Abrir en Spotify" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", disabled: busy, onClick: onDone, children: "Sumar mis puntos" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-[#1DB954] text-black hover:bg-[#1ed760]", disabled: working, onClick: () => void save(), children: working ? "Guardando…" : album ? "Guardar en mi Spotify" : "Pre-guardar en Spotify" })
    ] })
  ] });
}
function ScanSim({ busy, onDone }) {
  const spots = ["Plaza Serrano", "Honduras y Thames", "Gurruchaga y El Salvador"];
  const [found, setFound] = reactExports.useState(0);
  const [scanning, setScanning] = reactExports.useState(false);
  function scan() {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setFound((n) => n + 1);
      toast.success(`QR detectado en ${spots[found]}`);
    }, 1800);
  }
  const done = found >= spots.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl bg-black", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: found % 2 ? stencilWall.url : PHOTOS.estadio, alt: "Vista de la cámara", className: "h-full w-full object-cover opacity-80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-8 rounded-xl border-2 border-white/80" }),
      scanning && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-8 top-8 h-0.5 animate-[scan_1.8s_ease-in-out_infinite] bg-primary shadow-[0_0_12px_var(--primary)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute inset-x-0 bottom-2 text-center text-xs font-bold text-white", children: done ? "¡Encontraste los 3 afiches!" : scanning ? "Buscando código…" : "Apuntá al QR del afiche" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: spots.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-6 w-6 place-items-center rounded-full border text-[11px] ${i < found ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`, children: i < found ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : i + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: i < found ? "font-bold" : "text-muted-foreground", children: s })
    ] }, s)) }),
    done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", disabled: busy, onClick: onDone, children: "Sumar mis puntos" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", disabled: scanning, onClick: scan, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, {}),
      " ",
      scanning ? "Escaneando…" : `Escanear afiche ${found + 1}`
    ] })
  ] });
}
function ArSim({ busy, onDone }) {
  const [stage, setStage] = reactExports.useState("idle");
  reactExports.useEffect(() => {
    if (stage === "camera") {
      const t = setTimeout(() => setStage("hologram"), 2200);
      return () => clearTimeout(t);
    }
  }, [stage]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl bg-black", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: PHOTOS.rain, alt: "Vista de la cámara", className: `h-full w-full object-cover transition-opacity ${stage === "idle" ? "opacity-40" : "opacity-90"}` }),
      (stage === "hologram" || stage === "captured") && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logo.url, alt: "Holograma del drop", className: "absolute left-1/2 top-[18%] w-2/3 -translate-x-1/2 animate-pulse" }),
      stage === "captured" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-[flash_0.5s_ease-out] bg-white/0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute inset-x-0 bottom-2 text-center text-xs font-bold text-white", children: stage === "idle" ? "Obelisco · 20:30 hs" : stage === "camera" ? "Apuntá al cielo…" : stage === "hologram" ? "¡Apareció el holograma!" : "Captura guardada en tu Pasaporte" })
    ] }),
    stage === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", onClick: () => setStage("camera"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, {}),
      " Abrir cámara"
    ] }),
    stage === "camera" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", disabled: true, children: "Buscando el holograma…" }),
    stage === "hologram" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", onClick: () => setStage("captured"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, {}),
      " Capturar"
    ] }),
    stage === "captured" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", disabled: busy, onClick: onDone, children: "Sumar mis puntos" })
  ] });
}
const dailyTemplates = [
  {
    icon: Headphones,
    tag: "Streaming",
    title: "Escuchá 'Fanático' 3 veces",
    desc: "Escuchalo completo 3 veces y sumá puntos todos los días",
    pts: 120,
    progress: 66,
    cover: fanaticoSingle.url,
    cta: "Abrir Spotify",
    game: "stream",
    detail: {
      intro: "Cada reproducción completa del single cuenta. La app valida los plays a través de tu cuenta conectada, así que no hace falta que subas nada.",
      steps: [
        "Conectá tu cuenta de Spotify desde la misión",
        "Reproducí 'Fanático' completo (mínimo 30 segundos)",
        "Volvé a la app: el contador se actualiza solo"
      ],
      duration: "Se reinicia cada 24 hs",
      players: "18.420 fans jugando hoy",
      reward: "120 pts + fragmento de audio del Director's Cut",
      tip: "Escuchar en horario del drop (20:30) duplica los puntos."
    }
  },
  {
    icon: Puzzle,
    tag: "Trivia",
    title: "¿En qué año debutó LALI?",
    desc: "5 preguntas del LALIVERSE. Solo para verdaderos fans.",
    pts: 150,
    cover: PHOTOS.news,
    cta: "Jugar ahora",
    game: "trivia",
    detail: {
      intro: "Cinco preguntas de opción múltiple sobre la carrera, las letras y los easter eggs del nuevo álbum. Tenés 20 segundos por pregunta.",
      steps: [
        "Respondé las 5 preguntas contra reloj",
        "Cada acierto suma 30 pts; los errores no restan",
        "Con 5/5 desbloqueás una pregunta bonus secreta"
      ],
      duration: "≈ 2 minutos · 1 intento por día",
      players: "9.877 fans ya la jugaron",
      reward: "Hasta 150 pts + sticker 'Fan Nivel Experto'",
      tip: "Repasá el feed de Comunidad: ahí se filtran pistas."
    }
  },
  {
    icon: Music,
    tag: "Rompecabezas",
    title: "Ordená el fragmento",
    desc: "4 fragmentos de un track inédito. ¿Podés armarlo?",
    pts: 200,
    cover: laliCover.url,
    cta: "Empezar",
    game: "order",
    detail: {
      intro: "Cuatro fragmentos desordenados de un track inédito. Si los ordenás bien, escuchás el preview completo antes que nadie.",
      steps: [
        "Escuchá los 4 clips las veces que quieras",
        "Arrastralos hasta armar la secuencia correcta",
        "Confirmá: tenés 3 intentos antes de perder puntos"
      ],
      duration: "Sin límite de tiempo · 3 intentos",
      players: "4.102 fans lo resolvieron",
      reward: "200 pts + preview exclusivo de 45 segundos",
      tip: "Usá auriculares: el orden se nota en cómo cierra cada beat."
    }
  }
];
const phygitalTemplates = [
  {
    icon: MapPin,
    tag: "QR en la calle",
    title: "Caza en Palermo",
    desc: "3 afiches escondidos entre Plaza Serrano y Thames",
    pts: 500,
    cover: PHOTOS.estadio,
    cta: "Escanear QR",
    game: "scan",
    detail: {
      intro: "Tres afiches con QR pegados en la calle. El mapa te muestra un radio aproximado, no la ubicación exacta: hay que caminar y mirar.",
      steps: [
        "Activá la ubicación para ver los radios en el Mapa",
        "Encontrá el afiche y escaneá su QR desde la app",
        "Sacale una foto y compartila en Comunidad (+50 pts extra)"
      ],
      duration: "Disponible 72 hs o hasta agotar cupos",
      players: "Quedan 240 de 900 escaneos",
      reward: "500 pts + entrada al sorteo de 20 lugares VIP",
      tip: "Los primeros 50 en escanear suman un multiplicador x2."
    }
  },
  {
    icon: Camera,
    tag: "Realidad aumentada",
    title: "Holograma en el cielo",
    desc: "Apuntá tu cámara al Obelisco a las 20:30 hs",
    pts: 350,
    cover: PHOTOS.rain,
    cta: "Abrir cámara",
    game: "ar",
    detail: {
      intro: "Una activación de realidad aumentada geolocalizada: a la hora exacta aparece el holograma con el arte del álbum sobre el Obelisco.",
      steps: [
        "Llegá a la zona del Obelisco antes de las 20:30",
        "Abrí la cámara desde la app y apuntá al cielo",
        "Grabá el clip y publicalo con el hashtag del drop"
      ],
      duration: "Ventana única: 20:30 a 21:00 hs",
      players: "Evento en vivo · 1 sola vez",
      reward: "350 pts + filtro AR permanente en tu Pasaporte",
      tip: "Si no estás en CABA, hay una versión remota a las 21:15."
    }
  }
];
function MisionesView() {
  const [selected, setSelected] = reactExports.useState(null);
  const { state, mode } = useDropAuth();
  const drop = useCurrentDrop();
  const isLali = drop.id === "lali";
  const archived = drop.status === "archived";
  const ids = ["lali-stream", "lali-trivia", "lali-order", "lali-qr", "lali-ar"];
  const templates = [...dailyTemplates, ...phygitalTemplates];
  const missions2 = templates.map((m, i) => {
    const configured = state.missions.find((x) => x.id === ids[i]);
    const verified = configured ? configured.status === "verified" : mode === "guest";
    const guestPractice = mode === "guest" && m.game === "trivia";
    return { ...m, id: ids[i], title: configured?.title ?? m.title, verified, campaignPts: configured?.campaign_reward ?? 0, pts: verified ? configured?.general_reward ?? m.pts : 0, progress: void 0, cta: guestPractice ? "Jugar de práctica" : verified ? "Jugar ahora" : "Ver experiencia", detail: verified && m.game !== "trivia" ? { ...m.detail, reward: configured ? `${configured.campaign_reward} pts de ${drop.artist} + ${configured.general_reward} puntos generales DROP` : m.detail.reward } : { ...m.detail, intro: guestPractice ? "Trivia de práctica para invitados. Sin puntos ni participación en el ranking." : verified ? "Respondé preguntas propias de DROP. Cada respuesta se valida y el intento queda guardado en tu cuenta." : "Experiencia demostrativa o pendiente. No verifica actividades ni acredita puntos.", steps: guestPractice ? ["Respondé las preguntas de práctica", "Tu resultado es temporal y no acredita puntos"] : verified ? ["Respondé las preguntas", "Un intento por día; 20 segundos por pregunta", "Tu resultado se guarda al finalizar"] : ["Explorá la experiencia sin acreditación de puntos"], duration: guestPractice ? "Práctica libre" : verified ? "1 intento por día · horario de Buenos Aires" : "Pendiente de validación", players: verified ? "Participación registrada en tu cuenta" : "Demostración", reward: verified ? `Hasta ${configured?.campaign_reward} pts de ${drop.artist} + ${configured?.general_reward} puntos generales DROP` : "Sin recompensas acreditables", tip: verified ? "El canje de puntos generales no modifica tu ranking." : "La validación real todavía no está disponible." } };
  });
  const extra = state.missions.filter((m) => !ids.includes(m.id) && m.campaign_id === drop.id).map((m) => ({ ...dailyTemplates[1], cover: m.id.endsWith("-presave") ? drop.album : isLali ? dailyTemplates[1].cover : drop.cover, tag: m.id.endsWith("-presave") ? "Spotify · La que más suma" : m.kind === "clue" ? "Acertijo" : m.kind === "trivia" ? "Trivia" : dailyTemplates[1].tag, desc: m.id.endsWith("-presave") ? drop.status === "upcoming" ? "Pre-guardalo y tenelo apenas salga" : "Guardalo en tu biblioteca de Spotify" : m.repeat_period === "daily" ? "Nueva ronda todos los días" : "Una sola vez por fan", id: m.id, title: m.title, game: m.kind, verified: m.status === "verified", pts: m.general_reward, campaignPts: m.campaign_reward, progress: void 0, cta: m.status === "verified" ? "Jugar ahora" : "Ver experiencia", detail: { ...dailyTemplates[1].detail, intro: "Actividad propia de DROP.", reward: `${m.campaign_reward} pts de ${drop.artist} + ${m.general_reward} puntos generales DROP`, players: "Participación real", tip: "El resultado se valida en tu cuenta." } }));
  extra.sort((a, b) => Number(b.id.endsWith("-presave")) - Number(a.id.endsWith("-presave")));
  const daily = isLali ? [...extra.filter((m) => m.id.endsWith("-presave")), ...missions2.slice(0, 3), ...extra.filter((m) => !m.id.endsWith("-presave"))] : extra;
  const phygital = isLali ? missions2.slice(3) : [];
  const earned = {};
  for (const m of [...daily, ...phygital]) {
    const a = state.attempts.find((a2) => a2.mission_id === m.id && a2.status === "completed" && (state.missions.find((x) => x.id === m.id)?.repeat_period !== "daily" || a2.period_key === new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires" }).format(/* @__PURE__ */ new Date())));
    if (a) earned[m.title] = a.general_award;
  }
  const streak = computeStreak(state.attempts.filter((a) => a.status === "completed").map((a) => a.period_key));
  const total = state.movements.filter((m) => m.evidence_type === "drop_verified" && m.campaign_id === drop.id).reduce((sum, m) => sum + (m.campaign_delta ?? 0), 0);
  const all = [...daily, ...phygital];
  const playing = new Set(state.attempts.filter((a) => a.status !== "completed").map((a) => a.mission_id));
  const statusOf = (m) => archived ? "finalizada" : m.title in earned ? "completada" : m.id && playing.has(m.id) ? "en_progreso" : "disponible";
  const featured = !archived && drop.status !== "upcoming" ? all.find((m) => statusOf(m) !== "completada" && m.game !== "scan" && m.game !== "ar") : void 0;
  const rest = all.filter((m) => m !== featured);
  const games = rest.filter((m) => m.game === "trivia" || m.game === "order" || m.game === "clue");
  const music = rest.filter((m) => m.game === "stream");
  const world = rest.filter((m) => m.game === "scan" || m.game === "ar");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black", children: "Misiones" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: archived ? `Las misiones que formaron parte de ${drop.title}.` : `Jugá, sumá puntos de ${drop.artist} y escalá el ranking.` })
    ] }),
    archived && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-border bg-card p-3 text-xs text-muted-foreground", children: "📼 Este drop finalizó. Podés ver sus misiones y tus resultados, pero ya no suman puntos." }),
    drop.status === "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-border bg-card p-3 text-xs text-muted-foreground", children: "⏳ Este drop todavía no empezó. Las misiones se habilitan cuando abra." }),
    mode !== "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Modo invitado · jugá de práctica; creá una cuenta para sumar al ranking." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "rounded-3xl p-4 text-primary-foreground",
        style: { backgroundImage: "var(--gradient-drop)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold uppercase tracking-widest opacity-80", children: [
                "Puntos de ",
                drop.artist
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-black", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { to: total }),
                " pts"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest opacity-80", children: "Racha" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-black", children: [
                "🔥 ",
                streak.count,
                " ",
                streak.count === 1 ? "día" : "días"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-1.5", children: streak.week.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-full rounded-full ${d.done ? "bg-background" : "bg-background/25"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold opacity-80", children: d.label })
          ] }, d.key)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs opacity-90", children: mode !== "user" ? "Con tu cuenta, cada día que completás una misión suma a tu racha." : streak.today ? "¡Racha al día! Volvé mañana para que no se corte." : streak.count > 0 ? "Completá una misión hoy para mantener la racha." : "Completá una misión hoy para empezar tu racha." })
        ]
      }
    ),
    all.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground", children: "Las misiones de este drop se anuncian pronto." }),
    featured && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { icon: Sparkles, title: "Misión destacada", hint: "Empezá por acá" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(featured), className: "relative block w-full overflow-hidden rounded-3xl border border-primary/50 text-left shadow-[var(--shadow-glow)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: featured.cover ?? drop.cover, alt: "", className: "h-56 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-4 bottom-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChip, { status: statusOf(featured) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] font-black uppercase tracking-widest text-primary", children: featured.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black leading-tight", children: featured.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-xs text-muted-foreground", children: featured.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-primary", children: [
              "+",
              featured.campaignPts || featured.pts,
              " pts"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-xl px-4 py-2 text-sm font-black text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: statusOf(featured) === "en_progreso" ? "Continuar" : featured.cta })
          ] })
        ] })
      ] })
    ] }),
    games.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { icon: Puzzle, title: "Juegos", hint: "Trivias, acertijos y rompecabezas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: games.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(m), className: "overflow-hidden rounded-2xl border border-border bg-card text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-24", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: m.cover ?? drop.cover, alt: "", className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChip, { status: statusOf(m), small: true }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wider text-primary", children: m.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-sm font-bold leading-snug", children: m.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs font-black text-primary", children: [
            "+",
            m.campaignPts || m.pts,
            " pts"
          ] })
        ] })
      ] }, m.title)) })
    ] }),
    music.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { icon: Headphones, title: "Desafíos musicales", hint: "Escuchá y sumá" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: music.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MissionCard, { m, status: statusOf(m), onOpen: () => setSelected(m) }, m.title)) })
    ] }),
    world.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { icon: MapPin, title: "En el mundo real", hint: "Experiencias presenciales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 flex gap-3 overflow-x-auto px-5 pb-2", children: world.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(m), className: "relative h-64 w-56 shrink-0 overflow-hidden rounded-3xl border border-border text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: m.cover ?? drop.cover, alt: "", className: "absolute inset-0 h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChip, { status: statusOf(m), small: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-3 bottom-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            m.tag
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black leading-tight", children: m.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-xs text-muted-foreground", children: m.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm font-black text-primary", children: [
            "+",
            m.campaignPts || m.pts,
            " pts"
          ] })
        ] })
      ] }, m.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MissionDetail,
      {
        mission: selected,
        onClose: () => setSelected(null),
        earned: selected ? earned[selected.title] : void 0,
        locked: archived ? "Este drop finalizó: la misión ya no suma puntos." : drop.status === "upcoming" ? "Se habilita cuando abra el drop." : void 0,
        onEarn: () => {
        }
      }
    )
  ] });
}
const STATUS_TEXT = { disponible: "Disponible", en_progreso: "En progreso", completada: "✓ Completada", finalizada: "Finalizada" };
function StatusChip({ status, small = false }) {
  const cls = status === "completada" ? "bg-emerald-500/90 text-white" : status === "en_progreso" ? "bg-amber-400 text-black" : status === "finalizada" ? "bg-muted text-muted-foreground" : "bg-background/85 text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block rounded-full font-black uppercase tracking-wide ${small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"} ${cls}`, children: STATUS_TEXT[status] });
}
function SectionTitle({ icon: Icon, title, hint }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end justify-between gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-xl font-black", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }),
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: hint })
  ] });
}
function MissionCard({
  m,
  status,
  onOpen
}) {
  const done = status === "completada";
  const Icon = m.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      m.cover ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          decoding: "async",
          src: m.cover,
          alt: m.title,
          loading: "lazy",
          className: "h-11 w-11 shrink-0 rounded-xl border border-border object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary-foreground",
          style: { backgroundImage: "var(--gradient-drop)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-primary", children: m.verified ? m.tag : "Próximamente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChip, { status, small: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-bold", children: m.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: m.desc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-black text-primary", children: [
          "+",
          m.campaignPts || m.pts
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase text-muted-foreground", children: "pts" })
      ] })
    ] }),
    typeof m.progress === "number" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full",
        style: { width: `${m.progress}%`, backgroundImage: "var(--gradient-drop)" }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onOpen,
        className: `mt-3 w-full rounded-xl border py-2 text-xs font-bold transition-colors ${done ? "border-primary/40 bg-primary/10 text-primary" : "border-primary/40 text-primary hover:bg-primary/10 active:bg-primary/20"}`,
        children: done ? "Ver resultado" : status === "en_progreso" ? "Continuar" : status === "finalizada" ? "Ver misión" : m.cta
      }
    )
  ] });
}
function MissionDetail({
  mission,
  onClose,
  earned,
  onEarn,
  locked
}) {
  const Icon = mission?.icon ?? Sparkles;
  const [mode, setMode] = reactExports.useState("detail");
  const [result, setResult] = reactExports.useState(0);
  const close = () => {
    onClose();
    setTimeout(() => {
      setMode("detail");
      setResult(0);
    }, 250);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open: !!mission, onOpenChange: (o) => !o && close(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContent, { className: "max-h-[92vh]", children: mission && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        mission.cover ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            loading: "lazy",
            decoding: "async",
            src: mission.cover,
            alt: mission.title,
            className: "h-12 w-12 shrink-0 rounded-2xl border border-border object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-primary-foreground",
            style: { backgroundImage: "var(--gradient-drop)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wider text-primary", children: mission.verified ? mission.tag : "Próximamente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "text-lg font-black leading-tight", children: mission.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-black text-primary", children: [
            "+",
            mission.campaignPts || mission.pts
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase text-muted-foreground", children: "pts" })
        ] })
      ] }),
      mode === "detail" && /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { className: "mt-3 text-sm text-muted-foreground", children: mission.detail.intro })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 overflow-y-auto px-4 pb-8", children: [
      mode === "play" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        MissionGame,
        {
          kind: mission.game,
          missionId: mission.id ?? "",
          verified: mission.verified ?? false,
          onFinish: (pts) => {
            setResult(pts);
            onEarn(mission, pts);
            setMode("result");
          }
        },
        mission.title
      ),
      mode === "result" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mx-auto grid h-20 w-20 place-items-center rounded-full text-primary-foreground",
            style: { backgroundImage: "var(--gradient-drop)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-9 w-9" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black animate-[pop_0.5s_ease-out]", children: result > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "+",
          /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { to: result }),
          " pts"
        ] }) : "Sin puntos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: result >= mission.pts ? "Resultado validado y guardado en tu cuenta." : result > 0 ? "Resultado validado y guardado en tu cuenta." : "Se te acabaron los intentos. Probá de nuevo mañana." }),
        result > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-primary/30 bg-primary/5 p-3 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-primary", children: "Recompensa" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm", children: mission.detail.reward })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: close,
            className: "w-full rounded-xl py-3 text-sm font-black text-primary-foreground",
            style: { backgroundImage: "var(--gradient-drop)" },
            children: "Volver a misiones"
          }
        )
      ] }),
      mode === "detail" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        typeof mission.progress === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tu progreso" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
              mission.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full",
              style: {
                width: `${mission.progress}%`,
                backgroundImage: "var(--gradient-drop)"
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { icon: Clock, label: "Tiempo", value: mission.detail.duration }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTile, { icon: Users, label: "Participación", value: mission.detail.players })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Cómo se juega" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: mission.detail.steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-black text-primary-foreground",
                style: { backgroundImage: "var(--gradient-drop)" },
                children: i + 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: s })
          ] }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-primary/30 bg-primary/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-primary", children: "Recompensa" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm", children: mission.detail.reward })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs italic text-muted-foreground", children: [
          "💡 ",
          mission.detail.tip
        ] }),
        typeof earned === "number" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/40 bg-primary/10 py-3 text-center text-sm font-bold text-primary", children: [
          "Completaste esta misión · +",
          earned,
          " pts"
        ] }) : locked ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card py-3 text-center text-sm font-semibold text-muted-foreground", children: locked }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setMode("play"),
            className: "w-full rounded-xl py-3 text-sm font-black text-primary-foreground",
            style: { backgroundImage: "var(--gradient-drop)" },
            children: mission.cta
          }
        )
      ] })
    ] })
  ] }) }) });
}
function InfoTile({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wider", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-semibold leading-snug", children: value })
  ] });
}
const BA_DAY = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires" });
const DAY_LABELS = ["D", "L", "M", "M", "J", "V", "S"];
function computeStreak(keys) {
  const days = new Set(keys.filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k)));
  const keyAt = (offset) => BA_DAY.format(new Date(Date.now() - offset * 864e5));
  const today = days.has(keyAt(0));
  let count = 0;
  for (let i = today ? 0 : 1; days.has(keyAt(i)); i++) count++;
  const week = Array.from({ length: 7 }, (_, i) => {
    const key = keyAt(6 - i);
    return { key, done: days.has(key), label: DAY_LABELS[(/* @__PURE__ */ new Date(`${key}T12:00:00`)).getDay()] };
  });
  return { count, today, week };
}
function CountUp({ to }) {
  const [value, setValue] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 900);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: value });
}
function RankingView() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LiveRanking, {});
}
function LiveRanking() {
  const { mode, revision, profile } = useDropAuth();
  const dropId = useCurrentDropId();
  const drop = useCurrentDrop();
  const fetchRanking = useServerFn(getRanking);
  const follow = useServerFn(followFan);
  const [scope, setScope] = reactExports.useState("Global");
  const [data, setData] = reactExports.useState(null);
  const [fan, setFan] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  async function load() {
    setLoading(true);
    setError("");
    try {
      if (mode === "user") {
        setData(await fetchRanking({ data: { campaign: dropId, scope } }));
      } else {
        const { data: pub, error: e } = await supabase.rpc("drop_public_ranking", { p_campaign: dropId });
        if (e) throw new Error("No pudimos cargar el ranking");
        setData(pub);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos cargar el ranking");
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    if (mode === "user" || scope === "Global") void load();
    else setData(null);
  }, [mode, scope, dropId, revision]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black", children: drop.status === "archived" ? "Ranking final" : "Ranking" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: drop.status === "archived" ? `Así terminó ${drop.title}. Ya no se suman puntos.` : `Puntos de ${drop.artist} · los canjes no cambian tu posición.` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["Global", "Amigos", "Semanal"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: scope === s ? "default" : "outline", size: "sm", onClick: () => setScope(s), children: [
      s === "Amigos" && /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
      s
    ] }, s)) }),
    scope === "Semanal" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Desde el lunes · horario de Buenos Aires" }),
    mode !== "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground", children: "Estás viendo el ranking como invitado. Creá una cuenta para aparecer acá y seguir a otros fans." }),
    mode !== "user" && scope !== "Global" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-sm text-muted-foreground", children: "Ingresá con tu cuenta para ver tus amigos y el ranking semanal." }) : loading && !data ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Cargando ranking…" }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "alert", children: [
      error,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: load, variant: "outline", children: "Reintentar" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 items-end gap-2", children: data?.rows.slice(0, 3).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-auto min-w-0 flex-col gap-2 p-3", onClick: () => setFan(f), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: f.avatar_url || avatarFor(f.display_name), alt: f.display_name, className: "h-12 w-12 rounded-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full truncate text-xs", children: f.display_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "#",
          f.rank
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary", children: [
          f.score,
          " pts"
        ] })
      ] }, f.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: data?.rows.slice(3).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "h-auto w-full justify-start gap-3 py-3", onClick: () => setFan(f), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "#",
          f.rank
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: f.avatar_url || avatarFor(f.display_name), alt: "", className: "h-9 w-9 rounded-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-left", children: f.display_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          f.score,
          " pts"
        ] })
      ] }, f.id)) }),
      data?.me && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/40 bg-primary/5 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold", children: [
          "Tu posición: #",
          data.me.rank,
          " · ",
          data.me.score,
          " pts de ",
          drop.artist
        ] }),
        (() => {
          const me = data.me;
          const above = data.rows.filter((r) => r.score > me.score).at(-1);
          return above && drop.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            "Te faltan ",
            above.score - me.score + 1,
            " pts para pasar a ",
            above.display_name,
            " (#",
            above.rank,
            "). Completá misiones para subir."
          ] }) : null;
        })()
      ] }),
      data && !data.me && mode === "user" && drop.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-dashed border-border p-3 text-xs text-muted-foreground", children: "Todavía no sumaste puntos en este drop. Completá tu primera misión para aparecer en el ranking." }),
      scope === "Amigos" && data?.rows.length === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Todavía no seguís participantes de esta campaña." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open: !!fan, onOpenChange: (o) => {
      if (!o) setFan(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: fan?.display_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerDescription, { children: [
          "#",
          fan?.rank,
          " · ",
          fan?.score,
          " pts de campaña"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 px-4 pb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          fan?.missions,
          " misiones completadas"
        ] }),
        fan && fan.id !== profile.id && mode === "user" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", onClick: async () => {
          try {
            await follow({ data: { id: fan.id, follow: !fan.following } });
            setFan({ ...fan, following: !fan.following });
            await load();
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "No pudimos guardar");
          }
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
          fan.following ? "Dejar de seguir" : "Seguir fan"
        ] })
      ] })
    ] }) })
  ] });
}
const sb = supabase;
function timeAgo(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1e3);
  if (s < 60) return "recién";
  if (s < 3600) return `hace ${Math.floor(s / 60)} min`;
  if (s < 86400) return `hace ${Math.floor(s / 3600)} h`;
  if (s < 86400 * 14) return `hace ${Math.floor(s / 86400)} d`;
  return `hace ${Math.floor(s / (86400 * 7))} semanas`;
}
async function setFollow(id, follow) {
  const { error } = await sb.rpc("drop_follow", { p_followed: id, p_follow: follow });
  if (error) {
    toast.error("No pudimos guardar el seguimiento");
    return false;
  }
  toast.success(follow ? "Ahora seguís a este fan" : "Dejaste de seguirlo");
  return true;
}
function FollowButton({ fan, onChange, small }) {
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      disabled: busy,
      onClick: async () => {
        setBusy(true);
        if (await setFollow(fan.id, !fan.following)) onChange(!fan.following);
        setBusy(false);
      },
      className: `inline-flex shrink-0 items-center justify-center gap-1 rounded-full font-bold disabled:opacity-60 ${small ? "px-3 py-1.5 text-xs" : "w-full py-3 text-sm"} ${fan.following ? "border border-border" : "text-primary-foreground"}`,
      style: fan.following ? void 0 : { backgroundImage: "var(--gradient-drop)" },
      children: [
        busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : fan.following ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
        fan.following ? "Siguiendo" : "Seguir"
      ]
    }
  );
}
function FanDrawer({ fan, onClose, onChange }) {
  const { mode, user } = useDropAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open: !!fan, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContent, { children: fan && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: fan.avatar || avatarFor(fan.name), alt: "", className: "mb-2 h-20 w-20 rounded-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "text-xl font-black", children: fan.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { className: "text-xs", children: "Fan de DROP" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-8", children: mode === "user" && fan.id !== user?.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(FollowButton, { fan, onChange: (following) => onChange({ ...fan, following }) }) : mode !== "user" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground", children: "Creá tu cuenta para seguir a otros fans." }) : null })
  ] }) }) });
}
function CommentsDrawer({ postKey, title, onClose, onCountChange, onOpenFan }) {
  const { mode } = useDropAuth();
  const [list, setList] = reactExports.useState(null);
  const [text, setText] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  async function load(key) {
    const { data } = await sb.rpc("drop_post_comments", { p_post_key: key });
    setList(data ?? []);
  }
  reactExports.useEffect(() => {
    setList(null);
    setText("");
    if (postKey) void load(postKey);
  }, [postKey]);
  async function send() {
    if (!postKey || !text.trim()) return;
    if (mode !== "user") {
      toast.message("Creá tu cuenta para comentar");
      return;
    }
    setBusy(true);
    const { error } = await sb.from("post_comments").insert({ post_key: postKey, text: text.trim().slice(0, 300) });
    setBusy(false);
    if (error) {
      toast.error("No se pudo comentar");
      return;
    }
    setText("");
    onCountChange(postKey, 1);
    await load(postKey);
  }
  async function remove(c) {
    const { error } = await sb.from("post_comments").delete().eq("id", c.id);
    if (error || !postKey) {
      toast.error("No se pudo borrar");
      return;
    }
    onCountChange(postKey, -1);
    await load(postKey);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open: !!postKey, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerContent, { className: "max-h-[85vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "font-black", children: "Comentarios" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { className: "line-clamp-2 text-xs", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-24 flex-1 space-y-3 overflow-y-auto px-4", children: list === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-5 w-5 animate-spin text-muted-foreground" }) : list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-center text-sm text-muted-foreground", children: "Todavía no hay comentarios. ¡Sé el primero!" }) : list.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onOpenFan({ id: c.user_id, name: c.author, avatar: c.avatar, following: c.following }), className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.avatar || avatarFor(c.author), alt: "", className: "h-8 w-8 rounded-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 rounded-2xl bg-muted/60 px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onOpenFan({ id: c.user_id, name: c.author, avatar: c.avatar, following: c.following }), className: "text-xs font-bold", children: c.author }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[10px] text-muted-foreground", children: timeAgo(c.created_at) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap break-words text-sm", children: c.text })
      ] }),
      c.mine && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void remove(c), "aria-label": "Borrar comentario", className: "self-center p-1 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
    ] }, c.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-t border-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: text,
          maxLength: 300,
          onChange: (e) => setText(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && void send(),
          placeholder: mode === "user" ? "Escribí un comentario…" : "Creá tu cuenta para comentar",
          disabled: mode !== "user",
          className: "flex-1 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void send(), disabled: busy || !text.trim(), "aria-label": "Enviar", className: "grid h-10 w-10 place-items-center rounded-full text-primary-foreground disabled:opacity-50", style: { backgroundImage: "var(--gradient-drop)" }, children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] }) });
}
function FanSearch({ onOpenFan }) {
  const { mode } = useDropAuth();
  const [q, setQ] = reactExports.useState("");
  const [results, setResults] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (mode !== "user" || q.trim().length < 2) {
      setResults(null);
      return;
    }
    const t = setTimeout(async () => {
      const { data } = await sb.rpc("drop_search_fans", { p_query: q });
      setResults((data ?? []).map((r) => ({ id: r.id, name: r.display_name, avatar: r.avatar_url, following: r.following })));
    }, 300);
    return () => clearTimeout(t);
  }, [q, mode]);
  if (mode !== "user") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Buscar fans" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Nombre de un fan para seguirlo", className: "flex-1 bg-transparent text-sm outline-none" })
    ] }),
    results && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2", children: [
      results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs text-muted-foreground", children: "No encontramos fans con ese nombre." }),
      results.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onOpenFan(f), className: "flex min-w-0 flex-1 items-center gap-3 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: f.avatar || avatarFor(f.name), alt: "", className: "h-9 w-9 rounded-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm font-semibold", children: f.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FollowButton, { small: true, fan: f, onChange: (following) => setResults((r) => r?.map((x) => x.id === f.id ? { ...x, following } : x) ?? null) })
      ] }, f.id))
    ] })
  ] });
}
const adelaLengua = "/assets/adela-lengua-8rUArssC.webp";
const adelaEstrellas = "/assets/adela-estrellas-SK7uR--H.webp";
const adelaAuto = "/assets/adela-auto-BbGs7fuS.webp";
const adelaEscenario = "/assets/adela-escenario-DxTXmBLs.webp";
const adelaGrito = "/assets/adela-grito-BDWR7Oos.webp";
const pcLaboratorio = "/assets/pc-laboratorio-D6u181IL.webp";
const pcCaras = "/assets/pc-caras-D_ZMDhEr.webp";
const pcGlobosSilla = "/assets/pc-globos-silla-B4ulUVCe.webp";
const pcGlobosVuelo = "/assets/pc-globos-vuelo-DgCOqIcH.webp";
const lnvTraje = "/assets/lnv-traje-BL8Uk-90.webp";
const feed = [
  {
    kind: "achievement",
    user: "lalilover",
    time: "hace 5 min",
    achievement: "desbloqueó el drop 'QR en Palermo'",
    pts: 500
  },
  {
    kind: "post",
    user: "no_atiendo",
    time: "hace 12 min",
    text: "El fragmento del día 3 tiene un sample re escondido 🤯 alguien más lo escuchó al revés?",
    likes: 412,
    comments: 88,
    image: fanaticoSingle.url
  },
  {
    kind: "post",
    user: "demonio.llama",
    time: "hace 40 min",
    text: "Encontré el stencil en la vereda de Thames 👀 escaneado y sumado",
    likes: 1204,
    comments: 210,
    image: stencilWall.url
  },
  {
    kind: "achievement",
    user: "motiveta",
    time: "hace 1 h",
    achievement: "entró al TOP 50 🎉",
    pts: 0
  },
  {
    kind: "post",
    user: "lalisters",
    time: "hace 2 h",
    text: "Cazamos el afiche de Recoleta con las chicas 💃🏻 subo el TikTok en un rato",
    likes: 891,
    comments: 173,
    image: laliAuto.url
  }
];
const groups = [
  { name: "Team CABA", members: 3104, img: laliLogo.url },
  { name: "LALIVERSE", members: 9412, img: simbolos33.url },
  { name: "Trivia diaria", members: 6187, img: laliCover.url }
];
const stickers = [
  { src: stickerNvaa.url, label: "No vayas a atender cuando el demonio llama" },
  { src: simbolos33.url, label: "Pentagrama 33" },
  { src: laliLogo.url, label: "LALI." },
  { src: laliCover.url, label: "Tapa del álbum" },
  { src: PHOTOS.saint, label: "Santa LALI" },
  { src: PHOTOS.childhood, label: "LALI de chiquita" },
  { src: PHOTOS.teen, label: "LALI retro" },
  { src: PHOTOS.veil, label: "LALI en vivo" }
];
const OTHER_FEEDS = {
  "arjona-seco": [
    { kind: "achievement", user: "vale.arjonista", time: "hace 6 min", achievement: "entró al TOP 60 y va por las entradas 🎟️", pts: 0 },
    { kind: "post", user: "marce.seco", time: "hace 20 min", text: "12 fechas en el Movistar Arena y yo quiero estar en las 12 😭 ¿quién más va a varias?", likes: 734, comments: 0, image: arjonaRojo },
    { kind: "post", user: "gabi.historias", time: "hace 1 h", text: "La tapa de Seco con la foto de chiquito es lo más lindo que hizo. Todo el disco suena a carta vieja ✉️", likes: 512, comments: 0, image: arjonaCover },
    { kind: "post", user: "lucho.trovador", time: "hace 3 h", text: "Voy por el meet & greet. Trivia diaria todos los días hasta el show 💪", likes: 289, comments: 0 },
    { kind: "post", user: "sole.movistar", time: "hace 5 h", text: "Ya tengo armada la playlist para la previa del Seco Tour 🎶", likes: 198, comments: 0, image: arjonaRed }
  ],
  "adela-prima": [
    { kind: "achievement", user: "prima.sofi", time: "hace 5 min", achievement: "completó la trivia de PRIMA 5/5", pts: 200 },
    { kind: "post", user: "cande.fucsia", time: "hace 25 min", text: "Ya me teñí de fucsia para el Vorterix 💗 ¿quién más?", likes: 641, comments: 103, image: adelaLengua },
    { kind: "post", user: "juanma.lolla", time: "hace 1 h", text: "Sideshow de Lolla con PRIMA entero en vivo. No lo puedo creer ⭐", likes: 422, comments: 58, image: adelaEstrellas },
    { kind: "post", user: "ro.glitter", time: "hace 3 h", text: "Tutorial de la estrella de glitter para ir al show, lo subo hoy 🌟", likes: 318, comments: 77, image: adelaGlitter }
  ],
  "dillom-lnv": [
    { kind: "achievement", user: "rocio.violenta", time: "hace 8 min", achievement: "completó la trivia de La nueva violencia 5/5", pts: 200 },
    { kind: "post", user: "tomas.dllm", time: "hace 30 min", text: "La nueva violencia de punta a punta sin saltear nada. Dillom no erra 🩷🖤", likes: 534, comments: 87 },
    { kind: "post", user: "agus.gira", time: "hace 2 h", text: "¿Quién va a La gira violenta en Mendoza? Armemos grupo 🎤", likes: 211, comments: 64 },
    { kind: "post", user: "lu.anteojos", time: "hace 4 h", text: "Ya tengo el traje y los anteojos para el show 🕶️", likes: 389, comments: 42 }
  ],
  airbag: [
    { kind: "achievement", user: "sardelli.fan", time: "hace 12 min", achievement: "completó la trivia de El Club de la Pelea 5/5", pts: 200 },
    { kind: "post", user: "juli.rockea", time: "hace 45 min", text: "Anarquía en Buenos Aires en loop desde que salió. Primera regla del club: no hablar del club 🚬", likes: 287, comments: 36 },
    { kind: "post", user: "nacho.donto", time: "hace 2 h", text: "Verte de cerca para cerrar el disco es una locura. ¿Cuál es su favorito?", likes: 194, comments: 58 },
    { kind: "post", user: "mica.airbag", time: "hace 5 h", text: "Ya tengo la entrada, nos vemos en el pogo 🤘", likes: 402, comments: 71 }
  ],
  dillom: [
    { kind: "achievement", user: "bauti.correa", time: "hace 2 semanas", achievement: "terminó #1 en el ranking final de Por cesárea", pts: 0 },
    { kind: "post", user: "ivoperalta", time: "hace 2 semanas", text: "El momento de los globos en el show no me lo olvido más 🎈🖤", likes: 1240, comments: 168, image: pcGlobosVuelo },
    { kind: "post", user: "facu.aguirre", time: "hace 3 semanas", text: "Sentado con los globos cantando… Por cesárea en vivo fue otra cosa.", likes: 876, comments: 94, image: pcGlobosSilla },
    { kind: "post", user: "meli.oscura", time: "hace 3 semanas", text: "La estética de esta era: laboratorio, frascos viejos y anteojos negros.", likes: 512, comments: 47, image: pcLaboratorio },
    { kind: "post", user: "santi.cesarea", time: "hace 4 semanas", text: "Escuché Por cesárea de punta a punta otra vez. Cada vez encuentro algo nuevo 🖤", likes: 312, comments: 41 }
  ],
  maria: [
    { kind: "achievement", user: "brenda.luna", time: "hace 3 semanas", achievement: "terminó #1 en el ranking final de Quimera", pts: 0 },
    { kind: "post", user: "cami.brava", time: "hace 3 semanas", text: "Qué drop hermoso fue Quimera 💙 gracias a todas las que jugaron conmigo", likes: 980, comments: 133 },
    { kind: "post", user: "male.figueroa", time: "hace 4 semanas", text: "Última trivia de Quimera completada. ¡Nos vemos en el próximo!", likes: 421, comments: 57 }
  ],
  tini: [
    { kind: "post", user: "tati.rojas", time: "hace 2 h", text: "¿Alguien más vio la cuenta regresiva? Algo se viene con TINI 👀", likes: 655, comments: 98 }
  ]
};
const OTHER_GROUPS = {
  "arjona-seco": [
    { name: "Arjonistas", members: 15230, img: arjonaRojo },
    { name: "Fila del Movistar", members: 4870, img: arjonaSeco },
    { name: "Cartas de Seco", members: 3120, img: arjonaRed }
  ],
  "adela-prima": [
    { name: "Primas", members: 7340, img: adelaAuto },
    { name: "Fila Vorterix", members: 1980, img: adelaEscenario },
    { name: "Glitter y estrellas", members: 2760, img: adelaGrito }
  ],
  dillom: [
    { name: "Comunidad Dillom", members: 9870, img: pcGlobosSilla },
    { name: "Los globos", members: 4310, img: pcGlobosVuelo },
    { name: "Caras de cesárea", members: 2650, img: pcCaras }
  ],
  "dillom-lnv": [
    { name: "La gira violenta", members: 11240, img: lnvGira },
    { name: "Trajes y anteojos", members: 3870, img: lnvTraje },
    { name: "Los violentos", members: 6520, img: lnvPoster }
  ],
  airbag: [
    { name: "El Club", members: 8420, img: airbagBanda },
    { name: "Pogo en primera fila", members: 2310, img: airbagVivo }
  ]
};
function ComunidadView() {
  const { profile, mode } = useDropAuth();
  const drop = useCurrentDrop();
  const isLali = drop.id === "lali";
  const isUser = mode === "user";
  const dropFeed = isLali ? feed : OTHER_FEEDS[drop.id] ?? [];
  const dropGroups = isLali ? groups : OTHER_GROUPS[drop.id] ?? [{ name: drop.fandom, members: 1200 + drop.id.length * 731, img: drop.cover }];
  const [joined, setJoined] = reactExports.useState(() => readLocal("drop-grupos", []));
  const postsKey = isLali ? "drop-mis-posts" : `drop-mis-posts-${drop.id}`;
  const [myPosts, setMyPosts] = reactExports.useState(() => readLocal(postsKey, []));
  const [draft, setDraft] = reactExports.useState("");
  const [sticker, setSticker] = reactExports.useState(null);
  const [posting, setPosting] = reactExports.useState(false);
  const [dbPosts, setDbPosts] = reactExports.useState([]);
  const [stats, setStats] = reactExports.useState({});
  const [openComments, setOpenComments] = reactExports.useState(null);
  const [fan, setFan] = reactExports.useState(null);
  reactExports.useEffect(() => writeLocal("drop-grupos", joined), [joined]);
  reactExports.useEffect(() => writeLocal(postsKey, myPosts.slice(0, 20)), [myPosts, postsKey]);
  const handle = (profile.username?.trim() || profile.display_name || "fan").replace(/^@/, "");
  const seedKey = (i) => `seed:${drop.id}:${i}`;
  async function loadFeed() {
    const keys = dropFeed.map((p, i) => p.kind === "post" ? seedKey(i) : null).filter(Boolean);
    const { data } = await sb.rpc("drop_feed", { p_campaign: drop.id, p_seed_keys: keys });
    if (!data) return;
    setDbPosts(data.posts ?? []);
    setStats(data.stats ?? {});
  }
  reactExports.useEffect(() => {
    void loadFeed();
  }, [drop.id, mode]);
  const cards = [
    ...myPosts.flatMap((p, i) => p.kind === "post" ? [{ key: `local:${i}`, user: p.user, time: p.time, text: p.text, image: p.image, avatar: p.avatar, likes: 0, comments: 0, liked: false, mine: true, local: true }] : []),
    ...dbPosts.map((p) => ({
      key: p.key,
      user: p.author,
      time: timeAgo(p.created_at),
      text: p.text,
      image: p.sticker ?? void 0,
      avatar: p.avatar,
      likes: p.likes,
      comments: p.comments,
      liked: p.liked,
      mine: p.mine,
      postId: p.id,
      fan: { id: p.user_id, name: p.author, avatar: p.avatar, following: p.following }
    })),
    ...dropFeed.map((p, i) => {
      if (p.kind === "achievement") return p;
      const st = stats[seedKey(i)];
      return { key: seedKey(i), user: p.user, time: p.time, text: p.text, image: p.image, avatar: p.avatar, likes: p.likes + (st?.likes ?? 0), comments: st?.comments ?? 0, liked: !!st?.liked };
    })
  ];
  const patchCard = (key, f) => {
    if (key.startsWith("p:")) setDbPosts((ps) => ps.map((p) => p.key === key ? { ...p, ...f(p) } : p));
    else setStats((s) => ({ ...s, [key]: f(s[key] ?? { likes: 0, comments: 0, liked: false }) }));
  };
  async function toggleLike(c) {
    if (c.local) return;
    if (!isUser) {
      toast.message("Creá tu cuenta para dar like", { description: "Así tus likes y comentarios quedan guardados." });
      return;
    }
    const like = !c.liked;
    patchCard(c.key, (x) => ({ ...x, liked: like, likes: x.likes + (like ? 1 : -1) }));
    const q = like ? sb.from("post_likes").insert({ post_key: c.key }) : sb.from("post_likes").delete().eq("post_key", c.key).eq("user_id", profile.id);
    const { error } = await q;
    if (error) {
      patchCard(c.key, (x) => ({ ...x, liked: !like, likes: x.likes + (like ? -1 : 1) }));
      toast.error("No se pudo guardar el like");
    }
  }
  const publish = async () => {
    if (!draft.trim() && !sticker) {
      toast.error("Escribí algo o elegí un sticker");
      return;
    }
    if (!isUser) {
      setMyPosts((p) => [{ kind: "post", user: handle, time: "recién", text: draft.trim(), likes: 0, comments: 0, image: sticker ?? void 0, avatar: profile.avatar_url, mine: true }, ...p]);
      toast.success("Publicado en este teléfono", { description: "Creá tu cuenta para que lo vean todos los fans." });
    } else {
      setPosting(true);
      const { error } = await sb.from("community_posts").insert({ campaign_id: drop.id, text: draft.trim().slice(0, 500), sticker });
      setPosting(false);
      if (error) {
        toast.error("No se pudo publicar");
        return;
      }
      toast.success("Publicado en Comunidad");
      await loadFeed();
    }
    setDraft("");
    setSticker(null);
  };
  async function removePost(c) {
    if (c.local) {
      setMyPosts((p) => p.filter((_, i) => `local:${i}` !== c.key));
      return;
    }
    const { error } = await sb.from("community_posts").delete().eq("id", c.postId);
    if (error) {
      toast.error("No se pudo borrar");
      return;
    }
    toast.success("Posteo borrado");
    await loadFeed();
  }
  const sharePost = async (p) => {
    const text = `@${p.user} en DROP: ${p.text}`;
    const url2 = `${window.location.origin}/drop`;
    try {
      if (navigator.share) await navigator.share({ title: "DROP · Comunidad", text, url: url2 });
      else {
        await navigator.clipboard.writeText(`${text} ${url2}`);
        toast.success("Copiado para compartir");
      }
    } catch {
    }
  };
  const onFanChange = (f) => {
    setFan(f);
    setDbPosts((ps) => ps.map((p) => p.user_id === f.id ? { ...p, following: f.following } : p));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-primary", children: drop.fandom }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black", children: "Comunidad" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: drop.status === "archived" ? `Lo que vivieron los fans de ${drop.artist} en ${drop.title}.` : `Lo que están compartiendo los fans de ${drop.artist}.` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6 rounded-2xl border border-border bg-card p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: draft,
          onChange: (e) => setDraft(e.target.value),
          rows: 2,
          maxLength: 500,
          placeholder: "Contá qué encontraste hoy…",
          className: "w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
        (isLali ? stickers : [{ src: drop.cover, label: drop.title }]).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSticker(sticker === s.src ? null : s.src),
            className: `h-11 w-11 shrink-0 overflow-hidden rounded-xl border-2 ${sticker === s.src ? "border-primary" : "border-border"}`,
            "aria-label": `Sticker ${s.label}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: s.src, alt: s.label, className: "h-full w-full object-cover" })
          },
          s.label
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => void publish(),
            disabled: posting,
            className: "mt-1 flex w-full items-center justify-center gap-1 rounded-xl px-4 py-2.5 text-sm font-black text-primary-foreground disabled:opacity-60",
            style: { backgroundImage: "var(--gradient-drop)" },
            children: [
              posting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }),
              " Publicar"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FanSearch, { onOpenFan: setFan }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Grupos" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mb-6 grid gap-3 ${dropGroups.length >= 3 ? "grid-cols-3" : dropGroups.length === 2 ? "grid-cols-2" : "grid-cols-1"}`, children: dropGroups.map((g) => {
      const isIn = joined.includes(g.name);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setJoined((j) => isIn ? j.filter((n) => n !== g.name) : [...j, g.name]);
            toast[isIn ? "message" : "success"](
              isIn ? `Saliste de ${g.name}` : `Te uniste a ${g.name}`
            );
          },
          className: `min-w-0 rounded-2xl border p-3 text-left ${isIn ? "border-primary bg-primary/10" : "border-border bg-card"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                loading: "lazy",
                decoding: "async",
                src: g.img,
                alt: g.name,
                className: "mb-2 h-10 w-10 rounded-xl object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: g.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              (g.members + (isIn ? 1 : 0)).toLocaleString("es-AR"),
              " fans"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] font-bold text-primary", children: isIn ? "Unido ✓" : "Unirme" })
          ]
        },
        g.name
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Actividad" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: cards.map(
      (p, i) => "kind" in p ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid h-10 w-10 shrink-0 place-items-center rounded-full text-primary-foreground",
                style: { backgroundImage: "var(--gradient-drop)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                  "@",
                  p.user
                ] }),
                " ",
                p.achievement,
                p.pts > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-bold text-primary", children: [
                  "+",
                  p.pts,
                  " pts"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: p.time })
            ] })
          ]
        },
        `a${i}`
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-2 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => p.fan && !p.mine && setFan(p.fan),
                className: "flex min-w-0 flex-1 items-center gap-3 text-left",
                disabled: !p.fan || p.mine,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: p.avatar || avatarFor(p.user), alt: `Foto de ${p.user}`, className: "h-10 w-10 shrink-0 rounded-full object-cover" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-semibold", children: p.fan ? p.user : `@${p.user}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-[11px] text-muted-foreground", children: [
                      p.time,
                      p.local ? " · solo en este teléfono" : ""
                    ] })
                  ] })
                ]
              }
            ),
            p.fan && !p.mine && isUser && /* @__PURE__ */ jsxRuntimeExports.jsx(FollowButton, { small: true, fan: p.fan, onChange: (following) => onFanChange({ ...p.fan, following }) })
          ] }),
          p.text && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap break-words text-sm leading-relaxed", children: p.text })
        ] }),
        p.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            decoding: "async",
            src: p.image,
            alt: `Publicación de ${p.user}`,
            loading: "lazy",
            className: p.fan || p.local ? "mx-4 mb-1 h-32 w-32 rounded-xl object-cover" : "max-h-72 w-full object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "flex items-center justify-between p-4 pt-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => void toggleLike(p),
                disabled: p.local,
                "aria-label": p.liked ? "Quitar me gusta" : "Me gusta",
                className: `flex items-center gap-1 ${p.liked ? "text-primary" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-4 w-4 ${p.liked ? "fill-current" : ""}` }),
                  " ",
                  p.likes
                ]
              }
            ),
            !p.local && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpenComments(p), "aria-label": "Comentarios", className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
              " ",
              p.comments
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            p.mine && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void removePost(p), "aria-label": "Borrar posteo", className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => void sharePost(p), className: "flex items-center gap-1 font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
              " Compartir"
            ] })
          ] })
        ] })
      ] }, p.key)
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentsDrawer,
      {
        postKey: openComments?.key ?? null,
        title: openComments ? `${openComments.user}: ${openComments.text}` : "",
        onClose: () => setOpenComments(null),
        onCountChange: (key, d) => patchCard(key, (x) => ({ ...x, comments: Math.max(0, x.comments + d) })),
        onOpenFan: (f) => {
          setOpenComments(null);
          setFan(f);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FanDrawer, { fan, onClose: () => setFan(null), onChange: onFanChange })
  ] });
}
function readLocal(key, fallback) {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeLocal(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}
const kpis = [
  { icon: Download, label: "Descargas", value: "128.4k", delta: "+12.3%" },
  { icon: Users, label: "Usuarios activos", value: "84.1k", delta: "+8.7%" },
  { icon: Activity$1, label: "Misiones completadas", value: "72%", delta: "+4.1%" },
  { icon: TicketCheck, label: "Asistencia evento", value: "94%", delta: "+2.0%" }
];
const heatmap = [
  { zone: "CABA · Palermo", pct: 92 },
  { zone: "CABA · Recoleta", pct: 71 },
  { zone: "GBA Norte", pct: 63 },
  { zone: "Córdoba Capital", pct: 48 },
  { zone: "Rosario", pct: 41 },
  { zone: "Mendoza", pct: 27 }
];
const missions = [
  { name: "Pre-save álbum", finish: 88 },
  { name: "Trivia LALIVERSE", finish: 74 },
  { name: "Caza QR Palermo", finish: 52 },
  { name: "Rompecabezas portada", finish: 66 },
  { name: "AR Obelisco", finish: 31 }
];
const superfans = [
  { user: "lalilover", pts: 8420, city: "CABA" },
  { user: "lalisters", pts: 7980, city: "Rosario" },
  { user: "no_atiendo", pts: 7610, city: "CABA" },
  { user: "disciplina.mb", pts: 6890, city: "Córdoba" }
];
const social = [
  { tag: "#NoVayasAAtender", posts: "42.1k" },
  { tag: "#LALIVERSE", posts: "31.8k" },
  { tag: "#DropLali", posts: "18.4k" }
];
function DashboardView() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 px-5 pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Sello & Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black", children: "Dashboard analítico" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Campaña · No vayas a atender cuando el demonio llama" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 gap-3", children: kpis.map((k) => {
      const Icon = k.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "grid h-8 w-8 place-items-center rounded-lg text-primary-foreground",
              style: { backgroundImage: "var(--gradient-drop)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-primary", children: k.delta })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-black", children: k.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: k.label })
      ] }, k.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest", children: "Mapa de calor · Participación por zona" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: heatmap.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h.zone }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
            h.pct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full",
            style: { width: `${h.pct}%`, backgroundImage: "var(--gradient-drop)" }
          }
        ) })
      ] }, h.zone)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest", children: "Rendimiento de misiones" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-32", children: missions.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full rounded-t-md",
            style: {
              height: `${m.finish}%`,
              backgroundImage: "var(--gradient-drop)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold", children: [
          m.finish,
          "%"
        ] })
      ] }, m.name)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-5 gap-1 text-center text-[8px] leading-tight text-muted-foreground", children: missions.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.name }, m.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest", children: "Perfil de superfans" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: superfans.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 text-center font-bold text-muted-foreground", children: i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-bold", children: s.user[0].toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold", children: [
            "@",
            s.user
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: s.city })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-primary", children: s.pts.toLocaleString("es") })
      ] }, s.user)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest", children: "Impacto en redes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: social.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: s.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black", children: s.posts })
        ] }, s.tag)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
          "Alcance estimado: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "4.2M" }),
          " · UGC:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "18.9k piezas" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest", children: "Conversión musical" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black", children: "62.3k" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Pre-saves" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black", children: "1.4M" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Streams verif." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black", children: "+38%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Oyentes mensuales" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/40 py-3 text-sm font-bold text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
      " Descargar reporte final de campaña"
    ] })
  ] });
}
const url = "/assets/drop-photo-32-Cat1ixA5.webp";
const fanTini = { url };
const artistPoints = [
  { id: "lali", name: "LALI", photo: fanLali.url },
  { id: "maria", name: "María Becerra", photo: fanMaria.url },
  { id: "tini", name: "TINI", photo: fanTini.url }
];
function ProfileView({ onClose, backControl }) {
  const { profile, signOut, mode } = useDropAuth();
  const navigate = useNavigate();
  const [section, setSection] = reactExports.useState("perfil");
  const listened = profile?.listened_albums ?? [];
  const generalPoints = profile?.general_points ?? 0;
  const activeDrop = profile?.active_drop ?? "lali";
  const rankingPoints = {};
  if (profile?.ranking_points && typeof profile.ranking_points === "object" && !Array.isArray(profile.ranking_points)) {
    for (const [key, value] of Object.entries(profile.ranking_points)) if (typeof value === "number") rankingPoints[key] = value;
  }
  const title = section === "perfil" ? "Mi DROP" : "Álbumes";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-8 text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-4 backdrop-blur-xl", children: [
      backControl ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: onClose, "aria-label": "Volver al drop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Cuenta DROP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-xl font-black", children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-primary/50 bg-card", children: profile.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: profile.avatar_url, alt: "Foto de perfil", className: "h-full w-full object-cover" }) : mode === "guest" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-5 w-5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: PHOTOS.worldCup, alt: "Foto de perfil", className: "h-full w-full object-cover" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-bold", children: profile?.display_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: mode === "user" ? "Cuenta guardada" : "Modo invitado · tus datos no se guardan" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: async () => {
          await signOut();
          void navigate({ to: "/auth", search: { mode: "login" }, replace: true });
        }, children: mode === "user" ? "Cerrar sesión" : "Salir" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card p-1", "aria-label": "Secciones de Mi DROP", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, { active: section === "perfil", icon: UserRound, label: "Perfil", onClick: () => setSection("perfil") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, { active: section === "albumes", icon: Disc3, label: "Álbumes", onClick: () => setSection("albumes") })
      ] }),
      section === "perfil" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProfileHome,
        {
          generalPoints,
          listenedCount: listened.length,
          activeDrop,
          rankingPoints,
          onOpenAlbums: () => setSection("albumes"),
          onOpenDrops: () => document.getElementById("elegir-drop")?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      ),
      section === "albumes" && /* @__PURE__ */ jsxRuntimeExports.jsx(AlbumsSection, {})
    ] })
  ] });
}
function ProfileTab({ active, icon: Icon, label, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: active ? "default" : "ghost",
      onClick,
      className: "h-12 flex-col gap-0.5 rounded-xl px-2 text-[11px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        label
      ]
    }
  );
}
function ProfileHome({
  generalPoints,
  listenedCount,
  activeDrop,
  rankingPoints,
  onOpenAlbums,
  onOpenDrops
}) {
  const { state } = useDropAuth();
  const totalArtistPoints = artistPoints.reduce((sum, artist) => sum + (state.balances.find((b) => b.campaign_id === artist.id)?.score ?? 0), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "overflow-hidden rounded-3xl border border-primary/40 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", style: { backgroundImage: "var(--gradient-drop-soft)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Puntos generales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-4xl font-black tabular-nums", children: generalPoints.toLocaleString("es-AR") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponibles para recompensas" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: `${listenedCount}`, label: "álbumes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: totalArtistPoints.toLocaleString("es-AR"), label: "pts. de campañas" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-auto justify-between rounded-2xl p-4 text-left", onClick: onOpenAlbums, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Disc3, { className: "mb-3 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold", children: "Mis álbumes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-auto justify-between rounded-2xl p-4 text-left", onClick: onOpenDrops, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "mb-3 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold", children: "Elegir drop" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "text-muted-foreground" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropSelector, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Tus fandoms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black", children: "Puntaje de campaña" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "3 artistas" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: artistPoints.map((artist) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: artist.photo, alt: `Foto de ${artist.name}`, className: "h-10 w-10 shrink-0 rounded-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: artist.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Participación en DROP" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-black tabular-nums", children: [
          (state.balances.find((b) => b.campaign_id === artist.id)?.score ?? 0).toLocaleString("es-AR"),
          " pts"
        ] })
      ] }, artist.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-lg font-black", children: "Tus drops anteriores" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs text-muted-foreground", children: "Experiencias de muestra · no representan actividad de tu cuenta." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [{ artist: "LALI", title: "LALI · 2023", points: "2.480", image: coverLali.url }, { artist: "María Becerra", title: "La Nena de Argentina", points: "860", image: coverNena.url }, { artist: "TINI", title: "Un mechón de pelo", points: "540", image: coverMechon.url }].map((drop) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex items-center gap-3 rounded-lg border border-border bg-card p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: drop.image, alt: `Portada de ${drop.title}`, className: "h-14 w-14 shrink-0 rounded-md object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: drop.artist }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: drop.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-primary", children: "Completado" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold", children: [
          drop.points,
          " pts"
        ] })
      ] }, drop.artist)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RewardsRedeem, {}),
    Object.keys(rankingPoints).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold", children: "Saldos históricos por artista" }),
      Object.entries(rankingPoints).map(([artist, pts]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
        artist,
        ": ",
        pts,
        " pts · histórico, no participación verificada"
      ] }, artist))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Actividad reciente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-l border-border pl-4", children: [
        state.movements.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Todavía no hay movimientos registrados." }),
        state.movements.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { title: m.reason === "mission_reward" ? "Misión validada" : m.reason === "reward_redeem" ? "Canje de recompensa" : m.reason === "album_listened" ? "Álbum marcado manualmente" : m.reason === "album_unlistened" ? "Álbum desmarcado" : "Movimiento histórico", detail: `${m.amount > 0 ? "+" : ""}${m.amount} generales · ${m.campaign_delta} campaña · ${m.evidence_type === "legacy" ? "histórico" : m.evidence_type === "drop_verified" ? "validación DROP" : "declaración manual"}` }, m.id))
      ] })
    ] })
  ] });
}
function Stat({ value, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background/35 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase text-muted-foreground", children: label })
  ] });
}
function Activity({ title, detail }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: detail })
  ] });
}
function DropThemeStyles() {
  const content = useDropContent();
  const css = content.filter((c) => c.theme && Object.keys(c.theme).length > 0).map((c) => themeCss(c.campaign_id, c.theme)).join("\n");
  return css ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: css }) : null;
}
function DropUniverse() {
  const {
    tab: searchTab,
    d
  } = Route$7.useSearch();
  const tab = searchTab ?? "inicio";
  const drop = useCurrentDrop();
  const {
    mode,
    saveProfile
  } = useDropAuth();
  const [dashboard, setDashboard] = reactExports.useState(false);
  const [profile, setProfile] = reactExports.useState(false);
  const navigate = useNavigate();
  const goTab = (t) => {
    setDashboard(false);
    void navigate({
      to: "/drop",
      search: {
        d: drop.id,
        tab: t
      }
    });
  };
  reactExports.useEffect(() => {
    document.documentElement.dataset.drop = drop.id;
    return () => {
      delete document.documentElement.dataset.drop;
    };
  }, [drop.id]);
  reactExports.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    });
  }, [tab, dashboard, profile, d]);
  reactExports.useEffect(() => {
    if (mode === "user") void saveProfile({
      active_drop: drop.id
    });
  }, [drop.id, mode]);
  if (profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileView, { onClose: () => setProfile(false) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropThemeStyles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, { back: "Explorar", avatar: drop.cover, title: dashboard ? "Dashboard" : `${drop.artist} · ${drop.title}`, dashboardOpen: dashboard, onToggleDashboard: () => setDashboard((v) => !v), onOpenProfile: () => {
      setDashboard(false);
      setProfile(true);
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-2", children: dashboard ? /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardView, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      tab === "inicio" && /* @__PURE__ */ jsxRuntimeExports.jsx(DropHome, { drop, onGo: goTab }),
      tab === "misiones" && /* @__PURE__ */ jsxRuntimeExports.jsx(MisionesView, {}),
      tab === "ranking" && /* @__PURE__ */ jsxRuntimeExports.jsx(RankingView, {}),
      tab === "comunidad" && /* @__PURE__ */ jsxRuntimeExports.jsx(ComunidadView, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropNav, { tab, onChange: goTab })
  ] });
}
export {
  DropUniverse as component
};
