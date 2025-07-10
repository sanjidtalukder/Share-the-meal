import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data));
  }, []);

  const updateRole = async (id, role) => {
    await axios.patch(`http://localhost:5000/api/users/${id}/role`, { role });
    toast.success(`Role changed to ${role}`);
    setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    toast.error("User deleted.");
    setUsers(prev => prev.filter(u => u._id !== id));
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 space-x-1">
                <button onClick={() => updateRole(user._id, "admin")} className="bg-blue-500 text-white px-2 py-1 rounded">Make Admin</button>
                <button onClick={() => updateRole(user._id, "restaurant")} className="bg-yellow-500 text-white px-2 py-1 rounded">Make Restaurant</button>
                <button onClick={() => updateRole(user._id, "charity")} className="bg-purple-500 text-white px-2 py-1 rounded">Make Charity</button>
                <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
