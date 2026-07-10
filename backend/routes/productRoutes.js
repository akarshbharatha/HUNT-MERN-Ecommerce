import express from "express";

import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* PUBLIC ROUTES */

router.get("/", getProducts);
router.get("/:id", getProductById);

/* ADMIN ROUTES */

// router.post("/", protect, adminOnly, createProduct);
import upload from "../middleware/uploadMiddleware.js";
router.put("/:id", protect, adminOnly, updateProduct);
router.post(
    "/",
    protect,
    adminOnly,
    upload.array("images",5),
    createProduct
);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;