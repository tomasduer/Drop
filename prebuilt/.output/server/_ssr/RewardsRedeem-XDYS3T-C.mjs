import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-CyOLcSsb.mjs";
import { l as laliCover, u as useDrops, S as STATUS_LABEL } from "./drops-DftfKLsD.mjs";
import { A as ArtistLine } from "./ArtistLine-C9iKrx5g.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useDropAuth, a as useServerFn, p as pointsAction, c as cn } from "./router-KYlbDT2I.mjs";
import { u as useAlbumActions, A as ALBUMS, g as getProfileExtras, b as AlbumReviewDialog, s as searchCatalog, D as Dialog, d as DialogContent, e as DialogHeader, f as DialogTitle, h as DialogDescription } from "./AlbumReviewDialog-CYVITOIM.mjs";
import { m as Plus, a4 as Search, f as Check, x as Star, A as ArrowRight, c as TicketCheck } from "../_libs/lucide-react.mjs";
const url$7 = "/assets/lali-13-C2j2l3xd.webp";
const a13 = { url: url$7 };
const url$6 = "/assets/lali-14-C-C8zWHa.webp";
const a14 = { url: url$6 };
const url$5 = "/assets/lali-16-B_JvljNH.webp";
const a16 = { url: url$5 };
const url$4 = "/assets/drop-photo-20-D5o1MeTs.webp";
const a20 = { url: url$4 };
const url$3 = "/assets/drop-photo-22-DRKL6ku2.webp";
const a22 = { url: url$3 };
const url$2 = "/assets/drop-photo-24-CGpJfmrR.webp";
const a24 = { url: url$2 };
const url$1 = "/assets/drop-photo-25-DSCdohKS.webp";
const a25 = { url: url$1 };
const url = "/assets/sticker-nvaa-B32RZAqu.webp";
const a26 = { url };
const av1 = "/assets/avatar-1-CXprXVf9.webp";
const av2 = "/assets/avatar-2-BKNf-tw_.webp";
const av3 = "/assets/avatar-3-CLuFTIj-.webp";
const av4 = "/assets/avatar-4-CCyLw1Cm.webp";
const av5 = "/assets/avatar-5-s13HFJjs.webp";
const av6 = "/assets/avatar-6-C65a1eek.webp";
const av7 = "/assets/avatar-7-Ds9aFDbu.webp";
const av8 = "/assets/avatar-8-Cfz4a0AQ.webp";
const PHOTOS = {
  news: a13.url,
  estadio: a14.url,
  rain: a16.url,
  worldCup: a20.url,
  veil: a22.url,
  childhood: a24.url,
  teen: a25.url,
  saint: a26.url
};
const POOL = [av1, av2, av3, av4, av5, av6, av7, av8];
function avatarFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  return POOL[h % POOL.length];
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-primary", children: STATUS_LABEL[drop.status] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: drop.status === "active" ? "default" : "outline", className: "mt-2 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/drop", search: { d: drop.id }, children: [
          drop.status === "archived" ? "Revisitar" : "Entrar al drop",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
        ] }) })
      ] })
    ] }, drop.id)) })
  ] });
}
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
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
export {
  AlbumsSection as A,
  DropSelector as D,
  Input as I,
  PHOTOS as P,
  RewardsRedeem as R,
  avatarFor as a
};
