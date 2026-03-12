import { createFileRoute } from "@tanstack/react-router";

import DashboardPage from "@/features/auth/pages/dashboard-page";

export const Route = createFileRoute("/_app/")({
  component: DashboardRoute,
});

function DashboardRoute() {
  const { session, customerState } = Route.useRouteContext();

  return <DashboardPage session={session} customerState={customerState} />;
}
