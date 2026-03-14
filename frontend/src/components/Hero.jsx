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