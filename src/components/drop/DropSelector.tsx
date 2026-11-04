import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATUS_LABEL, useDrops } from "@/lib/drops";
import { ArtistLine } from "@/components/drop/ArtistLine";

// Acceso rápido a todos los drops: podés entrar a los que quieras, sin elegir uno solo.
export function DropSelector() {
  const drops = useDrops();
  return <section id="elegir-drop" className="scroll-mt-24">
    <h2 className="mb-3 text-lg font-black">Todos los drops</h2>
    <div className="space-y-3">
      {drops.map((drop) => <article key={drop.id} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
        <img loading="lazy" decoding="async" src={drop.cover} alt={`Portada de ${drop.title}`} className="h-16 w-16 shrink-0 rounded-md object-cover" />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-black"><ArtistLine drop={drop} /></h3>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">{drop.title}</p>
          <p className="mt-1 text-[11px] text-primary">{STATUS_LABEL[drop.status]}</p>
          <Button asChild size="sm" variant={drop.status === "active" ? "default" : "outline"} className="mt-2 w-full"><Link to="/drop" search={{ d: drop.id }}>{drop.status === "archived" ? "Revisitar" : "Entrar al drop"} <ArrowRight /></Link></Button>
        </div>
      </article>)}
    </div>
  </section>;
}
