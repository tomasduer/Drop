import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { MiDropView } from "@/components/drop/MiDropView";
import { MobileShell } from "@/components/drop/MobileShell";
import { GlobalNav } from "@/components/drop/GlobalNav";
import { useDropAuth } from "@/components/drop/AuthProvider";

type ProfileTab = "shows" | "resenas" | "actividad" | "stats" | "albumes";
const TABS: ProfileTab[] = ["shows", "resenas", "actividad", "stats", "albumes"];

export const Route = createFileRoute("/mi-drop")({
  validateSearch: (search: Record<string, unknown>): { tab?: ProfileTab } => ({
    tab: TABS.includes(search.tab as ProfileTab) ? (search.tab as ProfileTab) : undefined,
  }),
  head: () => ({ meta: [
    { title: "Mi perfil · DROP" },
    { name: "description", content: "Tu perfil en DROP: colección de drops, reseñas, shows, actividad y estadísticas musicales." },
    { property: "og:title", content: "Mi perfil · DROP" },
    { property: "og:description", content: "Tu colección de drops, reseñas, shows y actividad musical." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: MiDrop,
});

function MiDrop() {
  const { mode } = useDropAuth();
  const { tab } = Route.useSearch();
  if (mode === "loading") return <div className="grid min-h-screen place-items-center"><Loader2 className="animate-spin text-primary" /></div>;
  if (mode === "signed_out") return <Navigate to="/auth" search={{ mode: "login" }} replace />;
  return (
    <MobileShell>
      <main className="pt-2">
        <MiDropView initialTab={tab} />
      </main>
      <GlobalNav />
    </MobileShell>
  );
}
