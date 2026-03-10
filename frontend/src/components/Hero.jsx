// import React from "react";
// import { FaCircle } from "react-icons/fa";

// const Hero = ({ heroData, heroCount, setHeroCount }) => {
//   return (
//     <div className="w-[40%] h-[100%] relative">

//       {/* 🔥 Hero Text */}
//       <div className="absolute text-[#88d9ee] text-[20px] md:text-[40px] lg:text-[55px] md:left-[10%] md:top-[90px] lg:top-[130px] left-[10%] top-[10px]">
//         <p>{heroData?.text1}</p>
//         <p>{heroData?.text2}</p>
//       </div>

//       {/* 🔵 Slider Dots */}
//       <div className="absolute md:top-[140px] lg:top-[500px] top-[160px] left-[10%] flex items-center justify-center gap-[10px]">

//         <FaCircle
//           className={`w-[14px] cursor-pointer ${
//             heroCount === 0 ? "fill-orange-400" : "fill-white"
//           }`}
//           onClick={() => setHeroCount(0)}
//         />

//         <FaCircle
//           className={`w-[14px] cursor-pointer ${
//             heroCount === 1 ? "fill-orange-400" : "fill-white"
//           }`}
//           onClick={() => setHeroCount(1)}
//         />

//         <FaCircle
//           className={`w-[14px] cursor-pointer ${
//             heroCount === 2 ? "fill-orange-400" : "fill-white"
//           }`}
//           onClick={() => setHeroCount(2)}
//         />

//         <FaCircle
//           className={`w-[14px] cursor-pointer ${
//             heroCount === 3 ? "fill-orange-400" : "fill-white"
//           }`}
//           onClick={() => setHeroCount(3)}
//         />
//       </div>

//     </div>
//   );
// };

// export default Hero;
import { FaCircle } from "react-icons/fa";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 lg:px-24 text-white z-20">

            {/* Text */}
            <div className="max-w-xl">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug">
                    {heroData?.text1}
                </h2>
                <p className="mt-3 text-lg md:text-2xl text-gray-200">
                    {heroData?.text2}
                </p>
            </div>

            {/* Dots */}
            <div className="flex gap-3 mt-8">
                {[0, 1, 2, 3].map((index) => (
                    <FaCircle
                        key={index}
                        onClick={() => setHeroCount(index)}
                        className={`cursor-pointer transition-all duration-300 ${heroCount === index
                                ? "text-purple-500 scale-125"
                                : "text-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;