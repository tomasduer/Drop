import { createFileRoute } from "@tanstack/react-router";
import { WelcomeView } from "@/components/drop/WelcomeView";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DROP · Tu música suma" },
      { name: "description", content: "Participá en experiencias de artistas, registrá los álbumes que escuchaste y convertí tu actividad musical en puntos." },
      { property: "og:title", content: "DROP · Tu música suma" },
      { property: "og:description", content: "Experiencias, álbumes y puntos para vivir la música con otros fans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WelcomeView,
});

