import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  testEmail,
  verifyEmail,
  resendOTP,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
// import { testEmail } from "../controllers/authController.js";
const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/test-email", testEmail);
router.post("/verify-email", verifyEmail);
// Protected Route
router.get("/profile", protect, getProfile);
router.post("/resend-otp", resendOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;