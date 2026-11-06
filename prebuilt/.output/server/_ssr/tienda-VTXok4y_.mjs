import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { M as MobileShell, S as Sheet, i as SheetContent, j as SheetHeader, k as SheetTitle, l as SheetDescription } from "./MobileShell-hjGPfLj4.mjs";
import { G as GlobalNav } from "./GlobalNav-CZEiJ5yb.mjs";
import { L as Link, f as useNavigate, a as useRouter } from "../_libs/tanstack__react-router.mjs";
import { u as useDropAuth, a as useServerFn, g as getRanking, c as createSsrRpc } from "./AuthProvider-BGwqaByN.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useDrops } from "./drops-BbIaGeD-.mjs";
import { a as artistSlug, f as formatPrice } from "./merch-YaTn1SEj.mjs";
import { a as useCart, b as useAddress, c as cartSubtotal, P as PICKUP_POINT, s as setQty, d as cartCount, p as placeOrder, e as saveAddress, f as shippingFor, g as addToCart, n as newOrderId, h as getCart, F as FREE_SHIPPING_FROM, u as useOrders, i as setOrderStatus } from "./cart-BtVFNRJP.mjs";
import { a as createServerFn } from "./server-DSwRp4h_.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-CmMGeO2Z.mjs";
import { I as Input } from "./input-B8N8NBVy.mjs";
import { b as Route } from "./router-CPLxPm6H.mjs";
import "../_libs/vaul.mjs";

import { J as MapPin, u as Plus, ak as Store, al as ShoppingCart, i as Trash2, am as Minus, an as ClipboardList, V as Lock, ao as Package, ap as CircleCheck, s as ArrowLeft, aq as Wallet, ar as CreditCard, L as LoaderCircle, d as Sparkles, X, f as Search, $ as ChevronRight } from "../_libs/lucide-react.mjs";
import { o as objectType, a as arrayType, n as numberType, s as stringType, e as enumType } from "../_libs/zod.mjs";

import "./drop-logo-negativo-DidhibxV.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./client-B2itNBhI.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/unenv.mjs";


import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/isbot.mjs";
import "./auth-middleware-CS0_3MKr.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tailwind-merge.mjs";
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
const startCheckout = createServerFn({
  method: "POST"
}).inputValidator((data) => input.parse(data)).handler(createSsrRpc("c2bafbf3f504f9d983764d74ddf1a1630198061f10eaf585f82554d294b52d63"));
function BackHeader({ title }) {
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[40px_1fr_40px] items-center px-4 pb-2 pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Volver", onClick: () => router.history.back(), className: "grid h-10 w-10 place-items-center rounded-full border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center text-lg font-black", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
  ] });
}
function CartView({ suggestions, onOpen, onAddress }) {
  const cart = useCart();
  const address = useAddress();
  const [delivery, setDelivery] = reactExports.useState("envio");
  const [checkout, setCheckout] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(null);
  const subtotal = cartSubtotal(cart);
  const shipping = shippingFor(subtotal, delivery);
  if (done) return /* @__PURE__ */ jsxRuntimeExports.jsx(OrderDone, { order: done });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackHeader, { title: "Carrito" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 border-b border-border", children: ["envio", "retiro"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDelivery(d), className: `border-b-2 py-3 text-sm font-black ${delivery === d ? "border-foreground" : "border-transparent text-muted-foreground"}`, children: d === "envio" ? "Envío estándar" : "Retiro" }, d)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: delivery === "envio" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onAddress, className: "flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 shrink-0" }),
      address ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "block truncate", children: address.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-xs text-muted-foreground", children: [
          address.street,
          ", ",
          address.city,
          " (",
          address.zip,
          ")"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Añadir dirección de envío" }),
      address ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: "Cambiar" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "block", children: "Retiro gratis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: PICKUP_POINT })
      ] })
    ] }) }),
    cart.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-14 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "mx-auto h-14 w-14 text-muted-foreground", strokeWidth: 1.4 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Tu carrito está vacío." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tienda", className: "mt-4 inline-block rounded-xl border border-border px-8 py-3 text-sm font-black", children: "Ir a la Tienda" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: cart.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex gap-3 rounded-2xl border border-border bg-card p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.image, alt: "", className: "h-20 w-20 shrink-0 rounded-xl object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wide text-primary", children: l.artist }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-sm font-bold leading-snug", children: l.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm font-black tabular-nums", children: formatPrice(l.price * l.qty) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Restar", onClick: () => setQty(l.dropId, l.itemId, l.qty - 1), className: "grid h-7 w-7 place-items-center rounded-full border border-border", children: l.qty === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 text-center text-sm font-black tabular-nums", children: l.qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Sumar", disabled: l.qty >= 10, onClick: () => setQty(l.dropId, l.itemId, l.qty + 1), className: "grid h-7 w-7 place-items-center rounded-full border border-border disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
          ] })
        ] })
      ] }, `${l.dropId}-${l.itemId}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-1.5 rounded-2xl border border-border bg-card p-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "Productos (",
            cartCount(cart),
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: formatPrice(subtotal) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: delivery === "envio" ? "Envío" : "Retiro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: shipping ? formatPrice(shipping) : "Gratis" })
        ] }),
        delivery === "envio" && shipping > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-primary", children: [
          "Te faltan ",
          formatPrice(FREE_SHIPPING_FROM - subtotal),
          " para el envío gratis."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex justify-between border-t border-border pt-2 text-base font-black", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: formatPrice(subtotal + shipping) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => delivery === "envio" && !address ? onAddress() : setCheckout(true),
          className: "mt-3 w-full rounded-2xl py-4 text-sm font-black text-primary-foreground",
          style: { backgroundImage: "var(--gradient-drop)" },
          children: delivery === "envio" && !address ? "Agregá una dirección para continuar" : `Comprar · ${formatPrice(subtotal + shipping)}`
        }
      )
    ] }),
    suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 rounded-t-3xl border-t border-border bg-card px-4 pb-4 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black", children: "Te puede gustar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1", children: suggestions.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onOpen(p), className: "w-32 shrink-0 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.item.image, alt: "", loading: "lazy", className: "aspect-square w-full rounded-xl object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 truncate text-xs font-bold", children: p.item.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black tabular-nums", children: formatPrice(p.item.price) })
      ] }, `${p.drop.id}-${p.item.id}`)) })
    ] }),
    checkout && /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutDialog, { total: subtotal + shipping, delivery, onClose: () => setCheckout(false), onPaid: () => {
      setCheckout(false);
      setDone(placeOrder(delivery));
    } })
  ] });
}
function CheckoutDialog({ total, delivery, onClose, onPaid }) {
  const [method, setMethod] = reactExports.useState("mp");
  const [paying, setPaying] = reactExports.useState(false);
  const start = useServerFn(startCheckout);
  const pay = async () => {
    setPaying(true);
    if (method === "mp") {
      const id = newOrderId();
      try {
        const r = await start({ data: { orderId: id, delivery, origin: window.location.origin, lines: getCart().map((l) => ({ dropId: l.dropId, itemId: l.itemId, qty: l.qty })) } });
        if (r.mode === "mp") {
          placeOrder(delivery, { id, status: "esperando_pago" });
          window.location.href = r.url;
          return;
        }
        toast.message("Mercado Pago todavía no está conectado", { description: "Hicimos la compra en modo demo." });
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "No pudimos iniciar el pago");
        setPaying(false);
        return;
      }
    }
    setTimeout(onPaid, 900);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => {
    if (!o && !paying) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[calc(100%-2rem)] max-w-sm rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Pagar ",
        formatPrice(total)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Elegí cómo querés pagar." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [["mp", "Mercado Pago", "Tarjeta, dinero en cuenta o cuotas", Wallet], ["tarjeta", "Compra demo", "Simula la compra sin cobrar nada", CreditCard]].map(([id, label, hint, Icon]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setMethod(id), className: `flex w-full items-center gap-3 rounded-xl border p-3 text-left ${method === id ? "border-primary bg-primary/10" : "border-border"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "block text-sm", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: hint })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-4 w-4 shrink-0 rounded-full border-2 ${method === id ? "border-primary bg-primary" : "border-border"}` })
    ] }, id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: paying,
        onClick: () => void pay(),
        className: "mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black text-primary-foreground disabled:opacity-80",
        style: { backgroundImage: "var(--gradient-drop)" },
        children: paying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          method === "mp" ? "Abriendo Mercado Pago…" : "Procesando…"
        ] }) : method === "mp" ? "Pagar con Mercado Pago" : "Confirmar compra demo"
      }
    )
  ] }) });
}
function OrderDone({ order }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-10 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-16 w-16 text-primary", strokeWidth: 1.6 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-2xl font-black", children: "¡Compra confirmada!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
      "Pedido ",
      order.id,
      " · ",
      formatPrice(order.total)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: order.delivery === "envio" ? `Llega a ${order.address?.street ?? "tu dirección"} en 3 a 5 días hábiles.` : `Retiralo en ${PICKUP_POINT}.` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tienda", search: { v: "pedidos" }, className: "rounded-2xl border border-border py-3 text-sm font-black", children: "Mis pedidos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tienda", className: "rounded-2xl py-3 text-sm font-black text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: "Seguir comprando" })
    ] })
  ] });
}
const STATUS = {
  confirmado: { label: "Confirmado (demo)", cls: "bg-primary/15 text-primary" },
  pagado: { label: "Pagado", cls: "bg-emerald-500/15 text-emerald-400" },
  esperando_pago: { label: "Esperando pago", cls: "bg-muted text-muted-foreground" },
  pendiente: { label: "Pago pendiente", cls: "bg-amber-500/15 text-amber-400" },
  rechazado: { label: "Pago rechazado", cls: "bg-red-500/15 text-red-400" }
};
function OrdersView({ payment }) {
  const orders = useOrders();
  reactExports.useEffect(() => {
    if (!payment) return;
    setOrderStatus(payment.ref, payment.status === "ok" ? "pagado" : payment.status === "pendiente" ? "pendiente" : "rechazado");
    if (payment.status === "ok") toast.success("¡Pago aprobado!", { description: `Pedido ${payment.ref}` });
    else if (payment.status === "pendiente") toast.message("Tu pago está pendiente", { description: "Te avisamos cuando se acredite." });
    else toast.error("El pago no se completó", { description: "Podés intentarlo de nuevo desde el carrito." });
  }, [payment?.ref, payment?.status]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackHeader, { title: "Mis pedidos" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 px-4 pt-3", children: orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-14 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mx-auto h-14 w-14 text-muted-foreground", strokeWidth: 1.4 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Todavía no hiciste ningún pedido." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tienda", className: "mt-4 inline-block rounded-xl border border-border px-8 py-3 text-sm font-black", children: "Ir a la Tienda" })
    ] }) : orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: o.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 font-bold ${STATUS[o.status]?.cls ?? STATUS.confirmado.cls}`, children: STATUS[o.status]?.label ?? "Confirmado" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-[11px] text-muted-foreground", children: [
        new Date(o.at).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" }),
        " · ",
        o.delivery === "envio" ? "Envío a domicilio" : "Retiro"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2 overflow-x-auto", children: o.lines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.image, alt: l.name, className: "h-14 w-14 rounded-lg object-cover" }),
        l.qty > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-black text-background", children: l.qty })
      ] }, `${l.dropId}-${l.itemId}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 flex justify-between text-sm font-black", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: formatPrice(o.total) })
      ] })
    ] }, o.id)) })
  ] });
}
function AddressDialog({ onClose }) {
  const current = useAddress();
  const [a, setA] = reactExports.useState(current ?? { name: "", street: "", city: "", zip: "", phone: "" });
  const field = (key, label, placeholder, inputMode) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-1 text-xs font-bold", children: [
    label,
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: a[key], inputMode, placeholder, onChange: (e) => setA((x) => ({ ...x, [key]: e.target.value })) })
  ] });
  const valid = a.name.trim() && a.street.trim() && a.city.trim() && a.zip.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => {
    if (!o) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Dirección de envío" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Envíos a toda Argentina." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: (e) => {
      e.preventDefault();
      if (!valid) return;
      saveAddress({ name: a.name.trim(), street: a.street.trim(), city: a.city.trim(), zip: a.zip.trim(), phone: a.phone.trim() });
      onClose();
    }, children: [
      field("name", "Nombre y apellido", "Como figura en tu DNI"),
      field("street", "Calle y número", "Av. Siempre Viva 742, 3°B"),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_96px] gap-2", children: [
        field("city", "Ciudad y provincia", "CABA"),
        field("zip", "Código postal", "1405", "numeric")
      ] }),
      field("phone", "Teléfono (opcional)", "11 5555 5555", "tel"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: !valid, className: "w-full rounded-xl py-3 text-sm font-black text-primary-foreground disabled:opacity-50", style: { backgroundImage: "var(--gradient-drop)" }, children: "Guardar dirección" })
    ] })
  ] }) });
}
function useMerchRanks(drops) {
  const { mode } = useDropAuth();
  const fetchRanking = useServerFn(getRanking);
  const [ranks, setRanks] = reactExports.useState({});
  const key = drops.map((d) => d.id).join(",");
  reactExports.useEffect(() => {
    if (mode !== "user") return;
    for (const d of drops) {
      if (d.status === "upcoming" || !d.merch?.some((m) => m.top)) continue;
      fetchRanking({ data: { campaign: d.id, scope: "Global" } }).then((r) => setRanks((x) => ({ ...x, [d.id]: r.me?.rank ?? null }))).catch(() => void 0);
    }
  }, [mode, key]);
  return ranks;
}
const isLocked = (item, rank) => item.top !== void 0 && (rank == null || rank > item.top);
function TiendaView({ artist, view, payment }) {
  const drops = useDrops();
  const ranks = useMerchRanks(drops);
  const [product, setProduct] = reactExports.useState(null);
  const [menu, setMenu] = reactExports.useState(false);
  const [addressOpen, setAddressOpen] = reactExports.useState(false);
  const stores = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const d of drops) {
      if (!d.merch?.length) continue;
      const slug = artistSlug(d.artist);
      const s = map.get(slug) ?? { slug, artist: d.artist, cover: d.cover, hero: d.hero, drops: [], count: 0 };
      if (d.status === "active" && !s.drops.some((x) => x.status === "active")) {
        s.cover = d.cover;
        s.hero = d.hero;
      }
      s.drops.push(d);
      s.count += d.merch.length;
      map.set(slug, s);
    }
    return [...map.values()].sort((a, b) => Number(b.drops.some((d) => d.status === "active")) - Number(a.drops.some((d) => d.status === "active")));
  }, [drops]);
  const products = reactExports.useMemo(() => stores.flatMap((s) => s.drops.flatMap((d) => d.merch.map((item) => ({ drop: d, item })))), [stores]);
  const store = artist ? stores.find((s) => s.slug === artist) : void 0;
  let body;
  if (view === "carrito") body = /* @__PURE__ */ jsxRuntimeExports.jsx(CartView, { suggestions: products.filter((p) => !p.item.top).slice(0, 6), onOpen: setProduct, onAddress: () => setAddressOpen(true) });
  else if (view === "pedidos") body = /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersView, { payment });
  else if (store) body = /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistStore, { store, ranks, onOpen: setProduct });
  else body = /* @__PURE__ */ jsxRuntimeExports.jsx(StoreHome, { stores, ranks, onOpen: setProduct });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-28", children: [
    view !== "carrito" && view !== "pedidos" && /* @__PURE__ */ jsxRuntimeExports.jsx(StoreHeader, { onMenu: () => setMenu(true) }),
    body,
    product && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSheet, { product, rank: ranks[product.drop.id], onClose: () => setProduct(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StoreMenu, { open: menu, onOpenChange: setMenu, onAddress: () => {
      setMenu(false);
      setAddressOpen(true);
    } }),
    addressOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(AddressDialog, { onClose: () => setAddressOpen(false) })
  ] });
}
function CartButton() {
  const count = cartCount(useCart());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tienda", search: { v: "carrito" }, "aria-label": `Carrito, ${count} productos`, className: "relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }),
    count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground", children: count })
  ] });
}
function StoreHeader({ onMenu }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pb-3 pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tienda", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black tracking-tight", children: "Shop" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onMenu, "aria-label": "Mis pedidos y datos de envío", className: "grid h-10 w-10 place-items-center rounded-full border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function StoreHome({ stores, ranks, onOpen }) {
  const [q, setQ] = reactExports.useState("");
  const norm = (t) => artistSlug(t).replace(/-/g, " ");
  const results = q.trim() ? stores.filter((s) => norm(s.artist).includes(norm(q))) : stores;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 pb-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
        "Envíos a Argentina"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: "Gratis desde $120.000" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCarousel, { stores }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 flex items-center gap-2 rounded-full border-2 border-primary/50 bg-card px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 shrink-0 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscá a tu artista favorito", className: "min-w-0 flex-1 bg-transparent text-sm outline-none" }),
        q ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Borrar búsqueda", onClick: () => setQ(""), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 rounded-3xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: q ? "Resultados" : "Artistas recomendados" }),
        results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Todavía no hay tienda de ese artista." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1", children: results.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tienda", search: { a: s.slug }, className: "w-[76px] shrink-0 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.cover, alt: "", loading: "lazy", decoding: "async", className: "h-[76px] w-[76px] rounded-[22px] border border-border object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 truncate text-[11px] font-bold", children: s.artist })
        ] }, s.slug)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-5 px-5", children: results.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-3xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tienda", search: { a: s.slug }, className: "relative block h-24 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.hero, alt: "", loading: "lazy", decoding: "async", className: "absolute inset-0 h-full w-full object-cover opacity-60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-4 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-background/70 px-2 py-0.5 text-[11px] font-bold", children: s.drops.some((d) => d.status === "active") ? "Ahora" : "Archivo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 flex items-center text-2xl font-black leading-tight", children: [
            s.artist,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto p-4", children: s.drops.flatMap((d) => d.merch.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: { drop: d, item }, rank: ranks[d.id], onOpen, className: "w-40 shrink-0" }, `${d.id}-${item.id}`))) })
    ] }, s.slug)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 px-5 text-[11px] text-muted-foreground", children: "Tienda de demostración: los precios son de referencia y las compras no se cobran." })
  ] });
}
function HeroCarousel({ stores }) {
  const slides = stores.filter((s) => s.drops.some((d) => d.status !== "archived")).slice(0, 6);
  const list = slides.length ? slides : stores.slice(0, 4);
  const ref = reactExports.useRef(null);
  const [i, setI] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el || list.length < 2) return;
    const t = setInterval(() => {
      const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % list.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 5e3);
    return () => clearInterval(t);
  }, [list.length]);
  if (!list.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        onScroll: (e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth)),
        className: "flex snap-x snap-mandatory overflow-x-auto rounded-3xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        children: list.map((s) => {
          const d = s.drops.find((x) => x.status === "active") ?? s.drops[0];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tienda", search: { a: s.slug }, className: "relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.hero, alt: "", decoding: "async", className: "absolute inset-0 h-full w-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-5 text-center text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-black leading-tight", children: [
                s.artist,
                " · ",
                d.title
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black", children: "Merch oficial" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs opacity-75", children: [
                s.count,
                " productos · algunos exclusivos para el ranking"
              ] })
            ] })
          ] }, s.slug);
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: list.map((s, n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "aria-label": `Ver destacado ${n + 1}`,
          "aria-current": n === i,
          onClick: () => ref.current?.scrollTo({ left: n * ref.current.clientWidth, behavior: "smooth" }),
          className: `h-2 rounded-full transition-all duration-500 ease-out ${n === i ? "w-6 bg-foreground" : "w-2 bg-muted-foreground/40"}`
        },
        s.slug
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tabular-nums", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: String(i + 1).padStart(2, "0") }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "| ",
          String(list.length).padStart(2, "0")
        ] })
      ] })
    ] })
  ] });
}
function ProductCard({ product, rank, onOpen, className = "" }) {
  const { item } = product;
  const locked = isLocked(item, rank);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onOpen(product), className: `text-left ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden rounded-2xl bg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, loading: "lazy", decoding: "async", className: "h-full w-full object-cover", style: { opacity: locked ? 0.45 : 1 } }),
      locked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-6 w-6 text-foreground/80" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 line-clamp-2 text-sm font-bold leading-snug", children: item.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-base font-black tabular-nums", children: formatPrice(item.price) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap gap-1", children: [
      item.top !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded border border-primary px-1.5 py-px text-[10px] font-black uppercase text-primary", children: [
        "Exclusivo top ",
        item.top
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded border border-border px-1.5 py-px text-[10px] font-bold text-muted-foreground", children: "Oficial" })
    ] })
  ] });
}
function ArtistStore({ store, ranks, onOpen }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: store.hero, alt: store.artist, decoding: "async", className: "h-56 w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tienda", "aria-label": "Volver a la tienda", className: "absolute left-4 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-5 bottom-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Tienda oficial" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black leading-tight", children: store.artist })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 px-5 pt-2", children: store.drops.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black leading-tight", children: d.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/drop", search: { d: d.id }, className: "shrink-0 text-xs font-bold text-primary", children: "Ver drop" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-3 gap-y-5", children: d.merch.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: { drop: d, item }, rank: ranks[d.id], onOpen }, item.id)) })
    ] }, d.id)) })
  ] });
}
function ProductSheet({ product, rank, onClose }) {
  const { drop, item } = product;
  const navigate = useNavigate();
  const [qty, setQtyState] = reactExports.useState(1);
  const locked = isLocked(item, rank);
  const add = (goToCart) => {
    addToCart({ dropId: drop.id, itemId: item.id, artist: drop.artist, name: item.name, image: item.image, price: item.price }, qty);
    onClose();
    if (goToCart) void navigate({ to: "/tienda", search: { v: "carrito" } });
    else toast.success("Agregado al carrito", { description: item.name, action: { label: "Ver carrito", onClick: () => void navigate({ to: "/tienda", search: { v: "carrito" } }) } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: true, onOpenChange: (o) => {
    if (!o) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "bottom", className: "mx-auto max-h-[92dvh] max-w-[440px] overflow-y-auto rounded-t-3xl p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, className: "aspect-square w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "space-y-1 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: [
          drop.artist,
          " · ",
          drop.title
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-2xl font-black leading-tight", children: item.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: item.detail })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-black tabular-nums", children: formatPrice(item.price) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Precio final · envío gratis desde $120.000" }),
      item.top !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 rounded-2xl border border-primary/40 bg-primary/10 p-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          "Exclusivo para el top ",
          item.top
        ] }),
        " del ranking de ",
        drop.title,
        ".",
        " ",
        locked ? rank == null ? "Sumá puntos en el drop para desbloquearlo." : `Vas #${rank}: te faltan ${rank - item.top} puestos.` : "¡Estás adentro, ya lo podés comprar!"
      ] }),
      locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/drop", search: { d: drop.id }, onClick: onClose, className: "mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-border py-3.5 text-sm font-black", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }),
        "Jugar el drop para desbloquearlo"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between rounded-2xl border border-border p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pl-2 text-sm font-bold", children: "Cantidad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Restar", disabled: qty <= 1, onClick: () => setQtyState((n) => n - 1), className: "grid h-9 w-9 place-items-center rounded-full border border-border disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 text-center font-black tabular-nums", children: qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Sumar", disabled: qty >= 10, onClick: () => setQtyState((n) => n + 1), className: "grid h-9 w-9 place-items-center rounded-full border border-border disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => add(false), className: "rounded-2xl border border-border py-3.5 text-sm font-black", children: "Agregar al carrito" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => add(true), className: "rounded-2xl py-3.5 text-sm font-black text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: "Comprar ahora" })
        ] })
      ] })
    ] })
  ] }) });
}
function StoreMenu({ open, onOpenChange, onAddress }) {
  const rows = [
    { label: "Mis pedidos", to: "pedidos", icon: Package },
    { label: "Carrito", to: "carrito", icon: ShoppingCart },
    { label: "Dirección de envío", onClick: onAddress, icon: MapPin }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-[82%] max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-xl font-black uppercase tracking-wide", children: "Menú" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Tu cuenta en la Tienda DROP." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between border-b border-border pb-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
        "País/Región"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-primary", children: "AR" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1 border-b border-border py-3", children: rows.map((r) => {
      const Icon = r.icon;
      const cls = "flex w-full items-center gap-3 rounded-xl px-1 py-3 text-left text-sm font-semibold";
      return r.to ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tienda", search: { v: r.to }, onClick: () => onOpenChange(false), className: cls, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" }),
        r.label
      ] }, r.label) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: r.onClick, className: cls, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" }),
        r.label
      ] }, r.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Moneda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-primary", children: "ARS $" })
    ] })
  ] }) });
}
function Tienda() {
  const {
    a,
    v,
    pago,
    ref
  } = Route.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TiendaView, { artist: a, view: v, payment: pago && ref ? {
      status: pago,
      ref
    } : void 0 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalNav, {})
  ] });
}
export {
  Tienda as component
};
