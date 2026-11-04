import { Calendar, MapPin, ShieldCheck, Lock } from "lucide-react";
import eventCrowd from "@/assets/event-crowd.jpg";
import stickerNvaa from "@/assets/sticker-nvaa.png.asset.json";
import simbolos33 from "@/assets/simbolos-33.png.asset.json";
import laliLogo from "@/assets/lali-logo.png.asset.json";
import fanaticoSingle from "@/assets/fanatico-single.png.asset.json";
import albumCover from "@/assets/album-cover.png.asset.json";
import laliAuto from "@/assets/lali-auto.png.asset.json";

const rewards = [
  { img: stickerNvaa.url, label: "Sticker: No vayas a atender", day: "Día 1" },
  { img: fanaticoSingle.url, label: "Fragmento: 'Fanático'", day: "Día 3" },
  { img: laliAuto.url, label: "Foto exclusiva #01", day: "Día 5" },
  { img: simbolos33.url, label: "Sticker: pentagrama 33", day: "Día 7" },
  { img: albumCover.url, label: "Bloqueado", day: "Día 9", locked: true },
  { img: laliLogo.url, label: "Bloqueado", day: "Día 11", locked: true },
];

export function PasaporteView() {
  return (
    <div className="px-5">
      <div className="mb-4">
        <h1 className="text-3xl font-black">Pasaporte</h1>
        <p className="text-sm text-muted-foreground">
          Tus recompensas del recorrido LALI.
        </p>
      </div>

      {/* VIP Ticket */}
      <section className="relative mb-6 overflow-hidden rounded-3xl border border-primary/50 bg-card">
        <div className="relative h-28 w-full overflow-hidden">
          <img decoding="async"
            src={eventCrowd}
            alt="Público en el listening party"
            loading="lazy"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        </div>
        <div className="p-5 pt-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
              Acceso VIP · Primeros 150
            </p>
            <h2 className="text-xl font-black">Listening Party</h2>
            <p className="text-xs text-muted-foreground">LALI · No Vayas a Atender</p>
          </div>
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>

        <div className="mx-auto my-2 grid h-40 w-40 place-items-center rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-3">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/15">
              <Lock className="h-6 w-6 text-primary" />
            </span>
            <p className="text-sm font-bold leading-tight">
              Acceso bloqueado
            </p>
            <p className="text-xs leading-snug text-muted-foreground">
              Se desbloqueará si sos parte de los primeros 150 en completar los
              retos del drop.
            </p>
          </div>
        </div>

        <div className="my-4 flex items-center gap-2">
          <span className="h-4 w-4 -translate-x-6 rounded-full bg-background" />
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="h-4 w-4 translate-x-6 rounded-full bg-background" />
        </div>

        <div className="space-y-2 text-xs">
          <Row icon={<Calendar className="h-3.5 w-3.5" />} label="Sábado 2 Abr · 21:00 hs" />
          <Row icon={<MapPin className="h-3.5 w-3.5" />} label="Complejo Art Media" />
        </div>
        </div>
      </section>

      {/* Rewards grid */}
      <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Colección · 4 de 6
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {rewards.map((r) => {
          return (
            <div
              key={r.label + r.day}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative h-24 bg-muted">
                <img decoding="async"
                  src={r.img}
                  alt={r.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ opacity: r.locked ? 0.25 : 1 }}
                />
                {r.locked && (
                  <span className="absolute inset-0 grid place-items-center">
                    <Lock className="h-7 w-7 text-muted-foreground" />
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {r.day}
                </p>
                <p className="truncate text-xs font-semibold">{r.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Souvenir teaser */}
      <div className="mt-5 rounded-2xl border border-dashed border-border bg-card/50 p-4 text-center">
        <p className="text-xs font-semibold">🏆 Souvenir "Estuve el Día 1"</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Se activa cuando se desbloquee tu acceso al evento.
        </p>
      </div>
    </div>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/20 text-primary">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}
