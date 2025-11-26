import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email"],
      unique: true,
      trim: true,
    },

    name: { type: String, required: true, trim: true },

    phone: {
      type: String,
      validate: {
        validator: (v) => !v || /^\+?[0-9\s\-()]{7,20}$/.test(v),
        message: "Enter a valid phone number",
      },
      default: "",
    },

    password: { type: String, required: true },

    otp: { type: String, required: true },

    otpExpiry: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("TempUser", tempUserSchema);
