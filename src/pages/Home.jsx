import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductGrid from "../components/ProductGrid";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");

      try {
        const data = await getAllProducts();
        setProducts(data.products);
      } catch (err) {
        setError("Unable to load products. Please try again");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  return (
    <section>
      {loading && <p>Loading Products...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <ProductGrid products={products} />}
    </section>
  );
}
export default Home;
