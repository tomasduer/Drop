import { r as reactExports } from "../_libs/react.mjs";
import { u as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { u as useDropAuth } from "./AuthProvider-pBFqfWgR.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";
const FONT_OPTIONS = [
  "Bricolage Grotesque",
  "Anton",
  "Bebas Neue",
  "Archivo Black",
  "Alfa Slab One",
  "Rubik Dirt",
  "Special Elite",
  "Space Mono",
  "Playfair Display",
  "DM Serif Display",
  "Syne",
  "Covered By Your Grace",
  "Permanent Marker",
  "Inter"
];
let cache = null;
let inflight = null;
const listeners = /* @__PURE__ */ new Set();
async function fetchContent() {
  const { data, error } = await supabase.from("drop_content").select("*");
  if (error) return cache ?? [];
  return data ?? [];
}
async function reloadDropContent() {
  inflight = fetchContent();
  const rows = await inflight;
  cache = rows;
  inflight = null;
  listeners.forEach((l) => l(rows));
  return rows;
}
function useDropContent() {
  const [rows, setRows] = reactExports.useState(cache ?? []);
  reactExports.useEffect(() => {
    listeners.add(setRows);
    if (cache) setRows(cache);
    else if (!inflight) void reloadDropContent();
    return () => {
      listeners.delete(setRows);
    };
  }, []);
  return rows;
}
const HEX = /^#[0-9a-f]{6}$/i;
const SAFE_ID = /^[a-z0-9-]+$/;
const hex = (v, fallback) => v && HEX.test(v) ? v : fallback;
function readableOn(color) {
  const n = parseInt(color.slice(1), 16);
  const [r, g, b] = [n >> 16 & 255, n >> 8 & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "#141414" : "#ffffff";
}
function themeCss(id, theme, selector) {
  if (!selector && !SAFE_ID.test(id)) return "";
  const light = !!theme.light;
  const bg = hex(theme.background, light ? "#f7f5f2" : "#141414");
  const fg = light ? "#161616" : "#f6f5f2";
  const primary = hex(theme.primary, "#ef4203");
  const accent = hex(theme.accent, primary);
  const font = FONT_OPTIONS.includes(theme.font) ? theme.font : "Bricolage Grotesque";
  const mix = (a, b, pct) => `color-mix(in oklab, ${a}, ${b} ${pct}%)`;
  const alpha = (c, pct) => `color-mix(in oklab, ${c} ${pct}%, transparent)`;
  return `${selector ?? `html[data-drop="${id}"]`} {
  --background: ${bg};
  --foreground: ${fg};
  --card: ${mix(bg, fg, light ? 3 : 6)};
  --card-foreground: ${fg};
  --popover: ${mix(bg, fg, light ? 3 : 6)};
  --popover-foreground: ${fg};
  --muted: ${mix(bg, fg, 10)};
  --muted-foreground: ${mix(fg, bg, 35)};
  --secondary: ${mix(bg, primary, 14)};
  --secondary-foreground: ${fg};
  --border: ${mix(bg, primary, 28)};
  --input: ${mix(bg, fg, 14)};
  --primary: ${primary};
  --primary-foreground: ${readableOn(primary)};
  --ring: ${primary};
  --accent: ${accent};
  --accent-foreground: ${readableOn(accent)};
  --gradient-drop: linear-gradient(105deg, ${mix(primary, "#000", 22)}, ${primary} 55%, ${accent});
  --gradient-drop-soft: linear-gradient(145deg, ${alpha(primary, 20)}, ${alpha(accent, 6)});
  --gradient-glow: radial-gradient(circle at 20% 0%, ${alpha(primary, 26)}, transparent 50%), radial-gradient(circle at 100% 85%, ${alpha(accent, 12)}, transparent 45%);
  --shadow-glow: 0 10px 30px -10px ${alpha(primary, 55)};
  --font-display: "${font}", "Inter", system-ui, sans-serif;
  --display-transform: ${theme.uppercase ? "uppercase" : "none"};
  --texture-opacity: ${light ? 0.05 : 0.1};
}`;
}
function useIsDropAdmin(userId) {
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    let alive = true;
    void supabase.rpc("is_drop_admin").then(({ data }) => {
      if (alive) setIsAdmin(!!data);
    }, () => {
      if (alive) setIsAdmin(false);
    });
    return () => {
      alive = false;
    };
  }, [userId]);
  return isAdmin;
}
const eventCrowd = "/assets/event-crowd-pqXgaj4h.jpg";
const url$3 = "/assets/album-cover-CSPWEPc-.webp";
const laliCover = { url: url$3 };
const url$2 = "/assets/drop-photo-18-BcbhGCcH.webp";
const mariaCover = { url: url$2 };
const url$1 = "/assets/drop-photo-19-Cy9DStE8.webp";
const dillomCover = { url: url$1 };
const dillomIcon = "/assets/dillom-icon-BIsXTXT6.webp";
const laliIcon = "/assets/lali-icon-hR1FfOow.webp";
const tiniIcon = "/assets/tini-icon-CFGMvhUy.webp";
const airbagCover = "/assets/airbag-portada-VgzPFab_.webp";
const lnvCover = "/assets/lnv-portada-C9XXr7Nn.webp";
const lnvIcon = "/assets/lnv-icon-BEolBGEv.webp";
const adelaCover = "/assets/adela-portada-DTz_iPIl.webp";
const adelaHero = "/assets/adela-hero-DevqcWpF.webp";
const adelaIcon = "/assets/adela-icon-5hZPbTcV.webp";
const airbagIcon = "/assets/airbag-icon-BBND8sXL.webp";
const arjonaCover = "/assets/arjona-portada-CugK1Oao.webp";
const arjonaHero = "/assets/arjona-hero-xFYdEfnR.webp";
const arjonaIcon = "/assets/arjona-icon-Dvvs8trd.webp";
const mariaIcon = "/assets/maria-icon-CCLZQ-qC.webp";
const arjonaRed = "/assets/arjona-red-B71kw8xR.webp";
const arjonaSeco = "/assets/arjona-seco-no-dijo-BKAh2-zE.webp";
const lnvRemera = "/assets/lnv-remera-DI08IU79.webp";
const pcVinilo = "/assets/pc-vinilo-DQrK552M.webp";
const airbagRemera = "/assets/airbag-remera-Blp-rQGz.webp";
const airbagBuzo = "/assets/airbag-buzo-BymCMSwi.webp";
const airbagGorra = "/assets/airbag-gorra-Bgxjjj4Y.webp";
const arjonaRemera = "/assets/arjona-remera-DqfsLEF5.webp";
const arjonaTote = "/assets/arjona-tote-B8nYHhyS.webp";
const arjonaVaso = "/assets/arjona-vaso-DCt51Vph.webp";
const adelaRemera = "/assets/adela-remera-CX0eLs-W.webp";
const adelaBuzo = "/assets/adela-buzo-AFcpd9QX.webp";
const adelaCd = "/assets/adela-cd-xevgE70x.webp";
const adelaVinilo = "/assets/adela-vinilo-Cyo7TG1m.webp";
const mariaRemera = "/assets/maria-remera-DpA84vLK.webp";
const mariaGorra = "/assets/maria-gorra-DX2TeaE9.webp";
const mariaAbanico = "/assets/maria-abanico-esvINML2.webp";
const laliCamiseta = "/assets/lali-camiseta-33-CzLG5Fse.webp";
const laliRemeraDiva = "/assets/lali-remera-diva--X_1gUA6.webp";
const laliVinilo = "/assets/lali-vinilo-C_2oNFkK.webp";
const laliKit = "/assets/lali-kit-llamada-DO_-bsb4.webp";
const lnvPoster = "/assets/lnv-poster-t95s3els.webp";
const lnvGira = "/assets/lnv-gira-fk64Qobo.webp";
const adelaGlitter = "/assets/adela-glitter-CylVV7z1.webp";
const airbagBanda = "/assets/airbag-banda-CLtSCIDy.webp";
const url = "/assets/drop-photo-29-gYCg9hXd.webp";
const coverMechon = { url };
const KIND_LABEL = { album: "Nuevo álbum", single: "Nuevo single", show: "Show", noticia: "Novedad" };
const ARCHIVED_KIND_LABEL = { album: "Álbum", single: "Single", show: "Show", noticia: "Novedad" };
const DROP_CATALOG = [
  {
    id: "lali",
    kind: "album",
    artist: "LALI",
    title: "No vayas a atender cuando el demonio llama",
    tagline: "Atendé la llamada. Resolvé el misterio.",
    description: "Una búsqueda del tesoro alrededor del nuevo álbum: llamadas misteriosas, fragmentos inéditos, afiches con QR en la calle y un listening party para los primeros 150.",
    cover: laliIcon,
    hero: laliCover.url,
    album: laliCover.url,
    dates: "En curso · cierra con el listening party",
    status: "active",
    fandom: "LALIVERSE",
    merch: [
      { id: "remera", name: "Remera Diva", detail: "Negra, con tres fotos de LALI en vivo", price: 32e3, image: laliRemeraDiva },
      { id: "camiseta-33", name: "Camiseta 33", detail: "Estilo fútbol, con el sol y el escudo del álbum", price: 55e3, image: laliCamiseta },
      { id: "vinilo", name: "Vinilo del álbum", detail: "Vinilo negro, edición limitada", price: 78e3, image: laliVinilo },
      { id: "kit", name: "Kit de la llamada", detail: "Tote bag con las letras del álbum, vinilo y postales firmadas", price: 15e4, image: laliKit, top: 50 }
    ]
  },
  {
    id: "dillom-lnv",
    kind: "album",
    artist: "Dillom",
    title: "La nueva violencia",
    tagline: "Bienvenidos a la nueva violencia.",
    description: "Dillom vuelve con La nueva violencia y La gira violenta. Trivias diarias, acertijos y desafíos alrededor del disco. Sumá puntos y peleá el ranking del fandom.",
    cover: lnvIcon,
    hero: lnvCover,
    album: lnvCover,
    dates: "En curso · La gira violenta",
    status: "active",
    fandom: "La nueva violencia",
    merch: [
      { id: "remera", name: "Remera La nueva violencia", detail: "Fucsia, con la cara de Dillom", price: 3e4, image: lnvRemera },
      { id: "poster", name: "Póster de la gira", detail: "La gira violenta · 50 x 70 cm", price: 15e3, image: lnvGira },
      { id: "afiche", name: "Afiche firmado", detail: "Numerado, solo 20 copias", price: 22e3, image: lnvPoster, top: 20 }
    ]
  },
  {
    id: "dillom",
    kind: "album",
    artist: "Dillom",
    title: "Por cesárea",
    tagline: "El universo más oscuro del rap argentino.",
    description: "La experiencia de Por cesárea ya terminó. Volvé a recorrer sus juegos, mirá el ranking final y tus logros.",
    cover: dillomIcon,
    hero: dillomCover.url,
    album: dillomCover.url,
    dates: "Finalizado",
    status: "archived",
    fandom: "Comunidad Dillom",
    merch: [
      { id: "vinilo", name: "Vinilo Por cesárea", detail: "Edición limitada", price: 75e3, image: pcVinilo }
    ]
  },
  {
    id: "airbag",
    kind: "album",
    artist: "Airbag",
    title: "El Club de la Pelea I",
    tagline: "Primera regla: no le cuentes a nadie.",
    description: "Entrá al club. Trivias de los 7 temas, acertijos y desafíos alrededor de El Club de la Pelea I. Sumá puntos y peleá el ranking con los fans de Airbag.",
    cover: airbagIcon,
    hero: airbagBanda,
    album: airbagCover,
    dates: "En curso",
    status: "active",
    fandom: "El Club",
    merch: [
      { id: "remera", name: "Remera El Club", detail: "El Club de la Pelea II · Buenos Aires 2026", price: 3e4, image: airbagRemera },
      { id: "buzo", name: "Buzo Al final es el infierno", detail: "Negro, con calaveras y estampa en las mangas", price: 65e3, image: airbagBuzo },
      { id: "gorra", name: "Gorra El Club de la Pelea II", detail: "Negra, con el logo bordado", price: 25e3, image: airbagGorra, top: 30 }
    ]
  },
  {
    id: "arjona-seco",
    kind: "show",
    artist: "Ricardo Arjona",
    title: "Seco Tour en el Movistar Arena",
    spotifyAlbum: "Seco",
    tagline: "16 fechas en el Movistar Arena. Ganá entradas y un meet & greet.",
    description: "Ricardo Arjona llega al Movistar Arena con 16 fechas del Seco Tour, en mayo y julio. Jugá las misiones y subí en el ranking: los primeros 60 se ganan dos entradas y los primeros 10, además, un meet & greet con Arjona.",
    cover: arjonaIcon,
    hero: arjonaHero,
    album: arjonaCover,
    dates: "Seco Tour · Movistar Arena · mayo y julio 2027",
    status: "active",
    fandom: "Arjonistas",
    showDates: { label: "Movistar Arena · 21 h", dates: ["Sáb 1/5", "Dom 2/5", "Lun 3/5", "Vie 7/5", "Sáb 8/5", "Mar 11/5", "Mié 12/5", "Lun 17/5", "Mar 18/5", "Mié 19/5", "Dom 23/5", "Lun 24/5", "Mar 25/5", "Jue 1/7", "Vie 2/7", "Lun 5/7"] },
    prizes: [
      { top: 10, label: "Meet & greet con Ricardo Arjona + dos entradas" },
      { top: 60, label: "Dos entradas para el Seco Tour" }
    ],
    merch: [
      { id: "remera", name: "Remera Seco Tour", detail: "Blanca con manga negra y la foto de Seco", price: 35e3, image: arjonaRemera },
      { id: "tote", name: "Tote bag Seco", detail: "Con la ilustración de Seco y Arjona", price: 22e3, image: arjonaTote },
      { id: "vaso", name: "Vaso térmico Seco", detail: "Con los stickers del álbum", price: 28e3, image: arjonaVaso },
      { id: "poster", name: "Póster firmado", detail: "Lo que el Seco no dijo · numerado", price: 25e3, image: arjonaSeco, top: 60 },
      { id: "buzo", name: "Buzo Arjonistas", detail: "Edición única para el top 10", price: 6e4, image: arjonaRed, top: 10 }
    ]
  },
  {
    id: "adela-prima",
    kind: "show",
    artist: "Adela",
    title: "PRIMA en el Teatro Vorterix",
    spotifyAlbum: "PRIMA",
    launchAt: "2027-03-18T21:00:00-03:00",
    tagline: "Sideshow de Lollapalooza. Una sola noche.",
    description: "Adela presenta su nuevo álbum PRIMA en un sideshow de Lollapalooza en el Teatro Vorterix. Activá el aviso y enterate primero cuando abran las misiones.",
    cover: adelaIcon,
    hero: adelaHero,
    album: adelaCover,
    dates: "Próximamente · Sideshow de Lollapalooza · Teatro Vorterix",
    status: "upcoming",
    fandom: "Primas",
    merch: [
      { id: "vinilo", name: "Vinilo PRIMA", detail: "Vinilo rosa, edición limitada", price: 8e4, image: adelaVinilo },
      { id: "remera", name: "Remera PRIMA", detail: "Blanca, con PRIMA sobre el logo de Adela", price: 28e3, image: adelaRemera },
      { id: "buzo", name: "Buzo Alas", detail: "Negro, con alas fucsia en la espalda", price: 6e4, image: adelaBuzo },
      { id: "cd", name: "CD The Baddest Bitches Are In The USA", detail: "Edición física", price: 25e3, image: adelaCd },
      { id: "tote", name: "Tote bag glitter", detail: "Brilla con las luces del show", price: 16e3, image: adelaGlitter }
    ]
  },
  {
    id: "tini",
    artist: "TINI",
    title: "Nueva era",
    launchAt: "2026-12-04T00:00:00-03:00",
    tagline: "Algo nuevo se viene.",
    description: "TINI prepara una nueva etapa. Activá el aviso y enterate primero cuando abra el drop.",
    cover: tiniIcon,
    hero: coverMechon.url,
    album: coverMechon.url,
    dates: "Próximamente",
    status: "upcoming",
    fandom: "Tinistas"
  },
  {
    id: "maria",
    kind: "album",
    artist: "María Becerra",
    title: "Quimera",
    tagline: "El drop que cerró a lo grande.",
    description: "La experiencia de Quimera ya terminó. Volvé a recorrer sus juegos, mirá el ranking final y tus logros.",
    cover: mariaIcon,
    hero: mariaCover.url,
    album: mariaCover.url,
    dates: "Finalizado hace 3 semanas",
    status: "archived",
    fandom: "Nenas de Argentina",
    merch: [
      { id: "remera", name: "Remera Quimera", detail: "Negra, edición Movistar Arena", price: 32e3, image: mariaRemera },
      { id: "vinilo", name: "Vinilo Quimera", detail: "Edición limitada", price: 76e3, image: mariaCover.url },
      { id: "gorra", name: "Gorra Quimera", detail: "Beige, con la B bordada y quimera atrás", price: 25e3, image: mariaGorra },
      { id: "abanico", name: "Abanico JOJO", detail: "Rojo, con el escorpión de Quimera", price: 12e3, image: mariaAbanico }
    ]
  }
];
const fromDb = (s) => s === "active" ? "active" : s === "closed" ? "archived" : "upcoming";
function useDrops() {
  const { state } = useDropAuth();
  const content = useDropContent();
  return reactExports.useMemo(() => {
    const byId = new Map(content.map((c) => [c.campaign_id, c]));
    const withContent = (d) => {
      const c = byId.get(d.id);
      if (!c) return d;
      return {
        ...d,
        kind: c.kind ?? d.kind,
        tagline: c.tagline || d.tagline,
        description: c.description || d.description,
        dates: c.dates || d.dates,
        fandom: c.fandom || d.fandom,
        cover: c.cover_url || d.cover,
        hero: c.hero_url || d.hero,
        album: c.album_url || c.hero_url || d.album
      };
    };
    const known = DROP_CATALOG.map((d) => {
      const c = state.campaigns.find((x) => x.id === d.id);
      return withContent(c ? { ...d, artist: c.artist || d.artist, title: c.title || d.title, status: fromDb(c.status) } : d);
    });
    const extra = state.campaigns.filter((c) => !DROP_CATALOG.some((d) => d.id === c.id)).map((c) => withContent({
      id: c.id,
      artist: c.artist,
      title: c.title,
      tagline: "",
      description: "",
      cover: eventCrowd,
      hero: eventCrowd,
      album: eventCrowd,
      dates: "",
      status: fromDb(c.status),
      fandom: `Fans de ${c.artist}`
    }));
    return [...known, ...extra];
  }, [state.campaigns, content]);
}
function findDrop(drops, id) {
  return drops.find((d) => d.id === id) ?? drops[0];
}
function useCurrentDropId() {
  const search = useRouterState({ select: (s) => s.location.search });
  return search.d || "lali";
}
function useCurrentDrop() {
  const drops = useDrops();
  const id = useCurrentDropId();
  return findDrop(drops, id);
}
const STATUS_LABEL = { active: "Activo", upcoming: "Próximamente", archived: "Finalizado" };
export {
  ARCHIVED_KIND_LABEL as A,
  DROP_CATALOG as D,
  FONT_OPTIONS as F,
  KIND_LABEL as K,
  STATUS_LABEL as S,
  useIsDropAdmin as a,
  useDropContent as b,
  useCurrentDrop as c,
  adelaGlitter as d,
  arjonaCover as e,
  arjonaRed as f,
  airbagBanda as g,
  lnvGira as h,
  lnvPoster as i,
  arjonaSeco as j,
  useCurrentDropId as k,
  laliCover as l,
  eventCrowd as m,
  dillomCover as n,
  coverMechon as o,
  adelaCover as p,
  lnvCover as q,
  reloadDropContent as r,
  airbagCover as s,
  themeCss as t,
  useDrops as u,
  mariaCover as v
};
