import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductGrid from "../components/ProductGrid";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section>
      {loading && <p>Loading Products...</p>}
      {error && <p>{error}</p>}

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-[#DC2626]">No products found for "{searchTerm}"</p>
      )}
      {!loading && !error && filteredProducts.length > 0 && (
        <ProductGrid products={filteredProducts} />
      )}
    </section>
  );
}
export default Home;
