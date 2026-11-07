import process from "node:process";
import { c as createServerRpc } from "./createServerRpc-B9b284sz.mjs";
import { a as createServerFn } from "./server-C-awTQ8L.mjs";
import { D as DROP_CATALOG } from "./drops-BlLon2GW.mjs";
import { F as FREE_SHIPPING_FROM, S as SHIPPING_COST } from "./cart-BtVFNRJP.mjs";

import "../_libs/react.mjs";
import "../_libs/sonner.mjs";
import { o as objectType, a as arrayType, n as numberType, s as stringType, e as enumType } from "../_libs/zod.mjs";
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
import "./AuthProvider-R59CGjSv.mjs";
import "./client-B2itNBhI.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-CUVMJrTW.mjs";
const input = objectType({
  orderId: stringType().regex(/^DRP-[A-Z0-9]{4,12}$/),
  delivery: enumType(["envio", "retiro"]),
  origin: stringType().url(),
  lines: arrayType(objectType({
    dropId: stringType().max(60),
    itemId: stringType().max(60),
    qty: numberType().int().min(1).max(10)
  })).min(1).max(30)
});
const ALLOWED_ORIGIN = /^(https:\/\/drop\.duerluli\.workers\.dev|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?)$/;
const startCheckout_createServerFn_handler = createServerRpc({
  id: "c2bafbf3f504f9d983764d74ddf1a1630198061f10eaf585f82554d294b52d63",
  name: "startCheckout",
  filename: "src/lib/payments.functions.ts"
}, (opts) => startCheckout.__executeServer(opts));
const startCheckout = createServerFn({
  method: "POST"
}).inputValidator((data) => input.parse(data)).handler(startCheckout_createServerFn_handler, async ({
  data
}) => {
  const token = process.env["MP_ACCESS_TOKEN"];
  if (!token) return {
    mode: "demo"
  };
  const origin = ALLOWED_ORIGIN.test(data.origin) ? data.origin : "https://drop.duerluli.workers.dev";
  const items = data.lines.map((l) => {
    const drop = DROP_CATALOG.find((d) => d.id === l.dropId);
    const item = drop?.merch?.find((m) => m.id === l.itemId);
    if (!drop || !item) throw new Error("Uno de los productos ya no está disponible.");
    return {
      id: `${drop.id}:${item.id}`,
      title: `${item.name} · ${drop.artist}`,
      quantity: l.qty,
      unit_price: item.price,
      currency_id: "ARS"
    };
  });
  const subtotal = items.reduce((n, i) => n + i.unit_price * i.quantity, 0);
  if (data.delivery === "envio" && subtotal < FREE_SHIPPING_FROM) {
    items.push({
      id: "envio",
      title: "Envío a domicilio",
      quantity: 1,
      unit_price: SHIPPING_COST,
      currency_id: "ARS"
    });
  }
  const back = (status) => `${origin}/tienda?v=pedidos&pago=${status}&ref=${data.orderId}`;
  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
      "x-idempotency-key": data.orderId
    },
    body: JSON.stringify({
      items,
      external_reference: data.orderId,
      statement_descriptor: "DROP",
      back_urls: {
        success: back("ok"),
        pending: back("pendiente"),
        failure: back("error")
      },
      auto_return: "approved"
    })
  });
  if (!res.ok) throw new Error("Mercado Pago no respondió. Probá de nuevo en un rato.");
  const pref = await res.json();
  const url = token.startsWith("TEST-") ? pref.sandbox_init_point ?? pref.init_point : pref.init_point;
  if (!url) throw new Error("Mercado Pago no respondió. Probá de nuevo en un rato.");
  return {
    mode: "mp",
    url
  };
});
export {
  startCheckout_createServerFn_handler
};
