import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Link to={`/product/${product.id}`}>
      <div className="relative flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-3 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md">
        {product.discountPercentage > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-md bg-slate-50">
          <img
            className="w-full h-full object-contain "
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
        <h3 className="mt-1 text-[#1F2937] text-base font-semibold leading-6">
          {product.title}
        </h3>
        <p className="text-[#64748B] text-[13px] font-normal leading-5">
          {product.brand}
        </p>
        <p className="text-[#475569] text-[13px] font-medium leading-5">
          ⭐{product.rating.toFixed(1)}
        </p>
        <p className="text-[#111827] text-lg font-bold leading-6">
          ${discountedPrice.toFixed(2)}{" "}
          <span className="line-through text-[#94A3B8] text-[13px] font-normal leading-5">
            ${product.price.toFixed(2)}
          </span>
        </p>
      </div>
    </Link>
  );
}
export default ProductCard;
