import { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { AlbumReview } from "./AuthProvider";

export function AlbumReviewDialog({ album, review, onClose, onSave }: {
  album: { title: string; artist: string; cover: string };
  review?: AlbumReview;
  onClose: () => void;
  onSave: (review: AlbumReview | null) => void;
}) {
  const [rating, setRating] = useState(review?.rating ?? 0);
  const [text, setText] = useState(review?.text ?? "");
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>Tu opinión</DialogTitle>
          <DialogDescription>{album.title} · {album.artist}</DialogDescription>
        </DialogHeader>
        <img decoding="async" src={album.cover} alt={`Portada de ${album.title}`} className="mx-auto h-28 w-28 rounded-md object-cover" />
        <fieldset>
          <legend className="mb-2 text-sm font-bold">Puntuación</legend>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => <Button key={value} type="button" variant="ghost" size="icon" aria-label={`${value} ${value === 1 ? "estrella" : "estrellas"}`} aria-pressed={rating === value} title={`${value} de 5`} onClick={() => setRating(value)} className={rating >= value ? "text-primary" : "text-muted-foreground"}><Star className={`h-6 w-6 ${rating >= value ? "fill-current" : ""}`} /></Button>)}
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground">{rating ? `${rating} de 5` : "Sin puntuar"}</p>
        </fieldset>
        <div className="space-y-2">
          <label htmlFor="album-review" className="text-sm font-bold">Reseña <span className="font-normal text-muted-foreground">(opcional)</span></label>
          <Textarea id="album-review" value={text} onChange={(event) => setText(event.target.value)} maxLength={1000} rows={4} placeholder="¿Qué te pareció el álbum?" />
          <p className="text-right text-xs text-muted-foreground">{text.length}/1000</p>
        </div>
        <Button disabled={rating === 0} onClick={() => onSave({ rating, text: text.trim() })}>Guardar opinión</Button>
        {review && <Button variant="ghost" onClick={() => onSave(null)}><Trash2 className="h-4 w-4" />Eliminar opinión</Button>}
      </DialogContent>
    </Dialog>
  );
}