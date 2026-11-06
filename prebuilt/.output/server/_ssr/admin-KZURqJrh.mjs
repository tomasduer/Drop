import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useDropAuth } from "./AuthProvider-BQJkBTYx.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as useIsDropAdmin, b as useDropContent, r as reloadDropContent, D as DROP_CATALOG, K as KIND_LABEL, F as FONT_OPTIONS, t as themeCss } from "./drops-BxtCkIiJ.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";

import { k as ArrowLeft, l as ShieldAlert, m as Plus, L as LoaderCircle, I as ImagePlus, n as Save, o as Pencil, E as Eye, p as EyeOff, q as Trash2 } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "./server-CdsCYb-t.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/unenv.mjs";

import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-GhtpbD3-.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
const db = supabase;
const STATUS_OPTIONS = [
  { value: "pending", label: "Próximamente" },
  { value: "active", label: "Activo" },
  { value: "closed", label: "Archivo" }
];
const slugify = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
async function shrink(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return await new Promise((resolve, reject) => canvas.toBlob((b) => b ? resolve(b) : reject(new Error("No se pudo procesar la imagen")), "image/webp", 0.85));
}
async function uploadDropImage(dropId, field, file) {
  const blob = await shrink(file);
  const path = `${dropId}/${field}-${Date.now()}.webp`;
  const { error } = await db.storage.from("drop-imagenes").upload(path, blob, { contentType: "image/webp", upsert: true });
  if (error) throw new Error(error.message ?? "No se pudo subir la imagen");
  return db.storage.from("drop-imagenes").getPublicUrl(path).data.publicUrl;
}
const inputCls = "w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary";
const labelCls = "mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground";
const IMAGE_FIELDS = [
  { key: "hero_url", label: "Portada del drop", hint: "Foto grande de arriba (horizontal o cuadrada)." },
  { key: "cover_url", label: "Ícono", hint: "Foto redonda chica: conviene una cara." },
  { key: "album_url", label: "Tapa del álbum", hint: "Se usa en el Archivo y en las listas." }
];
function DropEditor({ campaign, content, takenIds, onSaved }) {
  const { refresh } = useDropAuth();
  const isNew = !campaign;
  const catalog = DROP_CATALOG.find((d) => d.id === campaign?.id);
  const [f, setF] = reactExports.useState(() => ({
    id: campaign?.id ?? "",
    artist: campaign?.artist ?? "",
    title: campaign?.title ?? "",
    status: campaign?.status ?? "pending",
    kind: content?.kind ?? catalog?.kind ?? "album",
    tagline: content?.tagline || catalog?.tagline || "",
    description: content?.description || catalog?.description || "",
    dates: content?.dates || catalog?.dates || "",
    fandom: content?.fandom || catalog?.fandom || "",
    cover_url: content?.cover_url ?? "",
    hero_url: content?.hero_url ?? "",
    album_url: content?.album_url ?? "",
    theme: content?.theme ?? {}
  }));
  const [busy, setBusy] = reactExports.useState(null);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const setTheme = (patch) => setF((p) => ({ ...p, theme: { ...p.theme, ...patch } }));
  const id = isNew ? f.id || slugify(`${f.artist}-${f.title}`) : f.id;
  const hasTheme = Object.keys(f.theme).length > 0;
  async function upload(field, file) {
    if (!file) return;
    if (!id) {
      toast.error("Primero completá artista y título");
      return;
    }
    setBusy(field);
    try {
      set(field, await uploadDropImage(id, field.replace("_url", ""), file));
      toast.success("Foto subida");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo subir la foto");
    } finally {
      setBusy(null);
    }
  }
  async function save() {
    if (!f.artist.trim() || !f.title.trim()) {
      toast.error("Completá artista y título");
      return;
    }
    if (!/^[a-z0-9-]{2,40}$/.test(id)) {
      toast.error("El identificador solo puede tener letras, números y guiones");
      return;
    }
    if (isNew && takenIds.includes(id)) {
      toast.error("Ya existe un drop con ese identificador");
      return;
    }
    setBusy("save");
    const camp = await db.from("campaigns").upsert({ id, artist: f.artist.trim(), title: f.title.trim(), status: f.status });
    if (camp.error) {
      setBusy(null);
      toast.error("No se pudo guardar el drop: " + camp.error.message);
      return;
    }
    const row = {
      campaign_id: id,
      kind: f.kind,
      tagline: f.tagline.trim(),
      description: f.description.trim(),
      dates: f.dates.trim(),
      fandom: f.fandom.trim(),
      cover_url: f.cover_url || null,
      hero_url: f.hero_url || null,
      album_url: f.album_url || null,
      theme: f.theme,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    const cont = await db.from("drop_content").upsert(row);
    setBusy(null);
    if (cont.error) {
      toast.error("Se guardó el drop pero no su contenido: " + cont.error.message);
      return;
    }
    toast.success(isNew ? "Drop creado" : "Cambios guardados");
    await refresh();
    await onSaved(id);
  }
  const previewImg = f.hero_url || catalog?.hero;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-5 rounded-3xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: isNew ? "Nuevo drop" : `Editar: ${campaign?.title}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Artista", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.artist, onChange: (e) => set("artist", e.target.value), placeholder: "Ej: Airbag" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Título del drop", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.title, onChange: (e) => set("title", e.target.value), placeholder: "Ej: El Club de la Pelea I" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: inputCls, value: f.kind, onChange: (e) => set("kind", e.target.value), children: Object.keys(KIND_LABEL).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: KIND_LABEL[k] }, k)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Estado", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: inputCls, value: f.status, onChange: (e) => set("status", e.target.value), children: STATUS_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Frase corta", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.tagline, onChange: (e) => set("tagline", e.target.value), placeholder: "Aparece debajo del título" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fechas / lugar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.dates, onChange: (e) => set("dates", e.target.value), placeholder: "Ej: En curso · Teatro Vorterix" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre del fandom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.fandom, onChange: (e) => set("fandom", e.target.value), placeholder: "Ej: Primas" }) }),
      isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Identificador (para el link)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: f.id, onChange: (e) => set("id", slugify(e.target.value)), placeholder: slugify(`${f.artist}-${f.title}`) || "se arma solo" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Descripción", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: `${inputCls} min-h-24`, value: f.description, onChange: (e) => set("description", e.target.value), placeholder: "Qué van a encontrar los fans en este drop" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: labelCls, children: "Fotos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-3", children: IMAGE_FIELDS.map((fld) => {
        const current = f[fld.key] || (fld.key === "hero_url" ? catalog?.hero : fld.key === "cover_url" ? catalog?.cover : catalog?.album);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block cursor-pointer rounded-2xl border border-dashed border-border p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-2 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-muted", children: busy === fld.key ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }) : current ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: current, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-bold", children: fld.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] text-muted-foreground", children: fld.hint }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => void upload(fld.key, e.target.files?.[0]) })
        ] }, fld.key);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: labelCls, children: "Estética del drop" }),
      !hasTheme && !isNew && catalog ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs text-muted-foreground", children: "Este drop usa la estética armada a mano. Si cambiás algo acá, la reemplazás." }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Color, { label: "Fondo", value: f.theme.background ?? (f.theme.light ? "#f7f5f2" : "#141414"), onChange: (v) => setTheme({ background: v }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Color, { label: "Color principal", value: f.theme.primary ?? "#ef4203", onChange: (v) => setTheme({ primary: v }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Color, { label: "Color secundario", value: f.theme.accent ?? f.theme.primary ?? "#ef4203", onChange: (v) => setTheme({ accent: v }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipografía de títulos", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: inputCls, value: f.theme.font ?? "Bricolage Grotesque", onChange: (e) => setTheme({ font: e.target.value }), children: FONT_OPTIONS.map((font) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: font, style: { fontFamily: font }, children: font }, font)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!f.theme.light, onChange: (e) => setTheme({ light: e.target.checked }) }),
          " Tema claro"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!f.theme.uppercase, onChange: (e) => setTheme({ uppercase: e.target.checked }) }),
          " Títulos en mayúsculas"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: themeCss(id || "preview", f.theme, ".drop-preview") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drop-preview mt-4 overflow-hidden rounded-2xl border", style: { background: "var(--background)", color: "var(--foreground)", borderColor: "var(--border)" }, children: [
        previewImg && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewImg, alt: "", className: "h-36 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", style: { backgroundImage: "var(--gradient-glow)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold", style: { color: "var(--primary)" }, children: [
            f.artist || "Artista",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 rounded-full px-1.5 py-px text-[10px] font-bold uppercase text-white", style: { background: "oklch(0.64 0.21 40)" }, children: KIND_LABEL[f.kind] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl", style: { fontFamily: "var(--font-display)", textTransform: "var(--display-transform)" }, children: f.title || "Título del drop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--muted-foreground)" }, children: f.tagline || "Frase corta del drop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-xl p-3", style: { background: "var(--card)", border: "1px solid var(--border)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full px-4 py-2 text-sm font-bold", style: { backgroundImage: "var(--gradient-drop)", color: "var(--primary-foreground)" }, children: "Entrar al drop" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => void save(), disabled: busy === "save", className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-primary-foreground disabled:opacity-60", children: [
      busy === "save" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
      " ",
      isNew ? "Crear drop" : "Guardar cambios"
    ] }),
    isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Después de crearlo vas a poder sumarle misiones." })
  ] });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: label }),
    children
  ] });
}
function Color({ label, value, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value, onChange: (e) => onChange(e.target.value), className: "h-10 w-12 cursor-pointer rounded-lg border border-border bg-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value, onChange: (e) => /^#[0-9a-f]{0,6}$/i.test(e.target.value) && onChange(e.target.value) })
  ] }) });
}
const emptyQuestion = () => ({ q: "", options: ["", "", ""], correct: 0 });
const newDraft = (kind) => ({
  kind,
  title: "",
  repeat: "once",
  general: kind === "clue" ? 60 : 100,
  campaign: kind === "clue" ? 120 : 200,
  questions: kind === "trivia" ? [emptyQuestion()] : [],
  answer: ""
});
const KIND_NAME = { trivia: "Trivia", clue: "Acertijo", order: "Ordenar", stream: "Escuchar", scan: "QR", ar: "Realidad aumentada" };
function MissionsEditor({ campaignId }) {
  const { refresh } = useDropAuth();
  const [missions, setMissions] = reactExports.useState([]);
  const [draft, setDraft] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  async function load() {
    const { data } = await db.from("missions").select("*").eq("campaign_id", campaignId).order("id");
    setMissions(data ?? []);
  }
  reactExports.useEffect(() => {
    void load();
  }, [campaignId]);
  async function edit(m) {
    if (m.kind !== "trivia" && m.kind !== "clue") {
      toast.message("Este tipo de misión todavía no se edita desde el panel.");
      return;
    }
    const { data } = await db.from("mission_validation_rules").select("rules").eq("mission_id", m.id).maybeSingle();
    const rules = data?.rules ?? {};
    setDraft({
      id: m.id,
      kind: m.kind,
      title: m.title,
      repeat: m.repeat_period,
      general: m.general_reward,
      campaign: m.campaign_reward,
      questions: rules.pool ?? rules.questions ?? [emptyQuestion()],
      answer: (rules.codes ?? []).join(", ")
    });
  }
  async function toggle(m) {
    const status = m.status === "verified" ? "pending" : "verified";
    const { error } = await db.from("missions").update({ status }).eq("id", m.id);
    if (error) {
      toast.error("No se pudo cambiar");
      return;
    }
    toast.success(status === "verified" ? "Misión visible para los fans" : "Misión oculta");
    await load();
    await refresh();
  }
  async function save(d) {
    if (!d.title.trim()) {
      toast.error("Poné un título");
      return;
    }
    let rules;
    if (d.kind === "trivia") {
      const qs = d.questions.map((q) => ({ q: q.q.trim(), options: q.options.map((o) => o.trim()).filter(Boolean), correct: q.correct }));
      if (!qs.length || qs.some((q) => !q.q || q.options.length < 2 || q.correct >= q.options.length)) {
        toast.error("Cada pregunta necesita texto, al menos 2 opciones y la correcta marcada");
        return;
      }
      rules = d.repeat === "daily" && qs.length > 5 ? { per_round: 5, pool: qs } : { questions: qs };
    } else {
      const codes = d.answer.split(",").map((c) => c.trim().toLowerCase()).filter(Boolean);
      if (!codes.length) {
        toast.error("Escribí la respuesta del acertijo");
        return;
      }
      rules = { codes };
    }
    let id = d.id;
    if (!id) {
      const base = `${campaignId}-${slugify(d.title)}`.slice(0, 60);
      id = base;
      let n = 2;
      while (missions.some((m2) => m2.id === id)) id = `${base}-${n++}`;
    }
    setBusy(true);
    const mission = {
      id,
      campaign_id: campaignId,
      title: d.title.trim(),
      kind: d.kind,
      status: "verified",
      general_reward: clamp(d.general),
      campaign_reward: clamp(d.campaign),
      repeat_period: d.kind === "trivia" ? d.repeat : "once",
      max_checks: d.kind === "clue" ? 3 : 1,
      question_seconds: 20
    };
    const m = await db.from("missions").upsert(mission);
    const r = m.error ? m : await db.from("mission_validation_rules").upsert({ mission_id: id, rules });
    setBusy(false);
    if (r.error) {
      toast.error("No se pudo guardar la misión: " + r.error.message);
      return;
    }
    toast.success(d.id ? "Misión actualizada" : "Misión creada");
    setDraft(null);
    await load();
    await refresh();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-3xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Misiones" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDraft(newDraft("trivia")), className: "inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Trivia"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDraft(newDraft("clue")), className: "inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Acertijo"
        ] })
      ] })
    ] }),
    missions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Este drop todavía no tiene misiones." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: missions.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 rounded-2xl border border-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-bold", children: m.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          KIND_NAME[m.kind] ?? m.kind,
          m.repeat_period === "daily" ? " · diaria" : "",
          " · +",
          m.campaign_reward,
          " pts del drop · ",
          m.status === "verified" ? "visible" : "oculta"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void edit(m), "aria-label": "Editar", className: "rounded-full p-2 hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void toggle(m), "aria-label": m.status === "verified" ? "Ocultar" : "Mostrar", className: "rounded-full p-2 hover:bg-muted", children: m.status === "verified" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" }) })
    ] }, m.id)) }),
    draft && /* @__PURE__ */ jsxRuntimeExports.jsx(DraftForm, { draft, setDraft, busy, onSave: () => void save(draft) })
  ] });
}
const clamp = (n) => Math.max(0, Math.min(500, Math.round(Number(n) || 0)));
function DraftForm({ draft: d, setDraft, busy, onSave }) {
  const upd = (patch) => setDraft({ ...d, ...patch });
  const updQ = (i, patch) => upd({ questions: d.questions.map((q, j) => j === i ? { ...q, ...patch } : q) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-2xl border border-primary/50 bg-background/40 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold", children: [
      d.id ? "Editar" : "Nueva",
      " ",
      d.kind === "trivia" ? "trivia" : "acertijo"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Título" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: d.title, onChange: (e) => upd({ title: e.target.value }), placeholder: d.kind === "trivia" ? "Ej: Trivia del disco" : 'Ej: Completá el título: "La nueva…"' })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: [
      d.kind === "trivia" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Se juega" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: inputCls, value: d.repeat, onChange: (e) => upd({ repeat: e.target.value }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "once", children: "Una vez" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "daily", children: "Todos los días" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Puntos del drop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 500, className: inputCls, value: d.campaign, onChange: (e) => upd({ campaign: Number(e.target.value) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Puntos DROP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 500, className: inputCls, value: d.general, onChange: (e) => upd({ general: Number(e.target.value) }) })
      ] })
    ] }),
    d.kind === "clue" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Respuesta secreta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: d.answer, onChange: (e) => upd({ answer: e.target.value }), placeholder: "Ej: violencia" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] text-muted-foreground", children: "No importan mayúsculas. Si ponés varias separadas por coma, el fan tiene que encontrar todas." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      d.repeat === "daily" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Si cargás más de 5 preguntas, cada día salen 5 distintas." }),
      d.questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-xl border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-muted-foreground", children: [
            i + 1,
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: q.q, onChange: (e) => updQ(i, { q: e.target.value }), placeholder: "Pregunta" }),
          d.questions.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => upd({ questions: d.questions.filter((_, j) => j !== i) }), "aria-label": "Borrar pregunta", className: "p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }),
        q.options.map((o, k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 pl-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: `correct-${i}`, checked: q.correct === k, onChange: () => updQ(i, { correct: k }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: o, onChange: (e) => updQ(i, { options: q.options.map((x, j) => j === k ? e.target.value : x) }), placeholder: `Opción ${k + 1}${q.correct === k ? " (correcta)" : ""}` })
        ] }, k))
      ] }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => upd({ questions: [...d.questions, emptyQuestion()] }), className: "inline-flex items-center gap-1 text-sm font-bold text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Agregar pregunta"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Marcá con el círculo cuál es la opción correcta." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onSave, disabled: busy, className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-2.5 font-bold text-primary-foreground disabled:opacity-60", children: [
        busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Guardar misión"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDraft(null), className: "rounded-full border border-border px-4 py-2.5 text-sm font-bold", children: "Cancelar" })
    ] })
  ] });
}
function AdminPanel() {
  const [campaigns, setCampaigns] = reactExports.useState([]);
  const [selected, setSelected] = reactExports.useState(null);
  const content = useDropContent();
  async function load() {
    const { data, error } = await db.from("campaigns").select("*").order("id");
    if (error) {
      toast.error("No pudimos cargar los drops");
      return;
    }
    setCampaigns(data);
  }
  reactExports.useEffect(() => {
    void load();
    void reloadDropContent();
  }, []);
  const current = selected && selected !== "new" ? campaigns.find((c) => c.id === selected) : void 0;
  const label = (s) => STATUS_OPTIONS.find((o) => o.value === s)?.label ?? s;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black", children: "Drops" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected("new"), className: "inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Nuevo drop"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: campaigns.map((c) => {
        const row = content.find((x) => x.campaign_id === c.id);
        const kind = row?.kind ?? DROP_CATALOG.find((d) => d.id === c.id)?.kind;
        const img = row?.cover_url ?? DROP_CATALOG.find((d) => d.id === c.id)?.cover;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setSelected(c.id),
            className: `flex items-center gap-3 rounded-2xl border p-3 text-left ${selected === c.id ? "border-primary bg-primary/10" : "border-border bg-card"}`,
            children: [
              img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", className: "h-12 w-12 rounded-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-12 w-12 rounded-full bg-muted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-xs font-bold text-primary", children: [
                  c.artist,
                  kind ? ` · ${KIND_LABEL[kind]}` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate font-bold", children: c.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: label(c.status) })
              ] })
            ]
          },
          c.id
        );
      }) })
    ] }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropEditor,
      {
        campaign: current,
        content: current ? content.find((x) => x.campaign_id === current.id) : void 0,
        takenIds: campaigns.map((c) => c.id),
        onSaved: async (id) => {
          await load();
          await reloadDropContent();
          setSelected(id);
        }
      },
      selected
    ),
    current && /* @__PURE__ */ jsxRuntimeExports.jsx(MissionsEditor, { campaignId: current.id }, `m-${current.id}`)
  ] });
}
function AdminPage() {
  const {
    mode,
    user
  } = useDropAuth();
  const isAdmin = useIsDropAdmin(mode === "user" ? user?.id : null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto min-h-screen max-w-3xl px-4 pb-24 pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explorar", className: "inline-flex items-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Volver a la app"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-3xl font-black", children: "Panel de drops" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Creá y editá drops, sus fotos, su estética y sus misiones sin tocar código." }),
    mode === "loading" || mode === "user" && isAdmin === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-sm text-muted-foreground", children: "Cargando…" }) : mode !== "user" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Notice, { title: "Entrá con tu cuenta", children: [
      "El panel solo funciona con una cuenta de DROP (no en modo invitado). ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
        mode: "login"
      }, className: "font-bold text-primary underline", children: "Iniciar sesión" })
    ] }) : !isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Notice, { title: "Tu cuenta todavía no es administradora", children: [
      "Pedí que agreguen esta cuenta como admin: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: user?.email })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPanel, {})
  ] });
}
function Notice({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-5 w-5 text-primary" }),
      " ",
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children })
  ] });
}
export {
  AdminPage as component
};
