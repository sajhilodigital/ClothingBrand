// routes/productRoutes.js
import { Router } from "express";
import { upload } from "../middleware/upload.js";
import validateReqBody from "../middleware/validate.req.body.middleware.js";
import { createProduct, deleteProduct, getAllProductByPagination, getProductBySlug} from "./product.controller.js";
import { paginationSchema, productSchema } from "./product.validation.js";

const router = Router();

router.get("/list",  validateReqBody(paginationSchema),getAllProductByPagination);
router.get("/:slug", getProductBySlug);

// router.get("/collection/list", getProductsByCollection);


router.post(
  "/create-product",

  
  validateReqBody(productSchema),
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createProduct
);

// router.put("/update-product/:id", isAdmin, upload.array("images", 10), updateProduct);
router.delete("/delete-product/:id", deleteProduct);



export { router as productRoutes };
