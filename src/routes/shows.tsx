import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/drop/MobileShell";
import { GlobalNav } from "@/components/drop/GlobalNav";
import { EmptyShows, LocationBar, ShowCard, useNearbyShows } from "@/components/drop/NearbyShows";
import { NewReviewDialog } from "@/components/drop/NewReviewDialog";
import type { ShowEvent } from "@/lib/explore-data";

export const Route = createFileRoute("/shows")({
  head: () => ({
    meta: [
      { title: "DROP · Shows cerca tuyo" },
      { name: "description", content: "Todos los recitales confirmados en tu ciudad, con link a la venta oficial de entradas." },
      { property: "og:title", content: "DROP · Shows cerca tuyo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ShowsPage,
});

function ShowsPage() {
  const nearby = useNearbyShows();
  const [reviewing, setReviewing] = useState<ShowEvent | null>(null);
  return (
    <MobileShell>
      <main className="px-5 pb-28 pt-2">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/resenas" hash="shows" aria-label="Volver" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black leading-tight">Shows cerca tuyo</h1>
            <p className="text-xs text-muted-foreground">
              {nearby.loading ? "Buscando…" : `${nearby.groups.length} ${nearby.groups.length === 1 ? "show" : "shows"} en ${nearby.city}`}
            </p>
          </div>
        </div>
        <LocationBar nearby={nearby} />
        {nearby.groups.length === 0 ? (
          <EmptyShows city={nearby.city} loading={nearby.loading} />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {nearby.groups.map((g) => (
              <ShowCard key={g.key} group={g} showKm={!!nearby.location} onReview={setReviewing} className="w-full" />
            ))}
          </div>
        )}
      </main>
      <GlobalNav />
      {reviewing && (
        <NewReviewDialog initialKind="show" initialShow={reviewing} shows={nearby.shows} onClose={() => setReviewing(null)} onPublished={() => setReviewing(null)} />
      )}
    </MobileShell>
  );
}
