import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terminos")({
  head: () => ({ meta: [
    { title: "Términos y condiciones · DROP" },
    { name: "description", content: "Las reglas para usar DROP: cuentas, puntos, misiones, rankings y premios." },
  ] }),
  component: Terminos,
});

// Texto base para la etapa de prueba de DROP. Revisalo (idealmente con un abogado) antes de lanzar.
const sections: { title: string; body: string[] }[] = [
  { title: "Qué es DROP", body: [
    "DROP es una plataforma donde los fans participan de lanzamientos musicales (drops): completan misiones y juegos, suman puntos, aparecen en rankings y pueden ganar beneficios.",
    "DROP no produce shows ni eventos. Los eventos, entradas y experiencias los organizan los sellos discográficos o los equipos de cada artista.",
    "Al crear una cuenta, entrar con Google o usar el modo invitado aceptás estos términos.",
  ] },
  { title: "Tu cuenta", body: [
    "Tenés que dar datos reales y cuidar el acceso a tu cuenta. Cada persona puede tener una sola cuenta.",
    "Si tenés menos de 18 años, necesitás el permiso de tu madre, padre o tutor para usar DROP y para recibir premios.",
    "En modo invitado no se crea ninguna cuenta y tus puntos no se guardan.",
  ] },
  { title: "Puntos, misiones y rankings", body: [
    "Los puntos no son dinero, no se pueden comprar, vender ni transferir, y no tienen valor fuera de DROP.",
    "Cada drop tiene su propio ranking y sus propias reglas de premios, que se muestran dentro del drop.",
    "Podemos anular puntos o excluir del ranking a quien use bots, cuentas múltiples, trampas o cualquier forma de manipular los resultados.",
  ] },
  { title: "Premios y beneficios", body: [
    "Los premios (entradas, meet & greet, merch u otros) los aportan los artistas, sellos o marcas de cada drop, y están sujetos a disponibilidad y a sus condiciones.",
    "Para entregar un premio podemos pedirte que confirmes tu identidad. Los premios no se cambian por dinero.",
  ] },
  { title: "Compras en la tienda", body: [
    "Los productos de la tienda se pagan a través de Mercado Pago. Los precios, envíos y cambios se informan en cada producto y en el pedido.",
  ] },
  { title: "Lo que publicás", body: [
    "Sos responsable de las reseñas, posts, comentarios y fotos que subas. No se permite contenido ofensivo, discriminatorio, violento, ilegal o que infrinja derechos de otros.",
    "Podemos ocultar o borrar contenido que no cumpla estas reglas y suspender cuentas que las incumplan de forma repetida.",
  ] },
  { title: "Contenido de terceros", body: [
    "Las portadas, canciones y fotos de los artistas pertenecen a sus dueños. La música y los shows se muestran con servicios de terceros como Deezer, Spotify y Ticketmaster, que tienen sus propias condiciones.",
  ] },
  { title: "Cambios y contacto", body: [
    "DROP está en etapa de prueba: algunas funciones pueden cambiar o dejar de estar disponibles. Si cambiamos estos términos, te lo vamos a avisar en la app.",
    "Para cualquier consulta, escribinos desde la app. El tratamiento de tus datos se explica en la política de privacidad.",
  ] },
];

function Terminos() {
  return (
    <div className="min-h-screen bg-background px-6 py-8 text-foreground">
      <div className="mx-auto max-w-[640px]">
        <Link to="/auth" className="inline-flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" />Volver</Link>
        <h1 className="mt-4 text-3xl font-black">Términos y condiciones</h1>
        <p className="mt-2 text-sm text-muted-foreground">Última actualización: noviembre de 2026</p>
        {sections.map((s) => (
          <section key={s.title} className="mt-7">
            <h2 className="text-lg font-bold">{s.title}</h2>
            {s.body.map((p) => <p key={p} className="mt-2 text-sm leading-relaxed text-muted-foreground">{p}</p>)}
          </section>
        ))}
        <p className="mt-7 text-sm text-muted-foreground">Ver también la <Link to="/privacidad" className="text-primary underline">política de privacidad</Link>.</p>
      </div>
    </div>
  );
}
