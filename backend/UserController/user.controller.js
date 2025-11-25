// backend/user/user.controller.js
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; // <--- add this
import UserTable from "./user.model.js";
import {
  loginSchema,
  userRegisterSchema,
} from "./user.validation.js";
import validateReqBody from "../middleware/validate.req.body.middleware.js";
import { isAdmin, isAuthenticated } from "../middleware/authentication.middleware.js";

dotenv.config();

const router = express.Router();
router.use(cookieParser()); 

// Environment variables with defaults
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS ?? "12", 10);
const JWT_EXPIRY = process.env.JWT_EXPIRY ?? "7d";
const COOKIE_EXPIRY_MS = parseInt(
  process.env.COOKIE_EXPIRY_MS ?? `${7 * 24 * 60 * 60 * 1000}`,
  10
);

// -------------------- REGISTER --------------------
router.post(
  "/register",
  validateReqBody(userRegisterSchema),
  async (req, res) => {
    try {
      const { name, email, phone, password, addresses } = req.body;

      const existingUser = await UserTable.findOne({ email }).lean();
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists.",
        });
      }

      // Always force new users to buyer role
      const role = "buyer";

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await UserTable.create({
        name,
        email,
        phone,
        password: hashedPassword,
        profilePic,
        addresses,
        role,
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        userId: user._id,
      });
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

export default router;

// -------------------- LOGIN --------------------
router.post("/login", validateReqBody(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required." });
    }

    const user = await UserTable.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const payload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role ?? "user",
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    const { password: _, __v, ...userDetails } = user.toObject();

    // ✅ FIX cookie options
    res.cookie("accessToken", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none", 
      maxAge: COOKIE_EXPIRY_MS,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: { ...userDetails, _id: user._id.toString() },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message ?? "Internal server error",
    });
  }
});



// -------------------- LOGOUT --------------------
// ✅ Get all users with role traveler or guide
router.get("/user/list", isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Query only users with role traveler or guide
    const users = await UserTable.find({ role: { $in: ["traveler", "guide"] } })
      .select("-password"); 

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


// -------------------- LOGOUT --------------------
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "Lax",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message ?? "Internal server error",
    });
  }
});

// -------------------- AUTHENTICATION --------------------
router.get("/auth/me", (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});




// -------------------- CHECK AUTH --------------------
router.get("/check-auth", (req, res) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        authenticated: false,
        message: "No authentication token found.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Return decoded user info
    return res.status(200).json({
      success: true,
      authenticated: true,
      user: {
        id: decoded.id,
        name: decoded.name || decoded.username || "",
        email: decoded.email,
        phone: decoded.phone || "",
        role: decoded.role,
      },
      isAdmin: decoded.role === "admin",
    });
  } catch (err) {
    console.error("Auth Check Error:", err.message);
    return res.status(401).json({
      success: false,
      authenticated: false,
      message: "Invalid or expired token.",
    });
  }
});


export { router as userController };
