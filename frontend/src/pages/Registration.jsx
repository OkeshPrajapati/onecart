import React, {useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/authContext";
import axios from 'axios'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/userContext";
const Register = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    let { serverUrl } = useContext(AuthDataContext)
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let{getCurrentUser}=useContext(userDataContext)


    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("server->", serverUrl)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/registration`, {
                name, email, password
            },
                { withCredentials: true })
            console.log("result=>", result)
            console.log(result.data)
              getCurrentUser()
         navigate("/")

        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
        }

    }

    const handleGoogleAuth = async () => {
        try {
            let response = await signInWithPopup(auth, provider)
            let user = response.user
            let name = user.displayName
            let email = user.email

            const result = await axios.post(serverUrl + "/api/auth/googlelogin",
                {name,email},
                {withCredentials:true})
                console.log(result.data)
                  getCurrentUser()
                   navigate("/")
                
        } catch (error) {

            console.log(error)
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 relative flex flex-col items-center justify-center px-4">

            {/* Logo Top Left */}
            <div
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 flex items-center space-x-3 cursor-pointer"
            >
                <div className="bg-white text-blue-600 font-bold text-xl px-3 py-2 rounded-lg shadow">
                    RC
                </div>
                <h1 className="text-2xl font-bold text-white">RC Store</h1>
            </div>

            {/* Center Content */}
            <div className="text-center text-white mb-8">
                <h2 className="text-4xl font-bold">Welcome to RC Store 🚀</h2>
                <p className="mt-2 text-lg text-gray-200">
                    Create your account to continue
                </p>
            </div>

            {/* Registration Card */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Create Account
                </h2>

                <form onSubmit={handleSignup} className="space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter username"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-600 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                                placeholder="Enter password"
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Auth */}
                <button
                    onClick={handleGoogleAuth}
                    className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                    <FaGoogle className="text-red-500 mr-2" />
                    Continue with Google
                </button>
                {/* Login Redirect */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
};

export default Register;
