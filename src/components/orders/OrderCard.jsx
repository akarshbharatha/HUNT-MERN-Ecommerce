import React from "react";
import { Link } from "react-router-dom";

function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8 hover:shadow-lg transition">

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">

        <div>
          <h2 className="text-xl font-bold">
            Order #{order._id.slice(-8).toUpperCase()}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">

          <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
            {order.orderStatus}
          </span>

          <p className="mt-2 text-lg font-bold">
            ₹{order.totalPrice}
          </p>

        </div>

      </div>

      {/* Products */}
      <div className="mt-6 space-y-5">

        {order.products.map((item) => (

          <div
            key={item._id}
            className="flex items-center gap-4"
          >

            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 rounded-xl object-cover border"
            />

            <div className="flex-1">

              <h3 className="font-semibold text-lg">
                {item.product.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.product.category}
              </p>

              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span>Qty: {item.quantity}</span>
                <span>Size: {item.size}</span>
                <span>Color: {item.color}</span>
              </div>

            </div>

            <div className="text-right">

              <p className="font-bold text-lg">
                ₹{item.product.price}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t pt-5 mt-6">

        <div>
          <p className="text-sm text-gray-500">
            Payment:
            <span className="ml-2 font-semibold text-black">
              {order.paymentMethod}
            </span>
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Status:
            <span className="ml-2 font-semibold text-green-600">
              {order.paymentStatus}
            </span>
          </p>
        </div>

        <Link
          to={`/orders/${order._id}`}
          className="rounded-lg bg-black px-6 py-2 text-white font-medium hover:bg-neutral-800 transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default OrderCard;