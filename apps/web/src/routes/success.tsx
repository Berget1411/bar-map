import { createFileRoute, useSearch } from "@tanstack/react-router";

import SuccessPage from "@/features/auth/pages/success-page";

export const Route = createFileRoute("/success")({
  component: SuccessRoute,
  validateSearch: (search) => ({
    checkout_id: search.checkout_id as string,
  }),
});

function SuccessRoute() {
  const { checkout_id } = useSearch({ from: "/success" });
  return <SuccessPage checkoutId={checkout_id} />;
}
