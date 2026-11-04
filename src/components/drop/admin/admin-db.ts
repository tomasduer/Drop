import { supabase } from "@/integrations/supabase/client";

// Las tablas del panel (drop_content, drop_admins) todavía no están en los tipos generados.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as unknown as { from: (t: string) => any; storage: any };

export type CampaignRow = { id: string; artist: string; title: string; status: "active" | "pending" | "closed" };
export type MissionRow = {
  id: string; campaign_id: string; title: string; kind: string; status: "verified" | "demo" | "pending";
  general_reward: number; campaign_reward: number; repeat_period: "once" | "daily"; max_checks: number; question_seconds: number;
};
export type Question = { q: string; options: string[]; correct: number };

export const STATUS_OPTIONS: { value: CampaignRow["status"]; label: string }[] = [
  { value: "pending", label: "Próximamente" },
  { value: "active", label: "Activo" },
  { value: "closed", label: "Archivo" },
];

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);

/** Achica la foto en el navegador (máx. 1400 px, webp) antes de subirla, así la app carga rápido. */
async function shrink(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return await new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("No se pudo procesar la imagen"))), "image/webp", 0.85));
}

export async function uploadDropImage(dropId: string, field: string, file: File): Promise<string> {
  const blob = await shrink(file);
  const path = `${dropId}/${field}-${Date.now()}.webp`;
  const { error } = await db.storage.from("drop-imagenes").upload(path, blob, { contentType: "image/webp", upsert: true });
  if (error) throw new Error(error.message ?? "No se pudo subir la imagen");
  return db.storage.from("drop-imagenes").getPublicUrl(path).data.publicUrl as string;
}

export const inputCls = "w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary";
export const labelCls = "mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground";
