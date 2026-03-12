import z from "zod";

export const createTodoInputSchema = z.object({
  text: z.string().min(1),
});

export const toggleTodoInputSchema = z.object({
  id: z.number(),
  completed: z.boolean(),
});

export const deleteTodoInputSchema = z.object({
  id: z.number(),
});

export type CreateTodoInput = z.infer<typeof createTodoInputSchema>;
export type ToggleTodoInput = z.infer<typeof toggleTodoInputSchema>;
export type DeleteTodoInput = z.infer<typeof deleteTodoInputSchema>;
