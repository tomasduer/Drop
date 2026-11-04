import { useEffect, useState } from "react";
import { Archive, Compass, Gift, Target, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import laliHero from "@/assets/lali-9.png.asset.json";
import mariaHero from "@/assets/drop-photo-31.png.asset.json";
import tiniHero from "@/assets/drop-photo-32.png.asset.json";

const KEY = "drop-onboarding-visto";

const slides = [
  { image: laliHero.url, title: "Explorá y elegí tus drops", points: [{ icon: Compass, text: "Cada drop es el universo de un artista" }, { icon: Users, text: "Sumate a todos los que quieras, a la vez" }] },
  { image: tiniHero.url, title: "Jugá y sumá puntos", points: [{ icon: Target, text: "Completá misiones, trivias y desafíos" }, { icon: Trophy, text: "Subí en el ranking de cada artista" }] },
  { image: mariaHero.url, title: "Ganá premios y volvé cuando quieras", points: [{ icon: Gift, text: "Desbloqueá recompensas y experiencias" }, { icon: Archive, text: "Los drops que terminan quedan en el Archivo" }] },
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
        <img decoding="async" src={s.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
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
