import mongoose from "mongoose";
const { Schema } = mongoose;

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    logo: { type: String }, // optional: store URL of logo
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Brand = mongoose.model("Brand", brandSchema);
