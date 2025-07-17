import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


const DonationCard = ({ donation }) => {
  const {
    _id,
    image,
    title,
    charityName,
    status,
    restaurant,
  } = donation;

  const { user, userRole, currentUser } = useContext(AuthContext);

  const restaurantName = restaurant?.name || "Unknown";
  const location = restaurant?.location || "Unknown";

  const handlePickupClick = () => {
    if (userRole === "charity") {
      handlePickup(_id);
    } else {
      alert("Only charity users can pick up. Please request a charity organization.");
    }
  };

  const handlePickup = async (donationId) => {
    try {
      const response = await fetch(`/api/donations/${donationId}/pickup`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ charityId: currentUser?.id }),
      });

      if (response.ok) {
        alert("Pickup confirmed!");
        // Optionally refresh UI
      } else {
        console.error("Pickup failed.");
      }
    } catch (error) {
      console.error("Error during pickup:", error);
    }
  };

  return (
    <div className="rounded-xl border-2 border-green-400 overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p><span className="font-semibold">Restaurant:</span> {restaurantName}</p>
        <p><span className="font-semibold">Location:</span> {location}</p>
        {charityName && (
          <p><span className="font-semibold">Charity:</span> {charityName}</p>
        )}
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-white text-sm ${
              status === "Available"
                ? "bg-green-600"
                : status === "Requested"
                ? "bg-yellow-500"
                : status === "Picked Up"
                ? "bg-blue-500"
                : "bg-gray-500"
            }`}
          >
            {status}
          </span>
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <Link
            to={`/donations/${_id}`}
            className="text-sm font-medium text-green-700 hover:text-white hover:bg-green-600 border border-green-600 px-4 py-1.5 rounded transition-all duration-200"
          >
            View Details
          </Link>

          <button
            onClick={handlePickupClick}
            className="text-sm font-medium text-green-700 hover:text-white hover:bg-green-600 border border-green-600 px-4 py-1.5 rounded transition-all duration-200"
          >
            Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
