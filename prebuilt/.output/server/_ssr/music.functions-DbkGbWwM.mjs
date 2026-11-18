import process from "node:process";
import { c as createServerRpc } from "./createServerRpc-DWGEByG9.mjs";
import { a as createServerFn } from "./server-CMn9WaEg.mjs";

import "../_libs/react.mjs";
import { o as objectType, s as stringType, n as numberType, a as arrayType } from "../_libs/zod.mjs";
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
      "user-agent": "DROP/1.0 (+https://drop.appdrop.workers.dev)"
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
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const hasPhoto = (a) => !!a.picture && !a.picture.includes("/artist//");
const safe = async (p, fallback) => {
  try {
    return await p;
  } catch {
    return fallback;
  }
};
const getGenreCatalog_createServerFn_handler = createServerRpc({
  id: "0ee79900d6fb0214a01f7581de725bbfbbd9dfeadf1fa08fe95381ff077e85ee",
  name: "getGenreCatalog",
  filename: "src/lib/music.functions.ts"
}, (opts) => getGenreCatalog.__executeServer(opts));
const getGenreCatalog = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  names: arrayType(stringType().trim().min(1).max(60)).max(24),
  deezerGenre: numberType().int().positive().optional()
}).parse(input)).handler(getGenreCatalog_createServerFn_handler, async ({
  data
}) => {
  const [resolved, chart] = await Promise.all([Promise.all(data.names.map((name) => safe((async () => {
    const list = ((await get(`/search/artist?q=${encodeURIComponent(name)}&limit=10`)).data ?? []).map(artist);
    return list.filter((a) => norm(a.name) === norm(name) && hasPhoto(a)).sort((a, b) => b.fans - a.fans)[0] ?? null;
  })(), null))), data.deezerGenre ? safe(get(`/editorial/${data.deezerGenre}/charts`), null) : Promise.resolve(null)]);
  const curated = resolved.filter((a) => !!a);
  const firsts = curated.slice(0, 6);
  const [albumLists, trackLists] = await Promise.all([Promise.all(firsts.map((a) => safe(get(`/artist/${a.id}/albums?limit=4`).then((r) => (r.data ?? []).map((x) => album(x, a))), []))), Promise.all(firsts.map((a) => safe(get(`/artist/${a.id}/top?limit=3`).then((r) => (r.data ?? []).map((t) => track(t))), [])))]);
  const interleave = (lists, per) => {
    const out = [];
    for (let i = 0; i < per; i++) for (const l of lists) if (l[i]) out.push(l[i]);
    return out;
  };
  const uniq = (xs) => {
    const seen = /* @__PURE__ */ new Set();
    return xs.filter((x) => !seen.has(x.id) && !!seen.add(x.id));
  };
  const chartArtists = (chart?.artists?.data ?? []).map(artist).filter(hasPhoto);
  const chartAlbums = (chart?.albums?.data ?? []).map((x) => album(x));
  const chartTracks = (chart?.tracks?.data ?? []).map((t) => track(t));
  return {
    artists: uniq([...curated, ...chartArtists]).slice(0, 20),
    albums: uniq([...interleave(albumLists.map((l) => l.filter((x) => x.type === "album")), 2), ...chartAlbums]).slice(0, 14),
    tracks: uniq([...interleave(trackLists, 2), ...chartTracks]).filter((t) => t.preview).slice(0, 14)
  };
});
const DEFAULT_SHOW_ARTISTS = ["Ricardo Arjona", "Airbag", "Dillom", "LALI", "Adéla", "María Becerra", "TINI"];
async function ticketmaster(keyword, size, near, radiusKm = 150) {
  const key = process.env["TICKETMASTER_API_KEY"];
  if (!key) {
    console.warn("[shows] Falta el secreto TICKETMASTER_API_KEY: no se buscan shows externos.");
    return [];
  }
  const geo = near ? `&latlong=${near.lat.toFixed(4)},${near.lng.toFixed(4)}&radius=${radiusKm}&unit=km` : "";
  const kw = keyword ? `&keyword=${encodeURIComponent(keyword)}` : "";
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${encodeURIComponent(key)}${kw}${geo}&classificationName=music&sort=date,asc&size=${size}`;
  const res = await fetch(url, {
    headers: {
      accept: "application/json"
    }
  });
  if (!res.ok) {
    console.warn(`[shows] Ticketmaster respondió ${res.status}`);
    return [];
  }
  const json = await res.json();
  const norm2 = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const k = norm2(keyword);
  return (json?._embedded?.events ?? []).filter((e) => !k || (e._embedded?.attractions ?? []).some((a) => norm2(a.name ?? "").includes(k)) || norm2(e.name ?? "").includes(k)).map((e) => {
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
      url: e.url ?? "",
      lat: venue?.location?.latitude ? Number(venue.location.latitude) : void 0,
      lng: venue?.location?.longitude ? Number(venue.location.longitude) : void 0
    };
  });
}
const MONTHS = {
  ene: 0,
  jan: 0,
  feb: 1,
  mar: 2,
  abr: 3,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  aug: 7,
  sep: 8,
  set: 8,
  oct: 9,
  nov: 10,
  dic: 11,
  dec: 11
};
function serpDate(when, start) {
  const txt = `${start ?? ""} ${when ?? ""}`.toLowerCase();
  let day = 0, mon;
  for (const m of txt.matchAll(/(\d{1,2})\s+(?:de\s+)?([a-zñ]{3})|([a-z]{3})[a-z]*\.?\s+(\d{1,2})\b/g)) {
    const [d, mo] = m[1] ? [Number(m[1]), MONTHS[m[2]]] : [Number(m[4]), MONTHS[m[3]]];
    if (mo != null && d >= 1 && d <= 31) {
      day = d;
      mon = mo;
      break;
    }
  }
  if (mon == null || !day) return null;
  const time = (when ?? "").match(/(\d{1,2}):(\d{2})/);
  const now = /* @__PURE__ */ new Date();
  let year = now.getUTCFullYear();
  if (new Date(Date.UTC(year, mon, day + 1)) < now) year += 1;
  return new Date(Date.UTC(year, mon, day, time ? Number(time[1]) + 3 : 3, time ? Number(time[2]) : 0)).toISOString();
}
async function cached(key, load, maxAge = 86400) {
  const cache = globalThis.caches?.default;
  const req = new Request(`https://drop-cache.local/${encodeURIComponent(key)}`);
  if (cache) {
    try {
      const hit = await cache.match(req);
      if (hit) return await hit.json();
    } catch {
    }
  }
  const value = await load();
  if (cache) {
    try {
      await cache.put(req, new Response(JSON.stringify(value), {
        headers: {
          "content-type": "application/json",
          "cache-control": `max-age=${maxAge}`
        }
      }));
    } catch {
    }
  }
  return value;
}
async function googleEvents(artist2, size, city) {
  const key = process.env["SERPAPI_KEY"];
  if (!key) return [];
  const q = city ? `recitales en ${city}` : `${artist2} concierto`;
  return cached(`serp:${q.toLowerCase()}`, async () => {
    const url = `https://serpapi.com/search.json?engine=google_events&q=${encodeURIComponent(q)}&hl=es&gl=ar&api_key=${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      headers: {
        accept: "application/json"
      }
    });
    if (!res.ok) {
      console.warn(`[shows] SerpApi respondió ${res.status}`);
      return [];
    }
    const json = await res.json();
    const norm2 = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const k = norm2(artist2);
    return (json?.events_results ?? []).filter((e) => city || norm2(`${e.title ?? ""} ${e.description ?? ""}`).includes(k)).map((e) => {
      const addr = Array.isArray(e.address) ? e.address : [];
      const who = city ? String(e.title ?? "").split(/\s+(?:en|at|@|-|–|\|)\s+/i)[0].trim() || "Recital" : artist2;
      return {
        id: `gg-${norm2(`${e.title ?? ""}-${e.date?.start_date ?? ""}`).replace(/\W+/g, "-").slice(0, 60)}`,
        title: e.title ?? artist2,
        artist: who,
        event_date: serpDate(e.date?.when, e.date?.start_date),
        venue: e.venue?.name ?? addr[0] ?? "",
        city: addr[1] ?? addr[0] ?? "",
        image_url: e.image ?? e.thumbnail ?? null,
        url: e.ticket_info?.find((t) => t.link_type === "tickets")?.link ?? e.link ?? ""
      };
    }).filter((s) => !s.event_date || s.event_date >= (/* @__PURE__ */ new Date()).toISOString()).slice(0, size);
  }, city ? 86400 : 3 * 86400);
}
const getExternalShows_createServerFn_handler = createServerRpc({
  id: "522aa85cbb8fce92d84be3391ada9011fc90f0023a0fd4439e87bce8855aa852",
  name: "getExternalShows",
  filename: "src/lib/music.functions.ts"
}, (opts) => getExternalShows.__executeServer(opts));
const getExternalShows = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  q: stringType().trim().max(80).optional(),
  artists: arrayType(stringType().trim().min(2).max(60)).max(10).optional(),
  near: objectType({
    lat: numberType().min(-90).max(90),
    lng: numberType().min(-180).max(180)
  }).optional(),
  /** Ciudad del fan: suma recitales de cualquier artista en esa ciudad. */
  city: stringType().trim().min(2).max(60).optional()
}).parse(input ?? {})).handler(getExternalShows_createServerFn_handler, async ({
  data
}) => {
  try {
    const artists = data.artists?.length ? data.artists : DEFAULT_SHOW_ARTISTS;
    const lists = data.q && data.q.length >= 2 ? await Promise.all([ticketmaster(data.q, 10), googleEvents(data.q, 10)]) : await Promise.all([
      ...artists.map((a) => ticketmaster(a, 4)),
      ...artists.map((a) => googleEvents(a, 4)),
      ...data.city ? [googleEvents("", 20, data.city)] : [],
      // Shows de música cerca del fan, de cualquier artista.
      ...data.near ? [ticketmaster("", 20, data.near)] : []
    ]);
    const seen = /* @__PURE__ */ new Set();
    return lists.flat().filter((s) => seen.has(s.id) ? false : (seen.add(s.id), true)).sort((a, b) => (a.event_date ?? "9").localeCompare(b.event_date ?? "9")).slice(0, 60);
  } catch {
    return [];
  }
});
export {
  getCatalogAlbum_createServerFn_handler,
  getCatalogArtist_createServerFn_handler,
  getExternalShows_createServerFn_handler,
  getGenreCatalog_createServerFn_handler,
  searchCatalog_createServerFn_handler
};
