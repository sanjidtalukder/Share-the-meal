import { Link } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const Sidebar = () => {
  const [role, isLoading] = useUserRole();

  if (isLoading) return <div className="p-4">Loading Sidebar...</div>;

  return (
    <div className="w-64 bg-green-300 p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {/* User Sidebar */}
      {role === "user" && (
        <div className="flex flex-col space-y-2 text-black">
          <h1 className="text-2xl font-bold">User</h1>
          <Link to="/dashboard/my-profile">My Profile</Link>
          <Link to="/dashboard/request-charity-role">Request Charity</Link>
          <Link to="/dashboard/favorites">Favorites</Link>
          <Link to="/dashboard/my-reviews">My Reviews</Link>
          <Link to="/dashboard/my-transactions">Transaction History</Link>
        </div>
      )}

      {/* Restaurant Sidebar */}
      {/* {role === "restaurant" && ( */}
        <div className="flex flex-col space-y-2 text-black">
          <h1 className="text-2xl font-bold">Restaurant</h1>
          <Link to="/dashboard/restaurant-profile">Restaurant Profile</Link>
          <Link to="/dashboard/add-donation">Add Donation</Link>
          <Link to="/dashboard/my-donations">My Donations</Link>
          <Link to="/dashboard/requestedDonatins">Requested Donations</Link>
        </div>
      {/* )} */}


 {/* Charity Sidebar */}
      {/* {role === "charity" && ( */}
  <div className="flex flex-col space-y-2 text-black">
    <h1 className="text-2xl font-bold">Charity</h1>
    <Link to="/dashboard/charity-profile">Charity Profile</Link>
    <Link to="/dashboard/my-requests">My Requests</Link>
    <Link to="/dashboard/my-pickups">My Pickups</Link>
    <Link to="/dashboard/received-donations">Received Donations</Link>
    <Link to="/dashboard/my-charity-transactions">Transaction History</Link>
  </div>
{/* )} */}


      {/* Add more roles like admin/charity here if needed */}
    </div>
  );
};

export default Sidebar;
