import { Calendar, MapPin, ShieldCheck, Lock, Ticket } from "lucide-react";
import { useDropAuth } from "./AuthProvider";
import eventCrowd from "@/assets/event-crowd.jpg";
import stickerNvaa from "@/assets/sticker-nvaa.png.asset.json";
import simbolos33 from "@/assets/simbolos-33.png.asset.json";
import laliLogo from "@/assets/lali-logo.png.asset.json";
import fanaticoSingle from "@/assets/fanatico-single.png.asset.json";
import albumCover from "@/assets/album-cover.png.asset.json";
import laliAuto from "@/assets/lali-auto.png.asset.json";

// Cada recompensa se desbloquea al llegar a una cantidad de misiones completadas.
const rewards = [
  { img: stickerNvaa.url, label: "Sticker: No vayas a atender cuando el demonio llama", need: 1 },
  { img: fanaticoSingle.url, label: "Fragmento: 'Fanático'", need: 2 },
  { img: laliAuto.url, label: "Foto exclusiva #01", need: 4 },
  { img: simbolos33.url, label: "Sticker: pentagrama 33", need: 6 },
  { img: albumCover.url, label: "Arte alternativo del álbum", need: 9 },
  { img: laliLogo.url, label: "Insignia LALIVERSE", need: 12 },
];
const DROP_MISSIONS = ["lali-stream", "lali-trivia", "lali-order", "lali-qr", "lali-ar"];

export function PasaporteView({ embedded = false }: { embedded?: boolean }) {
  const { state, mode } = useDropAuth();
  const isUser = mode === "user";
  const completed = state.attempts.filter((a) => a.status === "completed" && a.general_award > 0);
  // Los invitados ven una colección de ejemplo para entender cómo funciona.
  const done = isUser ? completed.length : 5;
  const missionsDone = isUser ? new Set(completed.map((a) => a.mission_id).filter((id) => DROP_MISSIONS.includes(id))).size : 3;
  const vip = missionsDone >= DROP_MISSIONS.length;
  const unlockedCount = rewards.filter((r) => done >= r.need).length;
  return (
    <div className={embedded ? "" : "px-5"}>
      <div className="mb-4">
        {embedded ? <h2 className="text-xl font-black">Recompensas</h2> : <h1 className="text-3xl font-black">Pasaporte</h1>}
        <p className="text-sm text-muted-foreground">
          {embedded ? "Completá misiones para desbloquear premios y el acceso VIP." : "Tus recompensas del recorrido LALI."}
        </p>
      </div>

      {/* VIP Ticket */}
      <section className="relative mb-6 overflow-hidden rounded-3xl border border-primary/50 bg-card">
        <div className="relative h-28 w-full overflow-hidden">
          <img decoding="async"
            src={eventCrowd}
            alt="Público en el listening party"
            loading="lazy"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        </div>
        <div className="p-5 pt-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
              Acceso VIP · Primeros 150
            </p>
            <h2 className="text-xl font-black">Listening Party</h2>
            <p className="text-xs text-muted-foreground">LALI · No vayas a atender cuando el demonio llama</p>
          </div>
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>

        <div className={`mx-auto my-2 grid h-40 w-40 place-items-center rounded-2xl border p-3 ${vip ? "border-primary bg-primary/15" : "border-dashed border-primary/40 bg-primary/5"}`}>
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/15">
              {vip ? <Ticket className="h-6 w-6 text-primary" /> : <Lock className="h-6 w-6 text-primary" />}
            </span>
            <p className="text-sm font-bold leading-tight">
              {vip ? "¡Estás en la lista!" : "Acceso bloqueado"}
            </p>
            <p className="text-xs leading-snug text-muted-foreground">
              {vip
                ? "Completaste todos los retos. Te confirmamos el lugar por mail."
                : `Completá los ${DROP_MISSIONS.length} retos del drop para entrar a los primeros 150.`}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-xs">
            <span className="font-semibold">Retos del drop</span>
            <span className="text-muted-foreground">{missionsDone} de {DROP_MISSIONS.length}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full transition-all" style={{ width: `${(missionsDone / DROP_MISSIONS.length) * 100}%`, backgroundImage: "var(--gradient-drop)" }} />
          </div>
        </div>

        <div className="my-4 flex items-center gap-2">
          <span className="h-4 w-4 -translate-x-6 rounded-full bg-background" />
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="h-4 w-4 translate-x-6 rounded-full bg-background" />
        </div>

        <div className="space-y-2 text-xs">
          <Row icon={<Calendar className="h-3.5 w-3.5" />} label="Sábado 2 Abr · 21:00 hs" />
          <Row icon={<MapPin className="h-3.5 w-3.5" />} label="Complejo Art Media" />
        </div>
        </div>
      </section>

      {/* Rewards grid */}
      <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Colección · {unlockedCount} de {rewards.length}
      </h2>
      {!isUser && <p className="-mt-2 mb-3 text-xs text-muted-foreground">Colección de ejemplo. Ingresá con tu cuenta para armar la tuya.</p>}
      <div className="grid grid-cols-2 gap-3">
        {rewards.map((r) => {
          const locked = done < r.need;
          return (
            <div
              key={r.label}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative h-24 bg-muted">
                <img decoding="async"
                  src={r.img}
                  alt={r.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ opacity: locked ? 0.25 : 1 }}
                />
                {locked && (
                  <span className="absolute inset-0 grid place-items-center">
                    <Lock className="h-7 w-7 text-muted-foreground" />
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {locked ? `${r.need} ${r.need === 1 ? "misión" : "misiones"}` : "Desbloqueado"}
                </p>
                <p className="truncate text-xs font-semibold">{locked ? "Bloqueado" : r.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Souvenir teaser */}
      <div className="mt-5 rounded-2xl border border-dashed border-border bg-card/50 p-4 text-center">
        <p className="text-xs font-semibold">🏆 Souvenir "Estuve el Día 1"</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {vip ? "Se activa el día del evento al escanear tu QR en la entrada." : "Se activa cuando se desbloquee tu acceso al evento."}
        </p>
      </div>
    </div>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/20 text-primary">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}
