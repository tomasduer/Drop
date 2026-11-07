import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/drop/MobileShell";
import { TopBar } from "@/components/drop/TopBar";
import { DropNav, DROP_TABS, type DropTab } from "@/components/drop/DropNav";
import { DropHome } from "@/components/drop/DropHome";
import { MisionesView } from "@/components/drop/MisionesView";
import { RankingView } from "@/components/drop/RankingView";
import { ComunidadView } from "@/components/drop/ComunidadView";
import { DashboardView } from "@/components/drop/DashboardView";
import { useDropAuth } from "@/components/drop/AuthProvider";
import { useCurrentDrop } from "@/lib/drops";
import { DropThemeStyles } from "@/components/drop/DropThemeStyles";

// Pestañas viejas (mapa, pasaporte) ahora viven dentro del inicio del drop.
const toTab = (t: unknown): DropTab | undefined =>
  DROP_TABS.includes(t as DropTab) ? (t as DropTab) : t === "mapa" || t === "pasaporte" ? "inicio" : undefined;

export const Route = createFileRoute("/drop")({
  validateSearch: (search: Record<string, unknown>): { d?: string; tab?: DropTab } => ({
    d: typeof search.d === "string" && /^[a-z0-9-]{1,40}$/.test(search.d) ? search.d : undefined,
    tab: toTab(search.tab),
  }),
  head: () => ({
    meta: [
      { title: "DROP · Universo del artista" },
      { name: "description", content: "Misiones, juegos, ranking, comunidad y recompensas de cada drop." },
      { property: "og:title", content: "DROP · Universo del artista" },
      { property: "og:description", content: "Misiones, juegos, ranking, comunidad y recompensas de cada drop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DropUniverse,
});

function DropUniverse() {
  const { tab: searchTab, d } = Route.useSearch();
  const tab = searchTab ?? "inicio";
  const drop = useCurrentDrop();
  const { mode, saveProfile } = useDropAuth();
  const [dashboard, setDashboard] = useState(false);
  const navigate = useNavigate();
  const goTab = (t: DropTab) => { setDashboard(false); void navigate({ to: "/drop", search: { d: drop.id, tab: t } }); };

  // Cada drop pinta la app con la estética de su álbum (ver styles.css, html[data-drop]).
  useEffect(() => {
    document.documentElement.dataset.drop = drop.id;
    return () => { delete document.documentElement.dataset.drop; };
  }, [drop.id]);
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "auto" }); }, [tab, dashboard, d]);
  // Recordamos el último drop visitado (no limita: podés participar en todos).
  useEffect(() => { if (mode === "user") void saveProfile({ active_drop: drop.id }); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [drop.id, mode]);

  return (
    <MobileShell>
      <DropThemeStyles />
      <TopBar
        back="Drops"
        avatar={drop.cover}
        title={dashboard ? "Dashboard" : `${drop.artist} · ${drop.title}`}
        dashboardOpen={dashboard}
        onToggleDashboard={() => setDashboard((v) => !v)}
        onOpenProfile={() => void navigate({ to: "/mi-drop" })}
      />
      <main className="pt-2">
        {dashboard ? <DashboardView /> : (
          <>
            {tab === "inicio" && <DropHome drop={drop} onGo={goTab} />}
            {tab === "misiones" && <MisionesView />}
            {tab === "ranking" && <RankingView />}
            {tab === "comunidad" && <ComunidadView />}
          </>
        )}
      </main>
      <DropNav tab={tab} onChange={goTab} />
    </MobileShell>
  );
}
