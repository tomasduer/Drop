import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/drop/MobileShell";
import { GlobalNav } from "@/components/drop/GlobalNav";
import { TiendaView } from "@/components/drop/TiendaView";

export const Route = createFileRoute("/tienda")({
  validateSearch: (search: Record<string, unknown>): { a?: string; v?: "carrito" | "pedidos"; pago?: "ok" | "pendiente" | "error"; ref?: string } => ({
    a: typeof search.a === "string" && /^[a-z0-9-]{1,60}$/.test(search.a) ? search.a : undefined,
    v: search.v === "carrito" || search.v === "pedidos" ? search.v : undefined,
    pago: search.pago === "ok" || search.pago === "pendiente" || search.pago === "error" ? search.pago : undefined,
    ref: typeof search.ref === "string" && /^DRP-[A-Z0-9]{4,12}$/.test(search.ref) ? search.ref : undefined,
  }),
  head: () => ({
    meta: [
      { title: "DROP · Tienda" },
      { name: "description", content: "Merch oficial de tus artistas favoritos, con productos exclusivos para los fans del ranking." },
      { property: "og:title", content: "DROP · Tienda" },
      { property: "og:description", content: "Merch oficial de tus artistas favoritos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Tienda,
});

function Tienda() {
  const { a, v, pago, ref } = Route.useSearch();
  return (
    <MobileShell>
      <main className="pt-2">
        <TiendaView artist={a} view={v} payment={pago && ref ? { status: pago, ref } : undefined} />
      </main>
      <GlobalNav />
    </MobileShell>
  );
}
