import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6">

      <div className="text-center">

        {/* 404 TEXT */}
        <h1 className="text-[120px] md:text-[160px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-semibold mt-4">
          Page Not Found
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        {/* BUTTON */}
        <Link
          to="/"
          className="inline-block mt-8 px-8 py-3 bg-teal-600 hover:bg-teal-500 rounded-full text-lg font-medium transition shadow-lg shadow-teal-500/30"
        >
          Go Back Home
        </Link>

      </div>

    </div>
  );
};

export default PageNotFound;