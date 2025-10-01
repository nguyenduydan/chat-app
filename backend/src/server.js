import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

//config
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

//make ready for deployment
if (process.env.APP_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/", "dist", "index.html"));
    });
}

// middlewares

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// console.log(process.env.APP_ENV);
// Start app
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
