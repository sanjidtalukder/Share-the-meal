import React, { useState } from 'react';
import axios from 'axios';

const AddDonation = ({ user }) => {
  const [form, setForm] = useState({
    title: '',
    type: '',
    quantity: '',
    pickupTime: '',
    location: '',
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, restaurantName: user.name, restaurantEmail: user.email };
    await axios.post('/api/donations', data);
    alert('Donation Added');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} />
      <input placeholder="Type" onChange={e => setForm({...form, type: e.target.value})} />
      <input placeholder="Quantity" onChange={e => setForm({...form, quantity: e.target.value})} />
      <input placeholder="Pickup Time" onChange={e => setForm({...form, pickupTime: e.target.value})} />
      <input placeholder="Location" onChange={e => setForm({...form, location: e.target.value})} />
      <input type="file" onChange={e => setForm({...form, image: e.target.files[0].name})} />
      <button type="submit">Add Donation</button>
    </form>
  );
};

export default AddDonation;
