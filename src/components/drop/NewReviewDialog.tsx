import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Camera, Disc3, Loader2, MapPin, Music, Ticket, X } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { publishReview } from "@/lib/explore.functions";
import type { CommunityReview, ReviewExtras, ReviewSong, ShowEvent } from "@/lib/explore-data";
import { reviewPhotoFromFile } from "@/lib/review-photos";
import { saveLocalReview } from "@/lib/local-reviews";
import { useDropAuth } from "./AuthProvider";
import { SongChip, SongSearch, StarPicker, toReviewSong } from "./ReviewParts";

export type ReviewKind = "album" | "song" | "show";
const input = "h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

/** Escribir una reseña de canción o de show (con fotos, lugar y canción de fondo). */
export function NewReviewDialog({ initialKind = "song", initialShow, shows, onClose, onPublished }: {
  initialKind?: ReviewKind;
  initialShow?: ShowEvent;
  shows: ShowEvent[];
  onClose: () => void;
  onPublished: (review: CommunityReview) => void;
}) {
  const { mode, profile, user } = useDropAuth();
  const publish = useServerFn(publishReview);
  const [kind, setKind] = useState<ReviewKind>(initialKind);
  const [song, setSong] = useState<ReviewSong | null>(null);
  const [show, setShow] = useState<ShowEvent | null>(initialShow ?? null);
  const [custom, setCustom] = useState(false);
  const [customArtist, setCustomArtist] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [venue, setVenue] = useState(initialShow ? [initialShow.venue, initialShow.city].filter(Boolean).join(", ") : "");
  const [date, setDate] = useState(initialShow?.event_date?.slice(0, 10) ?? "");
  const [photos, setPhotos] = useState<string[]>([]);
  const [bgSong, setBgSong] = useState<ReviewSong | null>(null);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const pickShow = (s: ShowEvent) => {
    setShow(s); setCustom(false);
    setVenue([s.venue, s.city].filter(Boolean).join(", "));
    setDate(s.event_date?.slice(0, 10) ?? "");
  };

  async function addPhotos(files: FileList | null) {
    if (!files?.length) return;
    setLoadingPhotos(true);
    const room = 4 - photos.length;
    const next: string[] = [];
    for (const f of Array.from(files).slice(0, room)) {
      try { next.push(await reviewPhotoFromFile(f)); } catch (e) { toast.error(e instanceof Error ? e.message : "No pudimos cargar la foto"); }
    }
    if (files.length > room) toast.message("Podés subir hasta 4 fotos por show.");
    setPhotos((p) => [...p, ...next]);
    setLoadingPhotos(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  const showArtist = custom ? customArtist.trim() : show?.artist ?? "";
  const showTitle = custom ? customTitle.trim() : show?.title ?? "";
  const ready = rating > 0 && (kind === "song" ? !!song : kind === "show" ? !!showArtist && !!showTitle : false);

  async function submit() {
    if (!ready) return;
    setBusy(true);
    let review: Omit<CommunityReview, "id" | "user_id" | "author_name" | "created_at">;
    if (kind === "song" && song) {
      review = { subject_type: "song", subject_id: `dz-${song.id}`, subject_title: song.title, subject_artist: song.artist, subject_image: song.cover || null, rating, text: text.trim(), extras: { song } };
    } else {
      const extras: ReviewExtras = {};
      if (photos.length) extras.photos = photos;
      if (venue.trim()) extras.venue = venue.trim();
      if (date) extras.date = date;
      if (bgSong) extras.song = bgSong;
      const id = custom ? `custom-${slug(`${showArtist} ${showTitle}`)}` : show!.id;
      review = { subject_type: "show", subject_id: id.slice(0, 120), subject_title: showTitle, subject_artist: showArtist, subject_image: custom ? null : show?.image_url?.startsWith("http") ? show.image_url : null, rating, text: text.trim(), extras };
    }
    const full: CommunityReview = { ...review, id: `local-${Date.now()}`, user_id: mode === "user" ? user?.id ?? "me" : "guest", author_name: profile.display_name || "vos", created_at: new Date().toISOString() };
    if (mode === "user") {
      try {
        await publish({ data: { ...review, subject_image: review.subject_image, extras: review.extras ?? undefined } });
        toast.success("¡Reseña publicada!");
      } catch {
        // La base todavía no acepta canciones/shows con fotos: queda guardada en este dispositivo.
        saveLocalReview(full, true);
        toast.success("Reseña guardada", { description: "Por ahora se ve solo en este dispositivo." });
      }
    } else {
      saveLocalReview(full, false);
      toast.success("Reseña guardada", { description: "En modo invitado no se publica para la comunidad." });
    }
    setBusy(false);
    onPublished(full);
  }

  return (
    <Dialog open onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Escribir una reseña</DialogTitle>
          <DialogDescription>Contale a la comunidad qué te pareció.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-card p-1" role="tablist" aria-label="Qué querés reseñar">
          {([["album", "Álbum", Disc3], ["song", "Canción", Music], ["show", "Show", Ticket]] as const).map(([id, label, Icon]) => (
            <button key={id} type="button" role="tab" aria-selected={kind === id} onClick={() => setKind(id)}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold ${kind === id ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
              <Icon className="h-3.5 w-3.5" />{label}
            </button>
          ))}
        </div>

        {kind === "album" && (
          <div className="rounded-xl border border-dashed border-border p-4 text-center">
            <p className="text-sm font-bold">Los álbumes se reseñan desde tu biblioteca</p>
            <p className="mt-1 text-xs text-muted-foreground">Sumá el álbum, marcalo como escuchado y puntualo.</p>
            <Button asChild size="sm" className="mt-3"><Link to="/mi-drop" search={{ tab: "albumes" }}>Ir a mis álbumes</Link></Button>
          </div>
        )}

        {kind === "song" && (
          <section className="space-y-2">
            <p className="text-sm font-bold">¿Qué canción?</p>
            {song ? <SongChip song={song} onRemove={() => setSong(null)} className="border border-border" /> : <SongSearch onPick={(t) => setSong(toReviewSong(t))} />}
          </section>
        )}

        {kind === "show" && (
          <section className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-bold">¿A qué show fuiste?</p>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {shows.slice(0, 12).map((s) => (
                  <button key={s.id} type="button" onClick={() => pickShow(s)} className={`w-32 shrink-0 rounded-xl border p-2 text-left text-xs ${!custom && show?.id === s.id ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                    <span className="block truncate font-bold">{s.artist}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{s.title}</span>
                  </button>
                ))}
                <button type="button" onClick={() => { setCustom(true); setShow(null); }} className={`w-32 shrink-0 rounded-xl border p-2 text-left text-xs ${custom ? "border-primary bg-primary/10" : "border-dashed border-border"}`}>
                  <span className="block font-bold">Otro show</span><span className="block text-[11px] text-muted-foreground">Escribilo vos</span>
                </button>
              </div>
              {custom && (
                <div className="mt-2 grid gap-2">
                  <input value={customArtist} onChange={(e) => setCustomArtist(e.target.value)} maxLength={120} placeholder="Artista" className={input} />
                  <input value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} maxLength={150} placeholder="Nombre del show o gira" className={input} />
                </div>
              )}
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-2">
              <label className="text-xs font-semibold">Lugar
                <span className="relative mt-1 block"><MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" /><input value={venue} onChange={(e) => setVenue(e.target.value)} maxLength={160} placeholder="Estadio, ciudad" className={`${input} pl-9`} /></span>
              </label>
              <label className="text-xs font-semibold">Fecha
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${input} mt-1 w-36`} />
              </label>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold">Fotos <span className="font-normal text-muted-foreground">(hasta 4)</span></p>
              <div className="grid grid-cols-4 gap-2">
                {photos.map((p, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                    <img src={p} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
                    <button type="button" aria-label="Quitar foto" onClick={() => setPhotos((list) => list.filter((_, j) => j !== i))} className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/80"><X className="h-3 w-3" /></button>
                  </div>
                ))}
                {photos.length < 4 && (
                  <button type="button" onClick={() => fileRef.current?.click()} className="grid aspect-square place-items-center rounded-xl border border-dashed border-border text-muted-foreground" aria-label="Subir fotos">
                    {loadingPhotos ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                  </button>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => void addPhotos(e.target.files)} />
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold">Canción de fondo <span className="font-normal text-muted-foreground">(suena cuando abren tu reseña)</span></p>
              {bgSong ? <SongChip song={bgSong} onRemove={() => setBgSong(null)} className="border border-border" /> : <SongSearch onPick={(t) => setBgSong(toReviewSong(t))} placeholder={showArtist ? `Ej.: ${showArtist}` : "Buscá la canción"} />}
            </div>
          </section>
        )}

        {kind !== "album" && (
          <>
            <StarPicker value={rating} onChange={setRating} />
            <div>
              <label htmlFor="nueva-resena" className="text-sm font-bold">Reseña <span className="font-normal text-muted-foreground">(opcional)</span></label>
              <Textarea id="nueva-resena" value={text} onChange={(e) => setText(e.target.value)} maxLength={1000} rows={3} className="mt-1" placeholder={kind === "show" ? "¿Cómo estuvo el show?" : "¿Qué te pareció la canción?"} />
            </div>
            <Button disabled={!ready || busy} onClick={() => void submit()} className="h-11">{busy && <Loader2 className="animate-spin" />}Publicar reseña</Button>
            {!ready && <p className="-mt-2 text-center text-[11px] text-muted-foreground">{kind === "song" && !song ? "Elegí una canción y puntuala." : kind === "show" && !(showArtist && showTitle) ? "Elegí el show y puntualo." : "Poné una puntuación para publicar."}</p>}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
