import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

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

        if (!text && !image) {
            return res.status(400).json({ message: "Message must contain text or image." });
        }
        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send messages to yourself." });
        }
        const receiverExist = await User.exists({ _id: receiverId });
        if (!receiverExist) {
            return res.status(400).json({ message: "Receiver not found." });
        }

        let imageUrl;
        if (image) {
            // Upload ảnh base64 lên Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);

            if (!uploadResponse || !uploadResponse.secure_url) {
                return res.status(500).json({ message: "Failed to upload image" });
            }

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
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

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
        }).sort({ createdAt: -1 });

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

        const filteredChatPartners = chatPartnersIds.map(
            id => chatPartners.find(user => user._id.toString() === id)
        );
        res.status(200).json(filteredChatPartners);
    } catch (error) {
        console.error("Error in getChatPartners:", error);
        res.status(500).json({ message: "Server error" });
    }
};
