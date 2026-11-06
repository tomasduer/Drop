import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, ShoppingBag, Star, UserRound, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Navegación general: drops, reseñas y shows, la tienda de merch, tu actividad y tu perfil.
// Dentro de un drop se usa la barra propia del artista (DropNav).
const items = [
  { to: "/explorar" as const, label: "Drops", icon: Zap },
  { to: "/resenas" as const, label: "Reseñas", icon: Star },
  { to: "/tienda" as const, label: "Tienda", icon: ShoppingBag },
  { to: "/actividad" as const, label: "Actividad", icon: Activity },
  { to: "/mi-drop" as const, label: "Perfil", icon: UserRound },
];

export function GlobalNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[440px] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-1 rounded-3xl border border-border bg-card/90 p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = path.startsWith(it.to);
          return (
            <Link key={it.label} to={it.to} aria-current={isActive ? "page" : undefined}
              className={cn("flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-medium transition-colors", isActive ? "text-foreground" : "text-muted-foreground")}>
              <span className={cn("grid h-9 w-9 place-items-center rounded-xl transition-all", isActive && "text-primary-foreground shadow-[var(--shadow-glow)]")}
                style={isActive ? { backgroundImage: "var(--gradient-drop)" } : undefined}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="leading-none">{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
