import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import RequestCharityRole from "../Dashboard/RequestCharityRole";
import DonationModal from "./Modals/DonationModal";
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import loadingAnimation from "../../src/assets/Loading Files.json";
import { AuthContext } from "../providers/AuthProvider";



const LatestCharityRequests = () => {
  const { user } = useContext(AuthContext);
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [requestTargetCharity, setRequestTargetCharity] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("❌ User not logged in");
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          "https://share-the-meal-server-blond.vercel.app/api/charity-requests/approved",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const charitiesData = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        setCharities(charitiesData);
      } catch (err) {
        console.error("❌ Error fetching approved charity requests:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const openDonationModal = (charity) => {
    setSelectedCharity(charity);
    setShowDonationModal(true);
  };

  const closeDonationModal = () => {
    setShowDonationModal(false);
    setSelectedCharity(null);
  };

  const openRequestPopup = (charity) => {
    setRequestTargetCharity(charity);
    setShowRequestPopup(true);
  };

  const closeRequestPopup = () => {
    setRequestTargetCharity(null);
    setShowRequestPopup(false);
  };

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

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : (
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
                <h3 className="text-2xl font-semibold text-gray-900">
                  {req.name}
                </h3>
                <p className="text-green-600 font-semibold mt-1">
                  {req.organization}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => openDonationModal(req)}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Donate
                  </button>

                  <button
                    onClick={() => openRequestPopup(req)}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Request
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 text-lg mt-12">
              No charity requests found.
            </p>
          )}
        </div>
      )}

      {/* Request Role Button */}
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

      {/* Role Request Modal */}
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
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Request Charity Role
            </h3>
            <RequestCharityRole />
          </div>
        </div>
      )}

      {/* Donation Modal */}
      {showDonationModal && selectedCharity && (
        <DonationModal
          charity={selectedCharity}
          onClose={closeDonationModal}
        />
      )}

      {/* New Request Modal */}
      {showRequestPopup && requestTargetCharity && (
        <div
          id="request-popup-backdrop"
          onClick={(e) => {
            if (e.target.id === "request-popup-backdrop") {
              closeRequestPopup();
            }
          }}
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
            <button
              onClick={closeRequestPopup}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Send Request to {requestTargetCharity.name}
            </h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const message = form.message.value;

                try {
                  const res = await axios.post(
                  "https://share-the-meal-server-blond.vercel.app/api/charity-requests/message"
,
                    {
                      name: user.displayName,
                      email: user.email,
                      message,
                    }
                  );

                  if (res.data?.success) {
                    toast.success(" Request sent successfully!");
                    closeRequestPopup();
                    form.reset();
                  } else {
                    toast.error(" Failed to send request");
                  }
                } catch (err) {
                  console.error(" Failed to send request", err);
                  toast.error(" Server Error");
                }
              }}
            >
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded p-3 focus:outline-green-500"
                required
              ></textarea>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestCharityRequests;
