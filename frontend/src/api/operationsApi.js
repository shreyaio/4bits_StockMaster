import axiosInstance from "./axiosInstance";

export const operationsApi = {
  // Existing
  getMoveHistory: async (search) => {
    const res = await axiosInstance.get("/operations/move-history", {
      params: { search },
    });
    return res.data;
  },

  // -------------------------
  // Delivery Operations
  // -------------------------
  getDeliveries: async (search) => {
    const res = await axiosInstance.get("/operations/deliveries", {
      params: { search },
    });
    return res.data;
  },

  getDeliveryById: async (id) => {
    const res = await axiosInstance.get(`/operations/delivery/${id}`);
    return res.data;
  },

  // -------------------------
  // Internal Transfers
  // -------------------------
  getTransfers: async (search) => {
    const res = await axiosInstance.get("/operations/transfers", {
      params: { search },
    });
    return res.data;
  },

  getTransferById: async (id) => {
    const res = await axiosInstance.get(`/operations/transfer/${id}`);
    return res.data;
  },

  // -------------------------
  // Stock Adjustments
  // -------------------------
  getAdjustments: async (search) => {
    const res = await axiosInstance.get("/operations/adjustments", {
      params: { search },
    });
    return res.data;
  },

  getAdjustmentById: async (id) => {
    const res = await axiosInstance.get(`/operations/adjustment/${id}`);
    return res.data;
  },

  // -------------------------
  // Common Actions
  // -------------------------
  validateOperation: async (id) => {
    const res = await axiosInstance.post(`/operations/${id}/validate`);
    return res.data;
  },

  cancelOperation: async (id) => {
    const res = await axiosInstance.post(`/operations/${id}/cancel`);
    return res.data;
  },
};
