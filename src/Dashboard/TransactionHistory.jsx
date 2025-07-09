import { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("/api/transactions")
      .then(res => {
        // Check if response is an array
        if (Array.isArray(res.data)) {
          setTransactions(res.data);
        } else if (res.data?.transactions && Array.isArray(res.data.transactions)) {
          setTransactions(res.data.transactions);
        } else {
          console.error("Unexpected response format:", res.data);
          setTransactions([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch transactions:", err);
        setTransactions([]);
      });
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map(tx => (
              <tr key={tx._id || tx.transactionId}>
                <td>{tx.transactionId || "N/A"}</td>
                <td>${tx.amount}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>{tx.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-500">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
