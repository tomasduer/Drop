import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ChevronRight, ClipboardList, Lock, MapPin, Minus, Package, Plus, Search, ShoppingCart, Sparkles, Store as StoreIcon, X } from "lucide-react";
import { toast } from "sonner";
import { getRanking } from "@/lib/drop.functions";
import { useDrops, type DropInfo } from "@/lib/drops";
import { artistSlug, formatPrice, type MerchItem } from "@/lib/merch";
import { addToCart, cartCount, useCart } from "@/lib/cart";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useDropAuth } from "./AuthProvider";
import { AddressDialog, CartView, OrdersView } from "./TiendaCart";

type Store = { slug: string; artist: string; cover: string; hero: string; drops: DropInfo[]; count: number };
export type Product = { drop: DropInfo; item: MerchItem };

/** Puesto del fan en el ranking de cada drop que tiene merch exclusiva. */
function useMerchRanks(drops: DropInfo[]) {
  const { mode } = useDropAuth();
  const fetchRanking = useServerFn(getRanking);
  const [ranks, setRanks] = useState<Record<string, number | null>>({});
  const key = drops.map((d) => d.id).join(",");
  useEffect(() => {
    if (mode !== "user") return;
    for (const d of drops) {
      if (d.status === "upcoming" || !d.merch?.some((m) => m.top)) continue;
      fetchRanking({ data: { campaign: d.id, scope: "Global" } })
        .then((r) => setRanks((x) => ({ ...x, [d.id]: r.me?.rank ?? null })))
        .catch(() => undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, key]);
  return ranks;
}

export const isLocked = (item: MerchItem, rank: number | null | undefined) => item.top !== undefined && (rank == null || rank > item.top);

/** Tienda: portada con destacados, artistas y su merch; ficha de producto, carrito y pedidos (demo). */
export function TiendaView({ artist, view, payment }: { artist?: string; view?: "carrito" | "pedidos"; payment?: { status: "ok" | "pendiente" | "error"; ref: string } }) {
  const drops = useDrops();
  const ranks = useMerchRanks(drops);
  const [product, setProduct] = useState<Product | null>(null);
  const [menu, setMenu] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const stores = useMemo(() => {
    const map = new Map<string, Store>();
    for (const d of drops) {
      if (!d.merch?.length) continue;
      const slug = artistSlug(d.artist);
      const s = map.get(slug) ?? { slug, artist: d.artist, cover: d.cover, hero: d.hero, drops: [], count: 0 };
      // La portada de la tienda sale del drop activo del artista, si tiene.
      if (d.status === "active" && !s.drops.some((x) => x.status === "active")) { s.cover = d.cover; s.hero = d.hero; }
      s.drops.push(d);
      s.count += d.merch.length;
      map.set(slug, s);
    }
    // Primero los artistas con drop activo.
    return [...map.values()].sort((a, b) => Number(b.drops.some((d) => d.status === "active")) - Number(a.drops.some((d) => d.status === "active")));
  }, [drops]);
  const products = useMemo(() => stores.flatMap((s) => s.drops.flatMap((d) => d.merch!.map((item) => ({ drop: d, item })))), [stores]);

  const store = artist ? stores.find((s) => s.slug === artist) : undefined;

  let body;
  if (view === "carrito") body = <CartView suggestions={products.filter((p) => !p.item.top).slice(0, 6)} onOpen={setProduct} onAddress={() => setAddressOpen(true)} />;
  else if (view === "pedidos") body = <OrdersView payment={payment} />;
  else if (store) body = <ArtistStore store={store} ranks={ranks} onOpen={setProduct} />;
  else body = <StoreHome stores={stores} ranks={ranks} onOpen={setProduct} />;

  return (
    <div className="pb-28">
      {view !== "carrito" && view !== "pedidos" && <StoreHeader onMenu={() => setMenu(true)} />}
      {body}
      {product && <ProductSheet product={product} rank={ranks[product.drop.id]} onClose={() => setProduct(null)} />}
      <StoreMenu open={menu} onOpenChange={setMenu} onAddress={() => { setMenu(false); setAddressOpen(true); }} />
      {addressOpen && <AddressDialog onClose={() => setAddressOpen(false)} />}
    </div>
  );
}

export function CartButton() {
  const count = cartCount(useCart());
  return (
    <Link to="/tienda" search={{ v: "carrito" }} aria-label={`Carrito, ${count} productos`} className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card">
      <ShoppingCart className="h-4 w-4" />
      {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground">{count}</span>}
    </Link>
  );
}

function StoreHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="flex items-center justify-between px-5 pb-3 pt-2">
      <Link to="/tienda" className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}><StoreIcon className="h-4 w-4" /></span>
        <span className="text-2xl font-black tracking-tight">Shop</span>
      </Link>
      <div className="flex items-center gap-2">
        <CartButton />
        <button type="button" onClick={onMenu} aria-label="Mis pedidos y datos de envío" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card">
          <ClipboardList className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

function StoreHome({ stores, ranks, onOpen }: { stores: Store[]; ranks: Record<string, number | null>; onOpen: (p: Product) => void }) {
  const [q, setQ] = useState("");
  const norm = (t: string) => artistSlug(t).replace(/-/g, " ");
  const results = q.trim() ? stores.filter((s) => norm(s.artist).includes(norm(q))) : stores;

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border px-5 pb-3 text-sm">
        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />Envíos a Argentina</span>
        <span className="text-xs font-bold text-primary">Gratis desde $120.000</span>
      </div>

      <HeroCarousel stores={stores} />

      <div className="px-5">
        <label className="mt-4 flex items-center gap-2 rounded-full border-2 border-primary/50 bg-card px-4 py-3">
          <Sparkles className="h-4 w-4 shrink-0 text-primary" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscá a tu artista favorito" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          {q ? <button type="button" aria-label="Borrar búsqueda" onClick={() => setQ("")}><X className="h-4 w-4 text-muted-foreground" /></button> : <Search className="h-4 w-4 text-muted-foreground" />}
        </label>

        <section className="mt-5 rounded-3xl border border-border bg-card p-4">
          <h2 className="text-xl font-black">{q ? "Resultados" : "Artistas recomendados"}</h2>
          {results.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">Todavía no hay tienda de ese artista.</p> : (
            <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
              {results.map((s) => (
                <Link key={s.slug} to="/tienda" search={{ a: s.slug }} className="w-[76px] shrink-0 text-center">
                  <img src={s.cover} alt="" loading="lazy" decoding="async" className="h-[76px] w-[76px] rounded-[22px] border border-border object-cover" />
                  <p className="mt-1.5 truncate text-[11px] font-bold">{s.artist}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="mt-5 space-y-5 px-5">
        {results.map((s) => (
          <section key={s.slug} className="overflow-hidden rounded-3xl border border-border bg-card">
            <Link to="/tienda" search={{ a: s.slug }} className="relative block h-24 overflow-hidden">
              <img src={s.hero} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
              <div className="relative px-4 pt-3">
                <span className="rounded-md bg-background/70 px-2 py-0.5 text-[11px] font-bold">{s.drops.some((d) => d.status === "active") ? "Ahora" : "Archivo"}</span>
                <p className="mt-1.5 flex items-center text-2xl font-black leading-tight">{s.artist}<ChevronRight className="h-5 w-5" /></p>
              </div>
            </Link>
            <div className="flex gap-3 overflow-x-auto p-4">
              {s.drops.flatMap((d) => d.merch!.map((item) => (
                <ProductCard key={`${d.id}-${item.id}`} product={{ drop: d, item }} rank={ranks[d.id]} onOpen={onOpen} className="w-40 shrink-0" />
              )))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-5 px-5 text-[11px] text-muted-foreground">Tienda de demostración: los precios son de referencia y las compras no se cobran.</p>
    </div>
  );
}

function HeroCarousel({ stores }: { stores: Store[] }) {
  const slides = stores.filter((s) => s.drops.some((d) => d.status !== "archived")).slice(0, 6);
  const list = slides.length ? slides : stores.slice(0, 4);
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || list.length < 2) return;
    const t = setInterval(() => {
      const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % list.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 5000);
    return () => clearInterval(t);
  }, [list.length]);

  if (!list.length) return null;
  return (
    <div className="mt-4 px-5">
      <div ref={ref} onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-3xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {list.map((s) => {
          const d = s.drops.find((x) => x.status === "active") ?? s.drops[0];
          return (
            <Link key={s.slug} to="/tienda" search={{ a: s.slug }} className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden">
              <img src={s.hero} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-center text-white">
                <p className="text-2xl font-black leading-tight">{s.artist} · {d.title}</p>
                <p className="text-lg font-black">Merch oficial</p>
                <p className="mt-1 text-xs opacity-75">{s.count} productos · algunos exclusivos para el ranking</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-center gap-3">
        <div className="flex items-center gap-1.5">
          {list.map((s, n) => (
            <button key={s.slug} type="button" aria-label={`Ver destacado ${n + 1}`} aria-current={n === i}
              onClick={() => ref.current?.scrollTo({ left: n * ref.current.clientWidth, behavior: "smooth" })}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${n === i ? "w-6 bg-foreground" : "w-2 bg-muted-foreground/40"}`} />
          ))}
        </div>
        <span className="text-xs tabular-nums"><b>{String(i + 1).padStart(2, "0")}</b> <span className="text-muted-foreground">| {String(list.length).padStart(2, "0")}</span></span>
      </div>
    </div>
  );
}

export function ProductCard({ product, rank, onOpen, className = "" }: { product: Product; rank: number | null | undefined; onOpen: (p: Product) => void; className?: string }) {
  const { item } = product;
  const locked = isLocked(item, rank);
  return (
    <button type="button" onClick={() => onOpen(product)} className={`text-left ${className}`}>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ opacity: locked ? 0.45 : 1 }} />
        {locked && <span className="absolute inset-0 grid place-items-center"><Lock className="h-6 w-6 text-foreground/80" /></span>}
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug">{item.name}</p>
      <p className="mt-0.5 text-base font-black tabular-nums">{formatPrice(item.price)}</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {item.top !== undefined && <span className="rounded border border-primary px-1.5 py-px text-[10px] font-black uppercase text-primary">Exclusivo top {item.top}</span>}
        <span className="rounded border border-border px-1.5 py-px text-[10px] font-bold text-muted-foreground">Oficial</span>
      </div>
    </button>
  );
}

function ArtistStore({ store, ranks, onOpen }: { store: Store; ranks: Record<string, number | null>; onOpen: (p: Product) => void }) {
  return (
    <div>
      <section className="relative overflow-hidden">
        <img src={store.hero} alt={store.artist} decoding="async" className="h-56 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <Link to="/tienda" aria-label="Volver a la tienda" className="absolute left-4 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/80">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="absolute inset-x-5 bottom-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Tienda oficial</p>
          <h1 className="text-3xl font-black leading-tight">{store.artist}</h1>
        </div>
      </section>
      <div className="space-y-6 px-5 pt-2">
        {store.drops.map((d) => (
          <div key={d.id}>
            <div className="mb-3 flex items-end justify-between gap-2">
              <h2 className="text-lg font-black leading-tight">{d.title}</h2>
              <Link to="/drop" search={{ d: d.id }} className="shrink-0 text-xs font-bold text-primary">Ver drop</Link>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-5">
              {d.merch!.map((item) => <ProductCard key={item.id} product={{ drop: d, item }} rank={ranks[d.id]} onOpen={onOpen} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductSheet({ product, rank, onClose }: { product: Product; rank: number | null | undefined; onClose: () => void }) {
  const { drop, item } = product;
  const navigate = useNavigate();
  const [qty, setQtyState] = useState(1);
  const locked = isLocked(item, rank);

  const add = (goToCart: boolean) => {
    addToCart({ dropId: drop.id, itemId: item.id, artist: drop.artist, name: item.name, image: item.image, price: item.price }, qty);
    onClose();
    if (goToCart) void navigate({ to: "/tienda", search: { v: "carrito" } });
    else toast.success("Agregado al carrito", { description: item.name, action: { label: "Ver carrito", onClick: () => void navigate({ to: "/tienda", search: { v: "carrito" } }) } });
  };

  return (
    <Sheet open onOpenChange={(o) => { if (!o) onClose(); }}>
      <SheetContent side="bottom" className="mx-auto max-h-[92dvh] max-w-[440px] overflow-y-auto rounded-t-3xl p-0">
        <img src={item.image} alt={item.name} className="aspect-square w-full object-cover" />
        <div className="p-5">
          <SheetHeader className="space-y-1 text-left">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{drop.artist} · {drop.title}</p>
            <SheetTitle className="text-2xl font-black leading-tight">{item.name}</SheetTitle>
            <SheetDescription>{item.detail}</SheetDescription>
          </SheetHeader>
          <p className="mt-3 text-3xl font-black tabular-nums">{formatPrice(item.price)}</p>
          <p className="text-xs text-muted-foreground">Precio final · envío gratis desde $120.000</p>
          {item.top !== undefined && (
            <p className="mt-3 rounded-2xl border border-primary/40 bg-primary/10 p-3 text-xs">
              <b>Exclusivo para el top {item.top}</b> del ranking de {drop.title}.{" "}
              {locked ? (rank == null ? "Sumá puntos en el drop para desbloquearlo." : `Vas #${rank}: te faltan ${rank - item.top} puestos.`) : "¡Estás adentro, ya lo podés comprar!"}
            </p>
          )}
          {locked ? (
            <Link to="/drop" search={{ d: drop.id }} onClick={onClose} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-border py-3.5 text-sm font-black">
              <Lock className="h-4 w-4" />Jugar el drop para desbloquearlo
            </Link>
          ) : (
            <>
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-border p-2">
                <span className="pl-2 text-sm font-bold">Cantidad</span>
                <div className="flex items-center gap-3">
                  <button type="button" aria-label="Restar" disabled={qty <= 1} onClick={() => setQtyState((n) => n - 1)} className="grid h-9 w-9 place-items-center rounded-full border border-border disabled:opacity-40"><Minus className="h-4 w-4" /></button>
                  <span className="w-5 text-center font-black tabular-nums">{qty}</span>
                  <button type="button" aria-label="Sumar" disabled={qty >= 10} onClick={() => setQtyState((n) => n + 1)} className="grid h-9 w-9 place-items-center rounded-full border border-border disabled:opacity-40"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 pb-2">
                <button type="button" onClick={() => add(false)} className="rounded-2xl border border-border py-3.5 text-sm font-black">Agregar al carrito</button>
                <button type="button" onClick={() => add(true)} className="rounded-2xl py-3.5 text-sm font-black text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>Comprar ahora</button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function StoreMenu({ open, onOpenChange, onAddress }: { open: boolean; onOpenChange: (v: boolean) => void; onAddress: () => void }) {
  const rows: { label: string; to?: "carrito" | "pedidos"; onClick?: () => void; icon: typeof Package }[] = [
    { label: "Mis pedidos", to: "pedidos", icon: Package },
    { label: "Carrito", to: "carrito", icon: ShoppingCart },
    { label: "Dirección de envío", onClick: onAddress, icon: MapPin },
  ];
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[82%] max-w-sm">
        <SheetHeader className="text-left"><SheetTitle className="text-xl font-black uppercase tracking-wide">Menú</SheetTitle><SheetDescription>Tu cuenta en la Tienda DROP.</SheetDescription></SheetHeader>
        <div className="mt-5 flex items-center justify-between border-b border-border pb-4 text-sm"><span className="flex items-center gap-2"><MapPin className="h-4 w-4" />País/Región</span><b className="text-primary">AR</b></div>
        <nav className="space-y-1 border-b border-border py-3">
          {rows.map((r) => {
            const Icon = r.icon;
            const cls = "flex w-full items-center gap-3 rounded-xl px-1 py-3 text-left text-sm font-semibold";
            return r.to ? (
              <Link key={r.label} to="/tienda" search={{ v: r.to }} onClick={() => onOpenChange(false)} className={cls}><Icon className="h-4 w-4 text-muted-foreground" />{r.label}</Link>
            ) : (
              <button key={r.label} type="button" onClick={r.onClick} className={cls}><Icon className="h-4 w-4 text-muted-foreground" />{r.label}</button>
            );
          })}
        </nav>
        <div className="flex items-center justify-between py-4 text-sm"><span>Moneda</span><b className="text-primary">ARS $</b></div>
      </SheetContent>
    </Sheet>
  );
}
