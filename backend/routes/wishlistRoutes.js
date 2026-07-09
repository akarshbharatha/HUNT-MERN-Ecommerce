import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add to wishlist
router.post("/", protect, addToWishlist);

// Get logged-in user's wishlist
router.get("/", protect, getWishlist);

// Remove from wishlist
router.delete("/:id", protect, removeFromWishlist);

export default router;