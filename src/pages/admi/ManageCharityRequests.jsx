import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const ManageCharityRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const { token } = useContext(AuthContext); //  token from context

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      if (!token) {
        toast.error("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("https://share-the-meal-server-blond.vercel.app/api/charity-requests/approved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch charity requests:", error.response?.data || error.message);
        toast.error("Failed to load charity requests");
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedRequests();
  }, [token]);

  const deleteRequest = async (id) => {
    try {
      setDeletingId(id);
      await axios.delete(`https://share-the-meal-server-blond.vercel.app/api/requests/${id}`);
      toast.success("Request deleted");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      toast.error("Failed to delete request");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🎗 Approved Charity Requests</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">#</th>
                <th className="p-3">Image</th>
                <th className="p-3">Charity Name</th>
                <th className="p-3">Organization</th>
                <th className="p-3">Mission</th>
                <th className="p-3">Email</th>
                <th className="p-3">Txn ID</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
                    No approved charity requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req, index) => (
                  <tr key={req._id} className="hover:bg-gray-50">
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3">
                      <img
                        src={
                          req.userImage ||
                          "https://i.ibb.co/FkbR8b5D/x0165u0t4ad10d31d576186ml3rwr24r.webp"
                        }
                        alt={req.name}
                        className="w-10 h-10 rounded-full mx-auto border object-cover"
                      />
                    </td>
                    <td className="p-3">{req.name}</td>
                    <td className="p-3">{req.organization}</td>
                    <td className="p-3 text-gray-600 text-sm">{req.mission}</td>
                    <td className="p-3">{req.email}</td>
                    <td className="p-3 text-xs">{req.transactionId}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteRequest(req._id)}
                        disabled={deletingId === req._id}
                        className={`px-4 py-1 rounded-md text-white font-medium transition ${
                          deletingId === req._id
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {deletingId === req._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCharityRequests;
