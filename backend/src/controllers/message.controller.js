import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
    try {
        // Lấy ID của người dùng hiện tại (được gắn vào req.user sau khi xác thực JWT)
        const loggedInUserId = req.user._id;

        // Tìm tất cả user trong DB mà _id KHÔNG TRÙNG với user hiện tại
        // $ne = "not equal" => loại bỏ chính người đang đăng nhập khỏi danh sách
        // .select("-password") => loại bỏ trường password khi trả dữ liệu về client
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getAllContacts: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const message = await Message.find({
            $or: [ //$or = “hoặc điều kiện này, hoặc điều kiện kia”.
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        res.status(200).json(message);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            // Upload ảnh base64 lên Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);

            // Lưu lại link ảnh từ Cloudinary
            imageUrl = uploadResponse.secure_url;
        }

        // Tạo message mới
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // TODO: send message in real-time if user is online - socket.is

        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in getAllContacts: ", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const getChatPartners = async (req, res) => {
    try {
        // Lấy ID của user đang đăng nhập (được gắn từ middleware JWT)
        const loggedInUserId = req.user._id;

        // Tìm tất cả tin nhắn mà user này là người gửi hoặc người nhận
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        // Tạo danh sách các userId đã trò chuyện cùng (tránh trùng lặp)
        const chatPartnersIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedInUserId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            )
        ];

        // Lấy thông tin user tương ứng (trừ mật khẩu)
        const chatPartners = await User.find({ _id: { $in: chatPartnersIds } }).select("-password");

        res.status(200).json(chatPartners);
    } catch (error) {
        console.error("Error in getChatPartners:", error);
        res.status(500).json({ message: "Server error" });
    }
};
