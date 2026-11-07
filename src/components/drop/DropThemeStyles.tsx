import { hasCustomTheme, themeCss, useDropContent } from "@/lib/drop-content";

/** Estéticas de los drops armadas desde el panel de admin (pisan las de styles.css). */
export function DropThemeStyles() {
  const content = useDropContent();
  const css = content
    .filter((c) => hasCustomTheme(c.theme))
    .map((c) => themeCss(c.campaign_id, c.theme))
    .join("\n");
  return css ? <style>{css}</style> : null;
}
