import { useState, useContext } from "react";
import { FaCloudUploadAlt, FaPlus } from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

const Add = () => {
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "men",
    subCategory: "",
    sizes: [],
    bestSeller: false,
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const categories = {
    men: ["Topwear", "Bottomwear", "Winterwear"],
    women: ["Topwear", "Bottomwear", "Winterwear"],
    kids: ["Topwear", "Bottomwear", "Winterwear"],
  };

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // size select
  const handleSizeChange = (size) => {
    if (formData.sizes.includes(size)) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((s) => s !== size),
      });
    } else {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, size],
      });
    }
  };

  // image select
  const handleImageChange = (e) => {
    setImages({
      ...images,
      [e.target.name]: e.target.files[0],
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "sizes") {
          data.append("sizes", JSON.stringify(formData.sizes));
        } else {
          data.append(key, formData[key]);
        }
      });

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          data.append(key, images[key]);
        }
      });

      await axios.post(serverUrl + "/api/product/addproduct", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("Product Added Successfully ✅");

      // reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "men",
        subCategory: "",
        sizes: [],
        bestSeller: false,
      });

      setImages({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      });

    } catch (error) {
      console.log(error);
      alert("Error adding product ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center py-12 px-4">
      <div className="w-full max-w-5xl bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-10">

        <h2 className="text-4xl font-bold mb-10 flex items-center gap-3 text-purple-500">
          <FaPlus /> Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Product Name */}
          <div>
            <label className="block mb-2 text-gray-400">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-gray-400">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Price + Category */}
          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <label className="block mb-2 text-gray-400">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-400">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                    subCategory: "",
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-400">Sub Category</label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select</option>
                {categories[formData.category].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block mb-3 text-gray-400">Available Sizes</label>
            <div className="flex flex-wrap gap-4">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-5 py-2 rounded-xl border transition ${
                    formData.sizes.includes(size)
                      ? "bg-purple-600 border-purple-600"
                      : "bg-gray-800 border-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-3 text-gray-400">
              Upload Images
            </label>

            <div className="grid md:grid-cols-4 gap-4">
              {["image1", "image2", "image3", "image4"].map((img) => (
                <label
                  key={img}
                  className="flex flex-col items-center justify-center h-32 bg-gray-800 border border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-purple-500 transition"
                >
                  {images[img] ? (
                    <img
                      src={URL.createObjectURL(images[img])}
                      className="h-full w-full object-cover rounded-xl"
                      alt="preview"
                    />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="text-2xl text-purple-500 mb-2" />
                      <span className="text-sm text-gray-400">Upload</span>
                    </>
                  )}

                  <input
                    type="file"
                    name={img}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="bestSeller"
              checked={formData.bestSeller}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-gray-400">Mark as Bestseller</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-lg hover:opacity-90 transition"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default Add;