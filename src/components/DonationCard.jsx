// src/components/DonationCard.jsx

import React from "react";

const DonationCard = ({ donation }) => {
  const {
    image,
    title,
    restaurantName,
    location,
    charityName,
    status,
  } = donation;

  return (
    <div className="border rounded-xl shadow-md overflow-hidden bg-white">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p><span className="font-semibold">Restaurant:</span> {restaurantName}</p>
        <p><span className="font-semibold">Location:</span> {location}</p>
        {charityName && (
          <p><span className="font-semibold">Charity:</span> {charityName}</p>
        )}
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-white text-sm ${
              status === "Verified"
                ? "bg-green-600"
                : status === "Pending"
                ? "bg-yellow-500"
                : "bg-gray-500"
            }`}
          >
            {status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DonationCard;
