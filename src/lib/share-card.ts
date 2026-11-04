import { toast } from "sonner";

type StoryData = { name: string; username: string; points: number; campaignPoints: number; missions: number; avatarUrl?: string | null; logoUrl?: string };

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Arma una imagen vertical (1080x1920) lista para subir a historias de Instagram/TikTok.
export async function makeStoryImage(d: StoryData): Promise<Blob | null> {
  const c = document.createElement("canvas");
  c.width = 1080; c.height = 1920;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  const g = ctx.createLinearGradient(0, 0, 1080, 1920);
  g.addColorStop(0, "#8a1538"); g.addColorStop(1, "#f0562a");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1920);
  ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fillRect(0, 1240, 1080, 680);

  ctx.textAlign = "center"; ctx.fillStyle = "#fff";
  ctx.font = "900 120px system-ui, sans-serif"; ctx.fillText("DROP", 540, 230);
  ctx.font = "600 40px system-ui, sans-serif"; ctx.globalAlpha = 0.85; ctx.fillText("LALI · No vayas a atender cuando el demonio llama", 540, 300, 980); ctx.globalAlpha = 1;

  const avatar = d.avatarUrl ? await loadImage(d.avatarUrl) : null;
  ctx.save(); ctx.beginPath(); ctx.arc(540, 620, 220, 0, Math.PI * 2); ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.2)"; ctx.fill(); ctx.clip();
  if (avatar) {
    const s = Math.max(440 / avatar.width, 440 / avatar.height);
    ctx.drawImage(avatar, 540 - (avatar.width * s) / 2, 620 - (avatar.height * s) / 2, avatar.width * s, avatar.height * s);
  }
  ctx.restore();
  ctx.lineWidth = 10; ctx.strokeStyle = "#fff"; ctx.beginPath(); ctx.arc(540, 620, 220, 0, Math.PI * 2); ctx.stroke();

  ctx.font = "900 84px system-ui, sans-serif"; ctx.fillText(d.name.slice(0, 22), 540, 970);
  ctx.font = "500 44px system-ui, sans-serif"; ctx.globalAlpha = 0.85; ctx.fillText(`@${d.username}`, 540, 1040); ctx.globalAlpha = 1;

  const stat = (x: number, value: string, label: string) => {
    ctx.font = "900 110px system-ui, sans-serif"; ctx.fillText(value, x, 1430);
    ctx.font = "600 38px system-ui, sans-serif"; ctx.globalAlpha = 0.8; ctx.fillText(label, x, 1495); ctx.globalAlpha = 1;
  };
  const fmt = (n: number) => n.toLocaleString("es-AR");
  stat(200, fmt(d.points), "pts generales");
  stat(540, fmt(d.campaignPoints), "pts LALI");
  stat(880, fmt(d.missions), "misiones");

  ctx.font = "700 46px system-ui, sans-serif"; ctx.fillText("¿Me ganás? Sumate al drop 👇", 540, 1700);
  ctx.font = "500 38px system-ui, sans-serif"; ctx.globalAlpha = 0.85; ctx.fillText(window.location.host, 540, 1770);

  try {
    return await new Promise<Blob | null>((resolve) => c.toBlob(resolve, "image/png"));
  } catch {
    return null; // la foto vino de otro dominio sin permiso: devolvemos null y probamos sin foto
  }
}

export async function shareStory(d: StoryData) {
  let blob = await makeStoryImage(d);
  if (!blob && d.avatarUrl) blob = await makeStoryImage({ ...d, avatarUrl: null });
  if (!blob) { toast.error("No pudimos armar la imagen."); return; }
  const file = new File([blob], "mi-drop.png", { type: "image/png" });
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "Mi DROP", text: "Mirá cómo voy en DROP" });
      return;
    }
  } catch { return; /* cancelado */ }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "mi-drop.png"; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast.success("Imagen descargada: subila a tus historias.");
}

export async function inviteFriends(name: string) {
  const url = `${window.location.origin}/?ref=${encodeURIComponent(name)}`;
  const text = "Estoy jugando las misiones del nuevo drop de LALI en DROP. Sumate y competimos en el ranking 🔥";
  try {
    if (navigator.share) await navigator.share({ title: "Sumate a DROP", text, url });
    else { await navigator.clipboard.writeText(`${text} ${url}`); toast.success("Invitación copiada: pegala donde quieras."); }
  } catch { /* cancelado */ }
}
