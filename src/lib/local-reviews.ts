import { useSyncExternalStore } from "react";
import type { CommunityReview } from "./explore-data";

// Reseñas que no se pudieron guardar en la base (modo invitado, o la base todavía sin
// la actualización de canciones/shows). Las de invitados viven solo en memoria; las de
// cuentas también quedan en este dispositivo.
const KEY = "drop-resenas-locales";
let items: CommunityReview[] | null = null;
const listeners = new Set<() => void>();

function load(): CommunityReview[] {
  if (items) return items;
  try { items = JSON.parse(localStorage.getItem(KEY) ?? "[]") as CommunityReview[]; } catch { items = []; }
  return items;
}

export function saveLocalReview(review: CommunityReview, persist: boolean) {
  const rest = load().filter((r) => !(r.subject_type === review.subject_type && r.subject_id === review.subject_id && r.user_id === review.user_id));
  items = [review, ...rest];
  if (persist) {
    try { localStorage.setItem(KEY, JSON.stringify(items.filter((r) => r.user_id !== "guest"))); } catch { /* sin espacio: queda en memoria */ }
  }
  listeners.forEach((l) => l());
}

const EMPTY: CommunityReview[] = [];
export function useLocalReviews(): CommunityReview[] {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => (typeof window === "undefined" ? EMPTY : load()),
    () => EMPTY,
  );
}
