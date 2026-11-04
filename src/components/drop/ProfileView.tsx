import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Disc3,
  Headphones,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHOTOS } from "@/lib/fan-avatars";
import coverNena from "@/assets/drop-photo-28.png.asset.json";
import coverMechon from "@/assets/drop-photo-29.png.asset.json";
import coverLali from "@/assets/drop-photo-30.png.asset.json";
import fanMaria from "@/assets/drop-photo-31.png.asset.json";
import fanTini from "@/assets/drop-photo-32.png.asset.json";
import fanLali from "@/assets/drop-photo-33.png.asset.json";
import { DropSelector } from "./DropSelector";
import { AlbumsSection } from "./AlbumsSection";
import { RewardsRedeem } from "./RewardsRedeem";
import { useDropAuth } from "./AuthProvider";
import { useNavigate } from "@tanstack/react-router";

type ProfileSection = "perfil" | "albumes";

const artistPoints = [
  { id: "lali", name: "LALI", photo: fanLali.url },
  { id: "maria", name: "María Becerra", photo: fanMaria.url },
  { id: "tini", name: "TINI", photo: fanTini.url },
];

export function ProfileView({ onClose, backControl }: { onClose?: () => void; backControl?: ReactNode }) {
  const { profile, signOut, mode } = useDropAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState<ProfileSection>("perfil");
  const listened = profile?.listened_albums ?? [];
  const generalPoints = profile?.general_points ?? 0;
  const activeDrop = profile?.active_drop ?? "lali";
  const rankingPoints: Record<string, number> = {};
  if (profile?.ranking_points && typeof profile.ranking_points === "object" && !Array.isArray(profile.ranking_points)) {
    for (const [key, value] of Object.entries(profile.ranking_points)) if (typeof value === "number") rankingPoints[key] = value;
  }

  const title = section === "perfil" ? "Mi DROP" : "Álbumes";

  return (
    <div className="min-h-screen bg-background pb-8 text-foreground">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-4 backdrop-blur-xl">
        {backControl ?? <Button variant="outline" size="icon" onClick={onClose} aria-label="Volver al drop">
          <ArrowLeft />
        </Button>}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Cuenta DROP</p>
          <h1 className="truncate text-xl font-black">{title}</h1>
        </div>
        <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-primary/50 bg-card">
          {profile.avatar_url ? <img decoding="async" src={profile.avatar_url} alt="Foto de perfil" className="h-full w-full object-cover" /> : mode === "guest" ? <UserRound className="h-5 w-5 text-muted-foreground" /> : <img decoding="async" src={PHOTOS.worldCup} alt="Foto de perfil" className="h-full w-full object-cover" />}
        </div>
      </header>

      <div className="px-4 pt-4">
        <div className="mb-4 flex items-center justify-between gap-2"><div className="min-w-0"><p className="truncate text-sm font-bold">{profile?.display_name}</p><p className="text-[11px] text-muted-foreground">{mode === "user" ? "Cuenta guardada" : "Modo invitado · tus datos no se guardan"}</p></div><Button variant="ghost" onClick={async () => { await signOut(); void navigate({ to: "/auth", search: { mode: "login" }, replace: true }); }}>{mode === "user" ? "Cerrar sesión" : "Salir"}</Button></div>
        <nav className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card p-1" aria-label="Secciones de Mi DROP">
          <ProfileTab active={section === "perfil"} icon={UserRound} label="Perfil" onClick={() => setSection("perfil")} />
          <ProfileTab active={section === "albumes"} icon={Disc3} label="Álbumes" onClick={() => setSection("albumes")} />
        </nav>

        {section === "perfil" && (
          <ProfileHome
            generalPoints={generalPoints}
            listenedCount={listened.length}
            activeDrop={activeDrop}
            rankingPoints={rankingPoints}
            onOpenAlbums={() => setSection("albumes")}
            onOpenDrops={() => document.getElementById("elegir-drop")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
        )}

        {section === "albumes" && <AlbumsSection />}
      </div>
    </div>
  );
}

function ProfileTab({ active, icon: Icon, label, onClick }: { active: boolean; icon: typeof UserRound; label: string; onClick: () => void }) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      onClick={onClick}
      className="h-12 flex-col gap-0.5 rounded-xl px-2 text-[10px]"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );
}

function ProfileHome({
  generalPoints,
  listenedCount,
  activeDrop,
  rankingPoints,
  onOpenAlbums,
  onOpenDrops,
}: {
  generalPoints: number;
  listenedCount: number;
  activeDrop: string;
  rankingPoints: Record<string, number>;
  onOpenAlbums: () => void;
  onOpenDrops: () => void;
}) {
  const { state } = useDropAuth();

  const totalArtistPoints = artistPoints.reduce((sum, artist) => sum + (state.balances.find((b) => b.campaign_id === artist.id)?.score ?? 0), 0);

  return (
    <div className="space-y-5 pt-5">
      <section className="overflow-hidden rounded-3xl border border-primary/40 bg-card">
        <div className="p-5" style={{ backgroundImage: "var(--gradient-drop-soft)" }}>
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Puntos generales</p>
              <p className="mt-1 text-4xl font-black tabular-nums">{generalPoints.toLocaleString("es-AR")}</p>
              <p className="text-xs text-muted-foreground">Disponibles para recompensas</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Stat value={`${listenedCount}`} label="álbumes" />
            <Stat value={totalArtistPoints.toLocaleString("es-AR")} label="pts. de campañas" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto justify-between rounded-2xl p-4 text-left" onClick={onOpenAlbums}>
          <span><Disc3 className="mb-3 text-primary" /><span className="block text-xs font-bold">Mis álbumes</span></span>
          <ChevronRight className="text-muted-foreground" />
        </Button>
        <Button variant="outline" className="h-auto justify-between rounded-2xl p-4 text-left" onClick={onOpenDrops}>
          <span><Headphones className="mb-3 text-primary" /><span className="block text-xs font-bold">Elegir drop</span></span>
          <ChevronRight className="text-muted-foreground" />
        </Button>
      </div>

      <DropSelector />

      <section>
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Tus fandoms</p>
            <h2 className="text-lg font-black">Puntaje de campaña</h2>
          </div>
          <span className="text-[10px] text-muted-foreground">3 artistas</span>
        </div>
        <div className="space-y-2">
          {artistPoints.map((artist) => (
            <div key={artist.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <img loading="lazy" decoding="async" src={artist.photo} alt={`Foto de ${artist.name}`} className="h-10 w-10 shrink-0 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{artist.name}</p>
                <p className="text-[10px] text-muted-foreground">Participación en DROP</p>
              </div>
              <p className="text-sm font-black tabular-nums">{((state.balances.find((b) => b.campaign_id === artist.id)?.score ?? 0)).toLocaleString("es-AR")} pts</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-black">Tus drops anteriores</h2><p className="mb-2 text-xs text-muted-foreground">Experiencias de muestra · no representan actividad de tu cuenta.</p>
        <div className="space-y-2">
          {[{ artist: "LALI", title: "LALI · 2023", points: "2.480", image: coverLali.url }, { artist: "María Becerra", title: "La Nena de Argentina", points: "860", image: coverNena.url }, { artist: "TINI", title: "Un mechón de pelo", points: "540", image: coverMechon.url }].map((drop) => <article key={drop.artist} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"><img loading="lazy" decoding="async" src={drop.image} alt={`Portada de ${drop.title}`} className="h-14 w-14 shrink-0 rounded-md object-cover" /><div className="min-w-0 flex-1"><p className="text-sm font-bold">{drop.artist}</p><p className="text-xs text-muted-foreground">{drop.title}</p><p className="mt-1 text-[10px] text-primary">Completado</p></div><span className="text-xs font-bold">{drop.points} pts</span></article>)}
        </div>
      </section>

      <RewardsRedeem />
      {Object.keys(rankingPoints).length > 0 && <section><h2 className="text-sm font-bold">Saldos históricos por artista</h2>{Object.entries(rankingPoints).map(([artist, pts]) => <p key={artist} className="text-xs">{artist}: {pts} pts · histórico, no participación verificada</p>)}</section>}

      <section>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Actividad reciente</p>
        <div className="space-y-3 border-l border-border pl-4">
          {state.movements.length === 0 && <p className="text-xs text-muted-foreground">Todavía no hay movimientos registrados.</p>}
          {state.movements.map((m) => <Activity key={m.id} title={m.reason === "mission_reward" ? "Misión validada" : m.reason === "reward_redeem" ? "Canje de recompensa" : m.reason === "album_listened" ? "Álbum marcado manualmente" : m.reason === "album_unlistened" ? "Álbum desmarcado" : "Movimiento histórico"} detail={`${m.amount > 0 ? "+" : ""}${m.amount} generales · ${m.campaign_delta} campaña · ${m.evidence_type === "legacy" ? "histórico" : m.evidence_type === "drop_verified" ? "validación DROP" : "declaración manual"}`} />)}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-xl border border-border bg-background/35 p-3"><p className="text-lg font-black">{value}</p><p className="text-[9px] uppercase text-muted-foreground">{label}</p></div>;
}

function Activity({ title, detail }: { title: string; detail: string }) {
  return <div className="relative"><span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" /><p className="text-xs font-bold">{title}</p><p className="text-[10px] text-muted-foreground">{detail}</p></div>;
}
