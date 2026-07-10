import api from "../api/axios";

export const createOrder = async (orderData, token) => {
  const response = await api.post("/orders", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMyOrders = async (token) => {
  const response = await api.get("/orders/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getOrderById = async (id, token) => {
  const response = await api.get(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};