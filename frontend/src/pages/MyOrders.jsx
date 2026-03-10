import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/authContext";

const MyOrders = () => {
  const { serverUrl } = useContext(AuthDataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/order/userorder`,
        { withCredentials: true }
      );

      console.log("Orders Response:", data);

      // ✅ Safe data handling
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data.orders) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }

    } catch (error) {
      console.log("Order Fetch Error:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-12 text-center">
          My <span className="text-purple-500">Orders</span>
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            You have no orders yet.
          </div>
        ) : (
          <div className="space-y-10">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700"
              >

                {/* ================= TOP INFO ================= */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

                  <div>
                    <p className="text-sm text-gray-400">
                      Order ID: {order._id}
                    </p>
                    <p className="text-sm text-gray-400">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">

                    <span className="text-lg font-semibold text-purple-400">
                      ₹ {order.amount}
                    </span>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-600"
                          : order.status === "Paid"
                          ? "bg-blue-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {order.status || "Processing"}
                    </span>
                  </div>
                </div>

                {/* ================= ORDER ITEMS ================= */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                  {order.items && order.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-xl overflow-hidden hover:scale-105 transition duration-300"
                    >

                      {/* ✅ Image Fallback */}
                      <img
                        src={
                          item.image
                            ? item.image
                            : "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={item.name}
                        className="w-full h-40 object-cover"
                      />

                      <div className="p-4">
                        <h3 className="font-semibold text-sm truncate">
                          {item.name}
                        </h3>

                        <p className="text-gray-300 text-sm mt-1">
                          Size: {item.size}
                        </p>

                        <p className="text-gray-300 text-sm">
                          Qty: {item.quantity}
                        </p>

                        <p className="text-purple-400 font-semibold mt-2">
                          ₹ {item.price}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;