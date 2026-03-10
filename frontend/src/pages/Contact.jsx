import React from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">

      {/* 🔥 Hero */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact <span className="text-purple-500">Us</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about
          products, orders, or anything else — our team is ready to help.
        </p>
      </section>

      {/* 🔥 Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">

          {/* 📌 Left Side - Info */}
          <div className="space-y-8">

            <div>
              <h2 className="text-3xl font-bold mb-6">
                Get in <span className="text-purple-500">Touch</span>
              </h2>
              <p className="text-gray-400 leading-7">
                Have questions or feedback? Reach out to us anytime. Our support
                team is available to assist you with anything you need.
              </p>
            </div>

            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-gray-400 text-sm">
                    123 Fashion Street, New Delhi, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <FiPhone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-400 text-sm">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <FiMail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-400 text-sm">
                    support@rcstore.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <FiClock size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Working Hours</h4>
                  <p className="text-gray-400 text-sm">
                    Mon - Sat: 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* 📝 Right Side - Contact Form */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">

            <h3 className="text-2xl font-semibold mb-6">
              Send us a Message
            </h3>

            <form className="space-y-6">

              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition shadow-lg"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;