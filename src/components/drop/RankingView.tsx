import { Crown, Medal, Users, Flame, MapPin, Zap, UserPlus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getRanking, followFan } from "@/lib/drop.functions";
import { useDropAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";
import type { RankingFan, RankingResult } from "@/lib/drop-data";
import { avatarFor } from "@/lib/fan-avatars";
import { toast } from "sonner";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type Scope = "Global" | "Amigos" | "Semanal";

type Fan = {
  id?: string;
  rank: number;
  name: string;
  pts: number;
  you?: boolean;
  city: string;
  streak: number;
  missions: number;
  badge: string;
};

const DATA: Record<Scope, Fan[]> = {
  Global: [
    { rank: 1, name: "lalilover", pts: 8420, city: "CABA", streak: 21, missions: 46, badge: "Fanático Supremo" },
    { rank: 2, name: "lalisters", pts: 7980, city: "Rosario", streak: 18, missions: 43, badge: "Cazadora de QR" },
    { rank: 3, name: "no_atiendo", pts: 7610, city: "CABA", streak: 15, missions: 41, badge: "Oído absoluto" },
    { rank: 4, name: "disciplina.mb", pts: 6890, city: "Córdoba", streak: 12, missions: 38, badge: "Trivia Master" },
    { rank: 5, name: "motiveta", pts: 6210, city: "La Plata", streak: 11, missions: 35, badge: "Constante" },
    { rank: 6, name: "lalimania", pts: 5980, city: "Mendoza", streak: 9, missions: 33, badge: "Coleccionista" },
    { rank: 47, name: "sofi.drops", pts: 2480, you: true, city: "CABA", streak: 7, missions: 14, badge: "En ascenso" },
    { rank: 48, name: "esperandolali", pts: 2410, city: "Salta", streak: 6, missions: 13, badge: "Novata" },
    { rank: 49, name: "diva.tour", pts: 2380, city: "CABA", streak: 5, missions: 13, badge: "Novata" },
  ],
  Amigos: [
    { rank: 1, name: "no_atiendo", pts: 7610, city: "CABA", streak: 15, missions: 41, badge: "Oído absoluto" },
    { rank: 2, name: "motiveta", pts: 6210, city: "La Plata", streak: 11, missions: 35, badge: "Constante" },
    { rank: 3, name: "juanchi.lali", pts: 3120, city: "CABA", streak: 8, missions: 19, badge: "Fiel" },
    { rank: 4, name: "sofi.drops", pts: 2480, you: true, city: "CABA", streak: 7, missions: 14, badge: "En ascenso" },
    { rank: 5, name: "cami.b", pts: 1980, city: "Quilmes", streak: 4, missions: 11, badge: "Novata" },
    { rank: 6, name: "tomi_ok", pts: 1240, city: "CABA", streak: 2, missions: 7, badge: "Curioso" },
  ],
  Semanal: [
    { rank: 1, name: "motiveta", pts: 1420, city: "La Plata", streak: 11, missions: 9, badge: "Racha caliente" },
    { rank: 2, name: "sofi.drops", pts: 1180, you: true, city: "CABA", streak: 7, missions: 8, badge: "En ascenso" },
    { rank: 3, name: "lalisters", pts: 1120, city: "Rosario", streak: 18, missions: 8, badge: "Cazadora de QR" },
    { rank: 4, name: "diva.tour", pts: 940, city: "CABA", streak: 5, missions: 6, badge: "Novata" },
    { rank: 5, name: "lalilover", pts: 870, city: "CABA", streak: 21, missions: 5, badge: "Fanático Supremo" },
    { rank: 6, name: "juanchi.lali", pts: 640, city: "CABA", streak: 8, missions: 4, badge: "Fiel" },
  ],
};

export function RankingView() { return <LiveRanking />; }
function DemoRanking() {
  const [scope, setScope] = useState<Scope>("Global");
  const [fan, setFan] = useState<Fan | null>(null);
  const [following, setFollowing] = useState<string[]>([]);

  const data = DATA[scope];
  const top = data.slice(0, 3);
  const list = data.slice(3);
  const me = data.find((f) => f.you);

  return (
    <div className="px-5">
      <div className="mb-4">
        <h1 className="text-3xl font-black">Ranking</h1>
        <p className="text-sm text-muted-foreground">Los top 50 acceden al Listening Party.</p>
      </div>

      <div className="mb-5 flex gap-2">
        {(["Global", "Amigos", "Semanal"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setScope(t)}
            className={
              "flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors " +
              (scope === t
                ? "bg-foreground text-background"
                : "border border-border text-muted-foreground active:bg-muted")
            }
          >
            {t === "Amigos" && <Users className="h-3 w-3" />}
            {t}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="mb-6 grid grid-cols-3 items-end gap-2">
        {[
          { fan: top[1], place: 2, h: "h-24" },
          { fan: top[0], place: 1, h: "h-32" },
          { fan: top[2], place: 3, h: "h-20" },
        ].map((p) => (
          <button
            key={p.fan.name}
            onClick={() => setFan(p.fan)}
            className="flex flex-col items-center transition-transform active:scale-95"
          >
            <div className="relative mb-2">
              <img decoding="async"
                src={avatarFor(p.fan.name)}
                alt={p.fan.name}
                loading="lazy"
                className="h-14 w-14 rounded-full border-2 border-primary/50 object-cover"
              />
              {p.place === 1 && (
                <Crown className="absolute -top-4 left-1/2 h-6 w-6 -translate-x-1/2 text-primary" />
              )}
            </div>
            <p className="max-w-[90px] truncate text-xs font-semibold">@{p.fan.name}</p>
            <p className="text-[10px] text-muted-foreground">
              {p.fan.pts.toLocaleString("es")} pts
            </p>
            <div
              className={
                "mt-2 w-full rounded-t-2xl border border-b-0 border-border bg-card " + p.h
              }
            >
              <p className="pt-3 text-center text-2xl font-black text-primary">{p.place}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Cut line */}
      {scope === "Global" && (
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
            50
          </span>
          <p className="flex-1 text-xs font-medium">
            Corte de acceso al evento · te faltan{" "}
            <span className="font-black text-primary">3 posiciones</span>
          </p>
        </div>
      )}

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {list.map((u, i) => (
          <button
            key={u.rank}
            onClick={() => setFan(u)}
            className={
              "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors active:bg-muted " +
              (i !== list.length - 1 ? "border-b border-border " : "") +
              (u.you ? "bg-primary/10" : "")
            }
          >
            <span className="w-8 text-center text-sm font-bold text-muted-foreground">
              {u.rank}
            </span>
            <img decoding="async"
              src={avatarFor(u.name)}
              alt={u.name}
              loading="lazy"
              className="h-10 w-10 rounded-full border border-border object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                @{u.name}{" "}
                {u.you && (
                  <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-[9px] uppercase text-primary-foreground">
                    Vos
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">{u.pts.toLocaleString("es")} pts</p>
            </div>
            {u.rank <= 3 && <Medal className="h-4 w-4 text-primary" />}
          </button>
        ))}
      </div>

      {/* Sticky my position */}
      {me && (
        <button
          onClick={() => setFan(me)}
          className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-primary/40 bg-primary/5 p-3 text-left"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-black text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-drop)" }}>
            {me.rank}
          </span>
          <span className="flex-1">
            <span className="block text-sm font-bold">Tu posición</span>
            <span className="block text-[11px] text-muted-foreground">
              {me.pts.toLocaleString("es")} pts · racha de {me.streak} días
            </span>
          </span>
          <span className="text-xs font-bold text-primary">Ver perfil →</span>
        </button>
      )}

      <FanSheet
        fan={fan}
        onClose={() => setFan(null)}
        following={following}
        onToggleFollow={(name) => {
          setFollowing((f) => {
            const next = f.includes(name) ? f.filter((n) => n !== name) : [...f, name];
            toast(next.includes(name) ? `Ahora seguís a @${name}` : `Dejaste de seguir a @${name}`);
            return next;
          });
        }}
      />
    </div>
  );
}

function FanSheet({
  fan,
  onClose,
  following,
  onToggleFollow,
}: {
  fan: Fan | null;
  onClose: () => void;
  following: string[];
  onToggleFollow: (name: string) => void;
}) {
  return (
    <Drawer open={!!fan} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        {fan && (
          <>
            <DrawerHeader className="text-left">
              <div className="flex items-center gap-3">
                <img loading="lazy" decoding="async"
                  src={avatarFor(fan.name)}
                  alt={fan.name}
                  className="h-14 w-14 rounded-full border-2 border-primary/50 object-cover"
                />
                <div>
                  <DrawerTitle className="text-xl font-black">@{fan.name}</DrawerTitle>
                  <DrawerDescription className="text-xs">
                    #{fan.rank} · {fan.city}
                  </DrawerDescription>
                </div>
              </div>
            </DrawerHeader>
            <div className="space-y-4 px-4 pb-8">
              <div className="grid grid-cols-3 gap-2 text-center">
                <Stat icon={Zap} value={fan.pts.toLocaleString("es")} label="Puntos" />
                <Stat icon={Flame} value={`${fan.streak}d`} label="Racha" />
                <Stat icon={Medal} value={String(fan.missions)} label="Misiones" />
              </div>

              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Insignia
                </p>
                <p className="mt-1 text-sm font-bold">{fan.badge}</p>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3 text-xs text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Participa desde {fan.city} · activo hoy
              </div>

              {!fan.you && (
                <button
                  onClick={() => onToggleFollow(fan.name)}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-black ${
                    following.includes(fan.name)
                      ? "border border-primary/40 text-primary"
                      : "text-primary-foreground"
                  }`}
                  style={
                    following.includes(fan.name)
                      ? undefined
                      : { backgroundImage: "var(--gradient-drop)" }
                  }
                >
                  {following.includes(fan.name) ? (
                    <>
                      <X className="h-4 w-4" /> Dejar de seguir
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" /> Seguir fan
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Zap;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <Icon className="mx-auto h-4 w-4 text-primary" />
      <p className="mt-1 text-base font-black">{value}</p>
      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function LiveRanking() {
  const { mode, profile, revision }=useDropAuth();
  const fetchRanking=useServerFn(getRanking); const follow=useServerFn(followFan);
  const [scope,setScope]=useState<Scope>('Global'); const [data,setData]=useState<RankingResult|null>(null); const [fan,setFan]=useState<RankingFan|null>(null); const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  async function load(){setLoading(true);setError('');try{setData(await fetchRanking({data:{campaign:profile.active_drop,scope}}));}catch(e){setError(e instanceof Error?e.message:'No pudimos cargar el ranking');}finally{setLoading(false);}}
  useEffect(()=>{if(mode==='user')void load();else setData(null);},[mode,scope,profile.active_drop,revision]);
  return <div className="space-y-4 px-5"><h1 className="text-3xl font-black">Ranking</h1><p className="text-sm text-muted-foreground">Puntaje de campaña · los canjes no cambian tu posición.</p><div className="flex gap-2">{(['Global','Amigos','Semanal'] as Scope[]).map(s=><Button key={s} variant={scope===s?'default':'outline'} size="sm" onClick={()=>setScope(s)}>{s==='Amigos'&&<Users className="h-4 w-4" />}{s}</Button>)}</div>{scope==='Semanal'&&<p className="text-xs text-muted-foreground">Desde el lunes · horario de Buenos Aires</p>}
    {mode!=='user'?<p className="py-6 text-sm text-muted-foreground">Ingresá con tu cuenta para participar del ranking real.</p>:loading?<p className="text-sm">Cargando ranking…</p>:error?<div role="alert">{error}<Button onClick={load} variant="outline">Reintentar</Button></div>:<>
    <div className="grid grid-cols-3 items-end gap-2">{data?.rows.slice(0,3).map(f=><Button key={f.id} variant="outline" className="h-auto min-w-0 flex-col gap-2 p-3" onClick={()=>setFan(f)}><img loading="lazy" decoding="async" src={avatarFor(f.display_name)} alt={f.display_name} className="h-12 w-12 rounded-full object-cover" /><span className="w-full truncate text-xs">{f.display_name}</span><span>#{f.rank}</span><span className="text-xs text-primary">{f.score} pts</span></Button>)}</div>
    <div className="divide-y divide-border">{data?.rows.slice(3).map(f=><Button key={f.id} variant="ghost" className="h-auto w-full justify-start gap-3 py-3" onClick={()=>setFan(f)}><span>#{f.rank}</span><img loading="lazy" decoding="async" src={avatarFor(f.display_name)} alt="" className="h-9 w-9 rounded-full object-cover" /><span className="min-w-0 flex-1 truncate text-left">{f.display_name}</span><span>{f.score} pts</span></Button>)}</div>
    {data?.me&&<p className="rounded-xl border border-primary/40 bg-primary/5 p-3 text-sm font-bold">Tu posición: #{data.me.rank} · {data.me.score} pts de campaña</p>}{scope==='Amigos'&&data?.rows.length===1&&<p className="text-xs text-muted-foreground">Todavía no seguís participantes de esta campaña.</p>}</>}
    <Drawer open={!!fan} onOpenChange={o=>{if(!o)setFan(null);}}><DrawerContent><DrawerHeader><DrawerTitle>{fan?.display_name}</DrawerTitle><DrawerDescription>#{fan?.rank} · {fan?.score} pts de campaña</DrawerDescription></DrawerHeader><div className="space-y-3 px-4 pb-8"><p className="text-sm">{fan?.missions} misiones completadas</p>{fan&&fan.id!==profile.id&&<Button className="w-full" onClick={async()=>{try{await follow({data:{id:fan.id,follow:!fan.following}});setFan({...fan,following:!fan.following});await load();}catch(e){toast.error(e instanceof Error?e.message:'No pudimos guardar');}}}><UserPlus className="h-4 w-4" />{fan.following?'Dejar de seguir':'Seguir fan'}</Button>}</div></DrawerContent></Drawer>
  </div>;
}
