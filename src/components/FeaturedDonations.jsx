import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const FeaturedDonations = () => {
  const [donations, setDonations] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/donations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("✅ Donations fetched:", res.data);
        setDonations(res.data);
      } catch (error) {
        console.error("❌ Error fetching donations:", error);
      }
    };

    if (token) {
      console.log(" Token is:", token);
      fetchDonations();
    }
  }, [token]);

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Donations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {donations.slice(0, 4).map((donation) => (
          <div key={donation._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={donation.image}
                alt={donation.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="font-semibold text-lg">{donation.title}</h3>
              <p>{donation.restaurant?.name}, {donation.restaurant?.location}</p>
              <p
                className={`font-medium ${
                  donation.status === "Verified" ? "text-green-600" : "text-gray-500"
                }`}
              >
                {donation.status}
              </p>
              <div className="card-actions justify-end">
                <Link to={`/donations/${donation._id}`}>
                  <button className="btn btn-outline btn-sm">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDonations;
