export default function SuccessPage({ checkoutId }: { checkoutId?: string }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Payment Successful!</h1>
      {checkoutId && <p>Checkout ID: {checkoutId}</p>}
    </div>
  );
}
