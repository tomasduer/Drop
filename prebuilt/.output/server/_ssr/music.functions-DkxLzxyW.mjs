import process from "node:process";
import { c as createServerRpc } from "./createServerRpc-B-Nyxcmb.mjs";
import { a as createServerFn } from "./server-CmX4tkSN.mjs";

import "../_libs/react.mjs";
import { o as objectType, s as stringType, n as numberType } from "../_libs/zod.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/unenv.mjs";


import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";





import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
const API = "https://api.deezer.com";
async function get(path) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      accept: "application/json",
      "user-agent": "DROP/1.0 (+https://drop.duerluli.workers.dev)"
    }
  });
  if (!res.ok) throw new Error("No pudimos conectar con el catálogo musical.");
  const json = await res.json();
  if (json?.error) throw new Error("No pudimos conectar con el catálogo musical.");
  return json;
}
const artist = (a) => ({
  id: a.id,
  name: a.name,
  picture: a.picture_medium ?? a.picture ?? "",
  fans: a.nb_fan ?? 0
});
const album = (a, fallbackArtist) => ({
  id: a.id,
  title: a.title,
  artist: a.artist?.name ?? fallbackArtist?.name ?? "",
  artistId: a.artist?.id ?? fallbackArtist?.id ?? 0,
  cover: a.cover_medium ?? a.cover ?? "",
  year: (a.release_date ?? "").slice(0, 4),
  tracks: a.nb_tracks ?? 0,
  type: a.record_type ?? "album"
});
const track = (t, fallbackAlbum) => ({
  id: t.id,
  title: t.title_short ?? t.title,
  artist: t.artist?.name ?? "",
  album: t.album?.title ?? fallbackAlbum?.title ?? "",
  cover: t.album?.cover_medium ?? fallbackAlbum?.cover_medium ?? "",
  preview: t.preview ?? "",
  duration: t.duration ?? 0,
  link: t.link ?? ""
});
const query = objectType({
  q: stringType().trim().min(2).max(80)
});
const idInput = objectType({
  id: numberType().int().positive()
});
const searchCatalog_createServerFn_handler = createServerRpc({
  id: "24f60bf417645abc5450a9e6c628ec395b95e3547d9f6c3561ff9c04b01354f5",
  name: "searchCatalog",
  filename: "src/lib/music.functions.ts"
}, (opts) => searchCatalog.__executeServer(opts));
const searchCatalog = createServerFn({
  method: "POST"
}).inputValidator((input) => query.parse(input)).handler(searchCatalog_createServerFn_handler, async ({
  data
}) => {
  const q = encodeURIComponent(data.q);
  const [artists, albums, tracks] = await Promise.all([get(`/search/artist?q=${q}&limit=6`), get(`/search/album?q=${q}&limit=10`), get(`/search/track?q=${q}&limit=10`)]);
  return {
    artists: (artists.data ?? []).map(artist),
    albums: (albums.data ?? []).map((a) => album(a)),
    tracks: (tracks.data ?? []).map((t) => track(t)).filter((t) => t.preview)
  };
});
const getCatalogAlbum_createServerFn_handler = createServerRpc({
  id: "9e771f6c2a8ca61c4b1f5c1bf2d5e906c95dad75df27d4a752cdea8f4ff6e00c",
  name: "getCatalogAlbum",
  filename: "src/lib/music.functions.ts"
}, (opts) => getCatalogAlbum.__executeServer(opts));
const getCatalogAlbum = createServerFn({
  method: "POST"
}).inputValidator((input) => idInput.parse(input)).handler(getCatalogAlbum_createServerFn_handler, async ({
  data
}) => {
  const a = await get(`/album/${data.id}`);
  return {
    ...album(a),
    label: a.label ?? "",
    trackList: (a.tracks?.data ?? []).map((t) => track(t, a))
  };
});
const getCatalogArtist_createServerFn_handler = createServerRpc({
  id: "47a266506eeb7d9eb3dbf0ff100355de2b5b7a43d1d73a467c5b64336bcf4271",
  name: "getCatalogArtist",
  filename: "src/lib/music.functions.ts"
}, (opts) => getCatalogArtist.__executeServer(opts));
const getCatalogArtist = createServerFn({
  method: "POST"
}).inputValidator((input) => idInput.parse(input)).handler(getCatalogArtist_createServerFn_handler, async ({
  data
}) => {
  const [a, top, albums] = await Promise.all([get(`/artist/${data.id}`), get(`/artist/${data.id}/top?limit=10`), get(`/artist/${data.id}/albums?limit=25`)]);
  return {
    ...artist(a),
    top: (top.data ?? []).map((t) => track(t)),
    albums: (albums.data ?? []).map((x) => album(x, a))
  };
});
const DEFAULT_SHOW_ARTISTS = ["LALI", "María Becerra", "TINI", "Dillom"];
async function ticketmaster(keyword, size) {
  const key = process.env["TICKETMASTER_API_KEY"];
  if (!key) return [];
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${encodeURIComponent(key)}&keyword=${encodeURIComponent(keyword)}&classificationName=music&sort=date,asc&size=${size}`;
  const res = await fetch(url, {
    headers: {
      accept: "application/json"
    }
  });
  if (!res.ok) return [];
  const json = await res.json();
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const k = norm(keyword);
  return (json?._embedded?.events ?? []).filter((e) => (e._embedded?.attractions ?? []).some((a) => norm(a.name ?? "").includes(k)) || norm(e.name ?? "").includes(k)).map((e) => {
    const venue = e._embedded?.venues?.[0];
    const img = [...e.images ?? []].filter((i) => i.ratio === "16_9").sort((a, b) => Math.abs(a.width - 640) - Math.abs(b.width - 640))[0] ?? e.images?.[0];
    return {
      id: `tm-${e.id}`,
      title: e.name,
      artist: e._embedded?.attractions?.[0]?.name ?? keyword,
      event_date: e.dates?.start?.dateTime ?? e.dates?.start?.localDate ?? null,
      city: [venue?.city?.name, venue?.country?.countryCode].filter(Boolean).join(", "),
      venue: venue?.name ?? "",
      image_url: img?.url ?? null,
      url: e.url ?? ""
    };
  });
}
const getExternalShows_createServerFn_handler = createServerRpc({
  id: "522aa85cbb8fce92d84be3391ada9011fc90f0023a0fd4439e87bce8855aa852",
  name: "getExternalShows",
  filename: "src/lib/music.functions.ts"
}, (opts) => getExternalShows.__executeServer(opts));
const getExternalShows = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  q: stringType().trim().max(80).optional()
}).parse(input ?? {})).handler(getExternalShows_createServerFn_handler, async ({
  data
}) => {
  try {
    const lists = data.q && data.q.length >= 2 ? [await ticketmaster(data.q, 10)] : await Promise.all(DEFAULT_SHOW_ARTISTS.map((a) => ticketmaster(a, 5)));
    const seen = /* @__PURE__ */ new Set();
    return lists.flat().filter((s) => seen.has(s.id) ? false : (seen.add(s.id), true)).sort((a, b) => (a.event_date ?? "9").localeCompare(b.event_date ?? "9")).slice(0, 20);
  } catch {
    return [];
  }
});
export {
  getCatalogAlbum_createServerFn_handler,
  getCatalogArtist_createServerFn_handler,
  getExternalShows_createServerFn_handler,
  searchCatalog_createServerFn_handler
};
