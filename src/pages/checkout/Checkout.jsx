import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createOrder } from "../../services/orderService";

function Checkout() {
const navigate = useNavigate();
const { user, token } = useAuth();
const { cart, clearCart } = useCart();

const [shipping, setShipping] = useState({
    fullName: user?.name || "",
    phone: "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCharge = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shippingCharge;
  const handlePlaceOrder = async () => {
  try {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.email ||
      !shipping.address ||
      !shipping.city ||
      !shipping.state ||
      !shipping.country ||
      !shipping.pincode
    ) {
      toast.error("Please fill all shipping details.");
      return;
    }

    const orderData = {
      products: cart.map((item) => ({
        product: item.id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
      shippingAddress: shipping,
      totalPrice: total,
      paymentMethod: "COD",
    };

    await createOrder(orderData, token);

    clearCart();

    toast.success("Order placed successfully!");

    navigate("/order-success");

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to place order."
    );
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-10 uppercase">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Shipping Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={shipping.fullName}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={shipping.phone}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={shipping.email}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={shipping.city}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={shipping.state}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shipping.country}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={shipping.pincode}
              onChange={handleChange}
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          <textarea
            name="address"
            placeholder="Full Address"
            value={shipping.address}
            onChange={handleChange}
            rows="5"
            className="border rounded-lg p-3 mt-5 w-full outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow p-8 h-fit sticky top-24">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex justify-between mb-4 border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}

              <div className="space-y-3 mt-6">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingCharge === 0
                      ? "FREE"
                      : `₹${shippingCharge}`}
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

              </div>

              <div className="mt-8">

                <h3 className="font-semibold mb-4">
                  Payment Method
                </h3>

                <label className="flex items-center gap-2 mb-3">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                  />
                  Razorpay (Coming Soon)
                </label>

              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-8 bg-black text-white py-3 rounded-lg hover:bg-neutral-800 transition"
                >
                Place Order
               </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default Checkout;