import { api } from "lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,


    checkAuth: async () => {
        try {
            const res = await api.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in authCheck: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await api.post("/auth/register", data);
            set({ authUser: res.data });

            toast.success("Tạo tài khoản thành công!");
        } catch (error) {
            console.log("Error in register: ", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    }
}));
