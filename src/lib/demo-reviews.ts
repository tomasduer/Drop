import type { CommunityReview } from "./explore-data";
import airbagVivo from "@/assets/airbag-vivo.webp";
import airbagBanda from "@/assets/airbag-banda.webp";
import arjonaRed from "@/assets/arjona-red.webp";
import arjonaHero from "@/assets/arjona-hero.webp";
import crowd from "@/assets/event-crowd.jpg";
import lali12 from "@/assets/lali-12.png.asset.json";
import lali14 from "@/assets/lali-14.png.asset.json";
import laliCover from "@/assets/album-cover.png.asset.json";
import pcCover from "@/assets/pc-vinilo.webp";

// Reseñas de ejemplo de canciones y shows, para que la sección no arranque vacía.
// Se muestran solo cuando la comunidad todavía no publicó reseñas de ese tipo.
const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString();

export const DEMO_REVIEWS: CommunityReview[] = [
  {
    id: "demo-show-airbag", user_id: "demo", author_name: "agus.en.vivo", subject_type: "show", subject_id: "demo-airbag-velez",
    subject_title: "El Club de la Pelea · Vélez", subject_artist: "Airbag", subject_image: null, rating: 5, created_at: daysAgo(3),
    text: "Tres horas de show y no bajaron nunca la intensidad. Cuando arrancó \"Por mil noches\" se cayó el estadio. El sonido impecable desde la platea.",
    extras: { photos: [airbagVivo, crowd, airbagBanda], venue: "Estadio Vélez Sarsfield, CABA", date: daysAgo(4).slice(0, 10), song: { id: 9_001, title: "Por mil noches", artist: "Airbag", cover: airbagBanda } },
  },
  {
    id: "demo-show-arjona", user_id: "demo", author_name: "valen.setlist", subject_type: "show", subject_id: "demo-arjona-seco",
    subject_title: "Seco Tour", subject_artist: "Ricardo Arjona", subject_image: null, rating: 4, created_at: daysAgo(6),
    text: "Íntimo y con muchas historias entre canción y canción. Lloré con \"Señora de las cuatro décadas\".",
    extras: { photos: [arjonaRed, arjonaHero], venue: "Movistar Arena, CABA", date: daysAgo(7).slice(0, 10), song: { id: 9_002, title: "Señora de las cuatro décadas", artist: "Ricardo Arjona", cover: arjonaHero } },
  },
  {
    id: "demo-show-lali", user_id: "demo", author_name: "luli.primera.fila", subject_type: "show", subject_id: "demo-lali-river",
    subject_title: "Disciplina Tour", subject_artist: "LALI", subject_image: null, rating: 5, created_at: daysAgo(12),
    text: "La producción, los cambios de vestuario, el cuerpo de baile. LALI es otra liga en vivo.",
    extras: { photos: [lali12.url, lali14.url], venue: "Estadio River Plate, CABA", date: daysAgo(14).slice(0, 10), song: { id: 9_003, title: "Disciplina", artist: "LALI", cover: lali12.url } },
  },
  {
    id: "demo-song-fanatico", user_id: "demo", author_name: "sofi.drops", subject_type: "song", subject_id: "demo-song-fanatico",
    subject_title: "Fanático", subject_artist: "LALI", subject_image: laliCover.url, rating: 5, created_at: daysAgo(2),
    text: "El estribillo no se te va más de la cabeza. Hit absoluto.",
    extras: { song: { id: 9_004, title: "Fanático", artist: "LALI", cover: laliCover.url } },
  },
  {
    id: "demo-song-dillom", user_id: "demo", author_name: "nico.tracks", subject_type: "song", subject_id: "demo-song-munecas",
    subject_title: "Muñecas", subject_artist: "Dillom", subject_image: pcCover, rating: 4, created_at: daysAgo(5),
    text: "Arranca tranqui y explota. La letra pega fuerte, de lo mejor de Por cesárea.",
    extras: { song: { id: 9_005, title: "Muñecas", artist: "Dillom", cover: pcCover } },
  },
];
