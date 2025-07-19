import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyCharityTransactions = ({ user }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user?.email) {
     axios.get(`http://localhost:5000/api/transactions/charity?email=${user.email}`)
        .then(res => setTransactions(res.data));
    }
  }, [user]); // dependency user 

  if (!user?.email) {
    return <p className="p-4">Loading user data...</p>;
  }

  return (
    <div className="overflow-x-auto">
      
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Request Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id}>
              <td>{tx.txnId}</td>
              <td>{tx.amount}</td>
              <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
              <td>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCharityTransactions;
