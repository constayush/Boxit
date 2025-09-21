"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../../stores/authStore";


function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const user = useAuthStore((state) => state.user);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



 

  return (
    <nav className="w-full fixed top-0 z-[50] flex justify-center items-center">
      <ul
        className={`py-8 px-18 w-full transition-all duration-300 flex gap-8 items-center justify-between
          ${scrolled ? "onScrollNav" : ""}`}
      >
        <li className="font-bold text-2xl">Box'it</li>
        <li>
          <ul className="flex w-fit gap-4 justify-between items-center">
            <Link
              to="/"
              className="hover:cursor-pointer font-medium navlink transition-all duration-300"
            >
              Home
            </Link>

            {!user && (
              <>
                <Link
                  to="/signup"
                  className="hover:cursor-pointer font-medium navlink transition-all duration-300"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="hover:cursor-pointer font-medium navlink transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}

            {user && (
              <Link
                to={"/profile"}
                className="hover:cursor-pointer font-medium navlink transition-all duration-300   p-2 "
              >
                Profile
              </Link>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
