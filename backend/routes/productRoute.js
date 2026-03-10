import express from "express"
import upload from "../middlewares/multer.js"
import { addProductController, getAllProductController, removeProductController } from "../controllers/productController.js"
import adminAuth from "../middlewares/adminAuth.js"
let productRoutes = express.Router()


productRoutes.post("/addproduct",upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1},
    {name:"image4",maxCount:1},
]),addProductController)


productRoutes.get("/list",getAllProductController)
productRoutes.post("/remove/:id",adminAuth,removeProductController)

export default productRoutes