import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useServerFn, u as useDropAuth } from "./AuthProvider-D2STExXi.mjs";
import { B as Button } from "./button-CcgquRwT.mjs";
import { d as getExternalShows, f as findTicketLink, t as ticketSearchUrl, s as searchCatalog } from "./music.functions-Bv4pKGHS.mjs";
import { u as useDrops, g as eventCrowd } from "./drops-AU8IZz4U.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { p as publishReview, T as Textarea } from "./textarea-BmqcdI4C.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-BIGvJYv5.mjs";
import { u as useMusicPlayer } from "./router-BD3aTHI1.mjs";
import { Q as MapPin, a5 as CalendarDays, aj as PenLine, D as Disc3, Y as Music, a6 as Ticket, X, L as LoaderCircle, a1 as Camera, k as ChevronRight, f as Search, ag as Music2, P as Pause, a as Play, p as Star } from "../_libs/lucide-react.mjs";
const CITIES = {
  "buenos aires": { lat: -34.6037, lng: -58.3816 },
  caba: { lat: -34.6037, lng: -58.3816 },
  "la plata": { lat: -34.9214, lng: -57.9545 },
  "mar del plata": { lat: -38.0055, lng: -57.5426 },
  cordoba: { lat: -31.4201, lng: -64.1888 },
  rosario: { lat: -32.9442, lng: -60.6505 },
  "santa fe": { lat: -31.6333, lng: -60.7 },
  mendoza: { lat: -32.8895, lng: -68.8458 },
  tucuman: { lat: -26.8083, lng: -65.2176 },
  "san miguel de tucuman": { lat: -26.8083, lng: -65.2176 },
  salta: { lat: -24.7821, lng: -65.4232 },
  neuquen: { lat: -38.9516, lng: -68.0591 },
  "bahia blanca": { lat: -38.7196, lng: -62.2724 },
  "san juan": { lat: -31.5375, lng: -68.5364 },
  parana: { lat: -31.7413, lng: -60.5115 },
  corrientes: { lat: -27.4806, lng: -58.8341 },
  resistencia: { lat: -27.4606, lng: -58.9839 },
  posadas: { lat: -27.3671, lng: -55.8961 },
  bariloche: { lat: -41.1335, lng: -71.3103 },
  montevideo: { lat: -34.9011, lng: -56.1645 },
  santiago: { lat: -33.4489, lng: -70.6693 },
  asuncion: { lat: -25.2637, lng: -57.5759 },
  lima: { lat: -12.0464, lng: -77.0428 },
  "sao paulo": { lat: -23.5505, lng: -46.6333 },
  "ciudad de mexico": { lat: 19.4326, lng: -99.1332 },
  madrid: { lat: 40.4168, lng: -3.7038 },
  barcelona: { lat: 41.3874, lng: 2.1686 },
  miami: { lat: 25.7617, lng: -80.1918 }
};
const norm$1 = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const DISPLAY = { caba: "Buenos Aires", cordoba: "Córdoba", tucuman: "Tucumán", "san miguel de tucuman": "Tucumán", neuquen: "Neuquén", "bahia blanca": "Bahía Blanca", parana: "Paraná", asuncion: "Asunción", "sao paulo": "São Paulo", "ciudad de mexico": "Ciudad de México" };
const title = (k) => DISPLAY[k] ?? k.replace(/\b\w/g, (c) => c.toUpperCase());
function nearestCity(at) {
  let best = "buenos aires", min = Infinity;
  for (const [k, g] of Object.entries(CITIES)) {
    const d = distanceKm(at, g);
    if (d < min) {
      min = d;
      best = k;
    }
  }
  return title(best);
}
function cityCoords(city) {
  if (!city) return null;
  const name = norm$1(city.split(",")[0] ?? "");
  if (CITIES[name]) return CITIES[name];
  const full = norm$1(city);
  const hit = Object.keys(CITIES).filter((k) => k.length > 4 && full.includes(k)).sort((a, b) => b.length - a.length)[0];
  return hit ? CITIES[hit] : /autonoma|caba\b/.test(full) ? CITIES["buenos aires"] : null;
}
function distanceKm(a, b) {
  const rad = (d) => d * Math.PI / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}
const KEY$1 = "drop-ubicacion";
function readSaved() {
  try {
    const raw = localStorage.getItem(KEY$1);
    const g = raw ? JSON.parse(raw) : null;
    return g && typeof g.lat === "number" && typeof g.lng === "number" ? g : null;
  } catch {
    return null;
  }
}
function useUserLocation() {
  const [location, setLocation] = reactExports.useState(() => typeof window === "undefined" ? null : readSaved());
  const [status, setStatus] = reactExports.useState("idle");
  const request = reactExports.useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unavailable");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const g = { lat: Math.round(pos.coords.latitude * 100) / 100, lng: Math.round(pos.coords.longitude * 100) / 100 };
        try {
          localStorage.setItem(KEY$1, JSON.stringify(g));
        } catch {
        }
        setLocation(g);
        setStatus("idle");
      },
      (err) => setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "unavailable"),
      { enableHighAccuracy: false, timeout: 1e4, maximumAge: 30 * 60 * 1e3 }
    );
  }, []);
  const clear = reactExports.useCallback(() => {
    try {
      localStorage.removeItem(KEY$1);
    } catch {
    }
    setLocation(null);
  }, []);
  return { location, status, request, clear };
}
const CITY_KM = 60;
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
function groupShows(shows) {
  const byKey = /* @__PURE__ */ new Map();
  for (const s of shows) {
    const key = `${norm(s.artist || s.title)}|${norm(s.venue || s.city)}`;
    const date = { id: s.id, date: s.event_date, url: s.url, official: s.official };
    const g = byKey.get(key);
    if (!g) {
      byKey.set(key, { key, show: s, km: s.km, dates: [date] });
      continue;
    }
    if (!g.dates.some((d) => d.date && d.date.slice(0, 10) === s.event_date?.slice(0, 10))) g.dates.push(date);
    if (!g.show.image_url && s.image_url) g.show = { ...g.show, image_url: s.image_url };
  }
  const groups = [...byKey.values()];
  for (const g of groups) g.dates.sort((a, b) => (a.date ?? "9").localeCompare(b.date ?? "9"));
  return groups.sort((a, b) => (a.dates[0].date ?? "9").localeCompare(b.dates[0].date ?? "9"));
}
function useNearbyShows() {
  const fetchShows = useServerFn(getExternalShows);
  const [shows, setShows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const loc = useUserLocation();
  const catalog = useDrops();
  const dropArtists = reactExports.useMemo(() => [...new Set(catalog.map((d) => d.artist))].slice(0, 10), [catalog]);
  const city = loc.location ? nearestCity(loc.location) : "Buenos Aires";
  const center = loc.location ?? cityCoords("Buenos Aires");
  reactExports.useEffect(() => {
    setLoading(true);
    fetchShows({ data: { artists: dropArtists, city, near: center } }).then(setShows).catch(() => setShows([])).finally(() => setLoading(false));
  }, [loc.location, dropArtists.join("|")]);
  const groups = reactExports.useMemo(() => {
    const withKm = shows.map((s) => {
      const at = s.lat != null && s.lng != null ? { lat: s.lat, lng: s.lng } : cityCoords(s.city);
      return { ...s, km: at ? distanceKm(center, at) : null };
    }).filter((s) => s.km != null ? s.km <= CITY_KM : s.area === city);
    return groupShows(withKm);
  }, [shows, city]);
  return { ...loc, shows, groups, city, loading };
}
const fmt = (d, opts) => d ? new Date(d).toLocaleDateString("es-AR", opts) : "A confirmar";
function joinDates(dates) {
  const known = dates.filter((d) => !!d).map((d) => new Date(d));
  if (!known.length) return "A confirmar";
  const month = (d) => d.toLocaleDateString("es-AR", { month: "short" }).replace(".", "");
  const parts = [];
  known.forEach((d, i) => {
    const next = known[i + 1];
    parts.push(next && next.getMonth() === d.getMonth() ? String(d.getDate()) : `${d.getDate()} ${month(d)}`);
  });
  return parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")} y ${parts[parts.length - 1]}`;
}
function useOpenTickets() {
  const find = useServerFn(findTicketLink);
  return async (show, info) => {
    const tab = window.open("about:blank", "_blank");
    const artist = show.artist || show.title;
    const found = await find({ data: { artist, venue: show.venue ?? void 0 } }).catch(() => "");
    const url = found || info || ticketSearchUrl(artist);
    if (tab) tab.location.href = url;
    else window.location.href = url;
  };
}
function ShowCard({ group, showKm, onReview, className = "w-52 shrink-0" }) {
  const { show, dates, km } = group;
  const official = dates.find((d) => d.url && d.official !== false);
  const info = dates.find((d) => d.url && d.official === false);
  const openTickets = useOpenTickets();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: `${className} overflow-hidden rounded-2xl border border-border bg-card`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: show.image_url ?? eventCrowd, alt: `Imagen de ${show.title}`, loading: "lazy", className: "h-28 w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-bold", children: show.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: show.artist }),
      dates.length === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
        fmt(dates[0].date, { day: "numeric", month: "numeric", year: "numeric" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs font-semibold text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
          dates.length,
          " fechas"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 inline-block rounded-full border border-border px-2 py-0.5 text-[11px] leading-snug", children: joinDates(dates.map((d) => d.date)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
          show.venue,
          show.city ? ` · ${show.city}` : ""
        ] })
      ] }),
      showKm && km != null && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs font-semibold text-primary", children: km < 1 ? "A menos de 1 km" : `A ${Math.round(km).toLocaleString("es-AR")} km` }),
      official?.url ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "mt-2 w-full text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: official.url, target: "_blank", rel: "noreferrer", children: "Ver entradas" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "mt-2 w-full text-xs", onClick: () => openTickets(show, info?.url), children: "Ver entradas" }),
      !official && info?.url && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: info.url, target: "_blank", rel: "noreferrer", className: "mt-1 block text-center text-[11px] text-muted-foreground underline-offset-2 hover:underline", children: "Más información" }),
      onReview && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "mt-1 h-auto w-full whitespace-normal px-2 py-1.5 text-xs", onClick: () => onReview(show), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3.5 w-3.5 shrink-0" }),
        "Reseñar"
      ] })
    ] })
  ] });
}
function LocationBar({ nearby }) {
  const { location, status, request, clear, city } = nearby;
  if (location) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-3 text-xs text-muted-foreground", children: [
      "Recitales en ",
      city,
      ".",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "font-semibold text-primary underline-offset-2 hover:underline", onClick: clear, children: "Quitar ubicación" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/60 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: status === "denied" ? "No pudimos usar tu ubicación. Activala para DROP en tu navegador." : status === "unavailable" ? "No pudimos obtener tu ubicación. Probá de nuevo." : "Te mostramos recitales en Buenos Aires. Compartí tu ubicación para ver los de tu ciudad." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "shrink-0 text-xs", disabled: status === "loading", onClick: request, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
      status === "loading" ? "Buscando…" : "Usar mi ubicación"
    ] })
  ] });
}
function EmptyShows({ city, loading }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: loading ? "Buscando recitales…" : `No encontramos recitales en ${city}` }),
    !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Cuando haya fechas confirmadas en tu ciudad, aparecen acá." })
  ] });
}
function SeeAllShows() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shows", className: "flex items-center gap-0.5 text-sm font-semibold text-primary hover:underline", children: [
    "Ver más",
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
  ] });
}
async function reviewPhotoFromFile(file) {
  if (!file.type.startsWith("image/")) throw new Error("Elegí una imagen");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1080 / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale), h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  for (const q of [0.72, 0.6, 0.45]) {
    const webp = canvas.toDataURL("image/webp", q);
    const url = webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/jpeg", q);
    if (url.length < 38e4) return url;
  }
  throw new Error("La foto es demasiado pesada");
}
const KEY = "drop-resenas-locales";
let items = null;
const listeners = /* @__PURE__ */ new Set();
function load() {
  if (items) return items;
  try {
    items = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    items = [];
  }
  return items;
}
function saveLocalReview(review, persist) {
  const rest = load().filter((r) => !(r.subject_type === review.subject_type && r.subject_id === review.subject_id && r.user_id === review.user_id));
  items = [review, ...rest];
  if (persist) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items.filter((r) => r.user_id !== "guest")));
    } catch {
    }
  }
  listeners.forEach((l) => l());
}
const EMPTY = [];
function useLocalReviews() {
  return reactExports.useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => typeof window === "undefined" ? EMPTY : load(),
    () => EMPTY
  );
}
function SongSearch({ onPick, placeholder = "Buscá una canción o artista" }) {
  const search = useServerFn(searchCatalog);
  const [q, setQ] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [failed, setFailed] = reactExports.useState(false);
  const [tracks, setTracks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const text = q.trim();
    if (text.length < 2) {
      setTracks([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setFailed(false);
    const t = setTimeout(() => {
      search({ data: { q: text } }).then((r) => {
        if (!cancelled) setTracks(r.tracks.slice(0, 6));
      }).catch(() => {
        if (!cancelled) setFailed(true);
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder, className: "min-w-0 flex-1 bg-transparent text-sm outline-none" }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" })
    ] }),
    failed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "No pudimos buscar en el catálogo. Probá de nuevo." }),
    !loading && !failed && q.trim().length >= 2 && tracks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "No encontramos canciones." }),
    tracks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
      onPick(t);
      setQ("");
      setTracks([]);
    }, className: "flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2 text-left transition-colors hover:border-primary/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.cover, alt: "", loading: "lazy", className: "h-10 w-10 rounded-lg object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-bold", children: t.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-[11px] text-muted-foreground", children: [
          t.artist,
          " · ",
          t.album
        ] })
      ] })
    ] }, t.id))
  ] });
}
function AlbumSearch({ onPick }) {
  const search = useServerFn(searchCatalog);
  const [q, setQ] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [failed, setFailed] = reactExports.useState(false);
  const [albums, setAlbums] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const text = q.trim();
    if (text.length < 2) {
      setAlbums([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setFailed(false);
    const t = setTimeout(() => {
      search({ data: { q: text } }).then((r) => {
        if (!cancelled) setAlbums(r.albums.slice(0, 6));
      }).catch(() => {
        if (!cancelled) setFailed(true);
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscá un álbum o artista", className: "min-w-0 flex-1 bg-transparent text-sm outline-none" }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" })
    ] }),
    failed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "No pudimos buscar en el catálogo. Probá de nuevo." }),
    !loading && !failed && q.trim().length >= 2 && albums.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "No encontramos álbumes." }),
    albums.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
      onPick(a);
      setQ("");
      setAlbums([]);
    }, className: "flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2 text-left transition-colors hover:border-primary/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: a.cover, alt: "", loading: "lazy", className: "h-10 w-10 rounded-lg object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-bold", children: a.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-[11px] text-muted-foreground", children: [
          a.artist,
          a.year ? ` · ${a.year}` : ""
        ] })
      ] })
    ] }, a.id))
  ] });
}
const toReviewSong = (t) => ({ id: t.id, title: t.title, artist: t.artist, cover: t.cover, link: t.link });
function useSongPlayback(song) {
  const player = useMusicPlayer();
  const search = useServerFn(searchCatalog);
  const [loading, setLoading] = reactExports.useState(false);
  const [unavailable, setUnavailable] = reactExports.useState(false);
  const isCurrent = !!song && player.current?.id === song.id;
  const playing = isCurrent && player.playing;
  async function play() {
    if (!song) return;
    if (isCurrent) {
      player.toggle();
      return;
    }
    setLoading(true);
    setUnavailable(false);
    try {
      const r = await search({ data: { q: `${song.artist} ${song.title}`.slice(0, 80) } });
      const t = r.tracks.find((x) => x.id === song.id) ?? r.tracks.find((x) => x.title.toLowerCase() === song.title.toLowerCase()) ?? r.tracks[0];
      if (t?.preview) player.play({ ...t, id: song.id, title: song.title, artist: song.artist, cover: song.cover || t.cover });
      else setUnavailable(true);
    } catch {
      setUnavailable(true);
    } finally {
      setLoading(false);
    }
  }
  return { play, stop: () => {
    if (isCurrent) player.stop();
  }, playing, loading, unavailable };
}
function SongChip({ song, onRemove, autoPlay = false, className = "" }) {
  const pb = useSongPlayback(song);
  reactExports.useEffect(() => {
    if (autoPlay) void pb.play();
    return () => pb.stop();
  }, [song.id, autoPlay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 rounded-full bg-background/80 py-1 pl-1 pr-2 text-xs backdrop-blur ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: song.cover, alt: "", className: "h-7 w-7 rounded-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 truncate font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-3 w-3 shrink-0 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: song.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[10px] text-muted-foreground", children: pb.unavailable ? "Vista previa no disponible" : song.artist })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => void pb.play(), "aria-label": pb.playing ? "Pausar" : "Escuchar", className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground", children: pb.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : pb.playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5" }) }),
    onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onRemove, "aria-label": "Quitar canción", className: "grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
  ] });
}
function StarPicker({ value, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "mb-1 text-sm font-bold", children: "Puntuación" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1", children: [1, 2, 3, 4, 5].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `${v} ${v === 1 ? "estrella" : "estrellas"}`, "aria-pressed": value === v, onClick: () => onChange(v), className: value >= v ? "text-primary" : "text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-6 w-6 ${value >= v ? "fill-current" : ""}` }) }, v)) })
  ] });
}
const input = "h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
function NewReviewDialog({ initialKind = "song", initialShow, shows, onClose, onPublished }) {
  const { mode, profile, user, saveReview } = useDropAuth();
  const publish = useServerFn(publishReview);
  const [kind, setKind] = reactExports.useState(initialKind);
  const [song, setSong] = reactExports.useState(null);
  const [album, setAlbum] = reactExports.useState(null);
  const [show, setShow] = reactExports.useState(initialShow ?? null);
  const [custom, setCustom] = reactExports.useState(false);
  const [customArtist, setCustomArtist] = reactExports.useState("");
  const [customTitle, setCustomTitle] = reactExports.useState("");
  const [venue, setVenue] = reactExports.useState(initialShow ? [initialShow.venue, initialShow.city].filter(Boolean).join(", ") : "");
  const [date, setDate] = reactExports.useState(initialShow?.event_date?.slice(0, 10) ?? "");
  const [photos, setPhotos] = reactExports.useState([]);
  const [bgSong, setBgSong] = reactExports.useState(null);
  const [rating, setRating] = reactExports.useState(0);
  const [text, setText] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [loadingPhotos, setLoadingPhotos] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const pickShow = (s) => {
    setShow(s);
    setCustom(false);
    setVenue([s.venue, s.city].filter(Boolean).join(", "));
    setDate(s.event_date?.slice(0, 10) ?? "");
  };
  async function addPhotos(files) {
    if (!files?.length) return;
    setLoadingPhotos(true);
    const room = 4 - photos.length;
    const next = [];
    for (const f of Array.from(files).slice(0, room)) {
      try {
        next.push(await reviewPhotoFromFile(f));
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "No pudimos cargar la foto");
      }
    }
    if (files.length > room) toast.message("Podés subir hasta 4 fotos por show.");
    setPhotos((p) => [...p, ...next]);
    setLoadingPhotos(false);
    if (fileRef.current) fileRef.current.value = "";
  }
  const showArtist = custom ? customArtist.trim() : show?.artist ?? "";
  const showTitle = custom ? customTitle.trim() : show?.title ?? "";
  const ready = rating > 0 && (kind === "song" ? !!song : kind === "show" ? !!showArtist && !!showTitle : !!album);
  async function submit() {
    if (!ready) return;
    setBusy(true);
    let review;
    if (kind === "album" && album) {
      review = { subject_type: "album", subject_id: `dz-${album.id}`, subject_title: album.title, subject_artist: album.artist, subject_image: album.cover || null, rating, text: text.trim() };
      saveReview(`dz-${album.id}`, { rating, text: text.trim() });
    } else if (kind === "song" && song) {
      review = { subject_type: "song", subject_id: `dz-${song.id}`, subject_title: song.title, subject_artist: song.artist, subject_image: song.cover || null, rating, text: text.trim(), extras: { song } };
    } else {
      const extras = {};
      if (photos.length) extras.photos = photos;
      if (venue.trim()) extras.venue = venue.trim();
      if (date) extras.date = date;
      if (bgSong) extras.song = bgSong;
      const id = custom ? `custom-${slug(`${showArtist} ${showTitle}`)}` : show.id;
      review = { subject_type: "show", subject_id: id.slice(0, 120), subject_title: showTitle, subject_artist: showArtist, subject_image: custom ? null : show?.image_url?.startsWith("http") ? show.image_url : null, rating, text: text.trim(), extras };
    }
    const full = { ...review, id: `local-${Date.now()}`, user_id: mode === "user" ? user?.id ?? "me" : "guest", author_name: profile.display_name || "vos", created_at: (/* @__PURE__ */ new Date()).toISOString() };
    if (mode === "user") {
      try {
        await publish({ data: { ...review, subject_image: review.subject_image, extras: review.extras ?? void 0 } });
        toast.success("¡Reseña publicada!");
      } catch {
        saveLocalReview(full, true);
        toast.success("Reseña guardada", { description: "Por ahora se ve solo en este dispositivo." });
      }
    } else {
      saveLocalReview(full, false);
      toast.success("Reseña guardada", { description: "En modo invitado no se publica para la comunidad." });
    }
    setBusy(false);
    onPublished(full);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => {
    if (!o) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-md flex-col gap-5 overflow-y-auto overflow-x-hidden rounded-2xl [&>*]:min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Escribir una reseña" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Contale a la comunidad qué te pareció." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1 rounded-xl border border-border bg-card p-1", role: "tablist", "aria-label": "Qué querés reseñar", children: [["album", "Álbum", Disc3], ["song", "Canción", Music], ["show", "Show", Ticket]].map(([id, label, Icon]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        role: "tab",
        "aria-selected": kind === id,
        onClick: () => setKind(id),
        className: `flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold ${kind === id ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
          label
        ]
      },
      id
    )) }),
    kind === "album" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "¿Qué álbum?" }),
      album ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border bg-card p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: album.cover, alt: "", className: "h-12 w-12 rounded-lg object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-bold", children: album.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-[11px] text-muted-foreground", children: [
            album.artist,
            album.year ? ` · ${album.year}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setAlbum(null), "aria-label": "Cambiar álbum", className: "grid h-7 w-7 place-items-center rounded-full text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AlbumSearch, { onPick: setAlbum })
    ] }),
    kind === "song" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "¿Qué canción?" }),
      song ? /* @__PURE__ */ jsxRuntimeExports.jsx(SongChip, { song, onRemove: () => setSong(null), className: "border border-border" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SongSearch, { onPick: (t) => setSong(toReviewSong(t)) })
    ] }),
    kind === "show" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-bold", children: "¿A qué show fuiste?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 overflow-x-auto pb-1", children: [
          shows.slice(0, 12).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => pickShow(s), "aria-pressed": !custom && show?.id === s.id, className: `w-36 shrink-0 overflow-hidden rounded-xl border text-left text-xs transition-colors ${!custom && show?.id === s.id ? "border-primary ring-1 ring-primary" : "border-border bg-card"}`, children: [
            s.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.image_url, alt: "", loading: "lazy", className: "h-16 w-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate font-bold", children: s.artist }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[11px] text-muted-foreground", children: s.title }),
              s.event_date && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-muted-foreground", children: new Date(s.event_date).toLocaleDateString("es-AR", { day: "numeric", month: "short" }) })
            ] })
          ] }, s.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            setCustom(true);
            setShow(null);
            setVenue("");
            setDate("");
          }, "aria-pressed": custom, className: `grid w-36 shrink-0 place-items-center rounded-xl border p-2 text-center text-xs ${custom ? "border-primary ring-1 ring-primary" : "border-dashed border-border"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-bold", children: "Otro show" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] text-muted-foreground", children: "Escribilo vos" })
          ] }) })
        ] }),
        custom && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: customArtist, onChange: (e) => setCustomArtist(e.target.value), maxLength: 120, placeholder: "Artista", className: input }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: customTitle, onChange: (e) => setCustomTitle(e.target.value), maxLength: 150, placeholder: "Nombre del show o gira", className: input })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_9rem] gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold", children: [
          "Lugar",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative mt-1 block min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: venue, onChange: (e) => setVenue(e.target.value), maxLength: 160, placeholder: "Estadio, ciudad", className: `${input} pl-9` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold", children: [
          "Fecha",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: `${input} mt-1 block` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-xs font-semibold", children: [
          "Fotos ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(hasta 4)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2", children: [
          photos.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p, alt: `Foto ${i + 1}`, className: "h-full w-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Quitar foto", onClick: () => setPhotos((list) => list.filter((_, j) => j !== i)), className: "absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
          ] }, i)),
          photos.length < 4 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => fileRef.current?.click(), className: "grid aspect-square place-items-center rounded-xl border border-dashed border-border text-muted-foreground", "aria-label": "Subir fotos", children: loadingPhotos ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-5 w-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", multiple: true, hidden: true, onChange: (e) => void addPhotos(e.target.files) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-xs font-semibold", children: [
          "Canción de fondo ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(suena cuando abren tu reseña)" })
        ] }),
        bgSong ? /* @__PURE__ */ jsxRuntimeExports.jsx(SongChip, { song: bgSong, onRemove: () => setBgSong(null), className: "border border-border" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SongSearch, { onPick: (t) => setBgSong(toReviewSong(t)), placeholder: showArtist ? `Ej.: ${showArtist}` : "Buscá la canción" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StarPicker, { value: rating, onChange: setRating }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "nueva-resena", className: "text-sm font-bold", children: [
          "Reseña ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(opcional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "nueva-resena", value: text, onChange: (e) => setText(e.target.value), maxLength: 1e3, rows: 3, className: "mt-1", placeholder: kind === "show" ? "¿Cómo estuvo el show?" : kind === "album" ? "¿Qué te pareció el álbum?" : "¿Qué te pareció la canción?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !ready || busy, onClick: () => void submit(), className: "h-11", children: [
        busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }),
        "Publicar reseña"
      ] }),
      !ready && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "-mt-2 text-center text-[11px] text-muted-foreground", children: kind === "album" && !album ? "Elegí un álbum y puntualo." : kind === "song" && !song ? "Elegí una canción y puntuala." : kind === "show" && !(showArtist && showTitle) ? "Elegí el show y puntualo." : "Poné una puntuación para publicar." })
    ] })
  ] }) });
}
export {
  EmptyShows as E,
  LocationBar as L,
  NewReviewDialog as N,
  SeeAllShows as S,
  useNearbyShows as a,
  ShowCard as b,
  SongChip as c,
  joinDates as j,
  useLocalReviews as u
};
