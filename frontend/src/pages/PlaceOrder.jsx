import React, { useContext, useMemo, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { AuthDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  // const { products, cartItem, currency, delivery_fee } =
  //   useContext(shopDataContext);
  const { products, cartItem, currency, delivery_fee, setCartItem } =
  useContext(shopDataContext);

  const { serverUrl } = useContext(AuthDataContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  // ================= BUILD CART =================
  const cartProducts = useMemo(() => {
    const items = [];

    for (const itemId in cartItem) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const size in cartItem[itemId]) {
        items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
           image: product.image1, 
          size,
          quantity: cartItem[itemId][size],
        });
      }
    }

    return items;
  }, [cartItem, products]);

  const subtotal = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal > 0 ? subtotal + delivery_fee : 0;

  // ================= FORM =================
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= PLACE ORDER =================
  const placeOrderHandler = async (e) => {
    e.preventDefault();

    if (cartProducts.length === 0) {
      navigate("/cart");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        address: formData,
        items: cartProducts,
        amount: total,
        paymentMethod,
      };

      const response = await axios.post(
        serverUrl +"/api/order/placeorder",
        orderData,
        { withCredentials: true }
      );

      if (response.data.success) {
         setCartItem({});
        
        navigate("/orders");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Order Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={placeOrderHandler}
      className="min-h-screen bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-16"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* ================= LEFT SIDE ================= */}
        <div>
          <h2 className="text-4xl font-light tracking-wide mb-10">
            DELIVERY <span className="text-teal-400">INFORMATION</span>
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <input required name="firstName" onChange={onChangeHandler}
              placeholder="First name"
              className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition" />
            <input required name="lastName" onChange={onChangeHandler}
              placeholder="Last name"
              className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition" />
          </div>

          <input required name="email" onChange={onChangeHandler}
            placeholder="Email address"
            className="w-full mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition" />

          <input required name="street" onChange={onChangeHandler}
            placeholder="Street"
            className="w-full mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition" />

          <div className="grid grid-cols-2 gap-6 mt-6">
            <input required name="city" onChange={onChangeHandler}
              placeholder="City"
              className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition" />
            <input required name="state" onChange={onChangeHandler}
              placeholder="State"
              className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition" />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <input required name="pincode" onChange={onChangeHandler}
              placeholder="Pincode"
              className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition" />
            <input required name="country" onChange={onChangeHandler}
              placeholder="Country"
              className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition" />
          </div>

          <input required name="phone" onChange={onChangeHandler}
            placeholder="Phone"
            className="w-full mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition" />
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="space-y-10">

          {/* CART TOTALS */}
          <div className="border border-teal-500/30 p-8 rounded-2xl bg-gray-900/60 backdrop-blur-md">
            <h3 className="text-3xl font-light mb-6">
              CART <span className="text-teal-400">TOTALS</span>
            </h3>

            <div className="flex justify-between py-3 border-b border-gray-700">
              <span>Subtotal</span>
              <span>{currency}{subtotal}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-700">
              <span>Shipping Fee</span>
              <span>{currency}{delivery_fee}</span>
            </div>

            <div className="flex justify-between py-4 text-xl font-semibold">
              <span>Total</span>
              <span>{currency}{total}</span>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div>
            <h3 className="text-3xl font-light mb-6">
              PAYMENT <span className="text-teal-400">METHOD</span>
            </h3>

            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("RAZORPAY")}
                className={`px-8 py-3 rounded-xl border transition ${
                  paymentMethod === "RAZORPAY"
                    ? "border-teal-400 bg-teal-600/20"
                    : "border-gray-700 bg-gray-800 hover:border-teal-400"
                }`}
              >
                Razorpay
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("COD")}
                className={`px-8 py-3 rounded-xl border transition ${
                  paymentMethod === "COD"
                    ? "border-teal-400 bg-teal-600/20"
                    : "border-gray-700 bg-gray-800 hover:border-teal-400"
                }`}
              >
                Cash On Delivery
              </button>
            </div>
          </div>

          {/* PLACE ORDER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-teal-600 hover:bg-teal-500 transition text-lg font-medium shadow-lg shadow-teal-500/30 disabled:opacity-60"
          >
            {loading ? "Processing..." : "PLACE ORDER"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;