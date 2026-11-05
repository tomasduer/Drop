import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useServerFn } from '@tanstack/react-start';
import { getDropState, pointsAction } from '@/lib/drop.functions';
import { emptyDropState, type DropState } from '@/lib/drop-data';

type Profile = Tables<"profiles"> & { username?: string | null; bio?: string | null };
export type AlbumReview = { rating: number; text: string };
export type CustomAlbum = { id: string; title: string; artist: string; year: string; cover: string };
export type PointMovement = { amount: number; reason: "album_listened" | "album_unlistened" | "ranking_redeem"; artist?: string; reference?: string };
export type AccessMode = "loading" | "signed_out" | "guest" | "user";

const guestProfile: Profile = {
  id: "guest", display_name: "@invitado", avatar_url: null,
  favorite_artists: ["LALI", "María Becerra", "TINI"], listened_albums: [],
  general_points: 0, active_drop: "lali", ranking_points: {}, created_at: "2026-01-01T00:00:00Z",
  username: null, bio: null,
};
const GUEST_KEY = "drop-invitado";
const EDITABLE = ["display_name", "avatar_url", "favorite_artists", "active_drop", "username", "bio"] as const;

type Ctx = {
  state: DropState; refresh: () => Promise<void>; revision: number;
  mode: AccessMode; user: User | null; profile: Profile;
  saveProfile: (patch: Partial<Profile>) => Promise<boolean>;
  movePoints: (movement: PointMovement, patch?: Partial<Profile>) => Promise<boolean>;
  enterGuest: (details: { name: string; avatar: string | null }) => void; signOut: () => Promise<void>; resetProfile: () => void;
  reviews: Record<string, AlbumReview>; saveReview: (id: string, review: AlbumReview | null) => void;
  mergeReviews: (map: Record<string, AlbumReview>) => void;
  customAlbums: CustomAlbum[]; addAlbum: (album: CustomAlbum) => Promise<boolean>;
};
const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchState = useServerFn(getDropState);
  const operatePoints = useServerFn(pointsAction);
  const [state, setState] = useState<DropState>(emptyDropState);
  const [revision, setRevision] = useState(0);
  const [mode, setMode] = useState<AccessMode>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>(guestProfile);
  const [reviews, setReviews] = useState<Record<string, AlbumReview>>({});
  const [customAlbums, setCustomAlbums] = useState<CustomAlbum[]>([]);
  const guestActive = useRef(false);
  // Evita pedir el perfil dos veces cuando getUser e INITIAL_SESSION llegan casi juntos.
  const inflight = useRef<{ id: string; promise: Promise<void> } | null>(null);

  function loadProfile(u: User, dedupe = false) {
    if (dedupe && inflight.current?.id === u.id) return inflight.current.promise;
    const promise = doLoadProfile(u).finally(() => {
      if (inflight.current?.promise === promise) inflight.current = null;
    });
    inflight.current = { id: u.id, promise };
    return promise;
  }
  async function doLoadProfile(u: User) {
    try {
      const data = await fetchState();
      if (guestActive.current) return;
      if (!data.profile || data.profile.id !== u.id) { toast.error('Tu cuenta necesita revisión: falta el perfil.'); setMode('signed_out'); return; }
      setState(data); setProfile(p => ({ ...data.profile as Profile, listened_albums: [...data.profile?.listened_albums ?? [], ...p.listened_albums.filter(id=>id.startsWith("custom-"))] })); setRevision((r) => r + 1);
      // Álbumes del catálogo que el usuario sumó a su biblioteca.
      const { data: saved } = await (supabase as unknown as { from: (t: string) => { select: (c: string) => { order: (c: string, o: { ascending: boolean }) => Promise<{ data: { album_id: string; title: string; artist: string; year: string; cover: string | null }[] | null }> } } })
        .from("user_albums").select("album_id,title,artist,year,cover").order("created_at", { ascending: false });
      if (saved) setCustomAlbums((prev) => [...saved.map((a) => ({ id: a.album_id, title: a.title, artist: a.artist, year: a.year, cover: a.cover ?? "" })), ...prev.filter((a) => a.id.startsWith("custom-"))]);
    } catch { toast.error('No pudimos cargar tus datos guardados.'); }
  }
  async function addAlbum(a: CustomAlbum) {
    if (a.id.startsWith("dz-") && mode === "user" && user) {
      const { error } = await (supabase as unknown as { from: (t: string) => { upsert: (v: unknown, o: { onConflict: string; ignoreDuplicates: boolean }) => Promise<{ error: unknown }> } })
        .from("user_albums").upsert({ user_id: user.id, album_id: a.id, title: a.title.slice(0, 200), artist: a.artist.slice(0, 200), year: a.year.slice(0, 4), cover: a.cover || null }, { onConflict: "user_id,album_id", ignoreDuplicates: true });
      if (error) { toast.error("No pudimos guardar el álbum en tu biblioteca."); return false; }
    }
    setCustomAlbums((prev) => (prev.some((x) => x.id === a.id) ? prev : [a, ...prev]));
    return true;
  }
  // Invitados: drops y misiones públicas, para explorar todos los universos sin cuenta.
  async function loadPublicCatalog() {
    const db = supabase as unknown as { from: (t: string) => { select: (c: string) => Promise<{ data: unknown[] | null }> } };
    try {
      const [c, m] = await Promise.all([db.from("campaigns").select("*"), db.from("missions").select("*")]);
      if (!guestActive.current) return;
      setState({ ...emptyDropState, campaigns: (c.data ?? []) as DropState["campaigns"], missions: (m.data ?? []) as DropState["missions"] });
    } catch { /* sin catálogo: se usan los datos editoriales */ }
  }
  async function refresh() { if (user && mode === 'user') await loadProfile(user); }

  useEffect(() => {
    const apply = (u: User | null, dedupe = false) => {
      if (guestActive.current) return;
      setUser(u);
      if (u) { setMode("user"); void loadProfile(u, dedupe); try { localStorage.removeItem(GUEST_KEY); } catch { /* sin almacenamiento */ } }
      else {
        let saved: { name?: string; avatar?: string | null } | null = null;
        try { saved = JSON.parse(localStorage.getItem(GUEST_KEY) ?? "null"); } catch { saved = null; }
        if (saved?.name) { guestActive.current = true; setProfile({ ...guestProfile, display_name: saved.name, avatar_url: saved.avatar ?? null }); setMode("guest"); void loadPublicCatalog(); return; }
        setMode((m) => (m === "guest" ? "guest" : "signed_out"));
      }
    };
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED" || event === "INITIAL_SESSION") apply(session?.user ?? null, event === "INITIAL_SESSION" || event === "SIGNED_IN");
    });
    void supabase.auth.getUser().then(({ data }) => apply(data.user, true));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function saveProfile(patch: Partial<Profile>) {
    if (mode !== "user" || !user) { setProfile((p) => ({ ...p, ...patch })); return true; }
    const safe: Partial<Pick<Profile, (typeof EDITABLE)[number]>> = {};
    for (const key of EDITABLE) if (key in patch) (safe as Record<string, unknown>)[key] = patch[key];
    if (!Object.keys(safe).length) return true;
    // username/bio se crean al aceptar el borrador; el tipo generado aún no las incluye.
    const { data, error } = await supabase.from("profiles").update(safe as never).eq("id", user.id).select("*").single();
    if (error) {
      toast.error(error.code === "23505" ? "Ese nombre de usuario ya está en uso" : "No pudimos guardar tus cambios");
      return false;
    }
    setProfile(data); return true;
  }

  async function movePoints(movement: PointMovement, patch?: Partial<Profile>) {
    if (movement.reason === 'ranking_redeem') { toast.error('Los canjes ya no modifican el ranking.'); return false; }
    if (mode !== "user" || !user) {
      setProfile((p) => {
        const ranking = { ...((p.ranking_points as Record<string, number>) ?? {}) };

        return { ...p, ...patch, general_points: p.general_points, ranking_points: ranking };
      });
      return true;
    }
    if (movement.reference?.startsWith('custom-')) {
      if (patch) setProfile((p) => ({ ...p, listened_albums: patch.listened_albums ?? p.listened_albums }));
      toast.message('Álbum manual guardado solo durante esta sesión; sin puntos reales.'); return true;
    }
    try { await operatePoints({ data: { action: 'album', payload: { album_id: movement.reference ?? '', listened: movement.reason === 'album_listened' } } }); }
    catch (error) { toast.error(error instanceof Error ? error.message : 'No pudimos registrar tus puntos'); return false; }
    await loadProfile(user); return true;
  }

  function saveReview(id: string, review: AlbumReview | null) {
    if (!profile.listened_albums?.includes(id)) return;
    setReviews((prev) => { const next = { ...prev }; if (review) next[id] = review; else delete next[id]; return next; });
  }
  function mergeReviews(map: Record<string, AlbumReview>) {
    setReviews((prev) => ({ ...map, ...prev }));
  }
  function resetProfile() { setProfile(guestProfile); setState(emptyDropState); setReviews({}); setCustomAlbums([]); }
  function enterGuest(details: { name: string; avatar: string | null }) {
    guestActive.current = true;
    resetProfile(); setUser(null);
    setProfile({ ...guestProfile, display_name: details.name.trim(), avatar_url: details.avatar });
    setMode("guest");
    void loadPublicCatalog();
    // Recordar al invitado en este navegador para que recargar no borre su perfil.
    try { localStorage.setItem(GUEST_KEY, JSON.stringify({ name: details.name.trim(), avatar: details.avatar && details.avatar.length < 900_000 ? details.avatar : null })); } catch { /* sin almacenamiento */ }
  }
  async function signOut() {
    if (!guestActive.current) await supabase.auth.signOut();
    guestActive.current = false;
    try { localStorage.removeItem(GUEST_KEY); } catch { /* sin almacenamiento */ }
    resetProfile(); setUser(null); setMode("signed_out");
  }

  // El valor solo cambia cuando cambia el estado, así las pantallas no se re-renderizan de más.
  const value = useMemo<Ctx>(
    () => ({ state, refresh, revision, mode, user, profile, saveProfile, movePoints, enterGuest, signOut, resetProfile, reviews, saveReview, mergeReviews, customAlbums, addAlbum }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- las funciones solo leen estos valores
    [state, revision, mode, user, profile, reviews, customAlbums, fetchState, operatePoints],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useDropAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useDropAuth must be used inside AuthProvider");
  return ctx;
}
