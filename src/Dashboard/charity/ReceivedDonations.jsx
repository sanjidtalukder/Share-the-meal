import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { FaUtensils, FaMapMarkerAlt, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';

const ReceivedDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(user)

  useEffect(() => {
    
    if (user?.email) {
      // Fetch received donations
      axios.get(`http://localhost:5000/api/requests/received?charityId=${user._id}`)
        .then(res => {
          setDonations(Array.isArray(res.data) ? res.data : []);
        })
        .catch(error => {
          console.error("❌ Failed to fetch donations:", error);
          setDonations([]);
        });

      // Fetch payment records
      axios.get(`http://localhost:5000/api/donation-payments?email=${user.email}`)
        .then(res => {
          setPayments(Array.isArray(res.data) ? res.data : []);
        })
        .catch(error => {
          console.error("❌ Failed to fetch payments:", error);
          setPayments([]);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user?.email || loading) {
    return <div className="p-6 text-center text-gray-500 text-lg">⏳ Loading received donations...</div>;
  }

  if (!donations.length) {
    return <div className="p-6 text-center text-gray-500 text-lg">😔 No donations received yet.</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {donations.map(donation => {
        const matchingPayment = payments.find(payment =>
          String(payment.charityId) === String(donation.donationId) ||
          String(payment.charityId) === String(donation._id)
        );

        return (
          <div key={donation._id} className="bg-white border border-gray-200 shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold text-indigo-700 mb-2">{donation.title}</h2>

            <div className="space-y-1 text-gray-700 text-sm">
              <p><FaUtensils className="inline text-indigo-500 mr-1" /> <span className="font-semibold">Type:</span> {donation.type}</p>
              <p><FaMapMarkerAlt className="inline text-green-600 mr-1" /> <span className="font-semibold">Restaurant:</span> {donation.restaurantName}</p>
              <p><span className="font-semibold">Quantity:</span> {donation.quantity}</p>
              <p><FaCalendarAlt className="inline text-orange-500 mr-1" /> <span className="font-semibold">Picked Up:</span> {new Date(donation.pickedUpAt).toLocaleDateString()}</p>
            </div>

            {matchingPayment ? (
              <div className="mt-4 bg-green-100 border border-green-300 rounded-xl p-4 text-green-800">
                <p><FaDollarSign className="inline mr-1" /> <strong>Donation Paid:</strong> ${matchingPayment.amount}</p>
                <p><span className="font-semibold">Txn ID:</span> {matchingPayment.transactionId}</p>
              </div>
            ) : (
              <p className="mt-3 italic text-sm text-gray-500">No payment record found for this donation.</p>
            )}

            <div className="mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-sm transition duration-300">
                ✍️ Leave a Review
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReceivedDonations;
