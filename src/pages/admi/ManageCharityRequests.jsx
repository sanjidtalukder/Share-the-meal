import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageCharityRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/charity-requests/approved")
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
      <h2 className="text-2xl font-bold mb-4">Approved Charity Requests</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Charity Name</th>
            <th className="p-2 border">Organization</th>
            <th className="p-2 border">Mission</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Txn ID</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={req._id}>
              <td className="p-2 border text-center">{index + 1}</td>
              <td className="p-2 border text-center">
                <img
                  src={req.userImage || "https://i.ibb.co/FkbR8b5D/x0165u0t4ad10d31d576186ml3rwr24r.webp"}
                  alt={req.name}
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>
              <td className="p-2 border text-center">{req.name}</td>
              <td className="p-2 border text-center">{req.organization}</td>
              <td className="p-2 border text-center text-sm">{req.mission}</td>
              <td className="p-2 border text-center">{req.email}</td>
              <td className="p-2 border text-center text-xs">{req.transactionId}</td>
              <td className="p-2 border text-center">
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
              <td colSpan={8} className="text-center p-4">
                No approved charity requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCharityRequests;
