import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://share-the-meal-server.onrender.com/api/users/all")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load users");
        setLoading(false);
      });
  }, []);

  const updateRole = async (id, role) => {
    try {
      await axios.patch(`https://share-the-meal-server.onrender.com/api/users/${id}/role`, { role });
      toast.success(`Role updated to ${role}`);
      setUsers(prev =>
        prev.map(user => user._id === id ? { ...user, role } : user)
      );
    } catch {
      toast.error("Role update failed");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://share-the-meal-server.onrender.com/api/users/${id}`);
      toast.success("User deleted");
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch {
      toast.error("Failed to delete user");
    }
  };

  if (loading) return <div className="p-4 text-center text-gray-600">Loading users...</div>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Role</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ _id, name, email, role }) => {
                const roleBadgeClass = {
                  admin: "bg-blue-100 text-blue-800",
                  restaurant: "bg-yellow-100 text-yellow-800",
                  charity: "bg-purple-100 text-purple-800",
                  user: "bg-gray-100 text-gray-600",
                }[role] || "bg-gray-100 text-gray-600";

                return (
                  <tr key={_id} className="border-t border-gray-200 hover:bg-gray-50 text-sm">
                    <td className="px-4 py-3">{name}</td>
                    <td className="px-4 py-3">{email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full font-medium text-xs ${roleBadgeClass}`}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      {["admin", "restaurant", "charity"].map(targetRole => (
                        <button
                          key={targetRole}
                          onClick={() => updateRole(_id, targetRole)}
                          disabled={role === targetRole}
                          className={`px-3 py-1 rounded text-white text-xs font-semibold
                            ${role === targetRole
                              ? "bg-gray-400 cursor-not-allowed"
                              : targetRole === "admin"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : targetRole === "restaurant"
                              ? "bg-yellow-600 hover:bg-yellow-700"
                              : "bg-purple-700 hover:bg-purple-800"}
                          `}
                          title={`Make ${targetRole.charAt(0).toUpperCase() + targetRole.slice(1)}`}
                        >
                          {targetRole.charAt(0).toUpperCase() + targetRole.slice(1)}
                        </button>
                      ))}

                      <button
                        onClick={() => deleteUser(_id)}
                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                        title="Delete User"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
