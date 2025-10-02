import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        // Gọi hàm bảo vệ (middleware bảo mật) từ aj để kiểm tra request
        const decision = await aj.protect(req);

        // Kiểm tra xem request có bị từ chối không
        if (decision.isDenied()) {
            // Nếu bị từ chối do vượt quá giới hạn (rate limit)
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
            }
            // Nếu bị từ chối vì là bot (không phải người dùng thật)
            else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bot access denied." });
            }
            // Nếu bị từ chối vì lý do bảo mật khác
            else {
                return res.status(403).json({ message: "Access denied by security policy." });
            }
        }

        // Kiểm tra các kết quả trả về từ hệ thống bảo vệ xem có bot giả mạo (spoofed bot) không
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed bot detected",
                message: "Malicious bot activity detected"
            });
        }

        // Nếu qua được tất cả kiểm tra bảo mật -> cho phép request tiếp tục
        next();
    } catch (error) {
        console.log("Arcjet {Protection Error: ", error);
        next();
    }
};
