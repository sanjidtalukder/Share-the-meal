import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 p-4 bg-base-200">
        <ul className="menu">
          <li><NavLink to="my-profile">My Profile</NavLink></li>
          <li><NavLink to="request-charity">Request Charity Role</NavLink></li>
          <li><NavLink to="favorites">Favorites</NavLink></li>
          <li><NavLink to="my-reviews">My Reviews</NavLink></li>
          <li><NavLink to="transactions">Transaction History</NavLink></li>
        </ul>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
