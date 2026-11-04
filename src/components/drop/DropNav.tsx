import { Home, Target, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export type DropTab = "inicio" | "misiones" | "ranking" | "comunidad";
export const DROP_TABS: DropTab[] = ["inicio", "misiones", "ranking", "comunidad"];

const items: { tab: DropTab; label: string; icon: typeof Home }[] = [
  { tab: "inicio", label: "Inicio", icon: Home },
  { tab: "misiones", label: "Misiones", icon: Target },
  { tab: "ranking", label: "Ranking", icon: Trophy },
  { tab: "comunidad", label: "Comunidad", icon: Users },
];

// Barra propia de cada drop: todo lo que pasa dentro del universo de un artista.
export function DropNav({ tab, onChange }: { tab: DropTab; onChange: (t: DropTab) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[440px] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-1 rounded-3xl border border-border bg-card/90 p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {items.map(({ tab: t, label, icon: Icon }) => {
          const active = t === tab;
          return (
            <button key={t} onClick={() => onChange(t)} aria-current={active ? "page" : undefined}
              className={cn("flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium transition-colors", active ? "text-foreground" : "text-muted-foreground")}>
              <span className={cn("grid h-9 w-9 place-items-center rounded-xl transition-all", active && "text-primary-foreground shadow-[0_6px_20px_-4px_rgba(220,38,38,0.7)]")}
                style={active ? { backgroundImage: "var(--gradient-drop)" } : undefined}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="leading-none">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
