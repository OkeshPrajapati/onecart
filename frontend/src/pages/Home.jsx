// import React, { useEffect, useState } from "react";
// import Background from "../components/Background";
// import Hero from "../components/Hero";


// const Home = () => {
//   let heroData = [
//     { text1: "30% OFF Limited offer", text2: "style that" },
//     { text1: "Discover the Best of Bold Fashion ", text2: "Limited Time only" },
//     { text1: "Explore Our Best Collection  ", text2: "Shop Now " },
//     { text1: "Choose your Perfect Fasion Fit   ", text2: "Now on Sale! " },
//   ];
//   let [heroCount, setHeroCount] = useState(0);

//   // useEffect(()=>{
//   //   let interval = setInterval(()=>{
//   //     setInterval(prevCount =>(prevCount === 3 ? 0 : prevCount + 1));
//   //     return ()=>clearInterval(interval)
//   //   },[])
//   // })

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHeroCount(prev => (prev === 3 ? 0 : prev + 1));
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="overflow-x-hidden relative top-[70px] ">

//       <div className="w-[100vw]  lg:h-[100vh]  md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025]">
//         <Background heroCount={heroCount} />
//         <Hero
//           heroCount={heroCount}
//           setHeroCount={setHeroCount}
//           heroData={heroData[heroCount]}
//         />
//       </div>
//     </div>

//   );
// };

// export default Home;



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