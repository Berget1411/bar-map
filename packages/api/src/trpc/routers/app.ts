import { barRouter } from "../../modules/bar";
import { systemProcedures } from "../../modules/system";
import { todoRouter } from "../../modules/todo";
import { router } from "../init";

export const appRouter = router({
  ...systemProcedures,
  bar: barRouter,
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
