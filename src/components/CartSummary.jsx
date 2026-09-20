import { useCart } from "../context/CartContext";

function CartSummary() {
  const { subtotal, tax, total, cartItems, clearCart } = useCart();

  function handleCheckout() {
    if (cartItems.length === 0) return;

    clearCart();
    alert("Order placed successfully");
  }

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <h3>Order Summary</h3>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Tax (13%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Checkout
      </button>

      <p className="text-xs text-slate-400">
        Your cart is saved automatically and will be available even after
        refreshing the page.
      </p>
    </div>
  );
}

export default CartSummary;
