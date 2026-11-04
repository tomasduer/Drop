import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { useDropAuth } from "@/components/drop/AuthProvider";
import { AdminPanel } from "@/components/drop/admin/AdminPanel";
import { useIsDropAdmin } from "@/lib/drop-content";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Panel de drops · DROP" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { mode, user } = useDropAuth();
  const isAdmin = useIsDropAdmin(mode === "user" ? user?.id : null);

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 pb-24 pt-6">
      <Link to="/explorar" className="inline-flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Volver a la app</Link>
      <h1 className="mt-3 text-3xl font-black">Panel de drops</h1>
      <p className="mt-1 text-sm text-muted-foreground">Creá y editá drops, sus fotos, su estética y sus misiones sin tocar código.</p>

      {mode === "loading" || (mode === "user" && isAdmin === null) ? (
        <p className="mt-8 text-sm text-muted-foreground">Cargando…</p>
      ) : mode !== "user" ? (
        <Notice title="Entrá con tu cuenta">
          El panel solo funciona con una cuenta de DROP (no en modo invitado). <Link to="/auth" search={{ mode: "login" }} className="font-bold text-primary underline">Iniciar sesión</Link>
        </Notice>
      ) : !isAdmin ? (
        <Notice title="Tu cuenta todavía no es administradora">
          Pedí que agreguen esta cuenta como admin: <b>{user?.email}</b>
        </Notice>
      ) : (
        <AdminPanel />
      )}
    </div>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-5">
      <p className="flex items-center gap-2 font-bold"><ShieldAlert className="h-5 w-5 text-primary" /> {title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
