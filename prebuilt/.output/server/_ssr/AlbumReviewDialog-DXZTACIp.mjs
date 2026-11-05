import { e as createSsrRpc, u as useDropAuth, a as useServerFn, c as cn } from "./router-BSrB5u9M.mjs";
import { c as createServerFn } from "./server-Dxr3-7p_.mjs";
import { l as laliCover, q as coverMechon } from "./drops-BNxAhILX.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-31lU8CfZ.mjs";
import { B as Button } from "./button-BqneHcU1.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-Djt0oG9x.mjs";
import { x as Star, q as Trash2 } from "../_libs/lucide-react.mjs";
import { o as objectType, b as booleanType, s as stringType, e as enumType, n as numberType } from "../_libs/zod.mjs";
const query = objectType({
  q: stringType().trim().min(2).max(80)
});
const idInput = objectType({
  id: numberType().int().positive()
});
const searchCatalog = createServerFn({
  method: "POST"
}).inputValidator((input) => query.parse(input)).handler(createSsrRpc("24f60bf417645abc5450a9e6c628ec395b95e3547d9f6c3561ff9c04b01354f5"));
const getCatalogAlbum = createServerFn({
  method: "POST"
}).inputValidator((input) => idInput.parse(input)).handler(createSsrRpc("9e771f6c2a8ca61c4b1f5c1bf2d5e906c95dad75df27d4a752cdea8f4ff6e00c"));
const getCatalogArtist = createServerFn({
  method: "POST"
}).inputValidator((input) => idInput.parse(input)).handler(createSsrRpc("47a266506eeb7d9eb3dbf0ff100355de2b5b7a43d1d73a467c5b64336bcf4271"));
const getExternalShows = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  q: stringType().trim().max(80).optional()
}).parse(input ?? {})).handler(createSsrRpc("522aa85cbb8fce92d84be3391ada9011fc90f0023a0fd4439e87bce8855aa852"));
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
const getExploreData = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("5dcc132c067f3262e7d4369fcf16b0946c9e445fce9c17768bfe309d52994322"));
const getProfileExtras = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("2ad628d4ac4324ccbb9a1bbfcfd9bc015c6c1cb41684e66ef854436ea1c2c7b4"));
const saveDropAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  campaign_id: stringType().min(1),
  save: booleanType()
}).parse(input)).handler(createSsrRpc("15ae6b614b5545c3e9d203b95b43f813cd72465a3c542a500f025bcd8f32bdbb"));
const reviewInput = objectType({
  subject_type: enumType(["album", "artist", "show"]),
  subject_id: stringType().min(1).max(120),
  subject_title: stringType().min(1).max(160),
  subject_artist: stringType().max(160).default(""),
  subject_image: stringType().max(500).nullable().default(null),
  rating: numberType().int().min(1).max(5),
  text: stringType().max(1e3).default("")
});
const publishReview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => reviewInput.parse(input)).handler(createSsrRpc("a33c3cc94392ee7cca7ef423c3e49dda14dc5c1ee99e56b6d5f59834f7fc045d"));
const deleteReview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  subject_type: enumType(["album", "artist", "show"]),
  subject_id: stringType().min(1)
}).parse(input)).handler(createSsrRpc("d6c7a574c205e89d16efa0c91ed8a29e5c63d6daa191ae0e979f61edb523a329"));
const showAttendanceAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  show_id: stringType().min(1),
  attended: booleanType()
}).parse(input)).handler(createSsrRpc("3ab86973ec6b53fb1aa807ef98203c41b8520f379342ed1ff996c1db1a5dbb47"));
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
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
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
export {
  ALBUMS as A,
  Textarea as T,
  coverNena as a,
  AlbumReviewDialog as b,
  coverLali as c,
  getExploreData as d,
  saveDropAction as e,
  showAttendanceAction as f,
  getProfileExtras as g,
  getExternalShows as h,
  getCatalogAlbum as i,
  getCatalogArtist as j,
  searchCatalog as s,
  useAlbumActions as u
};
