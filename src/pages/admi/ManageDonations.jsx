import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";

const ManageDonations = () => {
  const { token } = useContext(AuthContext); // 🔐 token আনলাম
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!token) return;

      console.log("Using token:", token);

    axios
      .get("http://localhost:5000/api/donations?status=Pending", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDonations(res.data))
      .catch((err) => {
        console.error("Failed to fetch donations", err);
        toast.error("Failed to load donations");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleVerify = async (id) => {
    try {
      setProcessingId(id);
      await axios.put(`http://localhost:5000/api/donations/verify/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Donation verified!");
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Verification failed:", err);
      toast.error("Could not verify donation.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setProcessingId(id);
      await axios.put(`http://localhost:5000/api/donations/reject/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.error("Donation rejected.");
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Rejection failed", err);
      toast.error("Error rejecting donation");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📦 Manage Pending Donations</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading donations...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">Title</th>
                <th className="p-3">Food Type</th>
                <th className="p-3">Restaurant</th>
                <th className="p-3">Email</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No pending donations found.
                  </td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-gray-50">
                    <td className="p-3">{donation.title}</td>
                    <td className="p-3">{donation.foodType}</td>
                    <td className="p-3">{donation.restaurant?.name}</td>
                    <td className="p-3">{donation.restaurant?.email}</td>
                    <td className="p-3">{donation.quantity}</td>
                    <td className="p-3">
                      <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-medium">
                        {donation.status}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      {donation.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleVerify(donation._id)}
                            disabled={processingId === donation._id}
                            className={`px-3 py-1 rounded text-white font-medium transition ${
                              processingId === donation._id
                                ? "bg-green-300 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {processingId === donation._id ? "Verifying..." : "Verify"}
                          </button>
                          <button
                            onClick={() => handleReject(donation._id)}
                            disabled={processingId === donation._id}
                            className={`px-3 py-1 rounded text-white font-medium transition ${
                              processingId === donation._id
                                ? "bg-red-300 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                          >
                            {processingId === donation._id ? "Rejecting..." : "Reject"}
                          </button>
                        </>
                      )}
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

export default ManageDonations;
