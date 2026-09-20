import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import CartSummary from "../components/CartSummary";

function Cart() {
  const { cartItems } = useCart();

  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl font-semibold text-slate-800 mb-6">
        Your Cart ({cartItems.length} items)
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-16 text-center">
          <span className="text-4xl">🛒</span>
          <p className="text-slate-600">Your cart is empty.</p>
          <Link
            to="/"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <Link
              to="/"
              className="mt-4 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
            >
              ← Continue Shopping
            </Link>
          </div>

          <div className="lg:w-80">
            <CartSummary />
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
