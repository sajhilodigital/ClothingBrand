import * as yup from "yup";

// -------------------- Address Validation --------------------
const addressSchema = yup.object().shape({
  fullName: yup.string().trim().required("Full name is required"),
  phone: yup
    .string()
    .trim()
    .matches(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number")
    .required("Phone number is required"),
  addressLine1: yup.string().trim().required("Address Line 1 is required"),
  addressLine2: yup.string().trim().optional(),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().optional(),
  postalCode: yup
    .string()
    .trim()
    .required("Postal code is required")
    .matches(/^[0-9]{3,10}$/, "Invalid postal code"),
  country: yup.string().trim().default("Nepal"),
  isDefault: yup.boolean().default(false),
});

// -------------------- User Register Validation --------------------
export const userRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  phone: yup
    .string()
    .trim()
    .matches(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number")
    .required("Phone number is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  addresses: yup
    .array()
    .of(addressSchema)
    .min(1, "At least one address is required"),
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
