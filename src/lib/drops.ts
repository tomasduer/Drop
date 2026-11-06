import { useMemo } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useDropAuth } from "@/components/drop/AuthProvider";
import { useDropContent } from "@/lib/drop-content";
import eventCrowd from "@/assets/event-crowd.jpg";
import laliCover from "@/assets/album-cover.png.asset.json";
import mariaCover from "@/assets/drop-photo-18.png.asset.json";
import dillomCover from "@/assets/drop-photo-19.png.asset.json";
import dillomIcon from "@/assets/dillom-icon.webp";
import laliIcon from "@/assets/lali-icon.webp";
import tiniIcon from "@/assets/tini-icon.webp";
import airbagCover from "@/assets/airbag-portada.webp";
import lnvCover from "@/assets/lnv-portada.webp";
import lnvIcon from "@/assets/lnv-icon.webp";
import adelaCover from "@/assets/adela-portada.webp";
import adelaHero from "@/assets/adela-hero.webp";
import adelaIcon from "@/assets/adela-icon.webp";
import airbagIcon from "@/assets/airbag-icon.webp";
import arjonaCover from "@/assets/arjona-portada.webp";
import arjonaHero from "@/assets/arjona-hero.webp";
import arjonaIcon from "@/assets/arjona-icon.webp";
import mariaIcon from "@/assets/maria-icon.webp";
import arjonaRojo from "@/assets/arjona-rojo.webp";
import arjonaRed from "@/assets/arjona-red.webp";
import arjonaNoDijo from "@/assets/arjona-seco-no-dijo.webp";
import lnvRemera from "@/assets/lnv-remera.webp";
import pcVinilo from "@/assets/pc-vinilo.webp";
import laliCamiseta from "@/assets/lali-camiseta-33.webp";
import laliRemeraDiva from "@/assets/lali-remera-diva.webp";
import laliVinilo from "@/assets/lali-vinilo.webp";
import laliKit from "@/assets/lali-kit-llamada.webp";
import lnvTraje from "@/assets/lnv-traje.webp";
import lnvPoster from "@/assets/lnv-poster.webp";
import lnvGira from "@/assets/lnv-gira.webp";
import pcCaras from "@/assets/pc-caras.webp";
import airbagVivo from "@/assets/airbag-vivo.webp";
import adelaGlitter from "@/assets/adela-glitter.webp";
import type { MerchItem } from "@/lib/merch";
import airbagBanda from "@/assets/airbag-banda.webp";
import tiniCover from "@/assets/drop-photo-29.png.asset.json";

// Estado de cada experiencia: activo (suma puntos), próximamente o archivo (finalizado, solo para revisitar).
export type DropStatus = "active" | "upcoming" | "archived";

/** De qué se trata el drop: un álbum, un single, un show o una novedad del artista. */
export type DropKind = "album" | "single" | "show" | "noticia";
export const KIND_LABEL: Record<DropKind, string> = { album: "Nuevo álbum", single: "Nuevo single", show: "Show", noticia: "Novedad" };
/** En el Archivo ya no es "nuevo": solo dice de qué se trató. */
export const ARCHIVED_KIND_LABEL: Record<DropKind, string> = { album: "Álbum", single: "Single", show: "Show", noticia: "Novedad" };
/** "LALI · Nuevo álbum" */
export const artistLine = (d: { artist: string; kind?: DropKind }) => (d.kind ? `${d.artist} · ${KIND_LABEL[d.kind]}` : d.artist);

export type DropInfo = {
  kind?: DropKind;
  id: string;
  artist: string;
  title: string;
  tagline: string;
  description: string;
  cover: string;
  hero: string;
  /** Tapa del álbum (para el Archivo y las listas de discos). */
  album: string;
  dates: string;
  status: DropStatus;
  fandom: string;
  /** Premios por puesto en el ranking del drop (ej.: top 10, top 60). */
  prizes?: { top: number; label: string }[];
  /** Fechas de un show con varias funciones, para mostrarlas en el inicio del drop. */
  showDates?: { label: string; dates: string[] };
  /** Merch oficial del drop; la que tiene `top` es exclusiva para los primeros del ranking. */
  merch?: MerchItem[];
  /** Nombre del álbum en Spotify, si no coincide con el título del drop (misión de pre-guardado). */
  spotifyAlbum?: string;
  /** Fecha y hora de apertura de un drop que viene (cuenta regresiva). */
  launchAt?: string;
};

// Contenido editorial de cada drop. El estado real sale de la tabla campaigns cuando está disponible.
export const DROP_CATALOG: DropInfo[] = [
  {
    id: "lali", kind: "album", artist: "LALI", title: "No vayas a atender cuando el demonio llama",
    tagline: "Atendé la llamada. Resolvé el misterio.",
    description: "Una búsqueda del tesoro alrededor del nuevo álbum: llamadas misteriosas, fragmentos inéditos, afiches con QR en la calle y un listening party para los primeros 150.",
    cover: laliIcon, hero: laliCover.url, album: laliCover.url, dates: "En curso · cierra con el listening party", status: "active", fandom: "LALIVERSE",
    merch: [
      { id: "remera", name: "Remera Diva", detail: "Negra, con tres fotos de LALI en vivo", price: 32000, image: laliRemeraDiva },
      { id: "camiseta-33", name: "Camiseta 33", detail: "Estilo fútbol, con el sol y el escudo del álbum", price: 55000, image: laliCamiseta },
      { id: "vinilo", name: "Vinilo del álbum", detail: "Vinilo negro, edición limitada", price: 78000, image: laliVinilo },
      { id: "kit", name: "Kit de la llamada", detail: "Tote bag con las letras del álbum, vinilo y postales firmadas", price: 150000, image: laliKit, top: 50 },
    ],
  },
  {
    id: "dillom-lnv", kind: "album", artist: "Dillom", title: "La nueva violencia",
    tagline: "Bienvenidos a la nueva violencia.",
    description: "Dillom vuelve con La nueva violencia y La gira violenta. Trivias diarias, acertijos y desafíos alrededor del disco. Sumá puntos y peleá el ranking del fandom.",
    cover: lnvIcon, hero: lnvCover, album: lnvCover, dates: "En curso · La gira violenta", status: "active", fandom: "La nueva violencia",
    merch: [
      { id: "remera", name: "Remera La nueva violencia", detail: "Fucsia, con la cara de Dillom", price: 30000, image: lnvRemera },
      { id: "poster", name: "Póster de la gira", detail: "La gira violenta · 50 x 70 cm", price: 15000, image: lnvGira },
      { id: "afiche", name: "Afiche firmado", detail: "Numerado, solo 20 copias", price: 22000, image: lnvPoster, top: 20 },
    ],
  },
  {
    id: "dillom", kind: "album", artist: "Dillom", title: "Por cesárea",
    tagline: "El universo más oscuro del rap argentino.",
    description: "La experiencia de Por cesárea ya terminó. Volvé a recorrer sus juegos, mirá el ranking final y tus logros.",
    cover: dillomIcon, hero: dillomCover.url, album: dillomCover.url, dates: "Finalizado", status: "archived", fandom: "Comunidad Dillom",
    merch: [
      { id: "vinilo", name: "Vinilo Por cesárea", detail: "Edición limitada", price: 75000, image: pcVinilo },
    ],
  },
  {
    id: "airbag", kind: "album", artist: "Airbag", title: "El Club de la Pelea I",
    tagline: "Primera regla: no le cuentes a nadie.",
    description: "Entrá al club. Trivias de los 7 temas, acertijos y desafíos alrededor de El Club de la Pelea I. Sumá puntos y peleá el ranking con los fans de Airbag.",
    cover: airbagIcon, hero: airbagBanda, album: airbagCover, dates: "En curso", status: "active", fandom: "El Club",
    merch: [
      { id: "remera", name: "Remera El Club", detail: "El Club de la Pelea I", price: 30000, image: airbagCover },
      { id: "vinilo", name: "Vinilo El Club de la Pelea I", detail: "Doble, edición limitada", price: 90000, image: airbagBanda },
      { id: "pua", name: "Púas usadas en vivo", detail: "Set de 3, con certificado", price: 18000, image: airbagVivo, top: 30 },
    ],
  },
  {
    id: "arjona-seco", kind: "show", artist: "Ricardo Arjona", title: "Seco Tour en el Movistar Arena", spotifyAlbum: "Seco",
    tagline: "16 fechas en el Movistar Arena. Ganá entradas y un meet & greet.",
    description: "Ricardo Arjona llega al Movistar Arena con 16 fechas del Seco Tour, en mayo y julio. Jugá las misiones y subí en el ranking: los primeros 60 se ganan dos entradas y los primeros 10, además, un meet & greet con Arjona.",
    cover: arjonaIcon, hero: arjonaHero, album: arjonaCover, dates: "Seco Tour · Movistar Arena · mayo y julio 2027", status: "active", fandom: "Arjonistas",
    showDates: { label: "Movistar Arena · 21 h", dates: ["Sáb 1/5", "Dom 2/5", "Lun 3/5", "Vie 7/5", "Sáb 8/5", "Mar 11/5", "Mié 12/5", "Lun 17/5", "Mar 18/5", "Mié 19/5", "Dom 23/5", "Lun 24/5", "Mar 25/5", "Jue 1/7", "Vie 2/7", "Lun 5/7"] },
    prizes: [
      { top: 10, label: "Meet & greet con Ricardo Arjona + dos entradas" },
      { top: 60, label: "Dos entradas para el Seco Tour" },
    ],
    merch: [
      { id: "remera", name: "Remera Seco Tour", detail: "Con las 16 fechas en la espalda", price: 35000, image: arjonaRojo },
      { id: "vinilo", name: "Vinilo Seco", detail: "Edición limitada, tapa roja", price: 80000, image: arjonaCover },
      { id: "poster", name: "Póster firmado", detail: "Lo que el Seco no dijo · numerado", price: 25000, image: arjonaNoDijo, top: 60 },
      { id: "buzo", name: "Buzo Arjonistas", detail: "Edición única para el top 10", price: 60000, image: arjonaRed, top: 10 },
    ],
  },
  {
    id: "adela-prima", kind: "show", artist: "Adela", title: "PRIMA en el Teatro Vorterix", spotifyAlbum: "PRIMA", launchAt: "2027-03-18T21:00:00-03:00",
    tagline: "Sideshow de Lollapalooza. Una sola noche.",
    description: "Adela presenta su nuevo álbum PRIMA en un sideshow de Lollapalooza en el Teatro Vorterix. Activá el aviso y enterate primero cuando abran las misiones.",
    cover: adelaIcon, hero: adelaHero, album: adelaCover, dates: "Próximamente · Sideshow de Lollapalooza · Teatro Vorterix", status: "upcoming", fandom: "Primas",
    merch: [
      { id: "remera", name: "Remera PRIMA", detail: "Edición sideshow Vorterix", price: 28000, image: adelaCover },
      { id: "tote", name: "Tote bag glitter", detail: "Brilla con las luces del show", price: 16000, image: adelaGlitter },
    ],
  },
  {
    id: "tini", artist: "TINI", title: "Nueva era", launchAt: "2026-12-04T00:00:00-03:00",
    tagline: "Algo nuevo se viene.",
    description: "TINI prepara una nueva etapa. Activá el aviso y enterate primero cuando abra el drop.",
    cover: tiniIcon, hero: tiniCover.url, album: tiniCover.url, dates: "Próximamente", status: "upcoming", fandom: "Tinistas",
  },
  {
    id: "maria", kind: "album", artist: "María Becerra", title: "Quimera",
    tagline: "El drop que cerró a lo grande.",
    description: "La experiencia de Quimera ya terminó. Volvé a recorrer sus juegos, mirá el ranking final y tus logros.",
    cover: mariaIcon, hero: mariaCover.url, album: mariaCover.url, dates: "Finalizado hace 3 semanas", status: "archived", fandom: "Nenas de Argentina",
    merch: [
      { id: "vinilo", name: "Vinilo Quimera", detail: "Edición limitada", price: 76000, image: mariaCover.url },
    ],
  },
];

const fromDb = (s: string): DropStatus => (s === "active" ? "active" : s === "closed" ? "archived" : "upcoming");

export function useDrops(): DropInfo[] {
  const { state } = useDropAuth();
  const content = useDropContent();
  return useMemo(() => {
    const byId = new Map(content.map((c) => [c.campaign_id, c]));
    // Lo cargado en el panel de admin pisa lo editorial del código (solo los campos completos).
    const withContent = (d: DropInfo): DropInfo => {
      const c = byId.get(d.id);
      if (!c) return d;
      return {
        ...d, kind: c.kind ?? d.kind,
        tagline: c.tagline || d.tagline, description: c.description || d.description,
        dates: c.dates || d.dates, fandom: c.fandom || d.fandom,
        cover: c.cover_url || d.cover, hero: c.hero_url || d.hero, album: c.album_url || c.hero_url || d.album,
      };
    };
    const known = DROP_CATALOG.map((d) => {
      const c = state.campaigns.find((x) => x.id === d.id);
      return withContent(c ? { ...d, artist: c.artist || d.artist, title: c.title || d.title, status: fromDb(c.status) } : d);
    });
    // Drops creados desde el panel (o campañas nuevas sin contenido todavía).
    const extra = state.campaigns.filter((c) => !DROP_CATALOG.some((d) => d.id === c.id)).map((c): DropInfo => withContent({
      id: c.id, artist: c.artist, title: c.title, tagline: "", description: "", cover: eventCrowd, hero: eventCrowd, album: eventCrowd,
      dates: "", status: fromDb(c.status), fandom: `Fans de ${c.artist}`,
    }));
    return [...known, ...extra];
  }, [state.campaigns, content]);
}

export function findDrop(drops: DropInfo[], id: string | undefined) {
  return drops.find((d) => d.id === id) ?? drops[0];
}

// El drop que se está viendo sale de la URL (/drop?d=lali), así podés estar en varios a la vez.
export function useCurrentDropId(): string {
  const search = useRouterState({ select: (s) => s.location.search as { d?: string } });
  return search.d || "lali";
}

export function useCurrentDrop(): DropInfo {
  const drops = useDrops();
  const id = useCurrentDropId();
  return findDrop(drops, id);
}

export const STATUS_LABEL: Record<DropStatus, string> = { active: "Activo", upcoming: "Próximamente", archived: "Finalizado" };
