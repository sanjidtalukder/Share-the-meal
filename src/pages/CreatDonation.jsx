import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { FaUtensils, FaPlusCircle } from "react-icons/fa"; // React Icons
import { GiFoodTruck } from "react-icons/gi";

const CreateDonation = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    quantity: "",
    pickupTime: "",
    location: "",
    restaurantName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    const token = await user.getIdToken();

    const postData = {
      ...formData,
      restaurant: {
        name: formData.restaurantName,
        email: user.email,
        location: formData.location,
      },
    };

    try {
      await axios.post("http://localhost:5000/api/donations", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(" Donation submitted for admin review.");
    } catch (error) {
      console.error(error);
      alert(" Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="flex items-center justify-center text-3xl font-bold text-green-600 mb-8 gap-2">
           <GiFoodTruck className="text-green-500" />
          Create a Food Donation
          <FaUtensils className="text-green-500" />
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant Name
            </label>
            <input
              name="restaurantName"
              onChange={handleChange}
              placeholder="Restaurant Name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              name="title"
              onChange={handleChange}
              placeholder="Donation Title"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              name="image"
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Describe the food donation..."
              required
              rows="3"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                name="quantity"
                onChange={handleChange}
                placeholder="e.g., 20 plates"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Time
              </label>
              <input
                name="pickupTime"
                type="datetime-local"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Location
            </label>
            <input
              name="location"
              onChange={handleChange}
              placeholder="Pickup Location"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition"
          >
            <FaPlusCircle className="text-white text-lg" />
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;
