import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { M as MobileShell } from "./MobileShell-BOqgLjxQ.mjs";
import { G as GlobalNav } from "./GlobalNav-SUsNbpRi.mjs";
import { f as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useDropAuth, a as useServerFn, b as useMusicPlayer } from "./router-Bn0LoflZ.mjs";
import { B as Button } from "./button-CzYpoLuZ.mjs";
import { i as getExploreData, j as saveDropAction, k as showAttendanceAction, l as getExternalShows, D as Dialog, d as DialogContent, e as DialogHeader, f as DialogTitle, h as DialogDescription, s as searchCatalog, A as ALBUMS, m as getCatalogAlbum, u as useAlbumActions, b as AlbumReviewDialog, n as getCatalogArtist } from "./AlbumReviewDialog-B2C1vPoe.mjs";
import { e as emptyExploreData } from "./explore-data-hwgAysBT.mjs";
import { u as useDrops, f as arjonaCover, h as airbagBanda, x as dillomCover, q as fanMaria, w as eventCrowd } from "./drops-BtNpGldv.mjs";
import { A as ArtistLine } from "./ArtistLine-CkCM_DD9.mjs";
import { l as logoViolet } from "./drop-logo-negativo-DidhibxV.mjs";
import { f as fanLali, D as Drawer, a as DrawerContent, b as DrawerHeader, c as DrawerTitle, d as DrawerDescription } from "./drop-photo-33.png.asset.json-BQKnqaLi.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";

import "../_libs/vaul.mjs";
import { a1 as Search, A as ArrowRight, a8 as CalendarDays, s as MapPin, t as TrendingUp, d as Sparkles, U as Users, C as Compass, T as Target, a9 as QrCode, b as Trophy, G as Gift, aa as Archive, ab as ExternalLink, ac as BookmarkCheck, ad as Bookmark, u as Star, P as Pause, a as Play, a6 as Check, j as Plus } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-DF_91HGC.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/unenv.mjs";

import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-CXcR5xht.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const spotifySearch = (q) => `https://open.spotify.com/search/${encodeURIComponent(q)}`;
function CatalogResults({ query }) {
  const search = useServerFn(searchCatalog);
  const searchShows = useServerFn(getExternalShows);
  const [shows, setShows] = reactExports.useState([]);
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  const [album, setAlbum] = reactExports.useState(null);
  const [artist, setArtist] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setData(null);
      setShows([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(false);
    const t = setTimeout(() => {
      searchShows({ data: { q } }).then((r) => {
        if (!cancelled) setShows(r);
      }).catch(() => {
        if (!cancelled) setShows([]);
      });
      search({ data: { q } }).then((r) => {
        if (!cancelled) setData(r);
      }).catch(() => {
        if (!cancelled) setError(true);
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);
  if (query.trim().length < 2) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "En el catálogo" }),
    loading && !data && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Buscando…" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No pudimos conectar con el catálogo. Probá de nuevo en un rato." }),
    data && data.artists.length + data.albums.length + data.tracks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "Sin resultados para “",
      query,
      "”."
    ] }),
    data && data.artists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Artistas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 flex gap-4 overflow-x-auto px-5 pb-1", children: data.artists.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistChip, { artist: a, onOpen: () => setArtist(a.id) }, a.id)) })
    ] }),
    data && data.albums.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Álbumes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 flex gap-3 overflow-x-auto px-5 pb-1", children: data.albums.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlbumCard, { album: a, onOpen: () => setAlbum(a.id) }, a.id)) })
    ] }),
    data && data.tracks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Canciones" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrackList, { tracks: data.tracks, showCover: true })
    ] }),
    shows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Próximos shows" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: shows.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: s.url, target: "_blank", rel: "noreferrer", className: "flex items-center gap-3 py-2.5", children: [
        s.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: s.image_url, alt: "", className: "h-12 w-16 shrink-0 rounded-lg object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-semibold", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-xs text-muted-foreground", children: [
            s.event_date ? new Date(s.event_date).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" }) : "Fecha a confirmar",
            " · ",
            s.venue,
            s.city ? `, ${s.city}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 shrink-0 text-primary" })
      ] }) }, s.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlbumSheet, { id: album, onClose: () => setAlbum(null), onArtist: (id) => {
      setAlbum(null);
      setArtist(id);
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistSheet, { id: artist, onClose: () => setArtist(null), onAlbum: (id) => {
      setArtist(null);
      setAlbum(id);
    } })
  ] });
}
function ArtistChip({ artist, onOpen }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onOpen, className: "w-20 shrink-0 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: artist.picture, alt: artist.name, className: "mx-auto h-20 w-20 rounded-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-xs font-bold", children: artist.name })
  ] });
}
function AlbumCard({ album, onOpen }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onOpen, className: "w-32 shrink-0 text-left", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: album.cover, alt: album.title, className: "aspect-square w-full rounded-xl object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 truncate text-sm font-bold", children: album.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
      album.artist,
      album.year ? ` · ${album.year}` : ""
    ] })
  ] });
}
function TrackList({ tracks, showCover }) {
  const { current, playing, play } = useMusicPlayer();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "divide-y divide-border", children: tracks.map((t, i) => {
    const active = current?.id === t.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: !t.preview, onClick: () => play(t, tracks), className: "flex w-full items-center gap-3 py-2.5 text-left disabled:opacity-50", children: [
      showCover && t.cover ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { loading: "lazy", src: t.cover, alt: "", className: "h-10 w-10 shrink-0 rounded-lg object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 shrink-0 text-center text-xs text-muted-foreground", children: i + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block truncate text-sm font-semibold ${active ? "text-primary" : ""}`, children: t.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-xs text-muted-foreground", children: [
          t.artist,
          showCover && t.album ? ` · ${t.album}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: fmt(t.duration) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border", children: active && playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5" }) })
    ] }) }, t.id);
  }) });
}
function AlbumSheet({ id, onClose, onArtist }) {
  const load = useServerFn(getCatalogAlbum);
  const { customAlbums, addAlbum, mode, reviews } = useDropAuth();
  const { listened, saving: marking, toggleListened, storeReview } = useAlbumActions();
  const [reviewing, setReviewing] = reactExports.useState(false);
  const { play } = useMusicPlayer();
  const [album, setAlbum] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!id) {
      setAlbum(null);
      return;
    }
    setError(false);
    setAlbum(null);
    load({ data: { id } }).then(setAlbum).catch(() => setError(true));
  }, [id]);
  const libraryId = album ? `dz-${album.id}` : "";
  const inLibrary = customAlbums.some((a) => a.id === libraryId);
  const isListened = listened.includes(libraryId);
  const libAlbum = album ? { id: libraryId, title: album.title, artist: album.artist, cover: album.cover } : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open: id !== null, onOpenChange: (o) => {
    if (!o) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContent, { className: "mx-auto max-h-[90dvh] max-w-[440px]", children: !album ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: error ? "No pudimos abrir el álbum" : "Cargando álbum…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { children: error ? "Probá de nuevo en un rato." : "Un segundo." })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto px-4 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerHeader, { className: "px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: album.cover, alt: album.title, className: "h-28 w-28 shrink-0 rounded-xl object-cover shadow-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wider text-primary", children: album.type === "single" ? "Single" : album.type === "ep" ? "EP" : "Álbum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "text-xl font-black leading-tight", children: album.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-1 text-sm font-semibold text-muted-foreground underline-offset-2 hover:underline", onClick: () => onArtist?.(album.artistId), children: album.artist }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { className: "text-xs", children: [album.year, `${album.trackList.length} canciones`, album.label].filter(Boolean).join(" · ") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => album.trackList[0] && play(album.trackList[0], album.trackList), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, {}),
        " Escuchar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", disabled: inLibrary || saving, onClick: async () => {
        setSaving(true);
        const ok = await addAlbum({ id: libraryId, title: album.title, artist: album.artist, year: album.year, cover: album.cover });
        setSaving(false);
        if (ok) toast.success("Álbum sumado a tu biblioteca", { description: mode === "user" ? "Marcalo como escuchado acá abajo para sumar 120 puntos y reseñarlo." : "En modo invitado se guarda solo durante esta visita." });
      }, children: inLibrary ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, {}),
        " En tu biblioteca"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, {}),
        " Sumar a mi biblioteca"
      ] }) })
    ] }),
    inLibrary && libAlbum && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-2xl border border-primary/40 bg-primary/10 p-3", children: [
      reviews[libraryId] && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 flex items-center gap-1 text-xs font-bold text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
        "Tu opinión: ",
        reviews[libraryId].rating,
        "/5"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: isListened ? "secondary" : "default", disabled: marking, onClick: () => void toggleListened(libraryId), children: isListened ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, {}),
          " Escuchado"
        ] }) : "Marcar escuchado · +120" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", disabled: marking, onClick: async () => {
          if (!isListened && !await toggleListened(libraryId)) return;
          setReviewing(true);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, {}),
          " ",
          reviews[libraryId] ? "Editar reseña" : "Puntuar y reseñar"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrackList, { tracks: album.trackList }),
    reviewing && libAlbum && listened.includes(libraryId) && /* @__PURE__ */ jsxRuntimeExports.jsx(AlbumReviewDialog, { album: libAlbum, review: reviews[libraryId], onClose: () => setReviewing(false), onSave: (review) => {
      storeReview(libAlbum, review);
      setReviewing(false);
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: spotifySearch(`${album.artist} ${album.title}`), target: "_blank", rel: "noreferrer", className: "mt-4 flex items-center justify-center gap-2 text-xs font-bold text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
      " Escuchar completo en Spotify"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-[11px] text-muted-foreground", children: "Vistas previas de 30 segundos · catálogo de Deezer" })
  ] }) }) });
}
function ArtistSheet({ id, onClose, onAlbum }) {
  const load = useServerFn(getCatalogArtist);
  const { play } = useMusicPlayer();
  const [artist, setArtist] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!id) {
      setArtist(null);
      return;
    }
    setError(false);
    setArtist(null);
    load({ data: { id } }).then(setArtist).catch(() => setError(true));
  }, [id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open: id !== null, onOpenChange: (o) => {
    if (!o) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContent, { className: "mx-auto max-h-[90dvh] max-w-[440px]", children: !artist ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: error ? "No pudimos abrir el artista" : "Cargando artista…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { children: error ? "Probá de nuevo en un rato." : "Un segundo." })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto px-4 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "px-0 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: artist.picture, alt: artist.name, className: "mx-auto h-28 w-28 rounded-full object-cover shadow-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "mt-2 text-2xl font-black", children: artist.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerDescription, { className: "flex items-center justify-center gap-1 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
        artist.fans.toLocaleString("es-AR"),
        " fans"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mb-3 w-full", onClick: () => artist.top[0] && play(artist.top[0], artist.top), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, {}),
      " Escuchar lo más popular"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Populares" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrackList, { tracks: artist.top, showCover: true }),
    artist.albums.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Discografía" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-4 flex gap-3 overflow-x-auto px-4 pb-1", children: artist.albums.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlbumCard, { album: a, onOpen: () => onAlbum(a.id) }, a.id)) })
    ] })
  ] }) }) });
}
const generoPop = "/assets/genero-pop-BVJMgBGv.webp";
const generoUrbano = "/assets/genero-urbano-DvCEXcVt.webp";
const generoRock = "/assets/genero-rock-D6o-bBXb.webp";
const generoIndie = "/assets/genero-indie-DP0POzat.webp";
const generoElectronica = "/assets/genero-electronica-B8a_eUSm.webp";
const generoHiphop = "/assets/genero-hiphop-D7vZiymv.webp";
const generoRnb = "/assets/genero-rnb-Bf36EYQS.webp";
const generoPoppunk = "/assets/genero-poppunk-CubSVmka.webp";
const logo$1 = { url: logoViolet };
const SHOW_IMAGES = { LALI: fanLali.url, "María Becerra": fanMaria.url, Dillom: dillomCover.url, Airbag: airbagBanda, "Ricardo Arjona": arjonaCover };
const reviewImage = (r) => (r.subject_type === "album" ? ALBUMS.find((a) => a.id === r.subject_id)?.cover : null) ?? r.subject_image;
const DISCOVER = ["LALI", "María Becerra", "TINI", "Dillom", "Emilia", "Nicki Nicole", "Milo J", "Trueno", "Bizarrap", "Duki"];
const GENRES = [
  { name: "Pop", detail: "LALI · María Becerra · TINI", image: generoPop },
  { name: "Urbano", detail: "Duki · Lit Killah · Tiago PZK · Rusherking", image: generoUrbano },
  { name: "Rock", detail: "Airbag · Ciro y Los Persas", image: generoRock },
  { name: "Indie", detail: "Silvestre y la Naranja · El Zar · Conociendo Rusia", image: generoIndie },
  { name: "Electrónica", detail: "Hernán Cattáneo · Nick Warren", image: generoElectronica },
  { name: "Hip-hop", detail: "Trueno · Wos · Milo J", image: generoHiphop },
  { name: "R&B", detail: "Nathy Peluso · NAFTA", image: generoRnb },
  { name: "Pop punk", detail: "Simple Plan · Eruca Sativa", image: generoPoppunk }
];
function Stars({ value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-0.5 text-primary", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-3 w-3 ${value >= n ? "fill-current" : "text-muted-foreground"}` }, n)) });
}
function ExplorarView() {
  const { mode, state, saveProfile } = useDropAuth();
  const navigate = useNavigate();
  const fetchExplore = useServerFn(getExploreData);
  const saveDrop = useServerFn(saveDropAction);
  const toggleShow = useServerFn(showAttendanceAction);
  const [data, setData] = reactExports.useState(emptyExploreData);
  const [query, setQuery] = reactExports.useState("");
  const [reading, setReading] = reactExports.useState(null);
  const [savingDrop, setSavingDrop] = reactExports.useState(null);
  const fetchExternalShows = useServerFn(getExternalShows);
  const [externalShows, setExternalShows] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetchExternalShows({ data: {} }).then(setExternalShows).catch(() => setExternalShows([]));
  }, []);
  reactExports.useEffect(() => {
    if (mode !== "user") {
      const db = supabase;
      Promise.all([
        db.from("reviews").select("*").order("created_at", { ascending: false }).limit(30),
        db.from("shows").select("*").order("event_date", { ascending: true }).limit(30)
      ]).then(([r, sh]) => setData({ ...emptyExploreData, reviews: r.data ?? [], shows: sh.data ?? [] })).catch(() => setData(emptyExploreData));
      return;
    }
    fetchExplore().then(setData).catch(() => setData(emptyExploreData));
  }, [mode]);
  const catalog = useDrops();
  const q = query.trim().toLowerCase();
  const match = (...parts) => !q || parts.some((p) => p?.toLowerCase().includes(q));
  const visibleDrops = catalog.filter((d) => match(d.artist, d.title, d.fandom));
  const activeDrops = visibleDrops.filter((d) => d.status === "active");
  const upcomingDrops = visibleDrops.filter((d) => d.status === "upcoming");
  const archivedDrops = visibleDrops.filter((d) => d.status === "archived");
  const myScore = (id) => state.balances.find((b) => b.campaign_id === id)?.score ?? 0;
  const visibleReviews = data.reviews.filter((r) => match(r.subject_title, r.subject_artist, r.author_name, r.text));
  const visibleShows = [...externalShows, ...data.shows].filter((s) => match(s.title, s.artist, s.city, s.venue)).sort((a, b) => (a.event_date ?? "9").localeCompare(b.event_date ?? "9"));
  const visibleGenres = GENRES.filter((g) => match(g.name, g.detail));
  const onSaveDrop = async (drop) => {
    if (mode !== "user") {
      toast.message("Creá una cuenta para guardar drops en tu colección.");
      return;
    }
    const saved = data.mySavedDropIds.includes(drop.id);
    setSavingDrop(drop.id);
    try {
      await saveDrop({ data: { campaign_id: drop.id, save: !saved } });
      setData((d) => ({ ...d, mySavedDropIds: saved ? d.mySavedDropIds.filter((id) => id !== drop.id) : [...d.mySavedDropIds, drop.id] }));
      toast.success(saved ? "Drop quitado de Mis DROPS" : "Drop guardado en Mis DROPS");
    } catch {
      toast.error("El guardado se activa al aceptar los cambios de datos del borrador.");
    } finally {
      setSavingDrop(null);
    }
  };
  const onEnterDrop = (drop) => {
    void navigate({ to: "/drop", search: { d: drop.id } });
  };
  const SaveButton = ({ drop }) => {
    const saved = data.mySavedDropIds.includes(drop.id);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          void onSaveDrop(drop);
        },
        disabled: savingDrop === drop.id,
        "aria-label": saved ? `Quitar ${drop.title} de Mis DROPS` : `Guardar ${drop.title} en Mis DROPS`,
        className: `grid h-9 w-9 shrink-0 place-items-center rounded-full border backdrop-blur ${saved ? "border-primary bg-primary/25 text-primary" : "border-border bg-background/60 text-foreground"}`,
        children: saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" })
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logo$1.url, alt: "DROP", className: "h-10 w-24 object-contain object-left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-3xl font-black leading-tight", children: "Elegí tu próximo drop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Cada lanzamiento es un juego: misiones, ranking y recompensas con tus artistas. Podés sumarte a todos los que quieras." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 flex items-center gap-2 rounded-2xl border border-input bg-card px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Artistas, álbumes, shows, reseñas…",
            className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CatalogResults, { query }),
    activeDrops.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Drops activos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Participá ahora: sumá puntos y competí en el ranking." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: activeDrops.map((drop) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "article",
        {
          role: "button",
          tabIndex: 0,
          onClick: () => onEnterDrop(drop),
          onKeyDown: (e) => {
            if (e.key === "Enter") onEnterDrop(drop);
          },
          className: "relative cursor-pointer overflow-hidden rounded-3xl border border-primary/40 shadow-[var(--shadow-glow)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: drop.hero, alt: drop.artist, loading: "lazy", className: "h-60 w-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SaveButton, { drop }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-primary-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground" }),
              "Activo"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-4 bottom-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistLine, { drop }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black leading-tight", children: drop.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: drop.tagline }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: myScore(drop.id) > 0 ? `Participando · ${myScore(drop.id).toLocaleString("es-AR")} pts` : "Todavía no participás" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-black text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: [
                  myScore(drop.id) > 0 ? "Continuar" : "Entrar al drop",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                ] })
              ] })
            ] })
          ]
        },
        drop.id
      )) })
    ] }),
    upcomingDrops.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Próximamente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Drops anunciados. Activá el aviso y enterate primero." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 flex gap-3 overflow-x-auto px-5 pb-2", children: upcomingDrops.map((drop) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onEnterDrop(drop), className: "w-44 shrink-0 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden rounded-2xl border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: drop.hero, alt: drop.artist, loading: "lazy", className: "h-full w-full object-cover opacity-70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-[11px] font-black uppercase", children: "Próximamente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute inset-x-3 bottom-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistLine, { drop }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-base font-black leading-tight", children: drop.title })
        ] })
      ] }) }, drop.id)) })
    ] }),
    archivedDrops.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7 rounded-3xl border border-border bg-[linear-gradient(160deg,oklch(0.2_0.03_60/0.6),transparent)] p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "📼 Archivo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Drops que ya terminaron. Volvé a recorrerlos, mirá el ranking final y tus logros." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: archivedDrops.map((drop) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onEnterDrop(drop), className: "flex w-full items-center gap-3 rounded-2xl border border-border bg-background/50 p-2 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: drop.album, alt: "", loading: "lazy", className: "h-16 w-16 shrink-0 rounded-xl object-cover sepia-[0.4]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-xs font-bold text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistLine, { drop }),
            " · ",
            drop.dates
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-base font-black", children: drop.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-primary", children: myScore(drop.id) > 0 ? `Participaste · ${myScore(drop.id).toLocaleString("es-AR")} pts` : "Ver cómo terminó" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
      ] }, drop.id)) })
    ] }),
    visibleDrops.length === 0 && q && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-muted-foreground", children: "Ningún drop coincide con esa búsqueda." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-10 text-2xl font-black", children: "Descubrí música" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Reseñas de fans, shows y artistas para escuchar." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Opiniones de la comunidad" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mi-drop", search: { tab: "albumes" }, className: "text-xs font-bold text-primary", children: "Publicar" })
      ] }),
      visibleReviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Todavía no hay reseñas de la comunidad" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Las opiniones publicadas por fans aparecen acá: álbumes, artistas y shows." }),
        mode !== "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-primary", children: "Creá una cuenta para publicar y leer reseñas." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 flex gap-3 overflow-x-auto px-5 pb-2", children: visibleReviews.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "w-44 shrink-0 rounded-2xl border border-border bg-card p-3", children: [
        reviewImage(r) && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: reviewImage(r) ?? void 0, alt: `Imagen de ${r.subject_title}`, loading: "lazy", className: "mb-2 aspect-square w-full rounded-xl object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-bold", children: r.subject_title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: r.subject_artist || r.subject_type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { value: r.rating }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
          "por ",
          r.author_name || "fan de DROP"
        ] }),
        r.text && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "link", size: "sm", className: "mt-1 h-auto px-0 text-xs", onClick: () => setReading(r), children: "Leer reseña" })
      ] }, r.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Shows cerca tuyo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: "Ver todo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Próximas fechas de tus artistas." }),
      visibleShows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "La agenda se está armando" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Los recitales, festivales y listening parties confirmados aparecen acá." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 flex gap-3 overflow-x-auto px-5 pb-2", children: visibleShows.map((show) => {
        const attended = data.myShowIds.includes(show.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "w-52 shrink-0 overflow-hidden rounded-2xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: show.image_url ?? SHOW_IMAGES[show.artist] ?? eventCrowd, alt: `Imagen de ${show.title}`, loading: "lazy", className: "h-28 w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-bold", children: show.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: show.artist }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
              show.event_date ? new Date(show.event_date).toLocaleDateString("es-AR") : "Fecha a confirmar"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              show.venue,
              show.city ? ` · ${show.city}` : ""
            ] }),
            show.url ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "mt-2 w-full text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: show.url, target: "_blank", rel: "noreferrer", children: "Ver entradas" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: attended ? "secondary" : "outline",
                size: "sm",
                className: "mt-2 w-full text-xs",
                onClick: async () => {
                  if (mode !== "user") {
                    toast.message("Creá una cuenta para registrar tus shows.");
                    return;
                  }
                  try {
                    await toggleShow({ data: { show_id: show.id, attended: !attended } });
                    setData((d) => ({ ...d, myShowIds: attended ? d.myShowIds.filter((id) => id !== show.id) : [...d.myShowIds, show.id] }));
                    toast.success(attended ? "Show quitado de tu historial" : "Show agregado a tu historial");
                  } catch {
                    toast.error("El registro de shows se activa al aceptar los cambios de datos del borrador.");
                  }
                },
                children: attended ? "Asistí ✓" : "Asistí a este show"
              }
            )
          ] })
        ] }, show.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-xl font-black", children: "Explorar por género" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: visibleGenres.map((genre) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setQuery(genre.name);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, className: "relative h-24 overflow-hidden rounded-2xl border border-border text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: genre.image, alt: "", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover opacity-60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0", style: { backgroundImage: "linear-gradient(180deg, transparent 30%, oklch(0 0 0 / 0.75)), var(--gradient-drop-soft)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-2 left-3 right-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-black", children: genre.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[11px] text-muted-foreground", children: genre.detail })
        ] })
      ] }, genre.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-1 text-xl font-black", children: "Artistas para descubrir" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "Tocá un nombre para escuchar sus canciones." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: DISCOVER.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "rounded-full", onClick: () => {
        setQuery(name);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-primary" }),
        name
      ] }, name)) })
    ] }),
    reading && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (open) => {
      if (!open) setReading(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: reading.subject_title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          reading.subject_artist,
          " · reseña de ",
          reading.author_name || "fan de DROP"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { value: reading.rating }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: reading.text }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(reading.created_at).toLocaleDateString("es-AR") })
    ] }) }),
    mode !== "user" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 rounded-2xl border border-primary/40 bg-primary/5 p-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Estás explorando como invitado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Creá una cuenta para guardar drops, publicar reseñas y registrar shows." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-3 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", search: { mode: "signup" }, children: [
        "Crear cuenta ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
      ] }) })
    ] })
  ] });
}
const crowd = "/assets/onboarding-1-BnjF0pCR.webp";
const phone = "/assets/onboarding-2-CGWDofjh.webp";
const street = "/assets/onboarding-3-DMGvFSKM.webp";
const stage = "/assets/onboarding-4-Bn5pM3qS.webp";
const logo = { url: logoViolet };
const KEY = "drop-onboarding-visto";
const slides = [
  { image: null, title: "La música se vive. Y también suma.", points: [{ icon: Sparkles, text: "Cada lanzamiento se convierte en un juego" }, { icon: Users, text: "Participá con miles de fans" }] },
  { image: crowd, title: "Elegí tus drops", points: [{ icon: Compass, text: "En Explorar están todos los artistas" }, { icon: Users, text: "Sumate a los drops que quieras, a la vez" }] },
  { image: phone, title: "Jugá misiones", points: [{ icon: Target, text: "Trivias, acertijos y desafíos diarios" }, { icon: Sparkles, text: "Cada misión te dice cuántos puntos da" }] },
  { image: street, title: "Salí a buscar", points: [{ icon: QrCode, text: "Escaneá afiches con QR en la calle" }, { icon: MapPin, text: "El mapa te muestra dónde está la acción" }] },
  { image: stage, title: "Subí en el ranking y ganá", points: [{ icon: Trophy, text: "Cada artista tiene su propio ranking" }, { icon: Gift, text: "Desbloqueá premios y experiencias" }, { icon: Archive, text: "Los drops que terminan quedan en el Archivo" }] }
];
function Onboarding() {
  const [open, setOpen] = reactExports.useState(false);
  const [i, setI] = reactExports.useState(0);
  reactExports.useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
    }
  }, []);
  if (!open) return null;
  const close = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
    }
    setOpen(false);
  };
  const s = slides[i];
  const last = i === slides.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "dialog", "aria-modal": "true", "aria-label": "Cómo funciona DROP", className: "fixed inset-0 z-50 mx-auto flex max-w-[440px] flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[52%] shrink-0 overflow-hidden", children: [
      s.image ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: s.image, alt: "", className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logo.url, alt: "DROP", className: "absolute left-5 top-[max(1rem,env(safe-area-inset-top))] h-9 w-24 object-contain object-left" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center", style: { backgroundImage: "radial-gradient(circle at 50% 45%, oklch(0.62 0.24 25 / 0.45), transparent 65%)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logo.url, alt: "DROP", className: "w-64 object-contain" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: close, className: "absolute right-4 top-[max(1rem,env(safe-area-inset-top))] rounded-full bg-background/70 px-3 py-1.5 text-xs font-bold backdrop-blur", children: "Saltear" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col px-7 pb-[max(1.5rem,env(safe-area-inset-bottom))]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold uppercase tracking-widest text-primary", children: [
        "Paso ",
        i + 1,
        " de ",
        slides.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl font-black leading-tight", children: s.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3", children: s.points.map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) }),
        text
      ] }, text)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center gap-3 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 gap-1.5", children: slides.map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-primary" : "w-1.5 bg-muted"}` }, k)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-12 px-6 font-bold", onClick: () => last ? close() : setI(i + 1), children: last ? "Empezar" : "Siguiente" })
      ] })
    ] })
  ] });
}
function Explorar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExplorarView, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Onboarding, {})
  ] });
}
export {
  Explorar as component
};
