import { authStore } from "../store/authStore";

export default function useAuth() {
	return authStore();
}

// convenience selectors
export const useAuthState = () => authStore((s) => ({ user: s.user, token: s.token }));
