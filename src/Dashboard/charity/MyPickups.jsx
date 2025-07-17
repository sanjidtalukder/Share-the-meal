import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const MyPickups = () => {
  const { user, loading } = useContext(AuthContext);
  const [pickups, setPickups] = useState([]);
  const [error, setError] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);

  const fetchPickups = async () => {
    if (!user?.email) return;
    setError(null);
    try {
      const res = await axios.get(`https://share-the-meal-server-blond.vercel.app/api/requests/assigned?charityEmail=${user.email}`);
      setPickups(res.data);
    } catch (err) {
      setError("Failed to load pickups");
    }
  };

  useEffect(() => {
    fetchPickups();
  }, [user]);

  const handleConfirmPickup = async (id) => {
    if (!window.confirm("Confirm pickup for this donation?")) return;

    try {
      setConfirmingId(id);
      await axios.put(`https://share-the-meal-server-blond.vercel.app/api/requests/${id}/confirm-pickup`);
      await fetchPickups();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to confirm pickup");
    } finally {
      setConfirmingId(null);
    }
  };

  if (loading) return <p>Loading user info...</p>;
  if (!user) return <p className="text-center text-red-600">Please log in to see your pickups.</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">My Pickups</h2>

      {pickups.length === 0 ? (
        <p className="text-gray-600 italic text-center">No assigned pickups at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="border rounded-lg shadow p-5 relative hover:shadow-lg transition"
            >
              <h3 className="font-bold text-xl mb-2 truncate">{pickup.title || pickup.donationTitle}</h3>

              <p>
                <strong>Restaurant:</strong> {pickup.restaurant?.name ?? "Unknown"}, {pickup.restaurant?.location ?? ""}
              </p>
              <p><strong>Food Type:</strong> {pickup.type || pickup.foodType}</p>
              <p><strong>Quantity:</strong> {pickup.quantity ?? "N/A"}</p>
              <p><strong>Pickup Time:</strong> {new Date(pickup.pickupTime).toLocaleString()}</p>

              <p className="mt-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    pickup.status === "Accepted"
                      ? "bg-blue-100 text-blue-800"
                      : pickup.status === "Picked Up"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {pickup.status === "Accepted" ? "Assigned" : pickup.status}
                </span>
              </p>

              {pickup.status === "Accepted" && (
                <button
                  onClick={() => handleConfirmPickup(pickup._id)}
                  disabled={confirmingId === pickup._id}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold disabled:opacity-50"
                >
                  <FaCheckCircle />
                  {confirmingId === pickup._id ? "Confirming..." : "Confirm Pickup"}
                </button>
              )}

              {pickup.status === "Picked Up" && (
                <p className="mt-4 text-green-700 font-semibold">Pickup confirmed</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;
