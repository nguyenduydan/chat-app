import { api } from "lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],


    checkAuth: async () => {
        try {
            const res = await api.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
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

            get().connectSocket();
        } catch (error) {
            console.log("Error in register: ", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await api.post("/auth/login", data);
            set({ authUser: res.data });

            toast.success("Đăng nhập thành công!");
            get().connectSocket();
        } catch (error) {
            console.log("Error in register: ", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await api.post("/auth/logout");
            set({ authUser: null });

            toast.success("Đăng xuất thành công!");
            get().disconnectSocket();
        } catch (error) {
            console.log("Error in logout: ", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },

    updateProfile: async (data) => {
        try {
            const res = await api.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Cập nhật ảnh đại diện thành công!");
        } catch (error) {
            console.log("Error in update profile: ", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            withCredentials: true, // this ensures cookies are sent with the connection
        });

        socket.connect();

        set({ socket });

        // listen for online users event
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));
