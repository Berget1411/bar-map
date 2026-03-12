import z from "zod";

export const aiRequestSchema = z.object({
  messages: z.array(z.unknown()).default([]),
});

export type AIRequest = z.infer<typeof aiRequestSchema>;
