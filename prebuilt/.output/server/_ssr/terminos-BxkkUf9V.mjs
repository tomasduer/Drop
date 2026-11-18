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
const summary = ["Participar es gratis: no hace falta comprar nada para sumar puntos ni para ganar.", "Cada drop tiene su propio ranking. Los premios se definen por el ranking general del drop al momento del cierre.", "A igual puntaje, queda arriba quien llegó primero a ese puntaje.", "Una cuenta por persona. Bots, cuentas múltiples o trampas hacen perder los puntos y los premios.", "Los eventos y premios los ponen los sellos y equipos de cada artista, no DROP."];
const sections = [{
  id: "que-es",
  title: "1. Qué es DROP",
  body: ["DROP es una plataforma donde los fans participan de lanzamientos musicales (drops): completan misiones y juegos, suman puntos, aparecen en rankings y pueden ganar beneficios.", "Cada drop termina en un evento de lanzamiento (una listening party o un show). DROP no produce shows ni eventos: los eventos, entradas y experiencias los organizan los sellos discográficos o los equipos de cada artista, que son responsables de su realización.", "Al crear una cuenta, entrar con Google o usar el modo invitado aceptás estos términos."]
}, {
  id: "participar",
  title: "2. Quién puede participar",
  body: ["Puede usar DROP cualquier persona con una cuenta válida. Si tenés menos de 18 años, necesitás el permiso de tu madre, padre o tutor para usar DROP y para recibir premios, y a los eventos tenés que ir con una persona adulta responsable.", "Los premios se entregan en Argentina. Si un premio es una entrada o una experiencia, el traslado, el alojamiento y cualquier otro gasto corren por cuenta de quien lo gana, salvo que el drop diga otra cosa.", "No pueden ganar premios las personas que trabajan en DROP, ni las del sello o el equipo del artista que organiza ese drop."]
}, {
  id: "cuenta",
  title: "3. Tu cuenta",
  body: ["Tenés que dar datos reales y cuidar el acceso a tu cuenta. Cada persona puede tener una sola cuenta.", "En modo invitado no se crea ninguna cuenta: podés jugar, pero tus puntos no se guardan ni cuentan para el ranking."]
}, {
  id: "sin-compra",
  title: "4. Sin obligación de compra",
  body: ["Participar de los drops, sumar puntos y ganar premios es gratis. Las compras en la tienda y los planes pagos (como DROP+) no suman puntos ni dan ventajas en el ranking.", "La única excepción es la merch exclusiva de un drop: algunos productos solo los pueden comprar quienes están entre los primeros del ranking. Eso es un beneficio del puesto, no una forma de subir."]
}, {
  id: "puntos",
  title: "5. Cómo se suman puntos",
  body: ["Cada misión completada suma dos tipos de puntos: puntos del drop, que cuentan para el ranking de ese drop, y puntos generales de DROP, que se ven en tu perfil y no definen premios.", "Solo suman las misiones verificadas por la app. Los puntos no son dinero, no se pueden comprar, vender ni transferir, y no tienen valor fuera de DROP.", "Los juegos diarios se renuevan todos los días a las 00:00, hora de Argentina. Todas las fechas y horarios de DROP están en hora de Argentina."]
}, {
  id: "juegos",
  title: "6. Reglas de los juegos",
  body: ["Cada misión muestra cuántos puntos da antes de empezar. En general funcionan así:"],
  list: ["Juego del día y trivias: se juegan una vez por período (por ejemplo, una vez por día). Cada pregunta tiene un tiempo límite; si no respondés a tiempo, cuenta como incorrecta. Sumás puntos en proporción a tus respuestas correctas.", "Una vez que empezás un juego con tiempo, no se puede pausar ni reiniciar. Si cerrás la app, el tiempo sigue corriendo.", "Juegos de ordenar (línea de tiempo, tracklist): tenés hasta 3 intentos. Cada intento fallido descuenta puntos del premio de esa misión. Si no lo resolvés en los 3 intentos, la misión termina sin puntos.", "Frases, acertijos y códigos: hay una cantidad limitada de intentos. El código tiene que ser el oficial del drop. Se completan una sola vez.", "Escuchar en Spotify: cuentan las reproducciones que Spotify registra en tu cuenta conectada en las últimas 24 horas. Tienen que ser escuchas normales, no reproducciones automáticas ni generadas por programas.", "Misiones en el mundo real (códigos QR, realidad aumentada): se validan escaneando el código oficial en el lugar o con la experiencia indicada en la misión."],
  after: ["Si una pregunta tiene un error (por ejemplo, ninguna opción es correcta), la anulamos y ajustamos los puntos de todas las personas por igual.", "Si un juego falla por un problema nuestro, podemos habilitar un nuevo intento o acreditar los puntos que correspondan. No se repiten juegos por problemas de conexión o del dispositivo de cada participante."]
}, {
  id: "ranking",
  title: "7. Rankings",
  body: ["Cada drop tiene su ranking general, que es el único que define premios. El ranking semanal y el de amigos son solo para seguir tu progreso.", "Cada drop informa su fecha de cierre. Al cierre el ranking general queda congelado: las misiones que se completen después no suman para los premios.", "Antes de anunciar a quienes ganan revisamos el ranking (hasta 72 horas después del cierre) para descartar trampas. El ranking que vale es el que publicamos después de esa revisión."]
}, {
  id: "desempate",
  title: "8. Desempate",
  body: ["Si dos o más fans tienen el mismo puntaje en un drop, queda arriba quien llegó primero a ese puntaje, es decir, quien sumó sus últimos puntos antes.", "Por eso en el ranking cada fan tiene un puesto propio y no hay puestos compartidos. Si en un caso excepcional también coincide el momento exacto, el puesto se define por sorteo entre los empatados."]
}, {
  id: "premios",
  title: "9. Premios",
  body: ["Los premios de cada drop (entradas, meet & greet, merch u otros) se muestran dentro del drop, los aportan los artistas, sellos o marcas, y están sujetos a disponibilidad y a sus condiciones.", "Después del cierre te avisamos por la app o por email. Tenés 7 días para responder y confirmar tus datos (podemos pedirte tu DNI). Si no respondés a tiempo o no cumplís las condiciones, el premio pasa a la siguiente persona del ranking.", "Los premios son personales, no se pueden transferir ni cambiar por dinero. Las entradas pueden ser nominativas. La fecha, función o ubicación las asigna el organizador del evento según disponibilidad.", "Si un evento se reprograma o se suspende, el premio sigue las condiciones que defina su organizador. DROP no es responsable por cambios o cancelaciones de eventos que no organiza."]
}, {
  id: "juego-limpio",
  title: "10. Juego limpio",
  body: ["No se permite usar bots, programas o scripts, tener más de una cuenta, compartir cuentas, aprovechar errores de la app ni cualquier otra forma de manipular los resultados.", "Si detectamos algo de esto podemos anular puntos, excluirte del ranking, quitarte un premio (incluso ya asignado) o suspender tu cuenta."]
}, {
  id: "tienda",
  title: "11. Compras en la tienda",
  body: ["Los productos de la tienda se pagan a través de Mercado Pago. Los precios, envíos y cambios se informan en cada producto y en el pedido. Mantenés todos tus derechos como consumidor según la ley argentina."]
}, {
  id: "contenido",
  title: "12. Lo que publicás",
  body: ["Sos responsable de las reseñas, posts, comentarios y fotos que subas. No se permite contenido ofensivo, discriminatorio, violento, ilegal o que infrinja derechos de otros.", "Podemos ocultar o borrar contenido que no cumpla estas reglas y suspender cuentas que las incumplan de forma repetida."]
}, {
  id: "terceros",
  title: "13. Contenido y servicios de terceros",
  body: ["Las portadas, canciones y fotos de los artistas pertenecen a sus dueños. La música y los shows se muestran con servicios de terceros como Deezer, Spotify, Ticketmaster y Google, que tienen sus propias condiciones."]
}, {
  id: "cambios",
  title: "14. Cambios y contacto",
  body: ["DROP está en etapa de prueba: algunas funciones pueden cambiar o dejar de estar disponibles. Si cambiamos estos términos, te lo vamos a avisar en la app. Los cambios no afectan a un drop que ya está en curso, salvo para corregir errores.", "Para cualquier consulta, escribinos desde la app. El tratamiento de tus datos se explica en la política de privacidad. Estos términos se rigen por las leyes de la República Argentina."]
}];
function Terminos() {
  const back = (e) => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      e.preventDefault();
      window.history.back();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background px-6 py-8 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[640px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", onClick: back, className: "inline-flex items-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Volver"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl font-black", children: "Términos y condiciones" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Última actualización: noviembre de 2026" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-2xl p-4", style: {
      backgroundImage: "var(--gradient-drop-soft)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold", children: "Lo más importante" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed", children: summary.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: s }, s)) })
    ] }),
    sections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: s.id, className: "mt-7 scroll-mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: s.title }),
      s.body.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: p }, p)),
      s.list && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground", children: s.list.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: p }, p)) }),
      s.after?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: p }, p))
    ] }, s.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-7 text-sm text-muted-foreground", children: [
      "Ver también la ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacidad", className: "text-primary underline", children: "política de privacidad" }),
      "."
    ] })
  ] }) });
}
export {
  Terminos as component
};
