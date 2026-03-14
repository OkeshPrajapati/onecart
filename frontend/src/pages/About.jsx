import { FiTruck, FiShield, FiRefreshCw, FiUsers } from "react-icons/fi";

const About = () => {
  return (
    <div className="bg-gray-900 text-white">

      {/* 🔥 Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-purple-500">RC Store</span>
        </h1>
        <p className="max-w-3xl mx-auto text-gray-400 text-lg">
          Discover our journey, our mission, and what makes RC Store a trusted
          destination for premium fashion.
        </p>
      </section>

      {/* 🔥 About Section (Left Image - Right Content) */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* Left Image */}
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"
              alt="About RC Store"
              className="rounded-2xl shadow-2xl w-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-purple-600 opacity-10 rounded-2xl"></div>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="text-purple-500">Story</span>
            </h2>

            <p className="text-gray-400 leading-7 mb-4">
              RC Store was founded with a simple idea — to provide stylish,
              high-quality fashion that empowers confidence. We carefully
              curate collections that match modern trends while keeping comfort
              at the core.
            </p>

            <p className="text-gray-400 leading-7 mb-6">
              Our mission is to make premium fashion accessible and affordable
              for everyone. From everyday essentials to statement pieces,
              we deliver excellence in every stitch.
            </p>

            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition shadow-lg">
              Explore Collection
            </button>
          </div>

        </div>
      </section>

      {/* 🔥 Why Choose Us */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-12">
            Why Choose <span className="text-purple-500">Us?</span>
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">

            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
              <FiTruck className="text-purple-500 text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-400 text-sm">
                Reliable shipping across India.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
              <FiShield className="text-purple-500 text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-400 text-sm">
                Safe & encrypted payment methods.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
              <FiRefreshCw className="text-purple-500 text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-400 text-sm">
                7-day hassle-free returns.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
              <FiUsers className="text-purple-500 text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400 text-sm">
                Dedicated customer support.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 🔥 Newsletter Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-purple-700 to-indigo-700">

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>

          <p className="text-purple-100 mb-8">
            Get updates about new collections, exclusive offers and style tips.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg w-full sm:w-auto text-black focus:outline-none"
            />
            <button className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition">
              Subscribe
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};

export default About;