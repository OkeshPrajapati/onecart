import React, { useState } from "react";
import { FiMail } from "react-icons/fi";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    alert("Subscribed Successfully ✅");
    setEmail("");
  };

  return (
    <section className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center text-white">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to our Newsletter
        </h2>

        <p className="text-sm md:text-lg text-purple-100 mb-8">
          Get the latest updates, exclusive offers & new arrivals directly in your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="relative w-full sm:w-2/3">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-white text-purple-600 font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};

export default NewsletterBox;