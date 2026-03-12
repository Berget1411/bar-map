import { auth } from "@open-learn/auth";
import type { Hono } from "hono";

export function mountAuth(app: Hono) {
  app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
}
