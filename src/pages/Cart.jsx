import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import CartSummary from "../components/CartSummary";

function Cart() {
  const { cartItems } = useCart();

  return (
    <section>
      <h1>Your Cart ({cartItems.length} items)</h1>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Continue Shopping</Link>
        </p>
      ) : (
        <div className="flex gap-6">
          <div className="flex-1">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <Link to="/">Continue Shopping</Link>
          </div>
          <CartSummary />
        </div>
      )}
    </section>
  );
}

export default Cart;
