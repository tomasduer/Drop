import { useEffect, useState } from "react";

/** Cuenta regresiva en días, horas, minutos y segundos hasta `to`. */
export function Countdown({ to, label = "Abre en" }: { to: string; label?: string }) {
  const target = new Date(to).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, target - (now ?? target));
  const parts = [
    { v: Math.floor(left / 86_400_000), l: "días" },
    { v: Math.floor(left / 3_600_000) % 24, l: "horas" },
    { v: Math.floor(left / 60_000) % 60, l: "minutos" },
    { v: Math.floor(left / 1000) % 60, l: "segundos" },
  ];
  const tz = "America/Argentina/Buenos_Aires";
  const raw = new Date(target).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: tz });
  const date = raw.charAt(0).toUpperCase() + raw.slice(1);
  const time = new Date(target).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: tz });
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{now !== null && left === 0 ? "¡Ya abrió!" : label}</p>
      <div className="mt-2 grid grid-cols-4 gap-2" role="timer" aria-live="off">
        {parts.map((p) => (
          <div key={p.l} className="rounded-2xl border border-border bg-background/60 px-1 py-3">
            <p className="text-3xl font-black tabular-nums leading-none">{now === null ? "--" : String(p.v).padStart(2, "0")}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{p.l}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{date} · {time} h (hora argentina)</p>
    </div>
  );
}
