import type { Hono } from "hono";

import { rootRouter } from "../modules/root";
import { restRouter } from "./routes/rest-router";

export function mountRest(app: Hono) {
  app.route("/", rootRouter);
  app.route("/", restRouter);
}
