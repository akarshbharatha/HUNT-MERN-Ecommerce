import express from "express";

import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add to Cart
router.post("/", protect, addToCart);

// Get Cart
router.get("/", protect, getCart);
router.put("/:id", protect, updateCartQuantity);

router.delete("/:id", protect, removeCartItem);

router.delete("/", protect, clearCart);

export default router;