import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Home, Target, UserRound, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/drop" as const, search: { tab: "mapa" as const }, label: "Inicio", icon: Home },
  { to: "/drop" as const, search: { tab: "misiones" as const }, label: "Misiones", icon: Target },
  { to: "/explorar" as const, label: "Explorar", icon: Compass },
  { to: "/drop" as const, search: { tab: "comunidad" as const }, label: "Comunidad", icon: Users },
  { to: "/mi-drop" as const, label: "Mi DROP", icon: UserRound },
];

export function GlobalNav() {
  const { location } = useRouterState();
  const path = location.pathname;
  const currentTab = (location.search as { tab?: string }).tab;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[440px] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-1 rounded-3xl border border-border bg-card/90 p-2 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive =
            it.to === "/drop"
              ? path === "/drop" && (it.label === "Comunidad" ? currentTab === "comunidad" : it.label === "Misiones" ? currentTab === "misiones" : currentTab !== "comunidad" && currentTab !== "misiones")
              : path.startsWith(it.to);
          return (
            <Link
              key={it.label}
              to={it.to}
              search={"search" in it ? it.search : undefined}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-xl transition-all",
                  isActive && "text-primary-foreground shadow-[0_6px_20px_-4px_rgba(220,38,38,0.7)]"
                )}
                style={isActive ? { backgroundImage: "var(--gradient-drop)" } : undefined}
              >
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
