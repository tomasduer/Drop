import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { finishSpotifyLogin } from "@/lib/spotify";

export const Route = createFileRoute("/spotify")({
  head: () => ({ meta: [{ title: "DROP · Conectando Spotify" }, { name: "robots", content: "noindex" }] }),
  component: SpotifyCallback,
});

function SpotifyCallback() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Conectando tu cuenta de Spotify…");
  useEffect(() => {
    finishSpotifyLogin(new URLSearchParams(window.location.search))
      .then((to) => { toast.success("¡Spotify conectado!"); window.location.replace(to); })
      .catch((e: Error & { returnTo?: string }) => {
        setMsg(e.message);
        toast.error(e.message);
        setTimeout(() => (e.returnTo ? window.location.replace(e.returnTo) : void navigate({ to: "/mi-drop" })), 1800);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="grid min-h-screen place-items-center bg-background p-6 text-center text-sm text-muted-foreground"><div><Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin text-primary" />{msg}</div></div>;
}
