import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { N as Navigate, f as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useDropAuth, a as useServerFn, p as pointsAction, g as getRanking } from "./AuthProvider-BxaaxRsy.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-DaoXPc07.mjs";
import { s as searchCatalog } from "./music.functions-CbLy7Yyi.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-BX9u99R4.mjs";
import { I as Input } from "./input-CNvH4LEA.mjs";
import { c as getProfileExtras, d as emptyProfileExtras, A as ALBUMS, u as useAlbumActions, b as AlbumReviewDialog, T as Textarea } from "./albums-79KjWZzr.mjs";
import { P as PHOTOS } from "./fan-avatars-_RI7rXqd.mjs";
import { a as useIsDropAdmin, u as useDrops, e as arjonaCover, s as adelaCover, v as lnvCover, w as airbagCover, o as dillomCover, x as mariaCover, l as laliCover, m as eventCrowd, S as STATUS_LABEL$1 } from "./drops-BnDjI0B8.mjs";
import { A as ArtistLine } from "./ArtistLine-DxIvbQKt.mjs";
import { M as MobileShell, P as PlanCard } from "./MobileShell-h93kE8PA.mjs";
import { d as dropProgress, a as achievements } from "./progress-Bd-N7bnm.mjs";
import { u as useOrders } from "./cart-BtVFNRJP.mjs";
import { G as GlobalNav } from "./GlobalNav-CQJuxCn2.mjs";
import { a as Route$6 } from "./router-B6TVWuQ6.mjs";

import "../_libs/vaul.mjs";
import { L as LoaderCircle, r as UserRound, ae as CalendarDays, y as Pencil, O as Share2, ai as Settings, aj as Image$1, h as UserPlus, o as Star, D as Disc3, Q as Music, ak as MicVocal, Z as Zap, a4 as Ticket, X, K as MapPin, f as Search, w as Plus, A as ArrowRight, c as TicketCheck, e as Check, al as ChevronDown, b as Trophy } from "../_libs/lucide-react.mjs";

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
import "./server-BNE5wpof.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-CUClxfOu.mjs";
import "../_libs/zod.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./drop-logo-negativo-DidhibxV.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tailwind-merge.mjs";
const SONGS_KEY = "drop-canciones-favoritas";
function getFavoriteSongs() {
  try {
    return JSON.parse(localStorage.getItem(SONGS_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function setFavoriteSongs(list) {
  try {
    localStorage.setItem(SONGS_KEY, JSON.stringify(list));
  } catch {
  }
}
function FavoritesPicker({ kind, onClose, onPickArtist, onPickSong }) {
  const search = useServerFn(searchCatalog);
  const [q, setQ] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [failed, setFailed] = reactExports.useState(false);
  const [artists, setArtists] = reactExports.useState([]);
  const [tracks, setTracks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const text = q.trim();
    if (text.length < 2) {
      setArtists([]);
      setTracks([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setFailed(false);
    const t = setTimeout(() => {
      search({ data: { q: text } }).then((r) => {
        if (!cancelled) {
          setArtists(r.artists);
          setTracks(r.tracks);
        }
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
  const isArtist = kind === "artist";
  const empty = q.trim().length >= 2 && !loading && !failed && (isArtist ? artists : tracks).length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => {
    if (!o) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[85dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: isArtist ? "Sumar un artista" : "Sumar una canción" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: isArtist ? "Buscá a tu artista y sumalo a tus favoritos." : "Buscá una canción y sumala a tu perfil." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: q, onChange: (e) => setQ(e.target.value), placeholder: isArtist ? "Nombre del artista" : "Canción o artista", className: "min-w-0 flex-1 bg-transparent text-sm outline-none" }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      failed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-3 text-center text-xs text-muted-foreground", children: "No pudimos buscar en el catálogo. Probá de nuevo en un rato." }),
      empty && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-3 text-center text-xs text-muted-foreground", children: "No encontramos resultados." }),
      isArtist ? artists.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onPickArtist(a), className: "flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: a.picture, alt: "", loading: "lazy", className: "h-11 w-11 rounded-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-bold", children: a.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
            a.fans.toLocaleString("es-AR"),
            " fans"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 text-primary" })
      ] }, a.id)) : tracks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onPickSong(t), className: "flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.cover, alt: "", loading: "lazy", className: "h-11 w-11 rounded-lg object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-bold", children: t.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-[11px] text-muted-foreground", children: [
            t.artist,
            " · ",
            t.album
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 text-primary" })
      ] }, t.id))
    ] })
  ] }) });
}
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}
async function makeStoryImage(d) {
  const c = document.createElement("canvas");
  c.width = 1080;
  c.height = 1920;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  const g = ctx.createLinearGradient(0, 0, 1080, 1920);
  g.addColorStop(0, "#8a1538");
  g.addColorStop(1, "#f0562a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1080, 1920);
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 1240, 1080, 680);
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = "900 120px system-ui, sans-serif";
  ctx.fillText("DROP", 540, 230);
  ctx.font = "600 40px system-ui, sans-serif";
  ctx.globalAlpha = 0.85;
  ctx.fillText("LALI · No vayas a atender cuando el demonio llama", 540, 300, 980);
  ctx.globalAlpha = 1;
  const avatar = d.avatarUrl ? await loadImage(d.avatarUrl) : null;
  ctx.save();
  ctx.beginPath();
  ctx.arc(540, 620, 220, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fill();
  ctx.clip();
  if (avatar) {
    const s = Math.max(440 / avatar.width, 440 / avatar.height);
    ctx.drawImage(avatar, 540 - avatar.width * s / 2, 620 - avatar.height * s / 2, avatar.width * s, avatar.height * s);
  }
  ctx.restore();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.arc(540, 620, 220, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = "900 84px system-ui, sans-serif";
  ctx.fillText(d.name.slice(0, 22), 540, 970);
  ctx.font = "500 44px system-ui, sans-serif";
  ctx.globalAlpha = 0.85;
  ctx.fillText(`@${d.username}`, 540, 1040);
  ctx.globalAlpha = 1;
  const stat = (x, value, label) => {
    ctx.font = "900 110px system-ui, sans-serif";
    ctx.fillText(value, x, 1430);
    ctx.font = "600 38px system-ui, sans-serif";
    ctx.globalAlpha = 0.8;
    ctx.fillText(label, x, 1495);
    ctx.globalAlpha = 1;
  };
  const fmt = (n) => n.toLocaleString("es-AR");
  stat(200, fmt(d.points), "pts generales");
  stat(540, fmt(d.campaignPoints), "pts LALI");
  stat(880, fmt(d.missions), "misiones");
  ctx.font = "700 46px system-ui, sans-serif";
  ctx.fillText("¿Me ganás? Sumate al drop 👇", 540, 1700);
  ctx.font = "500 38px system-ui, sans-serif";
  ctx.globalAlpha = 0.85;
  ctx.fillText(window.location.host, 540, 1770);
  try {
    return await new Promise((resolve) => c.toBlob(resolve, "image/png"));
  } catch {
    return null;
  }
}
async function shareStory(d) {
  let blob = await makeStoryImage(d);
  if (!blob && d.avatarUrl) blob = await makeStoryImage({ ...d, avatarUrl: null });
  if (!blob) {
    toast.error("No pudimos armar la imagen.");
    return;
  }
  const file = new File([blob], "mi-drop.png", { type: "image/png" });
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "Mi DROP", text: "Mirá cómo voy en DROP" });
      return;
    }
  } catch {
    return;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "mi-drop.png";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2e3);
  toast.success("Imagen descargada: subila a tus historias.");
}
async function inviteFriends(name) {
  const url = `${window.location.origin}/?ref=${encodeURIComponent(name)}`;
  const text = "Estoy jugando las misiones del nuevo drop de LALI en DROP. Sumate y competimos en el ranking 🔥";
  try {
    if (navigator.share) await navigator.share({ title: "Sumate a DROP", text, url });
    else {
      await navigator.clipboard.writeText(`${text} ${url}`);
      toast.success("Invitación copiada: pegala donde quieras.");
    }
  } catch {
  }
}
async function avatarFromFile(file) {
  if (!file.type.startsWith("image/")) throw new Error("Elegí una imagen");
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const size = Math.min(256, side);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  canvas.getContext("2d")?.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, size, size);
  bitmap.close();
  const webp = canvas.toDataURL("image/webp", 0.8);
  return webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/jpeg", 0.8);
}
function AddAlbumDialog({ onClose, onAdd, fallbackCover }) {
  const [title, setTitle] = reactExports.useState("");
  const [artist, setArtist] = reactExports.useState("");
  const [year, setYear] = reactExports.useState("");
  const [cover, setCover] = reactExports.useState(null);
  const [manual, setManual] = reactExports.useState(false);
  const [q, setQ] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [searching, setSearching] = reactExports.useState(false);
  const search = useServerFn(searchCatalog);
  reactExports.useEffect(() => {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const t = setTimeout(() => {
      search({ data: { q: q.trim() } }).then((r) => {
        if (!cancelled) setResults(r.albums);
      }).catch(() => {
        if (!cancelled) setResults([]);
      }).finally(() => {
        if (!cancelled) setSearching(false);
      });
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (open) => {
    if (!open) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Agregar álbum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Buscalo en el catálogo y sumalo a tu biblioteca DROP." })
    ] }),
    !manual && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: q, onChange: (e) => setQ(e.target.value), placeholder: "Álbum o artista", className: "min-w-0 flex-1 bg-transparent text-sm outline-none" })
      ] }),
      searching && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Buscando…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "max-h-[50dvh] space-y-1 overflow-y-auto", children: results.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onAdd({ id: `dz-${a.id}`, title: a.title, artist: a.artist, year: a.year, cover: a.cover }), className: "flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: a.cover, alt: "", className: "h-12 w-12 shrink-0 rounded-md object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-bold", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-xs text-muted-foreground", children: [
            a.artist,
            a.year ? ` · ${a.year}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 text-primary" })
      ] }) }, a.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", className: "w-full text-xs", onClick: () => setManual(true), children: "¿No lo encontrás? Cargalo a mano" })
    ] }),
    manual && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: (event) => {
      event.preventDefault();
      if (!title.trim()) return;
      onAdd({ id: `custom-${Date.now()}`, title: title.trim(), artist: artist.trim() || "Artista desconocido", year: year.trim(), cover: cover ?? fallbackCover });
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1 text-sm font-bold", children: [
        "Título",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), maxLength: 80, placeholder: "Nombre del álbum", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1 text-sm font-bold", children: [
        "Artista",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: artist, onChange: (e) => setArtist(e.target.value), maxLength: 60, placeholder: "Ej: LALI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1 text-sm font-bold", children: [
        "Año",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: year, onChange: (e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4)), inputMode: "numeric", placeholder: "2024" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1 text-sm font-bold", children: [
        "Portada ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(opcional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: "image/*", onChange: (e) => {
          const file = e.target.files?.[0];
          if (file) setCover(URL.createObjectURL(file));
        } })
      ] }),
      cover && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: cover, alt: "Vista previa de la portada", className: "mx-auto h-24 w-24 rounded-md object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: !title.trim(), children: "Agregar a mi biblioteca" })
    ] })
  ] }) });
}
function AlbumsSection() {
  const { profile, mode, reviews, mergeReviews, customAlbums, addAlbum } = useDropAuth();
  const listened = profile?.listened_albums ?? [];
  const points = profile?.general_points ?? 0;
  const { saving, toggleListened: onToggle, storeReview } = useAlbumActions();
  const [preparingReview, setPreparingReview] = reactExports.useState(false);
  const [adding, setAdding] = reactExports.useState(false);
  const allAlbums = reactExports.useMemo(() => [...customAlbums, ...ALBUMS], [customAlbums]);
  const [reviewAlbumId, setReviewAlbumId] = reactExports.useState(null);
  const reviewAlbum = allAlbums.find((album) => album.id === reviewAlbumId && listened.includes(album.id));
  const [query, setQuery] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("todos");
  const loadExtras = useServerFn(getProfileExtras);
  reactExports.useEffect(() => {
    if (mode !== "user") return;
    loadExtras().then((extras) => {
      const mine = {};
      for (const r of extras.reviews) if (r.subject_type === "album") mine[r.subject_id] = { rating: r.rating, text: r.text };
      mergeReviews(mine);
    }).catch(() => {
    });
  }, [mode]);
  const visible = reactExports.useMemo(() => allAlbums.filter((album) => {
    const matches = `${album.title} ${album.artist}`.toLowerCase().includes(query.toLowerCase());
    const done = listened.includes(album.id);
    return matches && (filter === "todos" || (filter === "escuchados" ? done : !done));
  }), [allAlbums, filter, listened, query]);
  const albumsCount = allAlbums.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-primary/35 bg-primary/10 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Biblioteca DROP" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-black", children: [
            listened.length,
            " de ",
            albumsCount,
            " escuchados"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-right text-lg font-black", children: [
          points.toLocaleString("es-AR"),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] uppercase text-muted-foreground", children: "pts generales" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary transition-all", style: { width: `${listened.length / albumsCount * 100}%` } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sumá cualquier álbum del catálogo y marcalo como escuchado para ganar 120 puntos." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full rounded-xl", onClick: () => setAdding(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      "Buscar y agregar álbum"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-xl border border-input bg-card px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Buscar en tu biblioteca o en el catálogo", className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: ["todos", "escuchados", "pendientes"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: filter === item ? "default" : "outline", size: "sm", onClick: () => setFilter(item), className: "shrink-0 capitalize", children: item }, item)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("fieldset", { disabled: saving, className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: visible.map((album) => {
      const done = listened.includes(album.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: album.cover, alt: `Portada de ${album.title}`, loading: "lazy", className: "h-full w-full object-cover" }),
          done && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-sm font-black", children: album.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
            album.artist,
            " · ",
            album.year
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: done ? "secondary" : "default", size: "sm", onClick: () => onToggle(album.id), className: "mt-3 w-full rounded-lg px-2 text-[11px]", children: done ? "Escuchado" : album.id.startsWith("custom-") ? "Marcar · sesión" : "Marcar · +120" }),
          reviews[album.id] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs font-bold text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
              reviews[album.id].rating,
              "/5"
            ] }),
            reviews[album.id].text && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-3 break-words text-xs text-muted-foreground", children: reviews[album.id].text })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "mt-2 w-full px-2 text-[11px]", disabled: preparingReview, onClick: async () => {
            if (!done) {
              setPreparingReview(true);
              const saved = await onToggle(album.id);
              setPreparingReview(false);
              if (!saved) return;
            }
            setReviewAlbumId(album.id);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3" }),
            reviews[album.id] ? "Editar opinión" : "Puntuar y reseñar"
          ] })
        ] })
      ] }, album.id);
    }) }) }),
    visible.length === 0 && query.trim().length < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-12 text-center text-sm text-muted-foreground", children: "No encontramos álbumes con ese filtro." }),
    query.trim().length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(CatalogAlbumHits, { query, onAdd: async (album) => {
      if (await addAlbum(album)) {
        setQuery("");
        setFilter("todos");
        toast.success("Álbum sumado a tu biblioteca", { description: "Ya podés marcarlo como escuchado y reseñarlo." });
      }
    }, exclude: allAlbums.map((a) => a.id) }),
    reviewAlbum && /* @__PURE__ */ jsxRuntimeExports.jsx(AlbumReviewDialog, { album: reviewAlbum, review: reviews[reviewAlbum.id], onClose: () => setReviewAlbumId(null), onSave: (review) => {
      storeReview(reviewAlbum, review);
      setReviewAlbumId(null);
    } }, reviewAlbum.id),
    adding && /* @__PURE__ */ jsxRuntimeExports.jsx(AddAlbumDialog, { fallbackCover: laliCover.url, onClose: () => setAdding(false), onAdd: async (album) => {
      if (!await addAlbum(album)) return;
      setAdding(false);
      setFilter("todos");
      setQuery("");
      toast.success("Álbum agregado", { description: album.id.startsWith("dz-") ? "Ya podés marcarlo como escuchado y reseñarlo." : "Álbum manual de esta sesión · sin puntos reales." });
    } })
  ] });
}
function CatalogAlbumHits({ query, onAdd, exclude }) {
  const search = useServerFn(searchCatalog);
  const [hits, setHits] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    setHits(null);
    setError(false);
    const t = setTimeout(() => {
      search({ data: { q: query.trim() } }).then((r) => {
        if (!cancelled) setHits(r.albums);
      }).catch(() => {
        if (!cancelled) setError(true);
      });
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);
  const list = (hits ?? []).filter((a) => !exclude.includes(`dz-${a.id}`)).slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Del catálogo · tocá para sumar" }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No pudimos buscar en el catálogo. Probá de nuevo en un rato." }) : hits === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Buscando…" }) : list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No hay más álbumes con ese nombre." }) : list.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onAdd({ id: `dz-${a.id}`, title: a.title, artist: a.artist, year: a.year, cover: a.cover }), className: "flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: a.cover, alt: "", loading: "lazy", className: "h-12 w-12 shrink-0 rounded-lg object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-bold", children: a.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-xs text-muted-foreground", children: [
          a.artist,
          a.year ? ` · ${a.year}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 shrink-0 text-primary" })
    ] }, a.id))
  ] });
}
function RewardsRedeem() {
  const { state, refresh, mode, profile } = useDropAuth();
  const redeem = useServerFn(pointsAction);
  const [redeeming, setRedeeming] = reactExports.useState(false);
  const generalPoints = profile?.general_points ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TicketCheck, { className: "text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-black", children: "Canjear recompensas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Solo se descuentan puntos generales. Tu puntaje de campaña no cambia." })
      ] })
    ] }),
    state.rewards.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No hay recompensas habilitadas todavía." }) : state.rewards.map((r) => {
      const owned = state.redemptions.some((x) => x.reward_id === r.id);
      const missing = Math.max(0, r.cost - generalPoints);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "mt-2 h-auto w-full justify-between gap-3 whitespace-normal px-4 py-3 text-left",
          disabled: redeeming || mode !== "user" || missing > 0 || owned,
          onClick: async () => {
            setRedeeming(true);
            try {
              await redeem({ data: { action: "redeem", payload: { reward_id: r.id } } });
              await refresh();
              toast.success("Recompensa registrada");
            } catch (e) {
              toast.error(e instanceof Error ? e.message : "No pudimos canjear");
            } finally {
              setRedeeming(false);
            }
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 break-words text-sm font-bold leading-snug", children: r.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-full bg-black/20 px-2.5 py-1 text-xs font-black", children: owned ? "Canjeada" : `${r.cost} pts` })
          ]
        },
        r.id
      );
    }),
    state.redemptions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 break-words text-xs font-bold leading-snug", children: [
      r.title,
      " · obtenida el ",
      new Date(r.created_at).toLocaleDateString("es-AR")
    ] }, r.id))
  ] });
}
function DropSelector() {
  const ORDER = { active: 0, upcoming: 1, archived: 2 };
  const drops = [...useDrops()].sort((a, b) => ORDER[a.status] - ORDER[b.status]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "elegir-drop", className: "scroll-mt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-lg font-black", children: "Todos los drops" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: drops.map((drop) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex items-start gap-3 rounded-lg border border-border bg-card p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: drop.status === "archived" ? drop.album : drop.cover, alt: `Portada de ${drop.title}`, className: "h-16 w-16 shrink-0 rounded-md object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistLine, { drop }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-snug text-muted-foreground", children: drop.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-primary", children: STATUS_LABEL$1[drop.status] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: drop.status === "active" ? "default" : "outline", className: "mt-2 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/drop", search: { d: drop.id }, children: [
          drop.status === "archived" ? "Revisitar" : "Entrar al drop",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
        ] }) })
      ] })
    ] }, drop.id)) })
  ] });
}
const WEEK_MS = 7 * 24 * 60 * 60 * 1e3;
function DropStatsSection({ progress }) {
  const { mode } = useDropAuth();
  const mine = progress.filter((p) => p.participating).sort((a, b) => b.score - a.score);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "perfil-por-drop", className: "mt-7 scroll-mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Tus fandoms" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Puntos por drop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Cada drop tiene su propio puntaje y ranking. Tocá uno para ver el detalle." })
    ] }),
    mine.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Todavía no sumaste puntos en ningún drop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Jugá las misiones de un drop y acá vas a ver tus puntos, tu puesto y tu avance." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/explorar", children: "Elegir un drop" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: mine.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DropStatCard, { p, canRank: mode === "user", defaultOpen: i === 0 }, p.drop.id)) })
  ] });
}
function DropStatCard({ p, canRank, defaultOpen }) {
  const { state, revision } = useDropAuth();
  const fetchRanking = useServerFn(getRanking);
  const [open, setOpen] = reactExports.useState(defaultOpen);
  const [rank, setRank] = reactExports.useState(null);
  const { drop } = p;
  reactExports.useEffect(() => {
    if (!open || !canRank || drop.status === "upcoming") return;
    let alive = true;
    Promise.all([
      fetchRanking({ data: { campaign: drop.id, scope: "Global" } }).catch(() => null),
      fetchRanking({ data: { campaign: drop.id, scope: "Semanal" } }).catch(() => null)
    ]).then(([g, w]) => {
      if (alive) setRank({ global: g?.me?.rank ?? null, weekly: w?.me && w.me.score > 0 ? w.me.rank : null });
    });
    return () => {
      alive = false;
    };
  }, [open, canRank, drop.id, revision]);
  const now = Date.now();
  const movements = state.movements.filter((m) => m.campaign_id === drop.id && m.campaign_delta > 0);
  const weekPoints = movements.filter((m) => now - new Date(m.created_at).getTime() < WEEK_MS).reduce((s, m) => s + m.campaign_delta, 0);
  const last = movements.reduce((acc, m) => !acc || m.created_at > acc ? m.created_at : acc, null);
  const pct = p.total > 0 ? Math.round(p.done / p.total * 100) : 0;
  const prize = rank?.global ? drop.prizes?.slice().sort((a, b) => a.top - b.top).find((pr) => rank.global <= pr.top) : void 0;
  const finished = drop.status === "archived";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setOpen((v) => !v), "aria-expanded": open, className: "flex w-full items-center gap-3 p-3 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: drop.cover, alt: "", className: `h-12 w-12 shrink-0 rounded-xl object-cover ${finished ? "sepia-[0.5]" : ""}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-bold", children: drop.artist }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
          drop.title,
          finished ? " · finalizado" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black tabular-nums leading-none", children: p.score.toLocaleString("es-AR") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "pts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}` })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { value: canRank ? rank ? rank.global ? `#${rank.global}` : "—" : "…" : "—", label: "Ranking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { value: canRank ? rank ? rank.weekly ? `#${rank.weekly}` : "—" : "…" : "—", label: "Semanal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { value: `+${weekPoints.toLocaleString("es-AR")}`, label: "Esta semana" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Misiones completadas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
            p.done,
            "/",
            p.total
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary", style: { width: `${pct}%` } }) })
      ] }),
      prize && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5 text-primary" }),
        "Estás en el top ",
        prize.top,
        ": ",
        prize.label
      ] }),
      !canRank && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] text-muted-foreground", children: "Creá tu cuenta para ver tu puesto en el ranking." }),
      last && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[11px] text-muted-foreground", children: [
        "Último punto sumado el ",
        new Date(last).toLocaleDateString("es-AR")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/drop", search: { d: drop.id, tab: "ranking" }, children: "Ver ranking" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/drop", search: { d: drop.id, tab: "misiones" }, children: finished ? "Ver drop" : "Seguir sumando" }) })
      ] })
    ] })
  ] });
}
function Mini({ value, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/50 p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-black tabular-nums", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: label })
  ] });
}
const COVERS = { lali: laliCover.url, maria: mariaCover.url, dillom: dillomCover.url, airbag: airbagCover, "dillom-lnv": lnvCover, "adela-prima": adelaCover, "arjona-seco": arjonaCover };
const STATUS_LABEL = {
  guardado: "Guardado",
  en_curso: "En curso",
  completado: "Completado",
  finalizado: "Finalizado"
};
const TABS = [
  { id: "shows", label: "Shows" },
  { id: "resenas", label: "Reseñas" },
  { id: "stats", label: "Puntos y premios" },
  { id: "albumes", label: "Álbumes" }
];
function MiDropView({ initialTab }) {
  const { profile, mode, state, saveProfile, signOut, reviews, user } = useDropAuth();
  const isAdmin = useIsDropAdmin(mode === "user" ? user?.id : null);
  const navigate = useNavigate();
  const fetchExtras = useServerFn(getProfileExtras);
  const [extras, setExtras] = reactExports.useState(emptyProfileExtras);
  const [tab, setTab] = reactExports.useState(initialTab === "actividad" ? "stats" : initialTab ?? "shows");
  const [dropFilter, setDropFilter] = reactExports.useState("todos");
  const [editing, setEditing] = reactExports.useState(false);
  const [settings, setSettings] = reactExports.useState(false);
  const orders = useOrders();
  const merch = orders.flatMap((o) => o.lines).filter((l, i, all) => all.findIndex((x) => x.dropId === l.dropId && x.itemId === l.itemId) === i);
  const [picker, setPicker] = reactExports.useState(null);
  const [songs, setSongs] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setSongs(getFavoriteSongs());
  }, []);
  const favArtists = profile?.favorite_artists ?? [];
  const openTab = (t) => {
    setTab(t);
    requestAnimationFrame(() => document.getElementById("perfil-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const saveSongs = (list) => {
    setSongs(list);
    setFavoriteSongs(list);
  };
  const saveArtists = (list) => void saveProfile({ favorite_artists: list });
  reactExports.useEffect(() => {
    if (mode !== "user") {
      setExtras(emptyProfileExtras);
      return;
    }
    fetchExtras().then(setExtras).catch(() => setExtras(emptyProfileExtras));
  }, [mode]);
  const listened = profile?.listened_albums ?? [];
  const generalPoints = profile?.general_points ?? 0;
  const campaignPoints = state.balances.reduce((sum, b) => sum + b.score, 0);
  const allDrops = useDrops();
  const progress = dropProgress(state, allDrops);
  const stamps = progress.filter((p) => p.participating);
  const logros = achievements(state, progress, listened.length).filter((l) => l.unlocked);
  const username = profile.username?.trim() || profile.display_name?.replace(/^@/, "") || "fan";
  const memberSince = profile.created_at ? new Date(profile.created_at).toLocaleDateString("es-AR", { month: "long", year: "numeric" }) : null;
  const myReviews = reactExports.useMemo(() => {
    if (mode === "user") return extras.reviews;
    return Object.entries(reviews).map(([id, r]) => {
      const album = ALBUMS.find((a) => a.id === id);
      return {
        id,
        user_id: "guest",
        author_name: profile.display_name,
        subject_type: "album",
        subject_id: id,
        subject_title: album?.title ?? id,
        subject_artist: album?.artist ?? "",
        subject_image: album?.cover ?? null,
        rating: r.rating,
        text: r.text,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      };
    });
  }, [mode, extras.reviews, reviews, profile.display_name]);
  const avgRating = myReviews.length ? (myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length).toFixed(1) : null;
  const visibleDrops = extras.savedDrops.filter((d) => dropFilter === "todos" || d.status === dropFilter);
  const monthlyActivity = reactExports.useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const m of state.movements) {
      const key = new Date(m.created_at).toLocaleDateString("es-AR", { month: "short", year: "2-digit" });
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].slice(0, 6);
  }, [state.movements]);
  const shareProfile = async () => {
    const url = `${window.location.origin}/mi-drop`;
    try {
      if (navigator.share) await navigator.share({ title: "Mi perfil en DROP", url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Enlace copiado");
      }
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-primary/50 bg-card", children: profile.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: profile.avatar_url, alt: "Foto de perfil", className: "h-full w-full object-cover" }) : mode === "guest" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-8 w-8 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: PHOTOS.worldCup, alt: "Foto de perfil", className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-2xl font-black leading-tight", children: profile.display_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-sm text-muted-foreground", children: [
            "@",
            username
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-4 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black", children: extras.followers }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "seguidores" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black", children: extras.following }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "siguiendo" })
            ] })
          ] })
        ] })
      ] }),
      profile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed", children: profile.bio }),
      memberSince && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 flex items-center gap-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
        "En DROP desde ",
        memberSince
      ] }),
      mode === "guest" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-primary", children: "Modo invitado · tus datos no se guardan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setEditing(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          "Editar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: shareProfile, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5" }),
          "Compartir"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setSettings(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-3.5 w-3.5" }),
          "Ajustes"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => void shareStory({ name: profile.display_name, username, points: generalPoints, campaignPoints, missions: state.attempts.filter((a) => a.status === "completed").length, avatarUrl: profile.avatar_url }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "h-3.5 w-3.5" }),
          "Compartir en historias"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", size: "sm", onClick: () => void inviteFriends(username), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3.5 w-3.5" }),
          "Invitar amigos"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PlanCard, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 grid grid-cols-4 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: `${extras.shows.length}`, label: "Shows", onClick: () => openTab("shows") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: `${myReviews.length}`, label: "Reseñas", onClick: () => openTab("resenas") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: `${extras.savedDrops.length}`, label: "DROPS", onClick: () => scrollTo("perfil-drops") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: avgRating ?? "—", label: "Promedio", onClick: () => openTab("resenas") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-primary", children: "Sumá a tu perfil" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { icon: Star, label: "Reseñar", onClick: () => openTab("albumes") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { icon: Disc3, label: "Álbum", onClick: () => openTab("albumes") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { icon: Music, label: "Canción", onClick: () => setPicker("song") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { icon: MicVocal, label: "Artista", onClick: () => setPicker("artist") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { icon: Zap, label: "Drop", onClick: () => void navigate({ to: "/explorar" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { icon: Ticket, label: "Show", onClick: () => void navigate({ to: "/resenas", hash: "shows" }) })
      ] })
    ] }),
    (favArtists.length > 0 || songs.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 space-y-3", children: [
      favArtists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Artistas favoritos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: favArtists.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full border border-border bg-card py-1 pl-3 pr-1 text-xs font-bold", children: [
          a,
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": `Quitar ${a}`, onClick: () => saveArtists(favArtists.filter((x) => x !== a)), className: "grid h-5 w-5 place-items-center rounded-full text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
        ] }, a)) })
      ] }),
      songs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Canciones favoritas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 flex gap-3 overflow-x-auto px-5 pb-1", children: songs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: t.link || void 0, target: "_blank", rel: "noreferrer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: t.cover, alt: "", className: "h-24 w-24 rounded-xl object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-xs font-bold", children: t.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[11px] text-muted-foreground", children: t.artist })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": `Quitar ${t.title}`, onClick: () => saveSongs(songs.filter((x) => x.id !== t.id)), className: "absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
        ] }, t.id)) })
      ] })
    ] }),
    picker && /* @__PURE__ */ jsxRuntimeExports.jsx(
      FavoritesPicker,
      {
        kind: picker,
        onClose: () => setPicker(null),
        onPickArtist: (a) => {
          if (favArtists.some((x) => x.toLowerCase() === a.name.toLowerCase())) {
            toast("Ya está en tus favoritos");
            return;
          }
          saveArtists([...favArtists, a.name]);
          setPicker(null);
          toast.success(`${a.name} está en tus favoritos`);
        },
        onPickSong: (t) => {
          if (songs.some((x) => x.id === t.id)) {
            toast("Ya está en tu perfil");
            return;
          }
          saveSongs([{ id: t.id, title: t.title, artist: t.artist, cover: t.cover, link: t.link }, ...songs]);
          setPicker(null);
          toast.success(`Sumaste "${t.title}"`);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 rounded-3xl p-4 text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest opacity-80", children: "Puntos generales DROP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black tabular-nums", children: generalPoints.toLocaleString("es-AR") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs opacity-90", children: "Los sumás en cualquier drop y con tus álbumes, y los canjeás por premios. Abajo ves los puntos que llevás en cada drop." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "secondary", className: "mt-3", onClick: () => setTab("stats"), children: "Ver premios" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropStatsSection, { progress }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Tu recorrido" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Pasaporte" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/actividad", className: "text-xs font-bold text-primary", children: [
          logros.length,
          " logros"
        ] })
      ] }),
      stamps.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Tu pasaporte está esperando su primer sello" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Cada drop en el que participás deja un sello acá." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/explorar", children: "Elegir un drop" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: stamps.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/drop", search: { d: p.drop.id }, className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative mx-auto block h-20 w-20 rotate-[-6deg] overflow-hidden rounded-full border-4 border-dashed border-primary/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: p.drop.cover, alt: "", className: `h-full w-full object-cover ${p.drop.status === "archived" ? "sepia-[0.5]" : ""}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 truncate text-xs font-bold", children: p.drop.artist }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
          p.score.toLocaleString("es-AR"),
          " pts · ",
          p.drop.status === "archived" ? "finalizado" : "en curso"
        ] })
      ] }, p.drop.id)) }),
      logros.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: logros.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-semibold", children: [
        l.icon,
        " ",
        l.title
      ] }, l.id)) }),
      merch.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Merch comprada" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-1", children: merch.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tienda", search: { v: "pedidos" }, className: "w-24 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: m.image, alt: "", className: "h-24 w-24 rounded-xl object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-xs font-bold", children: m.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[11px] text-muted-foreground", children: m.artist })
        ] }, `${m.dropId}-${m.itemId}`)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "perfil-drops", className: "mt-7 scroll-mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Tu colección" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Drops guardados" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/explorar", className: "text-xs font-bold text-primary", children: "Descubrir" })
      ] }),
      extras.savedDrops.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex gap-2 overflow-x-auto pb-1", children: ["todos", "guardado", "en_curso", "completado", "finalizado"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: dropFilter === f ? "default" : "outline", size: "sm", className: "shrink-0 text-[11px]", onClick: () => setDropFilter(f), children: f === "todos" ? "Todos" : STATUS_LABEL[f] }, f)) }),
      extras.savedDrops.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Tu colección está vacía" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-relaxed text-muted-foreground", children: "Guardá drops desde la pestaña Drops para reunir acá los lanzamientos que te interesan, participés o no en sus misiones." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/explorar", children: "Ver drops" }) })
      ] }) : visibleDrops.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-center text-xs text-muted-foreground", children: "No hay drops con ese estado." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 flex gap-3 overflow-x-auto px-5 pb-2", children: visibleDrops.map((drop) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "w-36 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: COVERS[drop.campaign_id] ?? laliCover.url, alt: `Portada de ${drop.title}`, loading: "lazy", className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-black uppercase tracking-wide ${drop.status === "en_curso" ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground"}`, children: STATUS_LABEL[drop.status] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 truncate text-sm font-bold", children: drop.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: drop.artist }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", className: "mt-2 w-full text-[11px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/drop", search: { d: drop.campaign_id }, children: "Entrar" }) })
      ] }, drop.campaign_id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "mt-4 rounded-2xl border border-border bg-card p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-xs font-bold text-muted-foreground", children: "Ver todos los lanzamientos disponibles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DropSelector, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { id: "perfil-tabs", className: "mt-7 scroll-mt-4 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1", "aria-label": "Secciones de tu perfil", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: tab === t.id ? "default" : "ghost", size: "sm", onClick: () => setTab(t.id), className: "shrink-0 flex-1 text-xs", children: t.label }, t.id)) }),
    tab === "shows" && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-5 space-y-3", children: extras.shows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Sin shows registrados" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: 'Marcá "Asistí a este show" desde Reseñas para armar tu historial de recitales y festivales.' })
    ] }) : extras.shows.map((show) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: show.image_url ?? eventCrowd, alt: `Imagen de ${show.title}`, className: "h-14 w-14 shrink-0 rounded-xl object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-bold", children: show.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: show.artist }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-[11px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
          show.venue,
          show.city ? ` · ${show.city}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: show.event_date ? new Date(show.event_date).toLocaleDateString("es-AR") : "A confirmar" })
    ] }, show.id)) }),
    tab === "resenas" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full", onClick: () => setTab("albumes"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4" }),
        "Escribir una reseña nueva"
      ] }),
      myReviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Todavía no publicaste reseñas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Puntuá y reseñá álbumes desde la pestaña Álbumes." })
      ] }) : myReviews.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex items-start gap-3 rounded-2xl border border-border bg-card p-3", children: [
        (("extras" in r ? r.extras?.photos?.[0] : void 0) ?? ALBUMS.find((a) => a.id === r.subject_id)?.cover ?? r.subject_image) && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", decoding: "async", src: ("extras" in r ? r.extras?.photos?.[0] : void 0) ?? ALBUMS.find((a) => a.id === r.subject_id)?.cover ?? r.subject_image ?? void 0, alt: `Imagen de ${r.subject_title}`, className: "h-14 w-14 shrink-0 rounded-xl object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-bold", children: r.subject_title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: r.subject_artist }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-xs font-bold text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
            r.rating,
            "/5"
          ] }),
          r.text && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-3 break-words text-xs text-muted-foreground", children: r.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: new Date(r.created_at).toLocaleDateString("es-AR") })
        ] })
      ] }, r.id))
    ] }),
    tab === "actividad" && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-5", children: state.movements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Sin actividad registrada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Tus misiones completadas, logros y movimientos de puntos aparecen acá." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 border-l border-border pl-4", children: state.movements.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold", children: m.reason === "mission_reward" ? "Misión validada" : m.reason === "reward_redeem" ? "Canje de recompensa" : m.reason === "album_listened" ? "Álbum marcado manualmente" : m.reason === "album_unlistened" ? "Álbum desmarcado" : "Movimiento histórico" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
        m.amount > 0 ? "+" : "",
        m.amount,
        " generales · ",
        m.campaign_delta,
        " campaña · ",
        new Date(m.created_at).toLocaleDateString("es-AR")
      ] })
    ] }, m.id)) }) }),
    tab === "stats" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { value: generalPoints.toLocaleString("es-AR"), label: "Puntos generales" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { value: `${stamps.length}`, label: "Drops jugados" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { value: `${listened.length}`, label: "Álbumes escuchados" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { value: avgRating ?? "—", label: "Calificación promedio" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black", children: "Actividad por mes" }),
        monthlyActivity.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Todavía no hay actividad registrada para graficar." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: monthlyActivity.map(([month, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-14 shrink-0 text-[11px] uppercase text-muted-foreground", children: month }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 flex-1 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary", style: { width: `${Math.min(100, count * 20)}%` } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-right text-[11px] font-bold", children: count })
        ] }, month)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] text-muted-foreground", children: "Las estadísticas se calculan solo con tu actividad registrada en DROP; no inventamos reproducciones." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RewardsRedeem, {})
    ] }),
    tab === "albumes" && /* @__PURE__ */ jsxRuntimeExports.jsx(AlbumsSection, {}),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(EditProfileDialog, { onClose: () => setEditing(false), onSave: async (patch) => {
      const ok = await saveProfile(patch);
      if (ok) {
        setEditing(false);
        toast.success("Perfil actualizado");
      }
    } }),
    settings && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (open) => {
      if (!open) setSettings(false);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[calc(100%-2rem)] max-w-sm rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Configuración" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: mode === "user" ? "Tu cuenta guarda puntos, álbumes y drops en todos tus dispositivos." : "Estás en modo invitado: nada se guarda." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: async () => {
        await signOut();
        void navigate({ to: "/auth", search: { mode: "login" }, replace: true });
      }, children: mode === "user" ? "Cerrar sesión" : "Salir del modo invitado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => {
        try {
          localStorage.removeItem("drop-onboarding-visto");
        } catch {
        }
        void navigate({ to: "/explorar" });
      }, children: "Ver cómo funciona DROP" }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => void navigate({ to: "/admin" }), children: "Panel de administración: drops y dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/privacidad", className: "text-center text-xs text-muted-foreground underline", children: "Política de privacidad" })
    ] }) })
  ] });
}
function Stat({ value, label, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: "rounded-2xl border border-border bg-card p-3 text-center transition-colors active:bg-muted hover:border-primary/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black tabular-nums", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: label })
  ] });
}
function QuickAction({ icon: Icon, label, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: "flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5 text-left text-xs font-bold transition-colors active:bg-muted hover:border-primary/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 shrink-0 place-items-center rounded-lg text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-tight", children: label })
  ] });
}
function StatCard({ value, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black tabular-nums", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] uppercase tracking-wide text-muted-foreground", children: label })
  ] });
}
function EditProfileDialog({ onClose, onSave }) {
  const { profile } = useDropAuth();
  const [name, setName] = reactExports.useState(profile.display_name ?? "");
  const [username, setUsername] = reactExports.useState(profile.username ?? "");
  const [bio, setBio] = reactExports.useState(profile.bio ?? "");
  const [avatar, setAvatar] = reactExports.useState(profile.avatar_url ?? null);
  const [saving, setSaving] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (open) => {
    if (!open) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Editar perfil" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Así te ve la comunidad de DROP." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: async (e) => {
      e.preventDefault();
      const patch = {};
      const n = name.trim();
      const u = username.trim().replace(/^@/, "").toLowerCase();
      const b = bio.trim();
      if (u && !/^[a-z0-9._-]{3,30}$/.test(u)) {
        toast.error("El usuario puede tener letras, números, punto o guiones (3 a 30)");
        return;
      }
      if (n && n !== (profile.display_name ?? "")) patch.display_name = n;
      if (u !== (profile.username ?? "")) patch.username = u || void 0;
      if (b !== (profile.bio ?? "")) patch.bio = b;
      if (avatar !== (profile.avatar_url ?? null)) patch.avatar_url = avatar;
      if (!Object.keys(patch).length) {
        onClose();
        return;
      }
      setSaving(true);
      await onSave(patch);
      setSaving(false);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-muted", children: avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatar, alt: "Tu foto de perfil", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-7 w-7 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer rounded-full border border-border px-3 py-1.5 text-xs font-bold", children: [
            avatar ? "Cambiar foto" : "Subir foto",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "sr-only", onChange: async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              try {
                setAvatar(await avatarFromFile(file));
              } catch {
                toast.error("No pudimos usar esa imagen. Probá con otra.");
              }
            } })
          ] }),
          avatar && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setAvatar(null), className: "rounded-full px-3 py-1.5 text-xs font-bold text-muted-foreground", children: "Quitar" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1 text-sm font-bold", children: [
        "Nombre visible",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), maxLength: 80 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1 text-sm font-bold", children: [
        "Nombre de usuario",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: username, onChange: (e) => setUsername(e.target.value), maxLength: 30, placeholder: "tu_usuario" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1 text-sm font-bold", children: [
        "Biografía ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(opcional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: bio, onChange: (e) => setBio(e.target.value), maxLength: 200, rows: 3, placeholder: "Contá qué música te mueve" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: saving, children: "Guardar cambios" })
    ] })
  ] }) });
}
function MiDrop() {
  const {
    mode
  } = useDropAuth();
  const {
    tab
  } = Route$6.useSearch();
  if (mode === "loading") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin text-primary" }) });
  if (mode === "signed_out") return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/auth", search: {
    mode: "login"
  }, replace: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MiDropView, { initialTab: tab }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalNav, {})
  ] });
}
export {
  MiDrop as component
};
