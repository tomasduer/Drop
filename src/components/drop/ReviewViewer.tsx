import { useState } from "react";
import { CalendarDays, MapPin, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { CommunityReview } from "@/lib/explore-data";
import { SongChip } from "./ReviewParts";

export const REVIEW_TYPE_LABEL: Record<CommunityReview["subject_type"], string> = { album: "Álbum", song: "Canción", show: "Show", artist: "Artista" };

function Stars({ value }: { value: number }) {
  return <span className="flex gap-0.5 text-primary" aria-label={`${value} de 5`}>{[1, 2, 3, 4, 5].map((v) => <Star key={v} className={`h-3.5 w-3.5 ${v <= value ? "fill-current" : "opacity-30"}`} />)}</span>;
}

const fmtDate = (d: string) => new Date(d.length === 10 ? `${d}T12:00:00` : d).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });

/** Lector de una reseña. En los shows, las fotos se ven como una historia y suena la canción elegida. */
export function ReviewViewer({ review, image, onClose }: { review: CommunityReview; image?: string | null; onClose: () => void }) {
  const photos = review.extras?.photos ?? [];
  const song = review.extras?.song;
  const [index, setIndex] = useState(0);
  const isShow = review.subject_type === "show";

  return (
    <Dialog open onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-h-[92dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-2xl p-0">
        {photos.length > 0 ? (
          <div className="relative">
            <div className="flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto rounded-t-2xl" onScroll={(e) => { const el = e.currentTarget; setIndex(Math.round(el.scrollLeft / el.clientWidth)); }}>
              {photos.map((p, i) => <img key={i} src={p} alt={`Foto ${i + 1} del show`} className="h-full w-full shrink-0 snap-center object-cover" />)}
            </div>
            {photos.length > 1 && (
              <div className="absolute inset-x-3 top-2 flex gap-1">{photos.map((_, i) => <span key={i} className={`h-0.5 flex-1 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`} />)}</div>
            )}
            {song && <SongChip song={song} autoPlay className="absolute left-3 right-12 top-5" />}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-10 text-white">
              <p className="text-lg font-black leading-tight">{review.subject_artist}</p>
              <p className="text-sm opacity-90">{review.subject_title}</p>
            </div>
          </div>
        ) : image ? (
          <img src={image} alt={`Imagen de ${review.subject_title}`} className="aspect-square w-full rounded-t-2xl object-cover" />
        ) : null}

        <div className="space-y-3 p-5 pt-3">
          <DialogHeader className="text-left">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{REVIEW_TYPE_LABEL[review.subject_type]}</p>
            <DialogTitle>{review.subject_title}</DialogTitle>
            <DialogDescription>{review.subject_artist} · reseña de {review.author_name || "fan de DROP"}</DialogDescription>
          </DialogHeader>
          {isShow && (review.extras?.venue || review.extras?.date) && (
            <div className="space-y-1 text-xs text-muted-foreground">
              {review.extras?.venue && <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" />{review.extras.venue}</p>}
              {review.extras?.date && <p className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-primary" />{fmtDate(review.extras.date)}</p>}
            </div>
          )}
          {song && photos.length === 0 && <SongChip song={song} autoPlay={isShow} className="border border-border" />}
          <Stars value={review.rating} />
          {review.text && <p className="whitespace-pre-line text-sm leading-relaxed">{review.text}</p>}
          <p className="text-xs text-muted-foreground">{fmtDate(review.created_at)}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
