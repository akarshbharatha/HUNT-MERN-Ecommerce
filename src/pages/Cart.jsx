import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi';

function Cart() {
  const {
    cart,
    cartCount,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center">
        <h1 className="text-2xl font-black uppercase">
          Your Bag is Empty
        </h1>

        <p className="mt-3 text-neutral-500">
          Looks like you haven't added any products yet.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-black px-6 text-white hover:bg-neutral-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-3xl font-black uppercase">
          Your Shopping Bag ({cartCount})
        </h1>

        <button
          onClick={() => {
            if (window.confirm("Clear your entire shopping cart?")) {
              clearCart();
            }
          }}
          className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-500 hover:text-white transition"
        >
          Clear Cart
        </button>

      </div>

      <div className="grid lg:grid-cols-12 gap-10">

        <div className="lg:col-span-7 space-y-6">

          {cart.map((item, index) => (

            <div
              key={`${item.id}-${item.size}-${item.color}-${index}`}
              className="flex gap-5 p-4 rounded-xl border bg-white shadow-sm"
            >

              <div className="w-28 h-32 overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">

                <div className="flex justify-between">

                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-neutral-500">
                      {item.category}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.id, item.size, item.color)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={18} />
                  </button>

                </div>

                <div className="flex gap-2 mt-3">

                  <span className="bg-neutral-100 px-2 py-1 rounded text-xs">
                    {item.size}
                  </span>

                  <span className="bg-neutral-100 px-2 py-1 rounded text-xs">
                    {item.color}
                  </span>

                </div>

                <div className="flex justify-between items-center mt-5">

                  <div className="flex items-center border rounded-lg overflow-hidden">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id, item.size, item.color)
                      }
                      className="px-3 py-2 hover:bg-neutral-100"
                    >
                      <FiMinus />
                    </button>

                    <span className="px-4 font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id, item.size, item.color)
                      }
                      className="px-3 py-2 hover:bg-neutral-100"
                    >
                      <FiPlus />
                    </button>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-neutral-400">
                      @ ${item.price.toFixed(2)}
                    </p>

                    <p className="font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-black"
          >
            <FiArrowLeft />
            Continue Shopping
          </Link>

        </div>

        <div className="lg:col-span-5">

          <div className="rounded-2xl border p-6 shadow-sm sticky top-24">

            <h2 className="font-bold uppercase mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 border-b pb-5">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

            </div>

            <div className="flex justify-between mt-6 mb-8">

              <span className="font-bold uppercase">
                Total
              </span>

              <span className="text-2xl font-black">
                ${total.toFixed(2)}
              </span>

            </div>

            {/* <button className="w-full h-12 rounded-lg bg-black text-white hover:bg-neutral-800">
              Proceed to Secure Checkout
            </button> */}
            <Link
            to="/checkout"
            className="w-full h-12 rounded-lg bg-black text-white flex items-center justify-center hover:bg-neutral-800"
            >
            Proceed to Secure Checkout
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;