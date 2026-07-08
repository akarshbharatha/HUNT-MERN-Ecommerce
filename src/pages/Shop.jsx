import React, { useEffect, useState } from "react";
import ProductCard from "../components/ui/ProductCard";
import SearchBar from "../components/common/SearchBar";
import { useProducts } from "../context/ProductsContext";

const CATEGORIES = [
  "All",
  "Hoodies",
  "Oversized Hoodies",
  "Sweatshirts",
];

function Shop() {
  // const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading, error } = useProducts();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Header */}

      <div className="border-b border-neutral-200 pb-6 mb-10">

        <h1 className="text-3xl font-black tracking-tight text-neutral-900 uppercase sm:text-4xl">
          Catalogue
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Showing {filteredProducts.length} products
        </p>

        <div className="mt-6">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

      </div>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Sidebar */}

        <aside className="w-full lg:w-64">

          <h2 className="text-xs font-bold uppercase tracking-wider mb-5">
            Categories
          </h2>

          <div className="flex flex-wrap lg:flex-col gap-2">

            {CATEGORIES.map((cat) => (

              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-4 py-2 text-left text-sm transition ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "hover:bg-neutral-100"
                }`}
              >
                {cat}
              </button>

            ))}

          </div>

        </aside>

        {/* Products */}

        <div className="flex-1">

          {loading && (
            <p className="text-center">
              Loading products...
            </p>
          )}

          {error && (
            <p className="text-center text-red-600">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <h2 className="text-xl font-semibold">
                  No products found
                </h2>

                <p className="mt-2 text-neutral-500">
                  Try another search.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            filteredProducts.length > 0 && (

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

                {filteredProducts.map((product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                  />

                ))}

              </div>

            )}

        </div>

      </div>

    </div>
  );
}

export default Shop;