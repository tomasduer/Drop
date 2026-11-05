import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Search, ShoppingBag } from "lucide-react";
import { getRanking } from "@/lib/drop.functions";
import { useDrops, type DropInfo } from "@/lib/drops";
import { artistSlug } from "@/lib/merch";
import { useDropAuth } from "./AuthProvider";
import { MerchGrid } from "./MerchGrid";

type Store = { slug: string; artist: string; cover: string; hero: string; drops: DropInfo[]; count: number };

/** Tienda: buscás a tu artista y entrás a su merch oficial (la de todos sus drops). */
export function TiendaView({ artist }: { artist?: string }) {
  const drops = useDrops();
  const [q, setQ] = useState("");

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
    return [...map.values()];
  }, [drops]);

  const store = artist ? stores.find((s) => s.slug === artist) : undefined;
  if (store) return <ArtistStore store={store} />;

  const norm = (t: string) => artistSlug(t).replace(/-/g, " ");
  const results = q.trim() ? stores.filter((s) => norm(s.artist).includes(norm(q))) : stores;

  return (
    <div className="px-5 pb-28">
      <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Merch oficial</p>
      <h1 className="text-3xl font-black">Tienda</h1>
      <p className="mt-1 text-sm text-muted-foreground">Buscá a tu artista favorito y entrá a su tienda. Algunos productos son exclusivos para los primeros del ranking.</p>

      <label className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar artista" className="flex-1 bg-transparent text-sm outline-none" />
      </label>

      <div className="mt-4 space-y-3">
        {results.length === 0 && <p className="px-1 text-sm text-muted-foreground">Todavía no hay tienda de ese artista.</p>}
        {results.map((s) => (
          <Link key={s.slug} to="/tienda" search={{ a: s.slug }} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
            <img src={s.cover} alt="" loading="lazy" decoding="async" className="h-14 w-14 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{s.artist}</p>
              <p className="text-xs text-muted-foreground">{s.count} {s.count === 1 ? "producto" : "productos"}</p>
            </div>
            <ShoppingBag className="h-5 w-5 text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function ArtistStore({ store }: { store: Store }) {
  const { mode } = useDropAuth();
  const fetchRanking = useServerFn(getRanking);
  const [ranks, setRanks] = useState<Record<string, number | null>>({});

  useEffect(() => {
    if (mode !== "user") return;
    for (const d of store.drops) {
      if (d.status === "upcoming" || !d.merch?.some((m) => m.top)) continue;
      fetchRanking({ data: { campaign: d.id, scope: "Global" } })
        .then((r) => setRanks((x) => ({ ...x, [d.id]: r.me?.rank ?? null })))
        .catch(() => undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, store.slug]);

  return (
    <div className="pb-28">
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
            <div className="mb-2 flex items-end justify-between gap-2">
              <h2 className="text-lg font-black leading-tight">{d.title}</h2>
              <Link to="/drop" search={{ d: d.id }} className="shrink-0 text-xs font-bold text-primary">Ver drop</Link>
            </div>
            <MerchGrid drop={d} rank={ranks[d.id] ?? null} />
          </div>
        ))}
        <p className="text-[11px] text-muted-foreground">Precios de referencia. La venta abre pronto: reservá y te avisamos.</p>
      </div>
    </div>
  );
}
