import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Disc3, Image as ImageIcon, MapPin, Mic2, Music, Pencil, Settings, Share2, Star, Ticket, UserPlus, UserRound, X, Zap } from "lucide-react";
import { FavoritesPicker, getFavoriteSongs, setFavoriteSongs, type FavoriteSong } from "./FavoritesPicker";
import { inviteFriends, shareStory } from "@/lib/share-card";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProfileExtras } from "@/lib/explore.functions";
import { emptyProfileExtras, type ProfileExtras, type SavedDropStatus } from "@/lib/explore-data";
import { PHOTOS } from "@/lib/fan-avatars";
import { avatarFromFile } from "@/lib/avatar";
import { ALBUMS } from "@/lib/albums";
import { useDropAuth } from "./AuthProvider";
import { AlbumsSection } from "./AlbumsSection";
import { RewardsRedeem } from "./RewardsRedeem";
import { DropSelector } from "./DropSelector";
import { useDrops } from "@/lib/drops";
import { useIsDropAdmin } from "@/lib/drop-content";
import { achievements, dropProgress } from "@/lib/progress";
import { useOrders } from "@/lib/cart";
import laliCover from "@/assets/album-cover.png.asset.json";
import mariaCover from "@/assets/drop-photo-18.png.asset.json";
import dillomCover from "@/assets/drop-photo-19.png.asset.json";
import eventCrowd from "@/assets/event-crowd.jpg";
import airbagCover from "@/assets/airbag-portada.webp";
import lnvCover from "@/assets/lnv-portada.webp";
import adelaCover from "@/assets/adela-portada.webp";
import arjonaCover from "@/assets/arjona-portada.webp";

const COVERS: Record<string, string> = { lali: laliCover.url, maria: mariaCover.url, dillom: dillomCover.url, airbag: airbagCover, "dillom-lnv": lnvCover, "adela-prima": adelaCover, "arjona-seco": arjonaCover };

const STATUS_LABEL: Record<SavedDropStatus, string> = {
  guardado: "Guardado",
  en_curso: "En curso",
  completado: "Completado",
  finalizado: "Finalizado",
};

type ProfileTab = "shows" | "resenas" | "actividad" | "stats" | "albumes";

const TABS: { id: ProfileTab; label: string }[] = [
  { id: "shows", label: "Shows" },
  { id: "resenas", label: "Reseñas" },
  { id: "stats", label: "Puntos y premios" },
  { id: "albumes", label: "Álbumes" },
];

export function MiDropView({ initialTab }: { initialTab?: ProfileTab }) {
  const { profile, mode, state, saveProfile, signOut, reviews, user } = useDropAuth();
  const isAdmin = useIsDropAdmin(mode === "user" ? user?.id : null);
  const navigate = useNavigate();
  const fetchExtras = useServerFn(getProfileExtras);
  const [extras, setExtras] = useState<ProfileExtras>(emptyProfileExtras);
  const [tab, setTab] = useState<ProfileTab>(initialTab === "actividad" ? "stats" : initialTab ?? "shows");
  const [dropFilter, setDropFilter] = useState<SavedDropStatus | "todos">("todos");
  const [editing, setEditing] = useState(false);
  const [settings, setSettings] = useState(false);
  const orders = useOrders();
  const merch = orders.flatMap((o) => o.lines).filter((l, i, all) => all.findIndex((x) => x.dropId === l.dropId && x.itemId === l.itemId) === i);
  const [picker, setPicker] = useState<"artist" | "song" | null>(null);
  const [songs, setSongs] = useState<FavoriteSong[]>([]);
  useEffect(() => { setSongs(getFavoriteSongs()); }, []);
  const favArtists = profile?.favorite_artists ?? [];

  /** Abre una pestaña del perfil y baja hasta ella. */
  const openTab = (t: ProfileTab) => {
    setTab(t);
    requestAnimationFrame(() => document.getElementById("perfil-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const saveSongs = (list: FavoriteSong[]) => { setSongs(list); setFavoriteSongs(list); };
  const saveArtists = (list: string[]) => void saveProfile({ favorite_artists: list });

  useEffect(() => {
    if (mode !== "user") { setExtras(emptyProfileExtras); return; }
    fetchExtras().then(setExtras).catch(() => setExtras(emptyProfileExtras));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const listened = profile?.listened_albums ?? [];
  const generalPoints = profile?.general_points ?? 0;
  const campaignPoints = state.balances.reduce((sum, b) => sum + b.score, 0);
  const allDrops = useDrops();
  const progress = dropProgress(state, allDrops);
  const stamps = progress.filter((p) => p.participating);
  const logros = achievements(state, progress, listened.length).filter((l) => l.unlocked);
  const username = profile.username?.trim() || profile.display_name?.replace(/^@/, "") || "fan";
  const memberSince = profile.created_at ? new Date(profile.created_at).toLocaleDateString("es-AR", { month: "long", year: "numeric" }) : null;

  // Reseñas: persistentes para cuentas, de sesión para invitados.
  const myReviews = useMemo(() => {
    if (mode === "user") return extras.reviews;
    return Object.entries(reviews).map(([id, r]) => {
      const album = ALBUMS.find((a) => a.id === id);
      return {
        id, user_id: "guest", author_name: profile.display_name, subject_type: "album" as const,
        subject_id: id, subject_title: album?.title ?? id, subject_artist: album?.artist ?? "",
        subject_image: album?.cover ?? null, rating: r.rating, text: r.text, created_at: new Date().toISOString(),
      };
    });
  }, [mode, extras.reviews, reviews, profile.display_name]);

  const avgRating = myReviews.length ? (myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length).toFixed(1) : null;
  const visibleDrops = extras.savedDrops.filter((d) => dropFilter === "todos" || d.status === dropFilter);

  const monthlyActivity = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of state.movements) {
      const key = new Date(m.created_at).toLocaleDateString("es-AR", { month: "short", year: "2-digit" });
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].slice(0, 6);
  }, [state.movements]);

  const shareProfile = async () => {
    const url = `${window.location.origin}/mi-drop`;
    try {
      if (navigator.share) await navigator.share({ title: "Mi perfil en DROP", url });
      else { await navigator.clipboard.writeText(url); toast.success("Enlace copiado"); }
    } catch { /* cancelado por el usuario */ }
  };

  return (
    <div className="px-5 pb-4">
      {/* Encabezado del perfil */}
      <header className="pt-2">
        <div className="flex items-start gap-4">
          <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-primary/50 bg-card">
            {profile.avatar_url ? <img decoding="async" src={profile.avatar_url} alt="Foto de perfil" className="h-full w-full object-cover" /> : mode === "guest" ? <UserRound className="h-8 w-8 text-muted-foreground" /> : <img decoding="async" src={PHOTOS.worldCup} alt="Foto de perfil" className="h-full w-full object-cover" />}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-black leading-tight">{profile.display_name}</h1>
            <p className="truncate text-sm text-muted-foreground">@{username}</p>
            <div className="mt-2 flex gap-4 text-xs">
              <p><span className="font-black">{extras.followers}</span> <span className="text-muted-foreground">seguidores</span></p>
              <p><span className="font-black">{extras.following}</span> <span className="text-muted-foreground">siguiendo</span></p>
            </div>
          </div>
        </div>
        {profile.bio && <p className="mt-3 text-sm leading-relaxed">{profile.bio}</p>}
        {memberSince && <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><CalendarDays className="h-3 w-3" />En DROP desde {memberSince}</p>}
        {mode === "guest" && <p className="mt-2 text-xs text-primary">Modo invitado · tus datos no se guardan</p>}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}><Pencil className="h-3.5 w-3.5" />Editar</Button>
          <Button variant="outline" size="sm" onClick={shareProfile}><Share2 className="h-3.5 w-3.5" />Compartir</Button>
          <Button variant="outline" size="sm" onClick={() => setSettings(true)}><Settings className="h-3.5 w-3.5" />Ajustes</Button>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Button size="sm" onClick={() => void shareStory({ name: profile.display_name, username, points: generalPoints, campaignPoints, missions: state.attempts.filter((a) => a.status === "completed").length, avatarUrl: profile.avatar_url })}><ImageIcon className="h-3.5 w-3.5" />Compartir en historias</Button>
          <Button variant="secondary" size="sm" onClick={() => void inviteFriends(username)}><UserPlus className="h-3.5 w-3.5" />Invitar amigos</Button>
        </div>
      </header>

      {/* Resumen de actividad */}
      <section className="mt-5 grid grid-cols-4 gap-2">
        <Stat value={`${extras.shows.length}`} label="Shows" onClick={() => openTab("shows")} />
        <Stat value={`${myReviews.length}`} label="Reseñas" onClick={() => openTab("resenas")} />
        <Stat value={`${extras.savedDrops.length}`} label="DROPS" onClick={() => scrollTo("perfil-drops")} />
        <Stat value={avgRating ?? "—"} label="Promedio" onClick={() => openTab("resenas")} />
      </section>

      {/* Accesos rápidos para sumar cosas al perfil */}
      <section className="mt-5">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">Sumá a tu perfil</p>
        <div className="grid grid-cols-3 gap-2">
          <QuickAction icon={Star} label="Reseñar" onClick={() => openTab("albumes")} />
          <QuickAction icon={Disc3} label="Álbum" onClick={() => openTab("albumes")} />
          <QuickAction icon={Music} label="Canción" onClick={() => setPicker("song")} />
          <QuickAction icon={Mic2} label="Artista" onClick={() => setPicker("artist")} />
          <QuickAction icon={Zap} label="Drop" onClick={() => void navigate({ to: "/explorar" })} />
          <QuickAction icon={Ticket} label="Show" onClick={() => void navigate({ to: "/resenas", hash: "shows" })} />
        </div>
      </section>

      {(favArtists.length > 0 || songs.length > 0) && (
        <section className="mt-5 space-y-3">
          {favArtists.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Artistas favoritos</p>
              <div className="flex flex-wrap gap-2">
                {favArtists.map((a) => (
                  <span key={a} className="flex items-center gap-1 rounded-full border border-border bg-card py-1 pl-3 pr-1 text-xs font-bold">
                    {a}
                    <button type="button" aria-label={`Quitar ${a}`} onClick={() => saveArtists(favArtists.filter((x) => x !== a))} className="grid h-5 w-5 place-items-center rounded-full text-muted-foreground"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            </div>
          )}
          {songs.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Canciones favoritas</p>
              <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
                {songs.map((t) => (
                  <div key={t.id} className="relative w-24 shrink-0">
                    <a href={t.link || undefined} target="_blank" rel="noreferrer">
                      <img loading="lazy" decoding="async" src={t.cover} alt="" className="h-24 w-24 rounded-xl object-cover" />
                      <p className="mt-1 truncate text-xs font-bold">{t.title}</p>
                      <p className="truncate text-[11px] text-muted-foreground">{t.artist}</p>
                    </a>
                    <button type="button" aria-label={`Quitar ${t.title}`} onClick={() => saveSongs(songs.filter((x) => x.id !== t.id))} className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/80"><X className="h-3 w-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {picker && (
        <FavoritesPicker
          kind={picker}
          onClose={() => setPicker(null)}
          onPickArtist={(a) => {
            if (favArtists.some((x) => x.toLowerCase() === a.name.toLowerCase())) { toast("Ya está en tus favoritos"); return; }
            saveArtists([...favArtists, a.name]); setPicker(null); toast.success(`${a.name} está en tus favoritos`);
          }}
          onPickSong={(t) => {
            if (songs.some((x) => x.id === t.id)) { toast("Ya está en tu perfil"); return; }
            saveSongs([{ id: t.id, title: t.title, artist: t.artist, cover: t.cover, link: t.link }, ...songs]); setPicker(null); toast.success(`Sumaste "${t.title}"`);
          }}
        />
      )}

      {/* Puntos generales: se usan en toda la plataforma */}
      <section className="mt-5 rounded-3xl p-4 text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest opacity-80">Puntos generales DROP</p>
        <p className="text-3xl font-black tabular-nums">{generalPoints.toLocaleString("es-AR")}</p>
        <p className="mt-1 text-xs opacity-90">Los sumás en cualquier drop y con tus álbumes, y los canjeás por premios. Los puntos de cada artista se ven dentro de su drop.</p>
        <Button size="sm" variant="secondary" className="mt-3" onClick={() => setTab("stats")}>Ver premios</Button>
      </section>

      {/* Pasaporte: registro de experiencias */}
      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Tu recorrido</p>
            <h2 className="text-xl font-black">Pasaporte</h2>
          </div>
          <Link to="/actividad" className="text-xs font-bold text-primary">{logros.length} logros</Link>
        </div>
        {stamps.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
            <p className="text-sm font-bold">Tu pasaporte está esperando su primer sello</p>
            <p className="mt-1 text-xs text-muted-foreground">Cada drop en el que participás deja un sello acá.</p>
            <Button asChild size="sm" className="mt-3"><Link to="/explorar">Elegir un drop</Link></Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {stamps.map((p) => (
              <Link key={p.drop.id} to="/drop" search={{ d: p.drop.id }} className="text-center">
                <span className="relative mx-auto block h-20 w-20 rotate-[-6deg] overflow-hidden rounded-full border-4 border-dashed border-primary/60">
                  <img loading="lazy" decoding="async" src={p.drop.cover} alt="" className={`h-full w-full object-cover ${p.drop.status === "archived" ? "sepia-[0.5]" : ""}`} />
                </span>
                <p className="mt-2 truncate text-xs font-bold">{p.drop.artist}</p>
                <p className="text-[11px] text-muted-foreground">{p.score.toLocaleString("es-AR")} pts · {p.drop.status === "archived" ? "finalizado" : "en curso"}</p>
              </Link>
            ))}
          </div>
        )}
        {logros.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{logros.map((l) => <span key={l.id} className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-semibold">{l.icon} {l.title}</span>)}</div>}
        {merch.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Merch comprada</p>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {merch.map((m) => (
                <Link key={`${m.dropId}-${m.itemId}`} to="/tienda" search={{ v: "pedidos" }} className="w-24 shrink-0">
                  <img loading="lazy" decoding="async" src={m.image} alt="" className="h-24 w-24 rounded-xl object-cover" />
                  <p className="mt-1 truncate text-xs font-bold">{m.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{m.artist}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Mis DROPS: colección protagonista */}
      <section id="perfil-drops" className="mt-7 scroll-mt-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Tu colección</p>
            <h2 className="text-xl font-black">Drops guardados</h2>
          </div>
          <Link to="/explorar" className="text-xs font-bold text-primary">Descubrir</Link>
        </div>
        {extras.savedDrops.length > 0 && (
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {(["todos", "guardado", "en_curso", "completado", "finalizado"] as const).map((f) => (
              <Button key={f} variant={dropFilter === f ? "default" : "outline"} size="sm" className="shrink-0 text-[11px]" onClick={() => setDropFilter(f)}>
                {f === "todos" ? "Todos" : STATUS_LABEL[f]}
              </Button>
            ))}
          </div>
        )}
        {extras.savedDrops.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
            <p className="text-sm font-bold">Tu colección está vacía</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Guardá drops desde la pestaña Drops para reunir acá los lanzamientos que te interesan, participés o no en sus misiones.</p>
            <Button asChild size="sm" className="mt-3"><Link to="/explorar">Ver drops</Link></Button>
          </div>
        ) : visibleDrops.length === 0 ? (
          <p className="py-4 text-center text-xs text-muted-foreground">No hay drops con ese estado.</p>
        ) : (
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {visibleDrops.map((drop) => (
              <article key={drop.campaign_id} className="w-36 shrink-0">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted">
                  <img decoding="async" src={COVERS[drop.campaign_id] ?? laliCover.url} alt={`Portada de ${drop.title}`} loading="lazy" className="h-full w-full object-cover" />
                  <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-black uppercase tracking-wide ${drop.status === "en_curso" ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground"}`}>
                    {STATUS_LABEL[drop.status]}
                  </span>
                </div>
                <p className="mt-2 truncate text-sm font-bold">{drop.title}</p>
                <p className="truncate text-xs text-muted-foreground">{drop.artist}</p>
                <Button asChild size="sm" variant="outline" className="mt-2 w-full text-[11px]"><Link to="/drop" search={{ d: drop.campaign_id }}>Entrar</Link></Button>
              </article>
            ))}
          </div>
        )}
        <details className="mt-4 rounded-2xl border border-border bg-card p-3">
          <summary className="cursor-pointer text-xs font-bold text-muted-foreground">Ver todos los lanzamientos disponibles</summary>
          <div className="pt-3"><DropSelector /></div>
        </details>
      </section>

      {/* Pestañas */}
      <nav id="perfil-tabs" className="mt-7 scroll-mt-4 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1" aria-label="Secciones de tu perfil">
        {TABS.map((t) => (
          <Button key={t.id} variant={tab === t.id ? "default" : "ghost"} size="sm" onClick={() => setTab(t.id)} className="shrink-0 flex-1 text-xs">{t.label}</Button>
        ))}
      </nav>

      {tab === "shows" && (
        <section className="mt-5 space-y-3">
          {extras.shows.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
              <p className="text-sm font-bold">Sin shows registrados</p>
              <p className="mt-1 text-xs text-muted-foreground">Marcá "Asistí a este show" desde Reseñas para armar tu historial de recitales y festivales.</p>
            </div>
          ) : extras.shows.map((show) => (
            <article key={show.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <img loading="lazy" decoding="async" src={show.image_url ?? eventCrowd} alt={`Imagen de ${show.title}`} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{show.title}</p>
                <p className="text-xs text-muted-foreground">{show.artist}</p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground"><MapPin className="h-3 w-3" />{show.venue}{show.city ? ` · ${show.city}` : ""}</p>
              </div>
              <p className="text-[11px] text-muted-foreground">{show.event_date ? new Date(show.event_date).toLocaleDateString("es-AR") : "A confirmar"}</p>
            </article>
          ))}
        </section>
      )}

      {tab === "resenas" && (
        <section className="mt-5 space-y-3">
          <Button variant="outline" className="w-full" onClick={() => setTab("albumes")}><Star className="h-4 w-4" />Escribir una reseña nueva</Button>
          {myReviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
              <p className="text-sm font-bold">Todavía no publicaste reseñas</p>
              <p className="mt-1 text-xs text-muted-foreground">Puntuá y reseñá álbumes desde la pestaña Álbumes.</p>
            </div>
          ) : myReviews.map((r) => (
            <article key={r.id} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3">
              {(ALBUMS.find((a) => a.id === r.subject_id)?.cover ?? r.subject_image) && <img loading="lazy" decoding="async" src={ALBUMS.find((a) => a.id === r.subject_id)?.cover ?? r.subject_image ?? undefined} alt={`Imagen de ${r.subject_title}`} className="h-14 w-14 shrink-0 rounded-xl object-cover" />}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{r.subject_title}</p>
                <p className="text-xs text-muted-foreground">{r.subject_artist}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-bold text-primary"><Star className="h-3 w-3 fill-current" />{r.rating}/5</p>
                {r.text && <p className="mt-1 line-clamp-3 break-words text-xs text-muted-foreground">{r.text}</p>}
                <p className="mt-1 text-[11px] text-muted-foreground">{new Date(r.created_at).toLocaleDateString("es-AR")}</p>
              </div>
            </article>
          ))}
        </section>
      )}

      {tab === "actividad" && (
        <section className="mt-5">
          {state.movements.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
              <p className="text-sm font-bold">Sin actividad registrada</p>
              <p className="mt-1 text-xs text-muted-foreground">Tus misiones completadas, logros y movimientos de puntos aparecen acá.</p>
            </div>
          ) : (
            <div className="space-y-3 border-l border-border pl-4">
              {state.movements.map((m) => (
                <div key={m.id} className="relative">
                  <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-xs font-bold">{m.reason === "mission_reward" ? "Misión validada" : m.reason === "reward_redeem" ? "Canje de recompensa" : m.reason === "album_listened" ? "Álbum marcado manualmente" : m.reason === "album_unlistened" ? "Álbum desmarcado" : "Movimiento histórico"}</p>
                  <p className="text-[11px] text-muted-foreground">{m.amount > 0 ? "+" : ""}{m.amount} generales · {m.campaign_delta} campaña · {new Date(m.created_at).toLocaleDateString("es-AR")}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "stats" && (
        <section className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <StatCard value={generalPoints.toLocaleString("es-AR")} label="Puntos generales" />
            <StatCard value={`${stamps.length}`} label="Drops jugados" />
            <StatCard value={`${listened.length}`} label="Álbumes escuchados" />
            <StatCard value={avgRating ?? "—"} label="Calificación promedio" />
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="text-sm font-black">Actividad por mes</h3>
            {monthlyActivity.length === 0 ? (
              <p className="mt-2 text-xs text-muted-foreground">Todavía no hay actividad registrada para graficar.</p>
            ) : (
              <div className="mt-3 space-y-2">
                {monthlyActivity.map(([month, count]) => (
                  <div key={month} className="flex items-center gap-2">
                    <span className="w-14 shrink-0 text-[11px] uppercase text-muted-foreground">{month}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, count * 20)}%` }} />
                    </div>
                    <span className="w-6 text-right text-[11px] font-bold">{count}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-3 text-[11px] text-muted-foreground">Las estadísticas se calculan solo con tu actividad registrada en DROP; no inventamos reproducciones.</p>
          </div>
          <RewardsRedeem />
        </section>
      )}

      {tab === "albumes" && <AlbumsSection />}

      {/* Editar perfil */}
      {editing && <EditProfileDialog onClose={() => setEditing(false)} onSave={async (patch) => { const ok = await saveProfile(patch); if (ok) { setEditing(false); toast.success("Perfil actualizado"); } }} />}

      {/* Configuración */}
      {settings && (
        <Dialog open onOpenChange={(open) => { if (!open) setSettings(false); }}>
          <DialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-lg">
            <DialogHeader>
              <DialogTitle>Configuración</DialogTitle>
              <DialogDescription>{mode === "user" ? "Tu cuenta guarda puntos, álbumes y drops en todos tus dispositivos." : "Estás en modo invitado: nada se guarda."}</DialogDescription>
            </DialogHeader>
            <Button variant="outline" onClick={async () => { await signOut(); void navigate({ to: "/auth", search: { mode: "login" }, replace: true }); }}>
              {mode === "user" ? "Cerrar sesión" : "Salir del modo invitado"}
            </Button>
            <Button variant="ghost" onClick={() => { try { localStorage.removeItem("drop-onboarding-visto"); } catch { /* */ } void navigate({ to: "/explorar" }); }}>Ver cómo funciona DROP</Button>
            {isAdmin && <Button variant="outline" onClick={() => void navigate({ to: "/admin" })}>Panel de drops (admin)</Button>}
            <a href="/privacidad" className="text-center text-xs text-muted-foreground underline">Política de privacidad</a>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function Stat({ value, label, onClick }: { value: string; label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-2xl border border-border bg-card p-3 text-center transition-colors active:bg-muted hover:border-primary/50"><p className="text-lg font-black tabular-nums">{value}</p><p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p></button>;
}

function QuickAction({ icon: Icon, label, onClick }: { icon: typeof Star; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5 text-left text-xs font-bold transition-colors active:bg-muted hover:border-primary/50">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}><Icon className="h-3.5 w-3.5" /></span>
      <span className="leading-tight">{label}</span>
    </button>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl border border-border bg-card p-4"><p className="text-2xl font-black tabular-nums">{value}</p><p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p></div>;
}

type ProfilePatch = { display_name?: string; username?: string; bio?: string; avatar_url?: string | null };

function EditProfileDialog({ onClose, onSave }: { onClose: () => void; onSave: (patch: ProfilePatch) => Promise<void> }) {
  const { profile } = useDropAuth();
  const [name, setName] = useState(profile.display_name ?? "");
  const [username, setUsername] = useState(profile.username ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [avatar, setAvatar] = useState<string | null>(profile.avatar_url ?? null);
  const [saving, setSaving] = useState(false);
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Así te ve la comunidad de DROP.</DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={async (e) => { e.preventDefault(); const patch: ProfilePatch = {};
          const n = name.trim(); const u = username.trim().replace(/^@/, "").toLowerCase(); const b = bio.trim();
          if (u && !/^[a-z0-9._-]{3,30}$/.test(u)) { toast.error("El usuario puede tener letras, números, punto o guiones (3 a 30)"); return; }
          if (n && n !== (profile.display_name ?? "")) patch.display_name = n;
          if (u !== (profile.username ?? "")) patch.username = u || undefined;
          if (b !== (profile.bio ?? "")) patch.bio = b;
          if (avatar !== (profile.avatar_url ?? null)) patch.avatar_url = avatar;
          if (!Object.keys(patch).length) { onClose(); return; }
          setSaving(true); await onSave(patch); setSaving(false); }}>
          <div className="flex items-center gap-3">
            <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-muted">
              {avatar ? <img src={avatar} alt="Tu foto de perfil" className="h-full w-full object-cover" /> : <UserRound className="h-7 w-7 text-muted-foreground" />}
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="cursor-pointer rounded-full border border-border px-3 py-1.5 text-xs font-bold">
                {avatar ? "Cambiar foto" : "Subir foto"}
                <input type="file" accept="image/*" className="sr-only" onChange={async (e) => {
                  const file = e.target.files?.[0]; e.target.value = "";
                  if (!file) return;
                  try { setAvatar(await avatarFromFile(file)); } catch { toast.error("No pudimos usar esa imagen. Probá con otra."); }
                }} />
              </label>
              {avatar && <button type="button" onClick={() => setAvatar(null)} className="rounded-full px-3 py-1.5 text-xs font-bold text-muted-foreground">Quitar</button>}
            </div>
          </div>
          <label className="block space-y-1 text-sm font-bold">Nombre visible<Input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} /></label>
          <label className="block space-y-1 text-sm font-bold">Nombre de usuario<Input value={username} onChange={(e) => setUsername(e.target.value)} maxLength={30} placeholder="tu_usuario" /></label>
          <label className="block space-y-1 text-sm font-bold">Biografía <span className="font-normal text-muted-foreground">(opcional)</span><Textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={200} rows={3} placeholder="Contá qué música te mueve" /></label>
          <Button type="submit" className="w-full" disabled={saving}>Guardar cambios</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
