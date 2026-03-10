import React, { useContext, useState, useEffect } from "react";
import { shopDataContext } from "../context/ShopContext";
import Card from "../components/Card";

const Collection = () => {
  const { products } = useContext(shopDataContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("default");

  // Toggle Category
  const toggleCategory = (value) => {
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  // Toggle SubCategory
  const toggleSubCategory = (value) => {
    if (subCategory.includes(value)) {
      setSubCategory(subCategory.filter((item) => item !== value));
    } else {
      setSubCategory([...subCategory, value]);
    }
  };

  // APPLY FILTER LOGIC
  useEffect(() => {
    let productCopy = [...products];

    // Category Filter
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category.toLowerCase())
      );
    }

    // SubCategory Filter
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Sorting
    if (sortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(productCopy);
  }, [products, category, subCategory, sortType]);

  return (
    <section className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-7xl mx-auto flex gap-8">

        {/* Sidebar */}
        <div className="w-64 bg-gray-900 p-6 rounded-2xl border border-gray-800 h-fit sticky top-24">

          <h3 className="text-lg font-semibold mb-6 text-purple-500">
            Filters
          </h3>

          {/* Category */}
          <div className="mb-6">
            <p className="mb-3 font-medium">Category</p>
            {["men", "women", "kids"].map((cat) => (
              <div key={cat} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  onChange={() => toggleCategory(cat)}
                />
                <span className="capitalize">{cat}</span>
              </div>
            ))}
          </div>

          {/* SubCategory */}
          <div className="mb-6">
            <p className="mb-3 font-medium">Sub Category</p>
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <div key={sub} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  onChange={() => toggleSubCategory(sub)}
                />
                <span>{sub}</span>
              </div>
            ))}
          </div>

          {/* Sorting */}
          <div>
            <p className="mb-3 font-medium">Sort By</p>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg"
            >
              <option value="default">Default</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <Card
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image1}
                />
              ))
            ) : (
              <p className="text-gray-400 col-span-full">
                No Products Found
              </p>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;