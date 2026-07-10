import api from "../api/axios";

// Get all addresses
export const getAddresses = async (token) => {
  const response = await api.get("/address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create address
export const createAddress = async (addressData, token) => {
  const response = await api.post("/address", addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update address
export const updateAddress = async (id, addressData, token) => {
  const response = await api.put(`/address/${id}`, addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete address
export const deleteAddress = async (id, token) => {
  const response = await api.delete(`/address/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};