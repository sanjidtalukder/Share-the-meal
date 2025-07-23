import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import axios from "axios";
import successAnim from "../../src/assets/form registration.json"; // ✔️ replace with your animation
import { auth } from "../firebase/firebase.config";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, photo, email, password } = data;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern.test(password)) {
      toast.error("Password must include uppercase, lowercase and 6+ characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo || "",
      });

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
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-green-100 to-green-200 px-6 py-10 gap-8">
      
      {/* Animation Section */}
      <div className="hidden md:flex md:w-1/2 justify-center">
        <div className="w-full max-w-lg">
          <Lottie animationData={successAnim} loop autoplay />
        </div>
      </div>

      {/* Registration Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-green-300">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-4">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Join the ZeroWasteMeals community!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Your Full Name"
            {...register("name", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            type="text"
            placeholder="Photo URL (optional)"
            {...register("photo")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            type="password"
            placeholder="Create Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>

      {/* Success Animation Overlay */}
      {showSuccessAnim && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-[280px] md:w-[360px] p-4 bg-white rounded-2xl shadow-xl">
            <Lottie animationData={successAnim} loop={false} />
            <p className="text-center mt-2 font-semibold text-green-600">Registration Complete!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
