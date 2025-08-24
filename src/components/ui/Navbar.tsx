import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 190);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed  top-0 z-[50] flex justify-center items-center">
      <ul
        className={` py-8 px-18 w-full  transition-all duration-300 flex gap-8 items-center justify-between
          ${scrolled ? "onScrollNav" : ""}`}
      >
        
          <li className="font-bold text-2xl">Box'it</li>
          <li>
            <ul className="flex w-fit gap-4 justify-between">
              <li className="hover:cursor-pointer font-medium navlink transition-all duration-300">
                Home
              </li>
              <li className="hover:cursor-pointer font-medium navlink transition-all duration-300">
                Signup
              </li>
              <li className="hover:cursor-pointer font-medium navlink transition-all duration-300">
                Login
              </li>
            </ul>
          </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
