const HERO_INFO = {
  cinematica: { name: "Cinemática", hint: "Foto grande con el título encima" },
  vinilo: { name: "Vinilo", hint: "La tapa del disco con el vinilo asomando" },
  ticket: { name: "Entrada", hint: "Como una entrada al show, con fechas y lugar" },
  single: { name: "Single", hint: "Tapa enorme con un botón para escucharlo ya" },
  revista: { name: "Revista", hint: "Titular de diario con foto y bajada" }
};
const BLOCK_INFO = {
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
  accesos: { name: "Ranking y comunidad", hint: "Atajos al final del inicio" }
};
const NEEDS_OPEN = ["progreso", "mision", "tracklist", "premios", "recompensas", "accesos"];
const ids = (...b) => b.map((id) => ({ id }));
const DEFAULT_LAYOUTS = {
  album: { hero: "vinilo", blocks: ids("intro", "proximamente", "progreso", "mision", "tracklist", "premios", "merch", "recorrido", "recompensas", "accesos") },
  show: { hero: "ticket", blocks: ids("intro", "proximamente", "fechas", "progreso", "setlist", "mision", "premios", "merch", "recompensas", "accesos") },
  single: { hero: "single", blocks: ids("intro", "proximamente", "progreso", "mision", "premios", "merch", "recompensas", "accesos") },
  noticia: { hero: "revista", blocks: ids("intro", "proximamente", "mision", "progreso", "merch", "accesos") }
};
const ALL_BLOCKS = Object.keys(BLOCK_INFO);
function normalizeLayout(layout, kind = "album") {
  const base = DEFAULT_LAYOUTS[kind];
  if (!layout || !Array.isArray(layout.blocks)) return { hero: layout?.hero && layout.hero in HERO_INFO ? layout.hero : base.hero, blocks: base.blocks.map((b) => ({ ...b })) };
  const seen = /* @__PURE__ */ new Set();
  const blocks = [];
  for (const b of layout.blocks) {
    if (!b || !ALL_BLOCKS.includes(b.id) || seen.has(b.id)) continue;
    seen.add(b.id);
    blocks.push(b.hidden ? { id: b.id, hidden: true } : { id: b.id });
  }
  for (const id of ALL_BLOCKS) if (!seen.has(id)) blocks.push({ id, hidden: true });
  return { hero: layout.hero && layout.hero in HERO_INFO ? layout.hero : base.hero, blocks };
}
function resolveLayout(drop) {
  return normalizeLayout(drop.layout, drop.kind ?? "album");
}
export {
  BLOCK_INFO as B,
  DEFAULT_LAYOUTS as D,
  HERO_INFO as H,
  NEEDS_OPEN as N,
  normalizeLayout as n,
  resolveLayout as r
};
