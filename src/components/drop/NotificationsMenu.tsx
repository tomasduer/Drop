import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, BellRing, Heart, MessageCircle, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useDropAuth } from "./AuthProvider";
import { sb, timeAgo } from "./community";
import { DROP_CATALOG } from "@/lib/drops";

// Notificaciones generales: likes, comentarios y seguidores nuevos (Supabase) más los
// recordatorios de drops que el fan activó con "Avisarme cuando abra" (en este dispositivo).
type Kind = "like" | "comment" | "follow" | "reminder";
type Notif = { id: string; kind: Kind; title: string; body?: string; at: string; avatar?: string | null; drop?: string; tab?: "comunidad" | "inicio" };
type Row = { kind: "like" | "comment" | "follow"; actor_id: string; actor: string; avatar: string | null; created_at: string; campaign_id: string | null; post_text: string | null; comment: string | null };

const SEEN = "drop-notifs-vistas";
const ICONS: Record<Kind, LucideIcon> = { like: Heart, comment: MessageCircle, follow: UserPlus, reminder: BellRing };

const readSeen = (): string[] => { try { return JSON.parse(localStorage.getItem(SEEN) ?? "[]") as string[]; } catch { return []; } };
const writeSeen = (ids: string[]) => { try { localStorage.setItem(SEEN, JSON.stringify(ids.slice(-300))); } catch { /* sin almacenamiento */ } };

const dateFmt = new Intl.DateTimeFormat("es-AR", { timeZone: "America/Argentina/Buenos_Aires", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

function reminders(): Notif[] {
  const out: Notif[] = [];
  for (const d of DROP_CATALOG) {
    let on = false;
    try { on = localStorage.getItem(`drop-aviso-${d.id}`) === "1"; } catch { on = false; }
    if (!on) continue;
    const at = d.launchAt ? new Date(d.launchAt) : null;
    const open = d.status !== "upcoming" || (at !== null && at.getTime() <= Date.now());
    const days = at ? Math.ceil((at.getTime() - Date.now()) / 86400000) : null;
    out.push({
      id: `rem:${d.id}:${open ? "abierto" : "espera"}`, kind: "reminder", drop: d.id, tab: "inicio",
      title: open ? `¡Abrió el drop de ${d.artist}!` : `Recordatorio: ${d.artist} · ${d.title}`,
      body: open ? "Ya podés entrar a jugar las misiones y sumar puntos." : at ? `Abre ${days === 1 ? "mañana" : `en ${days} días`} · ${dateFmt.format(at)}` : "Te avisamos apenas abra.",
      at: open && at ? at.toISOString() : new Date().toISOString(),
    });
  }
  return out;
}

function toNotif(r: Row): Notif {
  const post = r.post_text ? `“${r.post_text}”` : "tu posteo";
  if (r.kind === "follow") return { id: `follow:${r.actor_id}:${r.created_at}`, kind: "follow", title: `${r.actor} empezó a seguirte`, at: r.created_at, avatar: r.avatar };
  if (r.kind === "like") return { id: `like:${r.actor_id}:${r.created_at}`, kind: "like", title: `A ${r.actor} le gustó tu posteo`, body: post, at: r.created_at, avatar: r.avatar, drop: r.campaign_id ?? undefined, tab: "comunidad" };
  return { id: `comment:${r.actor_id}:${r.created_at}`, kind: "comment", title: `${r.actor} comentó tu posteo`, body: r.comment ? `“${r.comment}”` : post, at: r.created_at, avatar: r.avatar, drop: r.campaign_id ?? undefined, tab: "comunidad" };
}

/** Si la función drop_notifications todavía no está en la base, armamos likes y comentarios a mano. */
async function fallback(uid: string): Promise<Row[]> {
  const { data: posts } = await sb.from("community_posts").select("id, campaign_id, text").eq("user_id", uid).limit(200);
  if (!posts?.length) return [];
  type P = { id: string; campaign_id: string; text: string };
  const byKey = new Map((posts as P[]).map((p) => [`p:${p.id}`, p]));
  const keys = [...byKey.keys()];
  const [likes, comments] = await Promise.all([
    sb.from("post_likes").select("post_key, user_id, created_at").in("post_key", keys).neq("user_id", uid).order("created_at", { ascending: false }).limit(50),
    sb.from("post_comments").select("post_key, user_id, text, created_at").in("post_key", keys).neq("user_id", uid).order("created_at", { ascending: false }).limit(50),
  ]);
  type X = { post_key: string; user_id: string; created_at: string; text?: string };
  const ls = (likes.data ?? []) as X[]; const cs = (comments.data ?? []) as X[];
  const ids = [...new Set([...ls, ...cs].map((x) => x.user_id))];
  const { data: profs } = ids.length ? await sb.from("profiles").select("id, display_name, avatar_url").in("id", ids) : { data: [] };
  type Pr = { id: string; display_name: string | null; avatar_url: string | null };
  const who = new Map(((profs ?? []) as Pr[]).map((p) => [p.id, p]));
  const row = (kind: "like" | "comment", x: X): Row => {
    const p = byKey.get(x.post_key); const pr = who.get(x.user_id);
    return { kind, actor_id: x.user_id, actor: pr?.display_name || "Un fan", avatar: pr?.avatar_url ?? null, created_at: x.created_at, campaign_id: p?.campaign_id ?? null, post_text: p?.text?.slice(0, 80) ?? null, comment: x.text ?? null };
  };
  return [...ls.map((x) => row("like", x)), ...cs.map((x) => row("comment", x))];
}

function useNotifications(open: boolean) {
  const { mode, user } = useDropAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [rem, setRem] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setRem(reminders());
    if (mode !== "user" || !user) { setRows([]); return; }
    setLoading(true);
    try {
      const { data, error } = await sb.rpc<Row[]>("drop_notifications");
      setRows(error ? await fallback(user.id) : ((data as Row[] | null) ?? []));
    } catch { setRows([]); } finally { setLoading(false); }
  }, [mode, user]);

  useEffect(() => { void load(); }, [load, open]);
  useEffect(() => {
    const t = setInterval(() => { void load(); }, 60000);
    return () => clearInterval(t);
  }, [load]);

  const items = useMemo(() => [...rem, ...rows.map(toNotif)].sort((a, b) => (a.kind === "reminder" ? -1 : 0) - (b.kind === "reminder" ? -1 : 0) || b.at.localeCompare(a.at)), [rem, rows]);
  return { items, loading, mode };
}

export function NotificationsButton() {
  const [open, setOpen] = useState(false);
  const { items, loading, mode } = useNotifications(open);
  const [seen, setSeen] = useState<string[]>([]);
  useEffect(() => { setSeen(readSeen()); }, []);
  const unread = items.filter((n) => !seen.includes(n.id)).length;
  const markAll = () => { const next = [...new Set([...seen, ...items.map((n) => n.id)])]; setSeen(next); writeSeen(next); };
  const markOne = (id: string) => { if (seen.includes(id)) return; const next = [...seen, id]; setSeen(next); writeSeen(next); };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={unread ? `Notificaciones, ${unread} sin leer` : "Notificaciones"}
        className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted">
        <Bell className="h-5 w-5" />
        {unread > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground">{unread > 9 ? "9+" : unread}</span>}
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full max-w-[440px] overflow-y-auto px-3 sm:max-w-[440px]">
          <SheetHeader className="text-left">
            <SheetTitle className="text-2xl font-black">Notificaciones</SheetTitle>
            <SheetDescription>{unread > 0 ? `${unread} sin leer` : "Estás al día"}</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {mode !== "user" && (
              <div className="rounded-2xl border border-border bg-card p-3 text-sm">
                <p className="font-bold">Creá tu cuenta para recibir likes, comentarios y seguidores.</p>
                <Link to="/auth" search={{ mode: "signup" }} onClick={() => setOpen(false)} className="mt-2 inline-block text-xs font-black text-primary">Crear cuenta</Link>
              </div>
            )}
            {items.length === 0 && !loading && (
              <p className="py-10 text-center text-sm text-muted-foreground">Todavía no tenés notificaciones. Cuando alguien te dé like, te comente o te siga, lo vas a ver acá. Los recordatorios de drops que actives también aparecen acá.</p>
            )}
            {items.map((n) => {
              const Icon = ICONS[n.kind];
              const isRead = seen.includes(n.id);
              const body = (
                <>
                  <span className="relative shrink-0">
                    {n.avatar ? <img src={n.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /> : (
                      <span className="grid h-10 w-10 place-items-center rounded-full text-primary-foreground" style={{ backgroundImage: "var(--gradient-drop)" }}><Icon className="h-4 w-4" /></span>
                    )}
                    {n.avatar && <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground"><Icon className="h-3 w-3" /></span>}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold leading-snug">{n.title}</span>
                      {!isRead && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </span>
                    {n.body && <span className="mt-0.5 block break-words text-xs text-muted-foreground">{n.body}</span>}
                    {n.kind !== "reminder" && <span className="mt-1 block text-[11px] text-muted-foreground">{timeAgo(n.at)}</span>}
                  </span>
                </>
              );
              const cls = `flex w-full gap-3 rounded-2xl border p-3 text-left transition-colors ${isRead ? "border-border bg-card" : "border-primary/40 bg-primary/5"}`;
              return n.drop ? (
                <Link key={n.id} to="/drop" search={{ d: n.drop, tab: n.tab }} onClick={() => { markOne(n.id); setOpen(false); }} className={cls}>{body}</Link>
              ) : (
                <button key={n.id} type="button" onClick={() => markOne(n.id)} className={cls}>{body}</button>
              );
            })}
            {unread > 0 && (
              <button type="button" onClick={markAll} className="w-full rounded-xl border border-primary/40 py-3 text-sm font-bold text-primary">Marcar todas como leídas</button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
