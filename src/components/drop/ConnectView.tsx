import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Mail, ArrowRight } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import logo from "@/assets/drop-logo-2026.webp.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { useDropAuth } from "./AuthProvider";

const input = "h-12 w-full rounded-lg border border-input bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";
const errorText = (message: string) =>
  /invalid login/i.test(message) ? "Email o contraseña incorrectos." :
  /not confirmed/i.test(message) ? "Confirmá tu email desde el enlace que te enviamos." :
  /not allowed|cannot receive/i.test(message) ? "Ese email no puede recibir correos. Usá una dirección real." :
  /already registered/i.test(message) ? "Ya existe una cuenta con ese email." :
  /password/i.test(message) ? "La contraseña debe tener al menos 8 caracteres y no ser una contraseña filtrada." : message;

export function ConnectView() {
  const search = useSearch({ strict: false });
  const { mode: access } = useDropAuth();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => { setMode(search.mode === "signup" ? "signup" : "login"); }, [search.mode]);
  useEffect(() => { if (access === "user") void navigate({ to: "/explorar", replace: true }); }, [access, navigate]);
  const switchMode = (next: typeof mode) => { setMode(next); setNotice(""); setError(""); setPassword(""); };

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(""); setNotice("");
    const mail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(mail)) { setError("Ingresá un email válido."); return; }
    if (mode !== "forgot" && password.length < (mode === "signup" ? 8 : 1)) { setError(mode === "signup" ? "La contraseña debe tener al menos 8 caracteres." : "Ingresá tu contraseña."); return; }
    setBusy(true);
    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(mail, { redirectTo: `${window.location.origin}/reset-password` });
      setBusy(false);
      if (error) setError(errorText(error.message)); else setNotice("Si existe una cuenta con ese email, te enviamos un enlace para elegir una nueva contraseña.");
      return;
    }
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email: mail, password, options: { emailRedirectTo: window.location.origin + "/explorar", data: { display_name: name.trim() || mail.split("@")[0] } } });
      setBusy(false);
      if (error) { setError(errorText(error.message)); return; }
      if (!data.session) { setNotice("¡Cuenta creada! Revisá tu email y tocá el enlace de confirmación para entrar."); return; }
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: mail, password });
    setBusy(false);
    if (error) setError(errorText(error.message));
  }

  async function google() {
    setError(""); setBusy(true);
    // Login de Google directo con Supabase (sin depender de Lovable).
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin + "/auth" } });
    if (error) { setError("No pudimos conectar con Google. Probá de nuevo."); setBusy(false); return; }
    // Si no hubo error, el navegador ya está yendo a Google.
  }

  return <div className="min-h-screen w-full bg-background px-7 pb-10 pt-8 text-foreground">
    <div className="mx-auto flex w-full max-w-[440px] flex-col">
      <img decoding="async" src={logo.url} alt="DROP" className="h-auto w-full max-w-[320px] object-contain drop-shadow-[0_0_14px_var(--primary)]" />
      <h1 className="mt-5 text-3xl font-black leading-tight">{mode === "signup" ? "Creá tu cuenta." : mode === "forgot" ? "Recuperá tu acceso." : "Tu música. Tu DROP."}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mode === "signup" ? "Guardá tus puntos, álbumes y drops en todos tus dispositivos." : mode === "forgot" ? "Te enviamos un enlace para elegir una nueva contraseña." : "Entrá a tu cuenta y seguí viviendo la música."}</p>
      {mode !== "forgot" && <Button type="button" variant="outline" disabled={busy} onClick={google} className="mt-7 h-12 w-full font-bold">Continuar con Google</Button>}
      <form noValidate onSubmit={submit} className="mt-5 space-y-4">
        {mode === "signup" && <label className="block text-xs font-semibold">Tu nombre<input maxLength={80} value={name} onChange={(e) => setName(e.target.value)} className={`mt-2 ${input}`} placeholder="¿Cómo te llamás?" /></label>}
        <label className="block text-xs font-semibold">Email<div className="relative mt-2"><Mail className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" /><input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${input} pl-11`} placeholder="vos@ejemplo.com" /></div></label>
        {mode !== "forgot" && <label className="block text-xs font-semibold">Contraseña<div className="relative mt-2"><input type={visible ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${input} pr-12`} placeholder={mode === "signup" ? "Al menos 8 caracteres" : "Tu contraseña"} /><Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1.5" aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"} onClick={() => setVisible((v) => !v)}>{visible ? <EyeOff /> : <Eye />}</Button></div></label>}
        {mode === "login" && <Button type="button" variant="link" className="h-auto px-0 text-xs" onClick={() => switchMode("forgot")}>Olvidé mi contraseña</Button>}
        {error && <p role="alert" className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm">{error}</p>}
        {notice && <p role="status" className="rounded-lg border border-primary/40 bg-primary/5 p-3 text-sm leading-relaxed">{notice}</p>}
        <Button type="submit" disabled={busy} className="h-12 w-full font-bold">{busy ? <Loader2 className="animate-spin" /> : <ArrowRight />}{mode === "signup" ? "Crear cuenta" : mode === "forgot" ? "Enviar enlace" : "Iniciar sesión"}</Button>
      </form>
      <div className="mt-5 text-center"><p className="text-xs text-muted-foreground">{mode === "login" ? "¿Todavía no tenés cuenta?" : "¿Ya tenés una cuenta?"}</p><Button disabled={busy} variant="link" onClick={() => switchMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Crear una cuenta nueva" : "Iniciar sesión"}</Button></div>
      {mode === "login" && <Button disabled={busy} variant="outline" className="mt-4 h-12 w-full" onClick={() => { void navigate({ to: "/invitado" }); }}>Ingresar sin cuenta <ArrowRight /></Button>}
      {mode === "login" && <p className="mt-2 text-center text-[11px] text-muted-foreground">En modo invitado tus puntos no se guardan.</p>}
    </div>
  </div>;
}
