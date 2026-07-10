import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../services/orderService";
import OrderCard from "../components/orders/OrderCard";

function MyOrders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getMyOrders(token);
        setOrders(data.orders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">
          Loading your orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-black mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">

          <h2 className="text-2xl font-bold">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-3">
            You haven't placed any orders yet.
          </p>

        </div>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
          />
        ))
      )}

    </div>
  );
}

export default MyOrders;