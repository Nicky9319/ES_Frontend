import React, { useState } from 'react';

const LeftSlider = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Styling constants (mirroring right slider)
  const panelBgColor = "#292B35";
  const textColor = "#E0E0E0";
  const primaryAccentColor = "#EE8631"; // Orange
  const secondaryAccentColor = "#95C5C5"; // Teal
  const darkAccentColor = "#AD662F"; // Dark Orange

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Open button */}
      <div
        className={`fixed top-1/2 left-0 transform -translate-y-1/2 z-10 transition-transform duration-300 ${
          isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <button
          className={`bg-[${secondaryAccentColor}] text-[${panelBgColor}] py-2 px-3 rounded-r-lg hover:opacity-80 shadow-md transition-all duration-300 flex items-center`}
          onClick={toggleSlider}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-sm">Notifications</span>
        </button>
      </div>

      {/* Slider Panel */}
      <div
        className={`fixed top-1/2 left-0 h-[600px] w-60 bg-[${panelBgColor}] text-[${textColor}] transform transition-transform duration-300 ease-in-out -translate-y-[47%] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-20 rounded-r-lg overflow-hidden shadow-lg border-r border-t border-b border-[${primaryAccentColor}]/30 flex flex-col`}
      >
        {/* Close button */}
        <div className="absolute top-2 right-2 z-30">
          <button
            className={`bg-[${darkAccentColor}]/80 text-white px-1 py-1 rounded-full hover:bg-[${darkAccentColor}] shadow-sm transition-all duration-200 text-xs flex items-center justify-center w-5 h-5`}
            onClick={toggleSlider}
            aria-label="Close panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Header */}
        <div className="relative p-2 border-b border-[${primaryAccentColor}]/20">
          <h2 className={`text-sm font-medium text-[${primaryAccentColor}] text-center`}>
            Notifications
          </h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Example Notification Items */}
          <div
            className={`bg-[${panelBgColor}]/50 border border-[${primaryAccentColor}]/30 p-2 rounded text-xs`}
          >
            <h3 className={`font-semibold text-[${primaryAccentColor}] mb-0.5`}>
              System Alert
            </h3>
            <p className={`text-[${textColor}]/80 truncate`}>
              Server maintenance tonight at 10 PM.
            </p>
          </div>
          <div
            className={`bg-[${panelBgColor}]/50 border border-[${primaryAccentColor}]/30 p-2 rounded text-xs`}
          >
            <h3 className={`font-semibold text-[${primaryAccentColor}] mb-0.5`}>
              Friend Request
            </h3>
            <p className={`text-[${textColor}]/80 truncate`}>
              New friend request from GamerX.
            </p>
          </div>
          {/* ...more notification items... */}
        </div>
      </div>
    </>
  );
};

export default LeftSlider;
