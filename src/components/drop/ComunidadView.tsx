import { useEffect, useState } from "react";
import { useDropAuth } from "./AuthProvider";
import { Heart, MessageCircle, Share2, Trophy, Send } from "lucide-react";
import { toast } from "sonner";
import stickerNvaa from "@/assets/sticker-nvaa.png.asset.json";
import simbolos33 from "@/assets/simbolos-33.png.asset.json";
import laliLogo from "@/assets/lali-logo.png.asset.json";
import stencilWall from "@/assets/stencil-wall.png.asset.json";
import laliAuto from "@/assets/lali-auto.png.asset.json";
import albumCover from "@/assets/album-cover.png.asset.json";
import fanaticoSingle from "@/assets/fanatico-single.png.asset.json";
import { PHOTOS, avatarFor } from "@/lib/fan-avatars";

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
  { src: stickerNvaa.url, label: "No vayas a atender" },
  { src: simbolos33.url, label: "Pentagrama 33" },
  { src: laliLogo.url, label: "LALI." },
  { src: albumCover.url, label: "Tapa del álbum" },
  { src: PHOTOS.saint, label: "Santa LALI" },
  { src: PHOTOS.childhood, label: "LALI de chiquita" },
  { src: PHOTOS.teen, label: "LALI retro" },
  { src: PHOTOS.veil, label: "LALI en vivo" },
];

export function ComunidadView() {
  const { profile } = useDropAuth();
  const [liked, setLiked] = useState<string[]>([]);
  const [joined, setJoined] = useState<string[]>(() => readLocal<string[]>("drop-grupos", []));
  const [myPosts, setMyPosts] = useState<Post[]>(() => readLocal<Post[]>("drop-mis-posts", []));
  const [draft, setDraft] = useState("");
  const [sticker, setSticker] = useState<string | null>(null);
  useEffect(() => writeLocal("drop-grupos", joined), [joined]);
  useEffect(() => writeLocal("drop-mis-posts", myPosts.slice(0, 20)), [myPosts]);
  const handle = (profile.username?.trim() || profile.display_name || "fan").replace(/^@/, "");
  const allPosts = [...myPosts, ...feed];

  const publish = () => {
    if (!draft.trim() && !sticker) { toast.error("Escribí algo o elegí un sticker"); return; }
    setMyPosts((p) => [{ kind: "post", user: handle, time: "recién", text: draft.trim(), likes: 0, comments: 0, image: sticker ?? undefined, avatar: profile.avatar_url, mine: true }, ...p]);
    toast.success("Publicado en Comunidad");
    setDraft(""); setSticker(null);
  };

  const sharePost = async (p: Extract<Post, { kind: "post" }>) => {
    const text = `@${p.user} en DROP: ${p.text}`;
    const url = `${window.location.origin}/drop`;
    try {
      if (navigator.share) await navigator.share({ title: "DROP · Comunidad", text, url });
      else { await navigator.clipboard.writeText(`${text} ${url}`); toast.success("Copiado para compartir"); }
    } catch { /* cancelado */ }
  };

  return (
    <div className="px-5">
      <div className="mb-4">
        <h1 className="text-3xl font-black">Comunidad</h1>
        <p className="text-sm text-muted-foreground">
          Lo que están encontrando los fans del drop.
        </p>
      </div>

      {/* Composer */}
      <section className="mb-6 rounded-2xl border border-border bg-card p-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          placeholder="Contá qué encontraste hoy…"
          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {stickers.map((s) => (
            <button
              key={s.label}
              onClick={() => setSticker(sticker === s.src ? null : s.src)}
              className={`h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 ${
                sticker === s.src ? "border-primary" : "border-border"
              }`}
              aria-label={`Sticker ${s.label}`}
            >
              <img loading="lazy" decoding="async" src={s.src} alt={s.label} className="h-full w-full object-cover" />
            </button>
          ))}
          <button
            onClick={publish}
            className="ml-auto flex shrink-0 items-center gap-1 rounded-xl px-4 text-xs font-black text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-drop)" }}
          >
            <Send className="h-3.5 w-3.5" /> Publicar
          </button>
        </div>
      </section>

      {/* Groups */}
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        Grupos
      </h2>
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {groups.map((g) => {
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
              className={`min-w-[140px] rounded-2xl border p-3 text-left ${
                isIn ? "border-primary bg-primary/10" : "border-border bg-card"
              }`}
            >
              <img loading="lazy" decoding="async"
                src={g.img}
                alt={g.name}
                className="mb-2 h-10 w-10 rounded-xl object-cover"
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
        {allPosts.map((p, i) =>
          p.kind === "achievement" ? (
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
            <article
              key={`${p.user}-${p.time}-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="p-4 pb-3">
                <header className="mb-2 flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-drop)" }}
                  >
                    <img loading="lazy" decoding="async" src={p.avatar || avatarFor(p.user)} alt={`Foto de @${p.user}`} className="h-full w-full rounded-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">@{p.user}</p>
                    <p className="text-[11px] text-muted-foreground">{p.time}</p>
                  </div>
                </header>
                {p.text && <p className="text-sm leading-relaxed">{p.text}</p>}
              </div>

              {p.image && (
                <img decoding="async"
                  src={p.image}
                  alt={`Publicación de ${p.user}`}
                  loading="lazy"
                  className={p.mine ? "mx-4 mb-1 h-32 w-32 rounded-xl object-cover" : "max-h-72 w-full object-cover"}
                />
              )}

              <footer className="flex items-center justify-between p-4 pt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() =>
                      setLiked((l) => (l.includes(p.user + p.time) ? l.filter((n) => n !== p.user + p.time) : [...l, p.user + p.time]))
                    }
                    className={`flex items-center gap-1 ${liked.includes(p.user + p.time) ? "text-primary" : ""}`}
                  >
                    <Heart
                      className={`h-4 w-4 ${liked.includes(p.user + p.time) ? "fill-current" : ""}`}
                    />{" "}
                    {p.likes + (liked.includes(p.user + p.time) ? 1 : 0)}
                  </button>
                  <button
                    onClick={() => toast.message(`${p.comments} comentarios`, { description: "Los comentarios se abren durante el drop en vivo." })}
                    className="flex items-center gap-1"
                  >
                    <MessageCircle className="h-4 w-4" /> {p.comments}
                  </button>
                </div>
                <button onClick={() => void sharePost(p)} className="flex items-center gap-1 font-semibold">
                  <Share2 className="h-4 w-4" /> Compartir
                </button>
              </footer>
            </article>
          )
        )}
      </div>
    </div>
  );
}

function readLocal<T>(key: string, fallback: T): T {
  try { const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null; return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
}
function writeLocal(key: string, value: unknown) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin almacenamiento */ }
}
