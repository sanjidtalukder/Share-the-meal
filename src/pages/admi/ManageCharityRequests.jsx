import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageCharityRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/requests")
      .then(res => setRequests(res.data));
  }, []);

  const deleteRequest = async (id) => {
    await axios.delete(`http://localhost:5000/api/requests/${id}`);
    toast.error("Request deleted");
    setRequests(prev => prev.filter(r => r._id !== id));
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Charity Requests</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2">Donation</th>
            <th className="p-2">Charity Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id}>
              <td className="p-2">{req.donationTitle}</td>
              <td className="p-2">{req.charityName}</td>
              <td className="p-2">{req.charityEmail}</td>
              <td className="p-2">{req.description}</td>
              <td className="p-2">
                <button onClick={() => deleteRequest(req._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCharityRequests;
