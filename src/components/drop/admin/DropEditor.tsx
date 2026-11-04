import { useState } from "react";
import { ImagePlus, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { useDropAuth } from "@/components/drop/AuthProvider";
import { FONT_OPTIONS, themeCss, type DropContent, type DropTheme } from "@/lib/drop-content";
import { DROP_CATALOG, KIND_LABEL, type DropKind } from "@/lib/drops";
import { db, inputCls, labelCls, slugify, STATUS_OPTIONS, uploadDropImage, type CampaignRow } from "./admin-db";

type Form = {
  id: string; artist: string; title: string; status: CampaignRow["status"]; kind: DropKind;
  tagline: string; description: string; dates: string; fandom: string;
  cover_url: string; hero_url: string; album_url: string; theme: DropTheme;
};

const IMAGE_FIELDS: { key: "hero_url" | "cover_url" | "album_url"; label: string; hint: string }[] = [
  { key: "hero_url", label: "Portada del drop", hint: "Foto grande de arriba (horizontal o cuadrada)." },
  { key: "cover_url", label: "Ícono", hint: "Foto redonda chica: conviene una cara." },
  { key: "album_url", label: "Tapa del álbum", hint: "Se usa en el Archivo y en las listas." },
];

export function DropEditor({ campaign, content, takenIds, onSaved }: {
  campaign?: CampaignRow; content?: DropContent; takenIds: string[]; onSaved: (id: string) => Promise<void>;
}) {
  const { refresh } = useDropAuth();
  const isNew = !campaign;
  const catalog = DROP_CATALOG.find((d) => d.id === campaign?.id);
  const [f, setF] = useState<Form>(() => ({
    id: campaign?.id ?? "", artist: campaign?.artist ?? "", title: campaign?.title ?? "", status: campaign?.status ?? "pending",
    kind: content?.kind ?? catalog?.kind ?? "album",
    tagline: content?.tagline || catalog?.tagline || "", description: content?.description || catalog?.description || "",
    dates: content?.dates || catalog?.dates || "", fandom: content?.fandom || catalog?.fandom || "",
    cover_url: content?.cover_url ?? "", hero_url: content?.hero_url ?? "", album_url: content?.album_url ?? "",
    theme: content?.theme ?? {},
  }));
  const [busy, setBusy] = useState<string | null>(null);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  const setTheme = (patch: Partial<DropTheme>) => setF((p) => ({ ...p, theme: { ...p.theme, ...patch } }));
  const id = isNew ? f.id || slugify(`${f.artist}-${f.title}`) : f.id;
  const hasTheme = Object.keys(f.theme).length > 0;

  async function upload(field: (typeof IMAGE_FIELDS)[number]["key"], file?: File) {
    if (!file) return;
    if (!id) { toast.error("Primero completá artista y título"); return; }
    setBusy(field);
    try { set(field, await uploadDropImage(id, field.replace("_url", ""), file)); toast.success("Foto subida"); }
    catch (e) { toast.error(e instanceof Error ? e.message : "No se pudo subir la foto"); }
    finally { setBusy(null); }
  }

  async function save() {
    if (!f.artist.trim() || !f.title.trim()) { toast.error("Completá artista y título"); return; }
    if (!/^[a-z0-9-]{2,40}$/.test(id)) { toast.error("El identificador solo puede tener letras, números y guiones"); return; }
    if (isNew && takenIds.includes(id)) { toast.error("Ya existe un drop con ese identificador"); return; }
    setBusy("save");
    const camp = await db.from("campaigns").upsert({ id, artist: f.artist.trim(), title: f.title.trim(), status: f.status });
    if (camp.error) { setBusy(null); toast.error("No se pudo guardar el drop: " + camp.error.message); return; }
    const row: DropContent = {
      campaign_id: id, kind: f.kind, tagline: f.tagline.trim(), description: f.description.trim(), dates: f.dates.trim(), fandom: f.fandom.trim(),
      cover_url: f.cover_url || null, hero_url: f.hero_url || null, album_url: f.album_url || null, theme: f.theme, updated_at: new Date().toISOString(),
    };
    const cont = await db.from("drop_content").upsert(row);
    setBusy(null);
    if (cont.error) { toast.error("Se guardó el drop pero no su contenido: " + cont.error.message); return; }
    toast.success(isNew ? "Drop creado" : "Cambios guardados");
    await refresh();
    await onSaved(id);
  }

  const previewImg = f.hero_url || catalog?.hero;

  return (
    <section className="space-y-5 rounded-3xl border border-border bg-card p-5">
      <h2 className="text-xl font-black">{isNew ? "Nuevo drop" : `Editar: ${campaign?.title}`}</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Artista"><input className={inputCls} value={f.artist} onChange={(e) => set("artist", e.target.value)} placeholder="Ej: Airbag" /></Field>
        <Field label="Título del drop"><input className={inputCls} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Ej: El Club de la Pelea I" /></Field>
        <Field label="Tipo">
          <select className={inputCls} value={f.kind} onChange={(e) => set("kind", e.target.value as DropKind)}>
            {(Object.keys(KIND_LABEL) as DropKind[]).map((k) => <option key={k} value={k}>{KIND_LABEL[k]}</option>)}
          </select>
        </Field>
        <Field label="Estado">
          <select className={inputCls} value={f.status} onChange={(e) => set("status", e.target.value as CampaignRow["status"])}>
            {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field label="Frase corta"><input className={inputCls} value={f.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="Aparece debajo del título" /></Field>
        <Field label="Fechas / lugar"><input className={inputCls} value={f.dates} onChange={(e) => set("dates", e.target.value)} placeholder="Ej: En curso · Teatro Vorterix" /></Field>
        <Field label="Nombre del fandom"><input className={inputCls} value={f.fandom} onChange={(e) => set("fandom", e.target.value)} placeholder="Ej: Primas" /></Field>
        {isNew && <Field label="Identificador (para el link)"><input className={inputCls} value={f.id} onChange={(e) => set("id", slugify(e.target.value))} placeholder={slugify(`${f.artist}-${f.title}`) || "se arma solo"} /></Field>}
      </div>
      <Field label="Descripción"><textarea className={`${inputCls} min-h-24`} value={f.description} onChange={(e) => set("description", e.target.value)} placeholder="Qué van a encontrar los fans en este drop" /></Field>

      <div>
        <p className={labelCls}>Fotos</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {IMAGE_FIELDS.map((fld) => {
            const current = f[fld.key] || (fld.key === "hero_url" ? catalog?.hero : fld.key === "cover_url" ? catalog?.cover : catalog?.album);
            return (
              <label key={fld.key} className="block cursor-pointer rounded-2xl border border-dashed border-border p-3 text-center">
                <div className="mx-auto mb-2 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-muted">
                  {busy === fld.key ? <Loader2 className="h-6 w-6 animate-spin" /> : current ? <img src={current} alt="" className="h-full w-full object-cover" /> : <ImagePlus className="h-6 w-6 text-muted-foreground" />}
                </div>
                <span className="block text-sm font-bold">{fld.label}</span>
                <span className="block text-[11px] text-muted-foreground">{fld.hint}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => void upload(fld.key, e.target.files?.[0])} />
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <p className={labelCls}>Estética del drop</p>
        {!hasTheme && !isNew && catalog ? (
          <p className="mb-2 text-xs text-muted-foreground">Este drop usa la estética armada a mano. Si cambiás algo acá, la reemplazás.</p>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-3">
          <Color label="Fondo" value={f.theme.background ?? (f.theme.light ? "#f7f5f2" : "#141414")} onChange={(v) => setTheme({ background: v })} />
          <Color label="Color principal" value={f.theme.primary ?? "#ef4203"} onChange={(v) => setTheme({ primary: v })} />
          <Color label="Color secundario" value={f.theme.accent ?? f.theme.primary ?? "#ef4203"} onChange={(v) => setTheme({ accent: v })} />
          <Field label="Tipografía de títulos">
            <select className={inputCls} value={f.theme.font ?? "Bricolage Grotesque"} onChange={(e) => setTheme({ font: e.target.value })}>
              {FONT_OPTIONS.map((font) => <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>)}
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.theme.light} onChange={(e) => setTheme({ light: e.target.checked })} /> Tema claro</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.theme.uppercase} onChange={(e) => setTheme({ uppercase: e.target.checked })} /> Títulos en mayúsculas</label>
        </div>

        {/* Vista previa con la misma lógica que usa la app */}
        <style>{themeCss(id || "preview", f.theme, ".drop-preview")}</style>
        <div className="drop-preview mt-4 overflow-hidden rounded-2xl border" style={{ background: "var(--background)", color: "var(--foreground)", borderColor: "var(--border)" }}>
          {previewImg && <img src={previewImg} alt="" className="h-36 w-full object-cover" />}
          <div className="p-4" style={{ backgroundImage: "var(--gradient-glow)" }}>
            <p className="text-sm font-bold" style={{ color: "var(--primary)" }}>{f.artist || "Artista"} <span className="ml-1 rounded-full px-1.5 py-px text-[10px] font-bold uppercase text-white" style={{ background: "oklch(0.64 0.21 40)" }}>{KIND_LABEL[f.kind]}</span></p>
            <p className="mt-1 text-2xl" style={{ fontFamily: "var(--font-display)", textTransform: "var(--display-transform)" as React.CSSProperties["textTransform"] }}>{f.title || "Título del drop"}</p>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{f.tagline || "Frase corta del drop"}</p>
            <div className="mt-3 rounded-xl p-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <span className="inline-block rounded-full px-4 py-2 text-sm font-bold" style={{ backgroundImage: "var(--gradient-drop)", color: "var(--primary-foreground)" }}>Entrar al drop</span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => void save()} disabled={busy === "save"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-primary-foreground disabled:opacity-60">
        {busy === "save" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {isNew ? "Crear drop" : "Guardar cambios"}
      </button>
      {isNew && <p className="text-center text-xs text-muted-foreground">Después de crearlo vas a poder sumarle misiones.</p>}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className={labelCls}>{label}</span>{children}</label>;
}
function Color({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <span className="flex items-center gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-12 cursor-pointer rounded-lg border border-border bg-transparent" />
        <input className={inputCls} value={value} onChange={(e) => /^#[0-9a-f]{0,6}$/i.test(e.target.value) && onChange(e.target.value)} />
      </span>
    </Field>
  );
}
