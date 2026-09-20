import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <Link to="/">SajiloStore</Link>

      <Link to="/cart">🛒 Cart ({cartCount})</Link>
    </nav>
  );
}

export default Navbar;
