import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, currency, addToCart } =
    useContext(shopDataContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ================= LOAD PRODUCT =================
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(
        (item) => item._id === id
      );

      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image1);
      }
    }
  }, [id, products]);

  // ================= LOADING =================
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-xl">
        Loading Product...
      </div>
    );
  }

  // ================= HANDLE ADD =================
  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select size");
      return;
    }

    addToCart(product._id, selectedSize, quantity);
    alert("Added to cart 🛒");
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-14">

          {/* ================= IMAGE SECTION ================= */}
          <div>

            {/* Main Image */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6">
              {[product.image1, product.image2, product.image3, product.image4]
                .filter(Boolean)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="thumb"
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                      selectedImage === img
                        ? "border-purple-600"
                        : "border-gray-700"
                    }`}
                  />
                ))}
            </div>
          </div>

          {/* ================= DETAILS SECTION ================= */}
          <div className="flex flex-col justify-center space-y-6">

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <p className="text-3xl font-semibold text-purple-500">
              {currency}{product.price}
            </p>

            <p className="text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* ================= SIZE ================= */}
            {product.sizes?.length > 0 && (
              <div>
                <h4 className="mb-3 font-semibold">
                  Select Size
                </h4>

                <div className="flex gap-4 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-lg border transition ${
                        selectedSize === size
                          ? "bg-purple-600 border-purple-600"
                          : "bg-gray-800 border-gray-700 hover:border-purple-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ================= QUANTITY ================= */}
            <div>
              <h4 className="mb-3 font-semibold">
                Quantity
              </h4>

              <div className="flex items-center gap-6">
                <button
                  onClick={() =>
                    quantity > 1 && setQuantity(quantity - 1)
                  }
                  className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  -
                </button>

                <span className="text-lg font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* ================= ADD TO CART ================= */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition"
            >
              <FiShoppingCart size={20} />
              Add To Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;