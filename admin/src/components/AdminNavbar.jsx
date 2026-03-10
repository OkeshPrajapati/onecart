import { Menu, LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import axios from "axios";

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);

  const logOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">

      {/* Left */}
      <div className="flex items-center gap-4">
        <Menu
          className="text-gray-300 cursor-pointer lg:hidden"
          onClick={toggleSidebar}
        />
        <h1 className="text-xl font-bold text-purple-500">
          RC Admin Panel
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-gray-300 text-sm hidden md:block">
          admin@rcstore.com
        </span>

        <LogOut
          onClick={logOut}
          className="text-gray-300 cursor-pointer hover:text-red-500 transition"
        />
      </div>
    </div>
  );
};

export default AdminNavbar;