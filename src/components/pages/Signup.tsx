"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Signup() {
  const [loading, setLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 2000) // fake API call
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      {/* Background glow accents */}
      <motion.span initial={{y:-100}} animate={{y:0}} transition={{duration:0.6, ease:"easeOut"}}  className="absolute blur-[400px] top-50 right-0 w-[50%] h-[50%] bg-red-500"></motion.span>
      <motion.span initial={{y:-100}} animate={{y:0}} transition={{duration:0.6, ease:"easeOut"}}  className="absolute blur-[400px] top-50 leftt-0 w-[50%] h-[50%] bg-blue-500"></motion.span>

      {/* Card wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-[#0000004d] backdrop-blur-lg rounded-2xl shadow-xl shadow-[#ffffff06]  p-8 border border-white/40"
      >
        <h2 className="text-3xl font-bold text-center text-white">Create Account ✨</h2>
        <p className="text-gray-400 text-center mb-8">Join us and get fighting</p>

        <form className="space-y-6" onSubmit={handleSignup}>
          {/* Full Name */}
          <motion.div whileFocus={{ scale: 1.02 }} className="w-full">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </motion.div>

          {/* Email */}
          <motion.div whileFocus={{ scale: 1.02 }} className="w-full">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5  border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </motion.div>

          {/* Password */}
          <motion.div whileFocus={{ scale: 1.02 }} className="w-full">
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5  border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div whileFocus={{ scale: 1.02 }} className="w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5  border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </motion.div>

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

        <p className="text-gray-500 text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-red-400 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  )
}
