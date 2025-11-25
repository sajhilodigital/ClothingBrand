// backend/config/DBconnection.ts
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;

    if (!url) {
      throw new Error(" MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(url);
    console.log(" Database connection successful...");
  } catch (error) {
    if (error instanceof Error) {
      console.error(" Database connection failed:", error.message);
    } else {
      console.error(" Database connection failed:", error);
    }
    process.exit(1); 
  }
};

export default connectDB;
