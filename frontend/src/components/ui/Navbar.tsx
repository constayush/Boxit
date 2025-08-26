"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { logoutUser } from "../../services/auth";
import { LogOut } from "lucide-react";
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useAuthStore((state) => state.user);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
       
      setScrolled(window.scrollY > 190);

      }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = async () => {
  try {
    await logoutUser();            // call server to clear cookie
    useAuthStore.getState().setUser(null); // clear Zustand store
    setDropdownOpen(false);        // close dropdown
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

  return (
    <nav className="w-full fixed top-0 z-[50] flex justify-center items-center">
      <ul
        className={`py-8 px-18 w-full transition-all duration-300 flex gap-8 items-center justify-between
          ${scrolled ? "onScrollNav" : ""}`}
      >
        <li className="font-bold text-2xl">Box'it</li>
        <li>
          <ul className="flex w-fit gap-4 justify-between items-center">
            <Link to="/" className="hover:cursor-pointer font-medium navlink transition-all duration-300">
              Home
            </Link>

            {!user && (
              <>
                <Link to="/signup" className="hover:cursor-pointer font-medium navlink transition-all duration-300">
                  Signup
                </Link>
                <Link to="/login" className="hover:cursor-pointer font-medium navlink transition-all duration-300">
                  Login
                </Link>
              </>
            )}

            {user && (
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff3a] text-white hover:bg-gray-600 transition"
                >
                  <FiUser size={20} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mx-auto mt-2 w-56 bg-[#1c1d25] backdrop-blur text-white rounded-xl shadow-lg p-4 flex flex-col gap-2 z-50"
                    >
                      <p className="font-semibold text-lg">{user.username}</p>
                      <p>Level: {user.level} 🎚️</p>
                      <p>XP: {user.xp} ⚡</p>
                      <p>Streak: {user.streak} 🔥</p>
                      <p>Achievements: {user.achievements.length} ⭐</p>
                      <button
                       onClick={handleLogout}
                        className="text-sm text-red-400 border flex w-full items-center justify-center gap-2 py-2 hover:text-red-600 underline mt-2"
                      >
                        Logout <LogOut/>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
