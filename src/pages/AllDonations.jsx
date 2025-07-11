// pages/AllDonations.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import DonationCard from "../components/DonationCard"; // ✅ You missed this line

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/donations?status=Verified")
      .then((res) => {
        setDonations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donations", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 max-w-6xl min-h-screen mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Donations</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : donations.length === 0 ? (
        <p className="text-center text-gray-500">No verified donations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonations;
