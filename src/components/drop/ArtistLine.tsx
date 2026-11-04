import { ARCHIVED_KIND_LABEL, KIND_LABEL, type DropKind, type DropStatus } from "@/lib/drops";

/** Nombre del artista + etiqueta naranja de DROP con el tipo de drop ("Nuevo álbum", "Nuevo single"…). */
export function ArtistLine({ drop, className = "" }: { drop: { artist: string; kind?: DropKind; status?: DropStatus }; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 ${className}`}>
      <span>{drop.artist}</span>
      {drop.kind && (
        <span className="rounded-full px-1.5 py-px text-[0.72em] font-bold uppercase leading-tight tracking-wide text-white" style={{ background: "oklch(0.64 0.21 40)", fontFamily: "var(--font-body)" }}>
          {(drop.status === "archived" ? ARCHIVED_KIND_LABEL : KIND_LABEL)[drop.kind]}
        </span>
      )}
    </span>
  );
}
