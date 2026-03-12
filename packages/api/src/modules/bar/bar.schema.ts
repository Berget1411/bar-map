import z from "zod";

export const createBarInputSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().optional(),
  isOpen: z.boolean().optional(),
});

export const deleteBarInputSchema = z.object({
  id: z.number(),
});

export type CreateBarInput = z.infer<typeof createBarInputSchema>;
export type DeleteBarInput = z.infer<typeof deleteBarInputSchema>;
