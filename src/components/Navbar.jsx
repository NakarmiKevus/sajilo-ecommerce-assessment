import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
      <Link
        to="/"
        className="text-lg font-bold text-blue-600 whitespace-nowrap"
      >
        SajiloStore
      </Link>

      <Link
        to="/cart"
        className="relative flex items-center gap-1 text-slate-700 hover:text-blue-600"
      >
        <span className="text-xl">🛒</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}

export default Navbar;
