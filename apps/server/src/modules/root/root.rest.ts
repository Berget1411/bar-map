import { Hono } from "hono";

export const rootRouter = new Hono();

rootRouter.get("/", (c) => {
  return c.text("OK");
});
