import { useEffect, useMemo, useState } from "react";
import { Check, Plus, Search, Star } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { ALBUMS } from "@/lib/albums";
import { deleteReview, getProfileExtras, publishReview } from "@/lib/explore.functions";
import { AlbumReviewDialog } from "./AlbumReviewDialog";
import { AddAlbumDialog } from "./AddAlbumDialog";
import { useDropAuth } from "./AuthProvider";
import albumCover from "@/assets/album-cover.png.asset.json";

export function AlbumsSection() {
  const { profile, movePoints, mode, reviews, saveReview, mergeReviews, customAlbums, addAlbum } = useDropAuth();
  const listened = profile?.listened_albums ?? [];
  const points = profile?.general_points ?? 0;
  const [saving, setSaving] = useState(false);
  const [preparingReview, setPreparingReview] = useState(false);
  const [adding, setAdding] = useState(false);
  const allAlbums = useMemo(() => [...customAlbums, ...ALBUMS], [customAlbums]);
  const [reviewAlbumId, setReviewAlbumId] = useState<string | null>(null);
  const reviewAlbum = allAlbums.find((album) => album.id === reviewAlbumId && listened.includes(album.id));
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"todos" | "escuchados" | "pendientes">("todos");
  const publish = useServerFn(publishReview);
  const remove = useServerFn(deleteReview);
  const loadExtras = useServerFn(getProfileExtras);

  // Carga las reseñas persistentes del usuario y las fusiona con el caché de sesión.
  useEffect(() => {
    if (mode !== "user") return;
    loadExtras()
      .then((extras) => {
        const mine: Record<string, { rating: number; text: string }> = {};
        for (const r of extras.reviews) if (r.subject_type === "album") mine[r.subject_id] = { rating: r.rating, text: r.text };
        mergeReviews(mine);
      })
      .catch(() => { /* Las reseñas persistentes se activan al aceptar los cambios de datos. */ });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const visible = useMemo(() => allAlbums.filter((album) => {
    const matches = `${album.title} ${album.artist}`.toLowerCase().includes(query.toLowerCase());
    const done = listened.includes(album.id);
    return matches && (filter === "todos" || (filter === "escuchados" ? done : !done));
  }), [allAlbums, filter, listened, query]);
  const albumsCount = allAlbums.length;

  const onToggle = async (id: string): Promise<boolean> => {
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
  };

  return (
    <div className="space-y-4 pt-5">
      <section className="rounded-2xl border border-primary/35 bg-primary/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Biblioteca DROP</p>
            <h2 className="text-xl font-black">{listened.length} de {albumsCount} escuchados</h2>
          </div>
          <p className="text-right text-lg font-black">{points.toLocaleString("es-AR")}<span className="block text-[9px] uppercase text-muted-foreground">pts generales</span></p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(listened.length / albumsCount) * 100}%` }} />
        </div>
      </section>

      <p className="text-xs text-muted-foreground">El marcado es una declaración manual, no una escucha verificada. Los álbumes agregados a mano duran solo esta sesión.</p>
      <Button variant="outline" className="w-full rounded-xl" onClick={() => setAdding(true)}><Plus className="h-4 w-4" />Agregar álbum manualmente</Button>

      <label className="flex items-center gap-2 rounded-xl border border-input bg-card px-3 py-2.5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar álbum o artista" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </label>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["todos", "escuchados", "pendientes"] as const).map((item) => (
          <Button key={item} variant={filter === item ? "default" : "outline"} size="sm" onClick={() => setFilter(item)} className="shrink-0 capitalize">{item}</Button>
        ))}
      </div>

      <fieldset disabled={saving} className="min-w-0">
        <div className="grid grid-cols-2 gap-3">
          {visible.map((album) => {
            const done = listened.includes(album.id);
            return (
              <article key={album.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img src={album.cover} alt={`Portada de ${album.title}`} loading="lazy" className="h-full w-full object-cover" />
                  {done && <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-4 w-4" /></span>}
                </div>
                <div className="p-3">
                  <h3 className="truncate text-sm font-black">{album.title}</h3>
                  <p className="text-[10px] text-muted-foreground">{album.artist} · {album.year}</p>
                  <Button variant={done ? "secondary" : "default"} size="sm" onClick={() => onToggle(album.id)} className="mt-3 w-full rounded-lg px-2 text-[10px]">
                    {done ? "Escuchado" : album.id.startsWith("custom-") ? "Marcar · sesión" : "Marcar · +120"}
                  </Button>
                  {reviews[album.id] && <div className="mt-3 space-y-1"><p className="flex items-center gap-1 text-xs font-bold text-primary"><Star className="h-3 w-3 fill-current" />{reviews[album.id].rating}/5</p>{reviews[album.id].text && <p className="line-clamp-3 break-words text-xs text-muted-foreground">{reviews[album.id].text}</p>}</div>}
                  <Button variant="outline" size="sm" className="mt-2 w-full px-2 text-[10px]" disabled={preparingReview} onClick={async () => {
                    if (!done) {
                      setPreparingReview(true);
                      const saved = await onToggle(album.id);
                      setPreparingReview(false);
                      if (!saved) return;
                    }
                    setReviewAlbumId(album.id);
                  }}><Star className="h-3 w-3" />{reviews[album.id] ? "Editar opinión" : "Puntuar y reseñar"}</Button>
                </div>
              </article>
            );
          })}
        </div>
      </fieldset>
      {visible.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No encontramos álbumes con ese filtro.</p>}
      {reviewAlbum && <AlbumReviewDialog key={reviewAlbum.id} album={reviewAlbum} review={reviews[reviewAlbum.id]} onClose={() => setReviewAlbumId(null)} onSave={(review) => {
        saveReview(reviewAlbum.id, review);
        setReviewAlbumId(null);
        if (mode === "user") {
          const call = review
            ? publish({ data: { subject_type: "album", subject_id: reviewAlbum.id, subject_title: reviewAlbum.title, subject_artist: reviewAlbum.artist, subject_image: reviewAlbum.cover, rating: review.rating, text: review.text } })
            : remove({ data: { subject_type: "album", subject_id: reviewAlbum.id } });
          call.catch(() => toast.message("Tu opinión se guardó en esta sesión; la persistencia se activa al aceptar los cambios de datos."));
        }
        toast.success(review ? "Opinión guardada" : "Opinión eliminada");
      }} />}
      {adding && <AddAlbumDialog fallbackCover={albumCover.url} onClose={() => setAdding(false)} onAdd={(album) => { addAlbum(album); setAdding(false); setFilter("todos"); setQuery(""); toast.success("Álbum agregado", { description: "Álbum manual de esta sesión · sin puntos reales." }); }} />}
    </div>
  );
}
