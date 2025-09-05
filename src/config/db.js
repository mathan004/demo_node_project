import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config({ path: "E:/node_project/.env" });
console.log("MONGODB_URL:", process.env.MONGODB_URL);



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

export default connectDB;




