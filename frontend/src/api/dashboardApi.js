// src/api/dashboardApi.js
import axiosInstance from "./axiosInstance";

export const dashboardApi = {
  getKpis: async (filters = {}) => {
    const res = await axiosInstance.get("/dashboard/kpis", {
      params: filters,
    });
    return res.data; // { totalProductsInStock, lowStockCount, pendingReceipts, pendingDeliveries, internalTransfersScheduled }
  },

  getOperationsSummary: async (filters = {}) => {
    const res = await axiosInstance.get("/dashboard/operations-summary", {
      params: filters,
    });
    return res.data;
    /*
      Expected shape:
      {
        receipts: { total, toProcess, waiting, ready, late },
        deliveries: { total, toProcess, waiting, ready, late },
        transfers: { total, scheduled }
      }
    */
  },
};
