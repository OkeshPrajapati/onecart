import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { allOrders, getUserOrder, placeOrder, updateStatus } from "../controllers/orderController.js"
import adminAuth from "../middlewares/adminAuth.js"

const orderRoutes = express.Router()

orderRoutes.post("/placeorder",isAuth,placeOrder)
orderRoutes.get("/userorder",isAuth,getUserOrder)


//admin
orderRoutes.get("/list",adminAuth,allOrders)
orderRoutes.post("/status",adminAuth,updateStatus)



export default orderRoutes