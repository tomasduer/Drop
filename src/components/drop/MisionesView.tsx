import { useState } from "react";
import { Camera, Headphones, MapPin, Puzzle, Sparkles, Music, Clock, Trophy, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useDropAuth } from "./AuthProvider";
import { MissionGame, type GameKind } from "@/components/drop/MissionGames";
import fanaticoSingle from "@/assets/fanatico-single.png.asset.json";
import albumCover from "@/assets/album-cover.png.asset.json";
import { PHOTOS } from "@/lib/fan-avatars";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type Mission = {
  id?: string; verified?: boolean; campaignPts?: number;
  icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
  pts: number;
  progress?: number;
  cover?: string;
  cta: string;
  game: GameKind;
  detail: {
    intro: string;
    steps: string[];
    duration: string;
    players: string;
    reward: string;
    tip: string;
  };
};

const dailyTemplates: Mission[] = [
  {
    icon: Headphones,
    tag: "Streaming",
    title: "Escuchá 'Fanático' 3 veces",
    desc: "Escuchalo completo 3 veces y sumá puntos todos los días",
    pts: 120,
    progress: 66,
    cover: fanaticoSingle.url,
    cta: "Abrir Spotify",
    game: "stream",
    detail: {
      intro:
        "Cada reproducción completa del single cuenta. La app valida los plays a través de tu cuenta conectada, así que no hace falta que subas nada.",
      steps: [
        "Conectá tu cuenta de Spotify desde tu Pasaporte",
        "Reproducí 'Fanático' completo (mínimo 30 segundos)",
        "Volvé a la app: el contador se actualiza solo",
      ],
      duration: "Se reinicia cada 24 hs",
      players: "18.420 fans jugando hoy",
      reward: "120 pts + fragmento de audio del Director's Cut",
      tip: "Escuchar en horario del drop (20:30) duplica los puntos.",
    },
  },
  {
    icon: Puzzle,
    tag: "Trivia",
    title: "¿En qué año debutó LALI?",
    desc: "5 preguntas del LALIVERSE. Solo para verdaderos fans.",
    pts: 150,
    cover: PHOTOS.news,
    cta: "Jugar ahora",
    game: "trivia",
    detail: {
      intro:
        "Cinco preguntas de opción múltiple sobre la carrera, las letras y los easter eggs del nuevo álbum. Tenés 20 segundos por pregunta.",
      steps: [
        "Respondé las 5 preguntas contra reloj",
        "Cada acierto suma 30 pts; los errores no restan",
        "Con 5/5 desbloqueás una pregunta bonus secreta",
      ],
      duration: "≈ 2 minutos · 1 intento por día",
      players: "9.877 fans ya la jugaron",
      reward: "Hasta 150 pts + sticker 'Fan Nivel Experto'",
      tip: "Repasá el feed de Comunidad: ahí se filtran pistas.",
    },
  },
  {
    icon: Music,
    tag: "Rompecabezas",
    title: "Ordená el fragmento",
    desc: "4 fragmentos de un track inédito. ¿Podés armarlo?",
    pts: 200,
    cover: albumCover.url,
    cta: "Empezar",
    game: "order",
    detail: {
      intro:
        "Cuatro fragmentos desordenados de un track inédito. Si los ordenás bien, escuchás el preview completo antes que nadie.",
      steps: [
        "Escuchá los 4 clips las veces que quieras",
        "Arrastralos hasta armar la secuencia correcta",
        "Confirmá: tenés 3 intentos antes de perder puntos",
      ],
      duration: "Sin límite de tiempo · 3 intentos",
      players: "4.102 fans lo resolvieron",
      reward: "200 pts + preview exclusivo de 45 segundos",
      tip: "Usá auriculares: el orden se nota en cómo cierra cada beat.",
    },
  },
];

const phygitalTemplates: Mission[] = [
  {
    icon: MapPin,
    tag: "QR en la calle",
    title: "Caza en Palermo",
    desc: "3 afiches escondidos entre Plaza Serrano y Thames",
    pts: 500,
    cover: PHOTOS.estadio,
    cta: "Escanear QR",
    game: "scan",
    detail: {
      intro:
        "Tres afiches con QR pegados en la calle. El mapa te muestra un radio aproximado, no la ubicación exacta: hay que caminar y mirar.",
      steps: [
        "Activá la ubicación para ver los radios en el Mapa",
        "Encontrá el afiche y escaneá su QR desde la app",
        "Sacale una foto y compartila en Comunidad (+50 pts extra)",
      ],
      duration: "Disponible 72 hs o hasta agotar cupos",
      players: "Quedan 240 de 900 escaneos",
      reward: "500 pts + entrada al sorteo de 20 lugares VIP",
      tip: "Los primeros 50 en escanear suman un multiplicador x2.",
    },
  },
  {
    icon: Camera,
    tag: "Realidad aumentada",
    title: "Holograma en el cielo",
    desc: "Apuntá tu cámara al Obelisco a las 20:30 hs",
    pts: 350,
    cover: PHOTOS.rain,
    cta: "Abrir cámara",
    game: "ar",
    detail: {
      intro:
        "Una activación de realidad aumentada geolocalizada: a la hora exacta aparece el holograma con el arte del álbum sobre el Obelisco.",
      steps: [
        "Llegá a la zona del Obelisco antes de las 20:30",
        "Abrí la cámara desde la app y apuntá al cielo",
        "Grabá el clip y publicalo con el hashtag del drop",
      ],
      duration: "Ventana única: 20:30 a 21:00 hs",
      players: "Evento en vivo · 1 sola vez",
      reward: "350 pts + filtro AR permanente en tu Pasaporte",
      tip: "Si no estás en CABA, hay una versión remota a las 21:15.",
    },
  },
];

export function MisionesView() {
  const [selected, setSelected] = useState<Mission | null>(null);
  const { state, mode, profile } = useDropAuth();
  const ids = ['lali-stream','lali-trivia','lali-order','lali-qr','lali-ar'];
  const templates = [...dailyTemplates,...phygitalTemplates];
  const missions: Mission[] = templates.map((m,i) => {
    const configured=state.missions.find(x=>x.id===ids[i]);
    const verified=configured ? configured.status==='verified' : mode==='guest';
    const guestPractice = mode === 'guest' && m.game === 'trivia';
    return {...m,id:ids[i],title:configured?.title ?? m.title,verified,campaignPts:configured?.campaign_reward ?? 0,pts:verified ? configured?.general_reward ?? m.pts : 0,progress:undefined,cta:guestPractice ? 'Jugar de práctica' : verified ? 'Jugar ahora' : 'Ver experiencia',detail:verified && m.game !== 'trivia' ? {...m.detail,reward:configured ? `${configured.general_reward} generales + ${configured.campaign_reward} de campaña` : m.detail.reward} : {...m.detail,intro:guestPractice ? 'Trivia de práctica para invitados. Sin puntos ni participación en el ranking.' : verified ? 'Respondé preguntas propias de DROP. Cada respuesta se valida y el intento queda guardado en tu cuenta.' : 'Experiencia demostrativa o pendiente. No verifica actividades ni acredita puntos.',steps:guestPractice ? ['Respondé las preguntas de práctica','Tu resultado es temporal y no acredita puntos'] : verified ? ['Respondé las preguntas','Un intento por día; 20 segundos por pregunta','Tu resultado se guarda al finalizar'] : ['Explorá la experiencia sin acreditación de puntos'],duration:guestPractice ? 'Práctica libre' : verified ? '1 intento por día · horario de Buenos Aires' : 'Pendiente de validación',players:verified ? 'Participación registrada en tu cuenta' : 'Demostración',reward:verified ? `Hasta ${configured?.general_reward} generales y ${configured?.campaign_reward} de campaña` : 'Sin recompensas acreditables',tip:verified ? 'El canje de puntos generales no modifica tu ranking.' : 'La validación real todavía no está disponible.'}};
  });
  const extra = state.missions.filter(m=>!ids.includes(m.id) && m.campaign_id===profile.active_drop).map(m=>({...dailyTemplates[1],id:m.id,title:m.title,game:m.kind as GameKind,verified:m.status==='verified',pts:m.general_reward,campaignPts:m.campaign_reward,progress:undefined,cta:m.status==='verified'?'Jugar ahora':'Ver experiencia',detail:{...dailyTemplates[1].detail,intro:'Actividad propia de DROP.',reward:`${m.general_reward} generales · ${m.campaign_reward} de campaña`,players:'Participación real',tip:'El resultado se valida en tu cuenta.'}}));
  const daily=[...missions.slice(0,3),...extra]; const phygital=missions.slice(3);
  const earned: Record<string,number>={};
  for(const m of [...daily,...phygital]) { const a=state.attempts.find(a=>a.mission_id===m.id && a.status==='completed' && (state.missions.find(x=>x.id===m.id)?.repeat_period!=='daily'||a.period_key===new Intl.DateTimeFormat('en-CA',{timeZone:'America/Argentina/Buenos_Aires'}).format(new Date()))); if(a) earned[m.title]=a.general_award; }
  const total=state.movements.filter(m=>m.evidence_type==='drop_verified').reduce((sum,m)=>sum+m.amount,0);

  return (
    <div className="space-y-6 px-5">
      <div>
        <h1 className="text-3xl font-black">Misiones</h1>
        <p className="text-sm text-muted-foreground">
          Sumá puntos, escalá el ranking, desbloqueá tu QR.
        </p>
      </div>

      {mode !== "user" && <p className="text-xs text-muted-foreground">Modo invitado · jugá de práctica; creá una cuenta para sumar al ranking.</p>}
      {/* Streak card */}
      <section
        className="rounded-3xl p-4 text-primary-foreground"
        style={{ backgroundImage: "var(--gradient-drop)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80">
              Puntos de misiones
            </p>
            <p className="text-2xl font-black">{total} generales</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <span
                key={d}
                className="h-6 w-2 rounded-full bg-background/25"
                style={{ opacity: 0.3 + d * 0.1 }}
              />
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs opacity-90">
          {total > 0
            ? `Ganaste ${total} puntos en misiones verificadas.`
            : "Completá una misión verificable para sumar."}
        </p>
      </section>

      {/* Digital */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Desafíos digitales
          </h2>
        </div>
        <div className="space-y-3">
          {daily.map((m) => (
            <MissionCard
              key={m.title}
              m={m}
              done={m.title in earned}
              onOpen={() => setSelected(m)}
            />
          ))}
        </div>
      </section>

      {/* Phygital */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Phygital · Mundo real
          </h2>
        </div>
        <div className="space-y-3">
          {phygital.map((m) => (
            <MissionCard
              key={m.title}
              m={m}
              done={m.title in earned}
              onOpen={() => setSelected(m)}
            />
          ))}
        </div>
      </section>

      <MissionDetail
        mission={selected}
        onClose={() => setSelected(null)}
        earned={selected ? earned[selected.title] : undefined}
        onEarn={() => {}}
      />
    </div>
  );
}

function MissionCard({
  m,
  done,
  onOpen,
}: {
  m: Mission;
  done: boolean;
  onOpen: () => void;
}) {
  const Icon = m.icon;
  return (
    <article className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        {m.cover ? (
          <img decoding="async"
            src={m.cover}
            alt={m.title}
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-xl border border-border object-cover"
          />
        ) : (
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-drop)" }}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            {m.verified ? m.tag : "Próximamente"}
          </p>
          <p className="truncate text-sm font-bold">{m.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{m.desc}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-primary">+{m.pts}</p>
          <p className="text-[9px] uppercase text-muted-foreground">pts</p>
        </div>
      </div>
      {typeof m.progress === "number" && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full"
            style={{ width: `${m.progress}%`, backgroundImage: "var(--gradient-drop)" }}
          />
        </div>
      )}
      <button
        onClick={onOpen}
        className={`mt-3 w-full rounded-xl border py-2 text-xs font-bold transition-colors ${
          done
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-primary/40 text-primary hover:bg-primary/10 active:bg-primary/20"
        }`}
      >
        {done ? "✓ Completada · ver detalle" : m.cta}
      </button>
    </article>
  );
}

function MissionDetail({
  mission,
  onClose,
  earned,
  onEarn,
}: {
  mission: Mission | null;
  onClose: () => void;
  earned?: number;
  onEarn: (m: Mission, pts: number) => void;
}) {
  const Icon = mission?.icon ?? Sparkles;
  const [mode, setMode] = useState<"detail" | "play" | "result">("detail");
  const [result, setResult] = useState(0);

  const close = () => {
    onClose();
    setTimeout(() => {
      setMode("detail");
      setResult(0);
    }, 250);
  };

  return (
    <Drawer open={!!mission} onOpenChange={(o) => !o && close()}>
      <DrawerContent className="max-h-[92vh]">
        {mission && (
          <>
            <DrawerHeader className="text-left">
              <div className="flex items-start gap-3">
                {mission.cover ? (
                  <img loading="lazy" decoding="async"
                    src={mission.cover}
                    alt={mission.title}
                    className="h-12 w-12 shrink-0 rounded-2xl border border-border object-cover"
                  />
                ) : (
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-drop)" }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {mission.verified ? mission.tag : "Próximamente"}
                  </p>
                  <DrawerTitle className="text-lg font-black leading-tight">
                    {mission.title}
                  </DrawerTitle>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-primary">+{mission.pts}</p>
                  <p className="text-[9px] uppercase text-muted-foreground">pts</p>
                </div>
              </div>
              {mode === "detail" && (
                <DrawerDescription className="mt-3 text-sm text-muted-foreground">
                  {mission.detail.intro}
                </DrawerDescription>
              )}
            </DrawerHeader>

            <div className="space-y-5 overflow-y-auto px-4 pb-8">
              {mode === "play" && (
                <MissionGame
                  key={mission.title}
                  kind={mission.game}
                  missionId={mission.id ?? ""}
                  verified={mission.verified ?? false}
                  onFinish={(pts) => {
                    setResult(pts);
                    onEarn(mission, pts);
                    setMode("result");
                  }}
                />
              )}

              {mode === "result" && (
                <div className="space-y-4 py-4 text-center">
                  <div
                    className="mx-auto grid h-20 w-20 place-items-center rounded-full text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-drop)" }}
                  >
                    <Trophy className="h-9 w-9" />
                  </div>
                  <p className="text-2xl font-black">
                    {result > 0 ? `+${result} pts` : "Sin puntos"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {result >= mission.pts
                      ? "Resultado validado y guardado en tu cuenta."
                      : result > 0
                        ? "Resultado validado y guardado en tu cuenta."
                        : "Se te acabaron los intentos. Probá de nuevo mañana."}
                  </p>
                  {result > 0 && (
                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-3 text-left">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        Recompensa
                      </p>
                      <p className="mt-1 text-sm">{mission.detail.reward}</p>
                    </div>
                  )}
                  <button
                    onClick={close}
                    className="w-full rounded-xl py-3 text-sm font-black text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-drop)" }}
                  >
                    Volver a misiones
                  </button>
                </div>
              )}

              {mode === "detail" && (
                <>
                  {typeof mission.progress === "number" && (
                    <div>
                      <div className="mb-1 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        <span>Tu progreso</span>
                        <span className="text-primary">{mission.progress}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${mission.progress}%`,
                            backgroundImage: "var(--gradient-drop)",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <InfoTile icon={Clock} label="Tiempo" value={mission.detail.duration} />
                    <InfoTile icon={Users} label="Participación" value={mission.detail.players} />
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Cómo se juega
                    </h3>
                    <ol className="space-y-2">
                      {mission.detail.steps.map((s, i) => (
                        <li key={s} className="flex gap-3 text-sm">
                          <span
                            className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-black text-primary-foreground"
                            style={{ backgroundImage: "var(--gradient-drop)" }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="rounded-2xl border border-primary/30 bg-primary/5 p-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        Recompensa
                      </p>
                    </div>
                    <p className="mt-1 text-sm">{mission.detail.reward}</p>
                  </div>

                  <p className="text-xs italic text-muted-foreground">💡 {mission.detail.tip}</p>

                  {typeof earned === "number" ? (
                    <div className="rounded-xl border border-primary/40 bg-primary/10 py-3 text-center text-sm font-bold text-primary">
                      Ya completaste esta misión · +{earned} pts
                    </div>
                  ) : (
                    <button
                      onClick={() => setMode("play")}
                      className="w-full rounded-xl py-3 text-sm font-black text-primary-foreground"
                      style={{ backgroundImage: "var(--gradient-drop)" }}
                    >
                      {mission.cta}
                    </button>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}


function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <p className="text-[9px] font-bold uppercase tracking-wider">{label}</p>
      </div>
      <p className="mt-1 text-xs font-semibold leading-snug">{value}</p>
    </div>
  );
}
