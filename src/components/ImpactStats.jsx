
import React from "react";
import { FaLeaf, FaUtensils, FaBalanceScale } from "react-icons/fa";

const ImpactStats = () => {
  return (
    <section className="bg-green-50 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaUtensils className="text-4xl mx-auto text-green-600 mb-2" />
            <h3 className="text-xl font-semibold">12,000+ Meals Donated</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaBalanceScale className="text-4xl mx-auto text-blue-600 mb-2" />
            <h3 className="text-xl font-semibold">4,500 kg Food Saved</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaLeaf className="text-4xl mx-auto text-green-800 mb-2" />
            <h3 className="text-xl font-semibold">20 Tons CO₂ Reduced</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
