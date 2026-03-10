import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

const Order = () => {
  const { serverUrl } = useContext(authDataContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ALL ORDERS =================
  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/order/list`,
        { withCredentials: true }
      );

      if (data.orders) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }

    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // ================= UPDATE STATUS =================
  const updateStatusHandler = async (orderId, status) => {
    try {
      await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status },
        { withCredentials: true }
      );

      fetchAllOrders(); // refresh list
    } catch (error) {
      console.log("Status update error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">
        ADMIN <span className="text-teal-400">ORDERS</span>
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400">No Orders Found</p>
      ) : (
        <div className="space-y-10">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 p-6 rounded-2xl border border-gray-700"
            >
              {/* ===== TOP INFO ===== */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">

                <div>
                  <p className="text-sm text-gray-400">
                    Order ID: {order._id}
                  </p>
                  <p className="text-sm text-gray-400">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    Payment: {order.paymentMethod}
                  </p>
                </div>

                <div>
                  <p className="text-xl font-semibold text-teal-400">
                    ₹ {order.amount}
                  </p>

                  {/* STATUS DROPDOWN */}
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatusHandler(order._id, e.target.value)
                    }
                    className="mt-2 bg-gray-700 p-2 rounded-lg border border-gray-600"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Paid">Paid</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* ===== ADDRESS ===== */}
              <div className="mb-6 bg-gray-900 p-4 rounded-xl text-sm text-gray-300">
                <p>
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p>{order.address?.street}</p>
                <p>
                  {order.address?.city}, {order.address?.state}
                </p>
                <p>
                  {order.address?.country} - {order.address?.pincode}
                </p>
                <p>Phone: {order.address?.phone}</p>
                <p>Email: {order.address?.email}</p>
              </div>

              {/* ===== ITEMS ===== */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-xl overflow-hidden"
                  >
                    <img
                      src={
                        item.image
                          ? item.image
                          : "https://via.placeholder.com/300x200"
                      }
                      alt={item.name}
                      className="w-full h-36 object-cover"
                    />

                    <div className="p-3">
                      <h3 className="font-semibold text-sm">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-300">
                        Size: {item.size}
                      </p>
                      <p className="text-sm text-gray-300">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-teal-400 font-semibold mt-1">
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
  );
};

export default Order;