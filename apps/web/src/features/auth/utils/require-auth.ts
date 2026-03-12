import { redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";

export async function requireAuthBeforeLoad() {
  const session = await authClient.getSession();

  if (!session.data) {
    redirect({ to: "/login", throw: true });
  }

  const { data: customerState } = await authClient.customer.state();

  return { session, customerState };
}

export type AuthRouteContext = Awaited<ReturnType<typeof requireAuthBeforeLoad>>;
