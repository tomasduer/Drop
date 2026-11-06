import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { DropLogo } from "./DropLogo";
import { BarChart3, X, UserRound } from "lucide-react";

export function TopBar({
  title,
  dashboardOpen,
  onToggleDashboard,
  onOpenProfile,
  back,
  avatar,
}: {
  back?: string;
  avatar?: string;
  title?: string;
  dashboardOpen?: boolean;
  onToggleDashboard?: () => void;
  onOpenProfile?: () => void;
}) {

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background/70 px-5 pb-3 pt-5 backdrop-blur-xl">
        {back ? (
          <div className="flex min-w-0 items-center gap-2">
            <Link to="/explorar" aria-label={`Volver a ${back}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            {avatar && <img decoding="async" src={avatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />}
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Drop</p>
              <p className="truncate text-sm font-black leading-tight">{title}</p>
            </div>
          </div>
        ) : (
        <div className="flex items-center gap-2">
          <DropLogo className="h-12 w-28 shrink-0 object-contain" />
          {title && (
            <span className="ml-2 text-sm font-medium text-muted-foreground">/ {title}</span>
          )}
        </div>
        )}
        <div className="flex items-center gap-2">
          {onToggleDashboard && (
            <button
              type="button"
              onClick={onToggleDashboard}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted"
              aria-label="Dashboard sello"
            >
              {dashboardOpen ? <X className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
            </button>
          )}
          {onOpenProfile && (
            <button
              type="button"
              onClick={onOpenProfile}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted"
              aria-label="Abrir Mi DROP"
            >
              <UserRound className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

    </>
  );
}
