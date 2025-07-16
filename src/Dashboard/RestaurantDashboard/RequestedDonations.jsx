import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const RequestDonations = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/requestDonations");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    await axios.post(`http://localhost:5000/api/requestDonations/${id}/accept`);
    fetchRequests();
  };

  const handleReject = async (id) => {
    await axios.post(`http://localhost:5000/api/requestDonations/${id}/reject`);
    fetchRequests();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Requested Donations</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Donation Title",
                "Food Type",
                "Charity Name",
                "Charity Email",
                "Request Description",
                "Pickup Time",
                "Status",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400 italic">
                  No donation requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-semibold max-w-xs truncate">
                    {req.donationTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{req.foodType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{req.charityName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 underline">
                    <a href={`mailto:${req.charityEmail}`}>{req.charityEmail}</a>
                  </td>
                  <td className="px-6 py-4 max-w-sm whitespace-normal text-gray-600">{req.requestDescription}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(req.pickupTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    {req.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleAccept(req._id)}
                          className="inline-flex items-center px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition"
                          title="Accept Request"
                        >
                          <FaCheckCircle className="mr-1" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="inline-flex items-center px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
                          title="Reject Request"
                        >
                          <FaTimesCircle className="mr-1" />
                          Reject
                        </button>
                      </>
                    ) : req.status === "Accepted" ? (
                      <span className="text-green-700 font-semibold">Pickup confirmation available</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestDonations;
