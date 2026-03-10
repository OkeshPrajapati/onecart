import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
dotenv.config();
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";

let app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)

connectDB();
let PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("hello from  server ");
});

app.listen(PORT, (req, res) => {
  console.log(`server is running ${PORT}`);
});
