import React, { useContext } from "react";
import Title from "./Title";

import Card from "./Card";
import { shopDataContext } from "../context/ShopContext";

const LatestCollection = () => {
  const { products } = useContext(shopDataContext);

  // Latest 8 products (last added wale)
  const latestProducts = products.slice(-8).reverse();

  return (
    <section className="w-full bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Title */}
        <Title text1="LATEST" text2="COLLECTIONS" />

        {/* Subtitle */}
        <p className="mt-4 text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
          Step Into Style — Discover our newest arrivals crafted for comfort,
          confidence, and bold fashion statements this season.
        </p>

        {/* Product Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {latestProducts.length > 0 ? (
            latestProducts.map((item) => (
              <Card
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}   // 👈 backend ke hisaab se image1
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              No Products Available
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;