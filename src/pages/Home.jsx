import { useEffect, useState } from "react";
import { getAllProducts, getCategories } from "../services/productService";
import ProductGrid from "../components/ProductGrid";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sortOption, setSortOption] = useState("");

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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError("Unable to load categories.");
      }
    }
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchedSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchedCategory =
      selectedCategory === "" || p.category === selectedCategory;

    return matchedSearch && matchedCategory;
  });

  const getSortedProducts = () => {
    const sorted = [...filteredProducts];

    switch (sortOption) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  };

  const sortedProducts = getSortedProducts();

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

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>

      {!loading && !error && sortedProducts.length === 0 && (
        <p className="text-[#DC2626]">
          No products found matching your filters.
        </p>
      )}

      {!loading && !error && sortedProducts.length > 0 && (
        <ProductGrid products={sortedProducts} />
      )}
    </section>
  );
}
export default Home;
