// pages/DonationDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DonationDetails = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/donations/${id}`)
      .then(res => setDonation(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!donation) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <img src={donation.image} alt={donation.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-2xl font-bold text-purple-700 mb-2">{donation.title}</h1>
      <p><strong>Donor Name:</strong> {donation.donorName}</p>
      <p><strong>Quantity:</strong> {donation.quantity}</p>
      <p><strong>Location:</strong> {donation.location}</p>
      <p><strong>Status:</strong> {donation.status}</p>
    </div>
  );
};

export default DonationDetails;
