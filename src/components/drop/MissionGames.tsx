import { canSaveToLibrary, connectSpotify, disconnectSpotify, findAlbum, isAlbumSaved, isSpotifyConnected, recentPlays, saveAlbum, type SpotifyAlbum } from "@/lib/spotify";
import { useCurrentDrop } from "@/lib/drops";
import { useEffect, useRef, useState } from "react";
import { searchCatalog } from "@/lib/music.functions";
import { useServerFn } from "@tanstack/react-start";
import { Headphones, ScanLine, Sparkles, ArrowUp, ArrowDown, Play, Pause, Check, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { missionAction } from "@/lib/drop.functions";
import type { AttemptResult } from "@/lib/drop-data";
import { useDropAuth } from "./AuthProvider";
import fanaticoSingle from "@/assets/fanatico-single.png.asset.json";
import albumCover from "@/assets/album-cover.png.asset.json";
import { toast } from "sonner";
import { guestQuestions, guestPracticeResult } from "@/lib/guest-practice";
import { PHOTOS } from "@/lib/fan-avatars";
import logo from "@/assets/drop-logo-2026.webp.asset.json";
import stencilWall from "@/assets/stencil-wall.png.asset.json";

export type GameKind = "trivia" | "order" | "stream" | "scan" | "ar" | "clue";
export function MissionGame({ kind, missionId, verified, onFinish }: { kind: GameKind; missionId: string; verified: boolean; onFinish: (p: number) => void }) {
  const { mode, refresh } = useDropAuth();
  const drop = useCurrentDrop();
  // Pre-guardado en un drop que todavía no abrió: se guarda en Spotify, los puntos llegan cuando abra.
  if (missionId.endsWith('-presave') && drop.status !== 'active') return <PresaveMission onDone={() => toast.success(drop.status === 'upcoming' ? '¡Pre-guardado! Tus puntos se suman cuando abra el drop.' : '¡Guardado en tu Spotify!')} />;
  if (verified && mode === 'user') return <VerifiedGame missionId={missionId} kind={kind} onFinish={async (result) => { await refresh(); onFinish(result.general_award); }} />;
  if (kind === 'trivia' && mode === 'guest') return <GuestTrivia />;
  if (kind === 'order') return <OrderDemo />;
  if (kind === 'stream' || kind === 'scan' || kind === 'ar') return <div className="space-y-3"><SimulatedExperience kind={kind} missionId={missionId} onDone={() => toast.success(mode === 'user' ? '¡Completado!' : '¡Completado! En modo invitado los puntos no se guardan.')} />{mode !== 'user' && <p className="text-center text-xs text-muted-foreground">Modo invitado: creá una cuenta para sumar estos puntos al ranking.</p>}</div>;
  return <div className="space-y-4 text-center">
    <img decoding="async" src={albumCover.url} alt="Arte de la experiencia" className="mx-auto h-24 w-24 rounded-2xl object-cover" />
    <Headphones className="mx-auto h-10 w-10 text-primary" />
    <p className="font-bold">{mode !== 'user' ? 'Ingresá con tu cuenta para jugar esta misión' : 'Esta misión se habilita pronto'}</p>
    <p className="text-sm text-muted-foreground">{mode !== 'user' ? 'Los acertijos guardan tu progreso, por eso necesitan una cuenta.' : 'Te avisamos cuando esté disponible.'}</p>
  </div>;
}
function GuestTrivia() {
  const [answers, setAnswers] = useState<number[]>([]);
  const question = guestQuestions[answers.length];
  const result = guestPracticeResult(answers);
  return <div className="space-y-4">
    <p className="text-sm font-bold">Trivia de práctica · sin puntos ni ranking</p>
    {question ? <>
      <p className="text-xs text-muted-foreground">Pregunta {answers.length + 1} / {guestQuestions.length}</p>
      <p className="font-bold">{question.question}</p>
      {question.options.map((option, index) => <Button key={option} variant="outline" className="h-auto w-full justify-start whitespace-normal py-3 text-left" onClick={() => setAnswers(previous => [...previous, index])}>{option}</Button>)}
    </> : <>
      <p role="status" className="font-bold">Resultado: {result.correct} / {result.total} respuestas correctas</p>
      <Button className="w-full" onClick={() => setAnswers([])}>Volver a jugar</Button>
    </>}
  </div>;
}
function VerifiedGame({ missionId, kind, onFinish }: { missionId: string; kind: GameKind; onFinish: (r: AttemptResult) => Promise<void> }) {
  const action = useServerFn(missionAction);
  const [attempt, setAttempt] = useState<AttemptResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(20);
  const [code, setCode] = useState('');
  const [sequence, setSequence] = useState([2,4,1,3]);
  async function send(type: 'start' | 'answer' | 'check', payload: Record<string,string|number|number[]>) {
    setBusy(true); setError('');
    try { const result = await action({ data: { action: type, payload } }); setAttempt(result); if (result.status === 'completed') await onFinish(result); }
    catch (e) { setError(e instanceof Error ? e.message : 'No pudimos validar la respuesta.'); }
    finally { setBusy(false); }
  }
  useEffect(() => { void send('start',{ mission_id: missionId }); }, [missionId]);
  useEffect(() => {
    if (!attempt || attempt.status === 'completed') return;
    const update = () => setSeconds(Math.max(0, Math.ceil((new Date(attempt.deadline).getTime()-Date.now())/1000)));
    update(); const timer = setInterval(update,1000); return () => clearInterval(timer);
  }, [attempt]);
  return <div className="space-y-4">
    {error && <div role="alert" className="text-sm text-destructive">{error}<Button variant="outline" onClick={() => send('start',{ mission_id: missionId })}>Retomar intento</Button></div>}
    {!attempt && !error && <p className="text-sm text-muted-foreground">Cargando intento…</p>}
    {attempt?.question && kind === 'trivia' && <><div className="flex justify-between text-xs font-bold text-primary"><span>Pregunta {attempt.index+1} / {attempt.total}</span><span>{seconds}s</span></div><p className="font-bold">{attempt.question.q}</p><div className="space-y-2">{attempt.question.options.map((option,index) => <Button key={option} variant="outline" disabled={busy} className="h-auto w-full justify-start whitespace-normal py-3 text-left" onClick={() => send('answer',{ attempt_id: attempt.id,index: attempt.index,answer: seconds === 0 ? -1 : index })}>{option}</Button>)}</div>{seconds===0 && <p className="text-xs text-muted-foreground">Tiempo agotado; la respuesta de esta pregunta no suma.</p>}</>}
    {attempt?.status === 'playing' && kind === 'clue' && <><label className="block text-sm">Código de la pista<input className="mt-2 w-full rounded-lg border border-input bg-background p-3" value={code} onChange={e=>setCode(e.target.value)} /></label><Button disabled={busy || !code.trim()} onClick={()=>send('check',{attempt_id:attempt.id,code})}>Verificar pista</Button></>}
    {attempt?.status === 'playing' && (kind === 'stream' || kind === 'scan' || kind === 'ar') && <SimulatedExperience kind={kind} missionId={missionId} busy={busy} onDone={() => send('check',{ attempt_id: attempt.id })} />}
    {attempt?.status === 'playing' && kind === 'order' && <>{sequence.map((id,i)=><div key={id} className="flex justify-between rounded-xl border border-border p-3"><span>Fragmento {id}</span><Button variant="outline" size="icon" aria-label="Subir fragmento" disabled={busy || i===0} onClick={()=>setSequence(s=>{const n=[...s];[n[i],n[i-1]]=[n[i-1],n[i]];return n;})}><ArrowUp /></Button></div>)}<Button disabled={busy} onClick={()=>send('check',{attempt_id:attempt.id,sequence})}>Confirmar orden</Button></>}
    {busy && <p className="text-xs text-muted-foreground">Validando…</p>}
  </div>;
}
function OrderDemo() {
  const [order,setOrder]=useState([2,4,1,3]);
  return <div className="space-y-3"><p className="text-sm font-bold">Ordená los fragmentos · práctica</p>{order.map((id,index)=><div key={id} className="flex items-center gap-3 rounded-xl border border-border p-3"><span className="flex-1">Fragmento {id}</span>{([-1,1] as const).map(dir=><Button key={dir} size="icon" variant="outline" aria-label={dir===-1?'Subir':'Bajar'} disabled={index+dir<0||index+dir>=order.length} onClick={()=>setOrder(s=>{const n=[...s];[n[index],n[index+dir]]=[n[index+dir],n[index]];return n;})}>{dir===-1?<ArrowUp />:<ArrowDown />}</Button>)}</div>)}<Button className="w-full" onClick={()=>toast.message(order.every((id,i)=>id===i+1)?'Orden correcto · práctica sin puntos':'Probá otra secuencia')}>Confirmar orden</Button></div>;
}

/** Experiencias de streaming, QR y realidad aumentada simuladas dentro de la app. */
function SimulatedExperience({ kind, missionId, busy, onDone }: { kind: 'stream' | 'scan' | 'ar'; missionId?: string; busy?: boolean; onDone: () => void }) {
  if (missionId?.endsWith('-presave')) return <PresaveMission busy={busy} onDone={onDone} />;
  if (kind === 'stream') return <StreamSim busy={busy} onDone={onDone} />;
  if (kind === 'scan') return <ScanSim busy={busy} onDone={onDone} />;
  return <ArSim busy={busy} onDone={onDone} />;
}

function DemoStream({ busy, onDone }: { busy?: boolean; onDone: () => void }) {
  const PLAYS = 3; const SECONDS = 6;
  const [plays, setPlays] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const search = useServerFn(searchCatalog);
  const audio = useRef<HTMLAudioElement | null>(null);
  // Vista previa real de "Fanático" mientras dura la simulación.
  useEffect(() => {
    search({ data: { q: 'LALI Fanático' } }).then((r) => { const t = r.tracks.find((x) => /fan[aá]tico/i.test(x.title)) ?? r.tracks[0]; if (t?.preview) audio.current = new Audio(t.preview); }).catch(() => {});
    return () => { audio.current?.pause(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const el = audio.current;
    if (el) { if (playing) { el.currentTime = 0; void el.play().catch(() => {}); } else el.pause(); }
  }, [playing]);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setProgress(p => {
      const next = p + 100 / (SECONDS * 10);
      if (next >= 100) { setPlaying(false); setPlays(n => n + 1); return 0; }
      return next;
    }), 100);
    return () => clearInterval(timer);
  }, [playing]);
  const done = plays >= PLAYS;
  return <div className="space-y-4 text-center">
    <img decoding="async" src={fanaticoSingle.url} alt="Portada de Fanático" className={`mx-auto h-40 w-40 rounded-2xl object-cover shadow-lg transition-transform ${playing ? 'scale-105' : ''}`} />
    <div><p className="font-black">Fanático</p><p className="text-xs text-muted-foreground">LALI · No vayas a atender cuando el demonio llama</p></div>
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width] duration-100" style={{ width: `${done ? 100 : progress}%` }} /></div>
    <div className="flex justify-center gap-2">{Array.from({ length: PLAYS }, (_, i) => <span key={i} className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-bold ${i < plays ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}>{i < plays ? <Check className="h-4 w-4" /> : i + 1}</span>)}</div>
    <p className="text-sm text-muted-foreground">{done ? '¡Listo! Escuchaste Fanático 3 veces.' : `Reproducción ${Math.min(plays + 1, PLAYS)} de ${PLAYS}`}</p>
    {done
      ? <Button className="w-full" disabled={busy} onClick={onDone}>Sumar mis puntos</Button>
      : <Button className="w-full" onClick={() => setPlaying(p => !p)}>{playing ? <><Pause /> Pausar</> : <><Play /> Reproducir</>}</Button>}
  </div>;
}

/** Misión de escucha: con Spotify conectado cuenta las reproducciones reales; si no, ofrece la demo. */
function StreamSim({ busy, onDone }: { busy?: boolean; onDone: () => void }) {
  const [connected, setConnected] = useState(false);
  const [demo, setDemo] = useState(false);
  useEffect(() => {
    const sync = () => setConnected(isSpotifyConnected());
    sync();
    window.addEventListener("drop-spotify", sync);
    return () => window.removeEventListener("drop-spotify", sync);
  }, []);
  if (demo) return <div className="space-y-3"><DemoStream busy={busy} onDone={onDone} /><button type="button" onClick={() => setDemo(false)} className="w-full text-center text-xs font-bold text-muted-foreground">Volver a Spotify</button></div>;
  if (connected) return <SpotifyStream busy={busy} onDone={onDone} />;
  return <div className="space-y-4 text-center">
    <img decoding="async" src={fanaticoSingle.url} alt="Portada de Fanático" className="mx-auto h-40 w-40 rounded-2xl object-cover shadow-lg" />
    <div><p className="font-black">Escuchá "Fanático" 3 veces</p><p className="text-xs text-muted-foreground">Conectá tu Spotify y contamos tus reproducciones de verdad.</p></div>
    <Button className="w-full bg-[#1DB954] text-black hover:bg-[#1ed760]" onClick={() => void connectSpotify(window.location.pathname + window.location.search)}>Conectar Spotify</Button>
    <button type="button" onClick={() => setDemo(true)} className="text-xs font-bold text-muted-foreground underline-offset-2 hover:underline">Probar en modo demo</button>
  </div>;
}

function SpotifyStream({ busy, onDone }: { busy?: boolean; onDone: () => void }) {
  const PLAYS = 3;
  const [plays, setPlays] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const check = async () => {
    setLoading(true); setError(null);
    try {
      const since = Date.now() - 24 * 3600 * 1000;
      const list = await recentPlays();
      setPlays(list.filter((p) => /fan[aá]tico/i.test(p.name) && p.artists.some((a) => /lali/i.test(a)) && new Date(p.playedAt).getTime() >= since).length);
    } catch (e) { setError(e instanceof Error ? e.message : "No pudimos leer tu Spotify."); }
    finally { setLoading(false); }
  };
  useEffect(() => {
    void check();
    const onFocus = () => void check();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const count = Math.min(plays ?? 0, PLAYS);
  const done = count >= PLAYS;
  return <div className="space-y-4 text-center">
    <img decoding="async" src={fanaticoSingle.url} alt="Portada de Fanático" className="mx-auto h-40 w-40 rounded-2xl object-cover shadow-lg" />
    <div><p className="font-black">Fanático</p><p className="text-xs text-muted-foreground">Contamos tus reproducciones en Spotify de las últimas 24 horas</p></div>
    <div className="flex justify-center gap-2">{Array.from({ length: PLAYS }, (_, i) => <span key={i} className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-bold ${i < count ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}>{i < count ? <Check className="h-4 w-4" /> : i + 1}</span>)}</div>
    {error ? <p className="text-sm text-destructive">{error}</p> : <p className="text-sm text-muted-foreground">{plays === null ? 'Revisando tu Spotify…' : done ? '¡Listo! Spotify confirma tus 3 reproducciones.' : `Llevás ${count} de ${PLAYS}. Escuchala completa y volvé.`}</p>}
    {done
      ? <Button className="w-full" disabled={busy} onClick={onDone}>Sumar mis puntos</Button>
      : <div className="grid grid-cols-2 gap-2">
          <Button asChild className="bg-[#1DB954] text-black hover:bg-[#1ed760]"><a href="https://open.spotify.com/search/LALI%20Fan%C3%A1tico" target="_blank" rel="noreferrer"><Play /> Abrir Spotify</a></Button>
          <Button variant="outline" disabled={loading} onClick={() => void check()}>{loading ? 'Revisando…' : 'Actualizar'}</Button>
        </div>}
    <button type="button" onClick={() => disconnectSpotify()} className="text-[11px] text-muted-foreground underline-offset-2 hover:underline">Desconectar Spotify</button>
  </div>;
}

/** Misión: pre-guardar (o guardar, si ya salió) el álbum del drop en la biblioteca de Spotify del fan. */
function PresaveMission({ busy, onDone }: { busy?: boolean; onDone: () => void }) {
  const drop = useCurrentDrop();
  const albumName = drop.spotifyAlbum ?? drop.title;
  const presaveKey = `drop-presave-${drop.id}`;
  const [connected, setConnected] = useState(false);
  const [scoped, setScoped] = useState(false);
  const [album, setAlbum] = useState<SpotifyAlbum | null | undefined>(undefined);
  const [saved, setSaved] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => { setConnected(isSpotifyConnected()); setScoped(canSaveToLibrary()); };
    sync();
    window.addEventListener('drop-spotify', sync);
    return () => window.removeEventListener('drop-spotify', sync);
  }, []);
  useEffect(() => {
    if (!connected || !scoped) return;
    let cancelled = false;
    (async () => {
      try {
        const found = await findAlbum(drop.artist, albumName);
        if (cancelled) return;
        setAlbum(found);
        if (found) setSaved(await isAlbumSaved(found.id));
        else { try { setSaved(localStorage.getItem(presaveKey) === '1'); } catch { /* sin almacenamiento */ } }
      } catch (e) { if (!cancelled) setError(e instanceof Error ? e.message : 'No pudimos conectar con Spotify.'); }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, scoped, drop.id]);

  const save = async () => {
    setWorking(true); setError(null);
    try {
      if (album) {
        await saveAlbum(album.id);
        if (!(await isAlbumSaved(album.id))) throw new Error('Spotify no confirmó el guardado. Probá de nuevo.');
      } else {
        try { localStorage.setItem(presaveKey, '1'); } catch { /* sin almacenamiento */ }
      }
      setSaved(true);
    } catch (e) { setError(e instanceof Error ? e.message : 'No pudimos guardar el álbum.'); }
    finally { setWorking(false); }
  };

  const reconnect = () => void connectSpotify(window.location.pathname + window.location.search);
  const cover = album?.cover || drop.album;
  return <div className="space-y-4 text-center">
    <img decoding="async" src={cover} alt={`Portada de ${albumName}`} className="mx-auto h-40 w-40 rounded-2xl object-cover shadow-lg" />
    <div><p className="font-black">{albumName}</p><p className="text-xs text-muted-foreground">{drop.artist}</p></div>
    {!connected ? <>
      <p className="text-sm text-muted-foreground">Conectá tu Spotify y {drop.status === 'upcoming' ? 'pre-guardá el álbum para tenerlo apenas salga' : 'guardá el álbum en tu biblioteca'}.</p>
      <Button className="w-full bg-[#1DB954] text-black hover:bg-[#1ed760]" onClick={reconnect}>Conectar Spotify</Button>
    </> : !scoped ? <>
      <p className="text-sm text-muted-foreground">Para guardar el álbum, DROP necesita un permiso nuevo en tu Spotify.</p>
      <Button className="w-full bg-[#1DB954] text-black hover:bg-[#1ed760]" onClick={reconnect}>Dar permiso en Spotify</Button>
    </> : album === undefined && !error ? <p className="text-sm text-muted-foreground">Buscando el álbum en Spotify…</p>
    : saved ? <>
      <p className="flex items-center justify-center gap-1 text-sm font-bold text-primary"><Check className="h-4 w-4" />{album ? 'Ya está en tu biblioteca de Spotify' : 'Pre-guardado: lo vas a tener apenas salga'}</p>
      {album?.url && <a href={album.url} target="_blank" rel="noreferrer" className="block text-xs font-bold text-muted-foreground underline-offset-2 hover:underline">Abrir en Spotify</a>}
      <Button className="w-full" disabled={busy} onClick={onDone}>Sumar mis puntos</Button>
    </> : <>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button className="w-full bg-[#1DB954] text-black hover:bg-[#1ed760]" disabled={working} onClick={() => void save()}>{working ? 'Guardando…' : album ? 'Guardar en mi Spotify' : 'Pre-guardar en Spotify'}</Button>
    </>}
  </div>;
}

function ScanSim({ busy, onDone }: { busy?: boolean; onDone: () => void }) {
  const spots = ['Plaza Serrano', 'Honduras y Thames', 'Gurruchaga y El Salvador'];
  const [found, setFound] = useState(0);
  const [scanning, setScanning] = useState(false);
  function scan() { setScanning(true); setTimeout(() => { setScanning(false); setFound(n => n + 1); toast.success(`QR detectado en ${spots[found]}`); }, 1800); }
  const done = found >= spots.length;
  return <div className="space-y-4">
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl bg-black">
      <img decoding="async" src={found % 2 ? stencilWall.url : PHOTOS.estadio} alt="Vista de la cámara" className="h-full w-full object-cover opacity-80" />
      <div className="absolute inset-8 rounded-xl border-2 border-white/80" />
      {scanning && <div className="absolute inset-x-8 top-8 h-0.5 animate-[scan_1.8s_ease-in-out_infinite] bg-primary shadow-[0_0_12px_var(--primary)]" />}
      <p className="absolute inset-x-0 bottom-2 text-center text-xs font-bold text-white">{done ? '¡Encontraste los 3 afiches!' : scanning ? 'Buscando código…' : 'Apuntá al QR del afiche'}</p>
    </div>
    <div className="space-y-2">{spots.map((s, i) => <div key={s} className="flex items-center gap-2 text-sm"><span className={`grid h-6 w-6 place-items-center rounded-full border text-[11px] ${i < found ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}>{i < found ? <Check className="h-3 w-3" /> : i + 1}</span><span className={i < found ? 'font-bold' : 'text-muted-foreground'}>{s}</span></div>)}</div>
    {done
      ? <Button className="w-full" disabled={busy} onClick={onDone}>Sumar mis puntos</Button>
      : <Button className="w-full" disabled={scanning} onClick={scan}><ScanLine /> {scanning ? 'Escaneando…' : `Escanear afiche ${found + 1}`}</Button>}
  </div>;
}

function ArSim({ busy, onDone }: { busy?: boolean; onDone: () => void }) {
  const [stage, setStage] = useState<'idle' | 'camera' | 'hologram' | 'captured'>('idle');
  useEffect(() => { if (stage === 'camera') { const t = setTimeout(() => setStage('hologram'), 2200); return () => clearTimeout(t); } }, [stage]);
  return <div className="space-y-4">
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl bg-black">
      <img decoding="async" src={PHOTOS.rain} alt="Vista de la cámara" className={`h-full w-full object-cover transition-opacity ${stage === 'idle' ? 'opacity-40' : 'opacity-90'}`} />
      {(stage === 'hologram' || stage === 'captured') && <img decoding="async" src={logo.url} alt="Holograma del drop" className="absolute left-1/2 top-[18%] w-2/3 -translate-x-1/2 animate-pulse" />}
      {stage === 'captured' && <div className="absolute inset-0 animate-[flash_0.5s_ease-out] bg-white/0" />}
      <p className="absolute inset-x-0 bottom-2 text-center text-xs font-bold text-white">{stage === 'idle' ? 'Obelisco · 20:30 hs' : stage === 'camera' ? 'Apuntá al cielo…' : stage === 'hologram' ? '¡Apareció el holograma!' : 'Captura guardada en tu Pasaporte'}</p>
    </div>
    {stage === 'idle' && <Button className="w-full" onClick={() => setStage('camera')}><Camera /> Abrir cámara</Button>}
    {stage === 'camera' && <Button className="w-full" disabled>Buscando el holograma…</Button>}
    {stage === 'hologram' && <Button className="w-full" onClick={() => setStage('captured')}><Sparkles /> Capturar</Button>}
    {stage === 'captured' && <Button className="w-full" disabled={busy} onClick={onDone}>Sumar mis puntos</Button>}
  </div>;
}
