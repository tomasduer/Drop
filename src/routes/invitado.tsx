import { createFileRoute } from "@tanstack/react-router";
import { GuestEntry } from "@/components/drop/GuestEntry";

export const Route = createFileRoute("/invitado")({
  head: () => ({ meta: [
    { title: "DROP · Ingresar sin cuenta" },
    { name: "description", content: "Entrá a DROP con un nombre temporal y una foto opcional, sin crear una cuenta." },
    { property: "og:title", content: "DROP · Ingresar sin cuenta" },
    { property: "og:description", content: "Explorá DROP con un perfil temporal sin guardar tus datos." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: GuestEntry,
});