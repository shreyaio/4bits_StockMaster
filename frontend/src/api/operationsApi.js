import axiosInstance from "./axiosInstance";

export const operationsApi = {
  getMoveHistory: async (search) => {
    const res = await axiosInstance.get("/operations/move-history", {
      params: { search },
    });
    return res.data;
  },
};
