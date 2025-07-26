// RestaurantProfile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const RestaurantProfile = () => {
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    if (user?.email) {
      console.log("🔍 Fetching restaurant profile for:", user.email);
      axios
        .get(`https://share-the-meal-server-sigma.vercel.app/api/restaurant/${user.email}`)
        .then((res) => {
          console.log("✅ Profile Loaded:", res.data);
          setRestaurant(res.data);
        })
        .catch((err) => {
          console.error("❌ Error loading restaurant profile:", err);
        });
    }
  }, [user?.email]);

  if (!restaurant) return <p className="text-center mt-8">Loading Profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-8 p-4 shadow-lg rounded-lg border bg-white">
      <img
        src={restaurant.image || restaurant.photo}
        alt="Restaurant"
        className="w-32 h-32 object-cover rounded-full mx-auto"
      />
      <h2 className="text-xl font-bold text-center mt-4">{restaurant.name}</h2>
      <p className="text-center text-sm text-gray-600">Role: {restaurant.role}</p>
      {restaurant.address && <p className="text-center mt-2">📍 Address: {restaurant.address}</p>}
      {restaurant.contact && <p className="text-center">📞 Contact: {restaurant.contact}</p>}
      {restaurant.createdAt && (
        <p className="text-center text-xs text-gray-500">
          Registered on: {new Date(restaurant.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default RestaurantProfile;
