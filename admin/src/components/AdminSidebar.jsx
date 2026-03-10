import {
  LayoutDashboard,
  PlusSquare,
  ListOrdered,
  Eye,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ isOpen }) => {
  return (
    <div
      className={`
        fixed lg:static
        top-0 left-0
        h-screen w-64
        bg-gray-950
        border-r border-gray-800
        transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        transition-transform duration-300
        z-50
      `}
    >
      <div className="flex flex-col h-full p-6 text-gray-300">
        <nav className="flex flex-col gap-2 flex-1">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg"
                  : "hover:bg-gray-800"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/add-item"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg"
                  : "hover:bg-gray-800"
              }`
            }
          >
            <PlusSquare size={18} />
            Add Item
          </NavLink>

          <NavLink
            to="/admin/item-list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg"
                  : "hover:bg-gray-800"
              }`
            }
          >
            <ListOrdered size={18} />
            Item List
          </NavLink>

          <NavLink
            to="/admin/order-views"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg"
                  : "hover:bg-gray-800"
              }`
            }
          >
            <Eye size={18} />
            Order Views
          </NavLink>

        </nav>

      </div>
    </div>
  );
};

export default AdminSidebar;