import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-BzllE_Df.mjs";
import { p as publishReview, d as deleteReview, T as Textarea } from "./textarea-C4YXdflh.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-DqGpavNX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useDropAuth, a as useServerFn } from "./AuthProvider-C38-I6P5.mjs";
import { l as laliCover, n as coverMechon } from "./drops-BCXwO8es.mjs";
import { p as Star, i as Trash2 } from "../_libs/lucide-react.mjs";
const emptyExploreData = { reviews: [], shows: [], mySavedDropIds: [], myShowIds: [] };
const emptyProfileExtras = { savedDrops: [], reviews: [], shows: [], followers: 0, following: 0 };
function AlbumReviewDialog({ album, review, onClose, onSave }) {
  const [rating, setRating] = reactExports.useState(review?.rating ?? 0);
  const [text, setText] = reactExports.useState(review?.text ?? "");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (open) => {
    if (!open) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Tu opinión" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        album.title,
        " · ",
        album.artist
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: album.cover, alt: `Portada de ${album.title}`, className: "mx-auto h-28 w-28 rounded-md object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "mb-2 text-sm font-bold", children: "Puntuación" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2", children: [1, 2, 3, 4, 5].map((value) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `${value} ${value === 1 ? "estrella" : "estrellas"}`, "aria-pressed": rating === value, title: `${value} de 5`, onClick: () => setRating(value), className: rating >= value ? "text-primary" : "text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-6 w-6 ${rating >= value ? "fill-current" : ""}` }) }, value)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-sm text-muted-foreground", children: rating ? `${rating} de 5` : "Sin puntuar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "album-review", className: "text-sm font-bold", children: [
        "Reseña ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(opcional)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "album-review", value: text, onChange: (event) => setText(event.target.value), maxLength: 1e3, rows: 4, placeholder: "¿Qué te pareció el álbum?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-right text-xs text-muted-foreground", children: [
        text.length,
        "/1000"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: rating === 0, onClick: () => onSave({ rating, text: text.trim() }), children: "Guardar opinión" }),
    review && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: () => onSave(null), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
      "Eliminar opinión"
    ] })
  ] }) });
}
function useAlbumActions() {
  const { profile, movePoints, mode, saveReview } = useDropAuth();
  const publish = useServerFn(publishReview);
  const remove = useServerFn(deleteReview);
  const [saving, setSaving] = reactExports.useState(false);
  const listened = profile?.listened_albums ?? [];
  const points = profile?.general_points ?? 0;
  async function toggleListened(id) {
    const isListened = listened.includes(id);
    if (mode === "user" && isListened && !id.startsWith("custom-") && points < 120) {
      toast.error("No podés quitar un álbum cuyos puntos ya canjeaste.");
      return false;
    }
    setSaving(true);
    const saved = await movePoints(
      { amount: isListened ? -120 : 120, reason: isListened ? "album_unlistened" : "album_listened", reference: id },
      { listened_albums: isListened ? listened.filter((item) => item !== id) : [...listened, id] }
    );
    setSaving(false);
    if (!saved) return false;
    if (mode !== "user" || id.startsWith("custom-")) return true;
    toast[isListened ? "message" : "success"](
      isListened ? "Álbum quitado de tu historial" : "+120 puntos DROP",
      { description: isListened ? "El saldo fue actualizado." : "Sumaste un álbum escuchado." }
    );
    return true;
  }
  function storeReview(album, review) {
    saveReview(album.id, review);
    if (mode === "user") {
      const call = review ? publish({ data: { subject_type: "album", subject_id: album.id, subject_title: album.title, subject_artist: album.artist, subject_image: album.cover, rating: review.rating, text: review.text } }) : remove({ data: { subject_type: "album", subject_id: album.id } });
      call.catch(() => toast.error("No pudimos publicar tu reseña. Probá de nuevo."));
    }
    toast.success(review ? "Opinión guardada" : "Opinión eliminada");
  }
  return { listened, saving, toggleListened, storeReview };
}
const url$5 = "/assets/drop-photo-28-BCpU9Tb2.webp";
const coverNena = { url: url$5 };
const url$4 = "/assets/drop-photo-30-C_XqFckA.webp";
const coverLali = { url: url$4 };
const url$3 = "/assets/drop-photo-34-9GVNJ2_G.webp";
const coverLibra = { url: url$3 };
const url$2 = "/assets/drop-photo-35-Cr-_7Xdp.webp";
const coverBrava = { url: url$2 };
const url$1 = "/assets/drop-photo-36-CSk4aWWU.webp";
const coverSoy = { url: url$1 };
const url = "/assets/drop-photo-37-DkfEksYr.webp";
const coverABailar = { url };
const ALBUMS = [
  { id: "nvaa", title: "No vayas a atender cuando el demonio llama", artist: "LALI", year: "2025", cover: laliCover.url },
  { id: "lali", title: "LALI", artist: "LALI", year: "2023", cover: coverLali.url },
  { id: "libra", title: "LIBRA", artist: "LALI", year: "2020", cover: coverLibra.url },
  { id: "brava", title: "BRAVA", artist: "LALI", year: "2018", cover: coverBrava.url },
  { id: "soy", title: "Soy", artist: "LALI", year: "2016", cover: coverSoy.url },
  { id: "abailar", title: "A Bailar", artist: "LALI", year: "2014", cover: coverABailar.url },
  { id: "nena", title: "La Nena de Argentina", artist: "María Becerra", year: "2021", cover: coverNena.url },
  { id: "mechon", title: "Un mechón de pelo", artist: "TINI", year: "2023", cover: coverMechon.url }
];
export {
  ALBUMS as A,
  AlbumReviewDialog as a,
  emptyProfileExtras as b,
  emptyExploreData as e,
  useAlbumActions as u
};
