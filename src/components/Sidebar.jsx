import { Link } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";


const Sidebar = () => {
  const role = useUserRole(); // e.g., 'admin', 'charity', 'restaurant', 'user'

  return (
    <div className="w-64 bg-purple-100 p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {role === "admin" && (
        <>
          <Link to="/dashboard/admin-profile">Admin Profile</Link>
          <Link to="/dashboard/manage-donations">Manage Donations</Link>
          <Link to="/dashboard/manage-users">Manage Users</Link>
          <Link to="/dashboard/manage-roles">Manage Role Requests</Link>
          <Link to="/dashboard/manage-requests">Manage Requests</Link>
          <Link to="/dashboard/feature-donations">Feature Donations</Link>
        </>
      )}

      {role === "restaurant" && (
        <>
          <Link to="/dashboard/restaurant-profile">Profile</Link>
          <Link to="/dashboard/add-donation">Add Donation</Link>
          <Link to="/dashboard/my-donations">My Donations</Link>
          <Link to="/dashboard/requested-donations">Requested Donations</Link>
        </>
      )}

      {role === "charity" && (
        <>
          <Link to="/dashboard/charity-profile">Profile</Link>
          <Link to="/dashboard/my-requests">My Requests</Link>
          <Link to="/dashboard/my-pickups">My Pickups</Link>
          <Link to="/dashboard/received">Received</Link>
          <Link to="/dashboard/transactions">Transaction History</Link>
        </>
      )}

      {role === "user" && (
        <>
          <Link to="/dashboard/my-profile">My Profile</Link>
          <Link to="/dashboard/request-charity-role">Request Charity</Link>
          <Link to="/dashboard/favorites">Favorites</Link>
          <Link to="/dashboard/my-reviews">My Reviews</Link>
          <Link to="/dashboard/my-transactions">Transaction History</Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
