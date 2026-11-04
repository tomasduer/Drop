import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useDropContent, reloadDropContent } from "@/lib/drop-content";
import { DROP_CATALOG, KIND_LABEL } from "@/lib/drops";
import { db, STATUS_OPTIONS, type CampaignRow } from "./admin-db";
import { DropEditor } from "./DropEditor";
import { MissionsEditor } from "./MissionsEditor";

/** Lista de drops + editor del elegido. */
export function AdminPanel() {
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([]);
  const [selected, setSelected] = useState<string | "new" | null>(null);
  const content = useDropContent();

  async function load() {
    const { data, error } = await db.from("campaigns").select("*").order("id");
    if (error) { toast.error("No pudimos cargar los drops"); return; }
    setCampaigns(data as CampaignRow[]);
  }
  useEffect(() => { void load(); void reloadDropContent(); }, []);

  const current = selected && selected !== "new" ? campaigns.find((c) => c.id === selected) : undefined;
  const label = (s: CampaignRow["status"]) => STATUS_OPTIONS.find((o) => o.value === s)?.label ?? s;

  return (
    <div className="mt-6 space-y-6">
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-black">Drops</h2>
          <button onClick={() => setSelected("new")} className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
            <Plus className="h-4 w-4" /> Nuevo drop
          </button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {campaigns.map((c) => {
            const row = content.find((x) => x.campaign_id === c.id);
            const kind = row?.kind ?? DROP_CATALOG.find((d) => d.id === c.id)?.kind;
            const img = row?.cover_url ?? DROP_CATALOG.find((d) => d.id === c.id)?.cover;
            return (
              <button key={c.id} onClick={() => setSelected(c.id)}
                className={`flex items-center gap-3 rounded-2xl border p-3 text-left ${selected === c.id ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                {img ? <img src={img} alt="" className="h-12 w-12 rounded-full object-cover" /> : <span className="h-12 w-12 rounded-full bg-muted" />}
                <span className="min-w-0">
                  <span className="block truncate text-xs font-bold text-primary">{c.artist}{kind ? ` · ${KIND_LABEL[kind]}` : ""}</span>
                  <span className="block truncate font-bold">{c.title}</span>
                  <span className="block text-xs text-muted-foreground">{label(c.status)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {selected && (
        <DropEditor
          key={selected}
          campaign={current}
          content={current ? content.find((x) => x.campaign_id === current.id) : undefined}
          takenIds={campaigns.map((c) => c.id)}
          onSaved={async (id) => { await load(); await reloadDropContent(); setSelected(id); }}
        />
      )}
      {current && <MissionsEditor key={`m-${current.id}`} campaignId={current.id} />}
    </div>
  );
}
