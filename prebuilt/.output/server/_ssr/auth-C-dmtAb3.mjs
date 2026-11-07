import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { e as useSearch, f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-Dd4SdNqe.mjs";
import { l as logoViolet } from "./drop-logo-negativo-DidhibxV.mjs";
import { s as supabase } from "./client-B2itNBhI.mjs";
import { u as useDropAuth } from "./AuthProvider-XnTiVv9E.mjs";
import "../_libs/sonner.mjs";

import { y as Mail, x as EyeOff, E as Eye, L as LoaderCircle, A as ArrowRight } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./router-DopB1rKc.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/unenv.mjs";

import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./server-ZLk_3ChI.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";




import "./auth-middleware-Di6xXkW9.mjs";
import "../_libs/zod.mjs";
const logo = { url: logoViolet };
const input = "h-12 w-full rounded-lg border border-input bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";
const errorText = (message) => /invalid login/i.test(message) ? "Email o contraseña incorrectos." : /not confirmed/i.test(message) ? "Confirmá tu email desde el enlace que te enviamos." : /not allowed|cannot receive/i.test(message) ? "Ese email no puede recibir correos. Usá una dirección real." : /already registered/i.test(message) ? "Ya existe una cuenta con ese email." : /password/i.test(message) ? "La contraseña debe tener al menos 8 caracteres y no ser una contraseña filtrada." : message;
function ConnectView() {
  const search = useSearch({ strict: false });
  const { mode: access } = useDropAuth();
  const [mode, setMode] = reactExports.useState("login");
  const [email, setEmail] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [visible, setVisible] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  const [notice, setNotice] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    setMode(search.mode === "signup" ? "signup" : "login");
  }, [search.mode]);
  reactExports.useEffect(() => {
    if (access === "user") void navigate({ to: "/explorar", replace: true });
  }, [access, navigate]);
  const switchMode = (next) => {
    setMode(next);
    setNotice("");
    setError("");
    setPassword("");
  };
  async function submit(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    const mail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(mail)) {
      setError("Ingresá un email válido.");
      return;
    }
    if (mode !== "forgot" && password.length < (mode === "signup" ? 8 : 1)) {
      setError(mode === "signup" ? "La contraseña debe tener al menos 8 caracteres." : "Ingresá tu contraseña.");
      return;
    }
    setBusy(true);
    if (mode === "forgot") {
      const { error: error3 } = await supabase.auth.resetPasswordForEmail(mail, { redirectTo: `${window.location.origin}/reset-password` });
      setBusy(false);
      if (error3) setError(errorText(error3.message));
      else setNotice("Si existe una cuenta con ese email, te enviamos un enlace para elegir una nueva contraseña.");
      return;
    }
    if (mode === "signup") {
      const { data, error: error3 } = await supabase.auth.signUp({ email: mail, password, options: { emailRedirectTo: window.location.origin + "/explorar", data: { display_name: name.trim() || mail.split("@")[0] } } });
      setBusy(false);
      if (error3) {
        setError(errorText(error3.message));
        return;
      }
      if (!data.session) {
        setNotice("¡Cuenta creada! Revisá tu email y tocá el enlace de confirmación para entrar.");
        return;
      }
      return;
    }
    const { error: error2 } = await supabase.auth.signInWithPassword({ email: mail, password });
    setBusy(false);
    if (error2) setError(errorText(error2.message));
  }
  async function google() {
    setError("");
    setBusy(true);
    const { error: error2 } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin + "/auth" } });
    if (error2) {
      setError("No pudimos conectar con Google. Probá de nuevo.");
      setBusy(false);
      return;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen w-full bg-background px-7 pb-10 pt-8 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-[440px] flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { decoding: "async", src: logo.url, alt: "DROP", className: "h-auto w-full max-w-[320px] object-contain" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-3xl font-black leading-tight", children: mode === "signup" ? "Creá tu cuenta." : mode === "forgot" ? "Recuperá tu acceso." : "Tu música. Tu DROP." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: mode === "signup" ? "Guardá tus puntos, álbumes y drops en todos tus dispositivos." : mode === "forgot" ? "Te enviamos un enlace para elegir una nueva contraseña." : "Entrá a tu cuenta y seguí viviendo la música." }),
    mode !== "forgot" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", disabled: busy, onClick: google, className: "mt-7 h-12 w-full gap-3 border border-border bg-white font-bold text-neutral-900 shadow-sm hover:bg-white/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
        "Continuar con Google"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-xs text-muted-foreground", children: "Es lo más rápido: un toque y entrás." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" }),
        "o con tu email",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { noValidate: true, onSubmit: submit, className: "mt-5 space-y-4", children: [
      mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-semibold", children: [
        "Tu nombre",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { maxLength: 80, value: name, onChange: (e) => setName(e.target.value), className: `mt-2 ${input}`, placeholder: "¿Cómo te llamás?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-semibold", children: [
        "Email",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-4 top-4 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), className: `${input} pl-11`, placeholder: "vos@ejemplo.com" })
        ] })
      ] }),
      mode !== "forgot" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-semibold", children: [
        "Contraseña",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: visible ? "text" : "password", autoComplete: mode === "signup" ? "new-password" : "current-password", value: password, onChange: (e) => setPassword(e.target.value), className: `${input} pr-12`, placeholder: mode === "signup" ? "Al menos 8 caracteres" : "Tu contraseña" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "absolute right-2 top-1.5", "aria-label": visible ? "Ocultar contraseña" : "Mostrar contraseña", onClick: () => setVisible((v) => !v), children: visible ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, {}) })
        ] })
      ] }),
      mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "link", className: "h-auto px-0 text-xs", onClick: () => switchMode("forgot"), children: "Olvidé mi contraseña" }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm", children: error }),
      notice && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "status", className: "rounded-lg border border-primary/40 bg-primary/5 p-3 text-sm leading-relaxed", children: notice }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: busy, variant: mode === "forgot" ? "default" : "outline", className: "h-12 w-full font-bold", children: [
        busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {}),
        mode === "signup" ? "Crear cuenta" : mode === "forgot" ? "Enviar enlace" : "Iniciar sesión"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: mode === "login" ? "¿Todavía no tenés cuenta?" : "¿Ya tenés una cuenta?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: busy, variant: "link", onClick: () => switchMode(mode === "login" ? "signup" : "login"), children: mode === "login" ? "Crear una cuenta nueva" : "Iniciar sesión" })
    ] }),
    mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: busy, variant: "outline", className: "mt-4 h-12 w-full", onClick: () => {
      void navigate({ to: "/invitado" });
    }, children: [
      "Ingresar sin cuenta ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
    ] }),
    mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-xs text-muted-foreground", children: "En modo invitado tus puntos no se guardan." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/privacidad", className: "mt-6 text-center text-xs text-muted-foreground underline", children: "Política de privacidad" })
  ] }) });
}
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 48 48", className: "h-5 w-5", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FFC107", d: "M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FF3D00", d: "m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4CAF50", d: "M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#1976D2", d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" })
  ] });
}
function EmailEntry() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectView, {});
}
const SplitComponent = EmailEntry;
export {
  SplitComponent as component
};
