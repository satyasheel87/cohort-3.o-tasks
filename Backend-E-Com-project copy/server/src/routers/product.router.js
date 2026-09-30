import express from "express";
import { productValidator } from "../validators/product.validator.js";
import {
  createProductController,
  deleteProductByIdController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controller/product.controller.js";
// ==authentication==
import { authentication } from "../middleware/auth.middleware.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 1 * 1024 * 1024,
  },
});

const router = express.Router();

// === POST Create Product API ===
router.post(
  "/products",
  authentication,
  upload.array("images"),
  productValidator,
  createProductController,
);

// === GET All Product API ===
router.get("/products", authentication, getAllProductsController);

// === GET All Product By ID API ===
router.get("/product/:id", authentication, getProductByIdController);

// === PUT Update Product By ID API ===
router.put(
  "/product/:id",
  authentication,
  productValidator,
  updateProductController,
);

// === DELETE Update Product By ID API ===
router.delete("/product/:id", authentication, deleteProductByIdController);

export default router;
