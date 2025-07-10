import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FeatureDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/donations/verified")
      .then(res => setDonations(res.data));
  }, []);

  const handleFeature = async (id) => {
    await axios.post(`http://localhost:5000/api/featured`, { donationId: id });
    toast.success("Donation featured!");
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Feature Donations</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2">Image</th>
            <th className="p-2">Title</th>
            <th className="p-2">Food Type</th>
            <th className="p-2">Restaurant</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(d => (
            <tr key={d._id}>
              <td className="p-2">
                <img src={d.image} className="w-16 h-16 object-cover" />
              </td>
              <td className="p-2">{d.title}</td>
              <td className="p-2">{d.foodType}</td>
              <td className="p-2">{d.restaurantName}</td>
              <td className="p-2">
                <button onClick={() => handleFeature(d._id)} className="bg-blue-500 text-white px-2 py-1 rounded">Feature</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureDonations;
