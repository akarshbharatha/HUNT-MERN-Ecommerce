import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProducts } from "../services/productService";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
      // setProducts(data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}