import { create } from "zustand";
import { authApi } from "../api/authApi";

export const authStore = create((set) => ({
	user: null,
	token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
	setUser: (user) => set({ user }),

	login: async (credentials) => {
		const data = await authApi.login(credentials);
		if (data?.token) {
			localStorage.setItem("token", data.token);
			set({ user: data.user || null, token: data.token });
		}
		return data;
	},

	logout: () => {
		try {
			localStorage.removeItem("token");
		} catch (e) {}
		set({ user: null, token: null });
	},
}));
