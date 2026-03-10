import React, { useContext, useMemo } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const Cart = () => {
  const {
    products,
    cartItem,
    currency,
    delivery_fee,
    updateCartItem,
  } = useContext(shopDataContext);

  const navigate = useNavigate();

  // ================= BUILD CART DATA =================
  const cartProducts = useMemo(() => {
    const items = [];

    for (const itemId in cartItem) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const size in cartItem[itemId]) {
        items.push({
          ...product,
          size,
          quantity: cartItem[itemId][size],
        });
      }
    }

    return items;
  }, [cartItem, products]);

  // ================= CALCULATIONS =================
  const subtotal = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal > 0 ? subtotal + delivery_fee : 0;

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center items-center">
        <h2 className="text-2xl mb-6">Your Cart is Empty 🛒</h2>
        <button
          onClick={() => navigate("/collections")}
          className="px-6 py-3 bg-purple-600 rounded-xl"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* ================= CART ITEMS ================= */}
        <div className="lg:col-span-2 space-y-6">

          {cartProducts.map((item) => (
            <div
              key={item._id + item.size}
              className="bg-gray-900 p-5 rounded-2xl flex gap-6 items-center"
            >
              <img
                src={item.image1}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  Size: {item.size}
                </p>

                <p className="text-purple-500 font-semibold mt-1">
                  {currency}{item.price}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-4 mt-3">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      updateCartItem(
                        item._id,
                        item.size,
                        item.quantity - 1
                      )
                    }
                    className={`px-3 py-1 rounded ${item.quantity <= 1
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-gray-800"
                      }`}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateCartItem(
                        item._id,
                        item.size,
                        item.quantity + 1
                      )
                    }
                    className="px-3 py-1 bg-gray-800 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <FiTrash2
                className="cursor-pointer text-red-500"
                size={20}
                onClick={() =>
                  updateCartItem(item._id, item.size, 0)
                }
              />
            </div>
          ))}
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-gray-900 p-6 rounded-2xl h-fit space-y-4">

          <h3 className="text-xl font-semibold mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency}{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>{currency}{delivery_fee}</span>
          </div>

          <hr className="border-gray-700" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{currency}{total}</span>
          </div>

          {/* <button className="w-full py-3 bg-purple-600 rounded-xl mt-4">
            Proceed to Checkout
          </button> */}
          <button
            onClick={() => navigate("/placeorder")}
            className="w-full py-3 bg-purple-600 rounded-xl mt-4"
          >
            Proceed to Checkout
          </button>


        </div>
      </div>
    </div>
  );
};

export default Cart;