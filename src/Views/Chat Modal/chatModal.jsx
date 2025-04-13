import React, { useState, useEffect } from "react";
import conversationData from "./conversations.json"; // adjust the path as needed

// Simulated API call to fetch conversation data for a specific sender from the imported JSON data
const fetchConversation = (sender) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Look up the conversation in the imported JSON file.
      resolve(conversationData[sender] || []);
    }, 1000); // simulate 1 second network delay
  });
};

// Simulated API call to send a message
const sendMessageAPI = (sender, newMessage) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a successful API call returning the new message
      resolve({ sender: "You", text: newMessage });
    }, 500); // simulate 500ms delay
  });
};

const ChatModal = ({ isOpen, closeModal, message }) => {
  // conversations state holds conversation history for each sender
  const [conversations, setConversations] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Determine the selected sender (chat partner)
  const selectedSender =
    message && message.sender ? message.sender : "AceStriker";

  // Get conversation messages for the selected sender (or empty array if not loaded)
  const conversationMessages = conversations[selectedSender] || [];

  // Fetch conversation when the selected sender changes
  useEffect(() => {
    setLoading(true);
    fetchConversation(selectedSender).then((data) => {
      setConversations((prev) => ({
        ...prev,
        [selectedSender]: data,
      }));
      setLoading(false);
    });
  }, [selectedSender]);

  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    // Simulate sending a message via API and update the conversation
    const newMsg = await sendMessageAPI(selectedSender, inputValue);

    setConversations((prev) => ({
      ...prev,
      [selectedSender]: [...(prev[selectedSender] || []), newMsg],
    }));
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Optional backdrop (visual only, not interactive) */}
      <div className="absolute inset-0"></div>

      {/* Modal content – interactive */}
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
              {loading ? (
                <p className="text-gray-400">Loading conversation...</p>
              ) : conversationMessages.length > 0 ? (
                conversationMessages.map((msg, index) => {
                  const isUser = msg.sender === "You";
                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isUser ? "justify-end" : "justify-start"
                      } items-start gap-2`}
                    >
                      {/* Avatar for non-user messages */}
                      {!isUser && (
                        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                          {selectedSender.charAt(0)}
                        </div>
                      )}
                      {/* Message content */}
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
                      {/* Avatar for user messages (positioned on the right) */}
                      {isUser && (
                        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                          {"Y"}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400">
                  No messages available for {selectedSender}.
                </p>
              )}
            </div>

            {/* Message Input */}
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
