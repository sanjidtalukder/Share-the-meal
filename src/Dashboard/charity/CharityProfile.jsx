import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const CharityProfile = () => {
  const [user, setUser] = useState({});
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mission: "",
    image: "",
  });

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
        setPhotoURL(currentUser.photoURL);

        const res = await axios.get("https://share-the-meal-server.onrender.com/api/charity-requests/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.data || res.data.role !== "charity") {
          setUnauthorized(true);
        } else {
          setUser(res.data);
          setFormData({
            name: res.data.name || "",
            mission: res.data.mission || "",
            image: res.data.image || res.data.userImage || "",
          });
        }

      } catch (err) {
        setUnauthorized(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken();

      const res = await axios.put(
        "https://share-the-meal-server.onrender.com/api/charity-requests/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p className="p-4">Loading profile...</p>;
  if (unauthorized) return <p className="p-4 text-red-500 font-semibold">You are not authorized to view this profile.</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Charity Profile</h2>
      <div className="flex flex-col items-center text-center">
        <img
          src={formData.image || photoURL || "https://via.placeholder.com/150"}
          alt="Charity Logo"
          className="w-24 h-24 object-cover rounded-full mb-4 border"
        />

        <div className="w-full space-y-3">
          <div>
            <label className="block text-sm font-medium">Name:</label>
            {editing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email:</label>
            <p>{user.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Mission:</label>
            {editing ? (
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{user.mission || "N/A"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Image URL:</label>
            {editing ? (
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : null}
          </div>

          <div className="mt-4">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;
