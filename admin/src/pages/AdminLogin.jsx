import { useContext, useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { adminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  let {getAdmin } = useContext(adminDataContext);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Rename function
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminlogin",
        formData, // ✅ send full formData
        { withCredentials: true }
      );

      console.log("Login Success:", result.data);
      getAdmin()
      navigate("/");
    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-purple-600 p-3 rounded-full mb-3 shadow-lg">
            <ShieldCheck className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white">RC Admin Panel</h2>
          <p className="text-gray-300 text-sm mt-1">
            Login to manage your store
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAdminLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition"
              placeholder="admin@rcstore.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition"
                placeholder="Enter admin password"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-300 text-white font-semibold shadow-lg"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
