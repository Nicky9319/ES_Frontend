import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LeftSlider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`fixed top-1/2 left-0 transform -translate-y-1/2 z-10`}>
        <button 
          className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600"
          onClick={toggleSlider}
        >
          Menu
        </button>
      </div>

      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-20`}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <nav className="space-y-2">
            <Link to="/" className="menu-item">Home</Link>
            <Link to="/tournaments" className="menu-item">Tournaments</Link>
            <Link to="/teams" className="menu-item">Teams</Link>
            <Link to="/players" className="menu-item">Players</Link>
            <Link to="/news" className="menu-item">News</Link>
            <Link to="/settings" className="menu-item">Settings</Link>
          </nav>
          <button 
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={toggleSlider}
          >
            Close Menu
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSlider;
