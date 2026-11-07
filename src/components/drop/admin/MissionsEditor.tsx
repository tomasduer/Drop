import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDropAuth } from "@/components/drop/AuthProvider";
import { db, inputCls, labelCls, slugify, type MissionRow, type Question } from "./admin-db";

type Draft = {
  id?: string; kind: "trivia" | "clue"; title: string; repeat: "once" | "daily";
  general: number; campaign: number; questions: Question[]; answer: string;
};
const emptyQuestion = (): Question => ({ q: "", options: ["", "", ""], correct: 0 });
const newDraft = (kind: Draft["kind"]): Draft => ({
  kind, title: "", repeat: "once", general: kind === "clue" ? 60 : 100, campaign: kind === "clue" ? 120 : 200,
  questions: kind === "trivia" ? [emptyQuestion()] : [], answer: "",
});
const KIND_NAME: Record<string, string> = { trivia: "Trivia", clue: "Acertijo", order: "Ordenar", stream: "Escuchar", scan: "QR", ar: "Realidad aumentada" };

/** Misiones de un drop: trivias (preguntas con 3 opciones) y acertijos (una palabra secreta). */
export function MissionsEditor({ campaignId }: { campaignId: string }) {
  const { refresh } = useDropAuth();
  const [missions, setMissions] = useState<MissionRow[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await db.from("missions").select("*").eq("campaign_id", campaignId).order("id");
    setMissions((data ?? []) as MissionRow[]);
  }
  useEffect(() => { void load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [campaignId]);

  async function edit(m: MissionRow) {
    if (m.kind !== "trivia" && m.kind !== "clue") { toast.message("Este tipo de misión todavía no se edita desde el panel."); return; }
    const { data } = await db.from("mission_validation_rules").select("rules").eq("mission_id", m.id).maybeSingle();
    const rules = (data?.rules ?? {}) as { questions?: Question[]; pool?: Question[]; codes?: string[]; rounds?: unknown };
    if (rules.rounds) { toast.message("El Juego del día rota formatos y todavía no se edita desde el panel."); return; }
    setDraft({
      id: m.id, kind: m.kind, title: m.title, repeat: m.repeat_period, general: m.general_reward, campaign: m.campaign_reward,
      questions: rules.pool ?? rules.questions ?? [emptyQuestion()], answer: (rules.codes ?? []).join(", "),
    });
  }

  async function toggle(m: MissionRow) {
    const status = m.status === "verified" ? "pending" : "verified";
    const { error } = await db.from("missions").update({ status }).eq("id", m.id);
    if (error) { toast.error("No se pudo cambiar"); return; }
    toast.success(status === "verified" ? "Misión visible para los fans" : "Misión oculta");
    await load(); await refresh();
  }

  async function save(d: Draft) {
    if (!d.title.trim()) { toast.error("Poné un título"); return; }
    let rules: unknown;
    if (d.kind === "trivia") {
      const qs = d.questions.map((q) => ({ q: q.q.trim(), options: q.options.map((o) => o.trim()).filter(Boolean), correct: q.correct }));
      if (!qs.length || qs.some((q) => !q.q || q.options.length < 2 || q.correct >= q.options.length)) { toast.error("Cada pregunta necesita texto, al menos 2 opciones y la correcta marcada"); return; }
      // Trivia diaria con muchas preguntas: cada día salen 5 distintas.
      rules = d.repeat === "daily" && qs.length > 5 ? { per_round: 5, pool: qs } : { questions: qs };
    } else {
      const codes = d.answer.split(",").map((c) => c.trim().toLowerCase()).filter(Boolean);
      if (!codes.length) { toast.error("Escribí la respuesta del acertijo"); return; }
      rules = { codes };
    }
    let id = d.id;
    if (!id) {
      const base = `${campaignId}-${slugify(d.title)}`.slice(0, 60);
      id = base; let n = 2;
      while (missions.some((m) => m.id === id)) id = `${base}-${n++}`;
    }
    setBusy(true);
    const mission = {
      id, campaign_id: campaignId, title: d.title.trim(), kind: d.kind, status: "verified",
      general_reward: clamp(d.general), campaign_reward: clamp(d.campaign),
      repeat_period: d.kind === "trivia" ? d.repeat : "once", max_checks: d.kind === "clue" ? 3 : 1, question_seconds: 20,
    };
    const m = await db.from("missions").upsert(mission);
    const r = m.error ? m : await db.from("mission_validation_rules").upsert({ mission_id: id, rules });
    setBusy(false);
    if (r.error) { toast.error("No se pudo guardar la misión: " + r.error.message); return; }
    toast.success(d.id ? "Misión actualizada" : "Misión creada");
    setDraft(null); await load(); await refresh();
  }

  return (
    <section className="space-y-4 rounded-3xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-black">Misiones</h2>
        <div className="flex gap-2">
          <button onClick={() => setDraft(newDraft("trivia"))} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-bold"><Plus className="h-4 w-4" /> Trivia</button>
          <button onClick={() => setDraft(newDraft("clue"))} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-bold"><Plus className="h-4 w-4" /> Acertijo</button>
        </div>
      </div>

      {missions.length === 0 && <p className="text-sm text-muted-foreground">Este drop todavía no tiene misiones.</p>}
      <ul className="space-y-2">
        {missions.map((m) => (
          <li key={m.id} className="flex items-center gap-3 rounded-2xl border border-border p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{m.title}</p>
              <p className="text-xs text-muted-foreground">
                {KIND_NAME[m.kind] ?? m.kind}{m.repeat_period === "daily" ? " · diaria" : ""} · +{m.campaign_reward} pts del drop · {m.status === "verified" ? "visible" : "oculta"}
              </p>
            </div>
            <button onClick={() => void edit(m)} aria-label="Editar" className="rounded-full p-2 hover:bg-muted"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => void toggle(m)} aria-label={m.status === "verified" ? "Ocultar" : "Mostrar"} className="rounded-full p-2 hover:bg-muted">
              {m.status === "verified" ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
            </button>
          </li>
        ))}
      </ul>

      {draft && <DraftForm draft={draft} setDraft={setDraft} busy={busy} onSave={() => void save(draft)} />}
    </section>
  );
}

const clamp = (n: number) => Math.max(0, Math.min(500, Math.round(Number(n) || 0)));

function DraftForm({ draft: d, setDraft, busy, onSave }: { draft: Draft; setDraft: (d: Draft | null) => void; busy: boolean; onSave: () => void }) {
  const upd = (patch: Partial<Draft>) => setDraft({ ...d, ...patch });
  const updQ = (i: number, patch: Partial<Question>) => upd({ questions: d.questions.map((q, j) => (j === i ? { ...q, ...patch } : q)) });

  return (
    <div className="space-y-4 rounded-2xl border border-primary/50 bg-background/40 p-4">
      <p className="font-bold">{d.id ? "Editar" : "Nueva"} {d.kind === "trivia" ? "trivia" : "acertijo"}</p>
      <label className="block"><span className={labelCls}>Título</span>
        <input className={inputCls} value={d.title} onChange={(e) => upd({ title: e.target.value })} placeholder={d.kind === "trivia" ? "Ej: Trivia del disco" : 'Ej: Completá el título: "La nueva…"'} />
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {d.kind === "trivia" && (
          <label className="block"><span className={labelCls}>Se juega</span>
            <select className={inputCls} value={d.repeat} onChange={(e) => upd({ repeat: e.target.value as Draft["repeat"] })}>
              <option value="once">Una vez</option><option value="daily">Todos los días</option>
            </select>
          </label>
        )}
        <label className="block"><span className={labelCls}>Puntos del drop</span><input type="number" min={0} max={500} className={inputCls} value={d.campaign} onChange={(e) => upd({ campaign: Number(e.target.value) })} /></label>
        <label className="block"><span className={labelCls}>Puntos DROP</span><input type="number" min={0} max={500} className={inputCls} value={d.general} onChange={(e) => upd({ general: Number(e.target.value) })} /></label>
      </div>

      {d.kind === "clue" ? (
        <label className="block"><span className={labelCls}>Respuesta secreta</span>
          <input className={inputCls} value={d.answer} onChange={(e) => upd({ answer: e.target.value })} placeholder="Ej: violencia" />
          <span className="mt-1 block text-[11px] text-muted-foreground">No importan mayúsculas. Si ponés varias separadas por coma, el fan tiene que encontrar todas.</span>
        </label>
      ) : (
        <div className="space-y-3">
          {d.repeat === "daily" && <p className="text-[11px] text-muted-foreground">Si cargás más de 5 preguntas, cada día salen 5 distintas.</p>}
          {d.questions.map((q, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-border p-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground">{i + 1}.</span>
                <input className={inputCls} value={q.q} onChange={(e) => updQ(i, { q: e.target.value })} placeholder="Pregunta" />
                {d.questions.length > 1 && <button onClick={() => upd({ questions: d.questions.filter((_, j) => j !== i) })} aria-label="Borrar pregunta" className="p-1"><Trash2 className="h-4 w-4" /></button>}
              </div>
              {q.options.map((o, k) => (
                <label key={k} className="flex items-center gap-2 pl-5">
                  <input type="radio" name={`correct-${i}`} checked={q.correct === k} onChange={() => updQ(i, { correct: k })} />
                  <input className={inputCls} value={o} onChange={(e) => updQ(i, { options: q.options.map((x, j) => (j === k ? e.target.value : x)) })} placeholder={`Opción ${k + 1}${q.correct === k ? " (correcta)" : ""}`} />
                </label>
              ))}
            </div>
          ))}
          <button onClick={() => upd({ questions: [...d.questions, emptyQuestion()] })} className="inline-flex items-center gap-1 text-sm font-bold text-primary"><Plus className="h-4 w-4" /> Agregar pregunta</button>
          <p className="text-[11px] text-muted-foreground">Marcá con el círculo cuál es la opción correcta.</p>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={onSave} disabled={busy} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-2.5 font-bold text-primary-foreground disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Guardar misión
        </button>
        <button onClick={() => setDraft(null)} className="rounded-full border border-border px-4 py-2.5 text-sm font-bold">Cancelar</button>
      </div>
    </div>
  );
}
