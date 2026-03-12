import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures";
import { createTodoInputSchema, deleteTodoInputSchema, toggleTodoInputSchema } from "./todo.schema";
import { todoService } from "./todo.service";

export const todoRouter = router({
  getAll: publicProcedure.query(() => {
    return todoService.getAll();
  }),

  create: publicProcedure.input(createTodoInputSchema).mutation(({ input }) => {
    return todoService.create(input);
  }),

  toggle: publicProcedure.input(toggleTodoInputSchema).mutation(({ input }) => {
    return todoService.toggle(input);
  }),

  delete: publicProcedure.input(deleteTodoInputSchema).mutation(({ input }) => {
    return todoService.delete(input);
  }),
});
