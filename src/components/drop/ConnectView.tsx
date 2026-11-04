import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Mail, ArrowRight } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import logoViolet from "@/assets/drop-logo-oficial.webp";
const logo = { url: logoViolet };
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
      <img decoding="async" src={logo.url} alt="DROP" className="h-auto w-full max-w-[320px] object-contain" />
      <h1 className="mt-5 text-3xl font-black leading-tight">{mode === "signup" ? "Creá tu cuenta." : mode === "forgot" ? "Recuperá tu acceso." : "Tu música. Tu DROP."}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mode === "signup" ? "Guardá tus puntos, álbumes y drops en todos tus dispositivos." : mode === "forgot" ? "Te enviamos un enlace para elegir una nueva contraseña." : "Entrá a tu cuenta y seguí viviendo la música."}</p>
      {mode !== "forgot" && <>
        <Button type="button" disabled={busy} onClick={google} className="mt-7 h-12 w-full gap-3 border border-border bg-white font-bold text-neutral-900 shadow-sm hover:bg-white/90"><GoogleIcon />Continuar con Google</Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">Es lo más rápido: un toque y entrás.</p>
        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />o con tu email<span className="h-px flex-1 bg-border" /></div>
      </>}
      <form noValidate onSubmit={submit} className="mt-5 space-y-4">
        {mode === "signup" && <label className="block text-xs font-semibold">Tu nombre<input maxLength={80} value={name} onChange={(e) => setName(e.target.value)} className={`mt-2 ${input}`} placeholder="¿Cómo te llamás?" /></label>}
        <label className="block text-xs font-semibold">Email<div className="relative mt-2"><Mail className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" /><input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${input} pl-11`} placeholder="vos@ejemplo.com" /></div></label>
        {mode !== "forgot" && <label className="block text-xs font-semibold">Contraseña<div className="relative mt-2"><input type={visible ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${input} pr-12`} placeholder={mode === "signup" ? "Al menos 8 caracteres" : "Tu contraseña"} /><Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1.5" aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"} onClick={() => setVisible((v) => !v)}>{visible ? <EyeOff /> : <Eye />}</Button></div></label>}
        {mode === "login" && <Button type="button" variant="link" className="h-auto px-0 text-xs" onClick={() => switchMode("forgot")}>Olvidé mi contraseña</Button>}
        {error && <p role="alert" className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm">{error}</p>}
        {notice && <p role="status" className="rounded-lg border border-primary/40 bg-primary/5 p-3 text-sm leading-relaxed">{notice}</p>}
        <Button type="submit" disabled={busy} variant={mode === "forgot" ? "default" : "outline"} className="h-12 w-full font-bold">{busy ? <Loader2 className="animate-spin" /> : <ArrowRight />}{mode === "signup" ? "Crear cuenta" : mode === "forgot" ? "Enviar enlace" : "Iniciar sesión"}</Button>
      </form>
      <div className="mt-5 text-center"><p className="text-xs text-muted-foreground">{mode === "login" ? "¿Todavía no tenés cuenta?" : "¿Ya tenés una cuenta?"}</p><Button disabled={busy} variant="link" onClick={() => switchMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Crear una cuenta nueva" : "Iniciar sesión"}</Button></div>
      {mode === "login" && <Button disabled={busy} variant="outline" className="mt-4 h-12 w-full" onClick={() => { void navigate({ to: "/invitado" }); }}>Ingresar sin cuenta <ArrowRight /></Button>}
      {mode === "login" && <p className="mt-2 text-center text-xs text-muted-foreground">En modo invitado tus puntos no se guardan.</p>}
      <a href="/privacidad" className="mt-6 text-center text-xs text-muted-foreground underline">Política de privacidad</a>
    </div>
  </div>;
}

function GoogleIcon() {
  return <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>;
}
