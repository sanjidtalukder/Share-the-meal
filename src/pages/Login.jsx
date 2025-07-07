import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/src/firebase/firebase.config";
import toast from "react-hot-toast";
import Lottie from "lottie-react";


const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login successful!");
      setShowSuccessAnim(true);
      setTimeout(() => {
        setShowSuccessAnim(false);
        navigate("/");
      }, 2500);
    } catch (err) {
      setError(err.message);
      toast.error("Login failed. Redirecting to Register...");
      setTimeout(() => {
        navigate("/register");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-6 py-12 gap-10 relative overflow-hidden">
      
      {/* Login Form */}
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-blue-200">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-4">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-600 mb-6 text-base sm:text-lg">
          Please login to your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow transition"
          />
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow transition"
          />
          {error && (
            <p className="text-red-600 text-center font-medium text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 rounded-xl shadow-md transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700 text-sm sm:text-base">
          New here?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-[90%] max-w-lg h-[300px] sm:h-[400px]">
          
        </div>
      </div>

      {/* Success Animation Overlay */}
      {showSuccessAnim && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[260px] sm:w-[320px] bg-white rounded-2xl shadow-lg p-2">
         
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
