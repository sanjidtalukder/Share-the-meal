import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantProfile = () => {
  const [user, setUser] = useState(null); // default null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/users/me', {
          withCredentials: true // send cookies (if you're using JWT in httpOnly cookie)
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!user) return <div className="p-6">No user found.</div>;

  return (
    <div className="p-6 shadow-lg rounded-lg bg-white max-w-md mx-auto">
      {user.image && (
        <img src={user.image} alt="Logo" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
      )}
      <h2 className="text-2xl font-bold text-center">{user.name}</h2>
      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.address && <p><strong>Address:</strong> {user.address}</p>}
        {user.contact && <p><strong>Contact:</strong> {user.contact}</p>}
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default RestaurantProfile;
