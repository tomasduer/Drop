import { useCurrentDrop, useCurrentDropId } from "@/lib/drops";
import { Crown, Medal, Users, Flame, MapPin, Zap, UserPlus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getRanking, followFan } from "@/lib/drop.functions";
import { useDropAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";
import type { RankingFan, RankingResult } from "@/lib/drop-data";
import { avatarFor } from "@/lib/fan-avatars";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
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
            <p className="text-[11px] text-muted-foreground">
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
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-black text-primary-foreground">
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
                  <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-[11px] uppercase text-primary-foreground">
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
            <span className="block text-xs text-muted-foreground">
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
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
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
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function LiveRanking() {
  const { mode, revision, profile }=useDropAuth();
  const dropId=useCurrentDropId(); const drop=useCurrentDrop();
  const fetchRanking=useServerFn(getRanking); const follow=useServerFn(followFan);
  const [scope,setScope]=useState<Scope>('Global'); const [data,setData]=useState<RankingResult|null>(null); const [fan,setFan]=useState<RankingFan|null>(null); const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  async function load(){setLoading(true);setError('');try{if(mode==='user'){setData(await fetchRanking({data:{campaign:dropId,scope}}));}else{const {data:pub,error:e}=await (supabase.rpc as unknown as (fn:string,args:Record<string,string>)=>Promise<{data:unknown;error:unknown}>)('drop_public_ranking',{p_campaign:dropId});if(e)throw new Error('No pudimos cargar el ranking');setData(pub as RankingResult);}}catch(e){setError(e instanceof Error?e.message:'No pudimos cargar el ranking');}finally{setLoading(false);}}
  useEffect(()=>{if(mode==='user'||scope==='Global')void load();else setData(null);},[mode,scope,dropId,revision]);
  const archived = drop.status === 'archived';
  const rows = data?.rows ?? [];
  const podium = [rows[1], rows[0], rows[2]].map((f, i) => f && { f, place: [2, 1, 3][i] });
  const me = data?.me ?? null;
  const meInList = !!me && rows.slice(3).some((r) => r.id === me.id);
  const prize = drop.prizes?.[0];
  const pts = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const avatar = (f: RankingFan) => f.avatar_url || avatarFor(f.display_name);
  return <div className="px-5">
    {/* Portada del drop con el título del ranking */}
    <div className="relative -mx-5 -mt-2 overflow-hidden px-5 pb-1 pt-24">
      <img src={drop.hero} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" />
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--background) 45%, transparent) 45%, var(--background) 100%)' }} />
      <div className="absolute inset-0 bg-primary/15 mix-blend-color" />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">{drop.title} · Ranking</p>
        <h1 className="font-display text-4xl leading-none">{archived ? 'Ranking final' : drop.fandom ? `Ranking de ${drop.fandom}` : 'Ranking'}</h1>
      </div>
    </div>
    <p className="mt-2 text-sm text-muted-foreground">{archived ? `Así terminó ${drop.title}. Ya no se suman puntos.` : `Puntos de ${drop.artist} · los canjes no cambian tu posición.`}</p>

    <div className="mt-3 flex gap-2">{(['Semanal','Global','Amigos'] as Scope[]).map(s=><button key={s} onClick={()=>setScope(s)} className={'flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-bold transition-colors ' + (scope===s ? 'text-primary-foreground' : 'border border-border text-muted-foreground active:bg-muted')} style={scope===s?{ backgroundImage: 'var(--gradient-drop)' }:undefined}>{s==='Amigos'&&<Users className="h-3.5 w-3.5" />}{s==='Semanal'?'Esta semana':s==='Global'?'General':s}</button>)}</div>
    {scope==='Semanal'&&<p className="mt-2 text-xs text-muted-foreground">Desde el lunes · horario de Buenos Aires</p>}
    {mode!=='user'&&<p className="mt-3 rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">Estás viendo el ranking como invitado. Creá una cuenta para aparecer acá y seguir a otros fans.</p>}

    {mode!=='user'&&scope!=='Global'?<p className="py-6 text-sm text-muted-foreground">Ingresá con tu cuenta para ver tus amigos y el ranking semanal.</p>:loading&&!data?<p className="py-6 text-sm">Cargando ranking…</p>:error?<div role="alert" className="py-6 text-sm">{error} <Button onClick={load} variant="outline" size="sm">Reintentar</Button></div>:<>
      {/* Podio */}
      {rows.length>0&&<div className="mt-4 grid grid-cols-3 items-end gap-2.5">{podium.map((p,i)=>p?<button key={p.f.id} onClick={()=>setFan(p.f)} className="flex min-w-0 flex-col items-center text-center transition-transform active:scale-95">
        <div className="relative">
          <img loading="lazy" decoding="async" src={avatar(p.f)} alt={p.f.display_name} className={'rounded-full border-2 object-cover ' + (p.place===1 ? 'h-[76px] w-[76px] border-primary shadow-[var(--shadow-glow)]' : 'h-[60px] w-[60px] border-border')} />
          {p.place===1&&<Crown className="absolute -top-5 left-1/2 h-6 w-6 -translate-x-1/2 text-primary" />}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2 text-[11px] font-black text-primary-foreground">{p.place}</span>
        </div>
        <span className="mt-3 w-full truncate text-[13px] font-bold">{p.f.display_name}</span>
        <span className="text-xs text-muted-foreground">{pts(p.f.score)} pts</span>
        <span className={'font-display mt-2 grid w-full place-items-center rounded-t-xl text-2xl text-primary ' + (p.place===1 ? 'h-16' : p.place===2 ? 'h-11' : 'h-8')} style={{ backgroundImage: 'linear-gradient(to bottom, color-mix(in oklab, var(--primary) 28%, transparent), color-mix(in oklab, var(--primary) 4%, transparent))' }}>{p.place}</span>
      </button>:<div key={i} />)}</div>}

      {/* Resto de la tabla */}
      {rows.length>3&&<div className="overflow-hidden rounded-2xl border border-border bg-card">{rows.slice(3).map((f,i)=><button key={f.id} onClick={()=>setFan(f)} className={'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors active:bg-muted ' + (i>0 ? 'border-t border-border/60 ' : '') + (me&&f.id===me.id ? 'bg-primary/10' : '')}>
        <span className="w-6 font-bold text-muted-foreground">{f.rank}</span>
        <img loading="lazy" decoding="async" src={avatar(f)} alt="" className="h-8 w-8 rounded-full object-cover" />
        <span className="min-w-0 flex-1 truncate font-semibold">{f.display_name}{me&&f.id===me.id&&<span className="ml-1 text-primary">· Vos</span>}</span>
        <span className="font-black">{pts(f.score)}</span>
      </button>)}</div>}

      {/* Tu posición */}
      {me&&!meInList&&me.rank>3&&<button onClick={()=>setFan(me)} className="mt-2.5 flex w-full items-center gap-3 rounded-2xl border border-primary bg-primary/15 px-4 py-2.5 text-left text-sm">
        <span className="w-6 font-bold text-primary">{me.rank}</span>
        <img loading="lazy" decoding="async" src={avatar(me)} alt="" className="h-8 w-8 rounded-full object-cover" />
        <span className="min-w-0 flex-1 truncate font-semibold">Vos · {me.display_name}</span>
        <span className="font-black">{pts(me.score)}</span>
      </button>}
      {me&&drop.status==='active'&&(()=>{const above=rows.filter(r=>r.score>me.score).at(-1);return above?<p className="mt-2 text-xs text-muted-foreground">Te faltan {pts(above.score-me.score+1)} pts para pasar a {above.display_name} (#{above.rank}). Completá misiones para subir.</p>:null;})()}
      {data&&!me&&mode==='user'&&drop.status==='active'&&<p className="mt-3 rounded-xl border border-dashed border-border p-3 text-xs text-muted-foreground">Todavía no sumaste puntos en este drop. Completá tu primera misión para aparecer en el ranking.</p>}
      {scope==='Amigos'&&rows.length===1&&<p className="mt-2 text-xs text-muted-foreground">Todavía no seguís participantes de esta campaña.</p>}

      {/* Premio */}
      {prize&&<div className="mt-3 flex items-center gap-3 rounded-2xl p-3 text-xs leading-snug" style={{ backgroundImage: 'var(--gradient-drop-soft)' }}>
        <img loading="lazy" decoding="async" src={drop.album} alt="" className="h-11 w-11 shrink-0 rounded-lg object-cover" />
        <span><span className="block text-[13px] font-bold">Top {prize.top}: {prize.label}</span>{drop.prizes!.slice(1).map(p=>`Top ${p.top}: ${p.label}`).join(' · ')}</span>
      </div>}
    </>}
    <Drawer open={!!fan} onOpenChange={o=>{if(!o)setFan(null);}}><DrawerContent><DrawerHeader><DrawerTitle>{fan?.display_name}</DrawerTitle><DrawerDescription>#{fan?.rank} · {fan?.score} pts de campaña</DrawerDescription></DrawerHeader><div className="space-y-3 px-4 pb-8"><p className="text-sm">{fan?.missions} misiones completadas</p>{fan&&fan.id!==profile.id&&mode==='user'&&<Button className="w-full" onClick={async()=>{try{await follow({data:{id:fan.id,follow:!fan.following}});setFan({...fan,following:!fan.following});await load();}catch(e){toast.error(e instanceof Error?e.message:'No pudimos guardar');}}}><UserPlus className="h-4 w-4" />{fan.following?'Dejar de seguir':'Seguir fan'}</Button>}</div></DrawerContent></Drawer>
  </div>;
}
