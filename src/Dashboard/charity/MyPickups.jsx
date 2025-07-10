import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyPickups = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`/api/requests/pickups?charityEmail=${user.email}`)
        .then(res => {
          const data = Array.isArray(res.data) ? res.data : res.data.data || [];
          setRequests(data);
        })
        .catch(err => {
          console.error("Error fetching pickup requests:", err);
          setRequests([]);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleConfirm = async (id) => {
    try {
      await axios.put(`/api/requests/${id}/confirm-pickup`);
      const updated = await axios.get(`/api/requests/pickups?charityEmail=${user.email}`);
      setRequests(Array.isArray(updated.data) ? updated.data : updated.data.data || []);
    } catch (err) {
      console.error("Error confirming pickup:", err);
    }
  };

  if (loading) return <p className="p-4">Loading pickups...</p>;
  if (!requests.length) return <p className="p-4">No pickups found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {requests.map(r => (
        <div key={r._id} className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-bold">{r.title}</h3>
          <p><strong>Restaurant:</strong> {r.restaurantName}</p>
          <p><strong>Location:</strong> {r.location}</p>
          <p><strong>Type:</strong> {r.type}</p>
          <p><strong>Quantity:</strong> {r.quantity}</p>
          <p><strong>Pickup Time:</strong> {r.pickupTime}</p>
          <p><strong>Status:</strong> {r.status}</p>
          {r.status === "Accepted" && (
            <button
              onClick={() => handleConfirm(r._id)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Confirm Pickup
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyPickups;
