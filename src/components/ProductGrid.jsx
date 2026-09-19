import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
export default ProductGrid;
