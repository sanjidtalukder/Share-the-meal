import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        toast.error("Failed to load users");
        setLoading(false);
      });
  }, []);

  const updateRole = async (id, role) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${id}/role`, { role });
      toast.success(`Role updated to ${role}`);
      setUsers(prev =>
        prev.map(user => user._id === id ? { ...user, role } : user)
      );
    } catch (err) {
      toast.error("Role update failed");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      toast.success("User deleted");
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  if (loading) return <div className="p-4 text-center">Loading users...</div>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                const { _id, name, email, role } = user;

                const roleBadge = {
                  admin: "bg-blue-100 text-blue-700",
                  restaurant: "bg-yellow-100 text-yellow-800",
                  charity: "bg-purple-100 text-purple-700",
                  user: "bg-gray-100 text-gray-700"
                }[role] || "bg-gray-100 text-gray-700";

                return (
                  <tr key={_id} className="border-t text-sm">
                    <td className="p-2">{name}</td>
                    <td className="p-2">{email}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadge}`}>
                        {role}
                      </span>
                    </td>
                    <td className="p-2 space-x-1">
                      {["admin", "restaurant", "charity"].map(targetRole => (
                        <button
                          key={targetRole}
                          onClick={() => updateRole(_id, targetRole)}
                          disabled={role === targetRole}
                          className={`px-2 py-1 rounded text-white ${
                            role === targetRole
                              ? "bg-gray-400 cursor-not-allowed"
                              : targetRole === "admin"
                              ? "bg-blue-500 hover:bg-blue-600"
                              : targetRole === "restaurant"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-purple-600 hover:bg-purple-700"
                          }`}
                        >
                          Make {targetRole.charAt(0).toUpperCase() + targetRole.slice(1)}
                        </button>
                      ))}
                      <button
                        onClick={() => deleteUser(_id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
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
