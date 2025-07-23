import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";


import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import loginAnim from "../../src/assets/Welcome Animation.json"; // optional animation
import { auth } from "../firebase/firebase.config";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  // Get user from DB
  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await axios.get(`/api/users?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  const onSubmit = async (data) => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setEmail(userCredential.user.email);
      
      setShowSuccessAnim(true);

      setTimeout(() => {
        setShowSuccessAnim(false);
        if (dbUser?.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }, 2500);
    } catch (err) {
      setError("Invalid email or password.");
      toast.error("Login failed. Redirecting to register...");
      setTimeout(() => {
        navigate("/register");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 px-4 py-10">
      {/* Animation */}
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <Lottie animationData={loginAnim} loop={true} className="w-80 sm:w-96" />
      </div>

      {/* Form */}
      <div className="w-full md:w-[400px] bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Login to Continue</h2>
        <p className="text-center text-gray-500 mb-6">Welcome back! Please login to your account.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>

      {/* Success Animation Overlay */}
      {showSuccessAnim && (
        <div className="fixed inset-0 bg-green-100 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-xl font-semibold text-green-600">Login Successful 🎉</p>
            {/* Optional animation or check icon */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
