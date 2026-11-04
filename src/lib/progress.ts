import type { DropState } from "./drop-data";
import type { DropInfo } from "./drops";

export type DropProgress = { drop: DropInfo; score: number; done: number; total: number; participating: boolean };

// Progreso del fan en cada drop, con datos reales de su cuenta.
export function dropProgress(state: DropState, drops: DropInfo[]): DropProgress[] {
  const completed = new Set(state.attempts.filter((a) => a.status === "completed").map((a) => a.mission_id));
  const touched = new Set(state.attempts.map((a) => a.mission_id));
  return drops.map((drop) => {
    const missions = state.missions.filter((m) => m.campaign_id === drop.id && m.status === "verified");
    const score = state.balances.find((b) => b.campaign_id === drop.id)?.score ?? 0;
    const done = missions.filter((m) => completed.has(m.id)).length;
    return { drop, score, done, total: missions.length, participating: score > 0 || missions.some((m) => touched.has(m.id)) };
  });
}

export type Achievement = { id: string; icon: string; title: string; detail: string; unlocked: boolean };

export function achievements(state: DropState, progress: DropProgress[], listenedAlbums: number): Achievement[] {
  const completed = state.attempts.filter((a) => a.status === "completed");
  const days = new Set(completed.map((a) => a.period_key).filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k)));
  const perfect = completed.some((a) => a.campaign_award > 0 && state.missions.find((m) => m.id === a.mission_id)?.campaign_reward === a.campaign_award && state.missions.find((m) => m.id === a.mission_id)?.kind === "trivia");
  const drops = progress.filter((p) => p.participating).length;
  const finished = progress.some((p) => p.total > 0 && p.done === p.total);
  return [
    { id: "primera", icon: "🎯", title: "Primera misión", detail: "Completá tu primera misión", unlocked: completed.length >= 1 },
    { id: "cinco", icon: "🔥", title: "En llamas", detail: "Completá 5 misiones", unlocked: completed.length >= 5 },
    { id: "constante", icon: "📅", title: "Constante", detail: "Jugá en 3 días distintos", unlocked: days.size >= 3 },
    { id: "perfecta", icon: "🧠", title: "Trivia perfecta", detail: "Sacá el puntaje máximo en una trivia", unlocked: perfect },
    { id: "multi", icon: "🌎", title: "Multiverso", detail: "Participá en 2 drops distintos", unlocked: drops >= 2 },
    { id: "completo", icon: "🏆", title: "Drop completo", detail: "Completá todas las misiones de un drop", unlocked: finished },
    { id: "melomano", icon: "💿", title: "Melómano", detail: "Marcá 5 álbumes escuchados", unlocked: listenedAlbums >= 5 },
  ];
}
