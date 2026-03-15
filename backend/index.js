
import dotenv from "dotenv";
dotenv.config();
console.log("RAZORPAY KEY:", process.env.VITE_RAZORPAY_TEST_API_KEY);
console.log("RAZORPAY secrest:", process.env.VITE_RAZORPAY_TEST_KEY_SECRET);
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";

import cors from "cors";
import userRouter from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import Razorpay from "razorpay"
let app = express();



export const razorpayInstance = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_TEST_API_KEY,
  key_secret: process.env.VITE_RAZORPAY_TEST_KEY_SECRET
})

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: ["https://onecart-frontendq.onrender.com", "https://onecart-admin12.onrender.com"],
    credentials: true,
  }),
);
// app.use("/uploads",express.static("uploads"))

app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)

connectDB();
let PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("hello from  server ");
});

app.listen(PORT, (req, res) => {
  console.log(`server is running ${PORT}`);
});
