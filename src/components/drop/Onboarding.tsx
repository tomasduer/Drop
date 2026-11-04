import { useEffect, useState } from "react";
import { Archive, Compass, Gift, MapPin, QrCode, Sparkles, Target, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/drop-logo-2026.webp.asset.json";
import crowd from "@/assets/onboarding-1.webp";
import phone from "@/assets/hero-phone.jpg";
import street from "@/assets/qr-street.jpg";
import stage from "@/assets/stage-lights.jpg";

const KEY = "drop-onboarding-visto";

// Fotos genéricas que ilustran cada idea (sin artistas).
const slides: { image: string | null; title: string; points: { icon: typeof Compass; text: string }[] }[] = [
  { image: null, title: "La música se vive. Y también suma.", points: [{ icon: Sparkles, text: "Cada lanzamiento se convierte en un juego" }, { icon: Users, text: "Participá con miles de fans" }] },
  { image: crowd, title: "Elegí tus drops", points: [{ icon: Compass, text: "En Explorar están todos los artistas" }, { icon: Users, text: "Sumate a los drops que quieras, a la vez" }] },
  { image: phone, title: "Jugá misiones", points: [{ icon: Target, text: "Trivias, acertijos y desafíos diarios" }, { icon: Sparkles, text: "Cada misión te dice cuántos puntos da" }] },
  { image: street, title: "Salí a buscar", points: [{ icon: QrCode, text: "Escaneá afiches con QR en la calle" }, { icon: MapPin, text: "El mapa te muestra dónde está la acción" }] },
  { image: stage, title: "Subí en el ranking y ganá", points: [{ icon: Trophy, text: "Cada artista tiene su propio ranking" }, { icon: Gift, text: "Desbloqueá premios y experiencias" }, { icon: Archive, text: "Los drops que terminan quedan en el Archivo" }] },
];

// Introducción breve la primera vez que alguien entra. Se puede saltear.
export function Onboarding() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  useEffect(() => { try { if (!localStorage.getItem(KEY)) setOpen(true); } catch { /* sin almacenamiento */ } }, []);
  if (!open) return null;
  const close = () => { try { localStorage.setItem(KEY, "1"); } catch { /* */ } setOpen(false); };
  const s = slides[i];
  const last = i === slides.length - 1;
  return (
    <div role="dialog" aria-modal="true" aria-label="Cómo funciona DROP" className="fixed inset-0 z-50 mx-auto flex max-w-[440px] flex-col bg-background">
      <div className="relative h-[52%] shrink-0 overflow-hidden">
        {s.image ? (
          <>
            <img decoding="async" src={s.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <img decoding="async" src={logo.url} alt="DROP" className="absolute left-5 top-[max(1rem,env(safe-area-inset-top))] h-9 w-24 object-contain object-left drop-shadow-[0_0_8px_var(--primary)]" />
          </>
        ) : (
          <div className="grid h-full place-items-center" style={{ backgroundImage: "radial-gradient(circle at 50% 45%, oklch(0.62 0.24 25 / 0.45), transparent 65%)" }}>
            <img decoding="async" src={logo.url} alt="DROP" className="w-64 object-contain drop-shadow-[0_0_24px_var(--primary)]" />
          </div>
        )}
        <button onClick={close} className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] rounded-full bg-background/70 px-3 py-1.5 text-xs font-bold backdrop-blur">Saltear</button>
      </div>
      <div className="flex flex-1 flex-col px-7 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Paso {i + 1} de {slides.length}</p>
        <h2 className="mt-2 text-3xl font-black leading-tight">{s.title}</h2>
        <ul className="mt-5 space-y-3">
          {s.points.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm font-semibold">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15"><Icon className="h-4 w-4 text-primary" /></span>{text}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-3 pt-6">
          <div className="flex flex-1 gap-1.5">{slides.map((_, k) => <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-primary" : "w-1.5 bg-muted"}`} />)}</div>
          <Button className="h-12 px-6 font-bold" onClick={() => (last ? close() : setI(i + 1))}>{last ? "Empezar" : "Siguiente"}</Button>
        </div>
      </div>
    </div>
  );
}
