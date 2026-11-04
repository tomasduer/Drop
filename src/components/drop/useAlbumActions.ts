import { useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { deleteReview, publishReview } from "@/lib/explore.functions";
import { useDropAuth, type AlbumReview } from "./AuthProvider";

type AlbumRef = { id: string; title: string; artist: string; cover: string };

/** Marcar un álbum como escuchado (+120) y guardar su reseña. Lo usan la biblioteca y la ficha del álbum. */
export function useAlbumActions() {
  const { profile, movePoints, mode, saveReview } = useDropAuth();
  const publish = useServerFn(publishReview);
  const remove = useServerFn(deleteReview);
  const [saving, setSaving] = useState(false);
  const listened = profile?.listened_albums ?? [];
  const points = profile?.general_points ?? 0;

  async function toggleListened(id: string): Promise<boolean> {
    const isListened = listened.includes(id);
    if (mode === "user" && isListened && !id.startsWith("custom-") && points < 120) { toast.error("No podés quitar un álbum cuyos puntos ya canjeaste."); return false; }
    setSaving(true);
    const saved = await movePoints(
      { amount: isListened ? -120 : 120, reason: isListened ? "album_unlistened" : "album_listened", reference: id },
      { listened_albums: isListened ? listened.filter((item) => item !== id) : [...listened, id] },
    );
    setSaving(false);
    if (!saved) return false;
    if (mode !== "user" || id.startsWith("custom-")) return true;
    toast[isListened ? "message" : "success"](
      isListened ? "Álbum quitado de tu historial" : "+120 puntos DROP",
      { description: isListened ? "El saldo fue actualizado." : "Sumaste un álbum escuchado." },
    );
    return true;
  }

  function storeReview(album: AlbumRef, review: AlbumReview | null) {
    saveReview(album.id, review);
    if (mode === "user") {
      const call = review
        ? publish({ data: { subject_type: "album", subject_id: album.id, subject_title: album.title, subject_artist: album.artist, subject_image: album.cover, rating: review.rating, text: review.text } })
        : remove({ data: { subject_type: "album", subject_id: album.id } });
      call.catch(() => toast.error("No pudimos publicar tu reseña. Probá de nuevo."));
    }
    toast.success(review ? "Opinión guardada" : "Opinión eliminada");
  }

  return { listened, saving, toggleListened, storeReview };
}
