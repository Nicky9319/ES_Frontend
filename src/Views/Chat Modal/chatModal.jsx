import React, { useState } from "react";

const ChatModal = ({ isOpen, closeModal, message }) => {
  const [inputValue, setInputValue] = useState("");

  // Dummy messages data
  const dummyMessages = [
    {
      sender: "AceStriker",
      text: "Don't forget practice tonight at 8 PM EST!",
    },
    {
      sender: "Coach Mike",
      text: "Let's review the VODs tomorrow morning.",
    },
    {
      sender: "ShadowGamer",
      text: "Any plans for the weekend?",
    },
    {
      sender: "TeamLeader",
      text: "Great job on the project, let's meet up tomorrow.",
    },
  ];

  // Determine the selected sender from the passed message prop.
  const selectedSender =
    message && message.sender ? message.sender : dummyMessages[0].sender;

  // Filter dummy messages to only those for the selected sender.
  const filteredMessages = dummyMessages.filter(
    (msg) => msg.sender === selectedSender
  );

  const handleSend = () => {
    // Replace this with your actual send logic.
    console.log("Sending message:", inputValue);
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-8 z-50 flex justify-center items-center pointer-events-none">
      {/* Set modal height to a fixed portion of the screen */}
      <div className="bg-white md:h-3/4 p-4 w-full md:w-3/4 lg:w-1/2 h-full rounded-lg shadow-lg overflow-auto pointer-events-auto flex flex-col">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-semibold text-lg">Chat with {selectedSender}</h3>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

        <div className="p-2 flex-1 w-fit">
          <div className="flex flex-col space-y-3">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded-md">
                  <p className="font-semibold text-sm">{msg.sender}</p>
                  <p className="text-sm">{msg.text}</p>
                </div>
              ))
            ) : (
              <p className="text-sm">
                No messages available for {selectedSender}.
              </p>
            )}
          </div>
        </div>

        {/* Chat Input Area */}
        <div className="border-t pt-2 flex items-center justify-end">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
