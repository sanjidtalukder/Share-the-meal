import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyDonations = ({ user }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios.get(`/api/donations?email=${user.email}`)
        .then(res => {
          // if it is array then it is set if not fallback
          const data = Array.isArray(res.data) ? res.data
                     : Array.isArray(res.data.data) ? res.data.data
                     : [];
          setDonations(data);
        })
        .catch(err => {
          console.error("Failed to load donations:", err);
          setDonations([]); // fallback to empty
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/donations/${id}`);
      setDonations(prev => prev.filter(d => d._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p className="p-4">Loading donations...</p>;
  if (!Array.isArray(donations) || donations.length === 0)
    return <p className="p-4">No donations found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {donations.map(d => (
        <div key={d._id} className="p-4 shadow rounded bg-white">
          <img src={d.image} alt={d.title} className="h-32 w-full object-cover rounded" />
          <h3 className="text-lg font-semibold mt-2">{d.title}</h3>
          <p>{d.type} - {d.quantity}</p>
          <p className="text-sm">Status: <span className="font-medium">{d.status}</span></p>
          <div className="mt-2 flex gap-2">
            {d.status !== "Rejected" && (
              <button
                onClick={() => navigate(`/dashboard/restaurant/update/${d._id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            )}
            <button
              onClick={() => handleDelete(d._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyDonations;
