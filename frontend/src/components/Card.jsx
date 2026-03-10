import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, name, image, price }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition duration-300 hover:-translate-y-2">

      {/* IMAGE */}
      <div
        className="h-64 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/productdetail/${id}`)}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 capitalize">
          {name}
        </h3>

        <p className="text-purple-400 font-bold text-lg">
          ₹{price}
        </p>

        <button
          onClick={() => navigate(`/productdetail/${id}`)}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-2 rounded-xl font-medium hover:opacity-90 transition"
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default Card;
