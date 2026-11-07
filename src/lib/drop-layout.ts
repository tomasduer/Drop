import type { DropInfo, DropKind } from "./drops";

// Cada drop arma su inicio con una portada y una lista de bloques. Por defecto depende del tipo
// (álbum, show, single, novedad), y desde el panel de admin se puede cambiar el orden, ocultar
// bloques y elegir otra portada. Se guarda en drop_content.theme.layout.

export type HeroStyle = "cinematica" | "vinilo" | "ticket" | "single" | "revista";
export type BlockId =
  | "intro" | "proximamente" | "progreso" | "mision" | "fechas" | "tracklist" | "setlist"
  | "premios" | "merch" | "recorrido" | "recompensas" | "accesos";

export type DropLayout = { hero: HeroStyle; blocks: { id: BlockId; hidden?: boolean }[] };

export const HERO_INFO: Record<HeroStyle, { name: string; hint: string }> = {
  cinematica: { name: "Cinemática", hint: "Foto grande con el título encima" },
  vinilo: { name: "Vinilo", hint: "La tapa del disco con el vinilo asomando" },
  ticket: { name: "Entrada", hint: "Como una entrada al show, con fechas y lugar" },
  single: { name: "Single", hint: "Tapa enorme con un botón para escucharlo ya" },
  revista: { name: "Revista", hint: "Titular de diario con foto y bajada" },
};

export const BLOCK_INFO: Record<BlockId, { name: string; hint: string }> = {
  intro: { name: "Descripción y escuchar", hint: "Texto del drop y botones de Spotify y YouTube Music" },
  proximamente: { name: "Cuenta regresiva", hint: "Solo se ve mientras el drop está Próximamente" },
  progreso: { name: "Tu progreso", hint: "Puntos, puesto en el ranking y misiones del fan" },
  mision: { name: "Misión destacada", hint: "El juego del día o la próxima misión" },
  fechas: { name: "Fechas del show", hint: "Las funciones, y el fan marca a cuál va" },
  tracklist: { name: "Tracklist desbloqueable", hint: "Las canciones del álbum se liberan con las misiones" },
  setlist: { name: "Votá el setlist", hint: "Los fans votan qué canciones quieren en el show" },
  premios: { name: "Premios del ranking", hint: "Lo que se llevan los primeros puestos" },
  merch: { name: "Tienda oficial", hint: "Acceso al merch del artista" },
  recorrido: { name: "Recorrido (mapa)", hint: "Solo para drops con mapa propio" },
  recompensas: { name: "Recompensas", hint: "Insignias y premios por completar misiones" },
  accesos: { name: "Ranking y comunidad", hint: "Atajos al final del inicio" },
};

/** Bloques que necesitan que el drop esté abierto (o finalizado) para tener sentido. */
export const NEEDS_OPEN: BlockId[] = ["progreso", "mision", "tracklist", "premios", "recompensas", "accesos"];

const ids = (...b: BlockId[]) => b.map((id) => ({ id }));

export const DEFAULT_LAYOUTS: Record<DropKind, DropLayout> = {
  album: { hero: "vinilo", blocks: ids("intro", "proximamente", "progreso", "mision", "tracklist", "premios", "merch", "recorrido", "recompensas", "accesos") },
  show: { hero: "ticket", blocks: ids("intro", "proximamente", "fechas", "progreso", "setlist", "mision", "premios", "merch", "recompensas", "accesos") },
  single: { hero: "single", blocks: ids("intro", "proximamente", "progreso", "mision", "premios", "merch", "recompensas", "accesos") },
  noticia: { hero: "revista", blocks: ids("intro", "proximamente", "mision", "progreso", "merch", "accesos") },
};

const ALL_BLOCKS = Object.keys(BLOCK_INFO) as BlockId[];

/** Deja un layout prolijo: sin bloques repetidos ni desconocidos, y con todos los que existen (los nuevos, ocultos). */
export function normalizeLayout(layout: Partial<DropLayout> | undefined, kind: DropKind = "album"): DropLayout {
  const base = DEFAULT_LAYOUTS[kind];
  if (!layout || !Array.isArray(layout.blocks)) return { hero: layout?.hero && layout.hero in HERO_INFO ? layout.hero : base.hero, blocks: base.blocks.map((b) => ({ ...b })) };
  const seen = new Set<BlockId>();
  const blocks: DropLayout["blocks"] = [];
  for (const b of layout.blocks) {
    if (!b || !ALL_BLOCKS.includes(b.id) || seen.has(b.id)) continue;
    seen.add(b.id);
    blocks.push(b.hidden ? { id: b.id, hidden: true } : { id: b.id });
  }
  for (const id of ALL_BLOCKS) if (!seen.has(id)) blocks.push({ id, hidden: true });
  return { hero: layout.hero && layout.hero in HERO_INFO ? layout.hero : base.hero, blocks };
}

/** El inicio que se le muestra al fan: lo del panel si existe, si no el formato de su tipo. */
export function resolveLayout(drop: Pick<DropInfo, "kind" | "layout">): DropLayout {
  return normalizeLayout(drop.layout, drop.kind ?? "album");
}
