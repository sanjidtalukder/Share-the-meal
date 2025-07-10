import { Link } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const Sidebar = () => {
  const [role, isLoading] = useUserRole();

  if (isLoading) return <div className="p-4">Loading Sidebar...</div>;

  return (
    <div className="w-64 bg-green-300 p-4 min-h-screen">
      <h2 className="text-2xl font-extrabold text-white mb-6">Dashboard</h2>

      {/* Back to Home Link */}
      <Link
        to="/"
        className="block text-center mb-6 px-4 py-2 bg-white text-black rounded-lg shadow hover:bg-gray-100 font-semibold transition duration-200"
      >
        ⬅ Back to Home
      </Link>

      {/* User Sidebar */}
      {role === "user" && (
        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
          <h1 className="text-xl font-bold text-green-700 mb-2">👤 User Panel</h1>
          <Link className="block hover:underline" to="/dashboard/my-profile">My Profile</Link>
          <Link className="block hover:underline" to="/dashboard/request-charity-role">Request Charity</Link>
          <Link className="block hover:underline" to="/dashboard/favorites">Favorites</Link>
          <Link className="block hover:underline" to="/dashboard/my-reviews">My Reviews</Link>
          <Link className="block hover:underline" to="/dashboard/my-transactions">Transaction History</Link>
        </div>
      )}

      {/* Restaurant Sidebar */}
      {/* {(role === "restaurant" || !role) && ( */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
          <h1 className="text-xl font-bold text-green-700 mb-2">🍽 Restaurant Panel</h1>
          <Link className="block hover:underline" to="/dashboard/restaurant-profile">Restaurant Profile</Link>
          <Link className="block hover:underline" to="/dashboard/add-donation">Add Donation</Link>
          <Link className="block hover:underline" to="/dashboard/my-donations">My Donations</Link>
          <Link className="block hover:underline" to="/dashboard/requestedDonatins">Requested Donations</Link>
        </div>
      {/* // )} */}

      {/* Charity Sidebar */}
      {/* {(role === "charity" || !role) && ( */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
          <h1 className="text-xl font-bold text-green-700 mb-2">🎗 Charity Panel</h1>
          <Link className="block hover:underline" to="/dashboard/charity-profile">Charity Profile</Link>
          <Link className="block hover:underline" to="/dashboard/my-requests">My Requests</Link>
          <Link className="block hover:underline" to="/dashboard/my-pickups">My Pickups</Link>
          <Link className="block hover:underline" to="/dashboard/received-donations">Received Donations</Link>
          <Link className="block hover:underline" to="/dashboard/my-charity-transactions">Transaction History</Link>
        </div>
      {/* )} */}

      {/* Add more roles like admin here if needed */}
    </div>
  );
};

export default Sidebar;
