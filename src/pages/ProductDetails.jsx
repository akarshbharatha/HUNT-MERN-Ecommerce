import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
import { getProductById } from "../services/productService";
import {
  FiShoppingBag,
  FiHeart,
  FiCheck,
  FiPlus,
  FiMinus,
} from 'react-icons/fi';

import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Matte Black");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        Product not found.
      </div>
    );
  }

  const handleAddToBag = () => {
    addToCart(product, quantity, selectedSize, selectedColor);

    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      <nav className="text-xs font-semibold tracking-wider text-neutral-400 mb-8 uppercase">
        <Link to="/">Home</Link> /
        <Link to="/shop" className="ml-1">
          Shop
        </Link> /
        <span className="ml-1 text-neutral-900">
          {product.category}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div className="overflow-hidden rounded-2xl bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>

          <span className="text-xs uppercase text-neutral-400">
            {product.category}
          </span>

          <h1 className="text-4xl font-black mt-2">
            {product.name}
          </h1>

          <p className="text-2xl font-bold mt-4">
            ₹ {product.price}
          </p>

          <p className="mt-6 text-neutral-500">
            {product.description}
          </p>

          <div className="mt-8">

            <h3 className="font-semibold mb-3">
              Size
            </h3>

            <div className="flex gap-3">

              {["S","M","L","XL"].map(size => (

                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-lg px-4 py-2 ${
                    selectedSize===size
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {size}
                </button>

              ))}

            </div>

          </div>

          <div className="flex items-center gap-4 mt-8">

            <button
              onClick={() =>
                setQuantity(Math.max(1, quantity-1))
              }
            >
              <FiMinus />
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity(quantity+1)
              }
            >
              <FiPlus />
            </button>

          </div>

          <button
            onClick={handleAddToBag}
            className="mt-8 w-full bg-black text-white py-3 rounded-lg"
          >
            <FiShoppingBag className="inline mr-2" />
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;