import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/authContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { serverUrl } = useContext(AuthDataContext)
  let { getCurrentUser } = useContext(userDataContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true })
      console.log(result.data)
      getCurrentUser()
      navigate("/")

    } catch (error) {
      console.log(error)

    }
  }

  const googlelogin = async () => {
    try {
      let response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName
      let email = user.email

      const result = await axios.post(serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true })
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

      {/* Center Text */}
      <div className="text-center text-white mb-8">
        <h2 className="text-4xl font-bold">Welcome Back 👋</h2>
        <p className="mt-2 text-lg text-gray-200">
          Login to continue to your account
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

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
              placeholder="Enter your email"
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
                placeholder="Enter your password"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={googlelogin}
          className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <FaGoogle className="text-red-500 mr-2" />
          Continue with Google
        </button>

        {/* Register Redirect */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Create New Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
