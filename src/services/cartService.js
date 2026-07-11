import api from "../api/axios";

// Get token
const getToken = () => localStorage.getItem("hunt-token");

// Add to Cart
export const addCartItem = async (cartData) => {
  const response = await api.post("/cart", cartData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Get Cart
export const getCart = async () => {
  const response = await api.get("/cart", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Update Quantity
export const updateCartQuantity = async (
  id,
  quantity
) => {
  const response = await api.put(
    `/cart/${id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// Remove Item
export const removeCartItem = async (id) => {
  const response = await api.delete(`/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Clear Cart
export const clearCart = async () => {
  const response = await api.delete("/cart", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};