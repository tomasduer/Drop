import { useEffect, useState } from "react";
import { useDropAuth } from "./AuthProvider";
import { useCurrentDrop } from "@/lib/drops";
import { Heart, Loader2, MessageCircle, Share2, Trophy, Send, Trash2 } from "lucide-react";
import { CommentsDrawer, FanDrawer, FanSearch, FollowButton, sb, timeAgo, type Fan, type FeedPost, type SeedStats } from "./community";
import { toast } from "sonner";
import stickerNvaa from "@/assets/sticker-nvaa.png.asset.json";
import simbolos33 from "@/assets/simbolos-33.png.asset.json";
import laliLogo from "@/assets/lali-logo.png.asset.json";
import stencilWall from "@/assets/stencil-wall.png.asset.json";
import laliAuto from "@/assets/lali-auto.png.asset.json";
import albumCover from "@/assets/album-cover.png.asset.json";
import fanaticoSingle from "@/assets/fanatico-single.png.asset.json";
import { PHOTOS, avatarFor } from "@/lib/fan-avatars";
import abChicos from "@/assets/airbag-chicos.webp";
import abGuitarraRoja from "@/assets/airbag-guitarra-roja.webp";
import abBesoEscenario from "@/assets/airbag-beso-escenario.webp";
import abGorraRoja from "@/assets/airbag-gorra-roja.webp";
import abBufanda from "@/assets/airbag-bufanda.webp";
import abPeloElectrico from "@/assets/airbag-pelo-electrico.webp";
import abSelfieDos from "@/assets/airbag-selfie-dos.webp";
import abGrito from "@/assets/airbag-grito.webp";
import abLunaPark from "@/assets/airbag-luna-park.webp";
import abCalaverasJuntas from "@/assets/airbag-calaveras-juntas.webp";
import abBynGibson from "@/assets/airbag-byn-gibson.webp";
import abSillon from "@/assets/airbag-sillon.webp";
import abAbrazoGuitarra from "@/assets/airbag-abrazo-guitarra.webp";
import abEscenarioTrio from "@/assets/airbag-escenario-trio.webp";
import abSelfieTrio from "@/assets/airbag-selfie-trio.webp";
import adelaLengua from "@/assets/adela-lengua.webp";
import adelaEstrellas from "@/assets/adela-estrellas.webp";
import adelaGlitter from "@/assets/adela-glitter.webp";
import adelaAuto from "@/assets/adela-auto.webp";
import adelaEscenario from "@/assets/adela-escenario.webp";
import adelaGrito from "@/assets/adela-grito.webp";
import pcLaboratorio from "@/assets/pc-laboratorio.webp";
import pcCaras from "@/assets/pc-caras.webp";
import pcGlobosSilla from "@/assets/pc-globos-silla.webp";
import pcGlobosVuelo from "@/assets/pc-globos-vuelo.webp";
import dlRosas from "@/assets/dillom-rosas.webp";
import dlMilanesa from "@/assets/dillom-milanesa.webp";
import dlBano from "@/assets/dillom-bano.webp";
import dlGato from "@/assets/dillom-gato.webp";
import dlFisheye from "@/assets/dillom-fisheye.webp";
import dlConLali from "@/assets/dillom-con-lali.webp";
import dlBoca from "@/assets/dillom-boca.webp";
import dlEscenarioAgachado from "@/assets/dillom-escenario-agachado.webp";
import dlCamisaCadenas from "@/assets/dillom-camisa-cadenas.webp";
import dlGorroBackstage from "@/assets/dillom-gorro-backstage.webp";
import dlEscenarioRojo from "@/assets/dillom-escenario-rojo.webp";
import dlConejo from "@/assets/dillom-conejo.webp";
import dlRollingStone from "@/assets/dillom-rolling-stone.webp";
import dlRetrato from "@/assets/dillom-retrato.webp";
import dlFiestaAnteojos from "@/assets/dillom-fiesta-anteojos.webp";
import dlFiestaRayas from "@/assets/dillom-fiesta-rayas.webp";
import arjonaPortada from "@/assets/arjona-portada.webp";
import arArgentina from "@/assets/arjona-argentina.webp";
import arGorroRosa from "@/assets/arjona-gorro-rosa.webp";
import arCamisaBlanca from "@/assets/arjona-camisa-blanca.webp";
import arRetrato from "@/assets/arjona-retrato.webp";
import arSonrisa from "@/assets/arjona-sonrisa.webp";
import arVelas from "@/assets/arjona-velas.webp";
import arCalleBn from "@/assets/arjona-calle-bn.webp";
import arLentes from "@/assets/arjona-lentes.webp";
import arLibro from "@/assets/arjona-libro.webp";
import arBrazos from "@/assets/arjona-brazos.webp";
import arPieDeMicro from "@/assets/arjona-pie-de-micro.webp";
import arGuitarraNegra from "@/assets/arjona-guitarra-negra.webp";
import arBancoTeatro from "@/assets/arjona-banco-teatro.webp";
import arBlancoYNegro from "@/assets/arjona-blanco-y-negro.webp";
import arBaul from "@/assets/arjona-baul.webp";
import arPayaso from "@/assets/arjona-payaso.webp";


type Post =
  | {
      kind: "post";
      user: string;
      time: string;
      text: string;
      likes: number;
      comments: number;
      image?: string;
      avatar?: string | null;
      mine?: boolean;
      /** Se muestra primero en el feed sin cambiar su clave de likes (que depende de la posición en la lista). */
      pinned?: boolean;
    }
  | {
      kind: "achievement";
      user: string;
      time: string;
      achievement: string;
      pts: number;
    };

const feed: Post[] = [
  {
    kind: "achievement",
    user: "lalilover",
    time: "hace 5 min",
    achievement: "desbloqueó el drop 'QR en Palermo'",
    pts: 500,
  },
  {
    kind: "post",
    user: "no_atiendo",
    time: "hace 12 min",
    text: "El fragmento del día 3 tiene un sample re escondido 🤯 alguien más lo escuchó al revés?",
    likes: 412,
    comments: 88,
    image: fanaticoSingle.url,
  },
  {
    kind: "post",
    user: "demonio.llama",
    time: "hace 40 min",
    text: "Encontré el stencil en la vereda de Thames 👀 escaneado y sumado",
    likes: 1204,
    comments: 210,
    image: stencilWall.url,
  },
  {
    kind: "achievement",
    user: "motiveta",
    time: "hace 1 h",
    achievement: "entró al TOP 50 🎉",
    pts: 0,
  },
  {
    kind: "post",
    user: "lalisters",
    time: "hace 2 h",
    text: "Cazamos el afiche de Recoleta con las chicas 💃🏻 subo el TikTok en un rato",
    likes: 891,
    comments: 173,
    image: laliAuto.url,
  },
];

const groups = [
  { name: "Team CABA", members: 3104, img: laliLogo.url },
  { name: "LALIVERSE", members: 9412, img: simbolos33.url },
  { name: "Trivia diaria", members: 6187, img: albumCover.url },
];

const stickers = [
  { src: stickerNvaa.url, label: "No vayas a atender cuando el demonio llama" },
  { src: simbolos33.url, label: "Pentagrama 33" },
  { src: laliLogo.url, label: "LALI." },
  { src: albumCover.url, label: "Tapa del álbum" },
  { src: PHOTOS.saint, label: "Santa LALI" },
  { src: PHOTOS.childhood, label: "LALI de chiquita" },
  { src: PHOTOS.teen, label: "LALI retro" },
  { src: PHOTOS.veil, label: "LALI en vivo" },
];

// Feed de cada fandom (LALI tiene el suyo más arriba).
const OTHER_FEEDS: Record<string, Post[]> = {
  "arjona-seco": [
    { kind: "achievement", user: "vale.arjonista", time: "hace 6 min", achievement: "entró al TOP 60 y va por las entradas 🎟️", pts: 0 },
    { kind: "post", user: "marce.seco", time: "hace 20 min", text: "12 fechas en el Movistar Arena y yo quiero estar en las 12 😭 ¿quién más va a varias?", likes: 734, comments: 0, image: arBrazos },
    { kind: "post", user: "gabi.historias", time: "hace 1 h", text: "La tapa de Seco con la foto de chiquito es lo más lindo que hizo. Todo el disco suena a carta vieja ✉️", likes: 512, comments: 0, image: arjonaPortada },
    { kind: "post", user: "lucho.trovador", time: "hace 3 h", text: "Voy por el meet & greet. Trivia diaria todos los días hasta el show 💪", likes: 289, comments: 0, image: arGuitarraNegra },
    { kind: "post", user: "sole.movistar", time: "hace 5 h", text: "Ya tengo armada la playlist para la previa del Seco Tour 🎶", likes: 198, comments: 0, image: arRetrato },
    { kind: "post", user: "cande.arjonista", time: "hace 6 h", text: "Con la camiseta argentina en el escenario 🇦🇷 Ese show no me lo olvido más", likes: 1204, comments: 0, image: arArgentina },
    { kind: "post", user: "fede.letras", time: "hace 7 h", text: "Versión acústica a la luz de las velas. Si hace algo así en el Movistar me muero 🕯️", likes: 876, comments: 0, image: arVelas },
    { kind: "post", user: "mica.historias", time: "hace 8 h", text: "Esa sonrisa cuando el público canta solo 🥹", likes: 643, comments: 0, image: arSonrisa },
    { kind: "post", user: "nico.trovador", time: "hace 9 h", text: "Sentado en el banco, la voz y nada más. Así se cuenta una historia 🎭", likes: 588, comments: 0, image: arBancoTeatro },
    { kind: "post", user: "lu.seco", time: "hace 10 h", text: "Modo lectura antes de escribir el próximo disco 📖☕", likes: 421, comments: 0, image: arLibro },
    { kind: "post", user: "romi.movistar", time: "hace 12 h", text: "Pantalla en blanco y negro y la guitarra negra. Estética Seco total 🖤", likes: 512, comments: 0, image: arBlancoYNegro },
    { kind: "post", user: "tincho.arjona", time: "hace 14 h", text: "El gorro rosa 💗 nadie más lo puede llevar así", likes: 367, comments: 0, image: arGorroRosa },
    { kind: "post", user: "pau.cartas", time: "hace 16 h", text: "Camisa blanca y micrófono: el combo de siempre que nunca falla 🎤", likes: 455, comments: 0, image: arCamisaBlanca },
    { kind: "post", user: "agus.fila", time: "hace 18 h", text: "Sentado en el baúl como en una vieja estación de tren 🚂 qué puesta", likes: 298, comments: 0, image: arBaul },
    { kind: "post", user: "dani.arjonista", time: "hace 1 d", text: "Foto en blanco y negro por la calle. Se le nota feliz 😄", likes: 712, comments: 0, image: arCalleBn },
    { kind: "post", user: "sofi.trivia", time: "hace 1 d", text: "Fondo de pantalla nuevo, gracias 😎", likes: 389, comments: 0, image: arLentes },
    { kind: "post", user: "joaco.seco", time: "hace 1 d", text: "El maquillaje de payaso fue de las cosas más locas que hizo en un show 🎩", likes: 534, comments: 0, image: arPayaso },
    { kind: "post", user: "flor.canciones", time: "hace 2 d", text: "Ese micrófono de pie y la camisa blanca. Clásico 🤍", likes: 276, comments: 0, image: arPieDeMicro },
  ],
  "adela-prima": [
    { kind: "achievement", user: "prima.sofi", time: "hace 5 min", achievement: "completó la trivia de PRIMA 5/5", pts: 200 },
    { kind: "post", user: "cande.fucsia", time: "hace 25 min", text: "Ya me teñí de fucsia para el Vorterix 💗 ¿quién más?", likes: 641, comments: 103, image: adelaLengua },
    { kind: "post", user: "juanma.lolla", time: "hace 1 h", text: "Sideshow de Lolla con PRIMA entero en vivo. No lo puedo creer ⭐", likes: 422, comments: 58, image: adelaEstrellas },
    { kind: "post", user: "ro.glitter", time: "hace 3 h", text: "Tutorial de la estrella de glitter para ir al show, lo subo hoy 🌟", likes: 318, comments: 77, image: adelaGlitter },
  ],
  "dillom-lnv": [
    { kind: "achievement", user: "rocio.violenta", time: "hace 8 min", achievement: "completó la trivia de La nueva violencia 5/5", pts: 200 },
    { kind: "post", user: "tomas.dllm", time: "hace 30 min", text: "La nueva violencia de punta a punta sin saltear nada. Dillom no erra 🩷🖤", likes: 534, comments: 87, image: dlEscenarioRojo },
    { kind: "post", user: "agus.gira", time: "hace 2 h", text: "¿Quién va a La gira violenta en Mendoza? Armemos grupo 🎤", likes: 211, comments: 64, image: dlGorroBackstage },
    { kind: "post", user: "lu.anteojos", time: "hace 4 h", text: "Ya tengo el traje y los anteojos para el show 🕶️", likes: 389, comments: 42, image: dlEscenarioAgachado },
    { kind: "post", user: "cami.violenta", time: "hace 5 h", text: "Camisa rota, cadenas y candado. La estética de esta era es otra cosa ⛓️", likes: 612, comments: 71, image: dlCamisaCadenas },
    { kind: "post", user: "dante.fan", time: "hace 6 h", text: "Dillom y LALI juntos en la fiesta, no estoy bien 😭", likes: 1480, comments: 203, image: dlConLali },
    { kind: "post", user: "pili.gatos", time: "hace 8 h", text: "Nadie habla de lo tierno que es con su gato 🐈", likes: 2210, comments: 156, image: dlGato },
    { kind: "post", user: "nico.retratos", time: "hace 10 h", text: "Backstage antes del show. Esa mirada dice todo.", likes: 498, comments: 33, image: dlRetrato },
    { kind: "post", user: "flor.rs", time: "hace 12 h", text: "Volví a ver la sesión de Rolling Stone. Los guantes de esqueleto 💀", likes: 743, comments: 58, image: dlRollingStone },
    { kind: "post", user: "joaco.xeneize", time: "hace 1 día", text: "Con la de Boca y una birra, el Dillom de siempre 💙💛", likes: 905, comments: 112, image: dlBoca },
    { kind: "post", user: "sofi.fisheye", time: "hace 1 día", text: "Esta foto con ojo de pez es mi fondo de pantalla desde hace meses", likes: 367, comments: 29, image: dlFisheye },
    { kind: "post", user: "mati.noche", time: "hace 2 días", text: "Fotos de la fiesta de lanzamiento. Qué noche 🖤", likes: 822, comments: 64, image: dlFiestaRayas },
    { kind: "post", user: "valen.ramos", time: "hace 2 días", text: "Throwback: el Dillom de las rosas 🌹", likes: 455, comments: 37, image: dlRosas },
    { kind: "post", user: "juli.after", time: "hace 3 días", text: "Anteojos negros hasta en el after 😎", likes: 318, comments: 21, image: dlFiestaAnteojos },
    { kind: "post", user: "ema.burbujas", time: "hace 4 días", text: ":3", likes: 1890, comments: 240, image: dlBano },
    { kind: "post", user: "mora.alfileres", time: "hace 5 días", text: "El gorro de conejo con alfileres y cruces. Ícono.", likes: 676, comments: 48, image: dlConejo },
    { kind: "post", user: "fan.de.dillom", time: "hace 2 min", text: "te quiero mucho dillom, toma 100 pesos", likes: 1312, comments: 0, pinned: true },
    { kind: "post", user: "mama.de.dillom", time: "hace 1 min", text: "mamaaaaa dillom quiere otra milanesa", likes: 2047, comments: 0, image: dlMilanesa, pinned: true },
  ],
  airbag: [
    { kind: "achievement", user: "sardelli.fan", time: "hace 12 min", achievement: "completó la trivia de El Club de la Pelea 5/5", pts: 200 },
    { kind: "post", user: "juli.rockea", time: "hace 45 min", text: "Anarquía en Buenos Aires en loop desde que salió. Primera regla del club: no hablar del club 🚬", likes: 287, comments: 36, image: abCalaverasJuntas },
    { kind: "post", user: "nacho.donto", time: "hace 2 h", text: "Verte de cerca para cerrar el disco es una locura. ¿Cuál es su favorito?", likes: 194, comments: 58, image: abGuitarraRoja },
    { kind: "post", user: "mica.airbag", time: "hace 5 h", text: "Ya tengo la entrada, nos vemos en el pogo 🤘", likes: 402, comments: 71, image: abEscenarioTrio },
    { kind: "post", user: "tincho.luna", time: "hace 6 h", text: "Los tres en la puerta del Luna Park. Historia pura 🖤", likes: 688, comments: 54, image: abLunaPark },
    { kind: "post", user: "romi.gibson", time: "hace 8 h", text: "El papelito cayendo y los tres riéndose. La mejor foto del show 🎸", likes: 941, comments: 87, image: abBynGibson },
    { kind: "post", user: "fede.rock", time: "hace 10 h", text: "Gorra roja y anteojos negros, el uniforme oficial 🧢", likes: 512, comments: 39, image: abGorraRoja },
    { kind: "post", user: "cande.pogo", time: "hace 12 h", text: "Así abrazados tocando. Se nota que son hermanos 🫂", likes: 1104, comments: 96, image: abAbrazoGuitarra },
    { kind: "post", user: "lu.club", time: "hace 1 día", text: "Que alguien me explique este pelo en pleno show ⚡", likes: 1520, comments: 211, image: abPeloElectrico },
    { kind: "post", user: "bruno.bajo", time: "hace 1 día", text: "Dejándolo todo en el escenario. Esa cara lo dice todo 😂", likes: 1310, comments: 178, image: abGrito },
    { kind: "post", user: "sofi.vintage", time: "hace 2 días", text: "Throwback a cuando eran unos nenes 🥹", likes: 2045, comments: 260, image: abChicos },
    { kind: "post", user: "maxi.sillon", time: "hace 2 días", text: "La sesión de fotos del disco está buenísima. Este sillón es todo", likes: 433, comments: 31, image: abSillon },
    { kind: "post", user: "agus.bufanda", time: "hace 3 días", text: "Me lo crucé en la terminal con esta bufanda gigante, el más humilde 🧣", likes: 876, comments: 102, image: abBufanda },
    { kind: "post", user: "pato.fan", time: "hace 4 días", text: "Los tres en el camarín, nada más que agregar", likes: 597, comments: 44, image: abSelfieTrio },
    { kind: "post", user: "vale.cejas", time: "hace 5 días", text: "Las caras de estos dos 😂😂", likes: 734, comments: 69, image: abSelfieDos },
    { kind: "post", user: "joaco.gira", time: "hace 6 días", text: "Ese momento de la noche en que se tiran besos con el público 💋", likes: 359, comments: 27, image: abBesoEscenario },
  ],
  dillom: [
    { kind: "achievement", user: "bauti.correa", time: "hace 2 semanas", achievement: "terminó #1 en el ranking final de Por cesárea", pts: 0 },
    { kind: "post", user: "ivoperalta", time: "hace 2 semanas", text: "El momento de los globos en el show no me lo olvido más 🎈🖤", likes: 1240, comments: 168, image: pcGlobosVuelo },
    { kind: "post", user: "facu.aguirre", time: "hace 3 semanas", text: "Sentado con los globos cantando… Por cesárea en vivo fue otra cosa.", likes: 876, comments: 94, image: pcGlobosSilla },
    { kind: "post", user: "meli.oscura", time: "hace 3 semanas", text: "La estética de esta era: laboratorio, frascos viejos y anteojos negros.", likes: 512, comments: 47, image: pcLaboratorio },
    { kind: "post", user: "santi.cesarea", time: "hace 4 semanas", text: "Escuché Por cesárea de punta a punta otra vez. Cada vez encuentro algo nuevo 🖤", likes: 312, comments: 41 },
  ],
  maria: [
    { kind: "achievement", user: "brenda.luna", time: "hace 3 semanas", achievement: "terminó #1 en el ranking final de Quimera", pts: 0 },
    { kind: "post", user: "cami.brava", time: "hace 3 semanas", text: "Qué drop hermoso fue Quimera 💙 gracias a todas las que jugaron conmigo", likes: 980, comments: 133 },
    { kind: "post", user: "male.figueroa", time: "hace 4 semanas", text: "Última trivia de Quimera completada. ¡Nos vemos en el próximo!", likes: 421, comments: 57 },
  ],
  tini: [
    { kind: "post", user: "tati.rojas", time: "hace 2 h", text: "¿Alguien más vio la cuenta regresiva? Algo se viene con TINI 👀", likes: 655, comments: 98 },
  ],
};
const OTHER_GROUPS: Record<string, typeof groups> = {
  "arjona-seco": [
    { name: "Arjonistas", members: 15230, img: arArgentina },
    { name: "Fila del Movistar", members: 4870, img: arSonrisa },
    { name: "Cartas de Seco", members: 3120, img: arLibro },
  ],
  "adela-prima": [
    { name: "Primas", members: 7340, img: adelaAuto },
    { name: "Fila Vorterix", members: 1980, img: adelaEscenario },
    { name: "Glitter y estrellas", members: 2760, img: adelaGrito },
  ],
  dillom: [
    { name: "Comunidad Dillom", members: 9870, img: pcGlobosSilla },
    { name: "Los globos", members: 4310, img: pcGlobosVuelo },
    { name: "Caras de cesárea", members: 2650, img: pcCaras },
  ],
  "dillom-lnv": [
    { name: "La gira violenta", members: 11240, img: dlEscenarioRojo },
    { name: "Trajes y anteojos", members: 3870, img: dlEscenarioAgachado },
    { name: "Los violentos", members: 6520, img: dlCamisaCadenas },
  ],
  airbag: [
    { name: "El Club", members: 8420, img: abEscenarioTrio },
    { name: "Pogo en primera fila", members: 2310, img: abGuitarraRoja },
    { name: "Calaveras", members: 3150, img: abCalaverasJuntas },
  ],
};

type Card = {
  key: string; user: string; time: string; text: string; image?: string; avatar?: string | null;
  likes: number; comments: number; liked: boolean; mine?: boolean; fan?: Fan; postId?: string; local?: boolean;
};

export function ComunidadView() {
  const { profile, mode } = useDropAuth();
  const drop = useCurrentDrop();
  const isLali = drop.id === "lali";
  const isUser = mode === "user";
  const dropFeed = isLali ? feed : OTHER_FEEDS[drop.id] ?? [];
  const dropGroups = isLali ? groups : OTHER_GROUPS[drop.id] ?? [{ name: drop.fandom, members: 1200 + drop.id.length * 731, img: drop.cover }];
  const [joined, setJoined] = useState<string[]>(() => readLocal<string[]>("drop-grupos", []));
  const postsKey = isLali ? "drop-mis-posts" : `drop-mis-posts-${drop.id}`;
  // Los invitados no tienen cuenta: sus posteos quedan solo en este teléfono.
  const [myPosts, setMyPosts] = useState<Post[]>(() => readLocal<Post[]>(postsKey, []));
  const [draft, setDraft] = useState("");
  const [sticker, setSticker] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [dbPosts, setDbPosts] = useState<FeedPost[]>([]);
  const [stats, setStats] = useState<SeedStats>({});
  const [openComments, setOpenComments] = useState<Card | null>(null);
  const [fan, setFan] = useState<Fan | null>(null);
  useEffect(() => writeLocal("drop-grupos", joined), [joined]);
  useEffect(() => writeLocal(postsKey, myPosts.slice(0, 20)), [myPosts, postsKey]);
  const handle = (profile.username?.trim() || profile.display_name || "fan").replace(/^@/, "");
  const seedKey = (i: number) => `seed:${drop.id}:${i}`;

  async function loadFeed() {
    const keys = dropFeed.map((p, i) => (p.kind === "post" ? seedKey(i) : null)).filter(Boolean);
    const { data } = await sb.rpc<{ posts: FeedPost[]; stats: SeedStats }>("drop_feed", { p_campaign: drop.id, p_seed_keys: keys });
    if (!data) return;
    setDbPosts(data.posts ?? []); setStats(data.stats ?? {});
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { void loadFeed(); }, [drop.id, mode]);

  const cards: (Card | Extract<Post, { kind: "achievement" }>)[] = [
    ...myPosts.flatMap((p, i) => (p.kind === "post" ? [{ key: `local:${i}`, user: p.user, time: p.time, text: p.text, image: p.image, avatar: p.avatar, likes: 0, comments: 0, liked: false, mine: true, local: true }] : [])),
    ...dbPosts.map((p): Card => ({
      key: p.key, user: p.author, time: timeAgo(p.created_at), text: p.text, image: p.sticker ?? undefined, avatar: p.avatar,
      likes: p.likes, comments: p.comments, liked: p.liked, mine: p.mine, postId: p.id,
      fan: { id: p.user_id, name: p.author, avatar: p.avatar, following: p.following },
    })),
    ...dropFeed.map((p, i) => [p, i] as const)
      .sort(([a, ia], [b, ib]) => {
        const pa = a.kind === "post" && !!a.pinned, pb = b.kind === "post" && !!b.pinned;
        // Fijados primero, el más nuevo (último agregado) arriba.
        return pa !== pb ? Number(pb) - Number(pa) : pa ? ib - ia : ia - ib;
      })
      .map(([p, i]) => {
        if (p.kind === "achievement") return p;
        const st = stats[seedKey(i)];
        return { key: seedKey(i), user: p.user, time: p.time, text: p.text, image: p.image, avatar: p.avatar, likes: p.likes + (st?.likes ?? 0), comments: st?.comments ?? 0, liked: !!st?.liked };
      }),
  ];

  const patchCard = (key: string, f: (c: { likes: number; comments: number; liked: boolean }) => { likes: number; comments: number; liked: boolean }) => {
    if (key.startsWith("p:")) setDbPosts((ps) => ps.map((p) => (p.key === key ? { ...p, ...f(p) } : p)));
    else setStats((s) => ({ ...s, [key]: f(s[key] ?? { likes: 0, comments: 0, liked: false }) }));
  };

  async function toggleLike(c: Card) {
    if (c.local) return;
    if (!isUser) { toast.message("Creá tu cuenta para dar like", { description: "Así tus likes y comentarios quedan guardados." }); return; }
    const like = !c.liked;
    patchCard(c.key, (x) => ({ ...x, liked: like, likes: x.likes + (like ? 1 : -1) }));
    const q = like ? sb.from("post_likes").insert({ post_key: c.key }) : sb.from("post_likes").delete().eq("post_key", c.key).eq("user_id", profile.id);
    const { error } = await q;
    if (error) { patchCard(c.key, (x) => ({ ...x, liked: !like, likes: x.likes + (like ? -1 : 1) })); toast.error("No se pudo guardar el like"); }
  }

  const publish = async () => {
    if (!draft.trim() && !sticker) { toast.error("Escribí algo o elegí un sticker"); return; }
    if (!isUser) {
      setMyPosts((p) => [{ kind: "post", user: handle, time: "recién", text: draft.trim(), likes: 0, comments: 0, image: sticker ?? undefined, avatar: profile.avatar_url, mine: true }, ...p]);
      toast.success("Publicado en este teléfono", { description: "Creá tu cuenta para que lo vean todos los fans." });
    } else {
      setPosting(true);
      const { error } = await sb.from("community_posts").insert({ campaign_id: drop.id, text: draft.trim().slice(0, 500), sticker });
      setPosting(false);
      if (error) { toast.error("No se pudo publicar"); return; }
      toast.success("Publicado en Comunidad");
      await loadFeed();
    }
    setDraft(""); setSticker(null);
  };

  async function removePost(c: Card) {
    if (c.local) { setMyPosts((p) => p.filter((_, i) => `local:${i}` !== c.key)); return; }
    const { error } = await sb.from("community_posts").delete().eq("id", c.postId);
    if (error) { toast.error("No se pudo borrar"); return; }
    toast.success("Posteo borrado"); await loadFeed();
  }

  const sharePost = async (p: Card) => {
    const text = `@${p.user} en DROP: ${p.text}`;
    const url = `${window.location.origin}/drop`;
    try {
      if (navigator.share) await navigator.share({ title: "DROP · Comunidad", text, url });
      else { await navigator.clipboard.writeText(`${text} ${url}`); toast.success("Copiado para compartir"); }
    } catch { /* cancelado */ }
  };

  // Al seguir/dejar de seguir, actualizamos todos los posteos de ese fan.
  const onFanChange = (f: Fan) => {
    setFan(f);
    setDbPosts((ps) => ps.map((p) => (p.user_id === f.id ? { ...p, following: f.following } : p)));
  };

  return (
    <div className="px-5">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{drop.fandom}</p>
        <h1 className="text-3xl font-black">Comunidad</h1>
        <p className="text-sm text-muted-foreground">
          {drop.status === "archived" ? `Lo que vivieron los fans de ${drop.artist} en ${drop.title}.` : `Lo que están compartiendo los fans de ${drop.artist}.`}
        </p>
      </div>

      {/* Composer */}
      <section className="mb-6 rounded-2xl border border-border bg-card p-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          maxLength={500}
          placeholder="Contá qué encontraste hoy…"
          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {(isLali ? stickers : [{ src: drop.cover, label: drop.title }]).map((s) => (
            <button
              key={s.label}
              onClick={() => setSticker(sticker === s.src ? null : s.src)}
              className={`h-11 w-11 shrink-0 overflow-hidden rounded-xl border-2 ${
                sticker === s.src ? "border-primary" : "border-border"
              }`}
              aria-label={`Sticker ${s.label}`}
            >
              <img loading="lazy" decoding="async" src={s.src} alt={s.label} className="h-full w-full object-cover" />
            </button>
          ))}
          <button
            onClick={() => void publish()}
            disabled={posting}
            className="mt-1 flex w-full items-center justify-center gap-1 rounded-xl px-4 py-2.5 text-sm font-black text-primary-foreground disabled:opacity-60"
            style={{ backgroundImage: "var(--gradient-drop)" }}
          >
            {posting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />} Publicar
          </button>
        </div>
      </section>

      <FanSearch onOpenFan={setFan} />

      {/* Groups */}
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        Grupos
      </h2>
      <div className={`mb-6 grid gap-3 ${dropGroups.length >= 3 ? "grid-cols-3" : dropGroups.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
        {dropGroups.map((g) => {
          const isIn = joined.includes(g.name);
          return (
            <button
              key={g.name}
              onClick={() => {
                setJoined((j) => (isIn ? j.filter((n) => n !== g.name) : [...j, g.name]));
                toast[isIn ? "message" : "success"](
                  isIn ? `Saliste de ${g.name}` : `Te uniste a ${g.name}`
                );
              }}
              className={`min-w-0 rounded-2xl border p-3 text-left ${
                isIn ? "border-primary bg-primary/10" : "border-border bg-card"
              }`}
            >
              <img loading="lazy" decoding="async"
                src={g.img}
                alt={g.name}
                className="mb-2 h-10 w-10 rounded-xl object-cover object-[center_20%]"
              />
              <p className="text-sm font-semibold">{g.name}</p>
              <p className="text-xs text-muted-foreground">{(g.members + (isIn ? 1 : 0)).toLocaleString("es-AR")} fans</p>
              <p className="mt-1 text-[11px] font-bold text-primary">
                {isIn ? "Unido ✓" : "Unirme"}
              </p>
            </button>
          );
        })}
      </div>

      {/* Feed */}
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        Actividad
      </h2>
      <div className="space-y-3">
        {cards.map((p, i) =>
          "kind" in p ? (
            <div
              key={`a${i}`}
              className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-3"
            >
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-primary-foreground"
                style={{ backgroundImage: "var(--gradient-drop)" }}
              >
                <Trophy className="h-4 w-4" />
              </div>
              <div className="flex-1 text-xs">
                <p>
                  <span className="font-bold">@{p.user}</span> {p.achievement}
                  {p.pts > 0 && (
                    <span className="ml-1 font-bold text-primary">+{p.pts} pts</span>
                  )}
                </p>
                <p className="text-[11px] text-muted-foreground">{p.time}</p>
              </div>
            </div>
          ) : (
            <article key={p.key} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="p-4 pb-3">
                <header className="mb-2 flex items-center gap-3">
                  <button
                    onClick={() => p.fan && !p.mine && setFan(p.fan)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    disabled={!p.fan || p.mine}
                  >
                    <img loading="lazy" decoding="async" src={p.avatar || avatarFor(p.user)} alt={`Foto de ${p.user}`} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{p.fan ? p.user : `@${p.user}`}</span>
                      <span className="block text-[11px] text-muted-foreground">{p.time}{p.local ? " · solo en este teléfono" : ""}</span>
                    </span>
                  </button>
                  {p.fan && !p.mine && isUser && (
                    <FollowButton small fan={p.fan} onChange={(following) => onFanChange({ ...p.fan!, following })} />
                  )}
                </header>
                {p.text && <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{p.text}</p>}
              </div>

              {p.image && (
                <img decoding="async"
                  src={p.image}
                  alt={`Publicación de ${p.user}`}
                  loading="lazy"
                  className={p.fan || p.local ? "mx-4 mb-1 h-32 w-32 rounded-xl object-cover" : "max-h-[30rem] w-full object-cover object-[center_22%]"}
                />
              )}

              <footer className="flex items-center justify-between p-4 pt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => void toggleLike(p)}
                    disabled={p.local}
                    aria-label={p.liked ? "Quitar me gusta" : "Me gusta"}
                    className={`flex items-center gap-1 ${p.liked ? "text-primary" : ""}`}
                  >
                    <Heart className={`h-4 w-4 ${p.liked ? "fill-current" : ""}`} /> {p.likes}
                  </button>
                  {!p.local && (
                    <button onClick={() => setOpenComments(p)} aria-label="Comentarios" className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" /> {p.comments}
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {p.mine && (
                    <button onClick={() => void removePost(p)} aria-label="Borrar posteo" className="flex items-center gap-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  <button onClick={() => void sharePost(p)} className="flex items-center gap-1 font-semibold">
                    <Share2 className="h-4 w-4" /> Compartir
                  </button>
                </div>
              </footer>
            </article>
          )
        )}
      </div>

      <CommentsDrawer
        postKey={openComments?.key ?? null}
        title={openComments ? `${openComments.user}: ${openComments.text}` : ""}
        onClose={() => setOpenComments(null)}
        onCountChange={(key, d) => patchCard(key, (x) => ({ ...x, comments: Math.max(0, x.comments + d) }))}
        onOpenFan={(f) => { setOpenComments(null); setFan(f); }}
      />
      <FanDrawer fan={fan} onClose={() => setFan(null)} onChange={onFanChange} />
    </div>
  );
}

function readLocal<T>(key: string, fallback: T): T {
  try { const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null; return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
}
function writeLocal(key: string, value: unknown) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin almacenamiento */ }
}
