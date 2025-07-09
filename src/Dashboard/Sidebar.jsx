import { Link } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const Sidebar = () => {
  const [role, isLoading] = useUserRole();

  if (isLoading) return <div className="p-4">Loading Sidebar...</div>;

  return (
    <div className="w-64 bg-green-300 p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {role === "user" && (
        <div className="flex flex-col space-y-2 text-black">
  <Link to="/dashboard/my-profile">My Profile</Link>
  <Link to="/dashboard/request-charity-role">Request Charity</Link>
  <Link to="/dashboard/favorites">Favorites</Link>
  <Link to="/dashboard/my-reviews">My Reviews</Link>
  <Link to="/dashboard/my-transactions">Transaction History</Link>
</div>

      )}
    </div>
  );
};

export default Sidebar;
