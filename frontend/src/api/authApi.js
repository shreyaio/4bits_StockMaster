import axiosInstance from "./axiosInstance";

export const authApi = {
	login: async (credentials) => {
		const res = await axiosInstance.post("/auth/login", credentials);
		return res.data;
	},

	signup: async (body) => {
		const res = await axiosInstance.post("/auth/signup", body);
		return res.data;
	},

	sendOtp: async (payload) => {
		const res = await axiosInstance.post("/auth/send-otp", payload);
		return res.data;
	},

	verifyOtp: async (payload) => {
		const res = await axiosInstance.post("/auth/verify-otp", payload);
		return res.data;
	},

	logout: async () => {
		const res = await axiosInstance.post("/auth/logout");
		return res.data;
	},
};
