import { Map, Target, Trophy, BookMarked, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export type Tab = "mapa" | "misiones" | "ranking" | "pasaporte" | "comunidad";

const items: { id: Tab; label: string; icon: typeof Map }[] = [
  { id: "mapa", label: "Mapa", icon: Map },
  { id: "misiones", label: "Misiones", icon: Target },
  { id: "ranking", label: "Ranking", icon: Trophy },
  { id: "pasaporte", label: "Pasaporte", icon: BookMarked },
  { id: "comunidad", label: "Comunidad", icon: Users },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[440px] px-3 pb-3">
      <div className="flex items-center justify-between gap-1 rounded-3xl border border-border bg-card/90 p-2 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = it.id === active;
          return (
            <button
              key={it.id}
              onClick={() => onChange(it.id)}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-medium transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-xl transition-all",
                  isActive && "text-primary-foreground shadow-[var(--shadow-glow)]"
                )}
                style={isActive ? { backgroundImage: "var(--gradient-drop)" } : undefined}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="leading-none">{it.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
