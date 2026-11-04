import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useDropAuth } from "@/components/drop/AuthProvider";
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
  component: Home,
});

// Quien ya entró (cuenta o invitado) arranca en Explorar; quien llega por primera vez ve la bienvenida.
function Home() {
  const { mode } = useDropAuth();
  if (mode === "user" || mode === "guest") return <Navigate to="/explorar" replace />;
  return <WelcomeView />;
}

