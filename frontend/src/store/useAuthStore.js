import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: { name: "FogDev", _id: 123, age: 22 },
    isLoggedIn: false,
    isLoading: false,

    login: () => {
        set({ isLoading: true });
        try {
            // Perform async login operation
            console.log("We just logged in");
            set({ isLoggedIn: true, isLoading: false });
            set({ isLoggedIn: true, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    }
}));
