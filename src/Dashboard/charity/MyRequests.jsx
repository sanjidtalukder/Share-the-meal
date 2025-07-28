import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";


const MyRequests = () => {
  const { user, loading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    if (!user?.email) return;
    setError(null);

    try {
      const res = await axios.get(`https://share-the-meal-server.onrender.com/api/requests?charityEmail=${user.email}`);
      setRequests(res.data);
    } catch (err) {
      setError("Failed to load requests");
    }
  };

  useEffect(() => {
    if (user?.email) fetchRequests();
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this pending request?")) return;

    try {
      await axios.delete(`https://share-the-meal-server.onrender.com/api/requests/${id}`);
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to cancel request");
    }
  };

  if (loading) return <p>Loading user info...</p>;
  if (!user) return <p className="text-center text-red-600">Please log in to see your requests.</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
 
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">My Donation Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600 italic text-center">No donation requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="border rounded-lg shadow p-4 relative hover:shadow-lg transition"
            >
              <h3 className="font-bold text-xl mb-2 truncate">{req.title || req.donationTitle}</h3>
              <p>
                <strong>Restaurant:</strong> {req.restaurantName || (req.restaurant?.name ?? "Unknown")}
              </p>
              <p>
                <strong>Food Type:</strong> {req.type || req.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {req.quantity ?? "N/A"}
              </p>
              <p className="mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    req.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : req.status === "Accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {req.status}
                </span>
              </p>
              {req.status === "Pending" && (
                <button
                  onClick={() => handleCancel(req._id)}
                  className="absolute top-4 right-4 text-red-600 hover:text-red-800 font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
