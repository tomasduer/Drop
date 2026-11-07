import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useDropAuth, a as useServerFn, g as getRanking } from "./AuthProvider-BxaaxRsy.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";
import { a as useIsDropAdmin, b as useDropContent, r as reloadDropContent, D as DROP_CATALOG, K as KIND_LABEL, u as useDrops, F as FONT_OPTIONS, t as themeCss } from "./drops-BnDjI0B8.mjs";
import { a as avatarFor } from "./fan-avatars-_RI7rXqd.mjs";
import { t as toast } from "../_libs/sonner.mjs";

import { s as ArrowLeft, t as LayoutGrid, u as ChartColumn, v as ShieldAlert, w as Plus, L as LoaderCircle, I as ImagePlus, x as Save, y as Pencil, E as Eye, z as EyeOff, U as Users, q as Activity, h as UserPlus, T as Target, d as Sparkles, F as Bookmark, J as TrendingUp, K as MapPin, o as Star, N as MessageSquare, n as Heart, O as Share2, Q as Music, i as Trash2 } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "./server-BNE5wpof.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/unenv.mjs";

import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-CUClxfOu.mjs";
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
function rng(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ h >>> 15, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}
const between = (r, min, max) => Math.round(min + r() * (max - min));
const HANDLES = ["sofi.drops", "juli_fan", "cami.b", "lautaro.vinilos", "agus.en.vivo", "flor_33", "nico.tracks", "mica.backstage", "valen.setlist", "tomi_ok", "rochi.fm", "fede.cancionero", "luli.primera.fila", "pili.preventa", "santi.giras"];
const ZONES = ["CABA", "GBA Norte", "GBA Sur", "Córdoba", "Rosario", "La Plata", "Mendoza", "Tucumán"];
const DEFAULT_MISSIONS = [
  { id: "demo-trivia", title: "Trivia diaria", kind: "trivia" },
  { id: "demo-stream", title: "Escuchá el single 3 veces", kind: "stream" },
  { id: "demo-frase", title: "Descubrí la frase secreta", kind: "clue" },
  { id: "demo-orden", title: "Ordená el tracklist", kind: "order" },
  { id: "demo-qr", title: "Caza de QR en la calle", kind: "qr" }
];
function scale(drop) {
  return drop.status === "archived" ? 1.6 : drop.status === "upcoming" ? 0.12 : 1;
}
function demoOverview(drops) {
  return drops.map((d) => {
    const s = demoStats(d, []);
    return { campaign_id: d.id, participants: s.participants, points: s.points, completions: s.completions, active_7d: s.active_7d, saves: s.saves };
  });
}
function demoStats(drop, realMissions) {
  const r = rng(drop.id);
  const k = scale(drop);
  const participants = Math.round(between(r, 2800, 9400) * k);
  const active = drop.status === "archived" ? Math.round(participants * 0.04) : Math.round(participants * (0.32 + r() * 0.2));
  const fresh = drop.status === "archived" ? 0 : Math.round(active * (0.18 + r() * 0.15));
  const missionsBase = realMissions.length > 0 ? realMissions : DEFAULT_MISSIONS;
  const missions = missionsBase.map((m, i) => {
    const share = Math.max(0.08, 0.86 - i * 0.13 - r() * 0.12);
    const fans = Math.round(participants * share);
    const repeat = m.kind === "trivia" ? 3 + r() * 5 : 1 + r() * 0.4;
    return { id: m.id, title: m.title, kind: m.kind, fans, completions: Math.round(fans * repeat) };
  });
  const completions = missions.reduce((s, m) => s + m.completions, 0);
  const points = Math.round(completions * between(r, 55, 95));
  const today = /* @__PURE__ */ new Date();
  const daily = Array.from({ length: 14 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (13 - i));
    const trend = drop.status === "archived" ? 0.05 : 0.55 + i / 13 * 0.6;
    const weekend = [0, 6].includes(day.getDay()) ? 1.25 : 1;
    const value = Math.round(completions / 30 * trend * weekend * (0.8 + r() * 0.4));
    return { day: day.toISOString().slice(0, 10), completions: value };
  });
  let topScore = Math.round(points / participants * between(r, 9, 14));
  const offset = between(r, 0, HANDLES.length - 1);
  const top = Array.from({ length: 10 }, (_, i) => {
    const name = HANDLES[(offset + i) % HANDLES.length];
    const score = topScore;
    topScore = Math.round(topScore * (0.86 + r() * 0.1));
    return { display_name: name, avatar_url: avatarFor(name), score, missions: Math.max(3, Math.round(score / between(r, 140, 220))) };
  });
  let left = 100;
  const zones = ZONES.slice(0, 6).map((zone, i) => {
    const pct = i === 5 ? left : Math.max(3, Math.round(left * (0.34 + r() * 0.12)));
    left -= pct;
    return { zone, pct };
  }).sort((a, b) => b.pct - a.pct);
  return {
    participants,
    points,
    completions,
    active_7d: active,
    new_7d: fresh,
    saves: Math.round(participants * (1.3 + r() * 0.6)),
    posts: Math.round(participants * (0.05 + r() * 0.04)),
    likes: Math.round(participants * (0.9 + r() * 0.8)),
    missions,
    daily,
    top,
    zones,
    social: { reach: Math.round(participants * between(r, 380, 620)), ugc: Math.round(participants * (0.6 + r() * 0.5)) },
    streams: Math.round(participants * between(r, 95, 180))
  };
}
const DEMO_KEY = "drop-dashboard-demo";
const rpc = (fn, args) => supabase.rpc(fn, args);
const n = (v) => v.toLocaleString("es-AR");
const big = (v) => v >= 1e5 ? v.toLocaleString("es-AR", { notation: "compact", maximumFractionDigits: 1 }) : n(v);
const STATUS = { active: "Activo", upcoming: "Próximo", archived: "Finalizado" };
function DashboardView() {
  const drops = useDrops();
  const [sel, setSel] = reactExports.useState("todos");
  const [demo, setDemoState] = reactExports.useState(true);
  reactExports.useEffect(() => {
    try {
      if (localStorage.getItem(DEMO_KEY) === "0") setDemoState(false);
    } catch {
    }
  }, []);
  const setDemo = (v) => {
    setDemoState(v);
    try {
      localStorage.setItem(DEMO_KEY, v ? "1" : "0");
    } catch {
    }
  };
  const drop = drops.find((d) => d.id === sel);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 px-4 pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Solo administradoras" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black", children: "Dashboard analítico" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: drop ? `${drop.artist} · ${drop.title}` : "Resumen de todos los drops" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex rounded-full border border-border bg-card p-0.5 text-[11px] font-bold", role: "group", "aria-label": "Origen de los datos", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDemo(true), "aria-pressed": demo, className: `rounded-full px-3 py-1 ${demo ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`, children: "Datos de demo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDemo(false), "aria-pressed": !demo, className: `rounded-full px-3 py-1 ${!demo ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`, children: "Datos reales" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1", role: "tablist", "aria-label": "Elegir drop", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { active: sel === "todos", onClick: () => setSel("todos"), children: "Todos" }),
      drops.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { active: sel === d.id, onClick: () => setSel(d.id), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.cover, alt: "", className: "h-5 w-5 rounded-full object-cover" }),
        d.artist,
        drops.filter((x) => x.artist === d.artist).length > 1 ? ` · ${d.title}` : ""
      ] }, d.id))
    ] }),
    drop ? /* @__PURE__ */ jsxRuntimeExports.jsx(DropDetail, { drop, demo }, `${drop.id}-${demo}`) : /* @__PURE__ */ jsxRuntimeExports.jsx(AllDrops, { drops, onPick: setSel, demo }, String(demo))
  ] });
}
function Chip({ active, onClick, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": active,
      onClick,
      className: `flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`,
      children
    }
  );
}
function AllDrops({ drops, onPick, demo }) {
  const fetchRanking = useServerFn(getRanking);
  const [rows, setRows] = reactExports.useState(null);
  const [partial, setPartial] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (demo) {
      setRows(demoOverview(drops));
      return;
    }
    let alive = true;
    void rpc("drop_admin_overview").then(async ({ data, error }) => {
      if (!alive) return;
      if (!error && Array.isArray(data)) {
        setRows(data);
        return;
      }
      setPartial(true);
      const list2 = await Promise.all(drops.map(async (d) => {
        const r = await fetchRanking({ data: { campaign: d.id, scope: "Global" } }).catch(() => null);
        const fans = (r?.rows ?? []).filter((f) => f.score > 0);
        return { campaign_id: d.id, participants: fans.length, points: fans.reduce((s, f) => s + f.score, 0), completions: fans.reduce((s, f) => s + f.missions, 0), active_7d: -1, saves: -1 };
      }));
      if (alive) setRows(list2);
    });
    return () => {
      alive = false;
    };
  }, [drops.length]);
  if (!rows) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  const byId = new Map(rows.map((r) => [r.campaign_id, r]));
  const list = drops.map((d) => ({ d, r: byId.get(d.id) })).sort((a, b) => (b.r?.participants ?? 0) - (a.r?.participants ?? 0));
  const total = rows.reduce((acc, r) => ({ participants: acc.participants + r.participants, points: acc.points + r.points, completions: acc.completions + r.completions }), { participants: 0, points: 0, completions: 0 });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Users, label: "Participaciones", value: n(total.participants) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Target, label: "Misiones hechas", value: big(total.completions) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Sparkles, label: "Puntos", value: big(total.points) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "space-y-2", children: list.map(({ d, r }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onPick(d.id), className: "flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.cover, alt: "", className: "h-11 w-11 shrink-0 rounded-xl object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-sm font-bold", children: [
          d.artist,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-muted-foreground", children: d.title }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-semibold text-muted-foreground", children: [
            "· ",
            STATUS[d.status]
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
          n(r?.completions ?? 0),
          " misiones · ",
          n(r?.points ?? 0),
          " pts",
          r && r.active_7d >= 0 ? ` · ${n(r.active_7d)} activos 7d` : "",
          r && r.saves >= 0 ? ` · ${n(r.saves)} guardados` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black tabular-nums leading-none", children: n(r?.participants ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "fans" })
      ] })
    ] }, d.id)) }),
    partial && /* @__PURE__ */ jsxRuntimeExports.jsx(PartialNote, {})
  ] });
}
function DropDetail({ drop, demo }) {
  const { state } = useDropAuth();
  const fetchRanking = useServerFn(getRanking);
  const [stats, setStats] = reactExports.useState(null);
  const [partial, setPartial] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (demo) {
      setStats(demoStats(drop, state.missions.filter((m) => m.campaign_id === drop.id && m.status === "verified").map((m) => ({ id: m.id, title: m.title, kind: m.kind }))));
      return;
    }
    let alive = true;
    void rpc("drop_admin_stats", { p_campaign: drop.id }).then(async ({ data, error }) => {
      if (!alive) return;
      if (!error && data && typeof data === "object") {
        setStats(data);
        return;
      }
      setPartial(true);
      const r = await fetchRanking({ data: { campaign: drop.id, scope: "Global" } }).catch(() => null);
      const fans = (r?.rows ?? []).filter((f) => f.score > 0);
      const missions = state.missions.filter((m) => m.campaign_id === drop.id && m.status === "verified").map((m) => ({ id: m.id, title: m.title, kind: m.kind, completions: -1, fans: -1 }));
      if (alive) setStats({
        participants: fans.length,
        points: fans.reduce((s, f) => s + f.score, 0),
        saves: -1,
        completions: fans.reduce((s, f) => s + f.missions, 0),
        active_7d: -1,
        new_7d: -1,
        posts: -1,
        likes: -1,
        missions,
        daily: [],
        top: fans.slice(0, 10).map((f) => ({ display_name: f.display_name, avatar_url: f.avatar_url, score: f.score, missions: f.missions }))
      });
    });
    return () => {
      alive = false;
    };
  }, [drop.id]);
  const maxDaily = reactExports.useMemo(() => Math.max(1, ...(stats?.daily ?? []).map((d) => d.completions)), [stats]);
  if (!stats) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  const v = (x) => x < 0 ? "—" : n(x);
  const avg = stats.participants > 0 ? Math.round(stats.points / stats.participants) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Users, label: "Fans participando", value: v(stats.participants) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Activity, label: "Activos últimos 7 días", value: v(stats.active_7d) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: UserPlus, label: "Nuevos últimos 7 días", value: v(stats.new_7d) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Target, label: "Misiones completadas", value: v(stats.completions) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Sparkles, label: "Puntos repartidos", value: stats.points < 0 ? "—" : big(stats.points), sub: stats.participants > 0 ? `${n(avg)} por fan` : void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Bookmark, label: "Lo guardaron", value: v(stats.saves) })
    ] }),
    stats.daily.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { icon: TrendingUp, title: "Misiones completadas · últimos 14 días", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-28 items-end gap-1", children: stats.daily.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full flex-1 flex-col items-center justify-end", title: `${(/* @__PURE__ */ new Date(d.day + "T12:00:00")).toLocaleDateString("es-AR")}: ${d.completions}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full rounded-t", style: { height: `${Math.max(3, d.completions / maxDaily * 100)}%`, backgroundImage: "var(--gradient-drop)", opacity: d.completions ? 1 : 0.25 } }) }, d.day)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between text-[10px] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (/* @__PURE__ */ new Date(stats.daily[0].day + "T12:00:00")).toLocaleDateString("es-AR", { day: "numeric", month: "short" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          n(stats.daily.reduce((s, d) => s + d.completions, 0)),
          " en total"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "hoy" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: Target, title: "Rendimiento de misiones", children: stats.missions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Este drop todavía no tiene misiones activas." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: stats.missions.map((m) => {
      const pct = m.fans >= 0 && stats.participants > 0 ? Math.round(m.fans / stats.participants * 100) : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-semibold", children: m.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-muted-foreground", children: m.fans >= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-foreground", children: n(m.fans) }),
            " fans · ",
            n(m.completions),
            " veces"
          ] }) : "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full", style: { width: `${pct ?? 0}%`, backgroundImage: "var(--gradient-drop)" } }) }),
        pct !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-[10px] text-muted-foreground", children: [
          pct,
          "% de los fans del drop"
        ] })
      ] }, m.id);
    }) }) }),
    stats.zones && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: MapPin, title: "Participación por zona", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: stats.zones.map((z) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: z.zone }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
          z.pct,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full", style: { width: `${z.pct}%`, backgroundImage: "var(--gradient-drop)" } }) })
    ] }, z.zone)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { icon: Star, title: "Top 10 superfans", children: [
      stats.top.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Todavía nadie sumó puntos en este drop." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: stats.top.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 text-center font-bold text-muted-foreground", children: i + 1 }),
        s.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.avatar_url, alt: "", className: "h-8 w-8 rounded-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full bg-muted font-bold", children: (s.display_name || "?")[0].toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-semibold", children: s.display_name || "fan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
            n(s.missions),
            " misiones"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black tabular-nums text-primary", children: n(s.score) })
      ] }, `${s.display_name}-${i}`)) }),
      drop.prizes && drop.prizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-[11px] text-muted-foreground", children: [
        "Premios: ",
        drop.prizes.map((p) => `top ${p.top}: ${p.label}`).join(" · ")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: MessageSquare, label: "Posteos en comunidad", value: v(stats.posts) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Heart, label: "Me gusta", value: v(stats.likes) })
    ] }),
    stats.social ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Share2, label: "Alcance en redes", value: big(stats.social.reach), sub: `${n(stats.social.ugc)} contenidos de fans` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Music, label: "Streams verificados", value: big(stats.streams ?? 0) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-3 text-[11px] text-muted-foreground", children: "Redes y streaming se van a poder medir cuando conectemos esas plataformas." }),
    partial && /* @__PURE__ */ jsxRuntimeExports.jsx(PartialNote, {})
  ] });
}
function Kpi({ icon: Icon, label, value, sub }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 grid h-7 w-7 place-items-center rounded-lg text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xl font-black tabular-nums leading-tight", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: label }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-primary", children: sub })
  ] });
}
function Card({ icon: Icon, title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest", children: title })
    ] }),
    children
  ] });
}
function Loading() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin text-primary" }) });
}
function PartialNote() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-border bg-card/50 p-3 text-[11px] text-muted-foreground", children: "Datos parciales (salen del ranking): falta instalar la actualización del dashboard en la base para ver actividad diaria, misiones, guardados y comunidad." });
}
const db = supabase;
const STATUS_OPTIONS = [
  { value: "pending", label: "Próximamente" },
  { value: "active", label: "Activo" },
  { value: "closed", label: "Archivo" }
];
const slugify = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
async function shrink(file) {
  const bitmap = await createImageBitmap(file);
  const scale2 = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale2);
  canvas.height = Math.round(bitmap.height * scale2);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return await new Promise((resolve, reject) => canvas.toBlob((b) => b ? resolve(b) : reject(new Error("No se pudo procesar la imagen")), "image/webp", 0.85));
}
async function uploadDropImage(dropId, field, file) {
  const blob = await shrink(file);
  const path = `${dropId}/${field}-${Date.now()}.webp`;
  const { error } = await db.storage.from("drop-imagenes").upload(path, blob, { contentType: "image/webp", upsert: true });
  if (error) throw new Error(error.message ?? "No se pudo subir la imagen");
  return db.storage.from("drop-imagenes").getPublicUrl(path).data.publicUrl;
}
const inputCls = "w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary";
const labelCls = "mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground";
const IMAGE_FIELDS = [
  { key: "hero_url", label: "Portada del drop", hint: "Foto grande de arriba (horizontal o cuadrada)." },
  { key: "cover_url", label: "Ícono", hint: "Foto redonda chica: conviene una cara." },
  { key: "album_url", label: "Tapa del álbum", hint: "Se usa en el Archivo y en las listas." }
];
function DropEditor({ campaign, content, takenIds, onSaved }) {
  const { refresh } = useDropAuth();
  const isNew = !campaign;
  const catalog = DROP_CATALOG.find((d) => d.id === campaign?.id);
  const [f, setF] = reactExports.useState(() => ({
    id: campaign?.id ?? "",
    artist: campaign?.artist ?? "",
    title: campaign?.title ?? "",
    status: campaign?.status ?? "pending",
    kind: content?.kind ?? catalog?.kind ?? "album",
    tagline: content?.tagline || catalog?.tagline || "",
    description: content?.description || catalog?.description || "",
    dates: content?.dates || catalog?.dates || "",
    fandom: content?.fandom || catalog?.fandom || "",
    cover_url: content?.cover_url ?? "",
    hero_url: content?.hero_url ?? "",
    album_url: content?.album_url ?? "",
    theme: content?.theme ?? {}
  }));
  const [busy, setBusy] = reactExports.useState(null);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const setTheme = (patch) => setF((p) => ({ ...p, theme: { ...p.theme, ...patch } }));
  const id = isNew ? f.id || slugify(`${f.artist}-${f.title}`) : f.id;
  const hasTheme = Object.keys(f.theme).length > 0;
  async function upload(field, file) {
    if (!file) return;
    if (!id) {
      toast.error("Primero completá artista y título");
      return;
    }
    setBusy(field);
    try {
      set(field, await uploadDropImage(id, field.replace("_url", ""), file));
      toast.success("Foto subida");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo subir la foto");
    } finally {
      setBusy(null);
    }
  }
  async function save() {
    if (!f.artist.trim() || !f.title.trim()) {
      toast.error("Completá artista y título");
      return;
    }
    if (!/^[a-z0-9-]{2,40}$/.test(id)) {
      toast.error("El identificador solo puede tener letras, números y guiones");
      return;
    }
    if (isNew && takenIds.includes(id)) {
      toast.error("Ya existe un drop con ese identificador");
      return;
    }
    setBusy("save");
    const camp = await db.from("campaigns").upsert({ id, artist: f.artist.trim(), title: f.title.trim(), status: f.status });
    if (camp.error) {
      setBusy(null);
      toast.error("No se pudo guardar el drop: " + camp.error.message);
      return;
    }
    const row = {
      campaign_id: id,
      kind: f.kind,
      tagline: f.tagline.trim(),
      description: f.description.trim(),
      dates: f.dates.trim(),
      fandom: f.fandom.trim(),
      cover_url: f.cover_url || null,
      hero_url: f.hero_url || null,
      album_url: f.album_url || null,
      theme: f.theme,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    const cont = await db.from("drop_content").upsert(row);
    setBusy(null);
    if (cont.error) {
      toast.error("Se guardó el drop pero no su contenido: " + cont.error.message);
      return;
    }
    toast.success(isNew ? "Drop creado" : "Cambios guardados");
    await refresh();
    await onSaved(id);
  }
  const previewImg = f.hero_url || catalog?.hero;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-5 rounded-3xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: isNew ? "Nuevo drop" : `Editar: ${campaign?.title}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Artista", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.artist, onChange: (e) => set("artist", e.target.value), placeholder: "Ej: Airbag" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Título del drop", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.title, onChange: (e) => set("title", e.target.value), placeholder: "Ej: El Club de la Pelea I" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: inputCls, value: f.kind, onChange: (e) => set("kind", e.target.value), children: Object.keys(KIND_LABEL).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: KIND_LABEL[k] }, k)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Estado", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: inputCls, value: f.status, onChange: (e) => set("status", e.target.value), children: STATUS_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Frase corta", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.tagline, onChange: (e) => set("tagline", e.target.value), placeholder: "Aparece debajo del título" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fechas / lugar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.dates, onChange: (e) => set("dates", e.target.value), placeholder: "Ej: En curso · Teatro Vorterix" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre del fandom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.fandom, onChange: (e) => set("fandom", e.target.value), placeholder: "Ej: Primas" }) }),
      isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Identificador (para el link)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.id, onChange: (e) => set("id", slugify(e.target.value)), placeholder: slugify(`${f.artist}-${f.title}`) || "se arma solo" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Descripción", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: `${inputCls} min-h-24`, value: f.description, onChange: (e) => set("description", e.target.value), placeholder: "Qué van a encontrar los fans en este drop" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: labelCls, children: "Fotos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-3", children: IMAGE_FIELDS.map((fld) => {
        const current = f[fld.key] || (fld.key === "hero_url" ? catalog?.hero : fld.key === "cover_url" ? catalog?.cover : catalog?.album);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block cursor-pointer rounded-2xl border border-dashed border-border p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-2 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-muted", children: busy === fld.key ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }) : current ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: current, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-bold", children: fld.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] text-muted-foreground", children: fld.hint }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => void upload(fld.key, e.target.files?.[0]) })
        ] }, fld.key);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: labelCls, children: "Estética del drop" }),
      !hasTheme && !isNew && catalog ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs text-muted-foreground", children: "Este drop usa la estética armada a mano. Si cambiás algo acá, la reemplazás." }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Color, { label: "Fondo", value: f.theme.background ?? (f.theme.light ? "#f7f5f2" : "#141414"), onChange: (v) => setTheme({ background: v }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Color, { label: "Color principal", value: f.theme.primary ?? "#ef4203", onChange: (v) => setTheme({ primary: v }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Color, { label: "Color secundario", value: f.theme.accent ?? f.theme.primary ?? "#ef4203", onChange: (v) => setTheme({ accent: v }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipografía de títulos", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: inputCls, value: f.theme.font ?? "Bricolage Grotesque", onChange: (e) => setTheme({ font: e.target.value }), children: FONT_OPTIONS.map((font) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: font, style: { fontFamily: font }, children: font }, font)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!f.theme.light, onChange: (e) => setTheme({ light: e.target.checked }) }),
          " Tema claro"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!f.theme.uppercase, onChange: (e) => setTheme({ uppercase: e.target.checked }) }),
          " Títulos en mayúsculas"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: themeCss(id || "preview", f.theme, ".drop-preview") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drop-preview mt-4 overflow-hidden rounded-2xl border", style: { background: "var(--background)", color: "var(--foreground)", borderColor: "var(--border)" }, children: [
        previewImg && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewImg, alt: "", className: "h-36 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", style: { backgroundImage: "var(--gradient-glow)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold", style: { color: "var(--primary)" }, children: [
            f.artist || "Artista",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 rounded-full px-1.5 py-px text-[10px] font-bold uppercase text-white", style: { background: "oklch(0.64 0.21 40)" }, children: KIND_LABEL[f.kind] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl", style: { fontFamily: "var(--font-display)", textTransform: "var(--display-transform)" }, children: f.title || "Título del drop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--muted-foreground)" }, children: f.tagline || "Frase corta del drop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-xl p-3", style: { background: "var(--card)", border: "1px solid var(--border)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full px-4 py-2 text-sm font-bold", style: { backgroundImage: "var(--gradient-drop)", color: "var(--primary-foreground)" }, children: "Entrar al drop" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => void save(), disabled: busy === "save", className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-primary-foreground disabled:opacity-60", children: [
      busy === "save" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
      " ",
      isNew ? "Crear drop" : "Guardar cambios"
    ] }),
    isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Después de crearlo vas a poder sumarle misiones." })
  ] });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: label }),
    children
  ] });
}
function Color({ label, value, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value, onChange: (e) => onChange(e.target.value), className: "h-10 w-12 cursor-pointer rounded-lg border border-border bg-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value, onChange: (e) => /^#[0-9a-f]{0,6}$/i.test(e.target.value) && onChange(e.target.value) })
  ] }) });
}
const emptyQuestion = () => ({ q: "", options: ["", "", ""], correct: 0 });
const newDraft = (kind) => ({
  kind,
  title: "",
  repeat: "once",
  general: kind === "clue" ? 60 : 100,
  campaign: kind === "clue" ? 120 : 200,
  questions: kind === "trivia" ? [emptyQuestion()] : [],
  answer: ""
});
const KIND_NAME = { trivia: "Trivia", clue: "Acertijo", order: "Ordenar", stream: "Escuchar", scan: "QR", ar: "Realidad aumentada" };
function MissionsEditor({ campaignId }) {
  const { refresh } = useDropAuth();
  const [missions, setMissions] = reactExports.useState([]);
  const [draft, setDraft] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  async function load() {
    const { data } = await db.from("missions").select("*").eq("campaign_id", campaignId).order("id");
    setMissions(data ?? []);
  }
  reactExports.useEffect(() => {
    void load();
  }, [campaignId]);
  async function edit(m) {
    if (m.kind !== "trivia" && m.kind !== "clue") {
      toast.message("Este tipo de misión todavía no se edita desde el panel.");
      return;
    }
    const { data } = await db.from("mission_validation_rules").select("rules").eq("mission_id", m.id).maybeSingle();
    const rules = data?.rules ?? {};
    if (rules.rounds) {
      toast.message("El Juego del día rota formatos y todavía no se edita desde el panel.");
      return;
    }
    setDraft({
      id: m.id,
      kind: m.kind,
      title: m.title,
      repeat: m.repeat_period,
      general: m.general_reward,
      campaign: m.campaign_reward,
      questions: rules.pool ?? rules.questions ?? [emptyQuestion()],
      answer: (rules.codes ?? []).join(", ")
    });
  }
  async function toggle(m) {
    const status = m.status === "verified" ? "pending" : "verified";
    const { error } = await db.from("missions").update({ status }).eq("id", m.id);
    if (error) {
      toast.error("No se pudo cambiar");
      return;
    }
    toast.success(status === "verified" ? "Misión visible para los fans" : "Misión oculta");
    await load();
    await refresh();
  }
  async function save(d) {
    if (!d.title.trim()) {
      toast.error("Poné un título");
      return;
    }
    let rules;
    if (d.kind === "trivia") {
      const qs = d.questions.map((q) => ({ q: q.q.trim(), options: q.options.map((o) => o.trim()).filter(Boolean), correct: q.correct }));
      if (!qs.length || qs.some((q) => !q.q || q.options.length < 2 || q.correct >= q.options.length)) {
        toast.error("Cada pregunta necesita texto, al menos 2 opciones y la correcta marcada");
        return;
      }
      rules = d.repeat === "daily" && qs.length > 5 ? { per_round: 5, pool: qs } : { questions: qs };
    } else {
      const codes = d.answer.split(",").map((c) => c.trim().toLowerCase()).filter(Boolean);
      if (!codes.length) {
        toast.error("Escribí la respuesta del acertijo");
        return;
      }
      rules = { codes };
    }
    let id = d.id;
    if (!id) {
      const base = `${campaignId}-${slugify(d.title)}`.slice(0, 60);
      id = base;
      let n2 = 2;
      while (missions.some((m2) => m2.id === id)) id = `${base}-${n2++}`;
    }
    setBusy(true);
    const mission = {
      id,
      campaign_id: campaignId,
      title: d.title.trim(),
      kind: d.kind,
      status: "verified",
      general_reward: clamp(d.general),
      campaign_reward: clamp(d.campaign),
      repeat_period: d.kind === "trivia" ? d.repeat : "once",
      max_checks: d.kind === "clue" ? 3 : 1,
      question_seconds: 20
    };
    const m = await db.from("missions").upsert(mission);
    const r = m.error ? m : await db.from("mission_validation_rules").upsert({ mission_id: id, rules });
    setBusy(false);
    if (r.error) {
      toast.error("No se pudo guardar la misión: " + r.error.message);
      return;
    }
    toast.success(d.id ? "Misión actualizada" : "Misión creada");
    setDraft(null);
    await load();
    await refresh();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-3xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Misiones" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDraft(newDraft("trivia")), className: "inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Trivia"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDraft(newDraft("clue")), className: "inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Acertijo"
        ] })
      ] })
    ] }),
    missions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Este drop todavía no tiene misiones." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: missions.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 rounded-2xl border border-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-bold", children: m.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          KIND_NAME[m.kind] ?? m.kind,
          m.repeat_period === "daily" ? " · diaria" : "",
          " · +",
          m.campaign_reward,
          " pts del drop · ",
          m.status === "verified" ? "visible" : "oculta"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void edit(m), "aria-label": "Editar", className: "rounded-full p-2 hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void toggle(m), "aria-label": m.status === "verified" ? "Ocultar" : "Mostrar", className: "rounded-full p-2 hover:bg-muted", children: m.status === "verified" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" }) })
    ] }, m.id)) }),
    draft && /* @__PURE__ */ jsxRuntimeExports.jsx(DraftForm, { draft, setDraft, busy, onSave: () => void save(draft) })
  ] });
}
const clamp = (n2) => Math.max(0, Math.min(500, Math.round(Number(n2) || 0)));
function DraftForm({ draft: d, setDraft, busy, onSave }) {
  const upd = (patch) => setDraft({ ...d, ...patch });
  const updQ = (i, patch) => upd({ questions: d.questions.map((q, j) => j === i ? { ...q, ...patch } : q) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-2xl border border-primary/50 bg-background/40 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold", children: [
      d.id ? "Editar" : "Nueva",
      " ",
      d.kind === "trivia" ? "trivia" : "acertijo"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Título" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: d.title, onChange: (e) => upd({ title: e.target.value }), placeholder: d.kind === "trivia" ? "Ej: Trivia del disco" : 'Ej: Completá el título: "La nueva…"' })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: [
      d.kind === "trivia" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Se juega" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: inputCls, value: d.repeat, onChange: (e) => upd({ repeat: e.target.value }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "once", children: "Una vez" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "daily", children: "Todos los días" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Puntos del drop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 500, className: inputCls, value: d.campaign, onChange: (e) => upd({ campaign: Number(e.target.value) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Puntos DROP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 500, className: inputCls, value: d.general, onChange: (e) => upd({ general: Number(e.target.value) }) })
      ] })
    ] }),
    d.kind === "clue" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Respuesta secreta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: d.answer, onChange: (e) => upd({ answer: e.target.value }), placeholder: "Ej: violencia" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] text-muted-foreground", children: "No importan mayúsculas. Si ponés varias separadas por coma, el fan tiene que encontrar todas." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      d.repeat === "daily" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Si cargás más de 5 preguntas, cada día salen 5 distintas." }),
      d.questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-xl border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-muted-foreground", children: [
            i + 1,
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: q.q, onChange: (e) => updQ(i, { q: e.target.value }), placeholder: "Pregunta" }),
          d.questions.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => upd({ questions: d.questions.filter((_, j) => j !== i) }), "aria-label": "Borrar pregunta", className: "p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }),
        q.options.map((o, k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 pl-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: `correct-${i}`, checked: q.correct === k, onChange: () => updQ(i, { correct: k }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: o, onChange: (e) => updQ(i, { options: q.options.map((x, j) => j === k ? e.target.value : x) }), placeholder: `Opción ${k + 1}${q.correct === k ? " (correcta)" : ""}` })
        ] }, k))
      ] }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => upd({ questions: [...d.questions, emptyQuestion()] }), className: "inline-flex items-center gap-1 text-sm font-bold text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Agregar pregunta"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Marcá con el círculo cuál es la opción correcta." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onSave, disabled: busy, className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-2.5 font-bold text-primary-foreground disabled:opacity-60", children: [
        busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Guardar misión"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDraft(null), className: "rounded-full border border-border px-4 py-2.5 text-sm font-bold", children: "Cancelar" })
    ] })
  ] });
}
function AdminPanel() {
  const [campaigns, setCampaigns] = reactExports.useState([]);
  const [selected, setSelected] = reactExports.useState(null);
  const content = useDropContent();
  async function load() {
    const { data, error } = await db.from("campaigns").select("*").order("id");
    if (error) {
      toast.error("No pudimos cargar los drops");
      return;
    }
    setCampaigns(data);
  }
  reactExports.useEffect(() => {
    void load();
    void reloadDropContent();
  }, []);
  const current = selected && selected !== "new" ? campaigns.find((c) => c.id === selected) : void 0;
  const label = (s) => STATUS_OPTIONS.find((o) => o.value === s)?.label ?? s;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Drops" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected("new"), className: "inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Nuevo drop"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: campaigns.map((c) => {
        const row = content.find((x) => x.campaign_id === c.id);
        const kind = row?.kind ?? DROP_CATALOG.find((d) => d.id === c.id)?.kind;
        const img = row?.cover_url ?? DROP_CATALOG.find((d) => d.id === c.id)?.cover;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setSelected(c.id),
            className: `flex items-center gap-3 rounded-2xl border p-3 text-left ${selected === c.id ? "border-primary bg-primary/10" : "border-border bg-card"}`,
            children: [
              img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", className: "h-12 w-12 rounded-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-12 w-12 rounded-full bg-muted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-xs font-bold text-primary", children: [
                  c.artist,
                  kind ? ` · ${KIND_LABEL[kind]}` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate font-bold", children: c.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: label(c.status) })
              ] })
            ]
          },
          c.id
        );
      }) })
    ] }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropEditor,
      {
        campaign: current,
        content: current ? content.find((x) => x.campaign_id === current.id) : void 0,
        takenIds: campaigns.map((c) => c.id),
        onSaved: async (id) => {
          await load();
          await reloadDropContent();
          setSelected(id);
        }
      },
      selected
    ),
    current && /* @__PURE__ */ jsxRuntimeExports.jsx(MissionsEditor, { campaignId: current.id }, `m-${current.id}`)
  ] });
}
function AdminPage() {
  const {
    mode,
    user
  } = useDropAuth();
  const isAdmin = useIsDropAdmin(mode === "user" ? user?.id : null);
  const [view, setView] = reactExports.useState("drops");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto min-h-screen max-w-3xl px-4 pb-24 pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explorar", className: "inline-flex items-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Volver a la app"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-3xl font-black", children: "Panel de drops" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Solo para administradoras: creá y editá drops, y mirá cómo les va en el dashboard." }),
    mode === "loading" || mode === "user" && isAdmin === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-sm text-muted-foreground", children: "Cargando…" }) : mode !== "user" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Notice, { title: "Entrá con tu cuenta", children: [
      "El panel solo funciona con una cuenta de DROP (no en modo invitado). ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
        mode: "login"
      }, className: "font-bold text-primary underline", children: "Iniciar sesión" })
    ] }) : !isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Notice, { title: "Tu cuenta todavía no es administradora", children: [
      "Pedí que agreguen esta cuenta como admin: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: user?.email })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mt-5 grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card p-1", "aria-label": "Secciones del panel", children: [["drops", "Drops", LayoutGrid], ["dashboard", "Dashboard", ChartColumn]].map(([id, label, Icon]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setView(id), "aria-current": view === id ? "page" : void 0, className: `flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-colors ${view === id ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        label
      ] }, id)) }),
      view === "drops" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPanel, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardView, {}) })
    ] })
  ] });
}
function Notice({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-5 w-5 text-primary" }),
      " ",
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children })
  ] });
}
export {
  AdminPage as component
};
