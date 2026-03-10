import React from "react";
import { FaShippingFast, FaUndo, FaHeadset, FaShieldAlt } from "react-icons/fa";

const policies = [
  {
    icon: <FaShippingFast size={30} />,
    title: "Free Shipping",
    desc: "Enjoy free shipping on all orders above ₹999. Fast and reliable delivery across India.",
  },
  {
    icon: <FaUndo size={30} />,
    title: "Easy Returns",
    desc: "Not satisfied? No worries! 7-day hassle-free return and refund policy.",
  },
  {
    icon: <FaShieldAlt size={30} />,
    title: "Secure Payments",
    desc: "All transactions are encrypted and secured for safe checkout experience.",
  },
  {
    icon: <FaHeadset size={30} />,
    title: "24/7 Support",
    desc: "Our support team is available round the clock to assist you anytime.",
  },
];

const OurPolicy = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-purple-500">Policies</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are committed to providing the best shopping experience with
            customer-first policies and premium service.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 transition duration-300 border border-gray-700 text-center"
            >
              <div className="flex justify-center mb-4 text-purple-500">
                {policy.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {policy.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {policy.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurPolicy;