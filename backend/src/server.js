import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

//config
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json()); //req.body

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

//make ready for deployment
if (process.env.APP_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/", "dist")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/", "dist", "index.html"));
    });
}

// Start app
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
