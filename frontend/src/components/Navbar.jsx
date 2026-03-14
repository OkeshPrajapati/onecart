import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { userDataContext } from "../context/userContext";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { shopDataContext } from "../context/ShopContext";

function Navbar() {
  let { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(AuthDataContext);
  let navigate = useNavigate()
  const { getCartCount } = useContext(shopDataContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const userRef = useRef();
  const searchRef = useRef();

  const handleLogout = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      await getCurrentUser();  // refresh context
      setUserOpen(false);      // close dropdown
      navigate("/");

    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);

    }
  }

  // 🔥 Outside Click Close
  useEffect(() => {
    function handleClickOutside(event) {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* 🔥 NAVBAR */}
      <nav className="w-full bg-[#eef2f3] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* 🔹 Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/rclogo.svg"
              alt="RC Store"
              className="w-9 h-9 object-contain"
            />
            <h1 className="text-2xl font-bold text-gray-700">
              RC Store
            </h1>
          </Link>

          {/* 🔹 Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {["HOME", "COLLECTIONS", "ABOUT", "CONTACT"].map((item) => (
              <Link
                key={item}
                to={`/${item === "HOME" ? "" : item.toLowerCase()}`}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:scale-105 transition duration-300"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* 🔹 Right Section */}
          <div className="flex items-center gap-5 text-xl relative">

            {/* 🔍 Search */}
            <div ref={searchRef}>
              <FiSearch
                className="cursor-pointer hover:text-purple-600"
                onClick={() => setSearchOpen(!searchOpen)}
              />
            </div>

            {/* 👤 User */}
            <div ref={userRef} className="relative">
              <div
                onClick={() => setUserOpen(!userOpen)}
                className="cursor-pointer"
              >
                {!userData ? (
                  <FiUser className="hover:text-purple-600" />
                ) : (
                  <div className="w-8 h-8 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-semibold">
                    {userData?.name?.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>

              {userOpen && (
                <div className="absolute right-0 top-10 w-40 bg-white shadow-lg rounded-md py-2 text-sm z-50">
                  {!userData ? (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-gray-500 text-xs">
                        {userData?.email}
                      </div>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100"

                        onClick={handleLogout}>
                        Logout
                      </button>
                         <Link
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 🛒 Cart */}
            <Link to="/cart" className="relative flex items-center">
              <FiShoppingCart className="cursor-pointer hover:text-purple-600" />

              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* 📱 Mobile Toggle */}
            <div className="md:hidden">
              {mobileOpen ? (
                <FiX
                  className="text-2xl cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                />
              ) : (
                <FiMenu
                  className="text-2xl cursor-pointer"
                  onClick={() => setMobileOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* 📱 Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
            {["HOME", "COLLECTIONS", "ABOUT", "CONTACT"].map((item) => (
              <Link
                key={item}
                to={`/${item === "HOME" ? "" : item.toLowerCase()}`}
                className="block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* 🔍 Search Bar (Navbar ke niche full width) */}
      {searchOpen && (
        <div className="w-full bg-white shadow-md py-4 px-6">
          <div className="max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;