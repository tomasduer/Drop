import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Search } from "lucide-react";
import { searchCatalog, type CatalogAlbum } from "@/lib/music.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { CustomAlbum } from "./AuthProvider";

export function AddAlbumDialog({ onClose, onAdd, fallbackCover }: { onClose: () => void; onAdd: (album: CustomAlbum) => void; fallbackCover: string }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  const [manual, setManual] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<CatalogAlbum[]>([]);
  const [searching, setSearching] = useState(false);
  const search = useServerFn(searchCatalog);
  useEffect(() => {
    if (q.trim().length < 2) { setResults([]); return; }
    let cancelled = false; setSearching(true);
    const t = setTimeout(() => {
      search({ data: { q: q.trim() } }).then((r) => { if (!cancelled) setResults(r.albums); }).catch(() => { if (!cancelled) setResults([]); }).finally(() => { if (!cancelled) setSearching(false); });
    }, 350);
    return () => { cancelled = true; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>Agregar álbum</DialogTitle>
          <DialogDescription>Buscalo en el catálogo y sumalo a tu biblioteca DROP.</DialogDescription>
        </DialogHeader>
        {!manual && <div className="space-y-3">
          <label className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2"><Search className="h-4 w-4 text-muted-foreground" /><input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Álbum o artista" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
          {searching && <p className="text-xs text-muted-foreground">Buscando…</p>}
          <ul className="max-h-[50dvh] space-y-1 overflow-y-auto">
            {results.map((a) => <li key={a.id}><button type="button" onClick={() => onAdd({ id: `dz-${a.id}`, title: a.title, artist: a.artist, year: a.year, cover: a.cover })} className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted"><img src={a.cover} alt="" className="h-12 w-12 shrink-0 rounded-md object-cover" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{a.title}</span><span className="block truncate text-xs text-muted-foreground">{a.artist}{a.year ? ` · ${a.year}` : ""}</span></span><Plus className="h-4 w-4 text-primary" /></button></li>)}
          </ul>
          <Button type="button" variant="ghost" size="sm" className="w-full text-xs" onClick={() => setManual(true)}>¿No lo encontrás? Cargalo a mano</Button>
        </div>}
        {manual && <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); if (!title.trim()) return; onAdd({ id: `custom-${Date.now()}`, title: title.trim(), artist: artist.trim() || "Artista desconocido", year: year.trim(), cover: cover ?? fallbackCover }); }}>
          <label className="block space-y-1 text-sm font-bold">Título<Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} placeholder="Nombre del álbum" required /></label>
          <label className="block space-y-1 text-sm font-bold">Artista<Input value={artist} onChange={(e) => setArtist(e.target.value)} maxLength={60} placeholder="Ej: LALI" /></label>
          <label className="block space-y-1 text-sm font-bold">Año<Input value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="2024" /></label>
          <label className="block space-y-1 text-sm font-bold">Portada <span className="font-normal text-muted-foreground">(opcional)</span>
            <Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setCover(URL.createObjectURL(file)); }} />
          </label>
          {cover && <img decoding="async" src={cover} alt="Vista previa de la portada" className="mx-auto h-24 w-24 rounded-md object-cover" />}
          <Button type="submit" className="w-full" disabled={!title.trim()}>Agregar a mi biblioteca</Button>
        </form>}
      </DialogContent>
    </Dialog>
  );
}
