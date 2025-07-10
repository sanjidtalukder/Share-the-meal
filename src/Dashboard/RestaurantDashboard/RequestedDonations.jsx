import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestedDonations = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`/api/requests?restaurant=${user.email}`)
        .then(res => setRequests(Array.isArray(res.data) ? res.data : []))
        .catch(err => {
          console.error("Error loading requests:", err);
          setRequests([]);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleAccept = async (request) => {
    try {
      await axios.put(`/api/requests/${request._id}`, { status: 'Accepted' });
      await axios.put(`/api/requests/reject-others/${request.donationId}`, {
        exclude: request._id
      });
      const updated = await axios.get(`/api/requests?restaurant=${user.email}`);
      setRequests(Array.isArray(updated.data) ? updated.data : []);
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`/api/requests/${id}`, { status: 'Rejected' });
      setRequests(prev => prev.map(req => req._id === id ? { ...req, status: 'Rejected' } : req));
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  if (loading) return <p className="p-4">Loading requests...</p>;
  if (requests.length === 0) return <p className="p-4">No requests found.</p>;

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Title</th><th>Type</th><th>Charity</th><th>Email</th>
          <th>Description</th><th>Pickup Time</th><th>Status</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(req => (
          <tr key={req._id}>
            <td>{req.title}</td>
            <td>{req.type}</td>
            <td>{req.charityName}</td>
            <td>{req.charityEmail}</td>
            <td>{req.description}</td>
            <td>{req.pickupTime}</td>
            <td>{req.status}</td>
            <td>
              {req.status === "Pending" && (
                <>
                  <button onClick={() => handleAccept(req)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Accept</button>
                  <button onClick={() => handleReject(req._id)} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestedDonations;
