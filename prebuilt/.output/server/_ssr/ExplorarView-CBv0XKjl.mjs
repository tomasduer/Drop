import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useDropAuth, a as useServerFn } from "./AuthProvider-BOGeBVDM.mjs";
import { B as Button } from "./button-2Yua7ibq.mjs";
import { g as getExploreData, s as saveDropAction, a as showAttendanceAction, e as emptyExploreData, A as ALBUMS, p as publishReview, T as Textarea, u as useAlbumActions, b as AlbumReviewDialog } from "./albums--mPftdg1.mjs";
import { u as useDrops, g as airbagBanda, m as eventCrowd, n as arjonaHero, f as arjonaRed, l as laliCover, p as pcCover, e as arjonaCover, o as dillomCover } from "./drops-_1m_Vggi.mjs";
import { A as ArtistLine } from "./ArtistLine-CU1ked2B.mjs";
import { c as Drawer, d as DrawerContent, e as DrawerHeader, f as DrawerTitle, g as DrawerDescription } from "./MobileShell-Cahk6Qyc.mjs";
import { g as getExternalShows, s as searchCatalog, a as getGenreCatalog, b as getCatalogAlbum, c as getCatalogArtist } from "./music.functions-ag_2QBmP.mjs";
import { a as airbagVivo, L as ListenButtons } from "./airbag-vivo-i-shhTR_.mjs";
import { u as useMusicPlayer } from "./router-DbqJ3g1O.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-_YSi0J9m.mjs";
import { l as lali14 } from "./fan-avatars-_RI7rXqd.mjs";
import { f as Search, o as Star, a4 as Ticket, X, A as ArrowRight, ad as PenLine, $ as Camera, ae as Music2, K as MapPin, af as CalendarDays, J as TrendingUp, ag as ExternalLink, ah as BookmarkCheck, F as Bookmark, D as Disc3, Q as Music, L as LoaderCircle, P as Pause, a as Play, e as Check, w as Plus, U as Users } from "../_libs/lucide-react.mjs";
const url$2 = "/assets/lali-12-DfkqJQe6.webp";
const lali12 = { url: url$2 };
const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
function CatalogResults({ query, genre, onSearch }) {
  const search = useServerFn(searchCatalog);
  const searchGenre = useServerFn(getGenreCatalog);
  const searchShows = useServerFn(getExternalShows);
  const [shows, setShows] = reactExports.useState([]);
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  const [album, setAlbum] = reactExports.useState(null);
  const [artist, setArtist] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!genre) return;
    let cancelled = false;
    setLoading(true);
    setError(false);
    setData(null);
    setShows([]);
    searchShows({ data: { artists: genre.artists.slice(0, 6) } }).then((r) => {
      if (!cancelled) setShows(r);
    }).catch(() => {
      if (!cancelled) setShows([]);
    });
    searchGenre({ data: { names: genre.artists, deezerGenre: genre.deezerGenre } }).then((r) => {
      if (!cancelled) setData(r);
    }).catch(() => {
      if (!cancelled) setError(true);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [genre?.name]);
  reactExports.useEffect(() => {
    if (genre) return;
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
  }, [query, genre?.name]);
  if (!genre && query.trim().length < 2) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: genre ? `${genre.name} en el catálogo` : "En el catálogo" }),
    genre && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "-mt-4 text-xs text-muted-foreground", children: [
      "Artistas que hacen ",
      genre.name.toLowerCase(),
      ", sus discos y canciones."
    ] }),
    genre && onSearch && (error || data && data.artists.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: genre.artists.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "rounded-full", onClick: () => onSearch(n), children: n }, n)) }),
    loading && !data && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Buscando…" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No pudimos conectar con el catálogo. Probá de nuevo en un rato." }),
    data && data.artists.length + data.albums.length + data.tracks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: genre ? "No encontramos música de este género." : `Sin resultados para “${query}”.` }),
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
function ArtistChip({ artist, onOpen, wide }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onOpen, className: `${wide ? "w-full" : "w-20 shrink-0"} text-center`, children: [
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
  const load2 = useServerFn(getCatalogAlbum);
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
    load2({ data: { id } }).then(setAlbum).catch(() => setError(true));
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 mt-4 text-center text-xs font-bold text-muted-foreground", children: "Escuchalo completo en" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListenButtons, { query: `${album.artist} ${album.title}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-[11px] text-muted-foreground", children: "Vistas previas de 30 segundos · catálogo de Deezer" })
  ] }) }) });
}
function ArtistSheet({ id, onClose, onAlbum }) {
  const load2 = useServerFn(getCatalogArtist);
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
    load2({ data: { id } }).then(setArtist).catch(() => setError(true));
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mb-2 w-full", onClick: () => artist.top[0] && play(artist.top[0], artist.top), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, {}),
      " Escuchar lo más popular"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListenButtons, { query: artist.name, className: "mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Populares" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrackList, { tracks: artist.top, showCover: true }),
    artist.albums.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Discografía" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-4 flex gap-3 overflow-x-auto px-4 pb-1", children: artist.albums.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlbumCard, { album: a, onOpen: () => onAlbum(a.id) }, a.id)) })
    ] })
  ] }) }) });
}
const url$1 = "/assets/drop-photo-31-BpFihalT.webp";
const fanMaria = { url: url$1 };
const url = "/assets/drop-photo-33-oNWSxnWe.webp";
const fanLali = { url };
const generoPop = "/assets/genero-pop-BVJMgBGv.webp";
const generoUrbano = "/assets/genero-urbano-DvCEXcVt.webp";
const generoRock = "/assets/genero-rock-D6o-bBXb.webp";
const generoIndie = "/assets/genero-indie-DP0POzat.webp";
const generoElectronica = "/assets/genero-electronica-B8a_eUSm.webp";
const generoHiphop = "/assets/genero-hiphop-D7vZiymv.webp";
const generoRnb = "/assets/genero-rnb-Bf36EYQS.webp";
const generoPoppunk = "/assets/genero-poppunk-CubSVmka.webp";
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
    const url2 = webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/jpeg", q);
    if (url2.length < 38e4) return url2;
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
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mx-1 flex gap-2 overflow-x-auto px-1 pb-1", children: [
          shows.slice(0, 12).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => pickShow(s), className: `w-32 shrink-0 rounded-xl border p-2 text-left text-xs ${!custom && show?.id === s.id ? "border-primary bg-primary/10" : "border-border bg-card"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate font-bold", children: s.artist }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[11px] text-muted-foreground", children: s.title })
          ] }, s.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            setCustom(true);
            setShow(null);
          }, className: `w-32 shrink-0 rounded-xl border p-2 text-left text-xs ${custom ? "border-primary bg-primary/10" : "border-dashed border-border"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-bold", children: "Otro show" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] text-muted-foreground", children: "Escribilo vos" })
          ] })
        ] }),
        custom && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: customArtist, onChange: (e) => setCustomArtist(e.target.value), maxLength: 120, placeholder: "Artista", className: input }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: customTitle, onChange: (e) => setCustomTitle(e.target.value), maxLength: 150, placeholder: "Nombre del show o gira", className: input })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto] gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold", children: [
          "Lugar",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative mt-1 block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: venue, onChange: (e) => setVenue(e.target.value), maxLength: 160, placeholder: "Estadio, ciudad", className: `${input} pl-9` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold", children: [
          "Fecha",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: `${input} mt-1 w-36` })
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
const REVIEW_TYPE_LABEL = { album: "Álbum", song: "Canción", show: "Show", artist: "Artista" };
function Stars$1({ value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex gap-0.5 text-primary", "aria-label": `${value} de 5`, children: [1, 2, 3, 4, 5].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-3.5 w-3.5 ${v <= value ? "fill-current" : "opacity-30"}` }, v)) });
}
const fmtDate = (d) => new Date(d.length === 10 ? `${d}T12:00:00` : d).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
function ReviewViewer({ review, image, onClose }) {
  const photos = review.extras?.photos ?? [];
  const song = review.extras?.song;
  const [index, setIndex] = reactExports.useState(0);
  const isShow = review.subject_type === "show";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => {
    if (!o) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-2xl p-0", children: [
    photos.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto rounded-t-2xl", onScroll: (e) => {
        const el = e.currentTarget;
        setIndex(Math.round(el.scrollLeft / el.clientWidth));
      }, children: photos.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p, alt: `Foto ${i + 1} del show`, className: "h-full w-full shrink-0 snap-center object-cover" }, i)) }),
      photos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-3 top-2 flex gap-1", children: photos.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-0.5 flex-1 rounded-full ${i === index ? "bg-white" : "bg-white/40"}` }, i)) }),
      song && /* @__PURE__ */ jsxRuntimeExports.jsx(SongChip, { song, autoPlay: true, className: "absolute left-3 right-12 top-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-10 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black leading-tight", children: review.subject_artist }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: review.subject_title })
      ] })
    ] }) : image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: `Imagen de ${review.subject_title}`, className: "aspect-square w-full rounded-t-2xl object-cover" }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-5 pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: REVIEW_TYPE_LABEL[review.subject_type] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: review.subject_title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          review.subject_artist,
          " · reseña de ",
          review.author_name || "fan de DROP"
        ] })
      ] }),
      isShow && (review.extras?.venue || review.extras?.date) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs text-muted-foreground", children: [
        review.extras?.venue && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-primary" }),
          review.extras.venue
        ] }),
        review.extras?.date && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5 text-primary" }),
          fmtDate(review.extras.date)
        ] })
      ] }),
      song && photos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SongChip, { song, autoPlay: isShow, className: "border border-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stars$1, { value: review.rating }),
      review.text && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-line text-sm leading-relaxed", children: review.text }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: fmtDate(review.created_at) })
    ] })
  ] }) });
}
const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString();
const DEMO_REVIEWS = [
  {
    id: "demo-show-airbag",
    user_id: "demo",
    author_name: "agus.en.vivo",
    subject_type: "show",
    subject_id: "demo-airbag-velez",
    subject_title: "El Club de la Pelea · Vélez",
    subject_artist: "Airbag",
    subject_image: null,
    rating: 5,
    created_at: daysAgo(3),
    text: 'Tres horas de show y no bajaron nunca la intensidad. Cuando arrancó "Por mil noches" se cayó el estadio. El sonido impecable desde la platea.',
    extras: { photos: [airbagVivo, eventCrowd, airbagBanda], venue: "Estadio Vélez Sarsfield, CABA", date: daysAgo(4).slice(0, 10), song: { id: 9001, title: "Por mil noches", artist: "Airbag", cover: airbagBanda } }
  },
  {
    id: "demo-show-arjona",
    user_id: "demo",
    author_name: "valen.setlist",
    subject_type: "show",
    subject_id: "demo-arjona-seco",
    subject_title: "Seco Tour",
    subject_artist: "Ricardo Arjona",
    subject_image: null,
    rating: 4,
    created_at: daysAgo(6),
    text: 'Íntimo y con muchas historias entre canción y canción. Lloré con "Señora de las cuatro décadas".',
    extras: { photos: [arjonaRed, arjonaHero], venue: "Movistar Arena, CABA", date: daysAgo(7).slice(0, 10), song: { id: 9002, title: "Señora de las cuatro décadas", artist: "Ricardo Arjona", cover: arjonaHero } }
  },
  {
    id: "demo-show-lali",
    user_id: "demo",
    author_name: "luli.primera.fila",
    subject_type: "show",
    subject_id: "demo-lali-river",
    subject_title: "Disciplina Tour",
    subject_artist: "LALI",
    subject_image: null,
    rating: 5,
    created_at: daysAgo(12),
    text: "La producción, los cambios de vestuario, el cuerpo de baile. LALI es otra liga en vivo.",
    extras: { photos: [lali12.url, lali14.url], venue: "Estadio River Plate, CABA", date: daysAgo(14).slice(0, 10), song: { id: 9003, title: "Disciplina", artist: "LALI", cover: lali12.url } }
  },
  {
    id: "demo-song-fanatico",
    user_id: "demo",
    author_name: "sofi.drops",
    subject_type: "song",
    subject_id: "demo-song-fanatico",
    subject_title: "Fanático",
    subject_artist: "LALI",
    subject_image: laliCover.url,
    rating: 5,
    created_at: daysAgo(2),
    text: "El estribillo no se te va más de la cabeza. Hit absoluto.",
    extras: { song: { id: 9004, title: "Fanático", artist: "LALI", cover: laliCover.url } }
  },
  {
    id: "demo-song-dillom",
    user_id: "demo",
    author_name: "nico.tracks",
    subject_type: "song",
    subject_id: "demo-song-munecas",
    subject_title: "Muñecas",
    subject_artist: "Dillom",
    subject_image: pcCover,
    rating: 4,
    created_at: daysAgo(5),
    text: "Arranca tranqui y explota. La letra pega fuerte, de lo mejor de Por cesárea.",
    extras: { song: { id: 9005, title: "Muñecas", artist: "Dillom", cover: pcCover } }
  }
];
const SHOW_IMAGES = { LALI: fanLali.url, "María Becerra": fanMaria.url, Dillom: dillomCover.url, Airbag: airbagBanda, "Ricardo Arjona": arjonaCover };
const reviewImage = (r) => r.extras?.photos?.[0] ?? (r.subject_type === "album" ? ALBUMS.find((a) => a.id === r.subject_id)?.cover : null) ?? r.subject_image ?? (r.subject_type === "show" ? SHOW_IMAGES[r.subject_artist] ?? eventCrowd : null);
const reviewKey = (r) => `${r.user_id}:${r.subject_type}:${r.subject_id}`;
const DISCOVER = ["LALI", "María Becerra", "TINI", "Dillom", "Emilia", "Nicki Nicole", "Milo J", "Trueno", "Bizarrap", "Duki"];
const GENRES = [
  {
    name: "Pop",
    detail: "LALI · María Becerra · TINI",
    image: generoPop,
    deezerGenre: 132,
    artists: ["Taylor Swift", "Katy Perry", "Dua Lipa", "Ariana Grande", "Sabrina Carpenter", "Olivia Rodrigo", "Shakira", "LALI", "María Becerra", "TINI", "Miranda!", "Emilia"]
  },
  {
    name: "Urbano",
    detail: "Duki · Lit Killah · Tiago PZK · Rusherking",
    image: generoUrbano,
    artists: ["Bad Bunny", "Karol G", "J Balvin", "Feid", "Duki", "Bizarrap", "Nicki Nicole", "Paulo Londra", "Tiago PZK", "Lit Killah", "Rusherking", "FMK"]
  },
  {
    name: "Rock",
    detail: "Airbag · Ciro y Los Persas",
    image: generoRock,
    deezerGenre: 152,
    artists: ["Queen", "Foo Fighters", "Arctic Monkeys", "Red Hot Chili Peppers", "Guns N' Roses", "Soda Stereo", "Airbag", "Divididos", "La Renga", "Babasónicos", "Ciro y Los Persas", "Patricio Rey y sus Redonditos de Ricota"]
  },
  {
    name: "Indie",
    detail: "Silvestre y la Naranja · El Zar · Conociendo Rusia",
    image: generoIndie,
    deezerGenre: 85,
    artists: ["Tame Impala", "The Strokes", "Phoebe Bridgers", "Mac DeMarco", "Arcade Fire", "Vampire Weekend", "Conociendo Rusia", "Bandalos Chinos", "Usted Señálemelo", "Silvestre y la Naranja", "El Zar", "Juan Ingaramo"]
  },
  {
    name: "Electrónica",
    detail: "Hernán Cattáneo · Nick Warren",
    image: generoElectronica,
    deezerGenre: 106,
    artists: ["Daft Punk", "Calvin Harris", "David Guetta", "Martin Garrix", "Fred again..", "Peggy Gou", "Charlotte de Witte", "Kygo", "Disclosure", "Bicep", "Nick Warren", "Hernán Cattáneo"]
  },
  {
    name: "Hip-hop",
    detail: "Trueno · Wos · Milo J",
    image: generoHiphop,
    deezerGenre: 116,
    artists: ["Kendrick Lamar", "Drake", "Eminem", "Travis Scott", "Kanye West", "J. Cole", "Tyler, The Creator", "Mac Miller", "Trueno", "Wos", "Milo J", "Dillom"]
  },
  {
    name: "R&B",
    detail: "Nathy Peluso · NAFTA",
    image: generoRnb,
    deezerGenre: 165,
    artists: ["The Weeknd", "SZA", "Beyoncé", "Frank Ocean", "Alicia Keys", "Usher", "Daniel Caesar", "H.E.R.", "Giveon", "Summer Walker", "Nathy Peluso", "NAFTA"]
  },
  {
    name: "Pop punk",
    detail: "Simple Plan · Eruca Sativa",
    image: generoPoppunk,
    artists: ["Green Day", "Blink-182", "Paramore", "Avril Lavigne", "Simple Plan", "Sum 41", "Fall Out Boy", "My Chemical Romance", "Good Charlotte", "All Time Low", "Yellowcard", "Eruca Sativa"]
  }
];
function Stars({ value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-0.5 text-primary", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-3 w-3 ${value >= n ? "fill-current" : "text-muted-foreground"}` }, n)) });
}
function ExplorarView({ section = "drops" }) {
  const isDrops = section === "drops";
  const { mode, state, saveProfile } = useDropAuth();
  const navigate = useNavigate();
  const fetchExplore = useServerFn(getExploreData);
  const saveDrop = useServerFn(saveDropAction);
  const toggleShow = useServerFn(showAttendanceAction);
  const [data, setData] = reactExports.useState(emptyExploreData);
  const [query, setQuery] = reactExports.useState("");
  const [openGenre, setOpenGenre] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (window.location.hash !== "#shows") return;
    const t = setTimeout(() => document.getElementById("shows")?.scrollIntoView({ behavior: "smooth", block: "start" }), 500);
    return () => clearTimeout(t);
  }, []);
  const [reading, setReading] = reactExports.useState(null);
  const [writing, setWriting] = reactExports.useState(null);
  const [reviewFilter, setReviewFilter] = reactExports.useState("todas");
  const localReviews = useLocalReviews();
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
  const allReviews = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Set();
    const merged = [...localReviews, ...data.reviews].filter((r) => {
      const k = reviewKey(r);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    const demos = DEMO_REVIEWS.filter((d) => !data.reviews.some((r) => r.subject_type === d.subject_type));
    return [...merged, ...demos].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }, [localReviews, data.reviews]);
  const visibleReviews = allReviews.filter((r) => reviewFilter === "todas" || r.subject_type === reviewFilter).filter((r) => match(r.subject_title, r.subject_artist, r.author_name, r.text, r.extras?.venue));
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black leading-tight", children: isDrops ? "Elegí tu próximo drop" : "Reseñas y shows" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isDrops ? "Cada lanzamiento es un juego: misiones, ranking y recompensas con tus artistas. Podés sumarte a todos los que quieras." : "Leé lo que opinan los fans, puntuá tus álbumes y encontrá los próximos shows." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 flex items-center gap-2 rounded-2xl border border-input bg-card px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: query,
            onChange: (e) => {
              setQuery(e.target.value);
              setOpenGenre(null);
            },
            placeholder: openGenre ? `Género: ${openGenre.name}` : isDrops ? "Buscá un artista o un drop" : "Álbumes, artistas, shows, reseñas…",
            className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          }
        )
      ] }),
      !isDrops && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setWriting({ kind: "album" }), className: "flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-black text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4" }),
          "Escribir reseña"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#shows", onClick: (e) => {
          e.preventDefault();
          document.getElementById("shows")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, className: "flex items-center justify-center gap-2 rounded-2xl border border-primary/40 py-3 text-sm font-black text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-4 w-4" }),
          "Ver shows"
        ] })
      ] })
    ] }),
    openGenre && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setOpenGenre(null), className: "mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-black text-primary-foreground", children: [
      "Género: ",
      openGenre.name,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
    ] }),
    (!isDrops || openGenre) && /* @__PURE__ */ jsxRuntimeExports.jsx(CatalogResults, { query, genre: openGenre, onSearch: (name) => {
      setOpenGenre(null);
      setQuery(name);
    } }),
    isDrops && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/resenas", className: "mt-8 flex items-center gap-3 rounded-2xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-black", children: "Reseñas y shows" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Opiniones de fans, próximos recitales y artistas para descubrir." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
      ] })
    ] }),
    !isDrops && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Reseñas de la comunidad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => setWriting({ kind: "album" }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3.5 w-3.5" }),
            "Escribir reseña"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex gap-2 overflow-x-auto pb-1", children: [["todas", "Todas"], ["album", "Álbumes"], ["song", "Canciones"], ["show", "Shows"]].map(([id, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: reviewFilter === id ? "default" : "outline", className: "shrink-0 rounded-full text-[11px]", onClick: () => setReviewFilter(id), children: label }, id)) }),
        visibleReviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Todavía no hay reseñas de la comunidad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Las opiniones publicadas por fans aparecen acá: álbumes, canciones y shows." }),
          mode !== "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-primary", children: "Creá una cuenta para publicar y leer reseñas." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 flex gap-3 overflow-x-auto px-5 pb-2", children: visibleReviews.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "w-44 shrink-0 rounded-2xl border border-border bg-card p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setReading(r), className: "relative mb-2 block w-full overflow-hidden rounded-xl", "aria-label": `Ver reseña de ${r.subject_title}`, children: [
            reviewImage(r) ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: reviewImage(r) ?? void 0, alt: `Imagen de ${r.subject_title}`, loading: "lazy", className: `w-full object-cover ${r.subject_type === "show" ? "aspect-[4/5]" : "aspect-square"}` }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid aspect-square w-full place-items-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-6 w-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-1.5 top-1.5 rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide", children: REVIEW_TYPE_LABEL[r.subject_type] }),
            (r.extras?.photos?.length ?? 0) > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute right-1.5 top-1.5 flex items-center gap-0.5 rounded-full bg-background/85 px-1.5 py-0.5 text-[10px] font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3" }),
              r.extras?.photos?.length
            ] }),
            r.extras?.song && r.subject_type === "show" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute inset-x-1.5 bottom-1.5 flex items-center gap-1 truncate rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-3 w-3 shrink-0 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: r.extras.song.title })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-bold", children: r.subject_type === "show" ? r.subject_artist : r.subject_title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: r.subject_type === "show" ? r.subject_title : r.subject_artist || REVIEW_TYPE_LABEL[r.subject_type] }),
          r.extras?.venue && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 truncate text-[11px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: r.extras.venue })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { value: r.rating }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            "por ",
            r.author_name || "fan de DROP"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "link", size: "sm", className: "mt-1 h-auto px-0 text-xs", onClick: () => setReading(r), children: r.subject_type === "show" && r.extras?.photos?.length ? "Ver fotos y reseña" : "Leer reseña" })
        ] }, r.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "shows", className: "mt-7 scroll-mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 flex items-end justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Shows cerca tuyo" }) }),
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
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "mt-1 w-full text-xs", onClick: () => setWriting({ kind: "show", show }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3.5 w-3.5" }),
                "Reseñar este show"
              ] })
            ] })
          ] }, show.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-xl font-black", children: "Explorar por género" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: visibleGenres.map((genre) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setOpenGenre(genre);
          setQuery("");
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
      ] })
    ] }),
    reading && /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewViewer, { review: reading, image: reviewImage(reading), onClose: () => setReading(null) }),
    writing && /* @__PURE__ */ jsxRuntimeExports.jsx(
      NewReviewDialog,
      {
        initialKind: writing.kind,
        initialShow: writing.show,
        shows: [...data.shows, ...externalShows],
        onClose: () => setWriting(null),
        onPublished: (r) => {
          setWriting(null);
          setReviewFilter(r.subject_type === "show" || r.subject_type === "song" || r.subject_type === "album" ? r.subject_type : "todas");
          if (mode === "user") setData((d) => ({ ...d, reviews: [r, ...d.reviews.filter((x) => reviewKey(x) !== reviewKey(r))] }));
        }
      }
    ),
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
export {
  ExplorarView as E
};
