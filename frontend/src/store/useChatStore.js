import { api } from "lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: false,
    isUsersLoading: false,
    isMessagesLoading: false,

    // Cờ bật/tắt âm thanh thông báo tin nhắn.
    // Lấy giá trị từ localStorage.
    // ⚠️ Lưu ý: localStorage.getItem() trả về chuỗi, nên so sánh === true sẽ **luôn là false**
    // => Nên viết lại thành: localStorage.getItem("isSoundEnabled") === "true"
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

    toggleSound: () => {
        // Đảo ngược giá trị hiện tại của isSoundEnabled (true -> false, false -> true)
        // get() dùng để lấy trạng thái hiện tại của store
        // Lưu giá trị mới vào localStorage để giữ trạng thái khi reload trang
        // Vì localStorage chỉ lưu chuỗi, nên tự động ép kiểu sang "true"/"false"
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);   // Lưu cài đặt để người dùng reload trang vẫn giữ nguyên tùy chọn âm thanh.

        // Cập nhật lại state trong store với giá trị mới
        set({ isSoundEnabled: !get().isSoundEnabled });
    },

    setActiveTab: (tab) => {
        set({ activeTab: tab });
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser });
    },

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await api.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMyAllChatsParners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await api.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

}));
