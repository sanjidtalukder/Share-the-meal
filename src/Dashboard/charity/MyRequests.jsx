import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRequests = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    if (user?.email) {
      setLoading(true);
      axios.get(`/api/requests?charityEmail=${user.email}`)
        .then(res => {
          const data = Array.isArray(res.data) ? res.data : res.data.data || [];
          setRequests(data);
        })
        .catch(err => {
          console.error("Error fetching requests:", err);
          setRequests([]);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`/api/requests/${id}`);
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error("Failed to cancel request:", err);
    }
  };

  // Example form submit function
  // const handleSubmit = async (formData) => {
  //   try {
  //     await axios.post('/api/requests', formData);
  //     alert('Request created');
  //     fetchRequests(); // Re-fetch after new request is created
  //   } catch (err) {
  //     alert('Failed to create request');
  //   }
  // };

  if (loading) return <p className="p-4">Loading your requests...</p>;
  if (!requests.length) return <p className="p-4">You haven't made any requests yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {requests.map(r => (
        <div key={r._id} className="p-4 shadow bg-white rounded">
          <h3 className="font-bold text-lg">{r.title}</h3>
          <p>Restaurant: {r.restaurantName}</p>
          <p>Type: {r.type}</p>
          <p>Quantity: {r.quantity}</p>
          <p>Status: <span className="font-semibold">{r.status}</span></p>
          {r.status === "Pending" && (
            <button
              onClick={() => handleCancel(r._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
