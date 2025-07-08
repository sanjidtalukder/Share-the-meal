// AllDonations.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/donations")
      .then(res => setDonations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {donations.map((donation) => (
        <div key={donation._id} className="border rounded-xl shadow-md p-4 bg-white">
          <img src={donation.image} alt={donation.title} className="w-full h-48 object-cover rounded-lg mb-4" />
          <h2 className="text-xl font-bold text-purple-700">{donation.title}</h2>
          <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
          <p><strong>Location:</strong> {donation.location}</p>
          <p><strong>Charity:</strong> {donation.charityName || "Unassigned"}</p>
          <p><strong>Status:</strong> {donation.status}</p>
          <p><strong>Quantity:</strong> {donation.quantity}</p>
          <button
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate(`/donations/${donation._id}`)}
          >
            Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllDonations;
