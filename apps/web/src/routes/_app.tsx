import { requireAuthBeforeLoad } from "@/features/auth/utils/require-auth";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  beforeLoad: requireAuthBeforeLoad,
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-0 flex-1 flex-col p-4 md:p-6 h-screen">
      <Outlet />
    </div>
  );
}
