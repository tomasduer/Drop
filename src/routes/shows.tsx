import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search, X } from "lucide-react";
import { MobileShell } from "@/components/drop/MobileShell";
import { GlobalNav } from "@/components/drop/GlobalNav";
import { EmptyShows, joinDates, LocationBar, ShowCard, useNearbyShows, type ShowGroup } from "@/components/drop/NearbyShows";
import { NewReviewDialog } from "@/components/drop/NewReviewDialog";
import type { ShowEvent } from "@/lib/explore-data";

export const Route = createFileRoute("/shows")({
  head: () => ({
    meta: [
      { title: "DROP · Shows cerca tuyo" },
      { name: "description", content: "Todos los recitales confirmados en tu ciudad, con link a la venta oficial de entradas." },
      { property: "og:title", content: "DROP · Shows cerca tuyo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ShowsPage,
});

const PERIODS = [
  { id: "todas", label: "Todas" },
  { id: "semana", label: "Esta semana" },
  { id: "mes", label: "Este mes" },
  { id: "proximo", label: "Próximo mes" },
] as const;
type Period = (typeof PERIODS)[number]["id"];

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** ¿Alguna fecha de la ficha cae en el período o en el día elegido? */
function inPeriod(g: ShowGroup, period: Period, day: string): boolean {
  const now = new Date();
  return g.dates.some(({ date }) => {
    if (!date) return period === "todas" && !day;
    const d = new Date(date);
    if (day && d.toLocaleDateString("en-CA") !== day) return false;
    if (period === "semana") return d.getTime() - now.getTime() <= 7 * 86400000;
    if (period === "mes") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    if (period === "proximo") { const n = new Date(now.getFullYear(), now.getMonth() + 1, 1); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }
    return true;
  });
}

function ShowsPage() {
  const nearby = useNearbyShows();
  const [reviewing, setReviewing] = useState<ShowEvent | null>(null);
  const [q, setQ] = useState("");
  const [venue, setVenue] = useState("");
  const [period, setPeriod] = useState<Period>("todas");
  const [day, setDay] = useState("");
  const venues = useMemo(() => [...new Set(nearby.groups.map((g) => g.show.venue).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es")), [nearby.groups]);
  // Texto libre: artista, título, sala, ciudad o fecha escrita ("20 nov", "diciembre").
  const filtered = nearby.groups.filter((g) => {
    const text = norm([g.show.title, g.show.artist, g.show.venue, g.show.city, joinDates(g.dates.map((d) => d.date)),
      ...g.dates.map((d) => (d.date ? new Date(d.date).toLocaleDateString("es-AR", { day: "numeric", month: "long" }) + " " + new Date(d.date).toLocaleDateString("es-AR") : ""))].join(" "));
    return norm(q).split(/\s+/).every((w) => !w || text.includes(w)) && (!venue || g.show.venue === venue) && inPeriod(g, period, day);
  });
  const hasFilters = !!(q || venue || day || period !== "todas");
  return (
    <MobileShell>
      <main className="px-5 pb-28 pt-2">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/resenas" hash="shows" aria-label="Volver" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black leading-tight">Shows cerca tuyo</h1>
            <p className="text-xs text-muted-foreground">
              {nearby.loading ? "Buscando…" : `${filtered.length} ${filtered.length === 1 ? "show" : "shows"} en ${nearby.city}`}
            </p>
          </div>
        </div>
        <LocationBar nearby={nearby} />
        {/* Buscador y filtros */}
        <div className="mb-4 space-y-2">
          <label className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Artista, sala, fecha…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            {q && <button aria-label="Borrar búsqueda" onClick={() => setQ("")}><X className="h-4 w-4 text-muted-foreground" /></button>}
          </label>
          <div className="flex gap-2">
            <select value={venue} onChange={(e) => setVenue(e.target.value)} aria-label="Filtrar por sala" className="min-w-0 flex-1 rounded-full border border-border bg-card px-3 py-2 text-xs">
              <option value="">Todas las salas</option>
              {venues.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <input type="date" value={day} onChange={(e) => setDay(e.target.value)} aria-label="Filtrar por día" className="rounded-full border border-border bg-card px-3 py-2 text-xs [color-scheme:dark]" />
          </div>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5">
            {PERIODS.map((p) => (
              <button key={p.id} onClick={() => setPeriod(p.id)} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${period === p.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground"}`}>{p.label}</button>
            ))}
            {hasFilters && <button onClick={() => { setQ(""); setVenue(""); setDay(""); setPeriod("todas"); }} className="shrink-0 px-2 text-xs font-semibold text-primary">Limpiar</button>}
          </div>
        </div>
        {nearby.groups.length === 0 ? (
          <EmptyShows city={nearby.city} loading={nearby.loading} />
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center text-sm font-bold">Ningún show coincide con la búsqueda</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filtered.map((g) => (
              <ShowCard key={g.key} group={g} showKm={!!nearby.location} onReview={setReviewing} className="w-full" />
            ))}
          </div>
        )}
      </main>
      <GlobalNav />
      {reviewing && (
        <NewReviewDialog initialKind="show" initialShow={reviewing} shows={nearby.shows} onClose={() => setReviewing(null)} onPublished={() => setReviewing(null)} />
      )}
    </MobileShell>
  );
}
