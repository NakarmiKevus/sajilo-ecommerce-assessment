import { useEffect, useState } from "react";
import { getCategories } from "../services/productService";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError("");
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return { categories, loading, error };
}
