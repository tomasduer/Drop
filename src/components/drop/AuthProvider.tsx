import { createContext, useContext, useEffect, useRef, useState } from "react";
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
const EDITABLE = ["display_name", "avatar_url", "favorite_artists", "active_drop", "username", "bio"] as const;

type Ctx = {
  state: DropState; refresh: () => Promise<void>; revision: number;
  mode: AccessMode; user: User | null; profile: Profile;
  saveProfile: (patch: Partial<Profile>) => Promise<boolean>;
  movePoints: (movement: PointMovement, patch?: Partial<Profile>) => Promise<boolean>;
  enterGuest: (details: { name: string; avatar: string | null }) => void; signOut: () => Promise<void>; resetProfile: () => void;
  reviews: Record<string, AlbumReview>; saveReview: (id: string, review: AlbumReview | null) => void;
  mergeReviews: (map: Record<string, AlbumReview>) => void;
  customAlbums: CustomAlbum[]; addAlbum: (album: CustomAlbum) => void;
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

  async function loadProfile(u: User) {
    try {
      const data = await fetchState();
      if (guestActive.current) return;
      if (!data.profile || data.profile.id !== u.id) { toast.error('Tu cuenta necesita revisión: falta el perfil.'); setMode('signed_out'); return; }
      setState(data); setProfile(p => ({ ...data.profile as Profile, listened_albums: [...data.profile?.listened_albums ?? [], ...p.listened_albums.filter(id=>id.startsWith("custom-"))] })); setRevision((r) => r + 1);
    } catch { toast.error('No pudimos cargar tus datos guardados.'); }
  }
  async function refresh() { if (user && mode === 'user') await loadProfile(user); }

  useEffect(() => {
    const apply = (u: User | null) => {
      if (guestActive.current) return;
      setUser(u);
      if (u) { setMode("user"); void loadProfile(u); }
      else setMode((m) => (m === "guest" ? "guest" : "signed_out"));
    };
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED" || event === "INITIAL_SESSION") apply(session?.user ?? null);
    });
    void supabase.auth.getUser().then(({ data }) => apply(data.user));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function saveProfile(patch: Partial<Profile>) {
    if (mode !== "user" || !user) { setProfile((p) => ({ ...p, ...patch })); return true; }
    const safe: Partial<Pick<Profile, (typeof EDITABLE)[number]>> = {};
    for (const key of EDITABLE) if (key in patch) (safe as Record<string, unknown>)[key] = patch[key];
    if (!Object.keys(safe).length) return true;
    // username/bio se crean al aceptar el borrador; el tipo generado aún no las incluye.
    const { data, error } = await supabase.from("profiles").update(safe as never).eq("id", user.id).select("*").single();
    if (error) { toast.error("No pudimos guardar tus cambios"); return false; }
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
  }
  async function signOut() {
    if (!guestActive.current) await supabase.auth.signOut();
    guestActive.current = false;
    resetProfile(); setUser(null); setMode("signed_out");
  }

  return <AuthContext.Provider value={{ state, refresh, revision, mode, user, profile, saveProfile, movePoints, enterGuest, signOut, resetProfile, reviews, saveReview, mergeReviews, customAlbums, addAlbum: (a) => setCustomAlbums((prev) => [a, ...prev]) }}>{children}</AuthContext.Provider>;
}
export function useDropAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useDropAuth must be used inside AuthProvider");
  return ctx;
}
