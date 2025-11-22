import axiosInstance from "./axiosInstance";

export const stockApi = {
  getStockOverview: async () => {
    const res = await axiosInstance.get("/stock/overview");
    return res.data;
  },

  adjustStock: async (id, qty) => {
    const res = await axiosInstance.post("/stock/adjust", { id, qty });
    return res.data;
  }
};
