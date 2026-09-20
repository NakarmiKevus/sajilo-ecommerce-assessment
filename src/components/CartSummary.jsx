import { useCart } from "../context/CartContext";

function CartSummary() {
  const { subtotal, tax, total, cartItems, clearCart } = useCart();

  function handleCheckout() {
    if (cartItems.length === 0) return;

    clearCart();
    alert("Order placed successfully");
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sticky top-20">
      <h3 className="text-base font-semibold text-slate-800 mb-4">
        Order Summary
      </h3>

      <div className="flex justify-between text-sm text-slate-600 mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-slate-600 mb-3">
        <span>Tax (13%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-base font-bold text-slate-900 border-t border-slate-100 pt-3 mb-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
        className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Checkout
      </button>

      <p className="mt-3 text-xs text-slate-400 text-center">
        Your cart is saved automatically and will be available even after
        refreshing the page.
      </p>
    </div>
  );
}

export default CartSummary;
