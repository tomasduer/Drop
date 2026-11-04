import { useEffect, useState } from "react";
import { Loader2, Search, Send, Trash2, UserCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { avatarFor } from "@/lib/fan-avatars";
import { useDropAuth } from "./AuthProvider";

// Las tablas y funciones de comunidad todavía no están en los tipos generados.
type Res<T> = Promise<{ data: T | null; error: { message: string } | null }>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sb = supabase as unknown as { rpc: <T = any>(fn: string, args?: Record<string, unknown>) => Res<T>; from: (t: string) => any };

export type FeedPost = {
  key: string; id: string; user_id: string; text: string; sticker: string | null; created_at: string;
  author: string; avatar: string | null; likes: number; comments: number; liked: boolean; following: boolean; mine: boolean;
};
export type SeedStats = Record<string, { likes: number; comments: number; liked: boolean }>;
export type Fan = { id: string; name: string; avatar: string | null; following: boolean };
type Comment = { id: string; user_id: string; text: string; created_at: string; author: string; avatar: string | null; following: boolean; mine: boolean };

export function timeAgo(iso: string) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "recién";
  if (s < 3600) return `hace ${Math.floor(s / 60)} min`;
  if (s < 86400) return `hace ${Math.floor(s / 3600)} h`;
  if (s < 86400 * 14) return `hace ${Math.floor(s / 86400)} d`;
  return `hace ${Math.floor(s / (86400 * 7))} semanas`;
}

export async function setFollow(id: string, follow: boolean) {
  const { error } = await sb.rpc("drop_follow", { p_followed: id, p_follow: follow });
  if (error) { toast.error("No pudimos guardar el seguimiento"); return false; }
  toast.success(follow ? "Ahora seguís a este fan" : "Dejaste de seguirlo");
  return true;
}

export function FollowButton({ fan, onChange, small }: { fan: Fan; onChange: (following: boolean) => void; small?: boolean }) {
  const [busy, setBusy] = useState(false);
  return (
    <button
      disabled={busy}
      onClick={async () => { setBusy(true); if (await setFollow(fan.id, !fan.following)) onChange(!fan.following); setBusy(false); }}
      className={`inline-flex shrink-0 items-center justify-center gap-1 rounded-full font-bold disabled:opacity-60 ${small ? "px-3 py-1.5 text-xs" : "w-full py-3 text-sm"} ${fan.following ? "border border-border" : "text-primary-foreground"}`}
      style={fan.following ? undefined : { backgroundImage: "var(--gradient-drop)" }}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : fan.following ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
      {fan.following ? "Siguiendo" : "Seguir"}
    </button>
  );
}

/** Perfil chico de un fan real, con el botón para seguirlo. */
export function FanDrawer({ fan, onClose, onChange }: { fan: Fan | null; onClose: () => void; onChange: (f: Fan) => void }) {
  const { mode, user } = useDropAuth();
  return (
    <Drawer open={!!fan} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent>
        {fan && (
          <>
            <DrawerHeader className="flex flex-col items-center text-center">
              <img src={fan.avatar || avatarFor(fan.name)} alt="" className="mb-2 h-20 w-20 rounded-full object-cover" />
              <DrawerTitle className="text-xl font-black">{fan.name}</DrawerTitle>
              <DrawerDescription className="text-xs">Fan de DROP</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-8">
              {mode === "user" && fan.id !== user?.id ? (
                <FollowButton fan={fan} onChange={(following) => onChange({ ...fan, following })} />
              ) : mode !== "user" ? (
                <p className="text-center text-sm text-muted-foreground">Creá tu cuenta para seguir a otros fans.</p>
              ) : null}
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

/** Comentarios reales de un posteo. */
export function CommentsDrawer({ postKey, title, onClose, onCountChange, onOpenFan }: {
  postKey: string | null; title: string; onClose: () => void; onCountChange: (key: string, delta: number) => void; onOpenFan: (f: Fan) => void;
}) {
  const { mode } = useDropAuth();
  const [list, setList] = useState<Comment[] | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(key: string) {
    const { data } = await sb.rpc<Comment[]>("drop_post_comments", { p_post_key: key });
    setList(data ?? []);
  }
  useEffect(() => { setList(null); setText(""); if (postKey) void load(postKey); }, [postKey]);

  async function send() {
    if (!postKey || !text.trim()) return;
    if (mode !== "user") { toast.message("Creá tu cuenta para comentar"); return; }
    setBusy(true);
    const { error } = await sb.from("post_comments").insert({ post_key: postKey, text: text.trim().slice(0, 300) });
    setBusy(false);
    if (error) { toast.error("No se pudo comentar"); return; }
    setText(""); onCountChange(postKey, 1); await load(postKey);
  }
  async function remove(c: Comment) {
    const { error } = await sb.from("post_comments").delete().eq("id", c.id);
    if (error || !postKey) { toast.error("No se pudo borrar"); return; }
    onCountChange(postKey, -1); await load(postKey);
  }

  return (
    <Drawer open={!!postKey} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-black">Comentarios</DrawerTitle>
          <DrawerDescription className="line-clamp-2 text-xs">{title}</DrawerDescription>
        </DrawerHeader>
        <div className="min-h-24 flex-1 space-y-3 overflow-y-auto px-4">
          {list === null ? <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
            : list.length === 0 ? <p className="py-4 text-center text-sm text-muted-foreground">Todavía no hay comentarios. ¡Sé el primero!</p>
            : list.map((c) => (
              <div key={c.id} className="flex gap-2">
                <button onClick={() => onOpenFan({ id: c.user_id, name: c.author, avatar: c.avatar, following: c.following })} className="shrink-0">
                  <img src={c.avatar || avatarFor(c.author)} alt="" className="h-8 w-8 rounded-full object-cover" />
                </button>
                <div className="min-w-0 flex-1 rounded-2xl bg-muted/60 px-3 py-2">
                  <button onClick={() => onOpenFan({ id: c.user_id, name: c.author, avatar: c.avatar, following: c.following })} className="text-xs font-bold">{c.author}</button>
                  <span className="ml-2 text-[10px] text-muted-foreground">{timeAgo(c.created_at)}</span>
                  <p className="whitespace-pre-wrap break-words text-sm">{c.text}</p>
                </div>
                {c.mine && <button onClick={() => void remove(c)} aria-label="Borrar comentario" className="self-center p-1 text-muted-foreground"><Trash2 className="h-3.5 w-3.5" /></button>}
              </div>
            ))}
        </div>
        <div className="flex items-center gap-2 border-t border-border p-3">
          <input
            value={text} maxLength={300} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && void send()}
            placeholder={mode === "user" ? "Escribí un comentario…" : "Creá tu cuenta para comentar"} disabled={mode !== "user"}
            className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button onClick={() => void send()} disabled={busy || !text.trim()} aria-label="Enviar" className="grid h-10 w-10 place-items-center rounded-full text-primary-foreground disabled:opacity-50" style={{ backgroundImage: "var(--gradient-drop)" }}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/** Buscador de fans reales por nombre, para seguirlos. */
export function FanSearch({ onOpenFan }: { onOpenFan: (f: Fan) => void }) {
  const { mode } = useDropAuth();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Fan[] | null>(null);

  useEffect(() => {
    if (mode !== "user" || q.trim().length < 2) { setResults(null); return; }
    const t = setTimeout(async () => {
      const { data } = await sb.rpc<{ id: string; display_name: string; avatar_url: string | null; following: boolean }[]>("drop_search_fans", { p_query: q });
      setResults((data ?? []).map((r) => ({ id: r.id, name: r.display_name, avatar: r.avatar_url, following: r.following })));
    }, 300);
    return () => clearTimeout(t);
  }, [q, mode]);

  if (mode !== "user") return null;
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Buscar fans</h2>
      <label className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nombre de un fan para seguirlo" className="flex-1 bg-transparent text-sm outline-none" />
      </label>
      {results && (
        <div className="mt-2 space-y-2">
          {results.length === 0 && <p className="px-1 text-xs text-muted-foreground">No encontramos fans con ese nombre.</p>}
          {results.map((f) => (
            <div key={f.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5">
              <button onClick={() => onOpenFan(f)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                <img src={f.avatar || avatarFor(f.name)} alt="" className="h-9 w-9 rounded-full object-cover" />
                <span className="truncate text-sm font-semibold">{f.name}</span>
              </button>
              <FollowButton small fan={f} onChange={(following) => setResults((r) => r?.map((x) => (x.id === f.id ? { ...x, following } : x)) ?? null)} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
