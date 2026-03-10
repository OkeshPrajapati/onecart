import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

const BestSeller = () => {

  const { products } = useContext(shopDataContext) || {};

  const bestSellerProducts = products
    ?.filter((item) => item.bestSeller === true)
    .slice(0, 4);
console.log(products);
  return (
    <div className="w-full bg-[#0f0f0f] px-6 md:px-16 lg:px-24 py-20">

      {/* Section Title */}
      <div className="text-center mb-14">
        <Title text1="BEST" text2="SELLERS" />
        <p className="text-gray-400 mt-4 text-sm md:text-lg">
          Tried, Tested & Loved – Discover Our All-Time Best Sellers
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {bestSellerProducts?.length > 0 ? (
          bestSellerProducts.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full text-lg">
            No Best Seller Products Found
          </p>
        )}

      </div>

    </div>
  );
};

export default BestSeller;