import express from "express"
import { adminLoginController, googleLogin, loginController, logoutController, registrationController } from "../controllers/authController.js";
const authRoutes = express.Router();


authRoutes.post("/registration",registrationController)
authRoutes.post("/login",loginController)
authRoutes.get("/logout",logoutController)
authRoutes.post("/googlelogin",googleLogin)
authRoutes.post("/adminlogin",adminLoginController)



export default authRoutes