import { Link, NavLink } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import {
  FaHome,
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

  return (
    <div className="w-64 bg-green-300 p-4 min-h-screen shadow-lg">
      <h2 className="text-2xl font-extrabold text-white mb-6 text-center">Dashboard</h2>

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
          <h1 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
            <FaUserCircle /> User Panel
          </h1>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/my-profile">
            <FaUserCircle /> My Profile
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/request-charity-role">
            <FaHandsHelping /> Request Charity
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/favorites">
            <FaHeart /> Favorites
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/my-reviews">
            <FaStar /> My Reviews
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/my-transactions">
            <FaMoneyCheckAlt /> Transaction History
          </NavLink>
        </div>
      )}

      {/* Restaurant Sidebar */}
      {/* {(role === "restaurant" || !role) && ( */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
          <h1 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
            <FaUtensils /> Restaurant Panel
          </h1>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/restaurant-profile">
            <FaUserCircle /> Restaurant Profile
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/add-donation">
            <FaPlusCircle /> Add Donation
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/my-donations">
            <FaClipboardList /> My Donations
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/requestedDonatins">
            <FaBoxes /> Requested Donations
          </NavLink>
        </div>
      {/* )} */}

      {/* Charity Sidebar */}
      {/* {(role === "charity" || !role) && ( */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
          <h1 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
            🎗 Charity Panel
          </h1>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/charity-profile">
            <FaUserCircle /> Charity Profile
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/my-requests">
            <FaClipboardList /> My Requests
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/my-pickups">
            <FaBoxes /> My Pickups
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/received-donations">
            <FaHandsHelping /> Received Donations
          </NavLink>
          <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/my-charity-transactions">
            <FaChartLine /> Transaction History
          </NavLink>
        </div>
      {/* )} */}

      {/* {role === "admin" && ( */}
  <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
    <h1 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
      🛠️ Admin Panel
    </h1>
    <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/admin-profile">
      <FaUserCircle /> Admin Profile
    </NavLink>
    <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/manage-donations">
      <FaClipboardList /> Manage Donations
    </NavLink>
    <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/manage-users">
      <FaUserCircle /> Manage Users
    </NavLink>
    <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/manage-role-requests">
      <FaHandsHelping /> Role Requests
    </NavLink>
    <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/manage-requests">
      <FaBoxes /> Manage Requests
    </NavLink>
    <NavLink className="flex items-center gap-2 hover:underline" to="/dashboard/feature-donations">
      <FaStar /> Feature Donations
    </NavLink>
  </div>
{/* )} */}

    </div>
  );
};

export default Sidebar;
