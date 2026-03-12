import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "@open-learn/api/trpc/routers/app";
import type { Hono } from "hono";

import { createContext } from "./create-context";

export function mountTrpc(app: Hono) {
  app.use(
    "/trpc/*",
    trpcServer({
      router: appRouter,
      createContext: (_opts, context) => {
        return createContext({ context });
      },
    }),
  );
}
