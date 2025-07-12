import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const CharityProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.log(" User not logged in");
        setUnauthorized(true);
        return;
      }

      try {
        const token = await currentUser.getIdToken();

        const res = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.role !== "charity") {
          console.log(" Not a charity user");
          setUnauthorized(true);
        } else {
          setUser(res.data);
        }
      } catch (err) {
        console.error(" Error fetching user:", err.response?.data || err.message);
        setUnauthorized(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="p-4">Loading profile...</p>;
  if (unauthorized) return <p className="p-4 text-red-500 font-semibold">You are not authorized to view this profile.</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Charity Profile</h2>
      <div className="flex flex-col items-center text-center">
        <img
          src={user.image || user.photo}
          alt="Charity Logo"
          className="w-24 h-24 object-cover rounded-full mb-4 border"
        />
        <p className="mb-1"><strong>Name:</strong> {user.name}</p>
        <p className="mb-1"><strong>Email:</strong> {user.email}</p>
        <p className="mb-1"><strong>Role:</strong> {user.role}</p>
        <p className="mb-1"><strong>Mission:</strong> {user.mission || "N/A"}</p>
        <p className="mb-1"><strong>Contact:</strong> {user.contact || "N/A"}</p>
      </div>
    </div>
  );
};

export default CharityProfile;
