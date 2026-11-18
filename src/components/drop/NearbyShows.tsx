import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, ChevronRight, MapPin, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getExternalShows } from "@/lib/music.functions";
import { cityCoords, distanceKm, nearestCity, useUserLocation } from "@/lib/geo";
import { useDrops } from "@/lib/drops";
import type { ShowEvent } from "@/lib/explore-data";
import eventCrowd from "@/assets/event-crowd.jpg";

/** Radio de "tu ciudad" en km. */
const CITY_KM = 60;

/** Una ficha: un artista en una sala, con todas sus fechas. */
export type ShowGroup = {
  key: string;
  show: ShowEvent;
  km: number | null;
  dates: { id: string; date: string | null; url?: string; official?: boolean }[];
};

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Junta en una ficha las fechas del mismo artista en la misma sala. */
export function groupShows(shows: (ShowEvent & { km: number | null })[]): ShowGroup[] {
  const byKey = new Map<string, ShowGroup>();
  for (const s of shows) {
    const key = `${norm(s.artist || s.title)}|${norm(s.venue || s.city)}`;
    const date = { id: s.id, date: s.event_date, url: s.url, official: s.official };
    const g = byKey.get(key);
    if (!g) { byKey.set(key, { key, show: s, km: s.km, dates: [date] }); continue; }
    if (!g.dates.some((d) => d.date && d.date.slice(0, 10) === s.event_date?.slice(0, 10))) g.dates.push(date);
    if (!g.show.image_url && s.image_url) g.show = { ...g.show, image_url: s.image_url };
  }
  const groups = [...byKey.values()];
  for (const g of groups) g.dates.sort((a, b) => (a.date ?? "9").localeCompare(b.date ?? "9"));
  return groups.sort((a, b) => (a.dates[0].date ?? "9").localeCompare(b.dates[0].date ?? "9"));
}

/** Shows reales (Ticketmaster / Eventos de Google) en la ciudad del fan, agrupados por artista y sala. */
export function useNearbyShows() {
  const fetchShows = useServerFn(getExternalShows);
  const [shows, setShows] = useState<ShowEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const loc = useUserLocation();
  const catalog = useDrops();
  const dropArtists = useMemo(() => [...new Set(catalog.map((d) => d.artist))].slice(0, 10), [catalog]);
  const city = loc.location ? nearestCity(loc.location) : "Buenos Aires";
  const center = loc.location ?? cityCoords("Buenos Aires")!;

  useEffect(() => {
    setLoading(true);
    fetchShows({ data: { artists: dropArtists, city, near: center } })
      .then(setShows).catch(() => setShows([])).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.location, dropArtists.join("|")]);

  const groups = useMemo(() => {
    const withKm = shows.map((s) => {
      const at = s.lat != null && s.lng != null ? { lat: s.lat, lng: s.lng } : cityCoords(s.city);
      return { ...s, km: at ? distanceKm(center, at) : null };
    }).filter((s) => (s.km != null ? s.km <= CITY_KM : s.area === city));
    return groupShows(withKm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shows, city]);

  return { ...loc, shows, groups, city, loading };
}

const fmt = (d: string | null, opts: Intl.DateTimeFormatOptions) => (d ? new Date(d).toLocaleDateString("es-AR", opts) : "A confirmar");

/** "18 y 19 nov", "30 nov y 1 dic", "5, 6 y 7 dic": todas las fechas en un solo texto. */
export function joinDates(dates: (string | null)[]): string {
  const known = dates.filter((d): d is string => !!d).map((d) => new Date(d));
  if (!known.length) return "A confirmar";
  const month = (d: Date) => d.toLocaleDateString("es-AR", { month: "short" }).replace(".", "");
  const parts: string[] = [];
  known.forEach((d, i) => {
    const next = known[i + 1];
    parts.push(next && next.getMonth() === d.getMonth() ? String(d.getDate()) : `${d.getDate()} ${month(d)}`);
  });
  return parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")} y ${parts[parts.length - 1]}`;
}

/** Búsqueda en Google de las entradas oficiales del show (cuando la fuente no trae link). */
const ticketSearch = (show: ShowEvent) =>
  `https://www.google.com/search?q=${encodeURIComponent(`${show.artist || show.title} ${show.venue ?? ""} entradas oficiales`.trim())}`;

export function ShowCard({ group, showKm, onReview, className = "w-52 shrink-0" }: { group: ShowGroup; showKm: boolean; onReview?: (show: ShowEvent) => void; className?: string }) {
  const { show, dates, km } = group;
  const main = dates.find((d) => d.url) ?? dates[0];
  return (
    <article className={`${className} overflow-hidden rounded-2xl border border-border bg-card`}>
      <img decoding="async" src={show.image_url ?? eventCrowd} alt={`Imagen de ${show.title}`} loading="lazy" className="h-28 w-full object-cover" />
      <div className="p-3">
        <p className="truncate text-sm font-bold">{show.title}</p>
        <p className="truncate text-xs text-muted-foreground">{show.artist}</p>
        {dates.length === 1 ? (
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><CalendarDays className="h-3 w-3" />{fmt(dates[0].date, { day: "numeric", month: "numeric", year: "numeric" })}</p>
        ) : (
          <div className="mt-1">
            <p className="flex items-center gap-1 text-xs font-semibold text-foreground"><CalendarDays className="h-3 w-3" />{dates.length} fechas</p>
            <p className="mt-1 inline-block rounded-full border border-border px-2 py-0.5 text-[11px] leading-snug">{joinDates(dates.map((d) => d.date))}</p>
          </div>
        )}
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3 shrink-0" /><span className="truncate">{show.venue}{show.city ? ` · ${show.city}` : ""}</span></p>
        {showKm && km != null && <p className="mt-0.5 text-xs font-semibold text-primary">{km < 1 ? "A menos de 1 km" : `A ${Math.round(km).toLocaleString("es-AR")} km`}</p>}
        {/* Sin link de la fuente: búsqueda de entradas del show, para que siempre haya cómo comprarlas. */}
        <Button asChild variant="outline" size="sm" className="mt-2 w-full text-xs">
          <a href={main?.url || ticketSearch(show)} target="_blank" rel="noreferrer">{main?.url && main.official === false ? "Más información" : "Ver entradas"}</a>
        </Button>
        {onReview && <Button variant="ghost" size="sm" className="mt-1 h-auto w-full whitespace-normal px-2 py-1.5 text-xs" onClick={() => onReview(show)}><PenLine className="h-3.5 w-3.5 shrink-0" />Reseñar</Button>}
      </div>
    </article>
  );
}

/** Ubicación del fan: botón para compartirla o la ciudad elegida con opción de quitarla. */
export function LocationBar({ nearby }: { nearby: ReturnType<typeof useNearbyShows> }) {
  const { location, status, request, clear, city } = nearby;
  if (location) {
    return (
      <p className="mb-3 text-xs text-muted-foreground">
        Recitales en {city}.{" "}
        <button className="font-semibold text-primary underline-offset-2 hover:underline" onClick={clear}>Quitar ubicación</button>
      </p>
    );
  }
  return (
    <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/60 p-3">
      <p className="text-xs text-muted-foreground">
        {status === "denied" ? "No pudimos usar tu ubicación. Activala para DROP en tu navegador." : status === "unavailable" ? "No pudimos obtener tu ubicación. Probá de nuevo." : "Te mostramos recitales en Buenos Aires. Compartí tu ubicación para ver los de tu ciudad."}
      </p>
      <Button size="sm" variant="outline" className="shrink-0 text-xs" disabled={status === "loading"} onClick={request}>
        <MapPin className="h-3.5 w-3.5" />{status === "loading" ? "Buscando…" : "Usar mi ubicación"}
      </Button>
    </div>
  );
}

export function EmptyShows({ city, loading }: { city: string; loading: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
      <p className="text-sm font-bold">{loading ? "Buscando recitales…" : `No encontramos recitales en ${city}`}</p>
      {!loading && <p className="mt-1 text-xs text-muted-foreground">Cuando haya fechas confirmadas en tu ciudad, aparecen acá.</p>}
    </div>
  );
}

/** Link "Ver más" a la pantalla con todos los shows. */
export function SeeAllShows() {
  return (
    <Link to="/shows" className="flex items-center gap-0.5 text-sm font-semibold text-primary hover:underline">
      Ver más<ChevronRight className="h-4 w-4" />
    </Link>
  );
}
