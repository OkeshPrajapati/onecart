import UserModel from "../models/userModal.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";

export const registrationController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existuser = await UserModel.findOne({ email })
        if (existuser)
            return res.status(400).json({
                message: "user allready register"
            })

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "enter valid email"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Enter Strong password"
            })

        }

        let hashPassword = await bcrypt.hash(password, 10);

        let user = await UserModel.create({
            name,
            email,
            password: hashPassword,

        })

        let token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            message: "user register  successful",
            user
        })
    } catch (error) {
        console.log("register error")
        return res.status(500).json({
            message: `register error${error}`
        })

    }
}

export const loginController = async (req, res) => {
    try {
        // console.log("login hit",req.body)
        let { email, password } = req.body;

        let user = await UserModel.findOne({ email })
        if (!user)
            return res.status(400).json({
                message: "user not found"
            })
        //   console.log("login hit",user)

        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect email or password"
            })


        let token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "user login successful",
            user
        })




    } catch (error) {

    }
}

export const logoutController = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "logout successfull" })

    } catch (error) {
        console.log("Logout error")
        return res.status(500).json({ message: `LogOut error ${error}` })
    }

}

// export const googleLogin = async (req,res)=>{
//     try {
//         let {name,email}= req.body;

//         let user = await UserModel.findOne({email})

//         if(!user){
//            let  newuser = await UserModel.create({
//                 name,
//                 email,
//             })

//              console.log("created user -",newuser)
//         }


//         let token = await genToken(user._id)
//         res.cookie("token",token,{
//             httpOnly:true,
//             secure:false,
//             sameSite:"Lax",
//             maxAge:7 * 24 * 60 * 60 * 1000
//         })
//         return res.status(201).json({
//             message:"user login by google",
//             user
//         })

//     } catch (error) {
//         console.log("googleLogin error ")
//         return res.status(500).json({message:`Login error ${error}`})

//     }
// }

export const googleLogin = async (req, res) => {
    try {
        const { name, email } = req.body;
        console.log("BODY:", req.body);

        if (!email) {
            return res.status(400).json({ message: "Email required" })
        }

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({
                name,
                email,
            });
            console.log("New user created:", user);
        }

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User login by Google successful",
            user
        });

    } catch (error) {
        console.log("googleLogin error:", error);
        return res.status(500).json({
            message: "Login error"
        });
    }
}

export const adminLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = await genToken1(email);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // console.log("token --", token);

        return res.status(200).json({
            message: "Admin login successful",
            token
        });

    } catch (error) {
        console.log("adminlogin error:", error);
        return res.status(500).json({
            message: "adminLogin error"
        });
    }
};
