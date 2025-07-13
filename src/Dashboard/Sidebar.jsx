import { Link, NavLink } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import {
  FaUserCircle,
  FaHandsHelping,
  FaHeart,
  FaStar,
  FaMoneyCheckAlt,
  FaUtensils,
  FaPlusCircle,
  FaClipboardList,
  FaBoxes,
  FaChartLine,
} from "react-icons/fa";

const Sidebar = () => {
  const [role, isLoading] = useUserRole();

  if (isLoading) return <div className="p-4">Loading Sidebar...</div>;
   console.log("ROLE:", role);

  return (
    <div className="w-64 bg-green-300 p-4 min-h-screen shadow-lg">
      <h2 className="text-2xl font-extrabold text-white mb-6 text-center">Dashboard</h2>

      <Link
        to="/"
        className="block text-center mb-6 px-4 py-2 bg-white text-black rounded-lg shadow hover:bg-gray-100 font-semibold transition duration-200"
      >
        ⬅ Back to Home
      </Link>

      {/* User Panel */}
      {role === "user" && (
        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
          <h1 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
            <FaUserCircle /> User Panel
          </h1>
          <NavLink to="/dashboard/my-profile" className="flex items-center gap-2 hover:underline">
            <FaUserCircle /> My Profile
          </NavLink>
          <NavLink to="/dashboard/request-charity-role" className="flex items-center gap-2 hover:underline">
            <FaHandsHelping /> Request Charity
          </NavLink>
          <NavLink to="/dashboard/favorites" className="flex items-center gap-2 hover:underline">
            <FaHeart /> Favorites
          </NavLink>
          <NavLink to="/dashboard/my-reviews" className="flex items-center gap-2 hover:underline">
            <FaStar /> My Reviews
          </NavLink>
          <NavLink to="/dashboard/my-transactions" className="flex items-center gap-2 hover:underline">
            <FaMoneyCheckAlt /> Transaction History
          </NavLink>
        </div>
      )}

      {/* Restaurant Panel */}
      {role === "restaurant" && (
        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
          <h1 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
            <FaUtensils /> Restaurant Panel
          </h1>
          <NavLink to="/dashboard/restaurant-profile" className="flex items-center gap-2 hover:underline">
            <FaUserCircle /> Restaurant Profile
          </NavLink>
          <NavLink to="/dashboard/add-donation" className="flex items-center gap-2 hover:underline">
            <FaPlusCircle /> Add Donation
          </NavLink>
          <NavLink to="/dashboard/my-donations" className="flex items-center gap-2 hover:underline">
            <FaClipboardList /> My Donations
          </NavLink>
          <NavLink to="/dashboard/requestedDonatins" className="flex items-center gap-2 hover:underline">
            <FaBoxes /> Requested Donations
          </NavLink>
        </div>
      )}

      {/* Charity Panel */}
      {role === "charity" && (
        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
          <h1 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
            🎗 Charity Panel
          </h1>
          <NavLink to="/dashboard/charity-profile" className="flex items-center gap-2 hover:underline">
            <FaUserCircle /> Charity Profile
          </NavLink>
          <NavLink to="/dashboard/my-requests" className="flex items-center gap-2 hover:underline">
            <FaClipboardList /> My Requests
          </NavLink>
          <NavLink to="/dashboard/my-pickups" className="flex items-center gap-2 hover:underline">
            <FaBoxes /> My Pickups
          </NavLink>
          <NavLink to="/dashboard/received-donations" className="flex items-center gap-2 hover:underline">
            <FaHandsHelping /> Received Donations
          </NavLink>
          <NavLink to="/dashboard/my-charity-transactions" className="flex items-center gap-2 hover:underline">
            <FaChartLine /> Transaction History
          </NavLink>
        </div>
      )}

      {/* Admin Panel */}
      {role === "admin" && (
        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
          <h1 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
            🛠️ Admin Panel
          </h1>
          <NavLink to="/dashboard/admin-profile" className="flex items-center gap-2 hover:underline">
            <FaUserCircle /> Admin Profile
          </NavLink>
          <NavLink to="/dashboard/manage-donations" className="flex items-center gap-2 hover:underline">
            <FaClipboardList /> Manage Donations
          </NavLink>
          <NavLink to="/dashboard/manage-users" className="flex items-center gap-2 hover:underline">
            <FaUserCircle /> Manage Users
          </NavLink>
          <NavLink to="/dashboard/manage-role-requests" className="flex items-center gap-2 hover:underline">
            <FaHandsHelping /> Role Requests
          </NavLink>
          <NavLink to="/dashboard/manage-requests" className="flex items-center gap-2 hover:underline">
            <FaBoxes /> Manage Requests
          </NavLink>
          <NavLink to="/dashboard/feature-donations" className="flex items-center gap-2 hover:underline">
            <FaStar /> Feature Donations
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
