import express from "express";
import { login, logout, register, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post('/register', register);
router.post('/logout', logout);

router.put('/udpate-profile', protectRoute, updateProfile);

router.get('/check', protectRoute, (req, res) => res.status(200).json(req.user));

export default router;
