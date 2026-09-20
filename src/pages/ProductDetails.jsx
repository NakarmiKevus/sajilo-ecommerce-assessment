import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    async function fetchProductById() {
      setLoading(true);
      setError("");
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Product not found");
        } else {
          setError("Unable to load product. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProductById();
  }, [id]);

  const discountedPrice = product
    ? product.price * (1 - product.discountPercentage / 100)
    : 0;

  function handleAddToCart() {
    addToCart(product, quantity);
    setShowMessage(true);

    setTimeout(() => setShowMessage(false), 2000);
  }

  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      {loading && (
        <p className="text-center text-slate-500 py-12">Loading product...</p>
      )}
      {error && <p className="text-center text-red-600 py-12">{error}</p>}

      {showMessage && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 text-center">
          Item added to cart!
        </div>
      )}

      {!loading && !error && product && (
        <div>
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
          >
            ← Back to products
          </Link>

          <div className="grid grid-cols-1 gap-8 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border ${
                      index === selectedImage
                        ? "border-blue-500 ring-1 ring-blue-500"
                        : "border-slate-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
              <div className="flex h-80 flex-1 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="text-xl font-semibold text-slate-800">
                {product.title}
              </p>
              <p className="text-sm text-slate-500">{product.brand}</p>
              <p className="text-sm text-slate-600">
                ⭐ {product.rating.toFixed(1)}
              </p>
              <p className="text-lg font-bold leading-6 text-slate-900">
                ${discountedPrice.toFixed(2)}{" "}
                <span className="text-[13px] font-normal leading-5 text-slate-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </p>
              <p
                className={`text-sm font-medium ${
                  product.stock === 0 ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {product.availabilityStatus} ({product.stock} available)
              </p>

              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm text-slate-600">Quantity</span>
                <div className="flex items-center overflow-hidden rounded-lg border border-slate-300">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100"
                  >
                    −
                  </button>
                  <span className="px-4 text-sm">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-[100px_1fr] gap-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm sm:p-6">
            <p className="font-medium text-slate-500">Brand</p>
            <p className="text-slate-700">{product.brand}</p>
            <p className="font-medium text-slate-500">Category</p>
            <p className="text-slate-700 capitalize">
              {product.category.replace("-", " ")}
            </p>
            <p className="font-medium text-slate-500">Description</p>
            <p className="text-slate-700">{product.description}</p>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
            <p className="text-lg font-semibold text-slate-800">
              Customer Reviews
            </p>
            <p className="mb-4 text-sm text-slate-500">
              {product.rating.toFixed(1)} out of 5 ({product.reviews.length}{" "}
              reviews)
            </p>

            <div className="flex flex-col divide-y divide-slate-100">
              {product.reviews.map((review) => (
                <div key={review.reviewerEmail} className="py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-800">
                      {review.reviewerName}
                    </p>
                    <p className="text-sm text-amber-500">
                      {"⭐".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {review.comment}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default ProductDetails;
