import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures";
import { createBarInputSchema, deleteBarInputSchema } from "./bar.schema";
import { barService } from "./bar.service";

export const barRouter = router({
  getAll: publicProcedure.query(() => {
    return barService.getAll();
  }),

  getOpen: publicProcedure.query(() => {
    return barService.getOpen();
  }),

  create: publicProcedure.input(createBarInputSchema).mutation(({ input }) => {
    return barService.create(input);
  }),

  delete: publicProcedure.input(deleteBarInputSchema).mutation(({ input }) => {
    return barService.delete(input);
  }),
});
