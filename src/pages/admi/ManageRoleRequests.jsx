import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageRoleRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/charity-requests")
      .then(res => setRequests(res.data));
  }, []);

  const handleAction = async (id, action) => {
    await axios.patch(`http://localhost:5000/api/charity-requests/${id}/${action}`);
    toast.success(`Request ${action}ed`);
    setRequests(prev => prev.filter(r => r._id !== id));
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Role Requests</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2">User</th>
            <th className="p-2">Email</th>
            <th className="p-2">Org Name</th>
            <th className="p-2">Mission</th>
            <th className="p-2">Txn ID</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id}>
              <td className="p-2">{req.name}</td>
              <td className="p-2">{req.email}</td>
              <td className="p-2">{req.orgName}</td>
              <td className="p-2">{req.mission}</td>
              <td className="p-2">{req.transactionId}</td>
              <td className="p-2">{req.status}</td>
              <td className="p-2 space-x-2">
                {req.status === "Pending" && (
                  <>
                    <button onClick={() => handleAction(req._id, "approve")} className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                    <button onClick={() => handleAction(req._id, "reject")} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                  </>
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
