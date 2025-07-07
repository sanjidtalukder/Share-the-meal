import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold underline text-yellow-300"
              : "hover:text-yellow-100 transition-colors"
          }
          onClick={() => setDropdownOpen(false)}
        >
          Home
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/donations"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold underline text-yellow-300"
                  : "hover:text-yellow-100 transition-colors"
              }
              onClick={() => setDropdownOpen(false)}
            >
              All Donations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold underline text-yellow-300"
                  : "hover:text-yellow-100 transition-colors"
              }
              onClick={() => setDropdownOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}

      {!user && (
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "font-semibold underline text-yellow-300"
                : "hover:text-yellow-100 transition-colors"
            }
            onClick={() => setDropdownOpen(false)}
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-green-600 text-white shadow-md px-6 py-3">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-extrabold text-white"
        >
          ZeroWasteMeals
        </Link>
      </div>

      {/* Center: Menu Links (desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6 font-medium">{navLinks}</ul>
      </div>

      {/* Right: User Info or Login */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            <img
              src={
                user.photoURL ||
                "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
              }
              alt={user.displayName || "User"}
              title={user.displayName || "User"}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-green-700 flex items-center gap-2"
              title="Logout"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end lg:hidden relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                dropdownOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {dropdownOpen && (
          <ul
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-green-700 text-white rounded-box w-52 absolute right-0 z-50"
            onClick={() => setDropdownOpen(false)}
          >
            {navLinks}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-red-500 hover:bg-red-600 w-full text-white mt-2"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
