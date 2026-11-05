import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { c as createRouter, a as createRootRouteWithContext, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { K as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-DF_91HGC.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CXcR5xht.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { P as Pause, a as Play, S as SkipForward, X, H as House, T as Target, b as Trophy, U as Users } from "../_libs/lucide-react.mjs";
import { o as objectType, r as recordType, u as unionType, s as stringType, n as numberType, a as arrayType, e as enumType, b as booleanType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";

import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

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

import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




function useServerFn(serverFn) {
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-Bi5q-zia.css";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getDropState = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("0282cb30ac3d9a0c6fdc29fccd2150591b518ac68ad6d46d2f846c7a83b82204"));
const missionAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  action: enumType(["start", "answer", "check"]),
  payload: recordType(unionType([stringType(), numberType(), arrayType(numberType())]))
}).parse(input)).handler(createSsrRpc("672ca852e924c795e9c5f7c87461a501218d2d415283046631b40cfb30f21f0b"));
const pointsAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  action: enumType(["album", "redeem"]),
  payload: recordType(unionType([stringType(), booleanType()]))
}).parse(input)).handler(createSsrRpc("b693e632df351f79af665d6f3a4e38bd61d59d8d309969c9fec1dc129ccea2e0"));
const getRanking = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  campaign: stringType().min(1),
  scope: enumType(["Global", "Amigos", "Semanal"])
}).parse(input)).handler(createSsrRpc("013869ca50bc89563524db78e408d569fd1e9a22d8182c34bd19298094e3dbaa"));
const followFan = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  follow: booleanType()
}).parse(input)).handler(createSsrRpc("c5f12bfbb684a44cd15bc28e4d78d85b20008334d836acbc46c80f5f0e6158d1"));
const emptyDropState = { profile: null, campaigns: [], missions: [], balances: [], attempts: [], movements: [], rewards: [], redemptions: [] };
const guestProfile = {
  id: "guest",
  display_name: "@invitado",
  avatar_url: null,
  favorite_artists: ["LALI", "María Becerra", "TINI"],
  listened_albums: [],
  general_points: 0,
  active_drop: "lali",
  ranking_points: {},
  created_at: "2026-01-01T00:00:00Z",
  username: null,
  bio: null
};
const GUEST_KEY = "drop-invitado";
const EDITABLE = ["display_name", "avatar_url", "favorite_artists", "active_drop", "username", "bio"];
const AuthContext = reactExports.createContext(null);
function AuthProvider({ children }) {
  const fetchState = useServerFn(getDropState);
  const operatePoints = useServerFn(pointsAction);
  const [state, setState] = reactExports.useState(emptyDropState);
  const [revision, setRevision] = reactExports.useState(0);
  const [mode, setMode] = reactExports.useState("loading");
  const [user, setUser] = reactExports.useState(null);
  const [profile, setProfile] = reactExports.useState(guestProfile);
  const [reviews, setReviews] = reactExports.useState({});
  const [customAlbums, setCustomAlbums] = reactExports.useState([]);
  const guestActive = reactExports.useRef(false);
  const inflight = reactExports.useRef(null);
  function loadProfile(u, dedupe = false) {
    if (dedupe && inflight.current?.id === u.id) return inflight.current.promise;
    const promise = doLoadProfile(u).finally(() => {
      if (inflight.current?.promise === promise) inflight.current = null;
    });
    inflight.current = { id: u.id, promise };
    return promise;
  }
  async function doLoadProfile(u) {
    try {
      const data = await fetchState();
      if (guestActive.current) return;
      if (!data.profile || data.profile.id !== u.id) {
        toast.error("Tu cuenta necesita revisión: falta el perfil.");
        setMode("signed_out");
        return;
      }
      setState(data);
      setProfile((p) => ({ ...data.profile, listened_albums: [...data.profile?.listened_albums ?? [], ...p.listened_albums.filter((id) => id.startsWith("custom-"))] }));
      setRevision((r) => r + 1);
      const { data: saved } = await supabase.from("user_albums").select("album_id,title,artist,year,cover").order("created_at", { ascending: false });
      if (saved) setCustomAlbums((prev) => [...saved.map((a) => ({ id: a.album_id, title: a.title, artist: a.artist, year: a.year, cover: a.cover ?? "" })), ...prev.filter((a) => a.id.startsWith("custom-"))]);
    } catch {
      toast.error("No pudimos cargar tus datos guardados.");
    }
  }
  async function addAlbum(a) {
    if (a.id.startsWith("dz-") && mode === "user" && user) {
      const { error } = await supabase.from("user_albums").upsert({ user_id: user.id, album_id: a.id, title: a.title.slice(0, 200), artist: a.artist.slice(0, 200), year: a.year.slice(0, 4), cover: a.cover || null }, { onConflict: "user_id,album_id", ignoreDuplicates: true });
      if (error) {
        toast.error("No pudimos guardar el álbum en tu biblioteca.");
        return false;
      }
    }
    setCustomAlbums((prev) => prev.some((x) => x.id === a.id) ? prev : [a, ...prev]);
    return true;
  }
  async function loadPublicCatalog() {
    const db = supabase;
    try {
      const [c, m] = await Promise.all([db.from("campaigns").select("*"), db.from("missions").select("*")]);
      if (!guestActive.current) return;
      setState({ ...emptyDropState, campaigns: c.data ?? [], missions: m.data ?? [] });
    } catch {
    }
  }
  async function refresh() {
    if (user && mode === "user") await loadProfile(user);
  }
  reactExports.useEffect(() => {
    const apply = (u, dedupe = false) => {
      if (guestActive.current) return;
      setUser(u);
      if (u) {
        setMode("user");
        void loadProfile(u, dedupe);
        try {
          localStorage.removeItem(GUEST_KEY);
        } catch {
        }
      } else {
        let saved = null;
        try {
          saved = JSON.parse(localStorage.getItem(GUEST_KEY) ?? "null");
        } catch {
          saved = null;
        }
        if (saved?.name) {
          guestActive.current = true;
          setProfile({ ...guestProfile, display_name: saved.name, avatar_url: saved.avatar ?? null });
          setMode("guest");
          void loadPublicCatalog();
          return;
        }
        setMode((m) => m === "guest" ? "guest" : "signed_out");
      }
    };
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED" || event === "INITIAL_SESSION") apply(session?.user ?? null, event === "INITIAL_SESSION" || event === "SIGNED_IN");
    });
    void supabase.auth.getUser().then(({ data }) => apply(data.user, true));
    return () => sub.subscription.unsubscribe();
  }, []);
  async function saveProfile(patch) {
    if (mode !== "user" || !user) {
      setProfile((p) => ({ ...p, ...patch }));
      return true;
    }
    const safe = {};
    for (const key of EDITABLE) if (key in patch) safe[key] = patch[key];
    if (!Object.keys(safe).length) return true;
    const { data, error } = await supabase.from("profiles").update(safe).eq("id", user.id).select("*").single();
    if (error) {
      toast.error("No pudimos guardar tus cambios");
      return false;
    }
    setProfile(data);
    return true;
  }
  async function movePoints(movement, patch) {
    if (movement.reason === "ranking_redeem") {
      toast.error("Los canjes ya no modifican el ranking.");
      return false;
    }
    if (mode !== "user" || !user) {
      setProfile((p) => {
        const ranking = { ...p.ranking_points ?? {} };
        return { ...p, ...patch, general_points: p.general_points, ranking_points: ranking };
      });
      return true;
    }
    if (movement.reference?.startsWith("custom-")) {
      if (patch) setProfile((p) => ({ ...p, listened_albums: patch.listened_albums ?? p.listened_albums }));
      toast.message("Álbum manual guardado solo durante esta sesión; sin puntos reales.");
      return true;
    }
    try {
      await operatePoints({ data: { action: "album", payload: { album_id: movement.reference ?? "", listened: movement.reason === "album_listened" } } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No pudimos registrar tus puntos");
      return false;
    }
    await loadProfile(user);
    return true;
  }
  function saveReview(id, review) {
    if (!profile.listened_albums?.includes(id)) return;
    setReviews((prev) => {
      const next = { ...prev };
      if (review) next[id] = review;
      else delete next[id];
      return next;
    });
  }
  function mergeReviews(map) {
    setReviews((prev) => ({ ...map, ...prev }));
  }
  function resetProfile() {
    setProfile(guestProfile);
    setState(emptyDropState);
    setReviews({});
    setCustomAlbums([]);
  }
  function enterGuest(details) {
    guestActive.current = true;
    resetProfile();
    setUser(null);
    setProfile({ ...guestProfile, display_name: details.name.trim(), avatar_url: details.avatar });
    setMode("guest");
    void loadPublicCatalog();
    try {
      localStorage.setItem(GUEST_KEY, JSON.stringify({ name: details.name.trim(), avatar: details.avatar && details.avatar.length < 9e5 ? details.avatar : null }));
    } catch {
    }
  }
  async function signOut() {
    if (!guestActive.current) await supabase.auth.signOut();
    guestActive.current = false;
    try {
      localStorage.removeItem(GUEST_KEY);
    } catch {
    }
    resetProfile();
    setUser(null);
    setMode("signed_out");
  }
  const value = reactExports.useMemo(
    () => ({ state, refresh, revision, mode, user, profile, saveProfile, movePoints, enterGuest, signOut, resetProfile, reviews, saveReview, mergeReviews, customAlbums, addAlbum }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- las funciones solo leen estos valores
    [state, revision, mode, user, profile, reviews, customAlbums, fetchState, operatePoints]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
}
function useDropAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useDropAuth must be used inside AuthProvider");
  return ctx;
}
const PlayerContext = reactExports.createContext(null);
function MusicPlayerProvider({ children }) {
  const audio = reactExports.useRef(null);
  const [queue, setQueue] = reactExports.useState([]);
  const [current, setCurrent] = reactExports.useState(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const start = reactExports.useCallback((track) => {
    if (!audio.current) audio.current = new Audio();
    const el = audio.current;
    el.src = track.preview;
    setCurrent(track);
    setProgress(0);
    void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);
  const next = reactExports.useCallback(() => {
    setQueue((q) => {
      const idx = current ? q.findIndex((t) => t.id === current.id) : -1;
      const nextTrack = q[idx + 1];
      if (nextTrack) start(nextTrack);
      else {
        audio.current?.pause();
        setPlaying(false);
      }
      return q;
    });
  }, [current, start]);
  reactExports.useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0);
    const onEnd = () => next();
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    el.addEventListener("pause", onPause);
    el.addEventListener("play", onPlay);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("play", onPlay);
    };
  }, [current, next]);
  const value = reactExports.useMemo(() => ({
    current,
    playing,
    progress,
    play: (track, q) => {
      if (current?.id === track.id && audio.current) {
        if (audio.current.paused) void audio.current.play();
        else audio.current.pause();
        return;
      }
      setQueue(q && q.length ? q.filter((t) => t.preview) : [track]);
      start(track);
    },
    toggle: () => {
      const el = audio.current;
      if (!el) return;
      if (el.paused) void el.play();
      else el.pause();
    },
    next,
    stop: () => {
      audio.current?.pause();
      setCurrent(null);
      setPlaying(false);
    }
  }), [current, playing, progress, start, next]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PlayerContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(MiniPlayer, {})
  ] });
}
function useMusicPlayer() {
  const ctx = reactExports.useContext(PlayerContext);
  if (!ctx) throw new Error("useMusicPlayer fuera de MusicPlayerProvider");
  return ctx;
}
function MiniPlayer() {
  const ctx = reactExports.useContext(PlayerContext);
  if (!ctx?.current) return null;
  const { current, playing, progress, toggle, next, stop } = ctx;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 bottom-[88px] z-40 mx-auto w-full max-w-[440px] px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-card/95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-2", children: [
      current.cover && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: current.cover, alt: "", className: "h-10 w-10 shrink-0 rounded-lg object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-bold", children: current.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
          current.artist,
          " · vista previa"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": playing ? "Pausar" : "Reproducir", onClick: toggle, className: "grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground", children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Siguiente", onClick: next, className: "grid h-9 w-9 place-items-center rounded-full text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Cerrar reproductor", onClick: stop, className: "grid h-9 w-9 place-items-center rounded-full text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary", style: { width: `${progress * 100}%` } }) })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Página no encontrada" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "La página que buscás no existe o se movió." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Volver al inicio"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "No pudimos cargar esta página" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Algo salió mal de nuestro lado. Probá de nuevo o volvé al inicio." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Reintentar"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Volver al inicio"
        }
      )
    ] })
  ] }) });
}
const Route$c = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#161616" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "DROP" },
      { title: "DROP · La experiencia musical interactiva" },
      { name: "description", content: "DROP convierte el lanzamiento de un álbum en una búsqueda del tesoro: misiones, ranking, comunidad y listening party exclusivo." },
      { name: "author", content: "DROP" },
      { property: "og:title", content: "DROP · La experiencia musical interactiva" },
      { property: "og:description", content: "DROP convierte el lanzamiento de un álbum en una búsqueda del tesoro: misiones, ranking, comunidad y listening party exclusivo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "DROP · La experiencia musical interactiva" },
      { name: "twitter:description", content: "DROP convierte el lanzamiento de un álbum en una búsqueda del tesoro: misiones, ranking, comunidad y listening party exclusivo." }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Anton&family=Bebas+Neue&family=Archivo+Black&family=DM+Serif+Display&family=Space+Mono:wght@700&family=Permanent+Marker&family=Covered+By+Your+Grace&family=Alfa+Slab+One&family=Rubik+Dirt&family=Special+Elite&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Syne:wght@700;800&display=swap" },
      { rel: "apple-touch-icon", href: "/icon-192.png" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "es", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$c.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MusicPlayerProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center" })
  ] });
}
const $$splitComponentImporter$b = () => import("./index-CzucouBm.mjs");
const Route$b = createFileRoute()({
  head: () => ({
    meta: [{
      title: "DROP · Tu música suma"
    }, {
      name: "description",
      content: "Participá en experiencias de artistas, registrá los álbumes que escuchaste y convertí tu actividad musical en puntos."
    }, {
      property: "og:title",
      content: "DROP · Tu música suma"
    }, {
      property: "og:description",
      content: "Experiencias, álbumes y puntos para vivir la música con otros fans."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./actividad-CAvKm_0H.mjs");
const Route$a = createFileRoute()({
  head: () => ({
    meta: [{
      title: "DROP · Actividad"
    }, {
      name: "description",
      content: "Tu historial verificado en DROP: movimientos de puntos, misiones y recompensas."
    }, {
      property: "og:title",
      content: "DROP · Actividad"
    }, {
      property: "og:description",
      content: "Tu historial verificado en DROP."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin-CyO7OpDe.mjs");
const Route$9 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Panel de drops · DROP"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./auth-B9qFedap.mjs");
const Route$8 = createFileRoute()({
  validateSearch: (search) => ({
    mode: search.mode === "signup" ? "signup" : "login"
  }),
  head: () => ({
    meta: [{
      title: "Entrá a DROP · Tu cuenta"
    }, {
      name: "description",
      content: "Iniciá sesión o creá tu cuenta DROP con tu email."
    }, {
      property: "og:title",
      content: "Entrá a DROP"
    }, {
      property: "og:description",
      content: "Tu cuenta para vivir experiencias musicales."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./bienvenida-D1fcnltm.mjs");
const Route$7 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Bienvenida a DROP · Cómo ganar puntos"
    }, {
      name: "description",
      content: "Descubrí cómo participar en drops, completar misiones y ganar puntos con tus álbumes."
    }, {
      property: "og:title",
      content: "Bienvenida a DROP"
    }, {
      property: "og:description",
      content: "Conocé tu recorrido musical y los puntos DROP."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const DROP_TABS = ["inicio", "misiones", "ranking", "comunidad"];
const items = [
  { tab: "inicio", label: "Inicio", icon: House },
  { tab: "misiones", label: "Misiones", icon: Target },
  { tab: "ranking", label: "Ranking", icon: Trophy },
  { tab: "comunidad", label: "Comunidad", icon: Users }
];
function DropNav({ tab, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[440px] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-1 rounded-3xl border border-border bg-card/90 p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl", children: items.map(({ tab: t, label, icon: Icon }) => {
    const active = t === tab;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onChange(t),
        "aria-current": active ? "page" : void 0,
        className: cn("flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium transition-colors", active ? "text-foreground" : "text-muted-foreground"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn("grid h-9 w-9 place-items-center rounded-xl transition-all", active && "text-primary-foreground shadow-[var(--shadow-glow)]"),
              style: active ? { backgroundImage: "var(--gradient-drop)" } : void 0,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-none", children: label })
        ]
      },
      t
    );
  }) }) });
}
const $$splitComponentImporter$6 = () => import("./drop-z_pT1MjU.mjs");
const toTab = (t) => DROP_TABS.includes(t) ? t : t === "mapa" || t === "pasaporte" ? "inicio" : void 0;
const Route$6 = createFileRoute()({
  validateSearch: (search) => ({
    d: typeof search.d === "string" && /^[a-z0-9-]{1,40}$/.test(search.d) ? search.d : void 0,
    tab: toTab(search.tab)
  }),
  head: () => ({
    meta: [{
      title: "DROP · Universo del artista"
    }, {
      name: "description",
      content: "Misiones, juegos, ranking, comunidad y recompensas de cada drop."
    }, {
      property: "og:title",
      content: "DROP · Universo del artista"
    }, {
      property: "og:description",
      content: "Misiones, juegos, ranking, comunidad y recompensas de cada drop."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./explorar-D01NlztX.mjs");
const Route$5 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "DROP · Explorar"
    }, {
      name: "description",
      content: "Descubrí lanzamientos con DROP activo, opiniones de la comunidad, shows y artistas nuevos."
    }, {
      property: "og:title",
      content: "DROP · Explorar"
    }, {
      property: "og:description",
      content: "Descubrí lanzamientos, reseñas, shows y artistas en DROP."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./invitado-BxkRv85j.mjs");
const Route$4 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "DROP · Ingresar sin cuenta"
    }, {
      name: "description",
      content: "Entrá a DROP con un nombre temporal y una foto opcional, sin crear una cuenta."
    }, {
      property: "og:title",
      content: "DROP · Ingresar sin cuenta"
    }, {
      property: "og:description",
      content: "Explorá DROP con un perfil temporal sin guardar tus datos."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./mi-drop-DwwV_7fj.mjs");
const TABS = ["shows", "resenas", "actividad", "stats", "albumes"];
const Route$3 = createFileRoute()({
  validateSearch: (search) => ({
    tab: TABS.includes(search.tab) ? search.tab : void 0
  }),
  head: () => ({
    meta: [{
      title: "Mi DROP · Tu identidad musical"
    }, {
      name: "description",
      content: "Tu perfil en DROP: colección de drops, reseñas, shows, actividad y estadísticas musicales."
    }, {
      property: "og:title",
      content: "Mi DROP · Tu identidad musical"
    }, {
      property: "og:description",
      content: "Tu colección de drops, reseñas, shows y actividad musical."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./privacidad-Co7llOO7.mjs");
const Route$2 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Política de privacidad · DROP"
    }, {
      name: "description",
      content: "Qué datos usa DROP, para qué y cómo pedir que los borremos."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./reset-password-Dh-FcfQ9.mjs");
const Route$1 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "DROP · Nueva contraseña"
    }, {
      name: "description",
      content: "Elegí una nueva contraseña para tu cuenta DROP."
    }, {
      property: "og:title",
      content: "DROP · Nueva contraseña"
    }, {
      property: "og:description",
      content: "Recuperá el acceso a tu cuenta DROP."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./tienda-D4kcy0hW.mjs");
const Route = createFileRoute()({
  validateSearch: (search) => ({
    a: typeof search.a === "string" && /^[a-z0-9-]{1,60}$/.test(search.a) ? search.a : void 0
  }),
  head: () => ({
    meta: [{
      title: "DROP · Tienda"
    }, {
      name: "description",
      content: "Merch oficial de tus artistas favoritos, con productos exclusivos para los fans del ranking."
    }, {
      property: "og:title",
      content: "DROP · Tienda"
    }, {
      property: "og:description",
      content: "Merch oficial de tus artistas favoritos."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const ActividadRoute = Route$a.update({
  id: "/actividad",
  path: "/actividad",
  getParentRoute: () => Route$c
});
const AdminRoute = Route$9.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$c
});
const AuthRoute = Route$8.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$c
});
const BienvenidaRoute = Route$7.update({
  id: "/bienvenida",
  path: "/bienvenida",
  getParentRoute: () => Route$c
});
const DropRoute = Route$6.update({
  id: "/drop",
  path: "/drop",
  getParentRoute: () => Route$c
});
const ExplorarRoute = Route$5.update({
  id: "/explorar",
  path: "/explorar",
  getParentRoute: () => Route$c
});
const InvitadoRoute = Route$4.update({
  id: "/invitado",
  path: "/invitado",
  getParentRoute: () => Route$c
});
const MiDropRoute = Route$3.update({
  id: "/mi-drop",
  path: "/mi-drop",
  getParentRoute: () => Route$c
});
const PrivacidadRoute = Route$2.update({
  id: "/privacidad",
  path: "/privacidad",
  getParentRoute: () => Route$c
});
const ResetPasswordRoute = Route$1.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$c
});
const TiendaRoute = Route.update({
  id: "/tienda",
  path: "/tienda",
  getParentRoute: () => Route$c
});
const rootRouteChildren = {
  IndexRoute,
  ActividadRoute,
  AdminRoute,
  AuthRoute,
  BienvenidaRoute,
  DropRoute,
  ExplorarRoute,
  InvitadoRoute,
  MiDropRoute,
  PrivacidadRoute,
  ResetPasswordRoute,
  TiendaRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Precarga la pantalla al pasar o tocar un enlace, para que abra casi al instante.
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  DropNav as D,
  Route$6 as R,
  useServerFn as a,
  useMusicPlayer as b,
  cn as c,
  Route$3 as d,
  createSsrRpc as e,
  followFan as f,
  getRanking as g,
  Route as h,
  missionAction as m,
  pointsAction as p,
  router as r,
  useDropAuth as u
};
