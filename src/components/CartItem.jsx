import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const discountedPrice = item.price * (1 - item.discountPercentage / 100);
  const lineTotal = discountedPrice * item.quantity;

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b">
      <div className="flex items-center gap-3">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-16 h-16 object-contain"
        />
        <div>
          <p>{item.title}</p>
          <p>{item.brand}</p>
        </div>
      </div>

      <div>
        ${discountedPrice.toFixed(2)}{" "}
        <span className="line-through">${item.price.toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          −
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          +
        </button>
      </div>

      <div>${lineTotal.toFixed(2)}</div>

      <button onClick={() => removeFromCart(item.id)}>🗑</button>
    </div>
  );
}
export default CartItem;
