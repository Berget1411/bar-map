import { env } from "@open-learn/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { mountAuth } from "./auth/mount";
import { mountRest } from "./rest/mount";
import { mountTrpc } from "./trpc/mount";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: env.CORS_ORIGIN,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

mountAuth(app);
mountTrpc(app);
mountRest(app);

export { app };
