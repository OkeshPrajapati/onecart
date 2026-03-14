import { useEffect, useState } from "react";
import Background from "../components/Background";
import Hero from "../components/Hero";
import Product from "./Product";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewLetterBox";
import Footer from "../components/Footer";

const Home = () => {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that Defines You" },
    { text1: "Discover Bold Fashion", text2: "Limited Time Only" },
    { text1: "Explore Our Best Collection", text2: "Shop Now" },
    { text1: "Choose Your Perfect Fit", text2: "Now on Sale!" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev === 3 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    // <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden mt-[70px]">

    //   <Background heroCount={heroCount} />

    //   <Hero
    //     heroData={heroData[heroCount]}
    //     heroCount={heroCount}
    //     setHeroCount={setHeroCount}
    //   />
    //   <Product/>
    // </div>
   
  <>
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden mt-[70px]">
      <Background heroCount={heroCount} />
      <Hero
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
      />
    </div>

    <Product />
    <OurPolicy/>
    <NewsletterBox/>
    <Footer/>
  </>
  );
};

export default Home;