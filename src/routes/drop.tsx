import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/drop/MobileShell";
import { TopBar } from "@/components/drop/TopBar";
import { BottomNav, type Tab } from "@/components/drop/BottomNav";
import { MapaView } from "@/components/drop/MapaView";
import { MisionesView } from "@/components/drop/MisionesView";
import { RankingView } from "@/components/drop/RankingView";
import { PasaporteView } from "@/components/drop/PasaporteView";
import { ComunidadView } from "@/components/drop/ComunidadView";
import { DashboardView } from "@/components/drop/DashboardView";
import { ProfileView } from "@/components/drop/ProfileView";


const TABS: Tab[] = ["mapa", "misiones", "ranking", "pasaporte", "comunidad"];

export const Route = createFileRoute("/drop")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => ({
    tab: TABS.includes(search.tab as Tab) ? (search.tab as Tab) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "DROP · Tu recorrido musical" },
      { name: "description", content: "Participá en experiencias de artistas, registrá los álbumes que escuchaste y convertí tu actividad musical en puntos." },
      { property: "og:title", content: "DROP · Tu recorrido musical" },
      { property: "og:description", content: "Experiencias, álbumes y puntos para vivir la música con otros fans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const { tab: searchTab } = Route.useSearch();
  const [tab, setTab] = useState<Tab>(searchTab ?? "mapa");
  const [dashboard, setDashboard] = useState(false);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    if (searchTab) setTab(searchTab);
  }, [searchTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [tab, dashboard, profile]);

  if (profile) {
    return (
      <MobileShell>
        <ProfileView onClose={() => setProfile(false)} />
      </MobileShell>
    );
  }

  const titles: Record<Tab, string> = {
    mapa: "El Mapa",
    misiones: "Misiones",
    ranking: "Ranking",
    pasaporte: "Pasaporte",
    comunidad: "Comunidad",
  };

  return (
    <MobileShell>
      <TopBar
        title={dashboard ? "Dashboard" : titles[tab]}
        dashboardOpen={dashboard}
        onToggleDashboard={() => setDashboard((v) => !v)}
        onOpenProfile={() => {
          setDashboard(false);
          setProfile(true);
        }}
      />
      <main className="pt-2">
        {dashboard ? (
          <DashboardView />
        ) : (
          <>
            {tab === "mapa" && <MapaView onGoMisiones={() => setTab("misiones")} />}
            {tab === "misiones" && <MisionesView />}
            {tab === "ranking" && <RankingView />}
            {tab === "pasaporte" && <PasaporteView />}
            {tab === "comunidad" && <ComunidadView />}
          </>
        )}
      </main>
      {!dashboard && <BottomNav active={tab} onChange={setTab} />}
    </MobileShell>
  );
}
