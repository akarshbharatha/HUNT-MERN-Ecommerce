import "dotenv/config";

import express from "express";
import cors from "cors";
import dns from "node:dns";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

// Force Node.js to use public DNS servers
dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

const app = express();
const PORT = process.env.PORT || 5000;

console.log("========== ENV ==========");
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("MAIL_FROM:", process.env.MAIL_FROM);
console.log("=========================");

// Wait for MongoDB before starting server
await connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("HUNT Backend API is running 🚀");
});

// Health Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});