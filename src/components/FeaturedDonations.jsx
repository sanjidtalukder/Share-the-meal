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
        const res = await axios.get(
          "https://share-the-meal-server.onrender.com/api/donations",
          token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {}
        );

        console.log("✅ Donations fetched:", res.data);
        setDonations(res.data);
      } catch (error) {
        console.error("❌ Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, [token]);

  // Demo data to show when user is not logged in
  const demoDonations = [
    {
      _id: "demo1",
      title: "Fresh Pasta Lunch",
      image: "https://iowagirleats.com/wp-content/uploads/2023/01/Pasta-Fresca-iowagirleats-01.jpg",
      restaurant: {
        name: "Mama's Italian Kitchen",
        location: "Downtown"
      },
      status: "Verified",
      isDemo: true
    },
    {
      _id: "demo2",
      title: "Vegetarian Buffet",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      restaurant: {
        name: "Green Leaf Cafe",
        location: "West End"
      },
      status: "Pending",
      isDemo: true
    },
    {
      _id: "demo3",
      title: "Bakery Surplus",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
      restaurant: {
        name: "Sweet Treats Bakery",
        location: "East Side"
      },
      status: "Verified",
      isDemo: true
    },
    {
      _id: "demo4",
      title: "Sandwich Platters",
      image: "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=400&h=300&fit=crop",
      restaurant: {
        name: "Sub Central",
        location: "City Center"
      },
      status: "Verified",
      isDemo: true
    }
  ];

  // Use demo data if no token (user not logged in) or if donations array is empty
  const displayDonations = token && donations.length > 0 ? donations.slice(0, 4) : demoDonations;

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Donations</h2>
      
      {!token && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-blue-800">
            🔒 These are sample donations. <Link to="/login" className="font-semibold underline">Log in</Link> to see real donations and help reduce food waste!
          </p>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayDonations.map((donation) => (
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
              <p>
                {donation.restaurant?.name}, {donation.restaurant?.location}
              </p>
              <p
                className={`font-medium ${
                  donation.status === "Verified" ? "text-green-600" : "text-gray-500"
                }`}
              >
                {donation.status}
              </p>
              <div className="card-actions justify-end">
                {donation.isDemo ? (
                  <Link to="/login">
                    <button className="btn btn-outline btn-sm">Log In to View</button>
                  </Link>
                ) : (
                  <Link to={`/donations/${donation._id}`}>
                    <button className="btn btn-outline btn-sm">Details</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDonations;
