import React, { useState } from 'react';

// Define default props for easier usage
const defaultProps = {
  mentorIcon: '👨‍🏫',
  mentorTitle: 'Mentor',
  mentorDescription: 'Guide players & share expertise',
  mentorColor: '#95C5C5', // Default mentor color
  upperVerticalClick: () => console.log('Mentor clicked'),
  playerIcon: '🎮',
  playerTitle: 'Player',
  playerDescription: 'Level up your gaming skills',
  playerColor: '#EE8631', // Default player color
  lowerVerticalClick: () => console.log('Player clicked'),
};

const LeftSlider = ({
  mentorIcon = defaultProps.mentorIcon,
  mentorTitle = defaultProps.mentorTitle,
  mentorDescription = defaultProps.mentorDescription,
  mentorColor = defaultProps.mentorColor,
  upperVerticalClick = defaultProps.upperVerticalClick,
  playerIcon = defaultProps.playerIcon,
  playerTitle = defaultProps.playerTitle,
  playerDescription = defaultProps.playerDescription,
  playerColor = defaultProps.playerColor,
  lowerVerticalClick = defaultProps.lowerVerticalClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverMentor, setHoverMentor] = useState(false);
  const [hoverPlayer, setHoverPlayer] = useState(false);

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to generate dynamic styles
  const getDynamicStyles = (isHover, color) => ({
    textColor: isHover ? color : '#E0E0E0',
    textSize: isHover ? 'text-sm' : 'text-xs',
    borderColor: color,
  });

  const mentorStyles = getDynamicStyles(hoverMentor, mentorColor);
  const playerStyles = getDynamicStyles(hoverPlayer, playerColor);

  return (
    <>
      {/* Menu button */}
      <div
        className={`fixed top-1/2 left-0 transform -translate-y-1/2 z-10 transition-transform duration-300 ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <button 
          className={`bg-[${playerColor}] text-white py-2 px-3 rounded-r-lg hover:opacity-80 shadow-md transition-all duration-300 flex items-center`}
          onClick={toggleSlider}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Menu</span>
        </button>
      </div>

      {/* Main slider div */}
      <div
        className={`fixed top-1/2 left-0 h-60 w-48 bg-[#292B35] text-[#E0E0E0] transform transition-transform duration-300 ease-in-out -translate-y-1/2 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-20 rounded-r-lg overflow-hidden relative shadow-lg border-r border-t border-b border-[${mentorColor}]/30`}
      >
        {/* Close button */}
        <div className="absolute top-2 right-2 z-30">
          <button 
            className={`bg-[${playerColor}]/80 text-white px-1 py-1 rounded-full hover:bg-[${playerColor}] shadow-sm transition-all duration-200 text-xs flex items-center justify-center w-5 h-5`}
            onClick={toggleSlider}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Upper half - Mentor section */}
        <div 
          className="h-1/2 flex flex-col items-center justify-center border-b border-[#95C5C5]/20 pt-1 cursor-pointer"
          onMouseEnter={() => setHoverMentor(true)}
          onMouseLeave={() => setHoverMentor(false)}
          onClick={upperVerticalClick}
        >
          <div className="p-2 transition-transform duration-300 transform hover:scale-105">
            <div 
              className="w-16 h-16 mx-auto bg-[#292B35] rounded-full flex items-center justify-center shadow-md border"
              style={{ borderColor: mentorStyles.borderColor }}
            >
              <span className="text-xl">{mentorIcon}</span>
            </div>
            <div className="mt-1 text-center">
              <span 
                className={`font-medium transition-all duration-300 ${mentorStyles.textSize}`}
                style={{ color: mentorStyles.textColor }}
              >
                {mentorTitle}
              </span>
              {hoverMentor && (
                <p className="text-[10px] text-[#E0E0E0]/70 mt-0.5 max-w-[120px] mx-auto whitespace-nowrap">
                  {mentorDescription}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Lower half - Player section */}
        <div 
          className="h-1/2 flex flex-col items-center justify-center relative cursor-pointer"
          onMouseEnter={() => setHoverPlayer(true)}
          onMouseLeave={() => setHoverPlayer(false)}
          onClick={lowerVerticalClick}
        >
          <div className="p-2 transition-transform duration-300 transform hover:scale-105">
            <div 
              className="w-16 h-16 mx-auto bg-[#292B35] rounded-full flex items-center justify-center shadow-md border"
              style={{ borderColor: playerStyles.borderColor }}
            >
              <span className="text-xl">{playerIcon}</span>
            </div>
            <div className="mt-1 text-center">
              <span 
                className={`font-medium transition-all duration-300 ${playerStyles.textSize}`}
                style={{ color: playerStyles.textColor }}
              >
                {playerTitle}
              </span>
              {hoverPlayer && (
                <p className="text-[10px] text-[#E0E0E0]/70 mt-0.5 max-w-[120px] mx-auto whitespace-nowrap">
                  {playerDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSlider;
