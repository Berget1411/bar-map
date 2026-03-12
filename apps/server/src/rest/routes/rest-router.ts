import { Hono } from "hono";

import { aiRouter } from "../../modules/ai";

export const restRouter = new Hono();

restRouter.route("/ai", aiRouter);
