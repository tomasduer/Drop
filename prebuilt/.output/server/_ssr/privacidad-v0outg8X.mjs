import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as ArrowLeft } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";

import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
const CONTACT_EMAIL = "";
const sections = [{
  title: "Qué datos usamos",
  body: ["Si entrás con Google, recibimos tu nombre, tu email y tu foto de perfil. Si te registrás con email, guardamos el email y el nombre que elijas.", "Dentro de la app guardamos lo que vos generás: puntos, misiones completadas, álbumes que marcaste, reseñas, posts, comentarios, canjes, a quién seguís y la foto o bio que cargues en tu perfil.", "Si elegís tu ciudad para ver shows cerca tuyo, la usamos para buscar conciertos en esa zona. No usamos la ubicación GPS de tu teléfono.", "Si conectás Spotify, leemos solo las canciones que escuchaste en las últimas 24 horas para validar las misiones de escucha. El permiso de Spotify queda guardado en tu navegador y lo podés quitar cuando quieras desde tu cuenta de Spotify.", "Si comprás en la tienda, guardamos el pedido (productos, importe y estado del pago). Los datos de tu tarjeta los maneja Mercado Pago: DROP nunca los ve.", "En modo invitado no creamos ninguna cuenta: tu nombre y foto quedan solo en tu navegador."]
}, {
  title: "Para qué los usamos",
  body: ["Para que puedas iniciar sesión, guardar tu progreso, aparecer en el ranking y mostrar tus reseñas a otros fans.", "Para revisar el ranking antes de entregar premios, detectar trampas y contactarte si ganás.", "Para ver estadísticas generales de uso de cada drop (por ejemplo, cuántos fans participan). Esas estadísticas solo las ve el equipo de DROP.", "No vendemos tus datos ni los usamos para publicidad."]
}, {
  title: "Servicios de terceros",
  body: ["Los datos se guardan en Supabase (base de datos y autenticación). La app se sirve desde Cloudflare.", "Las búsquedas de música usan el catálogo público de Deezer y los shows salen de Ticketmaster y de Google (a través de SerpApi). Esas consultas las hace nuestro servidor y solo incluyen el nombre de la ciudad, nunca tus datos personales.", "Los pagos de la tienda los procesa Mercado Pago, y la verificación de escuchas la hace Spotify, cada uno con su propia política de privacidad.", "El inicio de sesión con Google se rige además por la política de privacidad de Google."]
}, {
  title: "Qué ve el resto de los fans",
  body: ["Tu nombre visible, tu foto, tus puntos en el ranking y tus reseñas públicas. Tu email nunca se muestra."]
}, {
  title: "Tus derechos",
  body: ["Podés editar tu perfil cuando quieras desde tu Perfil. También podés pedirnos acceso a tus datos, que los corrijamos o que borremos tu cuenta y todos tus datos.", "Si ganás un premio, podemos compartir tu nombre y DNI con el organizador del evento, solo para entregarte el premio.", "Estos derechos los da la Ley 25.326 de Protección de Datos Personales. La Agencia de Acceso a la Información Pública es el organismo de control y recibe reclamos sobre el uso de datos personales."]
}];
function Privacidad() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background px-6 py-8 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[640px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Volver"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl font-black", children: "Política de privacidad" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Última actualización: noviembre de 2026" }),
    sections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: s.title }),
      s.body.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: p }, p))
    ] }, s.title)),
    CONTACT_EMAIL
  ] }) });
}
export {
  Privacidad as component
};
