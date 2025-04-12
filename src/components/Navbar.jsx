import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
        !event.target.closest('.menu-toggle')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="navbar-container border-b-2 border-[#292B35] relative">
      <nav className="navbar flex justify-between items-center p-4 bg-[#E0E0E0] relative z-10">
        <a href="/" onClick={(e) => handleNavigation('/', e)} className="logo text-2xl font-bold text-[#292B35] no-underline hover:text-[#EE8631] transition-colors">
          ELOSphere
        </a>
        <div className="flex items-center space-x-4">
          <button className="menu-toggle bg-transparent border-none cursor-pointer" onClick={toggleMenu}>
            <div className="hamburger flex flex-col justify-between w-8 h-5 relative">
              <span className={`block h-1 w-full bg-[#292B35] rounded absolute transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
              <span className={`block h-1 w-full bg-[#292B35] rounded absolute top-2 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-1 w-full bg-[#292B35] rounded absolute transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2' : 'top-4'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className={`menu-container absolute left-1/2 transform -translate-x-1/2 top-0 w-auto bg-[#95C5C5] z-20 transition-all duration-500 rounded-lg ${isMenuOpen ? 'opacity-100 translate-y-12' : 'opacity-0 -translate-y-full pointer-events-none'
          } shadow-lg border border-[#292B35] md:w-auto w-[90%]`}
      >
        <div className="menu py-2 px-6 rounded-lg">
          <ul className="flex md:flex-row flex-col justify-center items-center">
            <li className="md:mb-0 mb-4">
              <a
                href="/"
                onClick={(e) => handleNavigation('/', e)}
                className="text-[#292B35] no-underline hover:font-bold hover:text-[#EE8631] transition-all text-base px-4 whitespace-nowrap"
              >
                ES Events
              </a>
            </li>
            <li className="md:block hidden h-5 w-px bg-[#AD662F]"></li>
            <li className="md:mb-0 mb-4">
              <a
                href="/gryork-explained"
                onClick={(e) => handleNavigation('/gryork-explained', e)}
                className="text-[#292B35] no-underline hover:font-bold hover:text-[#EE8631] transition-all text-base px-4 whitespace-nowrap"
              >
                Connect
              </a>
            </li>
            <li className="md:block hidden h-5 w-px bg-[#AD662F]"></li>
            <li className="md:mb-0 mb-4">
              <a
                href="/about-us"
                onClick={(e) => handleNavigation('/about-us', e)}
                className="text-[#292B35] no-underline hover:font-bold hover:text-[#EE8631] transition-all text-base px-4 whitespace-nowrap"
              >
                Social 
              </a>
            </li>
            <li className="md:block hidden h-5 w-px bg-[#AD662F]"></li>
            <li className="md:mb-0 mb-4">
              <a
                href="/dispute-resolution"
                onClick={(e) => handleNavigation('/dispute-resolution', e)}
                className="text-[#292B35] no-underline hover:font-bold hover:text-[#EE8631] transition-all text-base px-4 whitespace-nowrap"
              >
                ES League
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>

  );
}; export default Navbar;