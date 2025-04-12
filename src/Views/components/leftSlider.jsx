import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LeftSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverMentor, setHoverMentor] = useState(false);
  const [hoverPlayer, setHoverPlayer] = useState(false);

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`fixed top-1/2 left-0 transform -translate-y-1/2 z-10`}>
        <button 
          className="bg-[#EE8631] text-white py-2 px-3 rounded-r-lg hover:bg-[#AD662F] shadow-md transition-all duration-300 flex items-center"
          onClick={toggleSlider}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Menu</span>
        </button>
      </div>

      <div className={`fixed top-1/2 left-0 h-60 w-60 bg-[#292B35] text-[#E0E0E0] transform transition-transform duration-300 ease-in-out -translate-y-1/2 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-20 rounded-r-lg overflow-hidden relative shadow-lg border-r border-t border-b border-[#95C5C5]/30`}>
        {/* Close button - smaller and more compact */}
        <div className="absolute top-2 right-2 z-30">
          <button 
            className="bg-[#AD662F] text-white px-1 py-1 rounded-full hover:bg-[#EE8631] shadow-sm transition-all duration-200 text-xs flex items-center justify-center w-5 h-5"
            onClick={toggleSlider}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Title - smaller and more compact */}
        {/* <div className="w-full text-center pt-2 pb-0">
          <h3 className="text-xs font-semibold text-[#95C5C5] tracking-wide">CHOOSE ROLE</h3>
        </div> */}
        
        {/* Upper half - Mentor section */}
        <div className="h-1/2 flex flex-col items-center justify-center border-b border-[#95C5C5]/20 pt-1">
          <div 
            className="p-2 cursor-pointer transition-transform duration-300 transform hover:scale-105"
            onMouseEnter={() => setHoverMentor(true)}
            onMouseLeave={() => setHoverMentor(false)}
          >
            <div className="w-16 h-16 mx-auto bg-[#292B35] rounded-full flex items-center justify-center shadow-md border border-[#95C5C5]">
              <span className="text-xl">👨‍🏫</span>
            </div>
            <div className="mt-1 text-center">
              <span className={`font-medium transition-all duration-300 ${hoverMentor ? 'text-[#95C5C5] text-sm' : 'text-[#E0E0E0] text-xs'}`}>
                Mentor
              </span>
              {hoverMentor && (
                <p className="text-[10px] text-[#E0E0E0]/70 mt-0.5 max-w-[120px] mx-auto whitespace-nowrap">Guide players & share expertise</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Lower half - Player section */}
        <div className="h-1/2 flex flex-col items-center justify-center relative">
          <div 
            className="p-2 cursor-pointer transition-transform duration-300 transform hover:scale-105"
            onMouseEnter={() => setHoverPlayer(true)}
            onMouseLeave={() => setHoverPlayer(false)}
          >
            <div className="w-16 h-16 mx-auto bg-[#292B35] rounded-full flex items-center justify-center shadow-md border border-[#EE8631]">
              <span className="text-xl">🎮</span>
            </div>
            <div className="mt-1 text-center">
              <span className={`font-medium transition-all duration-300 ${hoverPlayer ? 'text-[#EE8631] text-sm' : 'text-[#E0E0E0] text-xs'}`}>
                Player
              </span>
              {hoverPlayer && (
                <p className="text-[10px] text-[#E0E0E0]/70 mt-0.5 max-w-[120px] mx-auto whitespace-nowrap">Level up your gaming skills</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSlider;
