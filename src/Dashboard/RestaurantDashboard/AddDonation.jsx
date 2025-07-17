import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { FaUtensils, FaPlusCircle } from "react-icons/fa";
import { GiFoodTruck } from "react-icons/gi";

const AddDonation = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null, // file
    description: "",
    quantity: "",
    footType: "",
    pickupTime: "",
    location: "",
    restaurantName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const auth = getAuth();
  const user = auth.currentUser;
  const token = await user.getIdToken();

  try {
    // Upload image to imgbb
    const imgData = new FormData();
    imgData.append("image", formData.image);

    const imgbbRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      imgData
    );

    const imageUrl = imgbbRes.data.data.url;

    const postData = {
      title: formData.title,
      image: imageUrl,
      description: formData.description,
      quantity: formData.quantity,
      foodType: formData.foodType,
      pickupTime: formData.pickupTime,
      restaurant: {
        name: formData.restaurantName,
        email: user.email,
        location: formData.location,
      },
    };

    await axios.post("https://share-the-meal-server-blond.vercel.app/api/donations", postData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("✅ Donation submitted for admin review.");
    setFormData({
      title: "",
      image: null,
      description: "",
      quantity: "",
      foodType: "",
      pickupTime: "",
      location: "",
      restaurantName: "",
    });
  } catch (error) {
    console.error(error);
    alert("❌ Something went wrong. Please try again.");
  } finally {
    setLoading(false);
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
          <input
            name="restaurantName"
            onChange={handleChange}
            placeholder="Restaurant Name"
            required
            className="w-full px-4 py-2 border rounded-md"
            value={formData.restaurantName}
          />

          <input
            name="title"
            onChange={handleChange}
            placeholder="Donation Title"
            required
            className="w-full px-4 py-2 border rounded-md"
            value={formData.title}
          />

          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50"
          />

          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Describe the food donation..."
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.description}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="quantity"
              onChange={handleChange}
              placeholder="e.g., 20 plates"
              required
              className="w-full px-4 py-2 border rounded-md"
              value={formData.quantity}
            />

            <input
              name="pickupTime"
              type="datetime-local"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
              value={formData.pickupTime}
            />
          </div>

          <input
            name="location"
            onChange={handleChange}
            placeholder="Pickup Location"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.location}
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full flex items-center justify-center gap-2 font-semibold py-2 rounded-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            <FaPlusCircle className="text-white text-lg" />
            {loading ? "Submitting..." : "Submit Donation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonation;
