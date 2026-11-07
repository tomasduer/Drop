import { c as createSsrRpc } from "./AuthProvider-pSeKkWe9.mjs";
import { a as createServerFn } from "./server-XqUAQpbX.mjs";
import { o as objectType, a as arrayType, s as stringType, n as numberType } from "../_libs/zod.mjs";
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
const getGenreCatalog = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  names: arrayType(stringType().trim().min(1).max(60)).max(24),
  deezerGenre: numberType().int().positive().optional()
}).parse(input)).handler(createSsrRpc("0ee79900d6fb0214a01f7581de725bbfbbd9dfeadf1fa08fe95381ff077e85ee"));
const getExternalShows = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  q: stringType().trim().max(80).optional(),
  artists: arrayType(stringType().trim().min(2).max(60)).max(6).optional()
}).parse(input ?? {})).handler(createSsrRpc("522aa85cbb8fce92d84be3391ada9011fc90f0023a0fd4439e87bce8855aa852"));
export {
  getGenreCatalog as a,
  getCatalogAlbum as b,
  getCatalogArtist as c,
  getExternalShows as g,
  searchCatalog as s
};
