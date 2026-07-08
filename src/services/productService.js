import api from "../api/axios";

export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data.map((product) => ({
    ...product,
    id: product._id,
  }));
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return {
    ...response.data,
    id: response.data._id,
  };
};