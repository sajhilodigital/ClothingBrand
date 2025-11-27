import { model, Schema } from "mongoose";

// 3. Category & Collection
const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    image: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const collectionSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    banner: String,
    description: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Category = model("Category", categorySchema);
export const Collection = model("Collection", collectionSchema);
