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

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-1 rounded transition ${
      isActive ? "bg-green-100 text-green-700 font-bold" : "hover:underline"
    }`;

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
          <NavLink to="/dashboard/my-profile" className={navLinkClass}>
            <FaUserCircle /> My Profile
          </NavLink>
          <NavLink to="/dashboard/request-charity-role" className={navLinkClass}>
            <FaHandsHelping /> Request Charity
          </NavLink>
          <NavLink to="/dashboard/favorites" className={navLinkClass}>
            <FaHeart /> Favorites
          </NavLink>
          <NavLink to="/dashboard/my-reviews" className={navLinkClass}>
            <FaStar /> My Reviews
          </NavLink>
          <NavLink to="/dashboard/my-transactions" className={navLinkClass}>
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
          <NavLink to="/dashboard/restaurant-profile" className={navLinkClass}>
            <FaUserCircle /> Restaurant Profile
          </NavLink>
          <NavLink to="/dashboard/add-donation" className={navLinkClass}>
            <FaPlusCircle /> Add Donation
          </NavLink>
          <NavLink to="/dashboard/my-donations" className={navLinkClass}>
            <FaClipboardList /> My Donations
          </NavLink>
          <NavLink to="/dashboard/requestedDonatins" className={navLinkClass}>
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
          <NavLink to="/dashboard/charity-profile" className={navLinkClass}>
            <FaUserCircle /> Charity Profile
          </NavLink>
          <NavLink to="/dashboard/my-requests" className={navLinkClass}>
            <FaClipboardList /> My Requests
          </NavLink>
          <NavLink to="/dashboard/my-pickups" className={navLinkClass}>
            <FaBoxes /> My Pickups
          </NavLink>
          <NavLink to="/dashboard/received-donations" className={navLinkClass}>
            <FaHandsHelping /> Received Donations
          </NavLink>
          <NavLink to="/dashboard/my-charity-transactions" className={navLinkClass}>
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
          <NavLink to="/dashboard/admin-profile" className={navLinkClass}>
            <FaUserCircle /> Admin Profile
          </NavLink>
          <NavLink to="/dashboard/manage-donations" className={navLinkClass}>
            <FaClipboardList /> Manage Donations
          </NavLink>
          <NavLink to="/dashboard/manage-users" className={navLinkClass}>
            <FaUserCircle /> Manage Users
          </NavLink>
          <NavLink to="/dashboard/manage-role-requests" className={navLinkClass}>
            <FaHandsHelping /> Role Requests
          </NavLink>
          <NavLink to="/dashboard/manage-requests" className={navLinkClass}>
            <FaBoxes /> Manage Requests
          </NavLink>
          <NavLink to="/dashboard/feature-donations" className={navLinkClass}>
            <FaStar /> Feature Donations
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
