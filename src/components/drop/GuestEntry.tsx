import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Camera, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDropAuth } from "./AuthProvider";
import logo from "@/assets/drop-logo-2026.webp.asset.json";

export function GuestEntry() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [reading, setReading] = useState(false);
  const { enterGuest } = useDropAuth();
  const navigate = useNavigate();

  async function choosePhoto(file?: File) {
    if (!file) return;
    setError("");
    if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Elegí una foto JPG, PNG o WebP de hasta 5 MB."); return;
    }
    setReading(true);
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") setPhoto(reader.result); setReading(false); };
    reader.onerror = () => { setError("No pudimos abrir esa foto."); setReading(false); };
    reader.readAsDataURL(file);
  }

  return <main className="min-h-screen bg-background px-7 py-8 text-foreground">
    <div className="mx-auto w-full max-w-[440px]">
      <img decoding="async" src={logo.url} alt="DROP" className="h-auto w-44 object-contain" />
      <h1 className="mt-6 text-3xl font-black">Tu DROP sin cuenta.</h1>
      <p className="mt-3 text-sm text-muted-foreground">Tu perfil de invitado queda en este navegador hasta que salgas. Para sumar puntos al ranking, creá una cuenta.</p>
      <form className="mt-7 space-y-5" onSubmit={event => {
        event.preventDefault();
        if (!name.trim()) { setError("Elegí un nombre temporal."); return; }
        enterGuest({ name: name.trim(), avatar: photo });
        window.scrollTo(0, 0);
        void navigate({ to: "/explorar" });
      }}>
        <label className="block text-sm font-semibold">Usuario temporal<input autoComplete="off" maxLength={80} value={name} onChange={e => setName(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-input bg-card px-4 text-foreground outline-none focus:ring-2 focus:ring-ring" /></label>
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-card">{photo ? <img decoding="async" src={photo} alt="Tu foto temporal" className="h-full w-full object-cover" /> : <UserRound className="h-7 w-7 text-muted-foreground" />}</div>
          <label className="cursor-pointer text-sm font-semibold"><span className="flex items-center gap-2"><Camera className="h-4 w-4" />Foto (opcional)</span><input aria-label="Foto opcional" type="file" accept="image/jpeg,image/png,image/webp" className="mt-2 block w-full min-w-0 text-xs text-muted-foreground" onChange={e => { void choosePhoto(e.target.files?.[0]); e.target.value = ""; }} /></label>
          {photo && <Button type="button" variant="ghost" size="icon" aria-label="Quitar foto" onClick={() => setPhoto(null)}><X /></Button>}
        </div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={reading} className="h-12 w-full">Entrar a DROP <ArrowRight /></Button>
      </form>
      <Button asChild variant="ghost" className="mt-4 w-full"><Link to="/">Volver al inicio</Link></Button>
    </div>
  </main>;
}