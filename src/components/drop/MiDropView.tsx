import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Disc3, MapPin, Pencil, Settings, Share2, Star, UserRound } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProfileExtras } from "@/lib/explore.functions";
import { emptyProfileExtras, type ProfileExtras, type SavedDropStatus } from "@/lib/explore-data";
import { PHOTOS } from "@/lib/fan-avatars";
import { ALBUMS } from "@/lib/albums";
import { useDropAuth } from "./AuthProvider";
import { AlbumsSection } from "./AlbumsSection";
import { RewardsRedeem } from "./RewardsRedeem";
import { DropSelector } from "./DropSelector";
import laliCover from "@/assets/album-cover.png.asset.json";
import mariaCover from "@/assets/drop-photo-18.png.asset.json";
import dillomCover from "@/assets/drop-photo-19.png.asset.json";
import eventCrowd from "@/assets/event-crowd.jpg";

const COVERS: Record<string, string> = { lali: laliCover.url, maria: mariaCover.url, dillom: dillomCover.url };

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
  { id: "actividad", label: "Actividad" },
  { id: "stats", label: "Stats" },
  { id: "albumes", label: "Álbumes" },
];

export function MiDropView({ initialTab }: { initialTab?: ProfileTab }) {
  const { profile, mode, state, saveProfile, signOut, reviews } = useDropAuth();
  const navigate = useNavigate();
  const fetchExtras = useServerFn(getProfileExtras);
  const [extras, setExtras] = useState<ProfileExtras>(emptyProfileExtras);
  const [tab, setTab] = useState<ProfileTab>(initialTab ?? "shows");
  const [dropFilter, setDropFilter] = useState<SavedDropStatus | "todos">("todos");
  const [editing, setEditing] = useState(false);
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    if (mode !== "user") { setExtras(emptyProfileExtras); return; }
    fetchExtras().then(setExtras).catch(() => setExtras(emptyProfileExtras));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const listened = profile?.listened_albums ?? [];
  const generalPoints = profile?.general_points ?? 0;
  const campaignPoints = state.balances.reduce((sum, b) => sum + b.score, 0);
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
            {profile.avatar_url ? <img src={profile.avatar_url} alt="Foto de perfil" className="h-full w-full object-cover" /> : mode === "guest" ? <UserRound className="h-8 w-8 text-muted-foreground" /> : <img src={PHOTOS.worldCup} alt="Foto de perfil" className="h-full w-full object-cover" />}
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
        {memberSince && <p className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground"><CalendarDays className="h-3 w-3" />En DROP desde {memberSince}</p>}
        {mode === "guest" && <p className="mt-2 text-[11px] text-primary">Modo invitado · tus datos no se guardan</p>}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}><Pencil className="h-3.5 w-3.5" />Editar</Button>
          <Button variant="outline" size="sm" onClick={shareProfile}><Share2 className="h-3.5 w-3.5" />Compartir</Button>
          <Button variant="outline" size="sm" onClick={() => setSettings(true)}><Settings className="h-3.5 w-3.5" />Ajustes</Button>
        </div>
      </header>

      {/* Resumen de actividad */}
      <section className="mt-5 grid grid-cols-4 gap-2">
        <Stat value={`${extras.shows.length}`} label="Shows" />
        <Stat value={`${myReviews.length}`} label="Reseñas" />
        <Stat value={`${extras.savedDrops.length}`} label="DROPS" />
        <Stat value={avgRating ?? "—"} label="Promedio" />
      </section>

      {/* Mis DROPS: colección protagonista */}
      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Tu colección</p>
            <h2 className="text-xl font-black">Mis DROPS</h2>
          </div>
          <Link to="/explorar" className="text-xs font-bold text-primary">Descubrir</Link>
        </div>
        {extras.savedDrops.length > 0 && (
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {(["todos", "guardado", "en_curso", "completado", "finalizado"] as const).map((f) => (
              <Button key={f} variant={dropFilter === f ? "default" : "outline"} size="sm" className="shrink-0 text-[10px]" onClick={() => setDropFilter(f)}>
                {f === "todos" ? "Todos" : STATUS_LABEL[f]}
              </Button>
            ))}
          </div>
        )}
        {extras.savedDrops.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
            <p className="text-sm font-bold">Tu colección está vacía</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Guardá drops desde Explorar para reunir acá los lanzamientos que te interesan, participés o no en sus misiones.</p>
            <Button asChild size="sm" className="mt-3"><Link to="/explorar">Ir a Explorar</Link></Button>
          </div>
        ) : visibleDrops.length === 0 ? (
          <p className="py-4 text-center text-xs text-muted-foreground">No hay drops con ese estado.</p>
        ) : (
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {visibleDrops.map((drop) => (
              <article key={drop.campaign_id} className="w-36 shrink-0">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted">
                  <img src={COVERS[drop.campaign_id] ?? laliCover.url} alt={`Portada de ${drop.title}`} loading="lazy" className="h-full w-full object-cover" />
                  <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide ${drop.status === "en_curso" ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground"}`}>
                    {STATUS_LABEL[drop.status]}
                  </span>
                </div>
                <p className="mt-2 truncate text-sm font-bold">{drop.title}</p>
                <p className="truncate text-xs text-muted-foreground">{drop.artist}</p>
                {drop.campaign_id === "lali" && <Button asChild size="sm" variant="outline" className="mt-2 w-full text-[10px]"><Link to="/drop">Continuar</Link></Button>}
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
      <nav className="mt-7 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1" aria-label="Secciones de Mi DROP">
        {TABS.map((t) => (
          <Button key={t.id} variant={tab === t.id ? "default" : "ghost"} size="sm" onClick={() => setTab(t.id)} className="shrink-0 flex-1 text-[11px]">{t.label}</Button>
        ))}
      </nav>

      {tab === "shows" && (
        <section className="mt-5 space-y-3">
          {extras.shows.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-5 text-center">
              <p className="text-sm font-bold">Sin shows registrados</p>
              <p className="mt-1 text-xs text-muted-foreground">Marcá "Asistí a este show" desde Explorar para armar tu historial de recitales y festivales.</p>
            </div>
          ) : extras.shows.map((show) => (
            <article key={show.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <img src={show.image_url ?? eventCrowd} alt={`Imagen de ${show.title}`} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{show.title}</p>
                <p className="text-[11px] text-muted-foreground">{show.artist}</p>
                <p className="flex items-center gap-1 text-[10px] text-muted-foreground"><MapPin className="h-3 w-3" />{show.venue}{show.city ? ` · ${show.city}` : ""}</p>
              </div>
              <p className="text-[10px] text-muted-foreground">{show.event_date ? new Date(show.event_date).toLocaleDateString("es-AR") : "A confirmar"}</p>
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
              {r.subject_image && <img src={r.subject_image} alt={`Imagen de ${r.subject_title}`} className="h-14 w-14 shrink-0 rounded-xl object-cover" />}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{r.subject_title}</p>
                <p className="text-[11px] text-muted-foreground">{r.subject_artist}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-bold text-primary"><Star className="h-3 w-3 fill-current" />{r.rating}/5</p>
                {r.text && <p className="mt-1 line-clamp-3 break-words text-xs text-muted-foreground">{r.text}</p>}
                <p className="mt-1 text-[10px] text-muted-foreground">{new Date(r.created_at).toLocaleDateString("es-AR")}</p>
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
                  <p className="text-[10px] text-muted-foreground">{m.amount > 0 ? "+" : ""}{m.amount} generales · {m.campaign_delta} campaña · {new Date(m.created_at).toLocaleDateString("es-AR")}</p>
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
            <StatCard value={campaignPoints.toLocaleString("es-AR")} label="Puntos de campaña" />
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
                    <span className="w-14 shrink-0 text-[10px] uppercase text-muted-foreground">{month}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, count * 20)}%` }} />
                    </div>
                    <span className="w-6 text-right text-[10px] font-bold">{count}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-3 text-[10px] text-muted-foreground">Las estadísticas se calculan solo con tu actividad registrada en DROP; no inventamos reproducciones.</p>
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
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl border border-border bg-card p-3 text-center"><p className="text-lg font-black tabular-nums">{value}</p><p className="text-[9px] uppercase tracking-wide text-muted-foreground">{label}</p></div>;
}

function StatCard({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl border border-border bg-card p-4"><p className="text-2xl font-black tabular-nums">{value}</p><p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p></div>;
}

function EditProfileDialog({ onClose, onSave }: { onClose: () => void; onSave: (patch: { display_name?: string; username?: string; bio?: string }) => Promise<void> }) {
  const { profile } = useDropAuth();
  const [name, setName] = useState(profile.display_name ?? "");
  const [username, setUsername] = useState(profile.username ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [saving, setSaving] = useState(false);
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Así te ve la comunidad de DROP.</DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave({ display_name: name.trim() || profile.display_name, username: username.trim().replace(/^@/, ""), bio: bio.trim() }); setSaving(false); }}>
          <label className="block space-y-1 text-sm font-bold">Nombre visible<Input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} /></label>
          <label className="block space-y-1 text-sm font-bold">Nombre de usuario<Input value={username} onChange={(e) => setUsername(e.target.value)} maxLength={30} placeholder="tu_usuario" /></label>
          <label className="block space-y-1 text-sm font-bold">Biografía <span className="font-normal text-muted-foreground">(opcional)</span><Textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={200} rows={3} placeholder="Contá qué música te mueve" /></label>
          <Button type="submit" className="w-full" disabled={saving}>Guardar cambios</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
