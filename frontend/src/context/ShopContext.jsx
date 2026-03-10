import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  const { serverUrl } = useContext(AuthDataContext);

  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});

  const currency = "₹";
  const delivery_fee = 40;

  // ================= GET PRODUCTS =================
  const getProduct = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      setProducts(result.data.product);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  // ================= ADD TO CART =================
  const addToCart = async (itemId, size, quantity = 1) => {
    if (!size) {
      alert("Select size");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += quantity;
      } else {
        cartData[itemId][size] = quantity;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    setCartItem(cartData);

    try {
      await axios.post(
        serverUrl + "/api/cart/add",
        { itemId, size, quantity },
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Cart error:", error);
    }
  };

  // ================= GET USER CART =================
  // const getUserCart = async () => {
  //   try {
  //     const result = await axios.post(
  //       serverUrl + "/api/cart/get",
  //       {},
  //       { withCredentials: true }
  //     );

  //     setCartItem(result.data.cart || {});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  const getUserCart = async () => {
  try {
    const result = await axios.post(
      serverUrl + "/api/cart/get",
      {},
      { withCredentials: true }
    );

    const backendCart = result.data.cart || {};
    const cleanedCart = {};

    for (const itemId in backendCart) {
      for (const size in backendCart[itemId]) {
        const qty = backendCart[itemId][size];

        // ✅ Sirf quantity > 0 wale hi add karo
        if (qty > 0) {
          if (!cleanedCart[itemId]) {
            cleanedCart[itemId] = {};
          }
          cleanedCart[itemId][size] = qty;
        }
      }
    }

    setCartItem(cleanedCart);

  } catch (error) {
    console.log(error);
  }
};

  // ================= CART COUNT =================
  const getCartCount = () => {
    let total = 0;
    for (const item in cartItem) {
      for (const size in cartItem[item]) {
        total += cartItem[item][size];
      }
    }
    return total;
  };
  


  // ================= UPDATE CART =================

const updateCartItem = async (itemId, size, quantity) => {

  let cartData = structuredClone(cartItem);

  if (quantity <= 0) {
    delete cartData[itemId][size];

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
  } else {
    cartData[itemId][size] = quantity;
  }

  setCartItem(cartData);

  try {
    await axios.post(
      serverUrl + "/api/cart/update",
      { itemId, size, quantity },
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};



  useEffect(() => {
    getProduct();
    getUserCart();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    updateCartItem
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
};

export default ShopContext;