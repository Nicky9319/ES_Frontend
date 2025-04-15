import React, { useState, useRef, useEffect } from 'react';

const ChatWindow = ({ contact, messages, onSendMessage, isLoading }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-[#292B35] to-[#353744] p-4 border-b border-[#95C5C5]/30 flex items-center">
        <div className="relative">
          <img 
            src={contact.PROFILE_PIC} 
            alt={contact.NAME} 
            className="w-12 h-12 rounded-full object-cover border-2 border-[#95C5C5]" 
          />
        </div>
        <div className="ml-4">
          <h2 className="text-[#E0E0E0] font-bold text-lg">{contact.NAME}</h2>
          <p className="text-[#95C5C5] text-xs">{contact.BIO}</p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-grow p-4 overflow-y-auto bg-[#1E1F28]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 bg-[#95C5C5] rounded-full"></div>
              <p className="mt-2 text-[#95C5C5]">Loading conversation...</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div 
                key={message.ID || index} 
                className={`mb-4 flex ${message.IS_USER ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.IS_USER 
                      ? 'bg-gradient-to-r from-[#EE8631] to-[#AD662F] text-white rounded-tr-none' 
                      : 'bg-[#353744] text-[#E0E0E0] rounded-tl-none'
                  }`}
                >
                  <div className="text-sm">{message.TEXT}</div>
                  <div className={`text-xs mt-1 ${message.IS_USER ? 'text-white/70' : 'text-[#95C5C5]'}`}>
                    {message.TIMESTAMP}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message input */}
      <form onSubmit={handleSubmit} className="p-3 bg-[#292B35] border-t border-[#95C5C5]/20">
        <div className="flex items-center bg-[#353744] rounded-full overflow-hidden px-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow py-3 bg-transparent text-[#E0E0E0] focus:outline-none placeholder:text-[#95C5C5]/70"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim()} 
            className="ml-2 p-2 bg-[#EE8631] hover:bg-[#AD662F] transition-colors rounded-full disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;