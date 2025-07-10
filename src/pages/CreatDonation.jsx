import { useState } from "react";
import axios from "axios";

const CreatDonation = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    quantity: "",
    pickupTime: "",
    restaurant: {
      name: "Sanjid's Restaurant",
      email: "sanjid@rest.com",
      location: "Dhaka",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["name", "email", "location"].includes(name)) {
      setFormData({
        ...formData,
        restaurant: {
          ...formData.restaurant,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/donations", formData);
    alert("Donation submitted for admin review.");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Add Food Donation</h2>
      <input name="title" onChange={handleChange} placeholder="Title" required className="input mb-2" />
      <input name="image" onChange={handleChange} placeholder="Image URL" required className="input mb-2" />
      <textarea name="description" onChange={handleChange} placeholder="Description" required className="textarea mb-2" />
      <input name="quantity" onChange={handleChange} placeholder="Quantity" required className="input mb-2" />
      <input name="pickupTime" onChange={handleChange} placeholder="Pickup Time" required className="input mb-2" />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CreatDonation;
