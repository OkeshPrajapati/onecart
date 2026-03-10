import { useState, useEffect, useContext } from "react";
import { Pencil, Trash2, Star } from "lucide-react";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

const Lists = () => {
    const [items, setItems] = useState([]);
    const { serverUrl } = useContext(authDataContext);

    // Fetch Products
    const fetchedData = async () => {
        try {
            const result = await axios.get(
                serverUrl + "/api/product/list"
            );

            setItems(result.data.product); // ✅ correct key
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchedData();
    }, []);
    
    const removProduct = async (id) => {
        try {

            const result = await axios.post(
                `${serverUrl}/api/product/remove/${id}`,
                {},
                { withCredentials: true }
            );

            if (result.data.success) {
                fetchedData();
            } else {
                console.log("Failed to remove");
            }

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">

            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Product List
                    </h2>
                    <span className="text-gray-400">
                        Total: {items.length}
                    </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">

                        <thead>
                            <tr className="border-b border-gray-700 text-gray-400 text-sm uppercase">
                                <th className="p-4">Image</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Sizes</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-b border-gray-700 hover:bg-gray-700/40 transition"
                                >
                                    {/* Image */}
                                    <td className="p-4">
                                        <img
                                            src={item.image1}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    </td>

                                    {/* Name */}
                                    <td className="p-4 font-semibold">
                                        {item.name}
                                    </td>

                                    {/* Category */}
                                    <td className="p-4 text-gray-300">
                                        {item.category} / {item.subCategory}
                                    </td>

                                    {/* Sizes */}
                                    <td className="p-4">
                                        <div className="flex gap-2 flex-wrap">
                                            {item.sizes?.map((size, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-700 rounded-md text-xs"
                                                >
                                                    {size}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td className="p-4 text-purple-400 font-bold">
                                        ₹{item.price}
                                    </td>

                                    {/* Bestseller */}
                                    <td className="p-4">
                                        {item.bestSeller ? (
                                            <span className="flex items-center gap-1 text-yellow-400">
                                                <Star size={16} /> Bestseller
                                            </span>
                                        ) : (
                                            <span className="text-gray-500">
                                                Normal
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4">
                                        <div className="flex justify-center gap-4">
                                            <button className="text-blue-400 hover:text-blue-600">
                                                <Pencil size={18} />
                                            </button>

                                            <button
                                                onClick={() => removProduct(item._id)}
                                                className="text-red-400 hover:text-red-600"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center p-6 text-gray-400"
                                    >
                                        No Products Found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Lists;