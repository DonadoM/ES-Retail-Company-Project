import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined");
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      console.log("Connected to MongoDB");
      return Promise.resolve(true);
    }
  } catch (error: unknown) {
    // Type assertion for better error handling
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error connecting to MongoDB:", errorMessage);
    return Promise.reject(errorMessage);
  }
};
