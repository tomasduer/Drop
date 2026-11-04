import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDropAuth } from "./AuthProvider";
import lali from "@/assets/album-cover.png.asset.json";
import maria from "@/assets/drop-photo-18.png.asset.json";
import dillom from "@/assets/drop-photo-19.png.asset.json";

export function DropSelector() {
  const { saveProfile } = useDropAuth();
  return <section id="elegir-drop" className="scroll-mt-24">
    <h2 className="mb-3 text-lg font-black">Elegí tu drop</h2>
    <div className="space-y-3">
      {[
        { artist: "LALI", album: "No vayas a atender cuando el demonio llama", cover: lali.url, available: true },
        { artist: "María Becerra", album: "quimera", cover: maria.url, available: false },
        { artist: "Dillom", album: "por cesárea", cover: dillom.url, available: false },
      ].map((drop) => <article key={drop.artist} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
        <img loading="lazy" decoding="async" src={drop.cover} alt={`Portada de ${drop.album}`} className="h-16 w-16 shrink-0 rounded-md object-cover" />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-black">{drop.artist}</h3>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">{drop.album}</p>
          <p className="mt-1 text-[10px] text-primary">{drop.available ? "Disponible" : "Próximamente"}</p>
          {drop.available ? <Button asChild size="sm" className="mt-2 w-full"><Link to="/drop" onClick={() => { void saveProfile({ active_drop: "lali" }); window.scrollTo(0, 0); }}>Entrar al drop <ArrowRight /></Link></Button> : <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => toast(`El drop de ${drop.artist} abre muy pronto`)}>Entrar al drop <ArrowRight /></Button>}
        </div>
      </article>)}
    </div>
  </section>;
}
