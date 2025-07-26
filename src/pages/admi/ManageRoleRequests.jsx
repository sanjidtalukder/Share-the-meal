import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageRoleRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("https://share-the-meal-server-sigma.vercel.app/api/charity-requests")
      .then(res => setRequests(res.data))
      .catch(err => toast.error("Failed to fetch requests"));
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.patch(`https://share-the-meal-server-sigma.vercel.app/api/charity-requests/${id}/${action}`);
      toast.success(`Request ${action}ed`);
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      toast.error(`Failed to ${action} request`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl overflow-x-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Manage Role Requests</h2>
      
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {["User", "Email", "Org Name", "Mission", "Txn ID", "Status", "Actions"].map((header) => (
              <th
                key={header}
                className="border border-gray-300 text-left px-4 py-3 text-sm font-medium text-gray-600 uppercase tracking-wide"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {requests.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-6 text-gray-500">
                No role requests found.
              </td>
            </tr>
          )}

          {requests.map(req => (
            <tr
              key={req._id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="border border-gray-300 px-4 py-3 text-gray-700">{req.name}</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-700">{req.email}</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-700">{req.organization}</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-700 max-w-xs truncate" title={req.mission}>{req.mission}</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-700">{req.transactionId}</td>
              <td className={`border border-gray-300 px-4 py-3 font-semibold ${
                req.status === "Approved" ? "text-green-600" : 
                req.status === "Rejected" ? "text-red-600" : 
                "text-yellow-600"
              }`}>
                {req.status}
              </td>
              <td className="border border-gray-300 px-4 py-3 space-x-2">
                {req.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleAction(req._id, "approve")}
                      className="bg-green-600 hover:bg-green-700 transition-colors text-white px-3 py-1 rounded-md text-sm font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(req._id, "reject")}
                      className="bg-red-600 hover:bg-red-700 transition-colors text-white px-3 py-1 rounded-md text-sm font-medium"
                    >
                      Reject
                    </button>
                  </>
                )}
                {(req.status === "Approved" || req.status === "Rejected") && (
                  <span className="text-gray-500 italic">{req.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRoleRequests;
