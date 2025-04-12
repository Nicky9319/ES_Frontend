import React, { useState } from 'react';

const RightSlider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`fixed top-1/2 right-0 transform -translate-y-1/2 z-10`}>
        <button 
          className="bg-orange-500 text-white px-4 py-2 rounded-l-lg hover:bg-orange-600"
          onClick={toggleSlider}
        >
          Notifications
        </button>
      </div>

      <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-20`}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="bg-gray-700 p-3 rounded">
              <h3 className="font-bold">Tournament Starting Soon</h3>
              <p>The Winter Cup starts in 2 hours. Get ready!</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <h3 className="font-bold">New Team Registered</h3>
              <p>Team Phoenix has joined the Summer League.</p>
            </div>
          </div>
          <button 
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={toggleSlider}
          >
            Close Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default RightSlider;
