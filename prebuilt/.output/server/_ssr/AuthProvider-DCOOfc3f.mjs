import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";
import { a as useRouter } from "../_libs/tanstack__react-router.mjs";
import { K as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-xIl5fJOp.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CxDXaBlF.mjs";
import { o as objectType, r as recordType, u as unionType, s as stringType, b as booleanType, e as enumType, n as numberType, a as arrayType } from "../_libs/zod.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getDropState = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("0282cb30ac3d9a0c6fdc29fccd2150591b518ac68ad6d46d2f846c7a83b82204"));
const missionAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  action: enumType(["start", "answer", "check"]),
  payload: recordType(unionType([stringType(), numberType(), arrayType(numberType())]))
}).parse(input)).handler(createSsrRpc("672ca852e924c795e9c5f7c87461a501218d2d415283046631b40cfb30f21f0b"));
const pointsAction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  action: enumType(["album", "redeem"]),
  payload: recordType(unionType([stringType(), booleanType()]))
}).parse(input)).handler(createSsrRpc("b693e632df351f79af665d6f3a4e38bd61d59d8d309969c9fec1dc129ccea2e0"));
const getRanking = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  campaign: stringType().min(1),
  scope: enumType(["Global", "Amigos", "Semanal"])
}).parse(input)).handler(createSsrRpc("013869ca50bc89563524db78e408d569fd1e9a22d8182c34bd19298094e3dbaa"));
const followFan = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  follow: booleanType()
}).parse(input)).handler(createSsrRpc("c5f12bfbb684a44cd15bc28e4d78d85b20008334d836acbc46c80f5f0e6158d1"));
const emptyDropState = { profile: null, campaigns: [], missions: [], balances: [], attempts: [], movements: [], rewards: [], redemptions: [] };
const guestProfile = {
  id: "guest",
  display_name: "@invitado",
  avatar_url: null,
  favorite_artists: ["LALI", "María Becerra", "TINI"],
  listened_albums: [],
  general_points: 0,
  active_drop: "lali",
  ranking_points: {},
  created_at: "2026-01-01T00:00:00Z",
  username: null,
  bio: null
};
const GUEST_KEY = "drop-invitado";
const EDITABLE = ["display_name", "avatar_url", "favorite_artists", "active_drop", "username", "bio"];
const AuthContext = reactExports.createContext(null);
function AuthProvider({ children }) {
  const fetchState = useServerFn(getDropState);
  const operatePoints = useServerFn(pointsAction);
  const [state, setState] = reactExports.useState(emptyDropState);
  const [revision, setRevision] = reactExports.useState(0);
  const [mode, setMode] = reactExports.useState("loading");
  const [user, setUser] = reactExports.useState(null);
  const [profile, setProfile] = reactExports.useState(guestProfile);
  const [reviews, setReviews] = reactExports.useState({});
  const [customAlbums, setCustomAlbums] = reactExports.useState([]);
  const guestActive = reactExports.useRef(false);
  const inflight = reactExports.useRef(null);
  function loadProfile(u, dedupe = false) {
    if (dedupe && inflight.current?.id === u.id) return inflight.current.promise;
    const promise = doLoadProfile(u).finally(() => {
      if (inflight.current?.promise === promise) inflight.current = null;
    });
    inflight.current = { id: u.id, promise };
    return promise;
  }
  async function doLoadProfile(u) {
    try {
      const data = await fetchState();
      if (guestActive.current) return;
      if (!data.profile || data.profile.id !== u.id) {
        toast.error("Tu cuenta necesita revisión: falta el perfil.");
        setMode("signed_out");
        return;
      }
      setState(data);
      setProfile((p) => ({ ...data.profile, listened_albums: [...data.profile?.listened_albums ?? [], ...p.listened_albums.filter((id) => id.startsWith("custom-"))] }));
      setRevision((r) => r + 1);
      const { data: saved } = await supabase.from("user_albums").select("album_id,title,artist,year,cover").order("created_at", { ascending: false });
      if (saved) setCustomAlbums((prev) => [...saved.map((a) => ({ id: a.album_id, title: a.title, artist: a.artist, year: a.year, cover: a.cover ?? "" })), ...prev.filter((a) => a.id.startsWith("custom-"))]);
    } catch {
      toast.error("No pudimos cargar tus datos guardados.");
    }
  }
  async function addAlbum(a) {
    if (a.id.startsWith("dz-") && mode === "user" && user) {
      const { error } = await supabase.from("user_albums").upsert({ user_id: user.id, album_id: a.id, title: a.title.slice(0, 200), artist: a.artist.slice(0, 200), year: a.year.slice(0, 4), cover: a.cover || null }, { onConflict: "user_id,album_id", ignoreDuplicates: true });
      if (error) {
        toast.error("No pudimos guardar el álbum en tu biblioteca.");
        return false;
      }
    }
    setCustomAlbums((prev) => prev.some((x) => x.id === a.id) ? prev : [a, ...prev]);
    return true;
  }
  async function loadPublicCatalog() {
    const db = supabase;
    try {
      const [c, m] = await Promise.all([db.from("campaigns").select("*"), db.from("missions").select("*")]);
      if (!guestActive.current) return;
      setState({ ...emptyDropState, campaigns: c.data ?? [], missions: m.data ?? [] });
    } catch {
    }
  }
  async function refresh() {
    if (user && mode === "user") await loadProfile(user);
  }
  reactExports.useEffect(() => {
    const apply = (u, dedupe = false) => {
      if (guestActive.current) return;
      setUser(u);
      if (u) {
        setMode("user");
        void loadProfile(u, dedupe);
        try {
          localStorage.removeItem(GUEST_KEY);
        } catch {
        }
      } else {
        let saved = null;
        try {
          saved = JSON.parse(localStorage.getItem(GUEST_KEY) ?? "null");
        } catch {
          saved = null;
        }
        if (saved?.name) {
          guestActive.current = true;
          setProfile({ ...guestProfile, display_name: saved.name, avatar_url: saved.avatar ?? null });
          setMode("guest");
          void loadPublicCatalog();
          return;
        }
        setMode((m) => m === "guest" ? "guest" : "signed_out");
      }
    };
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED" || event === "INITIAL_SESSION") apply(session?.user ?? null, event === "INITIAL_SESSION" || event === "SIGNED_IN");
    });
    void supabase.auth.getUser().then(({ data }) => apply(data.user, true));
    return () => sub.subscription.unsubscribe();
  }, []);
  async function saveProfile(patch) {
    if (mode !== "user" || !user) {
      setProfile((p) => ({ ...p, ...patch }));
      return true;
    }
    const safe = {};
    for (const key of EDITABLE) if (key in patch) safe[key] = patch[key];
    if (!Object.keys(safe).length) return true;
    const { data, error } = await supabase.from("profiles").update(safe).eq("id", user.id).select("*").single();
    if (error) {
      toast.error(error.code === "23505" ? "Ese nombre de usuario ya está en uso" : "No pudimos guardar tus cambios");
      return false;
    }
    setProfile(data);
    return true;
  }
  async function movePoints(movement, patch) {
    if (movement.reason === "ranking_redeem") {
      toast.error("Los canjes ya no modifican el ranking.");
      return false;
    }
    if (mode !== "user" || !user) {
      setProfile((p) => {
        const ranking = { ...p.ranking_points ?? {} };
        return { ...p, ...patch, general_points: p.general_points, ranking_points: ranking };
      });
      return true;
    }
    if (movement.reference?.startsWith("custom-")) {
      if (patch) setProfile((p) => ({ ...p, listened_albums: patch.listened_albums ?? p.listened_albums }));
      toast.message("Álbum manual guardado solo durante esta sesión; sin puntos reales.");
      return true;
    }
    try {
      await operatePoints({ data: { action: "album", payload: { album_id: movement.reference ?? "", listened: movement.reason === "album_listened" } } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No pudimos registrar tus puntos");
      return false;
    }
    await loadProfile(user);
    return true;
  }
  function saveReview(id, review) {
    if (!profile.listened_albums?.includes(id)) return;
    setReviews((prev) => {
      const next = { ...prev };
      if (review) next[id] = review;
      else delete next[id];
      return next;
    });
  }
  function mergeReviews(map) {
    setReviews((prev) => ({ ...map, ...prev }));
  }
  function resetProfile() {
    setProfile(guestProfile);
    setState(emptyDropState);
    setReviews({});
    setCustomAlbums([]);
  }
  function enterGuest(details) {
    guestActive.current = true;
    resetProfile();
    setUser(null);
    setProfile({ ...guestProfile, display_name: details.name.trim(), avatar_url: details.avatar });
    setMode("guest");
    void loadPublicCatalog();
    try {
      localStorage.setItem(GUEST_KEY, JSON.stringify({ name: details.name.trim(), avatar: details.avatar && details.avatar.length < 9e5 ? details.avatar : null }));
    } catch {
    }
  }
  async function signOut() {
    if (!guestActive.current) await supabase.auth.signOut();
    guestActive.current = false;
    try {
      localStorage.removeItem(GUEST_KEY);
    } catch {
    }
    resetProfile();
    setUser(null);
    setMode("signed_out");
  }
  const value = reactExports.useMemo(
    () => ({ state, refresh, revision, mode, user, profile, saveProfile, movePoints, enterGuest, signOut, resetProfile, reviews, saveReview, mergeReviews, customAlbums, addAlbum }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- las funciones solo leen estos valores
    [state, revision, mode, user, profile, reviews, customAlbums, fetchState, operatePoints]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
}
function useDropAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useDropAuth must be used inside AuthProvider");
  return ctx;
}
export {
  AuthProvider as A,
  useServerFn as a,
  createSsrRpc as c,
  followFan as f,
  getRanking as g,
  missionAction as m,
  pointsAction as p,
  useDropAuth as u
};
