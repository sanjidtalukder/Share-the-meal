import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FeatureDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuringId, setFeaturingId] = useState(null);

  useEffect(() => {
    axios.get("https://share-the-meal-server-blond.vercel.app/donations?status=Verified")
      .then(res => setDonations(res.data))
      .catch(() => toast.error("Failed to load donations"))
      .finally(() => setLoading(false));
  }, []);

  const handleFeature = async (id) => {
    try {
      setFeaturingId(id);
      await axios.post(`https://share-the-meal-server-blond.vercel.app/api/featured`, { donationId: id });
      toast.success("Donation featured!");
    } catch (err) {
      toast.error("Failed to feature donation");
    } finally {
      setFeaturingId(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">⭐ Feature Donations</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading donations...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-gray-700 bg-gray-100">
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Food Type</th>
                <th className="p-3">Restaurant</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {donations.map(d => (
                <tr key={d._id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <img src={d.image} alt={d.title} className="w-16 h-16 rounded object-cover border" />
                  </td>
                  <td className="p-3 font-semibold">{d.title}</td>
                  <td className="p-3">{d.foodType}</td>
                  <td className="p-3">
                    <div className="text-sm">
                      <p className="font-medium">{d.restaurant?.name || "N/A"}</p>
                      <p className="text-gray-500">{d.restaurant?.location || "Unknown"}</p>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleFeature(d._id)}
                      disabled={featuringId === d._id}
                      className={`px-4 py-1 rounded-lg font-medium ${
                        featuringId === d._id
                          ? "bg-blue-300 cursor-wait"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white transition`}
                    >
                      {featuringId === d._id ? "Featuring..." : "Feature"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeatureDonations;
