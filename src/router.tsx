import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Precarga la pantalla al pasar o tocar un enlace, para que abra casi al instante.
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
