import { api } from "lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

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
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await api.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await api.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true, // flag to identify optimistic messages (optional)
        };
        // immidetaly update the ui by adding the message
        set({ messages: [...messages, optimisticMessage] });

        try {
            const res = await api.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: messages.concat(res.data) });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },

    subscribeToMessages: () => {
        // Lấy thông tin từ state hiện tại (người đang chat và trạng thái âm thanh)
        const { selectedUser, isSoundEnabled } = get();

        // Nếu chưa chọn người chat nào thì không cần lắng nghe tin nhắn
        if (!selectedUser) return;

        // Lấy socket đang kết nối (được lưu trong useAuthStore)
        const socket = useAuthStore.getState().socket;

        // Lắng nghe sự kiện "newMessage" từ server qua socket.io
        socket.on("newMessage", (newMessage) => {

            // Kiểm tra xem tin nhắn đến có phải từ người mà ta đang chat hay không
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;

            // Nếu tin nhắn đến từ người khác (không phải người đang chat) → bỏ qua
            if (!isMessageSentFromSelectedUser) return;

            // Lấy danh sách tin nhắn hiện tại trong state
            const currentMessages = get().messages;

            // Cập nhật lại state: thêm tin nhắn mới vào cuối mảng
            set({ messages: [...currentMessages, newMessage] });

            // Nếu người dùng bật âm thanh, phát âm báo có tin nhắn mới
            if (isSoundEnabled) {
                const notificationSound = new Audio("/sounds/notification.mp3");

                // Reset lại thời gian phát về đầu → giúp phát liên tục nếu nhiều tin nhắn đến
                notificationSound.currentTime = 0;

                // Phát âm thanh; nếu trình duyệt chặn tự động phát, log lỗi
                notificationSound.play().catch((e) => console.log("Audio play failed:", e));
            }
        });
    },

    unsubscribeFromMessages: () => {
        // Lấy socket hiện tại từ store xác thực (useAuthStore)
        const socket = useAuthStore.getState().socket;

        // Hủy đăng ký (gỡ bỏ) listener "newMessage"
        // → Dùng khi người dùng rời khỏi đoạn chat hoặc đổi sang người khác
        socket.off("newMessage");
    },
}));
