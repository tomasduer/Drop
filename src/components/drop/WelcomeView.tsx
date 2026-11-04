import { Link } from "@tanstack/react-router";
import { ArrowRight, Disc3, Map, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoViolet from "@/assets/drop-logo-negativo.webp";
const logo = { url: logoViolet };
const steps = [
  { icon: Map, title: "Elegí los drops de tus artistas" },
  { icon: Trophy, title: "Jugá misiones y subí en el ranking" },
  { icon: Disc3, title: "Desbloqueá premios y experiencias" },
];

export function WelcomeView() {
  return <div className="min-h-screen bg-background px-7 py-8 text-foreground">
    <div className="mx-auto max-w-[440px]">
      <img decoding="async" src={logo.url} alt="DROP" className="h-auto w-44 object-contain" />
      <p className="mt-5 text-xs font-bold uppercase text-primary">Bienvenid@ a DROP</p>
      <h1 className="mt-2 text-3xl font-black leading-tight">La música se vive.<br />Y también suma.</h1>
      <ul className="mt-6 space-y-3">
        {steps.map(({ icon: Icon, title }) => <li key={title} className="flex items-center gap-3 text-sm font-semibold"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15"><Icon className="h-4 w-4 text-primary" /></span>{title}</li>)}
      </ul>
      <div className="mt-8 space-y-3">
        <Button asChild className="h-12 w-full font-bold"><Link to="/auth" search={{ mode: "login" }}>Empezar <ArrowRight /></Link></Button>
        <Button asChild variant="ghost" className="h-12 w-full"><Link to="/invitado">Probar sin cuenta</Link></Button>
      </div>
      <p className="mt-6 text-center"><a href="/privacidad" className="text-xs text-muted-foreground underline">Política de privacidad</a></p>
    </div>
  </div>;
}
