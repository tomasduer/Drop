/** Achica una foto de show en el navegador (lado mayor 1080 px, webp) para guardarla con la reseña. */
export async function reviewPhotoFromFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Elegí una imagen");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1080 / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale), h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  for (const q of [0.72, 0.6, 0.45]) {
    const webp = canvas.toDataURL("image/webp", q);
    const url = webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/jpeg", q);
    if (url.length < 380_000) return url;
  }
  throw new Error("La foto es demasiado pesada");
}
