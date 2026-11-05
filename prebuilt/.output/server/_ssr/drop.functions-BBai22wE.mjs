import { c as createServerRpc } from "./createServerRpc-cVoKx-Et.mjs";
import { c as createServerFn } from "./server-Cgu2ILy7.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-JBxLnywr.mjs";

import "../_libs/react.mjs";
import { o as objectType, r as recordType, u as unionType, s as stringType, n as numberType, a as arrayType, e as enumType, b as booleanType } from "../_libs/zod.mjs";

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
const getDropState_createServerFn_handler = createServerRpc({
  id: "0282cb30ac3d9a0c6fdc29fccd2150591b518ac68ad6d46d2f846c7a83b82204",
  name: "getDropState",
  filename: "src/lib/drop.functions.ts"
}, (opts) => getDropState.__executeServer(opts));
const getDropState = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getDropState_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.rpc("drop_account_state");
  if (error) throw new Error("No pudimos cargar tu cuenta.");
  return data;
});
const missionAction_createServerFn_handler = createServerRpc({
  id: "672ca852e924c795e9c5f7c87461a501218d2d415283046631b40cfb30f21f0b",
  name: "missionAction",
  filename: "src/lib/drop.functions.ts"
}, (opts) => missionAction.__executeServer(opts));
const missionAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  action: enumType(["start", "answer", "check"]),
  payload: recordType(unionType([stringType(), numberType(), arrayType(numberType())]))
}).parse(input)).handler(missionAction_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: result,
    error
  } = await context.supabase.rpc("drop_mission_action", {
    p_action: data.action,
    p_payload: data.payload
  });
  if (error) throw new Error("No se pudo validar la misión. Revisá su disponibilidad o retomá tu intento.");
  return result;
});
const pointsAction_createServerFn_handler = createServerRpc({
  id: "b693e632df351f79af665d6f3a4e38bd61d59d8d309969c9fec1dc129ccea2e0",
  name: "pointsAction",
  filename: "src/lib/drop.functions.ts"
}, (opts) => pointsAction.__executeServer(opts));
const pointsAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  action: enumType(["album", "redeem"]),
  payload: recordType(unionType([stringType(), booleanType()]))
}).parse(input)).handler(pointsAction_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await context.supabase.rpc("drop_points_action", {
    p_action: data.action,
    p_payload: data.payload
  });
  if (error) throw new Error("No pudimos registrar la operación. Verificá el saldo y la disponibilidad.");
  return true;
});
const getRanking_createServerFn_handler = createServerRpc({
  id: "013869ca50bc89563524db78e408d569fd1e9a22d8182c34bd19298094e3dbaa",
  name: "getRanking",
  filename: "src/lib/drop.functions.ts"
}, (opts) => getRanking.__executeServer(opts));
const getRanking = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  campaign: stringType().min(1),
  scope: enumType(["Global", "Amigos", "Semanal"])
}).parse(input)).handler(getRanking_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: result,
    error
  } = await context.supabase.rpc("drop_ranking", {
    p_campaign: data.campaign,
    p_scope: data.scope
  });
  if (error) throw new Error("No pudimos cargar el ranking.");
  return result;
});
const followFan_createServerFn_handler = createServerRpc({
  id: "c5f12bfbb684a44cd15bc28e4d78d85b20008334d836acbc46c80f5f0e6158d1",
  name: "followFan",
  filename: "src/lib/drop.functions.ts"
}, (opts) => followFan.__executeServer(opts));
const followFan = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  follow: booleanType()
}).parse(input)).handler(followFan_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await context.supabase.rpc("drop_follow", {
    p_followed: data.id,
    p_follow: data.follow
  });
  if (error) throw new Error("No pudimos guardar el seguimiento.");
  return true;
});
export {
  followFan_createServerFn_handler,
  getDropState_createServerFn_handler,
  getRanking_createServerFn_handler,
  missionAction_createServerFn_handler,
  pointsAction_createServerFn_handler
};
