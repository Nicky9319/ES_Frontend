import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGamepad } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scrollToElement } from '../utils/scrollService';


const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSection, setOpenSection] = useState(null);
  
  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // Handle navigation with both internal and external links
  const handleNavigation = (item) => {
    if (item.scrollTo) {
      // If we're already on the home page, just scroll to the element
      if (location.pathname === '/') {
        // Add 100px offset to scroll above the services section
        scrollToElement(item.scrollTo, {}, 100);
      } else {
        // Otherwise, navigate to home page and then scroll
        navigate('/');
        // The scrolling will happen after navigation completes
        setTimeout(() => {
          // Add 100px offset to scroll above the services section
          scrollToElement(item.scrollTo, {}, 100);
        }, 100);
      }
    } else {
      // Regular navigation
      navigate(item.path);
    }
  };

  const handleLogoClick = () => {
    window.open('/profile', '_blank'); // Opens the profile page in a new tab
  };

    return (
      <section className="bg-[#292B35] text-[#E0E0E0] fixed bottom-0 w-full z-20">
        <div className='h-50px flex items-center'>
          <div className='w-[10%] flex justify-start'>
            <button onClick={handleLogoClick}>
              <FaGamepad className="h-8 w-8 text-white" />
            </button>
          </div>
        </div>
      </section>
    );
  };


export default Footer;
