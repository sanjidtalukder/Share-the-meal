import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const AddDonation = () => {
  const [form, setForm] = useState({
    title: '',
    type: '',
    quantity: '',
    pickupTime: '',
    location: '',
    image: ''
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Get logged in user info from Firebase
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "Anonymous",
        email: currentUser.email
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.name || !user?.email) {
      alert("User info missing!");
      return;
    }

    const data = {
      ...form,
      restaurantName: user.name,
      restaurantEmail: user.email
    };

    try {
      setLoading(true);
     await axios.post('/api/donations', data);

      alert('✅ Donation added successfully!');
      setForm({
        title: '',
        type: '',
        quantity: '',
        pickupTime: '',
        location: '',
        image: ''
      });
    } catch (err) {
      console.error("❌ Error adding donation:", err);
      alert("Failed to add donation.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center p-6 text-red-500">❌ Please login first to add a donation.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Add a Donation
      </h2>

      <input
        placeholder="Title"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <input
        placeholder="Type"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        required
      />

      <input
        placeholder="Quantity"
        type="number"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        required
      />

      <input
        placeholder="Pickup Time"
        type="time"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
        value={form.pickupTime}
        onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
        required
      />

      <input
        placeholder="Location"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        required
      />

      <input
        type="file"
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer"
        onChange={(e) => setForm({ ...form, image: e.target.files[0]?.name || '' })}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full font-semibold py-3 rounded-lg transition duration-300 
        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        {loading ? "Submitting..." : "Submit Donation"}
      </button>
    </form>
  );
};

export default AddDonation;
