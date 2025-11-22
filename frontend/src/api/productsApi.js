import axiosInstance from "./axiosInstance";

export const productsApi = {
  getProducts: async (search) => {
    const res = await axiosInstance.get("/products", { params: { search } });
    return res.data;
  },

  getProductById: async (id) => {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  },

  createProduct: async (body) => {
    const res = await axiosInstance.post("/products", body);
    return res.data;
  },

  updateProduct: async (id, body) => {
    const res = await axiosInstance.put(`/products/${id}`, body);
    return res.data;
  },
};
