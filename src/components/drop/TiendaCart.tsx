import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, CreditCard, Loader2, MapPin, Minus, Package, Plus, ShoppingCart, Store as StoreIcon, Trash2, Wallet } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/merch";
import {
  FREE_SHIPPING_FROM, PICKUP_POINT, cartCount, cartSubtotal, placeOrder, saveAddress, setQty, shippingFor,
  useAddress, useCart, useOrders, type Address, type Order,
} from "@/lib/cart";
import type { Product } from "./TiendaView";

function BackHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <header className="grid grid-cols-[40px_1fr_40px] items-center px-4 pb-2 pt-2">
      <button type="button" aria-label="Volver" onClick={() => router.history.back()} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card"><ArrowLeft className="h-4 w-4" /></button>
      <h1 className="text-center text-lg font-black">{title}</h1>
      <span />
    </header>
  );
}

export function CartView({ suggestions, onOpen, onAddress }: { suggestions: Product[]; onOpen: (p: Product) => void; onAddress: () => void }) {
  const cart = useCart();
  const address = useAddress();
  const [delivery, setDelivery] = useState<"envio" | "retiro">("envio");
  const [checkout, setCheckout] = useState(false);
  const [done, setDone] = useState<Order | null>(null);
  const subtotal = cartSubtotal(cart);
  const shipping = shippingFor(subtotal, delivery);

  if (done) return <OrderDone order={done} />;

  return (
    <div>
      <BackHeader title="Carrito" />
      <div className="grid grid-cols-2 border-b border-border">
        {(["envio", "retiro"] as const).map((d) => (
          <button key={d} type="button" onClick={() => setDelivery(d)} className={`border-b-2 py-3 text-sm font-black ${delivery === d ? "border-foreground" : "border-transparent text-muted-foreground"}`}>
            {d === "envio" ? "Envío estándar" : "Retiro"}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4">
        {delivery === "envio" ? (
          <button type="button" onClick={onAddress} className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm">
            <MapPin className="h-4 w-4 shrink-0" />
            {address ? <span className="min-w-0 flex-1"><b className="block truncate">{address.name}</b><span className="block truncate text-xs text-muted-foreground">{address.street}, {address.city} ({address.zip})</span></span> : <span className="flex-1">Añadir dirección de envío</span>}
            {address ? <span className="text-xs font-bold text-primary">Cambiar</span> : <Plus className="h-4 w-4" />}
          </button>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm">
            <StoreIcon className="h-4 w-4 shrink-0" />
            <span><b className="block">Retiro gratis</b><span className="text-xs text-muted-foreground">{PICKUP_POINT}</span></span>
          </div>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="px-4 py-14 text-center">
          <ShoppingCart className="mx-auto h-14 w-14 text-muted-foreground" strokeWidth={1.4} />
          <p className="mt-3 text-sm text-muted-foreground">Tu carrito está vacío.</p>
          <Link to="/tienda" className="mt-4 inline-block rounded-xl border border-border px-8 py-3 text-sm font-black">Ir a la Tienda</Link>
        </div>
      ) : (
        <div className="px-4 pt-4">
          <div className="space-y-3">
            {cart.map((l) => (
              <article key={`${l.dropId}-${l.itemId}`} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
                <img src={l.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary">{l.artist}</p>
                  <p className="line-clamp-2 text-sm font-bold leading-snug">{l.name}</p>
                  <p className="mt-0.5 text-sm font-black tabular-nums">{formatPrice(l.price * l.qty)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button type="button" aria-label="Restar" onClick={() => setQty(l.dropId, l.itemId, l.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full border border-border">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                    <span className="w-5 text-center text-sm font-black tabular-nums">{l.qty}</span>
                    <button type="button" aria-label="Sumar" disabled={l.qty >= 10} onClick={() => setQty(l.dropId, l.itemId, l.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full border border-border disabled:opacity-40"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 rounded-2xl border border-border bg-card p-4 text-sm">
            <p className="flex justify-between"><span className="text-muted-foreground">Productos ({cartCount(cart)})</span><span className="tabular-nums">{formatPrice(subtotal)}</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">{delivery === "envio" ? "Envío" : "Retiro"}</span><span className="tabular-nums">{shipping ? formatPrice(shipping) : "Gratis"}</span></p>
            {delivery === "envio" && shipping > 0 && <p className="text-[11px] text-primary">Te faltan {formatPrice(FREE_SHIPPING_FROM - subtotal)} para el envío gratis.</p>}
            <p className="flex justify-between border-t border-border pt-2 text-base font-black"><span>Total</span><span className="tabular-nums">{formatPrice(subtotal + shipping)}</span></p>
          </div>
          <button type="button" onClick={() => (delivery === "envio" && !address ? onAddress() : setCheckout(true))}
            className="mt-3 w-full rounded-2xl py-4 text-sm font-black text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>
            {delivery === "envio" && !address ? "Agregá una dirección para continuar" : `Comprar · ${formatPrice(subtotal + shipping)}`}
          </button>
        </div>
      )}

      {suggestions.length > 0 && (
        <section className="mt-8 rounded-t-3xl border-t border-border bg-card px-4 pb-4 pt-5">
          <h2 className="text-lg font-black">Te puede gustar</h2>
          <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
            {suggestions.map((p) => (
              <button key={`${p.drop.id}-${p.item.id}`} type="button" onClick={() => onOpen(p)} className="w-32 shrink-0 text-left">
                <img src={p.item.image} alt="" loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
                <p className="mt-1.5 truncate text-xs font-bold">{p.item.name}</p>
                <p className="text-xs font-black tabular-nums">{formatPrice(p.item.price)}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {checkout && <CheckoutDialog total={subtotal + shipping} onClose={() => setCheckout(false)} onPaid={() => { setCheckout(false); setDone(placeOrder(delivery)); }} />}
    </div>
  );
}

function CheckoutDialog({ total, onClose, onPaid }: { total: number; onClose: () => void; onPaid: () => void }) {
  const [method, setMethod] = useState<"tarjeta" | "mp">("tarjeta");
  const [paying, setPaying] = useState(false);
  return (
    <Dialog open onOpenChange={(o) => { if (!o && !paying) onClose(); }}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Pagar {formatPrice(total)}</DialogTitle>
          <DialogDescription>Compra de demostración: no se cobra nada.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {([["tarjeta", "Tarjeta de crédito o débito", CreditCard], ["mp", "Billetera virtual", Wallet]] as const).map(([id, label, Icon]) => (
            <button key={id} type="button" onClick={() => setMethod(id)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm font-bold ${method === id ? "border-primary bg-primary/10" : "border-border"}`}>
              <Icon className="h-4 w-4" />{label}
              <span className={`ml-auto h-4 w-4 rounded-full border-2 ${method === id ? "border-primary bg-primary" : "border-border"}`} />
            </button>
          ))}
        </div>
        <button type="button" disabled={paying} onClick={() => { setPaying(true); setTimeout(onPaid, 1200); }}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black text-primary-foreground disabled:opacity-80" style={{ backgroundImage: "var(--gradient-drop)" }}>
          {paying ? <><Loader2 className="h-4 w-4 animate-spin" />Procesando…</> : "Confirmar pago"}
        </button>
      </DialogContent>
    </Dialog>
  );
}

function OrderDone({ order }: { order: Order }) {
  return (
    <div className="px-5 pt-10 text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-primary" strokeWidth={1.6} />
      <h1 className="mt-3 text-2xl font-black">¡Compra confirmada!</h1>
      <p className="mt-1 text-sm text-muted-foreground">Pedido {order.id} · {formatPrice(order.total)}</p>
      <p className="mt-1 text-xs text-muted-foreground">{order.delivery === "envio" ? `Llega a ${order.address?.street ?? "tu dirección"} en 3 a 5 días hábiles.` : `Retiralo en ${PICKUP_POINT}.`}</p>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <Link to="/tienda" search={{ v: "pedidos" }} className="rounded-2xl border border-border py-3 text-sm font-black">Mis pedidos</Link>
        <Link to="/tienda" className="rounded-2xl py-3 text-sm font-black text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>Seguir comprando</Link>
      </div>
    </div>
  );
}

export function OrdersView() {
  const orders = useOrders();
  return (
    <div>
      <BackHeader title="Mis pedidos" />
      <div className="space-y-3 px-4 pt-3">
        {orders.length === 0 ? (
          <div className="py-14 text-center">
            <Package className="mx-auto h-14 w-14 text-muted-foreground" strokeWidth={1.4} />
            <p className="mt-3 text-sm text-muted-foreground">Todavía no hiciste ningún pedido.</p>
            <Link to="/tienda" className="mt-4 inline-block rounded-xl border border-border px-8 py-3 text-sm font-black">Ir a la Tienda</Link>
          </div>
        ) : orders.map((o) => (
          <article key={o.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-xs">
              <b>{o.id}</b>
              <span className="rounded-full bg-primary/15 px-2 py-0.5 font-bold text-primary">Confirmado</span>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{new Date(o.at).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })} · {o.delivery === "envio" ? "Envío a domicilio" : "Retiro"}</p>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {o.lines.map((l) => (
                <div key={`${l.dropId}-${l.itemId}`} className="relative shrink-0">
                  <img src={l.image} alt={l.name} className="h-14 w-14 rounded-lg object-cover" />
                  {l.qty > 1 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-black text-background">{l.qty}</span>}
                </div>
              ))}
            </div>
            <p className="mt-3 flex justify-between text-sm font-black"><span>Total</span><span className="tabular-nums">{formatPrice(o.total)}</span></p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AddressDialog({ onClose }: { onClose: () => void }) {
  const current = useAddress();
  const [a, setA] = useState<Address>(current ?? { name: "", street: "", city: "", zip: "", phone: "" });
  const field = (key: keyof Address, label: string, placeholder: string, inputMode?: "numeric" | "tel") => (
    <label className="block space-y-1 text-xs font-bold">{label}
      <Input value={a[key]} inputMode={inputMode} placeholder={placeholder} onChange={(e) => setA((x) => ({ ...x, [key]: e.target.value }))} />
    </label>
  );
  const valid = a.name.trim() && a.street.trim() && a.city.trim() && a.zip.trim();
  return (
    <Dialog open onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Dirección de envío</DialogTitle>
          <DialogDescription>Envíos a toda Argentina.</DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (!valid) return; saveAddress({ name: a.name.trim(), street: a.street.trim(), city: a.city.trim(), zip: a.zip.trim(), phone: a.phone.trim() }); onClose(); }}>
          {field("name", "Nombre y apellido", "Como figura en tu DNI")}
          {field("street", "Calle y número", "Av. Siempre Viva 742, 3°B")}
          <div className="grid grid-cols-[1fr_96px] gap-2">
            {field("city", "Ciudad y provincia", "CABA")}
            {field("zip", "Código postal", "1405", "numeric")}
          </div>
          {field("phone", "Teléfono (opcional)", "11 5555 5555", "tel")}
          <button type="submit" disabled={!valid} className="w-full rounded-xl py-3 text-sm font-black text-primary-foreground disabled:opacity-50" style={{ backgroundImage: "var(--gradient-drop)" }}>Guardar dirección</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
