import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { getAdmin, getCurrentUser } from "../controllers/userController.js";
import adminAuth from "../middlewares/adminAuth.js";
const userRouter = express.Router()


userRouter.get("/getCurrentUser",isAuth,getCurrentUser)
userRouter.get("/getadmin",adminAuth,getAdmin)

export default userRouter;