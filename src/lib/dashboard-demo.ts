import type { DropInfo } from "./drops";
import { avatarFor } from "./fan-avatars";

// Datos inventados para mostrar el dashboard en demos. Son estables: cada drop siempre
// muestra los mismos números (se calculan a partir de su id), y escalan según su estado.

export type DemoMission = { id: string; title: string; kind: string };

function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}
const between = (r: () => number, min: number, max: number) => Math.round(min + r() * (max - min));

const HANDLES = ["sofi.drops", "juli_fan", "cami.b", "lautaro.vinilos", "agus.en.vivo", "flor_33", "nico.tracks", "mica.backstage", "valen.setlist", "tomi_ok", "rochi.fm", "fede.cancionero", "luli.primera.fila", "pili.preventa", "santi.giras"];
const ZONES = ["CABA", "GBA Norte", "GBA Sur", "Córdoba", "Rosario", "La Plata", "Mendoza", "Tucumán"];
const DEFAULT_MISSIONS: DemoMission[] = [
  { id: "demo-trivia", title: "Trivia diaria", kind: "trivia" },
  { id: "demo-stream", title: "Escuchá el single 3 veces", kind: "stream" },
  { id: "demo-frase", title: "Descubrí la frase secreta", kind: "clue" },
  { id: "demo-orden", title: "Ordená el tracklist", kind: "order" },
  { id: "demo-qr", title: "Caza de QR en la calle", kind: "qr" },
];

/** Tamaño de cada drop según su estado: los finalizados ya juntaron más fans. */
function scale(drop: DropInfo) {
  return drop.status === "archived" ? 1.6 : drop.status === "upcoming" ? 0.12 : 1;
}

export function demoOverview(drops: DropInfo[]) {
  return drops.map((d) => {
    const s = demoStats(d, []);
    return { campaign_id: d.id, participants: s.participants, points: s.points, completions: s.completions, active_7d: s.active_7d, saves: s.saves };
  });
}

export function demoStats(drop: DropInfo, realMissions: DemoMission[]) {
  const r = rng(drop.id);
  const k = scale(drop);
  const participants = Math.round(between(r, 2800, 9400) * k);
  const active = drop.status === "archived" ? Math.round(participants * 0.04) : Math.round(participants * (0.32 + r() * 0.2));
  const fresh = drop.status === "archived" ? 0 : Math.round(active * (0.18 + r() * 0.15));
  const missionsBase = realMissions.length > 0 ? realMissions : DEFAULT_MISSIONS;
  const missions = missionsBase.map((m, i) => {
    const share = Math.max(0.08, 0.86 - i * 0.13 - r() * 0.12);
    const fans = Math.round(participants * share);
    const repeat = m.kind === "trivia" ? 3 + r() * 5 : 1 + r() * 0.4;
    return { id: m.id, title: m.title, kind: m.kind, fans, completions: Math.round(fans * repeat) };
  });
  const completions = missions.reduce((s, m) => s + m.completions, 0);
  const points = Math.round(completions * between(r, 55, 95));
  // Actividad de 14 días: los activos tienen una curva que crece hacia hoy; los finalizados, casi nada.
  const today = new Date();
  const daily = Array.from({ length: 14 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (13 - i));
    const trend = drop.status === "archived" ? 0.05 : 0.55 + (i / 13) * 0.6;
    const weekend = [0, 6].includes(day.getDay()) ? 1.25 : 1;
    const value = Math.round((completions / 30) * trend * weekend * (0.8 + r() * 0.4));
    return { day: day.toISOString().slice(0, 10), completions: value };
  });
  let topScore = Math.round((points / participants) * between(r, 9, 14));
  const offset = between(r, 0, HANDLES.length - 1);
  const top = Array.from({ length: 10 }, (_, i) => {
    const name = HANDLES[(offset + i) % HANDLES.length];
    const score = topScore;
    topScore = Math.round(topScore * (0.86 + r() * 0.1));
    return { display_name: name, avatar_url: avatarFor(name), score, missions: Math.max(3, Math.round(score / between(r, 140, 220))) };
  });
  let left = 100;
  const zones = ZONES.slice(0, 6).map((zone, i) => {
    const pct = i === 5 ? left : Math.max(3, Math.round(left * (0.34 + r() * 0.12)));
    left -= pct;
    return { zone, pct };
  }).sort((a, b) => b.pct - a.pct);
  return {
    participants, points, completions, active_7d: active, new_7d: fresh,
    saves: Math.round(participants * (1.3 + r() * 0.6)),
    posts: Math.round(participants * (0.05 + r() * 0.04)),
    likes: Math.round(participants * (0.9 + r() * 0.8)),
    missions, daily, top, zones,
    social: { reach: Math.round(participants * between(r, 380, 620)), ugc: Math.round(participants * (0.6 + r() * 0.5)) },
    streams: Math.round(participants * between(r, 95, 180)),
  };
}
