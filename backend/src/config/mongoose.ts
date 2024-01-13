import mongoose from "mongoose";
import "dotenv/config";

export const connectToMongo = async () => {
  try {
    return await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING as string
    );
  } catch (error) {
    console.log("file: mongoose.js:11 ~ connectToMongo ~ error:", error);
    throw error;
  }
};
