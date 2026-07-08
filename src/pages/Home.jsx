import React from "react";
import Hero from "../components/common/Hero";
import ProductCard from "../components/ui/ProductCard";
import { useProducts } from "../context/ProductsContext";

function Home() {
  const { products, loading, error } = useProducts();

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Curated Essentials
          </span>

          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl uppercase">
            Latest Drops
          </h2>

          <div className="mt-2 h-1 w-12 bg-neutral-900 rounded-full" />
        </div>

        {loading && (
          <p className="text-center text-neutral-500">
            Loading products...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-neutral-500">
            No products available.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;