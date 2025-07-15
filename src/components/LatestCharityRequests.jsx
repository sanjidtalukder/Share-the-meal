import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestCharityRequests = () => {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    const fetchApprovedCharities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/charity-requests/approved");
        setCharities(res.data);
      } catch (error) {
        console.error("Error fetching approved charity requests:", error);
      }
    };

    fetchApprovedCharities();
  }, []);

  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Charity Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {charities.map((req) => (
          <div key={req._id} className="bg-white shadow-lg rounded-xl p-6 text-center">
            <img
              src={
                req.userImage ||
                "https://i.ibb.co/FkbR8b5D/x0165u0t4ad10d31d576186ml3rwr24r.webp"
              }
              alt={req.name}
              className="h-16 w-16 object-cover rounded-full mx-auto mb-4 border"
            />
            <h3 className="text-xl font-semibold text-gray-800">{req.name}</h3>
            <p className="text-blue-600 font-medium mt-1">{req.organization}</p>
            <p className="text-sm text-gray-600 mt-2">{req.mission}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCharityRequests;
