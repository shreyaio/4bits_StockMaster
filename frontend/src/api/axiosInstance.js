import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "/api";

const axiosInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Attach token if present
axiosInstance.interceptors.request.use((config) => {
	try {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	} catch (e) {
		// ignore
	}
	return config;
});

export default axiosInstance;
