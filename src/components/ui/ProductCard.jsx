import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    addItem,
    removeItem,
    wishlist,
    isInWishlist,
  } = useWishlist();

  const wishlisted = isInWishlist(product._id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (wishlisted) {
        const item = wishlist.find(
          (w) => w.product._id === product._id
        );

        if (item) {
          await removeItem(item._id);
        }
      } else {
        await addItem(product._id);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md border border-neutral-100">

      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition"
        >
          {wishlisted ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FiHeart className="text-lg" />
          )}
        </button>

        {product.tag && (
          <span className="absolute top-3 left-3 rounded bg-black text-white px-2 py-1 text-xs">
            {product.tag}
          </span>
        )}

      </div>

      <div className="mt-4 flex-1">

        <p className="text-xs uppercase text-neutral-500">
          {product.category}
        </p>

        <Link to={`/product/${product._id}`}>
          <h3 className="mt-2 font-semibold hover:text-black">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-between">

          <span className="font-bold text-lg">
            ₹{product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="text-sm underline"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;