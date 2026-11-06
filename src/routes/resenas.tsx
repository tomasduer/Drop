import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/drop/MobileShell";
import { GlobalNav } from "@/components/drop/GlobalNav";
import { ExplorarView } from "@/components/drop/ExplorarView";

export const Route = createFileRoute("/resenas")({
  head: () => ({
    meta: [
      { title: "DROP · Reseñas y shows" },
      { name: "description", content: "Reseñas de álbumes y shows de la comunidad, próximos recitales y artistas para descubrir." },
      { property: "og:title", content: "DROP · Reseñas y shows" },
      { property: "og:description", content: "Reseñas, shows y artistas en DROP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Resenas,
});

function Resenas() {
  return (
    <MobileShell>
      <main className="pt-2">
        <ExplorarView section="resenas" />
      </main>
      <GlobalNav />
    </MobileShell>
  );
}
