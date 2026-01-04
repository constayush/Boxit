"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "../../services/auth";
import { useAuthStore } from "../../stores/authStore";
import paperTexx from "../../../public/paper-texture.webp";
export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const setUser = useAuthStore((state) => state.setUser); 

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // call backend
      const res = await registerUser({ email, username, password });
      setUser(res.user);
      window.location.href = "/profile";
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      <img src={"/signup-tyson.png"} className="absolute grayscale-100 h-full opacity-80 w-full" alt="" />
      {/* Background glows */}
      <motion.span
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute blur-[100px] -z-1 right-0 w-[50%] h-[100%] bg-red-500"
      />
      <motion.span
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute blur-[400px] -z-1 left-0 w-[50%] h-[100%] bg-blue-500"
      />
      <motion.span
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute blur-[400px] -z-1 top-0 left-0 w-full h-full bg-black"
      />

      {/* Card wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-[#67676732] backdrop-blur-xl rounded-2xl shadow-xl shadow-[#ffffff06] p-8 border border-white/40"
      >
        <h2 className="text-3xl font-bold text-center text-white">Create Account</h2>
        <p className="text-gray-300 text-center mb-8">Join us and get fighting</p>

        <form className="space-y-6" onSubmit={handleSignup}>
        
          {/* Username*/}
          <motion.div whileFocus={{ scale: 1.02 }} className="w-full">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-300 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} className="w-full">
            <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-300 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          </motion.div>

          {/* Password */}
          <motion.div whileFocus={{ scale: 1.02 }} className="w-full">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-300 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div whileFocus={{ scale: 1.02 }} className="w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-300 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </motion.div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-xl py-3 text-lg font-semibold text-white shadow-md transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-gray-300 text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-red-400 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
