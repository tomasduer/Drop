import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/drop/MobileShell";
import { GlobalNav } from "@/components/drop/GlobalNav";
import { ExplorarView } from "@/components/drop/ExplorarView";
import { Onboarding } from "@/components/drop/Onboarding";

export const Route = createFileRoute("/explorar")({
  head: () => ({
    meta: [
      { title: "DROP · Drops" },
      { name: "description", content: "Descubrí lanzamientos con DROP activo, opiniones de la comunidad, shows y artistas nuevos." },
      { property: "og:title", content: "DROP · Drops" },
      { property: "og:description", content: "Descubrí lanzamientos, reseñas, shows y artistas en DROP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Explorar,
});

function Explorar() {
  return (
    <MobileShell>
      <main className="pt-2">
        <ExplorarView />
      </main>
      <GlobalNav />
      <Onboarding />
    </MobileShell>
  );
}
