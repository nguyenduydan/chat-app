import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });
        //never tell the client which one is incorrect: password or email

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" });

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.error("Error in login controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

// Register/Sigup
export const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        // check email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Tạo người dùng mới
        const newUser = new User({
            fullName,
            email,
            password: hashedPass
        });

        if (newUser) {
            const savedUser = await newUser.save(); // Lưu vào trong DB
            generateToken(savedUser._id, res); // tạo mã token

            // Trả về data cho client
            res.status(201).json({
                _id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                profilePic: savedUser.profilePic
            });

            // Send mail to user when they registered successfully
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.error("Faild to send welcome email: ", error);
            }
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in register ");
        res.status(500).json({ message: "Internal server error" });
    }
};

// Logout
export const logout = async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
};

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        // Lấy profilePic (ảnh đại diện) từ phần body của request
        const { profilePic } = req.body;

        // Kiểm tra xem người dùng có gửi ảnh không
        if (!profilePic)
            return res.status(400).json({ message: "Profile pic is required" });

        // Lấy ID người dùng hiện tại từ thông tin xác thực (đã lưu trong req.user)
        const userId = req.user._id;

        // Upload ảnh lên Cloudinary (trả về thông tin ảnh bao gồm secure_url)
        const uploadRespone = await cloudinary.uploader.upload(profilePic);

        if (!uploadRespone || !uploadRespone.secure_url) {
            return res.status(500).json({ message: "Failed to upload image" });
        }

        // Cập nhật thông tin người dùng trong database:
        // Gán link ảnh từ Cloudinary vào trường profilePic
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadRespone.secure_url },
            { new: true } // Tùy chọn này giúp trả về bản ghi sau khi cập nhật
        );

        // Trả về phản hồi thành công kèm thông tin người dùng đã cập nhật
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



