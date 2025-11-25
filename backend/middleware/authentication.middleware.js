// backend/middlewares/authorize.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserTable from "../UserController/user.model.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";


// 🔒 Extract token from HTTP-only cookie
const extractTokenFromCookie = (req) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    console.warn("No accessToken cookie found. Cookies:", req.cookies);
  }
  return token;
};

// ✅ Generic middleware generator
const authorizeRole = (role) => {
  return async (req, res, next) => {
    try {
      const token = extractTokenFromCookie(req);
      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized.1" , token});
      }

      // Verify JWT
      const payload = jwt.verify(token, JWT_SECRET);

      if (!payload.email) {
        return res
          .status(401)
          .json({ message: "Unauthorized.2" });
      }

      // Find user in DB
      const user = await UserTable.findOne({ email: payload.email }).lean();
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized. 3" });
      }

      // Role check if required
      if (role && user.role !== role) {
        return res
          .status(403)
          .json({ message: `Access denied for role: ${user.role}` });
      }

      // Attach user info to request
      req.loggedInUserId = user._id.toString();
      req.loggedInUserRole = user.role;

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(401).json({ message: "Unauthorized. error" });
    }
  };
};

// ✅ Specific role middlewares
export const isAdmin = authorizeRole("admin");
export const isBuyer = authorizeRole("buyer");
export const isSeller = authorizeRole("seller");
export const isAuthenticated = authorizeRole(); // Any logged-in user
