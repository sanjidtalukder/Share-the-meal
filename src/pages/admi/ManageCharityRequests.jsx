import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageCharityRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/requests")
      .then(res => setRequests(res.data))
      .catch(() => setRequests([]));
  }, []);

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/requests/${id}`);
      toast.success("Request deleted");
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      toast.error("Failed to delete request");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Charity Requests</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">Donation</th>
            <th className="p-2 border border-gray-300">Charity Name</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id} className="border border-gray-300">
              <td className="p-2 border border-gray-300">{req.donationTitle}</td>
              <td className="p-2 border border-gray-300">{req.charityName}</td>
              <td className="p-2 border border-gray-300">{req.charityEmail}</td>
              <td className="p-2 border border-gray-300">{req.description}</td>
              <td className="p-2 border border-gray-300">
                <button
                  onClick={() => deleteRequest(req._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No charity requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCharityRequests;
