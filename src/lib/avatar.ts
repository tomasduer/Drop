/** Achica la foto de perfil en el navegador (cuadrada, 256 px, webp) y la devuelve lista para guardar. */
export async function avatarFromFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Elegí una imagen");
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const size = Math.min(256, side);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  canvas.getContext("2d")?.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, size, size);
  bitmap.close();
  const webp = canvas.toDataURL("image/webp", 0.8);
  // Safari viejo no exporta webp: cae a jpeg.
  return webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/jpeg", 0.8);
}
