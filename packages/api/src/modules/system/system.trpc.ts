import { router } from "../../trpc/init";
import { protectedProcedure, publicProcedure } from "../../trpc/procedures";

export const systemProcedures = {
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),

  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
};

export const systemRouter = router(systemProcedures);
