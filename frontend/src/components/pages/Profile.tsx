import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { Link } from "react-router"; 
import { logoutUser } from "../../services/auth";
import { Home, LogOut, KeyRound } from "lucide-react";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    try {
      await logoutUser();
      useAuthStore.getState().setUser(null);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-tyson-signup flex items-center justify-center bg-gradient-to-b from-[#3a0000b8] to-[#000433] text-white p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-[#000000f1] shadow-lg rounded-2xl border border-gray-700 p-4 sm:p-6 flex flex-col gap-6">
          {/* Card Header with Home + Logout */}
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm sm:text-base text-white border px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              <Home size={18} /> <span className="hidden sm:inline">Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm sm:text-base text-white border px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold hover:bg-red-500/30 transition"
            >
              <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* User Info */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">{user?.username}</h2>
            <p className="text-gray-400 text-sm sm:text-lg">{user?.email}</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
          >
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <p className="text-sm sm:text-base font-semibold">Level</p>
              <p className="text-lg sm:text-xl">{user?.level} 🎚️</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <p className="text-sm sm:text-base font-semibold">XP</p>
              <p className="text-lg sm:text-xl">{user?.xp} ⚡</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <p className="text-sm sm:text-base font-semibold">Streak</p>
              <p className="text-lg sm:text-xl">{user?.streak} 🔥</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <p className="text-sm sm:text-base font-semibold">Achievements</p>
              <p className="text-lg sm:text-xl">{user?.achievements} ⭐</p>
            </div>
          </motion.div>

          {/* Reset Password Button */}
          <button className="flex items-center justify-center gap-2 w-full py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-2xl border-2 hover:bg-white/10 transition">
            <KeyRound size={18} /> Reset Password
          </button>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/select" className="w-full">
              <button className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-2xl border-2 hover:bg-white/10 transition">
                🚀 Start Training
              </button>
            </Link>

            <Link to="/learn" className="w-full">
              <button className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-2xl border-2 hover:bg-white/10 transition">
                📚 Go to Learning
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
