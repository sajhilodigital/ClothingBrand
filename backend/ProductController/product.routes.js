// routes/productRoutes.js
import { Router } from "express";
import { isAdmin } from "../middleware/authentication.middleware.js";
import { upload } from "../middleware/upload.js";
import validateReqBody from "../middleware/validate.req.body.middleware.js";
import { createProduct, deleteProduct, getProductBySlug, getProducts, getProductsByCollection, getSpecialProducts, updateProduct } from "./product.controller.js";
import { productSchema } from "./product.validation.js";

const router = Router();

router.get("/", getProducts);
router.get("/special/:type", getSpecialProducts);
router.get("/collection/:slug", getProductsByCollection);
router.get("/:slug", getProductBySlug);

router.post("/create-product", validateReqBody(productSchema) , createProduct);
router.put("/update-product/:id", isAdmin, upload.array("images", 10), updateProduct);
router.delete("/delete-product/:id", isAdmin, deleteProduct);

export { router as productRoutes };
