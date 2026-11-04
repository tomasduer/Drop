import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "DROP · Nueva contraseña" }, { name: "description", content: "Elegí una nueva contraseña para tu cuenta DROP." },
    { property: "og:title", content: "DROP · Nueva contraseña" }, { property: "og:description", content: "Recuperá el acceso a tu cuenta DROP." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: Reset,
});
function Reset() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setReady(true);
    const { data } = supabase.auth.onAuthStateChange((event) => { if (event === "PASSWORD_RECOVERY") setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setError("La contraseña debe tener al menos 8 caracteres."); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setError(error.message); return; }
    toast.success("Contraseña actualizada");
    void navigate({ to: "/mi-drop", replace: true });
  }
  return <main className="mx-auto min-h-screen max-w-[440px] px-7 py-16">
    <h1 className="text-2xl font-black">Nueva contraseña</h1>
    {!ready ? <><p className="mt-4 text-sm text-muted-foreground">Abrí esta página desde el enlace que te enviamos por email.</p><Button asChild className="mt-6 w-full"><Link to="/auth">Volver a iniciar sesión</Link></Button></> :
    <form onSubmit={submit} className="mt-6 space-y-4">
      <label className="block text-xs font-semibold">Nueva contraseña<input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-input bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-ring" /></label>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={busy} className="h-12 w-full font-bold">Guardar contraseña</Button>
    </form>}
  </main>;
}
