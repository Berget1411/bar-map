import type { Context } from "hono";

import { aiRequestSchema } from "./ai.schema";
import { aiService } from "./ai.service";

export const aiController = {
  async chat(c: Context) {
    const payload = aiRequestSchema.parse(await c.req.json());

    return aiService.streamChat(payload.messages);
  },
};
