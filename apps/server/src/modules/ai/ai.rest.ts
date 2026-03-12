import { Hono } from "hono";

import { aiController } from "./ai.controller";

export const aiRouter = new Hono();

aiRouter.post("/", (c) => aiController.chat(c));
