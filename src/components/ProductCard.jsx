function ProductCard({ product }) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="bg-[ #FFFFFF] border border-[#E5E7EB] px-2 py-4 rounded-lg flex flex-col items-justify gap-2">
      <img className="w-50 h-50" src={product.thumbnail} alt={product.title} />
      <h3 className="text-[#1F2937]">{product.title}</h3>
      <p className="text-[#64748B]">{product.brand}</p>
      <p className="text-[#1F2937]">${product.price}</p>
      <p className="text-[#475569]">⭐{product.rating.toFixed(1)}</p>
      <p className="text-[#111827]">
        ${discountedPrice.toFixed(2)}{" "}
        <span className="line-through text-[#94A3B8]">${product.price}</span>
      </p>
    </div>
  );
}
export default ProductCard;
