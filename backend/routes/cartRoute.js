import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { addToCartController, getUserCartController, updateCartcontroller } from "../controllers/cartController.js"
const cartRoutes = express.Router()



cartRoutes.post("/get",isAuth,getUserCartController)
cartRoutes.post("/add",isAuth,addToCartController)
cartRoutes.post("/update",isAuth,updateCartcontroller)


export default cartRoutes


