import { useMemo } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useDropAuth } from "@/components/drop/AuthProvider";
import laliCover from "@/assets/album-cover.png.asset.json";
import mariaCover from "@/assets/drop-photo-18.png.asset.json";
import mariaHero from "@/assets/drop-photo-31.png.asset.json";
import dillomCover from "@/assets/drop-photo-19.png.asset.json";
import dillomIcon from "@/assets/dillom-icon.webp";
import laliIcon from "@/assets/lali-icon.webp";
import tiniIcon from "@/assets/tini-icon.webp";
import airbagCover from "@/assets/airbag-portada.webp";
import airbagIcon from "@/assets/airbag-icon.webp";
import airbagBanda from "@/assets/airbag-banda.webp";
import tiniCover from "@/assets/drop-photo-29.png.asset.json";

// Estado de cada experiencia: activo (suma puntos), próximamente o archivo (finalizado, solo para revisitar).
export type DropStatus = "active" | "upcoming" | "archived";

/** De qué se trata el drop: un álbum, un single, un show o una novedad del artista. */
export type DropKind = "album" | "single" | "show" | "noticia";
export const KIND_LABEL: Record<DropKind, string> = { album: "Nuevo álbum", single: "Nuevo single", show: "Show", noticia: "Novedad" };
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
};

// Contenido editorial de cada drop. El estado real sale de la tabla campaigns cuando está disponible.
export const DROP_CATALOG: DropInfo[] = [
  {
    id: "lali", kind: "album", artist: "LALI", title: "No vayas a atender cuando el demonio llama",
    tagline: "Atendé la llamada. Resolvé el misterio.",
    description: "Una búsqueda del tesoro alrededor del nuevo álbum: llamadas misteriosas, fragmentos inéditos, afiches con QR en la calle y un listening party para los primeros 150.",
    cover: laliIcon, hero: laliCover.url, album: laliCover.url, dates: "En curso · cierra con el listening party", status: "active", fandom: "LALIVERSE",
  },
  {
    id: "dillom", kind: "album", artist: "Dillom", title: "Por cesárea",
    tagline: "El universo más oscuro del rap argentino.",
    description: "Trivias, acertijos y desafíos diarios alrededor de Por cesárea. Sumá puntos y escalá el ranking de la comunidad de Dillom.",
    cover: dillomIcon, hero: dillomCover.url, album: dillomCover.url, dates: "En curso", status: "active", fandom: "Comunidad Dillom",
  },
  {
    id: "airbag", kind: "album", artist: "Airbag", title: "El Club de la Pelea I",
    tagline: "Primera regla: no le cuentes a nadie.",
    description: "Entrá al club. Trivias de los 7 temas, acertijos y desafíos alrededor de El Club de la Pelea I. Sumá puntos y peleá el ranking con los fans de Airbag.",
    cover: airbagIcon, hero: airbagBanda, album: airbagCover, dates: "En curso", status: "active", fandom: "El Club",
  },
  {
    id: "tini", artist: "TINI", title: "Nueva era",
    tagline: "Algo nuevo se viene.",
    description: "TINI prepara una nueva etapa. Activá el aviso y enterate primero cuando abra el drop.",
    cover: tiniIcon, hero: tiniCover.url, album: tiniCover.url, dates: "Próximamente", status: "upcoming", fandom: "Tinistas",
  },
  {
    id: "maria", kind: "album", artist: "María Becerra", title: "Quimera",
    tagline: "El drop que cerró a lo grande.",
    description: "La experiencia de Quimera ya terminó. Volvé a recorrer sus juegos, mirá el ranking final y tus logros.",
    cover: mariaHero.url, hero: mariaCover.url, album: mariaCover.url, dates: "Finalizado hace 3 semanas", status: "archived", fandom: "Nenas de Argentina",
  },
];

const fromDb = (s: string): DropStatus => (s === "active" ? "active" : s === "closed" ? "archived" : "upcoming");

export function useDrops(): DropInfo[] {
  const { state } = useDropAuth();
  return useMemo(() => {
    const known = DROP_CATALOG.map((d) => {
      const c = state.campaigns.find((x) => x.id === d.id);
      return c ? { ...d, status: fromDb(c.status) } : d;
    });
    // Campañas nuevas cargadas en la base que todavía no tienen contenido editorial.
    const extra = state.campaigns.filter((c) => !DROP_CATALOG.some((d) => d.id === c.id)).map((c): DropInfo => ({
      id: c.id, artist: c.artist, title: c.title, tagline: "", description: "", cover: laliCover.url, hero: laliCover.url, album: laliCover.url,
      dates: "", status: fromDb(c.status), fandom: `Fans de ${c.artist}`,
    }));
    return [...known, ...extra];
  }, [state.campaigns]);
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
