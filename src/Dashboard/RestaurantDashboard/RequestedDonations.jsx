import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const RestaurantProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      try {
        const token = await currentUser.getIdToken();

        const res = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Ensure only restaurant role can access this profile
        if (res.data.role !== 'restaurant') {
          setUnauthorized(true);
        } else {
          setUser(res.data);
        }
      } catch (error) {
        console.error("❌ Failed to load user profile:", error);
        setUnauthorized(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="p-4">Loading restaurant profile...</p>;
  if (unauthorized) return <p className="p-4 text-red-500">Access Denied. Only restaurants can view this page.</p>;
  if (!user) return <p className="p-4 text-red-500">No profile data found.</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto text-center">
      {user.image && (
        <img
          src={user.image}
          alt="Restaurant Logo"
          className="w-32 h-32 object-cover mx-auto rounded-full border mb-4"
        />
      )}
      <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
      <p className="text-sm text-gray-600 mb-3">(Restaurant)</p>

      <div className="text-left text-sm space-y-2 text-gray-700">
        <p><strong>Email:</strong> {user.email}</p>
        {user.address && <p><strong>Address:</strong> {user.address}</p>}
        {user.contact && <p><strong>Contact:</strong> {user.contact}</p>}
        {user.createdAt && (
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantProfile;
