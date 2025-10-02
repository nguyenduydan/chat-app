import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";

const router = express.Router();

// 1. router.use(...)
//    → Dùng để "gắn" middleware vào tất cả các route bên dưới.
//    → Mọi request đi qua router này đều phải đi qua 2 middleware:
//       - arcjetProtection
//       - protectRoute

// 2. arcjetProtection
//    → Là middleware từ thư viện Arcjet, giúp:
//       - Ngăn chặn bot, DDoS, spam request.
//       - Giới hạn tốc độ (rate limit) truy cập.
//       - Phát hiện truy cập độc hại.

// 3. protectRoute
//    → Là middleware xác thực JWT token (thường trong file `auth.middleware.js`).
//    → Tác dụng:
//       - Lấy token từ cookie (`req.cookies.jwt`)
//       - Giải mã (decode) token bằng `jwt.verify(...)`
//       - Lấy user từ DB dựa trên `decoded.userId`
//       - Gắn thông tin user vào `req.user`
//       - Nếu không có token hoặc token không hợp lệ → trả lỗi 401 Unauthorized.

// 4. Hoạt động tổng thể:
//    Khi client gọi bất kỳ API nào của message routes (vd: `/api/messages/chats`):
//       🔹 Request sẽ đi qua `arcjetProtection` → kiểm tra bot, rate limit
//       🔹 Nếu hợp lệ → đi qua `protectRoute` → kiểm tra JWT
//       🔹 Nếu user hợp lệ → cho phép vào controller (vd: getMessagesByUserId)

// 5. Ưu điểm của việc đặt ở đầu router:
//    - Không cần viết lại middleware này cho từng route.
//    - Đảm bảo toàn bộ API messages đều an toàn (chỉ user thật mới truy cập được).
router.use(protectRoute);

router.get('/contacts', getAllContacts);// Get all contacts that the logged-in user has interacted with
router.get('/chats', getChatPartners);// Get all users that the logged-in user has active chat conversations with
router.get('/:id', getMessagesByUserId);// Get all messages between the logged-in user and a specific user (identified by :id)
router.post('/send/:id', sendMessage);

export default router;
