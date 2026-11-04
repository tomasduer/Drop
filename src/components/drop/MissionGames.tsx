import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Headphones, ScanLine, Sparkles, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { missionAction } from "@/lib/drop.functions";
import type { AttemptResult } from "@/lib/drop-data";
import { useDropAuth } from "./AuthProvider";
import fanaticoSingle from "@/assets/fanatico-single.png.asset.json";
import albumCover from "@/assets/album-cover.png.asset.json";
import { toast } from "sonner";
import { guestQuestions, guestPracticeResult } from "@/lib/guest-practice";

export type GameKind = "trivia" | "order" | "stream" | "scan" | "ar" | "clue";
export function MissionGame({ kind, missionId, verified, onFinish }: { kind: GameKind; missionId: string; verified: boolean; onFinish: (p: number) => void }) {
  const { mode, refresh } = useDropAuth();
  if (verified && mode === 'user') return <VerifiedGame missionId={missionId} kind={kind} onFinish={async (result) => { await refresh(); onFinish(result.general_award); }} />;
  if (kind === 'trivia' && mode === 'guest') return <GuestTrivia />;
  if (kind === 'order') return <OrderDemo />;
  return <div className="space-y-4 text-center">
    <img decoding="async" src={(kind === 'stream' ? fanaticoSingle : albumCover).url} alt="Arte de la experiencia" className="mx-auto h-24 w-24 rounded-2xl object-cover" />
    {kind === 'scan' ? <ScanLine className="mx-auto h-10 w-10 text-primary" /> : kind === 'ar' ? <Sparkles className="mx-auto h-10 w-10 text-primary" /> : <Headphones className="mx-auto h-10 w-10 text-primary" />}
    <p className="font-bold">{mode !== 'user' && verified ? 'Ingresá con tu cuenta para jugar esta misión' : 'Experiencia demostrativa · sin puntos'}</p>
    <p className="text-sm text-muted-foreground">{kind === 'stream' ? 'Las reproducciones no se verifican en DROP.' : kind === 'scan' ? 'La cámara y la ubicación todavía no están conectadas.' : kind === 'ar' ? 'La captura de realidad aumentada está pendiente.' : 'Esta actividad todavía no está habilitada para acreditar puntos.'}</p>
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
    {attempt?.question && <><div className="flex justify-between text-xs font-bold text-primary"><span>Pregunta {attempt.index+1} / {attempt.total}</span><span>{seconds}s</span></div><p className="font-bold">{attempt.question.q}</p><div className="space-y-2">{attempt.question.options.map((option,index) => <Button key={option} variant="outline" disabled={busy} className="h-auto w-full justify-start whitespace-normal py-3 text-left" onClick={() => send('answer',{ attempt_id: attempt.id,index: attempt.index,answer: seconds === 0 ? -1 : index })}>{option}</Button>)}</div>{seconds===0 && <p className="text-xs text-muted-foreground">Tiempo agotado; la respuesta de esta pregunta no suma.</p>}</>}
    {attempt?.status === 'playing' && kind === 'clue' && <><label className="block text-sm">Código de la pista<input className="mt-2 w-full rounded-lg border border-input bg-background p-3" value={code} onChange={e=>setCode(e.target.value)} /></label><Button disabled={busy || !code.trim()} onClick={()=>send('check',{attempt_id:attempt.id,code})}>Verificar pista</Button></>}
    {attempt?.status === 'playing' && kind === 'order' && <>{sequence.map((id,i)=><div key={id} className="flex justify-between rounded-xl border border-border p-3"><span>Fragmento {id}</span><Button variant="outline" size="icon" aria-label="Subir fragmento" disabled={busy || i===0} onClick={()=>setSequence(s=>{const n=[...s];[n[i],n[i-1]]=[n[i-1],n[i]];return n;})}><ArrowUp /></Button></div>)}<Button disabled={busy} onClick={()=>send('check',{attempt_id:attempt.id,sequence})}>Confirmar orden</Button></>}
    {busy && <p className="text-xs text-muted-foreground">Validando…</p>}
  </div>;
}
function OrderDemo() {
  const [order,setOrder]=useState([2,4,1,3]);
  return <div className="space-y-3"><p className="text-sm font-bold">Rompecabezas demostrativo · sin audio ni puntos</p>{order.map((id,index)=><div key={id} className="flex items-center gap-3 rounded-xl border border-border p-3"><span className="flex-1">Fragmento {id}</span>{([-1,1] as const).map(dir=><Button key={dir} size="icon" variant="outline" aria-label={dir===-1?'Subir':'Bajar'} disabled={index+dir<0||index+dir>=order.length} onClick={()=>setOrder(s=>{const n=[...s];[n[index],n[index+dir]]=[n[index+dir],n[index]];return n;})}>{dir===-1?<ArrowUp />:<ArrowDown />}</Button>)}</div>)}<Button className="w-full" onClick={()=>toast.message(order.every((id,i)=>id===i+1)?'Orden correcto · práctica sin puntos':'Probá otra secuencia')}>Confirmar orden</Button></div>;
}
