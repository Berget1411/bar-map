import type { TrpcContext } from "@open-learn/api/context/types";
import { auth } from "@open-learn/auth";
import type { Context as HonoContext } from "hono";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions): Promise<TrpcContext> {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });

  return {
    session,
  };
}
