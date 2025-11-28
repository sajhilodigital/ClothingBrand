import mongoose from "mongoose";
import { type } from "os";
const { Schema } = mongoose;

const variantSchema = new Schema(
  {
    variantId: { type: String, required: true },
    sku: { type: String },
    barcode: { type: String },
    title: String,
    options: [{ name: String, value: String }],
    price: { type: Number, required: true },
    compareAtPrice: Number,
    stock: { type: Number, default: 0 },
    reservedStock: { type: Number, default: 0 },
    safetyStock: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    height: Number,
    width: Number,
    depth: Number,
    images: [String],
    thumbnail: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const attributeSchema = new Schema({
  key: String,
  value: String,
});

const ratingSchema = new Schema({
  average: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  ratingBreakdown: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
});

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, required: true },
    handle: { type: String, unique: true, sparse: true },
    sku: String,
    barcode: String,
    type: String,
    vendor: String,
    brand: { type: String},
    careInstructions: [String],
    specifications: [attributeSchema],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
    collection: { type: Schema.Types.ObjectId, ref: "Collection" },
    tags: [String],
    images: [String],
    thumbnail: String,
    gallery: [
      {
        type: { type: String, enum: ["image", "video"], default: "image" },
        url: String,
      },
    ],
    videoUrl: String,
    price: { type: Number, required: true },
    compareAtPrice: Number,
    discount: {
      type: { type: String, enum: ["FLAT", "PERCENT", null], default: null },
      value: Number,
      startDate: Date,
      endDate: Date,
    },
    taxRate: Number,
    isTaxIncluded: { type: Boolean, default: false },
    totalStock: { type: Number, default: 0 },
    reservedStock: { type: Number, default: 0 },
    safetyStock: { type: Number, default: 2 },
    variants: [variantSchema],
    options: [{ name: String, values: [String] }],
    shippingClass: {
      type: String,
      enum: ["STANDARD", "EXPRESS", "HEAVY", "FREE", "NONE"],
      default: "STANDARD",
    },
    weight: Number,
    height: Number,
    width: Number,
    depth: Number,
    isShippable: { type: Boolean, default: true },
    ratings: ratingSchema,
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isLimitedStock: { type: Boolean, default: false },
    isOnSell: { type: Boolean, default: false },
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    searchKeywords: [String],
    totalSales: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    wishlistedCount: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    version: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  { timestamps: true, minimize: false }
);

productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ "ratings.average": 1 });
productSchema.index({ name: "text", description: "text", tags: "text" });

// Auto-calc total stock & reserved stock
productSchema.pre("save", function (next) {
  if (this.variants?.length) {
    this.totalStock = this.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
    this.reservedStock = this.variants.reduce(
      (sum, v) => sum + (v.reservedStock || 0),
      0
    );
  }
  next();
});

// Version increment
productSchema.pre("findOneAndUpdate", function (next) {
  this.set({ $inc: { version: 1 } });
  next();
});

export const ProductTable =  mongoose.model("Product", productSchema);
