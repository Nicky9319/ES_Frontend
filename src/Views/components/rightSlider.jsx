import React, { useState } from "react";
import ChatModal from "../Chat Modal/chatModal";

const RightSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Messages"); // Changed default from "Notifications" to "Messages"
  const [isModalOpen, setIsModalOpen] = useState(false); // State for opening/closing the modal
  const [currentMessage, setCurrentMessage] = useState(null); // Store the current message that was clicked

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  // When opening the modal, we pass the message object (with sender name)
  const openChatModal = (message) => {
    setCurrentMessage(message);
    setIsModalOpen(true);
  };

  const closeChatModal = () => {
    setIsModalOpen(false);
    setCurrentMessage(null);
  };

  const panelBgColor = "#292B35";
  const textColor = "#E0E0E0";
  const primaryAccentColor = "#EE8631"; // Orange
  const secondaryAccentColor = "#95C5C5"; // Teal
  const darkAccentColor = "#AD662F"; // Dark Orange

  return (
    <>
      {/* Subtle Background Blur when modal is open */}
      {isModalOpen && (
        // <div className="fixed inset-0 backdrop-blur-md bg-opacity- z-10"></div>
        <div className="fixed inset-0 z-10"></div>
      )}

      {/* Open button */}
      <div
        className={`fixed top-1/2 right-0 transform -translate-y-1/2 z-10 transition-transform duration-300 ${
          isOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <button
          className={`bg-[${secondaryAccentColor}] text-[${panelBgColor}] py-2 px-3 rounded-l-lg hover:opacity-80 shadow-md transition-all duration-300 flex items-center`}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="text-sm">Activity</span>
        </button>
      </div>

      <div
        className={`fixed top-1/2 right-0 h-[600px] w-60 bg-[${panelBgColor}] text-[${textColor}] transform transition-transform duration-300 ease-in-out -translate-y-[47%] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-20 rounded-l-lg overflow-hidden shadow-lg border-l border-t border-b border-[${primaryAccentColor}]/30 flex flex-col`}
      >
        {/* Close button */}
        <div className="absolute top-2 left-2 z-30">
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

        {/* Navbar */}
        <div className="relative p-2 border-b border-[${primaryAccentColor}]/20">
          <button
            onClick={() => setActiveTab("Messages")}
            className={`text-sm font-medium py-1 px-3 rounded transition-colors duration-200 block mx-auto ${
              activeTab === "Messages"
                ? `text-[${primaryAccentColor}] border-b-2 border-[${primaryAccentColor}]`
                : `text-[${textColor}]/70 hover:text-[${textColor}]`
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => window.open("/dm-page", "_blank")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:text-[${primaryAccentColor}]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 2l4 4-10 10-4 1 1-4L18 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 2h8v8"
              />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {activeTab === "Messages" && (
            <>
              {/* Example Message Items */}
              <div
                className={`bg-[${panelBgColor}]/50 border border-[${primaryAccentColor}]/30 p-2 rounded text-xs`}
                onClick={() =>
                  openChatModal({
                    sender: "AceStriker",
                    text: "Don't forget practice tonight at 8 PM EST!",
                  })
                }
              >
                <h3
                  className={`font-semibold text-[${primaryAccentColor}] mb-0.5`}
                >
                  Team Chat
                </h3>
                <p className={`text-[${textColor}]/80 truncate`}>
                  AceStriker: Don't forget practice tonight at 8 PM EST!
                </p>
              </div>
              <div
                className={`bg-[${panelBgColor}]/50 border border-[${primaryAccentColor}]/30 p-2 rounded text-xs`}
                onClick={() =>
                  openChatModal({
                    sender: "Coach Mike",
                    text: "Let's review the VODs tomorrow morning.",
                  })
                }
              >
                <h3
                  className={`font-semibold text-[${primaryAccentColor}] mb-0.5`}
                >
                  Coach Mike
                </h3>
                <p className={`text-[${textColor}]/80 truncate`}>
                  Let's review the VODs tomorrow morning.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isModalOpen}
        closeModal={closeChatModal}
        message={currentMessage}
      />
    </>
  );
};

export default RightSlider;
