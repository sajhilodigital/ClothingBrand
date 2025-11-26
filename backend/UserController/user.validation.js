import * as yup from "yup";

/* ------------------------------------------------------------------
⚡ ADDRESS VALIDATION (Matches Mongoose Schema)
------------------------------------------------------------------ */
const addressSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
  phone: {
    type: String,
    match: [/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number"],
  },
  addressLine1: yup.string().trim().required("Address line 1 is required"),
  addressLine2: yup.string().trim().optional(),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().optional(),
  postalCode: yup.string().trim().required("Postal code is required"),
  country: yup.string().trim().default("Nepal"),
  isDefault: yup.boolean().default(false),
});

/* ------------------------------------------------------------------
⚡ REGISTRATION SCHEMA (Buyer Only)
------------------------------------------------------------------ */
export const userRegisterSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),

  email: yup
    .string()
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),

  phone: {
    type: String,
    match: [/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number"],
  },

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .matches(/[0-9]/, "Password must contain at least 1 number")
    .matches(/[@$!%*?&#]/, "Password must contain at least 1 special character")
    .required("Password is required"),

  // Force buyer role during registration
  role: yup.string().oneOf(["buyer"]).default("buyer"),

  profilePic: yup.string().url("Invalid profile picture URL").optional(),

  // Array of addresses allowed (optional)
  addresses: yup
    .array()
    .of(addressSchema)
    .min(1, "At least one address required"),
});

/* ------------------------------------------------------------------
⚡ LOGIN SCHEMA
------------------------------------------------------------------ */
export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
