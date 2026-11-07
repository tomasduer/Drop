import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as logoViolet } from "./drop-logo-negativo-DidhibxV.mjs";
import { b as Dialog, c as DialogPortal, d as DialogContent, f as DialogClose, D as DialogTitle, a as DialogDescription, e as DialogOverlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./router-BrCA95mT.mjs";
import { u as useDropAuth } from "./AuthProvider-Dw3aHa9p.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";
import { D as Drawer$1 } from "../_libs/vaul.mjs";
import { D as DROP_CATALOG } from "./drops-DswU_7z0.mjs";
import { C as Crown, e as Check, f as Search, L as LoaderCircle, g as UserCheck, h as UserPlus, i as Trash2, j as Send, d as Sparkles, G as Gift, k as ChevronRight, B as Bell, l as BellRing, m as MessageCircle, n as Heart, X } from "../_libs/lucide-react.mjs";
const logoBlack = "/assets/drop-logo-oficial-ZaoSBBWC.webp";
function DropLogo({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logoViolet, alt: "DROP", className: `drop-logo-white ${className}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logoBlack, alt: "DROP", className: `drop-logo-black ${className}` })
  ] });
}
const Sheet = Dialog;
const SheetPortal = DialogPortal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogOverlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = DialogContent.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogTitle.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogDescription.displayName;
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer$1.Root, { shouldScaleBackground, ...props });
Drawer.displayName = "Drawer";
const DrawerPortal = Drawer$1.Portal;
const DrawerOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Drawer$1.Overlay,
  {
    ref,
    className: cn("fixed inset-0 z-50 bg-black/80", className),
    ...props
  }
));
DrawerOverlay.displayName = Drawer$1.Overlay.displayName;
const DrawerContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Drawer$1.Content,
    {
      ref,
      className: cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }),
        children
      ]
    }
  )
] }));
DrawerContent.displayName = "DrawerContent";
const DrawerHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid gap-1.5 p-4 text-center sm:text-left", className), ...props });
DrawerHeader.displayName = "DrawerHeader";
const DrawerTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Drawer$1.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DrawerTitle.displayName = Drawer$1.Title.displayName;
const DrawerDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Drawer$1.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DrawerDescription.displayName = Drawer$1.Description.displayName;
const url$7 = "/assets/lali-13-C2j2l3xd.webp";
const a13 = { url: url$7 };
const url$6 = "/assets/lali-14-C-C8zWHa.webp";
const a14 = { url: url$6 };
const url$5 = "/assets/lali-16-B_JvljNH.webp";
const a16 = { url: url$5 };
const url$4 = "/assets/drop-photo-20-D5o1MeTs.webp";
const a20 = { url: url$4 };
const url$3 = "/assets/drop-photo-22-DRKL6ku2.webp";
const a22 = { url: url$3 };
const url$2 = "/assets/drop-photo-24-CGpJfmrR.webp";
const a24 = { url: url$2 };
const url$1 = "/assets/drop-photo-25-DSCdohKS.webp";
const a25 = { url: url$1 };
const url = "/assets/sticker-nvaa-B32RZAqu.webp";
const a26 = { url };
const av1 = "/assets/avatar-1-CXprXVf9.webp";
const av2 = "/assets/avatar-2-BKNf-tw_.webp";
const av3 = "/assets/avatar-3-CLuFTIj-.webp";
const av4 = "/assets/avatar-4-CCyLw1Cm.webp";
const av5 = "/assets/avatar-5-s13HFJjs.webp";
const av6 = "/assets/avatar-6-C65a1eek.webp";
const av7 = "/assets/avatar-7-Ds9aFDbu.webp";
const av8 = "/assets/avatar-8-Cfz4a0AQ.webp";
const PHOTOS = {
  news: a13.url,
  estadio: a14.url,
  rain: a16.url,
  worldCup: a20.url,
  veil: a22.url,
  childhood: a24.url,
  teen: a25.url,
  saint: a26.url
};
const POOL = [av1, av2, av3, av4, av5, av6, av7, av8];
function avatarFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  return POOL[h % POOL.length];
}
const sb = supabase;
function timeAgo(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1e3);
  if (s < 60) return "recién";
  if (s < 3600) return `hace ${Math.floor(s / 60)} min`;
  if (s < 86400) return `hace ${Math.floor(s / 3600)} h`;
  if (s < 86400 * 14) return `hace ${Math.floor(s / 86400)} d`;
  return `hace ${Math.floor(s / (86400 * 7))} semanas`;
}
async function setFollow(id, follow) {
  const { error } = await sb.rpc("drop_follow", { p_followed: id, p_follow: follow });
  if (error) {
    toast.error("No pudimos guardar el seguimiento");
    return false;
  }
  toast.success(follow ? "Ahora seguís a este fan" : "Dejaste de seguirlo");
  return true;
}
function FollowButton({ fan, onChange, small }) {
  const [busy, setBusy] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      disabled: busy,
      onClick: async () => {
        setBusy(true);
        if (await setFollow(fan.id, !fan.following)) onChange(!fan.following);
        setBusy(false);
      },
      className: `inline-flex shrink-0 items-center justify-center gap-1 rounded-full font-bold disabled:opacity-60 ${small ? "px-3 py-1.5 text-xs" : "w-full py-3 text-sm"} ${fan.following ? "border border-border" : "text-primary-foreground"}`,
      style: fan.following ? void 0 : { backgroundImage: "var(--gradient-drop)" },
      children: [
        busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : fan.following ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
        fan.following ? "Siguiendo" : "Seguir"
      ]
    }
  );
}
function FanDrawer({ fan, onClose, onChange }) {
  const { mode, user } = useDropAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open: !!fan, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContent, { children: fan && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: fan.avatar || avatarFor(fan.name), alt: "", className: "mb-2 h-20 w-20 rounded-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "text-xl font-black", children: fan.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { className: "text-xs", children: "Fan de DROP" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-8", children: mode === "user" && fan.id !== user?.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(FollowButton, { fan, onChange: (following) => onChange({ ...fan, following }) }) : mode !== "user" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground", children: "Creá tu cuenta para seguir a otros fans." }) : null })
  ] }) }) });
}
function CommentsDrawer({ postKey, title, onClose, onCountChange, onOpenFan }) {
  const { mode } = useDropAuth();
  const [list, setList] = reactExports.useState(null);
  const [text, setText] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  async function load(key) {
    const { data } = await sb.rpc("drop_post_comments", { p_post_key: key });
    setList(data ?? []);
  }
  reactExports.useEffect(() => {
    setList(null);
    setText("");
    if (postKey) void load(postKey);
  }, [postKey]);
  async function send() {
    if (!postKey || !text.trim()) return;
    if (mode !== "user") {
      toast.message("Creá tu cuenta para comentar");
      return;
    }
    setBusy(true);
    const { error } = await sb.from("post_comments").insert({ post_key: postKey, text: text.trim().slice(0, 300) });
    setBusy(false);
    if (error) {
      toast.error("No se pudo comentar");
      return;
    }
    setText("");
    onCountChange(postKey, 1);
    await load(postKey);
  }
  async function remove(c) {
    const { error } = await sb.from("post_comments").delete().eq("id", c.id);
    if (error || !postKey) {
      toast.error("No se pudo borrar");
      return;
    }
    onCountChange(postKey, -1);
    await load(postKey);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { open: !!postKey, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerContent, { className: "max-h-[85vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "font-black", children: "Comentarios" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { className: "line-clamp-2 text-xs", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-24 flex-1 space-y-3 overflow-y-auto px-4", children: list === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-5 w-5 animate-spin text-muted-foreground" }) : list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-center text-sm text-muted-foreground", children: "Todavía no hay comentarios. ¡Sé el primero!" }) : list.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onOpenFan({ id: c.user_id, name: c.author, avatar: c.avatar, following: c.following }), className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.avatar || avatarFor(c.author), alt: "", className: "h-8 w-8 rounded-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 rounded-2xl bg-muted/60 px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onOpenFan({ id: c.user_id, name: c.author, avatar: c.avatar, following: c.following }), className: "text-xs font-bold", children: c.author }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[10px] text-muted-foreground", children: timeAgo(c.created_at) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap break-words text-sm", children: c.text })
      ] }),
      c.mine && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void remove(c), "aria-label": "Borrar comentario", className: "self-center p-1 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
    ] }, c.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-t border-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: text,
          maxLength: 300,
          onChange: (e) => setText(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && void send(),
          placeholder: mode === "user" ? "Escribí un comentario…" : "Creá tu cuenta para comentar",
          disabled: mode !== "user",
          className: "flex-1 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void send(), disabled: busy || !text.trim(), "aria-label": "Enviar", className: "grid h-10 w-10 place-items-center rounded-full text-primary-foreground disabled:opacity-50", style: { backgroundImage: "var(--gradient-drop)" }, children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] }) });
}
function FanSearch({ onOpenFan }) {
  const { mode } = useDropAuth();
  const [q, setQ] = reactExports.useState("");
  const [results, setResults] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (mode !== "user" || q.trim().length < 2) {
      setResults(null);
      return;
    }
    const t = setTimeout(async () => {
      const { data } = await sb.rpc("drop_search_fans", { p_query: q });
      setResults((data ?? []).map((r) => ({ id: r.id, name: r.display_name, avatar: r.avatar_url, following: r.following })));
    }, 300);
    return () => clearTimeout(t);
  }, [q, mode]);
  if (mode !== "user") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Buscar fans" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Nombre de un fan para seguirlo", className: "flex-1 bg-transparent text-sm outline-none" })
    ] }),
    results && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2", children: [
      results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs text-muted-foreground", children: "No encontramos fans con ese nombre." }),
      results.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onOpenFan(f), className: "flex min-w-0 flex-1 items-center gap-3 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: f.avatar || avatarFor(f.name), alt: "", className: "h-9 w-9 rounded-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm font-semibold", children: f.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FollowButton, { small: true, fan: f, onChange: (following) => setResults((r) => r?.map((x) => x.id === f.id ? { ...x, following } : x) ?? null) })
      ] }, f.id))
    ] })
  ] });
}
const SEEN = "drop-notifs-vistas";
const ICONS = { like: Heart, comment: MessageCircle, follow: UserPlus, reminder: BellRing };
const readSeen = () => {
  try {
    return JSON.parse(localStorage.getItem(SEEN) ?? "[]");
  } catch {
    return [];
  }
};
const writeSeen = (ids) => {
  try {
    localStorage.setItem(SEEN, JSON.stringify(ids.slice(-300)));
  } catch {
  }
};
const dateFmt = new Intl.DateTimeFormat("es-AR", { timeZone: "America/Argentina/Buenos_Aires", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
function reminders() {
  const out = [];
  for (const d of DROP_CATALOG) {
    let on = false;
    try {
      on = localStorage.getItem(`drop-aviso-${d.id}`) === "1";
    } catch {
      on = false;
    }
    if (!on) continue;
    const at = d.launchAt ? new Date(d.launchAt) : null;
    const open = d.status !== "upcoming" || at !== null && at.getTime() <= Date.now();
    const days = at ? Math.ceil((at.getTime() - Date.now()) / 864e5) : null;
    out.push({
      id: `rem:${d.id}:${open ? "abierto" : "espera"}`,
      kind: "reminder",
      drop: d.id,
      tab: "inicio",
      title: open ? `¡Abrió el drop de ${d.artist}!` : `Recordatorio: ${d.artist} · ${d.title}`,
      body: open ? "Ya podés entrar a jugar las misiones y sumar puntos." : at ? `Abre ${days === 1 ? "mañana" : `en ${days} días`} · ${dateFmt.format(at)}` : "Te avisamos apenas abra.",
      at: open && at ? at.toISOString() : (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  return out;
}
function toNotif(r) {
  const post = r.post_text ? `“${r.post_text}”` : "tu posteo";
  if (r.kind === "follow") return { id: `follow:${r.actor_id}:${r.created_at}`, kind: "follow", title: `${r.actor} empezó a seguirte`, at: r.created_at, avatar: r.avatar };
  if (r.kind === "like") return { id: `like:${r.actor_id}:${r.created_at}`, kind: "like", title: `A ${r.actor} le gustó tu posteo`, body: post, at: r.created_at, avatar: r.avatar, drop: r.campaign_id ?? void 0, tab: "comunidad" };
  return { id: `comment:${r.actor_id}:${r.created_at}`, kind: "comment", title: `${r.actor} comentó tu posteo`, body: r.comment ? `“${r.comment}”` : post, at: r.created_at, avatar: r.avatar, drop: r.campaign_id ?? void 0, tab: "comunidad" };
}
async function fallback(uid) {
  const { data: posts } = await sb.from("community_posts").select("id, campaign_id, text").eq("user_id", uid).limit(200);
  if (!posts?.length) return [];
  const byKey = new Map(posts.map((p) => [`p:${p.id}`, p]));
  const keys = [...byKey.keys()];
  const [likes, comments] = await Promise.all([
    sb.from("post_likes").select("post_key, user_id, created_at").in("post_key", keys).neq("user_id", uid).order("created_at", { ascending: false }).limit(50),
    sb.from("post_comments").select("post_key, user_id, text, created_at").in("post_key", keys).neq("user_id", uid).order("created_at", { ascending: false }).limit(50)
  ]);
  const ls = likes.data ?? [];
  const cs = comments.data ?? [];
  const ids = [...new Set([...ls, ...cs].map((x) => x.user_id))];
  const { data: profs } = ids.length ? await sb.from("profiles").select("id, display_name, avatar_url").in("id", ids) : { data: [] };
  const who = new Map((profs ?? []).map((p) => [p.id, p]));
  const row = (kind, x) => {
    const p = byKey.get(x.post_key);
    const pr = who.get(x.user_id);
    return { kind, actor_id: x.user_id, actor: pr?.display_name || "Un fan", avatar: pr?.avatar_url ?? null, created_at: x.created_at, campaign_id: p?.campaign_id ?? null, post_text: p?.text?.slice(0, 80) ?? null, comment: x.text ?? null };
  };
  return [...ls.map((x) => row("like", x)), ...cs.map((x) => row("comment", x))];
}
function useNotifications(open) {
  const { mode, user } = useDropAuth();
  const [rows, setRows] = reactExports.useState([]);
  const [rem, setRem] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const load = reactExports.useCallback(async () => {
    setRem(reminders());
    if (mode !== "user" || !user) {
      setRows([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await sb.rpc("drop_notifications");
      setRows(error ? await fallback(user.id) : data ?? []);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [mode, user]);
  reactExports.useEffect(() => {
    void load();
  }, [load, open]);
  reactExports.useEffect(() => {
    const t = setInterval(() => {
      void load();
    }, 6e4);
    return () => clearInterval(t);
  }, [load]);
  const items = reactExports.useMemo(() => [...rem, ...rows.map(toNotif)].sort((a, b) => (a.kind === "reminder" ? -1 : 0) - (b.kind === "reminder" ? -1 : 0) || b.at.localeCompare(a.at)), [rem, rows]);
  return { items, loading, mode };
}
function NotificationsButton() {
  const [open, setOpen] = reactExports.useState(false);
  const { items, loading, mode } = useNotifications(open);
  const [seen, setSeen] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setSeen(readSeen());
  }, []);
  const unread = items.filter((n) => !seen.includes(n.id)).length;
  const markAll = () => {
    const next = [.../* @__PURE__ */ new Set([...seen, ...items.map((n) => n.id)])];
    setSeen(next);
    writeSeen(next);
  };
  const markOne = (id) => {
    if (seen.includes(id)) return;
    const next = [...seen, id];
    setSeen(next);
    writeSeen(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen(true),
        "aria-label": unread ? `Notificaciones, ${unread} sin leer` : "Notificaciones",
        className: "relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
          unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground", children: unread > 9 ? "9+" : unread })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full max-w-[440px] overflow-y-auto px-3 sm:max-w-[440px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-2xl font-black", children: "Notificaciones" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: unread > 0 ? `${unread} sin leer` : "Estás al día" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
        mode !== "user" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "Creá tu cuenta para recibir likes, comentarios y seguidores." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: { mode: "signup" }, onClick: () => setOpen(false), className: "mt-2 inline-block text-xs font-black text-primary", children: "Crear cuenta" })
        ] }),
        items.length === 0 && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-10 text-center text-sm text-muted-foreground", children: "Todavía no tenés notificaciones. Cuando alguien te dé like, te comente o te siga, lo vas a ver acá. Los recordatorios de drops que actives también aparecen acá." }),
        items.map((n) => {
          const Icon = ICONS[n.kind];
          const isRead = seen.includes(n.id);
          const body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative shrink-0", children: [
              n.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: n.avatar, alt: "", className: "h-10 w-10 rounded-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
              n.avatar && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold leading-snug", children: n.title }),
                !isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" })
              ] }),
              n.body && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 block break-words text-xs text-muted-foreground", children: n.body }),
              n.kind !== "reminder" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] text-muted-foreground", children: timeAgo(n.at) })
            ] })
          ] });
          const cls = `flex w-full gap-3 rounded-2xl border p-3 text-left transition-colors ${isRead ? "border-border bg-card" : "border-primary/40 bg-primary/5"}`;
          return n.drop ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/drop", search: { d: n.drop, tab: n.tab }, onClick: () => {
            markOne(n.id);
            setOpen(false);
          }, className: cls, children: body }, n.id) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => markOne(n.id), className: cls, children: body }, n.id);
        }),
        unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: markAll, className: "w-full rounded-xl border border-primary/40 py-3 text-sm font-bold text-primary", children: "Marcar todas como leídas" })
      ] })
    ] }) })
  ] });
}
const PLANS = [
  {
    id: "free",
    name: "DROP Free",
    price: "Gratis",
    icon: Sparkles,
    tagline: "Todo lo que necesitás para jugar.",
    perks: ["Diario musical y reseñas", "Todos los drops", "Rankings y premios", "Comunidad"]
  },
  {
    id: "plus",
    name: "DROP+",
    price: "$2.999",
    period: "por mes",
    icon: Crown,
    featured: true,
    tagline: "Viví cada lanzamiento antes que nadie.",
    perks: ["Todo lo de Free", "Sin publicidad", "Acceso anticipado y preventas", "Insignia DROP+"]
  },
  {
    id: "box",
    name: "Mystery Box",
    price: "$24.990",
    period: "por caja",
    icon: Gift,
    tagline: "Una caja sorpresa de tus artistas.",
    perks: ["Merch, vinilos y coleccionables", "Ediciones limitadas", "Envío a todo el país", "1 mes de DROP+"]
  }
];
const KEY = "drop-plan-interes";
function PlansBar() {
  const [open, setOpen] = reactExports.useState(false);
  const plan = useChosenPlan(open);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 px-4 pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropLogo, { className: "h-8 w-20 object-contain object-left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen(true),
            "aria-label": "Ver planes DROP+",
            className: "flex h-10 items-center gap-1.5 rounded-full px-3.5 text-xs font-black text-primary-foreground shadow-[var(--shadow-glow)] transition-transform active:scale-95",
            style: { backgroundImage: "var(--gradient-drop)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4" }),
              "DROP+",
              plan !== "free" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlansSheet, { open, onOpenChange: setOpen })
  ] });
}
function useChosenPlan(dep) {
  const [plan, setPlan] = reactExports.useState("free");
  reactExports.useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      setPlan(v === "plus" || v === "box" ? v : "free");
    } catch {
    }
  }, [dep]);
  return plan;
}
function PlanCard() {
  const [open, setOpen] = reactExports.useState(false);
  const chosen = useChosenPlan(open);
  const plan = PLANS.find((p) => p.id === chosen) ?? PLANS[0];
  const Icon = plan.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setOpen(true), className: "mt-3 flex w-full items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-3 text-left transition-colors active:bg-primary/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: "Tu plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-sm font-black", children: [
          plan.name,
          chosen !== "free" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-semibold text-muted-foreground", children: "· anotado" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-xs text-muted-foreground", children: chosen === "free" ? "Pasate a DROP+: preventas y acceso anticipado" : "Te avisamos cuando abran los pagos" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center text-xs font-bold text-primary", children: [
        chosen === "free" ? "Ver planes" : "Cambiar",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlansSheet, { open, onOpenChange: setOpen })
  ] });
}
function PlansSheet({ open, onOpenChange }) {
  const { mode } = useDropAuth();
  const [chosen, setChosen] = reactExports.useState("free");
  reactExports.useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "plus" || v === "box") setChosen(v);
    } catch {
    }
  }, [open]);
  const subscribe = (plan) => {
    if (mode !== "user") {
      toast("Creá tu cuenta para suscribirte a un plan");
      return;
    }
    const next = chosen === plan.id ? "free" : plan.id;
    try {
      if (next === "free") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch {
    }
    setChosen(next);
    toast.success(next === "free" ? "Volviste a DROP Free" : `Te anotamos en ${plan.name}. Te avisamos cuando abran los pagos.`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full max-w-[440px] overflow-y-auto px-3 sm:max-w-[440px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-2xl font-black", children: "Planes DROP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Jugar es gratis. Si querés ir más allá, elegí tu plan." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid grid-cols-3 items-stretch gap-2", children: PLANS.map((p) => {
      const Icon = p.icon;
      const active = chosen === p.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: `relative flex flex-col rounded-2xl border p-2.5 ${p.featured ? "border-primary/70 bg-primary/10" : "border-border bg-card"}`, children: [
        p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-primary-foreground", children: "Recomendado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto mt-1 grid h-9 w-9 place-items-center rounded-xl text-primary-foreground", style: { backgroundImage: "var(--gradient-drop)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 flex min-h-[2.5em] items-center justify-center text-center text-sm font-black leading-tight", children: p.id === "box" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "DROP",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Mystery Box"
        ] }) : p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-lg font-black leading-none", children: p.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: p.period ?? "para siempre" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 flex-1 space-y-1.5", children: p.perks.map((perk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-1 text-[11px] leading-snug", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-px h-3 w-3 shrink-0 text-primary" }),
          perk
        ] }, perk)) }),
        p.id === "free" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 rounded-lg border border-border py-2 text-center text-[11px] font-bold text-muted-foreground", children: active ? "Tu plan" : "Incluido" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => subscribe(p),
            className: `mt-3 w-full rounded-lg py-2 text-[11px] font-black ${active ? "border border-primary text-primary" : "text-primary-foreground"}`,
            style: active ? void 0 : { backgroundImage: "var(--gradient-drop)" },
            children: active ? "Anotado" : p.id === "box" ? "La quiero" : "Suscribirme"
          }
        )
      ] }, p.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[11px] text-muted-foreground", children: "Precios de referencia en pesos. Los pagos abren pronto: anotate y te avisamos." })
  ] }) });
}
function MobileShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen w-full bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative mx-auto min-h-screen w-full max-w-[440px] overflow-hidden pb-40",
      style: { backgroundImage: "var(--gradient-glow)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlansBar, {}),
        children
      ]
    }
  ) });
}
export {
  CommentsDrawer as C,
  DropLogo as D,
  FanSearch as F,
  MobileShell as M,
  PHOTOS as P,
  Sheet as S,
  avatarFor as a,
  FollowButton as b,
  FanDrawer as c,
  Drawer as d,
  DrawerContent as e,
  DrawerHeader as f,
  DrawerTitle as g,
  DrawerDescription as h,
  PlanCard as i,
  SheetContent as j,
  SheetHeader as k,
  SheetTitle as l,
  SheetDescription as m,
  sb as s,
  timeAgo as t
};
