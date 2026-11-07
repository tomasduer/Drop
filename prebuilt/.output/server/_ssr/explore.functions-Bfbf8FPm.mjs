import { c as createServerRpc } from "./createServerRpc-RqwaDr7O.mjs";
import { a as createServerFn } from "./server-XqUAQpbX.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CqOAf8pQ.mjs";

import "../_libs/react.mjs";
import { o as objectType, b as booleanType, s as stringType, n as numberType, a as arrayType, e as enumType } from "../_libs/zod.mjs";

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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
function deriveStatus(campaignStatus, missions, attempted, completed) {
  if (campaignStatus === "finished") return "finalizado";
  const playable = missions.filter((m) => m.status !== "demo");
  if (playable.length > 0 && playable.every((m) => completed.has(m.id))) return "completado";
  if (missions.some((m) => attempted.has(m.id) || completed.has(m.id))) return "en_curso";
  return "guardado";
}
const getExploreData_createServerFn_handler = createServerRpc({
  id: "5dcc132c067f3262e7d4369fcf16b0946c9e445fce9c17768bfe309d52994322",
  name: "getExploreData",
  filename: "src/lib/explore.functions.ts"
}, (opts) => getExploreData.__executeServer(opts));
const getExploreData = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getExploreData_createServerFn_handler, async ({
  context
}) => {
  const db = context.supabase;
  const userId = context.userId;
  const [reviews, shows, saves, myShows] = await Promise.all([db.from("reviews").select("*").order("created_at", {
    ascending: false
  }).limit(30), db.from("shows").select("*").order("created_at", {
    ascending: true
  }), db.from("drop_saves").select("campaign_id").eq("user_id", userId), db.from("user_shows").select("show_id").eq("user_id", userId)]);
  if (reviews.error || shows.error || saves.error || myShows.error) throw new Error("No pudimos cargar Explorar.");
  return {
    reviews: reviews.data ?? [],
    shows: shows.data ?? [],
    mySavedDropIds: (saves.data ?? []).map((r) => r.campaign_id),
    myShowIds: (myShows.data ?? []).map((r) => r.show_id)
  };
});
const getProfileExtras_createServerFn_handler = createServerRpc({
  id: "2ad628d4ac4324ccbb9a1bbfcfd9bc015c6c1cb41684e66ef854436ea1c2c7b4",
  name: "getProfileExtras",
  filename: "src/lib/explore.functions.ts"
}, (opts) => getProfileExtras.__executeServer(opts));
const getProfileExtras = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getProfileExtras_createServerFn_handler, async ({
  context
}) => {
  const db = context.supabase;
  const userId = context.userId;
  const [saves, campaigns, missions, attempts, completions, reviews, myShows, shows, followers, following] = await Promise.all([db.from("drop_saves").select("campaign_id, created_at").eq("user_id", userId).order("created_at", {
    ascending: false
  }), db.from("campaigns").select("id, artist, title, status"), db.from("missions").select("id, campaign_id, status"), db.from("mission_attempts").select("mission_id").eq("user_id", userId), db.from("mission_completions").select("mission_id").eq("user_id", userId), db.from("reviews").select("*").eq("user_id", userId).order("created_at", {
    ascending: false
  }), db.from("user_shows").select("show_id").eq("user_id", userId), db.from("shows").select("*"), db.from("fan_follows").select("user_id", {
    count: "exact",
    head: true
  }).eq("followed_id", userId), db.from("fan_follows").select("followed_id", {
    count: "exact",
    head: true
  }).eq("user_id", userId)]);
  const firstError = [saves, campaigns, missions, attempts, completions, reviews, myShows, shows, followers, following].find((r) => r.error);
  if (firstError?.error) throw new Error("No pudimos cargar tu perfil.");
  const campaignById = new Map((campaigns.data ?? []).map((c) => [c.id, c]));
  const missionsByCampaign = /* @__PURE__ */ new Map();
  for (const m of missions.data ?? []) {
    missionsByCampaign.set(m.campaign_id, [...missionsByCampaign.get(m.campaign_id) ?? [], m]);
  }
  const attempted = new Set((attempts.data ?? []).map((a) => a.mission_id));
  const completed = new Set((completions.data ?? []).map((c) => c.mission_id));
  const savedDrops = [];
  for (const s of saves.data ?? []) {
    const campaign = campaignById.get(s.campaign_id);
    if (!campaign) continue;
    savedDrops.push({
      campaign_id: s.campaign_id,
      artist: campaign.artist,
      title: campaign.title,
      saved_at: s.created_at,
      status: deriveStatus(campaign.status, missionsByCampaign.get(s.campaign_id) ?? [], attempted, completed)
    });
  }
  const showById = new Map((shows.data ?? []).map((s) => [s.id, s]));
  return {
    savedDrops,
    reviews: reviews.data ?? [],
    shows: (myShows.data ?? []).map((r) => showById.get(r.show_id)).filter(Boolean),
    followers: followers.count ?? 0,
    following: following.count ?? 0
  };
});
const saveDropAction_createServerFn_handler = createServerRpc({
  id: "15ae6b614b5545c3e9d203b95b43f813cd72465a3c542a500f025bcd8f32bdbb",
  name: "saveDropAction",
  filename: "src/lib/explore.functions.ts"
}, (opts) => saveDropAction.__executeServer(opts));
const saveDropAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  campaign_id: stringType().min(1),
  save: booleanType()
}).parse(input)).handler(saveDropAction_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = context.supabase;
  const {
    error
  } = data.save ? await db.from("drop_saves").insert({
    user_id: context.userId,
    campaign_id: data.campaign_id
  }) : await db.from("drop_saves").delete().eq("user_id", context.userId).eq("campaign_id", data.campaign_id);
  if (error) throw new Error("No pudimos actualizar tu colección.");
  return true;
});
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
const publishReview_createServerFn_handler = createServerRpc({
  id: "a33c3cc94392ee7cca7ef423c3e49dda14dc5c1ee99e56b6d5f59834f7fc045d",
  name: "publishReview",
  filename: "src/lib/explore.functions.ts"
}, (opts) => publishReview.__executeServer(opts));
const publishReview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => reviewInput.parse(input)).handler(publishReview_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = context.supabase;
  const {
    data: profile
  } = await db.from("profiles").select("display_name").eq("id", context.userId).single();
  const {
    extras,
    ...base
  } = data;
  const row = extras && Object.keys(extras).length ? {
    ...base,
    extras
  } : base;
  const {
    error
  } = await db.from("reviews").upsert({
    ...row,
    user_id: context.userId,
    author_name: profile?.display_name ?? ""
  }, {
    onConflict: "user_id,subject_type,subject_id"
  });
  if (error) throw new Error("No pudimos publicar tu reseña.");
  return true;
});
const deleteReview_createServerFn_handler = createServerRpc({
  id: "d6c7a574c205e89d16efa0c91ed8a29e5c63d6daa191ae0e979f61edb523a329",
  name: "deleteReview",
  filename: "src/lib/explore.functions.ts"
}, (opts) => deleteReview.__executeServer(opts));
const deleteReview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  subject_type: enumType(["album", "artist", "show", "song"]),
  subject_id: stringType().min(1)
}).parse(input)).handler(deleteReview_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = context.supabase;
  const {
    error
  } = await db.from("reviews").delete().eq("user_id", context.userId).eq("subject_type", data.subject_type).eq("subject_id", data.subject_id);
  if (error) throw new Error("No pudimos eliminar tu reseña.");
  return true;
});
const showAttendanceAction_createServerFn_handler = createServerRpc({
  id: "3ab86973ec6b53fb1aa807ef98203c41b8520f379342ed1ff996c1db1a5dbb47",
  name: "showAttendanceAction",
  filename: "src/lib/explore.functions.ts"
}, (opts) => showAttendanceAction.__executeServer(opts));
const showAttendanceAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  show_id: stringType().min(1),
  attended: booleanType()
}).parse(input)).handler(showAttendanceAction_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = context.supabase;
  const {
    error
  } = data.attended ? await db.from("user_shows").insert({
    user_id: context.userId,
    show_id: data.show_id
  }) : await db.from("user_shows").delete().eq("user_id", context.userId).eq("show_id", data.show_id);
  if (error) throw new Error("No pudimos actualizar tus shows.");
  return true;
});
export {
  deleteReview_createServerFn_handler,
  getExploreData_createServerFn_handler,
  getProfileExtras_createServerFn_handler,
  publishReview_createServerFn_handler,
  saveDropAction_createServerFn_handler,
  showAttendanceAction_createServerFn_handler
};
