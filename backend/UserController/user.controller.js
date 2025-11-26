// backend/user/user.controller.js
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import validateReqBody from "../middleware/validate.req.body.middleware.js";

import UserTable from "./user.model.js";
import TempUser from "./tempUser.model.js";
import { sendOTP } from "./sendEmail.js";

import { loginSchema, userRegisterSchema } from "./user.validation.js";

dotenv.config();

const router = express.Router();
router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS ?? "12", 10);
const JWT_EXPIRY = process.env.JWT_EXPIRY ?? "7d";
const COOKIE_EXPIRY_MS = parseInt(
  process.env.COOKIE_EXPIRY_MS ?? `${7 * 24 * 60 * 60 * 1000}`,
  10
);

// -----------------------------------------------------------------------
// 1) REQUEST OTP (Begin Registration)
// -----------------------------------------------------------------------
router.post(
  "/register/request-otp",
  // validateReqBody(userRegisterSchema),
  async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;

      const exists = await UserTable.findOne({ email });
      if (exists)
        return res.status(409).json({
          success: false,
          message: "Email already registered.",
        });

      // Remove any existing temp user
      await TempUser.deleteOne({ email });

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      await TempUser.create({
        name,
        email,
        phone,
        password: hashedPassword,
        otp,
        otpExpiry: Date.now() + 10 * 60 * 1000, // 10 min expiry
      });

      await sendOTP(email, otp);

    return  res.json({
        success: true,
        message: "OTP sent to your email.",
      });
    } catch (error) {
      console.error("OTP Request Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// -----------------------------------------------------------------------
// 2) VERIFY OTP → CREATE FINAL USER
// -----------------------------------------------------------------------
router.post("/register/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const temp = await TempUser.findOne({ email });
    if (!temp)
      return res.status(400).json({
        success: false,
        message: "OTP not requested or expired.",
      });

    if (temp.otp !== otp)
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });

    if (temp.otpExpiry < Date.now())
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });

    // Create verified user
    const user = await UserTable.create({
      name: temp.name,
      email,
      phone: temp.phone,
      password: temp.password,
      role: "buyer",
      emailVerified: true,
    });

    await TempUser.deleteOne({ email });

    res.status(201).json({
      success: true,
      message: "Email verified & user registered successfully.",
      userId: user._id,
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// -----------------------------------------------------------------------
// 3) LOGIN (Only verified users)
// -----------------------------------------------------------------------
router.post("/login", validateReqBody(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserTable.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });

    if (!user.emailVerified)
      return res.status(403).json({
        success: false,
        message: "Please verify your email first.",
      });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });

    const payload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    res.cookie("accessToken", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: COOKIE_EXPIRY_MS,
    });

    const { password: _, __v, ...userDetails } = user.toObject();

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      user: userDetails,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -----------------------------------------------------------------------
// 4) LOGOUT
// -----------------------------------------------------------------------
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({ success: true, message: "Logged out." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export { router as userController };
