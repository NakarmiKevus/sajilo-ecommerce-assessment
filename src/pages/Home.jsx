import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import Pagination from "../components/Pagination";

function Home() {
  const { products, loading, error } = useProducts();
  const { categories } = useCategories();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  const itemPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(sortedProducts.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const paginationProdcut = sortedProducts.slice(
    startIndex,
    startIndex + itemPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOption]);

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
        <>
          <ProductGrid products={paginationProdcut} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}
export default Home;
