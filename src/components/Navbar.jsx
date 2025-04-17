import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="sticky top-0 z-50 bg-black ">
      <div className="navbar-container fixed inset-x-0 top-0 z-50 w-full">
        <nav className="navbar flex justify-between items-center p-4 bg-[#292B35] relative z-10">
          <a
            href="/"
            onClick={(e) => handleNavigation("/", e)}
            className="logo text-2xl font-bold text-[#EE8631] no-underline hover:text-[#95C5C5] transition-colors"
          >
            ELOSphere
          </a>
          <div className="flex items-center space-x-4">
            <button
              className="menu-toggle bg-transparent border-none cursor-pointer"
              onClick={toggleMenu}
            >
              <div className="hamburger flex flex-col justify-between w-8 h-5 relative">
                <span
                  className={`block h-1 w-full bg-[#EE8631] rounded absolute transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-2" : "top-0"
                  }`}
                ></span>
                <span
                  className={`block h-1 w-full bg-[#EE8631] rounded absolute top-2 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block h-1 w-full bg-[#EE8631] rounded absolute transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-2" : "top-4"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </nav>

        <div
          ref={menuRef}
          className={`menu-container absolute left-1/2 transform -translate-x-1/2 top-0 w-auto bg-[#292B35] z-20 transition-all duration-500 rounded-lg ${
            isMenuOpen
              ? "opacity-100 translate-y-4"
              : "opacity-0 -translate-y-full pointer-events-none"
          } shadow-lg border border-[#292B35] md:w-auto w-[90%]`}
        >
          <div className="menu py-2 px-6 rounded-lg border border-[#EE8631]">
            <ul className="flex md:flex-row flex-col justify-center items-center">
              <li className="md:mb-0 mb-4">
                <a
                  href="/"
                  onClick={(e) => handleNavigation("/", e)}
                  className="text-[#E0E0E0] no-underline hover:font-bold hover:text-[#EE8631] transition-all text-base px-4 whitespace-nowrap"
                >
                  ES Events
                </a>
              </li>
              <li className="md:block hidden h-5 w-px bg-[#AD662F]"></li>
              <li className="md:mb-0 mb-4">
                <a
                  href="/connect"
                  onClick={(e) => handleNavigation("/connect", e)}
                  className="text-[#E0E0E0] no-underline hover:font-bold hover:text-[#EE8631] transition-all text-base px-4 whitespace-nowrap"
                >
                  Connect
                </a>
              </li>
              <li className="md:block hidden h-5 w-px bg-[#AD662F]"></li>
              <li className="md:mb-0 mb-4">
                <a
                  href="/social"
                  onClick={(e) => handleNavigation("/social", e)}
                  className="text-[#E0E0E0] no-underline hover:font-bold hover:text-[#EE8631] transition-all text-base px-4 whitespace-nowrap"
                >
                  Social
                </a>
              </li>
              <li className="md:block hidden h-5 w-px bg-[#AD662F]"></li>
              <li className="md:mb-0 mb-4">
                <a
                  href="/dispute-resolution"
                  onClick={(e) => handleNavigation("/dispute-resolution", e)}
                  className="text-[#E0E0E0] no-underline hover:font-bold hover:text-[#EE8631] transition-all text-base px-4 whitespace-nowrap"
                >
                  ES League
                </a>
              </li>
              <li className="md:block hidden h-5 w-px bg-[#AD662F]"></li>
              <li className="md:mb-0 mb-4">
                <a
                  href="/dispute-resolution"
                  onClick={(e) => handleNavigation("/es-tiers", e)}
                  className="text-[#E0E0E0] no-underline hover:font-bold hover:text-[#EE8631] transition-all text-base px-4 whitespace-nowrap"
                >
                  ES Tiers
                </a>
              </li>
              <li className="md:block hidden h-5 w-px bg-[#AD662F]"></li>
              <li className="md:mb-0 mb-4">
                <a
                  href="/teams"
                  onClick={(e) => handleNavigation("/teams", e)}
                  className="text-[#E0E0E0] no-underline hover:font-bold hover:text-[#EE8631] transition-all text-base px-4 whitespace-nowrap"
                >
                  Teams
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-16" />
    </div>
  );
};
export default Navbar;
