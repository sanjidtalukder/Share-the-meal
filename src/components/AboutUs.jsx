import React from "react";
import {
  FaUsers,
  FaUtensils,
  FaHandHoldingHeart,
  FaUserShield,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-6">
        About Us
      </h2>
      <p className="text-lg text-gray-700 text-center mb-10 max-w-3xl mx-auto">
        At <span className="font-semibold text-green-700">Share the Meal</span>, our mission is simple — prevent food waste and help those in need. 
        We connect restaurants with surplus food to trusted charities, ensuring that no meal is wasted and every plate counts. 
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Users Section */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <FaUsers className="text-green-600 text-3xl" />
            <h3 className="text-xl font-semibold text-green-700">For Users</h3>
          </div>
          <p className="text-gray-600">
            Discover food donations, save your favorites, track your activity, or become a charity partner. 
            Your small steps create a big difference.
          </p>
        </div>

        {/* Restaurants Section */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <FaUtensils className="text-green-600 text-3xl" />
            <h3 className="text-xl font-semibold text-green-700">For Restaurants</h3>
          </div>
          <p className="text-gray-600">
            Easily share leftover meals, manage donations, and help reduce hunger. Every dish you donate feeds someone in need.
          </p>
        </div>

        {/* Charities Section */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <FaHandHoldingHeart className="text-green-600 text-3xl" />
            <h3 className="text-xl font-semibold text-green-700">For Charities</h3>
          </div>
          <p className="text-gray-600">
            Access available meals, send pickup requests, and track your impact. We help you serve communities with dignity and speed.
          </p>
        </div>

        {/* Admins Section */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <FaUserShield className="text-green-600 text-3xl" />
            <h3 className="text-xl font-semibold text-green-700">For Admins</h3>
          </div>
          <p className="text-gray-600">
            Monitor platform activities, manage roles, featured donations, and ensure smooth and secure operations.
          </p>
        </div>
      </div>

      <p className="mt-12 text-center text-gray-500 text-sm">
        Together, let's create a world where no food goes to waste and every person is cared for. 🌍✨
      </p>
    </div>
  );
};

export default AboutUs;
