import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharityProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('/api/users/me') // User info with JWT
      .then(res => setUser(res.data));
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <img src={user.image} alt="Logo" className="w-32 rounded-full" />
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Mission:</strong> {user.mission || "N/A"}</p>
      <p><strong>Contact:</strong> {user.contact || "N/A"}</p>
    </div>
  );
};

export default CharityProfile;
