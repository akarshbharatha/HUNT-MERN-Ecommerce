import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import dns from 'dns';
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
// Use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Load environment variables
dotenv.config();

// Debug: Check if MONGO_URI is loaded
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

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
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('HUNT Backend API is running 🚀');
});

// Health route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'HUNT Streetwear Core API is live and healthy.',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`=== HUNT BACKEND SYSTEM MONITOR ===`);
  console.log(`Server executing in [${process.env.NODE_ENV}] state`);
  console.log(`Listening safely on address portal: http://localhost:${PORT}`);
  console.log(`===================================`);
});