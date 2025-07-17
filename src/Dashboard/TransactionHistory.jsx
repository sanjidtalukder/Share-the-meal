import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://share-the-meal-server-blond.vercel.app/api/transactions/charity?email=${user.email}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTransactions(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setTransactions([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch transactions:", err);
        setTransactions([]);
      });
  }, [user?.email]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Transaction History</h2>

      {transactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found.</div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx._id || tx.txnId}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-700">Transaction ID:</h3>
                <span className="text-blue-600 font-mono text-sm">
                  {tx.txnId || tx.transactionId || "N/A"}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div>
                  <span className="block font-medium">Amount</span>
                  <span className="text-green-600 font-bold">${tx.amount}</span>
                </div>
                <div>
                  <span className="block font-medium">Date</span>
                  <span>{new Date(tx.createdAt || tx.date).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="block font-medium">Email</span>
                  <span className="text-xs">{tx.email}</span>
                </div>
                <div>
                  <span className="block font-medium">Status</span>
                  <span
                    className={`inline-block px-2 py-1 rounded text-white text-xs font-semibold
                      ${
                        tx.status === "Succeeded"
                          ? "bg-green-500"
                          : tx.status === "Failed"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
