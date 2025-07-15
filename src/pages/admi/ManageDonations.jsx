import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageDonations = () => {
  const [donations, setDonations] = useState([]);

 useEffect(() => {
  axios.get("http://localhost:5000/api/donations?status=Pending")
    .then(res => setDonations(res.data))
    .catch(err => console.error("Failed to fetch donations", err));
}, []);

  const handleVerify = async (id) => {
  try {
    await axios.put(`http://localhost:5000/api/donations/verify/${id}`);
    toast.success("Donation verified!");
    setDonations(prev => prev.filter(d => d._id !== id));
  } catch (err) {
    console.error("Verification failed:", err);
    toast.error("Could not verify donation.");
  }
};

  const handleReject = async (id) => {
  try {
    await axios.put(`http://localhost:5000/api/donations/reject/${id}`);
    toast.error("Donation rejected.");
    setDonations(prev => prev.filter(d => d._id !== id));
  } catch (err) {
    console.error("Rejection failed", err);
    toast.error("Error rejecting donation");
  }
};

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Donations</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Food Type</th>
            <th className="p-2">Restaurant</th>
            <th className="p-2">Email</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(donation => (
            <tr key={donation._id} className="border-t">
              <td className="p-2">{donation.title}</td>
              <td className="p-2">{donation.foodType}</td>
<td className="p-2">{donation.restaurant?.name}</td>
<td className="p-2">{donation.restaurant?.email}</td>

              <td className="p-2">{donation.quantity}</td>
              <td className="p-2">{donation.status}</td>
              <td className="p-2 space-x-2">
                {donation.status === "Pending" && (
                  <>
                    <button onClick={() => handleVerify(donation._id)} className="bg-green-500 text-white px-2 py-1 rounded">Verify</button>
                    <button onClick={() => handleReject(donation._id)} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
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

export default ManageDonations;
