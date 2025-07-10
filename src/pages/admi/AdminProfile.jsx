import useAuth from "../../hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <img src={user?.photoURL} alt="Admin" className="w-24 rounded-full mb-4" />
      <p><strong>Name:</strong> {user?.displayName}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> Admin</p>
    </div>
  );
};

export default AdminProfile;
