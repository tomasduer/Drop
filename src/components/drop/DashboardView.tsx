import { Activity, Download, MapPin, Users, Share2, Music, TicketCheck, FileText, TrendingUp, Star } from "lucide-react";

const kpis = [
  { icon: Download, label: "Descargas", value: "128.4k", delta: "+12.3%" },
  { icon: Users, label: "Usuarios activos", value: "84.1k", delta: "+8.7%" },
  { icon: Activity, label: "Misiones completadas", value: "72%", delta: "+4.1%" },
  { icon: TicketCheck, label: "Asistencia evento", value: "94%", delta: "+2.0%" },
];

const heatmap = [
  { zone: "CABA · Palermo", pct: 92 },
  { zone: "CABA · Recoleta", pct: 71 },
  { zone: "GBA Norte", pct: 63 },
  { zone: "Córdoba Capital", pct: 48 },
  { zone: "Rosario", pct: 41 },
  { zone: "Mendoza", pct: 27 },
];

const missions = [
  { name: "Pre-save álbum", finish: 88 },
  { name: "Trivia LALIVERSE", finish: 74 },
  { name: "Caza QR Palermo", finish: 52 },
  { name: "Rompecabezas portada", finish: 66 },
  { name: "AR Obelisco", finish: 31 },
];

const superfans = [
  { user: "lalilover", pts: 8420, city: "CABA" },
  { user: "lalisters", pts: 7980, city: "Rosario" },
  { user: "no_atiendo", pts: 7610, city: "CABA" },
  { user: "disciplina.mb", pts: 6890, city: "Córdoba" },
];

const social = [
  { tag: "#NoVayasAAtender", posts: "42.1k" },
  { tag: "#LALIVERSE", posts: "31.8k" },
  { tag: "#DropLali", posts: "18.4k" },
];

export function DashboardView() {
  return (
    <div className="space-y-6 px-5 pb-6">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
          Sello & Management
        </p>
        <h1 className="text-3xl font-black">Dashboard analítico</h1>
        <p className="text-sm text-muted-foreground">
          Campaña · No vayas a atender cuando el demonio llama
        </p>
      </div>

      {/* KPIs */}
      <section className="grid grid-cols-2 gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <span
                  className="grid h-8 w-8 place-items-center rounded-lg text-primary-foreground"
                  style={{ backgroundImage: "var(--gradient-drop)" }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-bold text-primary">{k.delta}</span>
              </div>
              <p className="text-xl font-black">{k.value}</p>
              <p className="text-[11px] text-muted-foreground">{k.label}</p>
            </div>
          );
        })}
      </section>

      {/* Heatmap */}
      <section className="rounded-2xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-widest">
            Mapa de calor · Participación por zona
          </h2>
        </div>
        <div className="space-y-2">
          {heatmap.map((h) => (
            <div key={h.zone}>
              <div className="mb-1 flex justify-between text-[11px]">
                <span>{h.zone}</span>
                <span className="font-bold text-primary">{h.pct}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${h.pct}%`, backgroundImage: "var(--gradient-drop)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rendimiento misiones */}
      <section className="rounded-2xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-widest">
            Rendimiento de misiones
          </h2>
        </div>
        <div className="flex items-end gap-2 h-32">
          {missions.map((m) => (
            <div key={m.name} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md"
                style={{
                  height: `${m.finish}%`,
                  backgroundImage: "var(--gradient-drop)",
                }}
              />
              <span className="text-[9px] font-bold">{m.finish}%</span>
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-5 gap-1 text-center text-[8px] leading-tight text-muted-foreground">
          {missions.map((m) => (
            <span key={m.name}>{m.name}</span>
          ))}
        </div>
      </section>

      {/* Superfans */}
      <section className="rounded-2xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <Star className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-widest">
            Perfil de superfans
          </h2>
        </div>
        <div className="space-y-2">
          {superfans.map((s, i) => (
            <div key={s.user} className="flex items-center gap-3 text-xs">
              <span className="w-4 text-center font-bold text-muted-foreground">{i + 1}</span>
              <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-[11px] font-bold">
                {s.user[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-semibold">@{s.user}</p>
                <p className="text-[10px] text-muted-foreground">{s.city}</p>
              </div>
              <p className="font-black text-primary">{s.pts.toLocaleString("es")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Redes + Streaming */}
      <section className="grid grid-cols-1 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <Share2 className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-bold uppercase tracking-widest">
              Impacto en redes
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {social.map((s) => (
              <div key={s.tag} className="rounded-xl border border-border p-2 text-center">
                <p className="text-[10px] text-muted-foreground">{s.tag}</p>
                <p className="text-sm font-black">{s.posts}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Alcance estimado: <span className="font-bold text-foreground">4.2M</span> · UGC:{" "}
            <span className="font-bold text-foreground">18.9k piezas</span>
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <Music className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-bold uppercase tracking-widest">
              Conversión musical
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-black">62.3k</p>
              <p className="text-[10px] text-muted-foreground">Pre-saves</p>
            </div>
            <div>
              <p className="text-lg font-black">1.4M</p>
              <p className="text-[10px] text-muted-foreground">Streams verif.</p>
            </div>
            <div>
              <p className="text-lg font-black">+38%</p>
              <p className="text-[10px] text-muted-foreground">Oyentes mensuales</p>
            </div>
          </div>
        </div>
      </section>

      <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/40 py-3 text-sm font-bold text-primary">
        <FileText className="h-4 w-4" /> Descargar reporte final de campaña
      </button>
    </div>
  );
}
