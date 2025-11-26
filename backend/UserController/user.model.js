// backend/models/user.model.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\+?[0-9\s\-()]{7,20}$/.test(v);
        },
        message: "Enter a valid phone number",
      },
    },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, default: "Nepal" },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const deviceSchema = new mongoose.Schema(
  {
    deviceId: String,
    deviceType: String, // "android", "ios", "browser"
    ipAddress: String,
    lastActive: Date,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    // -------------------- Basic Info --------------------
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email"],
    },

    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\+?[0-9\s\-()]{7,20}$/.test(v);
        },
        message: "Enter a valid phone number",
      },
    },

    password: { type: String, required: true, minlength: 8 },

    profilePic: { type: String, default: "" },

    // -------------------- Roles & Permissions --------------------
    role: {
      type: String,
      enum: ["admin", "seller", "buyer", "delivery", "support"],
      default: "buyer",
    },

    permissions: {
      type: [String], // e.g. ["PRODUCT_CREATE", "ORDER_VIEW"]
      default: [],
    },

    // -------------------- Addresses --------------------
    addresses: [addressSchema],

    // -------------------- E-commerce Relations --------------------
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        variant: { type: String }, // size, color etc
      },
    ],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],

    // -------------------- Account Status --------------------
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }, // soft delete

    // -------------------- Authentication / Security --------------------
    lastLogin: { type: Date },
    loginCount: { type: Number, default: 0 },

    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // OTP–based verification
    otpCode: String,
    otpExpire: Date,

    // -------------------- Analytics / Sessions --------------------
    devices: [deviceSchema],
    lastIPAddress: String,

    // -------------------- Loyalty / Rewards --------------------
    rewardPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Index important fields
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

const UserTable = mongoose.models.User || mongoose.model("User", userSchema);

export default UserTable;
