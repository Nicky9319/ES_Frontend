import React, { useState } from "react";

const ChatModal = ({ isOpen, closeModal, message }) => {
  const initialMessages = [
    {
      sender: "AceStriker",
      text: "Don't forget practice tonight at 8 PM EST!",
    },
    { sender: "Coach Mike", text: "Let's review the VODs tomorrow morning." },
    { sender: "ShadowGamer", text: "Any plans for the weekend?" },
    {
      sender: "TeamLeader",
      text: "Great job on the project, let's meet up tomorrow.",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const selectedSender =
    message && message.sender ? message.sender : initialMessages[0].sender;

  const filteredMessages = messages.filter(
    (msg) => msg.sender === selectedSender || msg.sender === "You"
  );

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    setMessages([...messages, { sender: "You", text: inputValue }]);
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Optional backdrop (visual only, not interactive) */}
      <div className="absolute inset-0"></div>

      {/* Modal content — interactive */}
      <div className="flex items-center justify-center h-full w-full pointer-events-none">
        <div className="relative h-[600px] top-5 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 w-full max-w-[52rem] bg-[#1e1e24] text-[#dcdcdc] flex flex-col pointer-events-auto">
          {/* Header */}
          <div className="flex justify-between items-center bg-[#232323] px-6 py-4">
            <h3 className="text-[#ff8c32] font-bold text-xl">
              Chat with {selectedSender}
            </h3>
            <button
              onClick={closeModal}
              className="text-[#dcdcdc] hover:text-orange-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex flex-col flex-1">
            <div className="p-6 flex-1 overflow-y-auto flex flex-col space-y-4">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg, index) => {
                  const isUser = msg.sender === "You";
                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg max-w-xs shadow-md ${
                          isUser
                            ? "bg-[#2e2e35] text-[#f0f0f0] rounded-br-none"
                            : "bg-[#2a2a33] text-[#dcdcdc] rounded-bl-none"
                        }`}
                      >
                        <p
                          className={`text-sm font-medium mb-1 ${
                            isUser ? "text-[#cccccc]" : "text-[#ff8c32]"
                          }`}
                        >
                          {msg.sender}
                        </p>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400">
                  No messages available for {selectedSender}.
                </p>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-700 px-6 py-4 flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-3 bg-[#2a2a33] text-[#dcdcdc] placeholder-gray-500 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={handleSend}
                className="bg-white hover:bg-gray-100 text-[#1e1e24] font-medium px-6 py-2 rounded-full shadow-lg transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
