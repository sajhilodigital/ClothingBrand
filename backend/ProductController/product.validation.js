// validators/productValidator.js
import Yup from "yup";


// Variant Schema
const variantSchema = Yup.object({
  variantId: Yup.string().required("Variant ID is required"),
  sku: Yup.string().nullable(),
  barcode: Yup.string().nullable(),
  title: Yup.string().nullable(),
  options: Yup.array().of(
    Yup.object({
      name: Yup.string().required(),
      value: Yup.string().required(),
    })
  ),
  price: Yup.number().required("Price is required"),
  compareAtPrice: Yup.number().nullable(),
  stock: Yup.number().default(0),
  reservedStock: Yup.number().default(0),
  safetyStock: Yup.number().default(0),
  weight: Yup.number().default(0),
  height: Yup.number().nullable(),
  width: Yup.number().nullable(),
  depth: Yup.number().nullable(),
  images: Yup.array().of(Yup.string()),
  thumbnail: Yup.string().nullable(),
  isActive: Yup.boolean().default(true),
});

// Specifications
const attributeSchema = Yup.object({
  key: Yup.string().required(),
  value: Yup.string().required(),
});

// Ratings Schema
const ratingSchema = Yup.object({
  average: Yup.number().default(0),
  totalReviews: Yup.number().default(0),
  ratingBreakdown: Yup.object({
    1: Yup.number().default(0),
    2: Yup.number().default(0),
    3: Yup.number().default(0),
    4: Yup.number().default(0),
    5: Yup.number().default(0),
  }),
});

// Gallery Schema
const gallerySchema = Yup.object({
  type: Yup.string().oneOf(["image", "video"]).default("image"),
  url: Yup.string().url().required("Gallery URL is required"),
});

// Discount Schema
const discountSchema = Yup.object({
  type: Yup.string().oneOf(["FLAT", "PERCENT", null]).nullable(),
  value: Yup.number().nullable(),
  startDate: Yup.date().nullable(),
  endDate: Yup.date().nullable(),
});

// Main Product Schema
export const productSchema = Yup.object({
  name: Yup.string().required("Product name is required").trim(),
  slug: Yup.string().required("Slug is required"),
  handle: Yup.string().nullable(),
  sku: Yup.string().nullable(),
  barcode: Yup.string().nullable(),
  type: Yup.string().nullable(),
  vendor: Yup.string().nullable(),
  brand: Yup.string().nullable(),
  description: Yup.string().nullable(),
  shortDescription: Yup.string().nullable(),
  careInstructions: Yup.array().of(Yup.string()),
  specifications: Yup.array().of(attributeSchema),

  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().nullable(),
  collection: Yup.string().nullable(),

  tags: Yup.array().of(Yup.string()),
  images: Yup.array().of(Yup.string()),
  thumbnail: Yup.string().nullable(),

  gallery: Yup.array().of(gallerySchema),
  videoUrl: Yup.string().nullable(),

  price: Yup.number().required("Price is required"),
  compareAtPrice: Yup.number(),

  discount: discountSchema,

  taxRate: Yup.number().nullable(),
  isTaxIncluded: Yup.boolean().default(false),

  totalStock: Yup.number().default(0),
  reservedStock: Yup.number().default(0),
  safetyStock: Yup.number().default(2),

  variants: Yup.array().of(variantSchema),

  options: Yup.array().of(
    Yup.object({
      name: Yup.string().required(),
      values: Yup.array().of(Yup.string().required()),
    })
  ),

  shippingClass: Yup.string()
    .oneOf(["STANDARD", "EXPRESS", "HEAVY", "FREE", "NONE"])
    .default("STANDARD"),

  weight: Yup.number().nullable(),
  height: Yup.number().nullable(),
  width: Yup.number().nullable(),
  depth: Yup.number().nullable(),
  isShippable: Yup.boolean().default(true),

  ratings: ratingSchema,

  isActive: Yup.boolean().default(true),
  isFeatured: Yup.boolean().default(false),
  isNewArrival: Yup.boolean().default(false),
  isBestSeller: Yup.boolean().default(false),
  isLimitedStock: Yup.boolean().default(false),
  isHidden: Yup.boolean().default(false),

  metaTitle: Yup.string().nullable(),
  metaDescription: Yup.string().nullable(),
  metaKeywords: Yup.array().of(Yup.string()),
  searchKeywords: Yup.array().of(Yup.string()),

  totalSales: Yup.number().default(0),
  totalViews: Yup.number().default(0),
  wishlistedCount: Yup.number().default(0),
  conversionRate: Yup.number().default(0),
});


export const updateProductSchema = createProductSchema
  .clone()
  .shape({
    removeImageIds: yup.array().of(yup.string()).nullable(),
    imageOrder: yup.array().of(yup.string()).nullable(),
  })
  .noUnknown(true)
  .test("at-least-one-field", "No data to update", (value) => {
    return Object.keys(value).length > 0;
  });

