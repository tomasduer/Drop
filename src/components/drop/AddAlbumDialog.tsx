import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { CustomAlbum } from "./AuthProvider";

export function AddAlbumDialog({ onClose, onAdd, fallbackCover }: { onClose: () => void; onAdd: (album: CustomAlbum) => void; fallbackCover: string }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>Agregar álbum</DialogTitle>
          <DialogDescription>Sumá un álbum a tu biblioteca DROP.</DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); if (!title.trim()) return; onAdd({ id: `custom-${Date.now()}`, title: title.trim(), artist: artist.trim() || "Artista desconocido", year: year.trim(), cover: cover ?? fallbackCover }); }}>
          <label className="block space-y-1 text-sm font-bold">Título<Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} placeholder="Nombre del álbum" required /></label>
          <label className="block space-y-1 text-sm font-bold">Artista<Input value={artist} onChange={(e) => setArtist(e.target.value)} maxLength={60} placeholder="Ej: LALI" /></label>
          <label className="block space-y-1 text-sm font-bold">Año<Input value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="2024" /></label>
          <label className="block space-y-1 text-sm font-bold">Portada <span className="font-normal text-muted-foreground">(opcional)</span>
            <Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setCover(URL.createObjectURL(file)); }} />
          </label>
          {cover && <img src={cover} alt="Vista previa de la portada" className="mx-auto h-24 w-24 rounded-md object-cover" />}
          <Button type="submit" className="w-full" disabled={!title.trim()}>Agregar a mi biblioteca</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
