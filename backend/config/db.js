import mongoose from "mongoose";
import dns from "node:dns";

// Force Google + Cloudflare DNS
dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("\n🔋 === HUNT DATA VAULT SECURED ===");
    console.log("MongoDB Connected Successfully!");
    console.log(`Database Host: ${conn.connection.host}`);
    console.log("==================================\n");
  } catch (error) {
    console.error("\n🚨 DATABASE CONNECTION ERROR");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;