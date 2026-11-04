import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Bookmark, BookmarkCheck, CalendarDays, MapPin, Search, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getExploreData, saveDropAction, showAttendanceAction } from "@/lib/explore.functions";
import { emptyExploreData, type CommunityReview, type DropCard, type ExploreData } from "@/lib/explore-data";
import { useDropAuth } from "./AuthProvider";
import { useDrops, type DropInfo } from "@/lib/drops";
import logoViolet from "@/assets/drop-logo-violeta.webp";
const logo = { url: logoViolet };
import { CatalogResults } from "./Catalog";
import { getExternalShows } from "@/lib/music.functions";
import laliCover from "@/assets/album-cover.png.asset.json";
import mariaCover from "@/assets/drop-photo-18.png.asset.json";
import dillomCover from "@/assets/drop-photo-19.png.asset.json";
import fanMaria from "@/assets/drop-photo-31.png.asset.json";
import fanTini from "@/assets/drop-photo-32.png.asset.json";
import fanLali from "@/assets/drop-photo-33.png.asset.json";
import eventCrowd from "@/assets/event-crowd.jpg";
import { supabase } from "@/integrations/supabase/client";
import { ALBUMS } from "@/lib/albums";
import type { ShowEvent } from "@/lib/explore-data";

const SHOW_IMAGES: Record<string, string> = { LALI: fanLali.url, "María Becerra": fanMaria.url, Dillom: dillomCover.url };
const reviewImage = (r: CommunityReview) => (r.subject_type === "album" ? ALBUMS.find((a) => a.id === r.subject_id)?.cover : null) ?? r.subject_image;

const COVERS: Record<string, string> = { lali: laliCover.url, maria: mariaCover.url, dillom: dillomCover.url };

const FALLBACK_DROPS: DropCard[] = [
  { id: "lali", artist: "LALI", title: "No vayas a atender cuando el demonio llama", cover: laliCover.url, status: "active" },
  { id: "maria", artist: "María Becerra", title: "quimera", cover: mariaCover.url, status: "upcoming" },
  { id: "dillom", artist: "Dillom", title: "por cesárea", cover: dillomCover.url, status: "upcoming" },
];

const DISCOVER = ["LALI", "María Becerra", "TINI", "Dillom", "Emilia", "Nicki Nicole", "Milo J", "Trueno", "Bizarrap", "Duki"];

const GENRES = [
  { name: "Pop", detail: "LALI · María Becerra · TINI", image: fanLali.url },
  { name: "Urbano", detail: "Dillom", image: dillomCover.url },
  { name: "Rock", detail: "Tocá para escuchar", image: fanMaria.url },
  { name: "Indie", detail: "Tocá para escuchar", image: fanTini.url },
  { name: "Electrónica", detail: "Tocá para escuchar", image: eventCrowd },
  { name: "Hip-hop", detail: "Tocá para escuchar", image: dillomCover.url },
  { name: "R&B", detail: "Tocá para escuchar", image: fanMaria.url },
  { name: "Pop punk", detail: "Tocá para escuchar", image: fanTini.url },
];

function Stars({ value }: { value: number }) {
  return <span className="flex items-center gap-0.5 text-primary">{[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`h-3 w-3 ${value >= n ? "fill-current" : "text-muted-foreground"}`} />)}</span>;
}

export function ExplorarView() {
  const { mode, state, saveProfile } = useDropAuth();
  const navigate = useNavigate();
  const fetchExplore = useServerFn(getExploreData);
  const saveDrop = useServerFn(saveDropAction);
  const toggleShow = useServerFn(showAttendanceAction);
  const [data, setData] = useState<ExploreData>(emptyExploreData);
  const [query, setQuery] = useState("");
  const [reading, setReading] = useState<CommunityReview | null>(null);
  const [savingDrop, setSavingDrop] = useState<string | null>(null);
  const fetchExternalShows = useServerFn(getExternalShows);
  const [externalShows, setExternalShows] = useState<ShowEvent[]>([]);
  useEffect(() => { fetchExternalShows({ data: {} }).then(setExternalShows).catch(() => setExternalShows([])); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  useEffect(() => {
    if (mode !== "user") {
      // Invitados: reseñas y agenda públicas.
      const db = supabase as unknown as { from: (t: string) => { select: (c: string) => { order: (c: string, o: { ascending: boolean }) => { limit: (n: number) => Promise<{ data: unknown[] | null }> } } } };
      Promise.all([
        db.from("reviews").select("*").order("created_at", { ascending: false }).limit(30),
        db.from("shows").select("*").order("event_date", { ascending: true }).limit(30),
      ]).then(([r, sh]) => setData({ ...emptyExploreData, reviews: (r.data ?? []) as CommunityReview[], shows: (sh.data ?? []) as ShowEvent[] }))
        .catch(() => setData(emptyExploreData));
      return;
    }
    fetchExplore().then(setData).catch(() => setData(emptyExploreData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const catalog = useDrops();

  const q = query.trim().toLowerCase();
  const match = (...parts: (string | null | undefined)[]) => !q || parts.some((p) => p?.toLowerCase().includes(q));
  const visibleDrops = catalog.filter((d) => match(d.artist, d.title, d.fandom));
  const activeDrops = visibleDrops.filter((d) => d.status === "active");
  const upcomingDrops = visibleDrops.filter((d) => d.status === "upcoming");
  const archivedDrops = visibleDrops.filter((d) => d.status === "archived");
  const myScore = (id: string) => state.balances.find((b) => b.campaign_id === id)?.score ?? 0;
  const visibleReviews = data.reviews.filter((r) => match(r.subject_title, r.subject_artist, r.author_name, r.text));
  const visibleShows = [...externalShows, ...data.shows]
    .filter((s) => match(s.title, s.artist, s.city, s.venue))
    .sort((a, b) => (a.event_date ?? "9").localeCompare(b.event_date ?? "9"));
  const visibleGenres = GENRES.filter((g) => match(g.name, g.detail));

  const onSaveDrop = async (drop: DropInfo) => {
    if (mode !== "user") { toast.message("Creá una cuenta para guardar drops en tu colección."); return; }
    const saved = data.mySavedDropIds.includes(drop.id);
    setSavingDrop(drop.id);
    try {
      await saveDrop({ data: { campaign_id: drop.id, save: !saved } });
      setData((d) => ({ ...d, mySavedDropIds: saved ? d.mySavedDropIds.filter((id) => id !== drop.id) : [...d.mySavedDropIds, drop.id] }));
      toast.success(saved ? "Drop quitado de Mis DROPS" : "Drop guardado en Mis DROPS");
    } catch {
      toast.error("El guardado se activa al aceptar los cambios de datos del borrador.");
    } finally { setSavingDrop(null); }
  };

  const onEnterDrop = (drop: DropInfo) => { void navigate({ to: "/drop", search: { d: drop.id } }); };

  const SaveButton = ({ drop }: { drop: DropInfo }) => {
    const saved = data.mySavedDropIds.includes(drop.id);
    return (
      <button
        onClick={(e) => { e.stopPropagation(); void onSaveDrop(drop); }}
        disabled={savingDrop === drop.id}
        aria-label={saved ? `Quitar ${drop.title} de Mis DROPS` : `Guardar ${drop.title} en Mis DROPS`}
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border backdrop-blur ${saved ? "border-primary bg-primary/25 text-primary" : "border-border bg-background/60 text-foreground"}`}
      >
        {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      </button>
    );
  };

  return (
    <div className="px-5 pb-4">
      <header className="pt-2">
        <img decoding="async" src={logo.url} alt="DROP" className="h-10 w-24 object-contain object-left drop-shadow-[0_0_8px_var(--primary)]" />
        <h1 className="mt-3 text-3xl font-black leading-tight">Elegí tu próximo drop</h1>
        <p className="mt-1 text-sm text-muted-foreground">Cada lanzamiento es un juego: misiones, ranking y recompensas con tus artistas. Podés sumarte a todos los que quieras.</p>
        <label className="mt-4 flex items-center gap-2 rounded-2xl border border-input bg-card px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Artistas, álbumes, shows, reseñas…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
      </header>

      <CatalogResults query={query} />

      {/* Drops activos */}
      {activeDrops.length > 0 && (
        <section className="mt-7">
          <h2 className="text-xl font-black">Drops activos</h2>
          <p className="mb-3 text-xs text-muted-foreground">Participá ahora: sumá puntos y competí en el ranking.</p>
          <div className="space-y-4">
            {activeDrops.map((drop) => (
              <article key={drop.id} role="button" tabIndex={0} onClick={() => onEnterDrop(drop)} onKeyDown={(e) => { if (e.key === "Enter") onEnterDrop(drop); }}
                className="relative cursor-pointer overflow-hidden rounded-3xl border border-primary/40 shadow-[var(--shadow-glow)]">
                <img decoding="async" src={drop.hero} alt={drop.artist} loading="lazy" className="h-60 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute right-3 top-3"><SaveButton drop={drop} /></div>
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-primary-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground" />Activo
                </span>
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-sm font-bold text-primary">{drop.artist}</p>
                  <h3 className="text-2xl font-black leading-tight">{drop.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{drop.tagline}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold">{myScore(drop.id) > 0 ? `Participando · ${myScore(drop.id).toLocaleString("es-AR")} pts` : "Todavía no participás"}</span>
                    <span className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-black text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>
                      {myScore(drop.id) > 0 ? "Continuar" : "Entrar al drop"} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Próximamente */}
      {upcomingDrops.length > 0 && (
        <section className="mt-7">
          <h2 className="text-xl font-black">Próximamente</h2>
          <p className="mb-3 text-xs text-muted-foreground">Drops anunciados. Activá el aviso y enterate primero.</p>
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {upcomingDrops.map((drop) => (
              <button key={drop.id} onClick={() => onEnterDrop(drop)} className="w-44 shrink-0 text-left">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
                  <img decoding="async" src={drop.hero} alt={drop.artist} loading="lazy" className="h-full w-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <span className="absolute left-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-[11px] font-black uppercase">Próximamente</span>
                  <span className="absolute inset-x-3 bottom-3"><span className="block text-xs font-bold text-primary">{drop.artist}</span><span className="block text-base font-black leading-tight">{drop.title}</span></span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Archivo */}
      {archivedDrops.length > 0 && (
        <section className="mt-7 rounded-3xl border border-border bg-[linear-gradient(160deg,oklch(0.2_0.03_60/0.6),transparent)] p-4">
          <h2 className="text-xl font-black">📼 Archivo</h2>
          <p className="mb-3 text-xs text-muted-foreground">Drops que ya terminaron. Volvé a recorrerlos, mirá el ranking final y tus logros.</p>
          <div className="space-y-3">
            {archivedDrops.map((drop) => (
              <button key={drop.id} onClick={() => onEnterDrop(drop)} className="flex w-full items-center gap-3 rounded-2xl border border-border bg-background/50 p-2 text-left">
                <img decoding="async" src={drop.album} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-xl object-cover sepia-[0.4]" />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-muted-foreground">{drop.artist} · {drop.dates}</span>
                  <span className="block truncate text-base font-black">{drop.title}</span>
                  <span className="block text-xs text-primary">{myScore(drop.id) > 0 ? `Participaste · ${myScore(drop.id).toLocaleString("es-AR")} pts` : "Ver cómo terminó"}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>
      )}
      {visibleDrops.length === 0 && q && <p className="mt-6 text-sm text-muted-foreground">Ningún drop coincide con esa búsqueda.</p>}

      <h2 className="mt-10 text-2xl font-black">Descubrí música</h2>
      <p className="text-xs text-muted-foreground">Reseñas de fans, shows y artistas para escuchar.</p>

      {/* Opiniones de la comunidad */}
      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-black">Opiniones de la comunidad</h2>
          <Link to="/mi-drop" search={{ tab: "albumes" }} className="text-xs font-bold text-primary">Publicar</Link>
        </div>
        {visibleReviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
            <p className="text-sm font-bold">Todavía no hay reseñas de la comunidad</p>
            <p className="mt-1 text-xs text-muted-foreground">Las opiniones publicadas por fans aparecen acá: álbumes, artistas y shows.</p>
            {mode !== "user" && <p className="mt-2 text-xs text-primary">Creá una cuenta para publicar y leer reseñas.</p>}
          </div>
        ) : (
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {visibleReviews.map((r) => (
              <article key={r.id} className="w-44 shrink-0 rounded-2xl border border-border bg-card p-3">
                {reviewImage(r) && <img decoding="async" src={reviewImage(r) ?? undefined} alt={`Imagen de ${r.subject_title}`} loading="lazy" className="mb-2 aspect-square w-full rounded-xl object-cover" />}
                <p className="truncate text-sm font-bold">{r.subject_title}</p>
                <p className="truncate text-xs text-muted-foreground">{r.subject_artist || r.subject_type}</p>
                <div className="mt-1.5"><Stars value={r.rating} /></div>
                <p className="mt-1 text-xs text-muted-foreground">por {r.author_name || "fan de DROP"}</p>
                {r.text && <Button variant="link" size="sm" className="mt-1 h-auto px-0 text-xs" onClick={() => setReading(r)}>Leer reseña</Button>}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Shows cerca tuyo */}
      <section className="mt-7">
        <div className="mb-1 flex items-end justify-between">
          <h2 className="text-xl font-black">Shows cerca tuyo</h2>
          <span className="text-xs font-bold text-primary">Ver todo</span>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">Próximas fechas de tus artistas.</p>
        {visibleShows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
            <p className="text-sm font-bold">La agenda se está armando</p>
            <p className="mt-1 text-xs text-muted-foreground">Los recitales, festivales y listening parties confirmados aparecen acá.</p>
          </div>
        ) : (
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {visibleShows.map((show) => {
              const attended = data.myShowIds.includes(show.id);
              return (
                <article key={show.id} className="w-52 shrink-0 overflow-hidden rounded-2xl border border-border bg-card">
                  <img decoding="async" src={show.image_url ?? SHOW_IMAGES[show.artist] ?? eventCrowd} alt={`Imagen de ${show.title}`} loading="lazy" className="h-28 w-full object-cover" />
                  <div className="p-3">
                    <p className="truncate text-sm font-bold">{show.title}</p>
                    <p className="text-xs text-muted-foreground">{show.artist}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><CalendarDays className="h-3 w-3" />{show.event_date ? new Date(show.event_date).toLocaleDateString("es-AR") : "Fecha a confirmar"}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{show.venue}{show.city ? ` · ${show.city}` : ""}</p>
                    {show.url ? <Button asChild variant="outline" size="sm" className="mt-2 w-full text-xs"><a href={show.url} target="_blank" rel="noreferrer">Ver entradas</a></Button> : <Button
                      variant={attended ? "secondary" : "outline"}
                      size="sm"
                      className="mt-2 w-full text-xs"
                      onClick={async () => {
                        if (mode !== "user") { toast.message("Creá una cuenta para registrar tus shows."); return; }
                        try {
                          await toggleShow({ data: { show_id: show.id, attended: !attended } });
                          setData((d) => ({ ...d, myShowIds: attended ? d.myShowIds.filter((id) => id !== show.id) : [...d.myShowIds, show.id] }));
                          toast.success(attended ? "Show quitado de tu historial" : "Show agregado a tu historial");
                        } catch {
                          toast.error("El registro de shows se activa al aceptar los cambios de datos del borrador.");
                        }
                      }}
                    >
                      {attended ? "Asistí ✓" : "Asistí a este show"}
                    </Button>}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Explorar por género */}
      <section className="mt-7">
        <h2 className="mb-3 text-xl font-black">Explorar por género</h2>
        <div className="grid grid-cols-2 gap-3">
          {visibleGenres.map((genre) => (
            <button key={genre.name} onClick={() => { setQuery(genre.name); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="relative h-24 overflow-hidden rounded-2xl border border-border text-left">
              <img decoding="async" src={genre.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
              <span className="absolute inset-0" style={{ backgroundImage: "var(--gradient-drop-soft)" }} />
              <span className="absolute bottom-2 left-3 right-3">
                <span className="block text-sm font-black">{genre.name}</span>
                <span className="block truncate text-[11px] text-muted-foreground">{genre.detail}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Artistas para descubrir */}
      <section className="mt-7">
        <h2 className="mb-1 text-xl font-black">Artistas para descubrir</h2>
        <p className="mb-3 text-xs text-muted-foreground">Tocá un nombre para escuchar sus canciones.</p>
        <div className="flex flex-wrap gap-2">
          {DISCOVER.map((name) => (
            <Button key={name} variant="outline" size="sm" className="rounded-full" onClick={() => { setQuery(name); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <TrendingUp className="h-3.5 w-3.5 text-primary" />{name}
            </Button>
          ))}
        </div>
      </section>

      {/* Lector de reseña completa */}
      {reading && (
        <Dialog open onOpenChange={(open) => { if (!open) setReading(null); }}>
          <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg">
            <DialogHeader>
              <DialogTitle>{reading.subject_title}</DialogTitle>
              <DialogDescription>{reading.subject_artist} · reseña de {reading.author_name || "fan de DROP"}</DialogDescription>
            </DialogHeader>
            <Stars value={reading.rating} />
            <p className="text-sm leading-relaxed">{reading.text}</p>
            <p className="text-xs text-muted-foreground">{new Date(reading.created_at).toLocaleDateString("es-AR")}</p>
          </DialogContent>
        </Dialog>
      )}

      {mode !== "user" && (
        <div className="mt-7 rounded-2xl border border-primary/40 bg-primary/5 p-4 text-center">
          <p className="text-sm font-bold">Estás explorando como invitado</p>
          <p className="mt-1 text-xs text-muted-foreground">Creá una cuenta para guardar drops, publicar reseñas y registrar shows.</p>
          <Button asChild className="mt-3 w-full"><Link to="/auth" search={{ mode: "signup" }}>Crear cuenta <ArrowRight /></Link></Button>
        </div>
      )}
    </div>
  );
}
