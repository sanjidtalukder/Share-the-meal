import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const ReceivedDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`/api/requests/received?charityEmail=${user.email}`)
        .then(res => {
          const data = Array.isArray(res.data) ? res.data : [];
          setDonations(data);
        })
        .catch(error => {
          console.error("Failed to fetch donations:", error);
          setDonations([]); // fallback to empty array
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user?.email || loading) {
    return <div className="p-4">Loading received donations...</div>;
  }

  if (!donations.length) {
    return <div className="p-4">No donations received yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {donations.map(d => (
        <div key={d._id} className="p-4 shadow bg-white rounded">
          <h3>{d.title}</h3>
          <p>Restaurant: {d.restaurantName}</p>
          <p>Type: {d.type}</p>
          <p>Quantity: {d.quantity}</p>
          <p>Picked Up On: {new Date(d.pickupDate).toLocaleDateString()}</p>
          <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
            Review
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReceivedDonations;
