import  Yup from "yup";

/* ------------------ Variants Validation ------------------ */
export const variantSchema = Yup.object({
  variantId: Yup.string().required("Variant ID is required"),
  title: Yup.string().required("Variant title is required"),
  sku: Yup.string().nullable(),
  barcode: Yup.string().nullable(),
  price: Yup
    .number()
    .typeError("Variant price must be a number")
    .required("Variant price is required"),
  compareAtPrice: Yup
    .number()
    .typeError("Variant compare price must be a number")
    .nullable(),
  stock: Yup
    .number()
    .typeError("Variant stock must be a number")
    .min(0, "Stock cannot be negative")
    .default(0),
  reservedStock: Yup
    .number()
    .typeError("Reserved stock must be a number")
    .min(0, "Reserved stock cannot be negative")
    .default(0),
  weight: Yup
    .number()
    .typeError("Variant weight must be a number")
    .min(0, "Weight cannot be negative")
    .default(0),
  images: Yup.array().of(Yup.string()).default([]),
  thumbnail: Yup.string().nullable(),
});

/* ------------------ Product Validation ------------------ */
export const productSchema = Yup.object({
  /* ------------- BASIC DETAILS ------------- */
  name: Yup.string().required("Product name is required").trim(),

  category: Yup.string().required("Category is required"),

  subCategory: Yup.string().nullable(),

  price: Yup
    .number()
    .typeError("Price must be a number")
    .required("Product price is required"),

  compareAtPrice: Yup
    .number()
    .typeError("Compare at price must be a number")
    .nullable(),

  description: Yup.string().required("Product description is required"),

  shortDescription: Yup
    .string()
    .required("Short description is required")
    .max(250, "Short description cannot exceed 250 characters"),

  /* ------------- ARRAYS ------------- */
  tags: Yup.array().of(Yup.string()).default([]),

  careInstructions: Yup.array().of(Yup.string()).default([]),

  /* ------------- SPECIFICATIONS ------------- */
  specifications: Yup
    .array()
    .of(
      Yup.object({
        key: Yup.string().required("Specification key is required"),
        value: Yup.string().required("Specification value is required"),
      })
    )
    .default([]),

  /* ------------- IMAGES ------------- */
  images: Yup
    .array()
    .of(Yup.string())
    .required("At least 1 product image is required")
    .min(1, "At least 1 product image is required"),

  thumbnail: Yup.string().required("Thumbnail image is required"),

  /* ------------- VARIANTS ------------- */
  variants: Yup.array().of(variantSchema).default([]),

  /* ------------- BRAND / VENDOR / TYPE ------------- */
  brand: Yup.string().nullable(),
  vendor: Yup.string().nullable(),
  type: Yup.string().nullable(),

  /* ------------- SEO FIELDS ------------- */
  metaTitle: Yup.string().nullable(),

  metaDescription: Yup.string().nullable(),

  metaKeywords: Yup.array().of(Yup.string()).default([]),
});

export const updateProductSchema = productSchema
  .clone()
  .shape({
    removeImageIds: Yup.array().of(Yup.string()).nullable(),
    imageOrder: Yup.array().of(Yup.string()).nullable(),
  })
  .noUnknown(true)
  .test("at-least-one-field", "No data to update", (value) => {
    return Object.keys(value).length > 0;
  });
