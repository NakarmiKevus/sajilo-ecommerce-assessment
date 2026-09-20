import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const discountedPrice = item.price * (1 - item.discountPercentage / 100);
  const lineTotal = discountedPrice * item.quantity;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <div className="flex items-center gap-3 min-w-[180px]">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-16 w-16 rounded-lg bg-slate-50 object-contain"
        />
        <div>
          <p className="text-sm font-medium text-slate-800">{item.title}</p>
          <p className="text-xs text-slate-400">{item.brand}</p>
        </div>
      </div>

      <div className="text-sm text-slate-700">
        ${discountedPrice.toFixed(2)}{" "}
        <span className="text-xs text-slate-400 line-through">
          ${item.price.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center overflow-hidden rounded-lg border border-slate-300">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
        >
          −
        </button>
        <span className="px-3 text-sm">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
        >
          +
        </button>
      </div>

      <div className="text-sm font-semibold text-slate-800">
        ${lineTotal.toFixed(2)}
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="text-slate-400 hover:text-red-600"
        aria-label={`Remove ${item.title} from cart`}
      >
        🗑
      </button>
    </div>
  );
}
export default CartItem;
