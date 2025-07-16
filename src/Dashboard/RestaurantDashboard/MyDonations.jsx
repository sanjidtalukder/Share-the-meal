import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';

const MyDonations = () => {
  const { user, token } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (user?.email && token) {
      axios.get(`http://localhost:5000/api/donations?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log("✅ API Response:", res.data);
        setDonations(res.data);
      })
      .catch(err => {
        console.error("❌ API error:", err);
      });
    }
  }, [user, token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Donations</h2>
      {donations.length === 0 ? (
        <p>No donation groups found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {donations.map((d) => (
            <div key={d._id} className=" border-2 border-green-600 p-4 rounded shadow bg-white">
              <img src={d.image} alt={d.title} className="h-32 w-full object-cover rounded" />
              <h3 className="font-bold mt-2">{d.title}</h3>
              <p>{d.description}</p>
              <p><strong>Status:</strong> {d.status}</p>
              <p><strong>Pickup Time:</strong> {d.pickupTime}</p>
              <p><strong>Quantity:</strong> {d.quantity}</p>
              <p><strong>Restaurant Location:</strong> {d.restaurant?.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;
