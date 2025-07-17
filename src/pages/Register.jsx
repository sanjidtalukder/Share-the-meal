import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/src/firebase/firebase.config";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import axios from "axios"; // ✅ axios import

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, photo, email, password } = data;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern.test(password)) {
      toast.error("Password must contain uppercase, lowercase, and be 6+ characters.");
      return;
    }

    try {
      // ✅ Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo || "",
      });

      // ✅ Save user to MongoDB
      await axios.post("https://share-the-meal-server-blond.vercel.app/api/users", {
        name,
        email,
        photo,
      });

      toast.success("Registration successful!");
      setShowSuccessAnim(true);
      reset();

      setTimeout(() => {
        setShowSuccessAnim(false);
        navigate("/");
      }, 2500);
    } catch (err) {
      setError(err.message);
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-200 to-blue-300 p-6 md:p-12 gap-8 relative">
      {/* Animation */}
      <div className="hidden md:flex md:w-1/2 justify-center">
        <div className="w-full max-w-lg shadow-lg rounded-xl overflow-hidden bg-white">
          {/* Optional animation content */}
        </div>
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-purple-300">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-5">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Join EduSphere and start learning today!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: true })}
            className="w-full p-3 md:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
          <input
            type="text"
            placeholder="Photo URL (optional)"
            {...register("photo")}
            className="w-full p-3 md:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: true })}
            className="w-full p-3 md:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full p-3 md:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
          {error && (
            <p className="text-red-600 text-sm font-semibold text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 md:py-4 rounded-xl shadow-lg transition"
          >
            Register
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:underline font-semibold"
          >
            Login here
          </Link>
        </p>
      </div>

      {/* Success Animation */}
      {showSuccessAnim && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-[280px] md:w-[360px] p-4 bg-white rounded-2xl shadow-lg">
            {/* Optional success animation (Lottie) */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
