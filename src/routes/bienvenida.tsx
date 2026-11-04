import { createFileRoute } from "@tanstack/react-router";
import { WelcomeView } from "@/components/drop/WelcomeView";
export const Route = createFileRoute("/bienvenida")({
  head: () => ({ meta: [
    { title: "Bienvenida a DROP · Cómo ganar puntos" }, { name: "description", content: "Descubrí cómo participar en drops, completar misiones y ganar puntos con tus álbumes." },
    { property: "og:title", content: "Bienvenida a DROP" }, { property: "og:description", content: "Conocé tu recorrido musical y los puntos DROP." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: Welcome,
});
function Welcome() { return <WelcomeView />; }
