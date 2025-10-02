import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ENV } from "./lib/env.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";


// ✅ Tạo __dirname chuẩn cho ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = ENV.PORT || 3000;

// ✅ Middleware
app.use(express.json({ limit: "5mb" }));
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

console.warn("App running on ", ENV.APP_ENV);

// ✅ Serve frontend build khi chạy production
if (ENV.APP_ENV === "production") {
    try {
        const frontendPath = path.join(__dirname, "../../frontend/dist");

        if (!fs.existsSync(frontendPath)) {
            console.error("❌ Lỗi: Thư mục build frontend không tồn tại:", frontendPath);
        } else {
            // Serve static files
            app.use(express.static(frontendPath));

            // Route fallback cho SPA (React/Vue)
            app.get("*", (req, res) => {
                const indexPath = path.join(frontendPath, "index.html");

                if (!fs.existsSync(indexPath)) {
                    console.error("❌ Không tìm thấy index.html:", indexPath);
                    return res.status(404).send("Frontend not found");
                }

                res.sendFile(indexPath, (err) => {
                    if (err) {
                        console.error("❌ Lỗi khi gửi index.html:", err.message);
                        res.status(500).send("Internal Server Error");
                    }
                });
            });
        }
    } catch (error) {
        console.error("❌ Lỗi khi thiết lập static frontend:", error.message);
    }
}

// ✅ Kết nối DB và khởi động server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🚀 Host running: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    });
