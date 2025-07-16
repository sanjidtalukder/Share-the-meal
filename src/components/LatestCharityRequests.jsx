import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import RequestCharityRole from "../Dashboard/RequestCharityRole";

const LatestCharityRequests = () => {
  const [charities, setCharities] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("❌ User not logged in");
        return;
      }

      try {
        const token = await user.getIdToken();

        const res = await axios.get("http://localhost:5000/api/charity-requests/approved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const charitiesData = Array.isArray(res.data) ? res.data : res.data.data || [];
        setCharities(charitiesData);
      } catch (err) {
        console.error("❌ Error fetching approved charity requests:", err);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      setShowRequestForm(false);
    }
  };

  return (
    <section className="my-12 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-black">
        Latest Charity Requests
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.isArray(charities) && charities.length > 0 ? (
          charities.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center text-center"
            >
              <img
                src={
                  req.userImage ||
                  "https://i.ibb.co/FkbR8b5D/x0165u0t4ad10d31d576186ml3rwr24r.webp"
                }
                alt={req.name}
                className="h-24 w-24 object-cover rounded-full border-4 border-green-300 mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-900">{req.name}</h3>
              <p className="text-green-600 font-semibold mt-1">{req.organization}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 text-lg mt-12">
            No charity requests found.
          </p>
        )}
      </div>

      {/* BUTTON SECTION */}
      <div className="flex justify-center mt-10">
        <div className="bg-green-100 border-2 border-green-500 rounded-lg px-10 py-6 shadow-md w-full max-w-md flex justify-center">
          <button
            onClick={() => setShowRequestForm(true)}
            className="btn text-white bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg focus:ring-4 focus:ring-green-300 transition focus:outline-none"
          >
            Request Charity Role
          </button>
        </div>
      </div>

      {/* Modal */}
      {showRequestForm && (
        <div
          id="modal-backdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
        >
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowRequestForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-center">Request Charity Role</h3>
            <RequestCharityRole />
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestCharityRequests;
