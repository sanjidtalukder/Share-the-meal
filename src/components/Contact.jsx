import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaUser,
  FaPaperPlane,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: clear the form fields here
    e.target.reset();

    toast.success("Thank you! Your message has been sent successfully.");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
     <h3 className="text-2xl font-semibold text-center mb-6 text-green-700 flex items-center justify-center gap-2">
               <FaEnvelopeOpenText className="text-green-600" /> Still have questions? Contact Us
             </h3>
      <p className="text-center text-gray-600 mb-10">
        Have any feedback, or want to partner with us? We'd love to hear from you.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Contact Info */}
        <div className="space-y-6 text-gray-700">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-green-600 text-xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-green-600 text-xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p>support@sharethemeal.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-green-600 text-xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p>+880 1745 567 890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaClock className="text-green-600 text-xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Office Hours</h3>
              <p>Sun - Thu: 10:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              <FaUser className="inline mr-2 text-green-600" />
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              <FaEnvelope className="inline mr-2 text-green-600" />
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              <FaPaperPlane className="inline mr-2 text-green-600" />
              Your Message
            </label>
            <textarea
              placeholder="Write your message..."
              rows="4"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
