import mongoose from 'mongoose';

/**
 * ESTABLISHES A SECURE ASYNCHRONOUS CONNECTION GATEWAY TO MONGODB
 */
const connectDB = async () => {
  try {
    // Attempt the connection handshake using our private environmental variable URI
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`\n🔋 === HUNT DATA VAULT SECURED ===`);
    console.log(`MongoDB Connected successfully!`);
    console.log(`Database Host Hub: ${conn.connection.host}`);
    console.log(`==================================\n`);
  } catch (error) {
    // If the connection drops or fails, capture the error log and shut down gracefully
    console.error(`\n🚨 DATABASE CONNECTION ERROR: ${error.message}`);
    console.log('Shutting down server instance due to critical database lock...');
    process.exit(1); // Force terminates the Node application runtime process completely
  }
};

export default connectDB;