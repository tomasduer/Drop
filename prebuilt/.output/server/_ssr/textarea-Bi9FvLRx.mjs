import { c as createSsrRpc } from "./AuthProvider-CK7uiFf6.mjs";
import { a as createServerFn } from "./server-D2H_mZP9.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-C6tn-3am.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-C3G6hj4D.mjs";
import { o as objectType, b as booleanType, s as stringType, n as numberType, a as arrayType, e as enumType } from "../_libs/zod.mjs";
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
  subject_type: enumType(["album", "artist", "show", "song"]),
  subject_id: stringType().min(1).max(120),
  subject_title: stringType().min(1).max(160),
  subject_artist: stringType().max(160).default(""),
  subject_image: stringType().max(500).nullable().default(null),
  rating: numberType().int().min(1).max(5),
  text: stringType().max(1e3).default(""),
  extras: objectType({
    photos: arrayType(stringType().startsWith("data:image/").max(4e5)).max(4).optional(),
    venue: stringType().max(160).optional(),
    date: stringType().max(40).optional(),
    song: objectType({
      id: numberType(),
      title: stringType().max(200),
      artist: stringType().max(200),
      cover: stringType().max(500),
      link: stringType().max(500).optional()
    }).optional()
  }).optional()
});
const publishReview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => reviewInput.parse(input)).handler(createSsrRpc("a33c3cc94392ee7cca7ef423c3e49dda14dc5c1ee99e56b6d5f59834f7fc045d"));
const deleteReview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  subject_type: enumType(["album", "artist", "show", "song"]),
  subject_id: stringType().min(1)
}).parse(input)).handler(createSsrRpc("d6c7a574c205e89d16efa0c91ed8a29e5c63d6daa191ae0e979f61edb523a329"));
const showAttendanceAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  show_id: stringType().min(1),
  attended: booleanType()
}).parse(input)).handler(createSsrRpc("3ab86973ec6b53fb1aa807ef98203c41b8520f379342ed1ff996c1db1a5dbb47"));
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
export {
  Textarea as T,
  showAttendanceAction as a,
  getProfileExtras as b,
  deleteReview as d,
  getExploreData as g,
  publishReview as p,
  saveDropAction as s
};
