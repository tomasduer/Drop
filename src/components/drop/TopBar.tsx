import { useState } from "react";
import logo from "@/assets/drop-logo-2026.webp.asset.json";
import { Bell, BarChart3, X, PhoneCall, Trophy, Gift, Users, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type Notif = {
  id: number;
  icon: LucideIcon;
  title: string;
  body: string;
  time: string;
};

const NOTIFS: Notif[] = [
  {
    id: 1,
    icon: PhoneCall,
    title: "Llamada entrante · 20:30",
    body: "El demonio llama hoy a las 20:30. Atendé desde El Mapa para desbloquear el Drop #04.",
    time: "hace 3 min",
  },
  {
    id: 2,
    icon: Trophy,
    title: "Subiste 4 posiciones",
    body: "Estás #47 en el ranking global. Te faltan 3 lugares para entrar al Top 50.",
    time: "hace 1 h",
  },
  {
    id: 3,
    icon: Gift,
    title: "Nueva recompensa en tu Pasaporte",
    body: "Desbloqueaste el sticker 'LALIVERSE' del Día 7.",
    time: "hace 4 h",
  },
  {
    id: 4,
    icon: Users,
    title: "Team CABA te mencionó",
    body: "@lalisters te etiquetó en la caza de QR de Recoleta.",
    time: "ayer",
  },
];

export function TopBar({
  title,
  dashboardOpen,
  onToggleDashboard,
  onOpenProfile,
}: {
  title?: string;
  dashboardOpen?: boolean;
  onToggleDashboard?: () => void;
  onOpenProfile?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState<number[]>([]);
  const unread = NOTIFS.filter((n) => !read.includes(n.id)).length;

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background/70 px-5 pb-3 pt-5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <img decoding="async"
            src={logo.url}
            alt="DROP"
            className="h-12 w-28 shrink-0 object-contain drop-shadow-[0_0_8px_var(--primary)]"
          />
          {title && (
            <span className="ml-2 text-sm font-medium text-muted-foreground">/ {title}</span>
          )}
        </div>
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
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted"
            aria-label="Notificaciones"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[11px] font-black text-primary-foreground">
                {unread}
              </span>
            )}
          </button>
        </div>
      </header>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl font-black">Notificaciones</DrawerTitle>
            <DrawerDescription className="text-xs">
              {unread > 0 ? `${unread} sin leer` : "Estás al día"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-2 overflow-y-auto px-4 pb-6">
            {NOTIFS.map((n) => {
              const Icon = n.icon;
              const isRead = read.includes(n.id);
              return (
                <button
                  key={n.id}
                  onClick={() => setRead((r) => (r.includes(n.id) ? r : [...r, n.id]))}
                  className={`flex w-full gap-3 rounded-2xl border p-3 text-left transition-colors ${
                    isRead ? "border-border bg-card" : "border-primary/40 bg-primary/5"
                  }`}
                >
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-drop)" }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-bold">{n.title}</span>
                      {!isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{n.body}</span>
                    <span className="mt-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
                      {n.time}
                    </span>
                  </span>
                </button>
              );
            })}
            <button
              onClick={() => setRead(NOTIFS.map((n) => n.id))}
              className="w-full rounded-xl border border-primary/40 py-3 text-sm font-bold text-primary"
            >
              Marcar todas como leídas
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
