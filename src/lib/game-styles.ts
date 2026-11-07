/**
 * Formatos de juego que se ven distinto en la app aunque usen los validadores de siempre
 * (trivia y ordenar). Las respuestas viven en la base; acá solo hay textos y etiquetas.
 */
export type GameFormat = "emoji" | "vf" | "titulo";

export const FORMAT_INFO: Record<GameFormat, { name: string; short: string; icon: string; prompt: string; desc: string }> = {
  emoji: { name: "Emoji-tema", short: "Emojis", icon: "🤔", prompt: "¿Qué tema o disco es?", desc: "Adiviná la canción o el disco por los emojis" },
  vf: { name: "Verdadero o falso", short: "V o F", icon: "⚡", prompt: "¿Verdadero o falso?", desc: "Respuestas rápidas sobre el artista: ¿es verdad o no?" },
  titulo: { name: "Completá el título", short: "Títulos", icon: "✍️", prompt: "Completá el título", desc: "Elegí la palabra que falta en el nombre del tema" },
};

/** Orden de los formatos del "Juego del día" de cada drop. Tiene que coincidir con rules.rounds en la base. */
export const DAILY_ROTATION: Record<string, GameFormat[]> = {
  "lali-del-dia": ["emoji", "vf", "titulo"],
  "airbag-del-dia": ["emoji", "vf", "titulo"],
  "lnv-del-dia": ["emoji", "vf"],
  "arjona-del-dia": ["emoji", "vf", "titulo"],
};

const BA_DAY = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires" });
/** Días desde el 1/1/2026 en hora de Buenos Aires (igual que la base). */
function dayNumber(offset = 0) {
  const key = BA_DAY.format(new Date(Date.now() + offset * 86400000));
  return Math.round((Date.parse(`${key}T00:00:00Z`) - Date.parse("2026-01-01T00:00:00Z")) / 86400000);
}
export function formatOfDay(missionId: string, offset = 0): GameFormat | undefined {
  const r = DAILY_ROTATION[missionId];
  if (!r) return undefined;
  return r[((dayNumber(offset) % r.length) + r.length) % r.length];
}
export const isDailyRotation = (missionId: string) => missionId in DAILY_ROTATION;

/** Juegos de ordenar: etiqueta de cada pieza (por id) y el orden en que aparecen al empezar. */
export const ORDER_GAMES: Record<string, { tag: string; prompt: string; desc: string; items: Record<number, string>; start: number[] }> = {
  "lali-order": { tag: "Rompecabezas", prompt: "Ordená los fragmentos", desc: "4 fragmentos de un track inédito", items: { 1: "Fragmento 1", 2: "Fragmento 2", 3: "Fragmento 3", 4: "Fragmento 4" }, start: [2, 4, 1, 3] },
  "lali-cronologia": {
    tag: "Línea de tiempo", prompt: "Del más viejo al más nuevo", desc: "Ordená los discos de LALI del primero al último",
    items: { 1: "LIBRA", 2: "A Bailar", 3: "No vayas a atender cuando el demonio llama", 4: "BRAVA", 5: "LALI", 6: "Soy" }, start: [1, 2, 3, 4, 5, 6],
  },
  "airbag-tracklist": {
    tag: "Tracklist", prompt: "Del tema 1 al último", desc: "Ordená los 7 temas como aparecen en el disco",
    items: { 1: "Corazón lunático", 2: "Verte de cerca", 3: "No confíes en tu suerte", 4: "Anarquía en Buenos Aires", 5: "Extrañas intenciones", 6: "Nunca lo olvides", 7: "Por eso nadie recordará tu nombre" }, start: [1, 2, 3, 4, 5, 6, 7],
  },
  "arjona-cronologia": {
    tag: "Línea de tiempo", prompt: "Del más viejo al más nuevo", desc: "Ordená cinco discos de Arjona por año",
    items: { 1: "Circo Soledad", 2: "Historias", 3: "Seco", 4: "Adentro", 5: "Galería Caribe" }, start: [1, 2, 3, 4, 5],
  },
};
