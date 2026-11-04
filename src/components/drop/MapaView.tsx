import { useEffect, useState } from "react";
import { useDropAuth } from "./AuthProvider";
import { Check, Lock, Phone, PhoneCall, PhoneOff, Sparkles, Gift, Clock } from "lucide-react";
import { toast } from "sonner";
import heroPhone from "@/assets/hero-phone.jpg";
import qrStreet from "@/assets/qr-street.jpg";
import albumCover from "@/assets/album-cover.png.asset.json";
import laliPhones from "@/assets/lali-phones.png.asset.json";
import stencilWall from "@/assets/stencil-wall.png.asset.json";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type DropNode = {
  id: number;
  title: string;
  date: string;
  status: "done" | "active" | "locked";
  offset: number;
  x: number;
  y: number;
  desc: string;
  pts: number;
  reward: string;
};

// Las fechas del recorrido se calculan desde hoy para que la demo siempre esté "en curso".
function dayLabel(offset: number) {
  return new Date(Date.now() + offset * 86400000).toLocaleDateString("es-AR", { day: "2-digit", month: "short" }).replace(".", "").replace("-", " ");
}
function unlockAt(offset: number) {
  const d = new Date(Date.now() + offset * 86400000);
  d.setHours(20, 30, 0, 0);
  return d.getTime();
}
function useCountdown(target: number | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  if (!target) return "";
  const left = Math.max(0, target - now);
  const d = Math.floor(left / 86400000), h = Math.floor((left % 86400000) / 3600000), m = Math.floor((left % 3600000) / 60000), sec = Math.floor((left % 60000) / 1000);
  return d > 0 ? `${d}d ${h}h ${m}m` : `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// Ringtone sintetizado con WebAudio (no necesita archivos de audio) + vibración en celulares.
function useRingtone(active: boolean) {
  useEffect(() => {
    if (!active || typeof window === "undefined") return;
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    let ctx: AudioContext | null = null;
    try { ctx = AC ? new AC() : null; } catch { ctx = null; }
    const ring = () => {
      try { navigator.vibrate?.([400, 200, 400]); } catch { /* sin vibración */ }
      if (!ctx) return;
      const t0 = ctx.currentTime;
      for (const [start, freq] of [[0, 440], [0, 480], [0.5, 440], [0.5, 480]] as const) {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.frequency.value = freq; o.type = "sine";
        g.gain.setValueAtTime(0, t0 + start); g.gain.linearRampToValueAtTime(0.08, t0 + start + 0.02);
        g.gain.setValueAtTime(0.08, t0 + start + 0.38); g.gain.linearRampToValueAtTime(0, t0 + start + 0.42);
        o.connect(g).connect(ctx.destination); o.start(t0 + start); o.stop(t0 + start + 0.45);
      }
    };
    ring();
    const t = setInterval(ring, 2500);
    return () => { clearInterval(t); try { navigator.vibrate?.(0); } catch { /* */ } void ctx?.close(); };
  }, [active]);
}

const drops: DropNode[] = [
  {
    id: 1,
    title: "Llamada #1 · Fragmentos",
    date: dayLabel(-14),
    offset: -14,
    status: "done",
    x: 18,
    y: 12,
    desc: "Atendiste la primera llamada y armaste el fragmento de audio oculto en el contestador.",
    pts: 300,
    reward: "Sticker 'Corazón LALI'",
  },
  {
    id: 2,
    title: "Pre-save del álbum",
    date: dayLabel(-10),
    offset: -10,
    status: "done",
    x: 62,
    y: 22,
    desc: "Guardaste el álbum antes del estreno y desbloqueaste el arte de tapa animado.",
    pts: 180,
    reward: "Wallpaper animado",
  },
  {
    id: 3,
    title: "Llamada #2 · Mensaje oculto",
    date: dayLabel(-6),
    offset: -6,
    status: "done",
    x: 28,
    y: 38,
    desc: "Escuchaste el mensaje al revés y descifraste el nombre del próximo track.",
    pts: 420,
    reward: "Fragmento 'Fanático'",
  },
  {
    id: 4,
    title: "QR en Palermo",
    date: "Hoy",
    offset: 0,
    status: "active",
    x: 72,
    y: 52,
    desc: "Tres afiches escondidos entre Plaza Serrano y Thames. Escaneá los QR antes de que se agoten los cupos.",
    pts: 500,
    reward: "Entrada al sorteo VIP",
  },
  {
    id: 5,
    title: "Llamada #3 · Número perdido",
    date: dayLabel(2),
    offset: 2,
    status: "locked",
    x: 30,
    y: 68,
    desc: "Un número desconocido va a llamar. Solo los que estén en el Top 200 pueden atender.",
    pts: 600,
    reward: "Preview del track 8",
  },
  {
    id: 6,
    title: "Listening Party",
    date: dayLabel(9),
    offset: 9,
    status: "locked",
    x: 68,
    y: 84,
    desc: "El evento final. Escuchás el álbum completo con LALI antes que nadie. Solo Top 50.",
    pts: 1000,
    reward: "Souvenir 'Estuve el Día 1'",
  },
];

export function MapaView({ onGoMisiones }: { onGoMisiones: () => void }) {
  const { state, profile } = useDropAuth();
  const score=state.balances.find(b=>b.campaign_id===profile.active_drop)?.score ?? 0;
  const dropMissions=state.missions.filter(m=>m.campaign_id===profile.active_drop && m.status==='verified');
  const doneMissions=new Set(state.attempts.filter(a=>a.status==='completed').map(a=>a.mission_id));
  const progressPct=dropMissions.length ? Math.round(100*dropMissions.filter(m=>doneMissions.has(m.id)).length/dropMissions.length) : 0;
  const [node, setNode] = useState<DropNode | null>(null);
  const [call, setCall] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [reminders, setReminders] = useState<number[]>([]);

  return (
    <div className="space-y-5 px-4">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border p-6">
        <img decoding="async"
          src={heroPhone}
          alt="Teléfono rojo entre humo"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <img decoding="async"
          src={albumCover.url}
          alt="Tapa del álbum 'No vayas a atender cuando el demonio llama'"
          className="absolute -right-5 -top-5 h-32 w-32 rotate-12 rounded-2xl border border-border object-cover shadow-2xl"
        />
        <div className="relative mb-3 inline-flex items-center gap-1 rounded-full bg-primary/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-foreground backdrop-blur">
          <Sparkles className="h-3 w-3" /> DROP #01 · LALI
        </div>
        <h1 className="relative text-2xl font-black leading-tight">
          No vayas a atender <br /> cuando el demonio llama
        </h1>
        <p className="relative mt-2 text-xs text-muted-foreground">
          Cada día se desbloquea una nueva llamada. Atendé, resolvé y sumá puntos.
        </p>
        <button
          onClick={() => setCall(true)}
          className="relative mt-4 flex w-full items-center gap-3 rounded-2xl border border-primary/40 bg-background/40 p-2 text-left backdrop-blur transition-colors active:bg-primary/10"
        >
          <span
            className="grid h-14 w-14 shrink-0 animate-pulse place-items-center rounded-2xl text-primary-foreground shadow-[0_10px_30px_-6px_rgba(220,38,38,0.7)]"
            style={{ backgroundImage: "var(--gradient-drop)" }}
          >
            <PhoneCall className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">
              Llamada entrante
            </span>
            <span className="block text-sm font-bold">Número desconocido · tocá para atender</span>
          </span>
        </button>
      </section>

      {/* Progress */}
      <section className="rounded-2xl border border-border bg-card p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Tu progreso · {progressPct}% del drop
          </p>
          <p className="text-sm font-bold text-primary">{score} pts de campaña</p>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full"
            style={{ width: `${progressPct}%`, backgroundImage: "var(--gradient-drop)" }}
          />
        </div>
      </section>

      {/* Interactive map */}
      <section
        className="relative h-[460px] overflow-hidden rounded-3xl border border-border"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 10%, oklch(0.62 0.24 25 / 0.35), transparent 55%), radial-gradient(circle at 80% 90%, oklch(0.45 0.22 15 / 0.4), transparent 55%), linear-gradient(180deg, oklch(0.16 0.05 20), oklch(0.10 0.03 20))",
        }}
      >
        <img loading="lazy" decoding="async"
          src={stencilWall.url}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-luminosity"
        />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pathGrad" x1="0" x2="1">
              <stop offset="0" stopColor="oklch(0.68 0.26 30)" stopOpacity="0.9" />
              <stop offset="1" stopColor="oklch(0.45 0.22 15)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d={drops.map((d, i) => `${i === 0 ? "M" : "L"} ${d.x} ${d.y}`).join(" ")}
            stroke="url(#pathGrad)"
            strokeWidth="0.6"
            strokeDasharray="1.4 1.4"
            fill="none"
          />
        </svg>

        {drops.map((d) => {
          const done = false;
          const active = d.status === "active";
          const locked = d.status === "locked";
          return (
            <button
              key={d.id}
              onClick={() => setNode(d)}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform active:scale-90"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
              aria-label={d.title}
            >
              <div className="relative flex flex-col items-center">
                {active && (
                  <span
                    className="absolute inset-0 -m-2 animate-ping rounded-full opacity-60"
                    style={{ backgroundImage: "var(--gradient-drop)" }}
                  />
                )}
                <span
                  className={
                    "relative grid h-11 w-11 place-items-center rounded-full border-2 " +
                    (done
                      ? "border-primary/60 bg-primary/25 text-foreground"
                      : active
                        ? "border-transparent text-primary-foreground shadow-[0_8px_25px_-4px_rgba(220,38,38,0.8)]"
                        : "border-border bg-muted text-muted-foreground")
                  }
                  style={active ? { backgroundImage: "var(--gradient-drop)" } : undefined}
                >
                  {done ? (
                    <Check className="h-4 w-4" />
                  ) : locked ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Phone className="h-4 w-4" />
                  )}
                </span>
                <span className="mt-1 whitespace-nowrap rounded-full bg-background/80 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide backdrop-blur">
                  {locked ? `en ${Math.max(1, d.offset)}d` : d.date}
                </span>
              </div>
            </button>
          );
        })}
      </section>

      {/* Active drop */}
      <section className="overflow-hidden rounded-2xl border border-primary/40 bg-card">
        <img decoding="async"
          src={qrStreet}
          alt="Afiche con QR en la calle"
          loading="lazy"
          className="h-32 w-full object-cover"
        />
        <div className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            Llamada activa
          </p>
          <h3 className="mt-1 text-lg font-bold">QR en Palermo</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            3 afiches con QR escondidos entre Plaza Serrano y Thames. Escanealos y sumá 500 puntos.
          </p>
          <button
            onClick={onGoMisiones}
            className="mt-3 w-full rounded-xl py-3 text-sm font-bold text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-drop)" }}
          >
            Atender llamada →
          </button>
        </div>
      </section>

      {/* Node drawer */}
      <Drawer open={!!node} onOpenChange={(o) => !o && setNode(null)}>
        <DrawerContent className="max-h-[85vh]">
          {node && (
            <>
              <DrawerHeader className="text-left">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                  {node.status === "done"
                    ? "Demostración"
                    : node.status === "active"
                      ? "Demostración"
                      : `Se desbloquea el ${node.date}`}
                </p>
                <DrawerTitle className="text-xl font-black">{node.title}</DrawerTitle>
                <DrawerDescription className="text-sm">{node.desc}</DrawerDescription>
              </DrawerHeader>
              <div className="space-y-4 px-4 pb-8">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-2xl border border-border bg-card p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Puntos de muestra
                    </p>
                    <p className="text-lg font-black text-primary">+{node.pts}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Recompensa
                    </p>
                    <p className="text-xs font-semibold leading-snug">{node.reward}</p>
                  </div>
                </div>

                {node.status === "done" && (
                  <div className="flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-3 text-sm">
                    <Gift className="h-4 w-4 shrink-0 text-primary" />
                    <span>Recompensa de muestra; no fue acreditada a tu cuenta.</span>
                  </div>
                )}

                {node.status === "active" && (
                  <button
                    onClick={() => {
                      setNode(null);
                      onGoMisiones();
                    }}
                    className="w-full rounded-xl py-3 text-sm font-black text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-drop)" }}
                  >
                    Ir a la misión
                  </button>
                )}

                {node.status === "locked" && <LockedCountdown offset={node.offset} />}
                {node.status === "locked" && (
                  <button
                    onClick={() => {
                      setReminders((r) => (r.includes(node.id) ? r : [...r, node.id]));
                      toast.success("Te avisamos cuando se desbloquee", {
                        description: `Fecha de desbloqueo: ${node.date}.`,
                      });
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/40 py-3 text-sm font-bold text-primary"
                  >
                    <Clock className="h-4 w-4" />
                    {reminders.includes(node.id) ? "Recordatorio activado ✓" : "Avisarme cuando abra"}
                  </button>
                )}
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* Incoming call */}
      <IncomingCall
        open={call}
        answered={answered}
        onAnswer={() => setAnswered(true)}
        onClose={() => {
          setCall(false);
          setTimeout(() => setAnswered(false), 300);
        }}
        onGoMisiones={() => {
          setCall(false);
          setAnswered(false);
          onGoMisiones();
        }}
      />
    </div>
  );
}

function IncomingCall({
  open,
  answered,
  onAnswer,
  onClose,
  onGoMisiones,
}: {
  open: boolean;
  answered: boolean;
  onAnswer: () => void;
  onClose: () => void;
  onGoMisiones: () => void;
}) {
  const [secs, setSecs] = useState(0);
  useRingtone(open && !answered);

  useEffect(() => {
    if (!answered) {
      setSecs(0);
      return;
    }
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [answered]);

  const mmss = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {answered ? `Demostración de llamada · ${mmss}` : "Llamada entrante"}
          </DrawerTitle>
          <DrawerDescription className="sr-only">Llamada del drop</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col items-center gap-4 px-6 pb-10">
          <div className={`relative ${answered ? "" : "animate-pulse"}`}>
            <img decoding="async"
              src={laliPhones.url}
              alt="LALI atendiendo dos teléfonos"
              className="h-28 w-28 rounded-full border-2 border-primary/60 object-cover shadow-[0_10px_40px_-8px_rgba(220,38,38,0.8)]"
            />
            <span
              className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full text-primary-foreground"
              style={{ backgroundImage: "var(--gradient-drop)" }}
            >
              <PhoneCall className="h-4 w-4" />
            </span>
          </div>
          <p className="text-2xl font-black">Número desconocido</p>

          {answered ? (
            <>
              <div className="w-full rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Transcripción
                </p>
                <p className="mt-2 italic text-muted-foreground">
                  “…te dije que no atiendas. Ahora ya es tarde. El afiche está a tres cuadras de
                  Plaza Serrano, debajo de algo rojo. Tenés hasta las 23:59.”
                </p>
              </div>
              <div className="flex w-full items-end gap-1">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-primary/70"
                    style={{ height: `${8 + ((i * 7) % 26)}px` }}
                  />
                ))}
              </div>
              <button
                onClick={onGoMisiones}
                className="w-full rounded-xl py-3 text-sm font-black text-primary-foreground"
                style={{ backgroundImage: "var(--gradient-drop)" }}
              >
                Ver la pista en Misiones
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground"
              >
                <PhoneOff className="h-4 w-4" /> Cortar
              </button>
            </>
          ) : (
            <div className="mt-2 flex w-full items-center justify-around">
              <button
                onClick={onClose}
                className="grid h-16 w-16 place-items-center rounded-full bg-muted text-foreground"
                aria-label="Rechazar"
              >
                <PhoneOff className="h-6 w-6" />
              </button>
              <button
                onClick={onAnswer}
                className="grid h-16 w-16 place-items-center rounded-full text-primary-foreground"
                style={{ backgroundImage: "var(--gradient-drop)" }}
                aria-label="Atender"
              >
                <PhoneCall className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function LockedCountdown({ offset }: { offset: number }) {
  const left = useCountdown(unlockAt(offset));
  return (
    <div className="rounded-2xl border border-border bg-card p-3 text-center">
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Se desbloquea en</p>
      <p className="mt-1 font-mono text-2xl font-black tabular-nums">{left}</p>
    </div>
  );
}
