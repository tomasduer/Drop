import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacidad")({
  head: () => ({ meta: [
    { title: "Política de privacidad · DROP" },
    { name: "description", content: "Qué datos usa DROP, para qué y cómo pedir que los borremos." },
  ] }),
  component: Privacidad,
});

// Si querés mostrar un email de contacto, completalo acá.
const CONTACT_EMAIL = "";

const sections: { title: string; body: string[] }[] = [
  { title: "Qué datos usamos", body: [
    "Si entrás con Google, recibimos tu nombre, tu email y tu foto de perfil. Si te registrás con email, guardamos el email y el nombre que elijas.",
    "Dentro de la app guardamos lo que vos generás: puntos, misiones completadas, álbumes que marcaste, reseñas, canjes, a quién seguís y la foto o bio que cargues en tu perfil.",
    "En modo invitado no creamos ninguna cuenta: tu nombre y foto quedan solo en tu navegador.",
  ] },
  { title: "Para qué los usamos", body: [
    "Para que puedas iniciar sesión, guardar tu progreso, aparecer en el ranking y mostrar tus reseñas a otros fans.",
    "No vendemos tus datos ni los usamos para publicidad.",
  ] },
  { title: "Servicios de terceros", body: [
    "Los datos se guardan en Supabase (base de datos y autenticación). La app se sirve desde Cloudflare.",
    "Las búsquedas de música usan el catálogo público de Deezer y los shows salen de Ticketmaster. Esas consultas las hace nuestro servidor y no incluyen tus datos personales.",
    "El inicio de sesión con Google se rige además por la política de privacidad de Google.",
  ] },
  { title: "Qué ve el resto de los fans", body: [
    "Tu nombre visible, tu foto, tus puntos en el ranking y tus reseñas públicas. Tu email nunca se muestra.",
  ] },
  { title: "Tus derechos", body: [
    "Podés editar tu perfil cuando quieras desde tu Perfil. También podés pedir que borremos tu cuenta y todos tus datos.",
  ] },
];

function Privacidad() {
  return (
    <div className="min-h-screen bg-background px-6 py-8 text-foreground">
      <div className="mx-auto max-w-[640px]">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" />Volver</Link>
        <h1 className="mt-4 text-3xl font-black">Política de privacidad</h1>
        <p className="mt-2 text-sm text-muted-foreground">Última actualización: noviembre de 2026</p>
        {sections.map((s) => (
          <section key={s.title} className="mt-7">
            <h2 className="text-lg font-bold">{s.title}</h2>
            {s.body.map((p) => <p key={p} className="mt-2 text-sm leading-relaxed text-muted-foreground">{p}</p>)}
          </section>
        ))}
        {CONTACT_EMAIL && (
          <p className="mt-7 text-sm">Consultas o pedidos de borrado: <a className="text-primary underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        )}
      </div>
    </div>
  );
}
