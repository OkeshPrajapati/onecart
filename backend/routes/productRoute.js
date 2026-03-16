import express from "express"
import upload from "../middlewares/multer.js"
import {  addProduct, getAllProductController, removeProductController } from "../controllers/productController.js"
import adminAuth from "../middlewares/adminAuth.js"
let productRoutes = express.Router()


// router.post("/addproduct", upload.single("image"),addProduct )
router.post("/addproduct",upload.single("image"),addProduct);


productRoutes.get("/list",getAllProductController)
productRoutes.post("/remove/:id",adminAuth,removeProductController)

export default productRoutes