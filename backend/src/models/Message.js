import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        // Id người gửi
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Khóa ngoài -> connect đến bảng User
            required: true
        },
        // Id người nhận
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
        // TODO: Cập nhật sau
        // status: {
        //     type: String,
        //     enum: ["sent", "delivered", "seen"],
        //     default: "sent"
        // }
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
