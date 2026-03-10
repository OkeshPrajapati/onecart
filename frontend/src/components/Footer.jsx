import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6 px-6">
      <div className="max-w-7xl mx-auto">

        {/* 🔹 Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo + About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              RC <span className="text-purple-500">Store</span>
            </h2>
            <p className="text-sm leading-6 text-gray-400">
              Discover the latest fashion trends with premium quality and
              unbeatable prices. Style meets comfort at RC Store.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Collections", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                    className="hover:text-purple-500 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/policy" className="hover:text-purple-500 transition">
                  Our Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-purple-500 transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-purple-500 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-purple-500 transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiMapPin /> New Delhi, India
              </li>
              <li className="flex items-center gap-2">
                <FiPhone /> +91 9876543210
              </li>
              <li className="flex items-center gap-2">
                <FiMail /> support@rcstore.com
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4 text-lg">
              <FiFacebook className="cursor-pointer hover:text-purple-500 transition" />
              <FiInstagram className="cursor-pointer hover:text-purple-500 transition" />
              <FiTwitter className="cursor-pointer hover:text-purple-500 transition" />
            </div>
          </div>

        </div>

        {/* 🔹 Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} RC Store. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;