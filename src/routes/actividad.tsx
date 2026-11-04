import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/drop/MobileShell";
import { GlobalNav } from "@/components/drop/GlobalNav";
import { ActividadView } from "@/components/drop/ActividadView";

export const Route = createFileRoute("/actividad")({
  head: () => ({
    meta: [
      { title: "DROP · Actividad" },
      { name: "description", content: "Tu historial verificado en DROP: movimientos de puntos, misiones y recompensas." },
      { property: "og:title", content: "DROP · Actividad" },
      { property: "og:description", content: "Tu historial verificado en DROP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Actividad,
});

function Actividad() {
  return (
    <MobileShell>
      <main className="pt-2">
        <ActividadView />
      </main>
      <GlobalNav />
    </MobileShell>
  );
}
