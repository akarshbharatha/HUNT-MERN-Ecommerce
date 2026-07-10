import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrderById } from "../services/orderService";

function OrderDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id, token);
        setOrder(data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrder();
    }
  }, [id, token]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">
          Loading Order...
        </h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Order not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex justify-between items-center border-b pb-6">

          <div>
            <h1 className="text-3xl font-black">
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>

            <p className="text-gray-500 mt-2">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="text-right">

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
              {order.orderStatus}
            </span>

            <p className="mt-3 text-2xl font-black">
              ₹{order.totalPrice}
            </p>

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-10">

          <div>

            <h2 className="text-2xl font-bold mb-4">
              Shipping Address
            </h2>

            <div className="space-y-2">

              <p>{order.shippingAddress.fullName}</p>

              <p>{order.shippingAddress.phone}</p>

              <p>{order.shippingAddress.email}</p>

              <p>{order.shippingAddress.address}</p>

              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
              </p>

              <p>{order.shippingAddress.pincode}</p>

              <p>{order.shippingAddress.country}</p>

            </div>

          </div>

          <div>

            <h2 className="text-2xl font-bold mb-4">
              Payment
            </h2>

            <p>
              <strong>Method:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p className="mt-3">
              <strong>Status:</strong>{" "}
              {order.paymentStatus}
            </p>

          </div>

        </div>

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6">
            Ordered Products
          </h2>

          <div className="space-y-6">

            {order.products.map((item) => (

              <div
                key={item._id}
                className="flex items-center gap-5 border rounded-xl p-4"
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h3 className="font-bold text-lg">
                    {item.product.name}
                  </h3>

                  <p className="text-gray-500">
                    {item.product.category}
                  </p>

                  <p className="mt-2">
                    Qty: {item.quantity}
                  </p>

                  <p>
                    Size: {item.size}
                  </p>

                  <p>
                    Color: {item.color}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-black text-xl">
                    ₹{item.product.price}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;