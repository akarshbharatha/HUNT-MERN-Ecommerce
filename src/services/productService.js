import api from "../api/axios";

// Get all products
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data.products;
};

// Get single product
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.product;
};