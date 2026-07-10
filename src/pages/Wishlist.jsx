import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
function Wishlist() {
  const { wishlist, loading, removeItem } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = async (item) => {
    const added = addToCart(
      {
        ...item.product,
        id: item.product._id,
      },
      1,
      "M",
      "Black"
    );

    if (added) {
      await removeItem(item._id);
    //   alert("Product moved to cart.");
        toast.success("Product moved to cart");
    } else {
    //   alert("Product is already in your cart.");
        toast.error("Product already exists in your cart");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading wishlist...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-8">
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">
            Your wishlist is empty
          </h2>

          <Link
            to="/shop"
            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl overflow-hidden bg-white shadow"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">
                  {item.product.name}
                </h2>

                <p className="text-neutral-500 mt-2">
                  {item.product.category}
                </p>

                <p className="font-bold text-xl mt-3">
                  ₹{item.product.price}
                </p>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-neutral-800"
                  >
                    Move to Cart
                  </button>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="flex-1 border py-2 rounded-lg hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;