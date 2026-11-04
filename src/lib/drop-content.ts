import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { DropKind } from "@/lib/drops";

/** Estética que se arma desde el panel de admin. Todos los colores en hex (#rrggbb). */
export type DropTheme = {
  background?: string;
  primary?: string;
  accent?: string;
  light?: boolean;
  font?: string;
  uppercase?: boolean;
};

/** Fila de la tabla drop_content: lo editorial y visual de un drop, editable desde /admin. */
export type DropContent = {
  campaign_id: string;
  kind: DropKind;
  tagline: string;
  description: string;
  dates: string;
  fandom: string;
  cover_url: string | null;
  hero_url: string | null;
  album_url: string | null;
  theme: DropTheme;
  updated_at?: string;
};

/** Tipografías que se pueden elegir en el panel (todas cargadas desde Google Fonts en __root). */
export const FONT_OPTIONS = [
  "Bricolage Grotesque", "Anton", "Bebas Neue", "Archivo Black", "Alfa Slab One", "Rubik Dirt",
  "Special Elite", "Space Mono", "Playfair Display", "DM Serif Display", "Syne",
  "Covered By Your Grace", "Permanent Marker", "Inter",
] as const;

// Caché compartida: se pide una sola vez y todas las pantallas se enteran cuando cambia.
let cache: DropContent[] | null = null;
let inflight: Promise<DropContent[]> | null = null;
const listeners = new Set<(rows: DropContent[]) => void>();

type Db = { from: (t: string) => { select: (c: string) => Promise<{ data: unknown[] | null; error: unknown }> } };

async function fetchContent(): Promise<DropContent[]> {
  const { data, error } = await (supabase as unknown as Db).from("drop_content").select("*");
  if (error) return cache ?? [];
  return (data ?? []) as DropContent[];
}

export async function reloadDropContent() {
  inflight = fetchContent();
  const rows = await inflight;
  cache = rows;
  inflight = null;
  listeners.forEach((l) => l(rows));
  return rows;
}

export function useDropContent(): DropContent[] {
  const [rows, setRows] = useState<DropContent[]>(cache ?? []);
  useEffect(() => {
    listeners.add(setRows);
    if (cache) setRows(cache);
    else if (!inflight) void reloadDropContent();
    return () => { listeners.delete(setRows); };
  }, []);
  return rows;
}

const HEX = /^#[0-9a-f]{6}$/i;
const SAFE_ID = /^[a-z0-9-]+$/;
const hex = (v: string | undefined, fallback: string) => (v && HEX.test(v) ? v : fallback);

/** Texto oscuro o claro según qué se lea mejor sobre el color. */
function readableOn(color: string) {
  const n = parseInt(color.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "#141414" : "#ffffff";
}

/** CSS de un drop creado desde el panel, con el mismo formato que los temas de styles.css. */
export function themeCss(id: string, theme: DropTheme, selector?: string) {
  if (!selector && !SAFE_ID.test(id)) return "";
  const light = !!theme.light;
  const bg = hex(theme.background, light ? "#f7f5f2" : "#141414");
  const fg = light ? "#161616" : "#f6f5f2";
  const primary = hex(theme.primary, "#ef4203");
  const accent = hex(theme.accent, primary);
  const font = FONT_OPTIONS.includes(theme.font as (typeof FONT_OPTIONS)[number]) ? theme.font : "Bricolage Grotesque";
  const mix = (a: string, b: string, pct: number) => `color-mix(in oklab, ${a}, ${b} ${pct}%)`;
  const alpha = (c: string, pct: number) => `color-mix(in oklab, ${c} ${pct}%, transparent)`;
  return `${selector ?? `html[data-drop="${id}"]`} {
  --background: ${bg};
  --foreground: ${fg};
  --card: ${mix(bg, fg, light ? 3 : 6)};
  --card-foreground: ${fg};
  --popover: ${mix(bg, fg, light ? 3 : 6)};
  --popover-foreground: ${fg};
  --muted: ${mix(bg, fg, 10)};
  --muted-foreground: ${mix(fg, bg, 35)};
  --secondary: ${mix(bg, primary, 14)};
  --secondary-foreground: ${fg};
  --border: ${mix(bg, primary, 28)};
  --input: ${mix(bg, fg, 14)};
  --primary: ${primary};
  --primary-foreground: ${readableOn(primary)};
  --ring: ${primary};
  --accent: ${accent};
  --accent-foreground: ${readableOn(accent)};
  --gradient-drop: linear-gradient(105deg, ${mix(primary, "#000", 22)}, ${primary} 55%, ${accent});
  --gradient-drop-soft: linear-gradient(145deg, ${alpha(primary, 20)}, ${alpha(accent, 6)});
  --gradient-glow: radial-gradient(circle at 20% 0%, ${alpha(primary, 26)}, transparent 50%), radial-gradient(circle at 100% 85%, ${alpha(accent, 12)}, transparent 45%);
  --shadow-glow: 0 10px 30px -10px ${alpha(primary, 55)};
  --font-display: "${font}", "Inter", system-ui, sans-serif;
  --display-transform: ${theme.uppercase ? "uppercase" : "none"};
  --texture-opacity: ${light ? 0.05 : 0.1};
}`;
}

/** ¿La cuenta actual puede usar el panel de drops? (tabla drop_admins en Supabase). */
export function useIsDropAdmin(userId: string | null | undefined) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    if (!userId) { setIsAdmin(false); return; }
    let alive = true;
    void (supabase as unknown as { rpc: (f: string) => Promise<{ data: boolean | null }> })
      .rpc("is_drop_admin")
      .then(({ data }) => { if (alive) setIsAdmin(!!data); }, () => { if (alive) setIsAdmin(false); });
    return () => { alive = false; };
  }, [userId]);
  return isAdmin;
}
