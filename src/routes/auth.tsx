import { createFileRoute } from "@tanstack/react-router";
import { EmailEntry } from "@/components/drop/EmailEntry";
export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { mode?: "login" | "signup" } => ({ mode: search.mode === "signup" ? "signup" : "login" }),
  head: () => ({ meta: [
    { title: "Entrá a DROP · Tu cuenta" }, { name: "description", content: "Iniciá sesión o creá tu cuenta DROP con tu email." },
    { property: "og:title", content: "Entrá a DROP" }, { property: "og:description", content: "Tu cuenta para vivir experiencias musicales." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: EmailEntry,
});
