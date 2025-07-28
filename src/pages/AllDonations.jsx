import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
import Lottie from "lottie-react";

import DonationCard from "../components/DonationCard";
import loadingAnimation from "../../src/assets/Loading Files.json";
import noDataAnimation from "../../src/assets/Loading Files.json"; // Optional: For no data state

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const donationsPerPage = 6;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          toast.error("Please login to view donations.");
          return;
        }

        const token = await user.getIdToken(true);
        const res = await axios.get("https://share-the-meal-server.onrender.com/api/donations?status=Verified",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("All donetion data",res.data)

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

  // Filter by search
  const handleSearch = () => {
    setSearchTerm(searchQuery.trim());
    setCurrentPage(1);
  };

  const filteredDonations = donations.filter((donation) => {
    const locationStr =
      typeof donation.location === "string"
        ? donation.location
        // : `${donation.location?.city || ""} ${donation.location?.zip || ""}` ||
          :donation.restaurant?.location ||
          "";

    return locationStr.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Sort
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortOption === "quantity") {
      return Number(b.quantity) - Number(a.quantity);
    }
    if (sortOption === "pickupTime") {
      return new Date(a.pickupTime) - new Date(b.pickupTime);
    }
    return 0;
  });

  // Pagination
  const indexOfLast = currentPage * donationsPerPage;
  const indexOfFirst = indexOfLast - donationsPerPage;
  const currentDonations = sortedDonations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedDonations.length / donationsPerPage);

  const paginate = (page) => setCurrentPage(page);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
        All Verified Donations
      </h1>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div className="flex w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by city or zip code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-grow px-5 py-3 rounded-l-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            aria-label="Search donations by city or zip code"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition"
            aria-label="Search button"
          >
            Search
          </button>
        </div>

        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          aria-label="Sort Donations"
        >
          <option value="">Sort By</option>
          <option value="quantity">Quantity (High to Low)</option>
          <option value="pickupTime">Pickup Time (Soonest First)</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Lottie animationData={loadingAnimation} loop />
        </div>
      ) : sortedDonations.length === 0 ? (
        <div className="flex flex-col items-center mt-20 text-center text-gray-500">
          <Lottie animationData={noDataAnimation} loop className="w-72 h-72" />
          <p className="text-lg mt-4 italic">No verified donations found.</p>
        </div>
      ) : (
        <>
          {/* Donation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentDonations.map((donation) => (
              <DonationCard key={donation._id} donation={donation} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 space-x-3 flex-wrap">
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  currentPage === number + 1
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-green-100"
                }`}
                aria-label={`Go to page ${number + 1}`}
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
