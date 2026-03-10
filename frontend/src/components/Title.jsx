import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col items-center gap-3">

      {/* Heading */}
      <h2 className="text-2xl md:text-4xl font-bold text-white tracking-wide">
        <span className="text-purple-500">{text1}</span>{" "}
        <span className="text-gray-300">{text2}</span>
      </h2>

      {/* Decorative Line */}
      <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full">
        <h1>Welcome to my Website </h1>
      </div>

    </div>
  );
};

export default Title;