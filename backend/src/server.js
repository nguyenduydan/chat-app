import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

//config
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// console.log(process.env.APP_ENV);
// Start app
app.listen(PORT, () =>
    console.log(`Server running with port ${PORT}`)
);
