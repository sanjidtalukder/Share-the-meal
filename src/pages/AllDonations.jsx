import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DonationCard from "../components/DonationCard";
import { getAuth } from "firebase/auth";

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 6;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          toast.error("Please login to view donations.");
          setLoading(false);
          return;
        }

        const token = await user.getIdToken();

        const res = await axios.get(
          "https://share-the-meal-server-blond.vercel.app/api/donations?status=Verified",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Verified Donations:", res.data);

        setDonations(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching donations", err);
        toast.error("Unauthorized or error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Pagination Logic
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(donations.length / donationsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 max-w-6xl min-h-screen mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Donations</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : donations.length === 0 ? (
        <p className="text-center text-gray-500">No verified donations found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDonations.map((donation) => (
              <DonationCard key={donation._id} donation={donation} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === number + 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllDonations;
