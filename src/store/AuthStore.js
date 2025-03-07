import { create } from "zustand";

export const useAuthStore = create((set) => ({
    token: localStorage.getItem("token") || null,
    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },
    role_id: localStorage.getItem("role_id") || null,
    setRoleId: (role_id) => {
        localStorage.setItem("role_id", role_id);
        set({ role_id });
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ token: null });
    }
}));
