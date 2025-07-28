import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const DonationDetails = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://share-the-meal-server.onrender.com/api/donations/${id}`)
      .then((res) => {
        setDonation(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch donation details", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (!donation) return <p className="text-center text-red-500 mt-10">Donation not found.</p>;

  const {
    image,
    title,
    description,
    quantity,
    pickupTime,
    status,
    restaurant: { name: restaurantName, location },
    assignedCharity,
  } = donation;

  const handleSaveFavorite = async () => {
  if (!user) return alert("Please login first.");

  try {
    await axios.post("https://share-the-meal-server.onrender.com/api/favorites", {
      userEmail: user.email,
      donationId: id,
      title: donation.title,
      image: donation.image,
      restaurant: {
        name: restaurantName,
        location: location,
      },
    });

    alert("Added to favorites!");
  } catch (error) {
    if (error.response?.status === 409) {
      alert("Already in favorites.");
    } else {
      console.error("Error saving favorite:", error);
      alert("Failed to save favorite.");
    }
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
      />

      {/* Title */}
      <h2 className="text-3xl font-bold text-green-700 mb-4">{title}</h2>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-4 text-base text-gray-700">
        <p>
          <span className="font-semibold text-gray-800">Description:</span>{" "}
          {description}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Quantity:</span> {quantity}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Pickup Time:</span> {pickupTime}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Restaurant:</span>{" "}
          {restaurantName} ({location})
        </p>
        {assignedCharity?.name && (
          <p>
            <span className="font-semibold text-gray-800">Assigned Charity:</span>{" "}
            {assignedCharity.name}
          </p>
        )}
        <p>
          <span className="font-semibold text-gray-800">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-white text-sm font-medium ${
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
      </div>

      {/* Divider */}
      <hr className="my-6 border-t border-gray-300" />

      {/* Buttons Placeholder */}
      <div className="flex flex-wrap gap-4 justify-center mt-4">
       <button
  onClick={handleSaveFavorite}
  className="btn bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
>
  Save to Favorites
</button>

        {user?.role === "charity" && status === "Available" && (
          <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg">
            Request Donation
          </button>
        )}
        {user?.role === "charity" && status === "Accepted" && (
          <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
            Confirm Pickup
          </button>
        )}
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Reviews</h3>
        <p className="text-gray-500 italic">
          (Reviews functionality coming soon)
        </p>
      </div>
    </div>
  );
};

export default DonationDetails;
