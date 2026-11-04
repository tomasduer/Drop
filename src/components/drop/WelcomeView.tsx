import { Link } from "@tanstack/react-router";
import { ArrowRight, Disc3, Map, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/drop-logo-2026.webp.asset.json";
const steps = [
  { icon: Map, title: "Elegí un drop y jugá", text: "Recorré etapas, misiones y desafíos; cada uno indica cuántos puntos da." },
  { icon: Disc3, title: "Tus álbumes también cuentan", text: "Marcá los discos que escuchaste y ganá 120 puntos generales por álbum." },
  { icon: Trophy, title: "Dos tipos de puntos", text: "Las misiones suman al ranking del artista; los puntos generales se canjean desde Mi DROP." },
  { icon: Users, title: "Compartí el recorrido", text: "Ranking, Comunidad y Pasaporte: tu posición, otros fans y tus recompensas." },
];

export function WelcomeView() {
  return <div className="min-h-screen bg-background px-7 py-8 text-foreground">
    <div className="mx-auto max-w-[440px]">
      <img src={logo.url} alt="DROP" className="h-auto w-44 object-contain drop-shadow-[0_0_14px_var(--primary)]" />
      <p className="mt-5 text-xs font-bold uppercase text-primary">Bienvenid@ a DROP</p>
      <h1 className="mt-2 text-3xl font-black leading-tight">La música se vive.<br />Y también suma.</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Elegí la experiencia de un artista, jugá sus misiones y sumá puntos con la música que ya escuchás.</p>
      <div className="mt-6 divide-y divide-border">
        {steps.map(({ icon: Icon, title, text }) => <section key={title} className="flex items-start gap-3 py-4"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><h2 className="text-sm font-bold">{title}</h2><p className="mt-1 text-sm leading-snug text-muted-foreground">{text}</p></div></section>)}
      </div>
      <div className="mt-6 space-y-3 border-t border-border pt-6">
        <Button asChild className="h-12 w-full"><Link to="/auth" search={{ mode: "login" }}>Iniciar sesión <ArrowRight /></Link></Button>
        <Button asChild variant="outline" className="h-12 w-full"><Link to="/auth" search={{ mode: "signup" }}>Crear cuenta <ArrowRight /></Link></Button>
        <Button asChild variant="ghost" className="h-12 w-full"><Link to="/invitado">Ingresar sin cuenta <ArrowRight /></Link></Button>
      </div>
    </div>
  </div>;
}
