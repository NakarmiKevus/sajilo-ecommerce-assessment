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

  return (
    <section>
      {loading && <p>Loading Products...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && product && (
        <div className="bg-slate-50">
          <Link to="/">← Back to products</Link>
          <div className=" flex gap-4 ">
            <div className="flex flex-col gap-4 ">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-16 w-16 rounded-md border overflow-hidden ${
                    index === selectedImage
                      ? "border-blue-500"
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
            <div className="h-80 items-center justify-center overflow-hidden rounded-md">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <p>{product.title}</p>
              <p>{product.brand}</p>
              <p>⭐{product.rating.toFixed(1)}</p>
              <p className="text-[#111827] text-lg font-bold leading-6">
                ${discountedPrice.toFixed(2)}{" "}
                <span className="line-through text-[#94A3B8] text-[13px] font-normal leading-5">
                  ${product.price.toFixed(2)}
                </span>
              </p>
              <p>
                {product.availabilityStatus} ({product.stock} available)
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                >
                  +
                </button>
              </div>
              <button onClick={() => addToCart(product, quantity)}>
                Add to cart
              </button>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <p>Brand</p>
              <p>Category</p>
              <p>Description</p>
            </div>
            <div>
              <p>{product.brand}</p>
              <p>{product.category}</p>
              <p>{product.description}</p>
            </div>
          </div>
          <div>
            <p>Customer Reviews</p>
            <p>{product.rating.toFixed(1)} out of 5</p>
          </div>
          <div>
            <div>
              {product.reviews.map((review) => (
                <div key={review.reviewerEmail}>
                  <div className="flex gap-6 ">
                    <p>{review.reviewerName}</p>
                    <p>
                      {"⭐".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                  </div>
                  <p>{review.comment}</p>
                  <p>{new Date(review.date).toLocaleDateString()}</p>
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
