import { initTRPC } from "@trpc/server";

import type { TrpcContext } from "../context/types";

export const t = initTRPC.context<TrpcContext>().create();

export const router = t.router;
