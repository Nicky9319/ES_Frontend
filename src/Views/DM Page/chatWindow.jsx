import React, { useState, useRef, useEffect } from 'react';

const ChatWindow = ({ contact, messages, onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() === '' || isSending) return;
    
    // Send the message
    setIsSending(true);
    onSendMessage(inputText);
    setInputText('');
    
    // Reset sending state after a short delay
    setTimeout(() => {
      setIsSending(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    // If Enter is pressed without Shift, submit the form
    if (e.key === 'Enter' && !e.shiftKey && !isSending) {
      e.preventDefault(); // Prevent default to avoid creating a new line
      handleSubmit(e);
    }
    // If Shift+Enter is pressed, let the default behavior (new line) happen
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Chat header with contact info */}
      <div className="bg-[#292B35] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={contact.profilePic} 
            alt={contact.name}
            className="h-10 w-10 rounded-full object-cover mr-3"
          />
          <div>
            <h2 className="font-semibold text-lg">{contact.name}</h2>
            <p className="text-xs text-gray-300">{contact.bio}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-[#3D3F4A] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-[#3D3F4A] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-[#3D3F4A] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin bg-gray-50">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-4 border-[#EE8631] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : messages.length > 0 ? (
          <>
            <div className="text-center text-xs text-gray-500 mb-6">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <img 
                    src={contact.profilePic} 
                    alt={contact.name}
                    className="h-8 w-8 rounded-full object-cover mr-2 self-end"
                  />
                )}
                <div 
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
                    message.isUser 
                      ? 'bg-[#EE8631] text-white rounded-tr-none' 
                      : 'bg-[#E0E0E0] text-[#292B35] rounded-tl-none'
                  }`}
                >
                  <div>{message.text}</div>
                  <div className={`text-xs mt-1 ${message.isUser ? 'text-orange-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </div>
                </div>
                {message.isUser && (
                  <div className="h-8 w-8 ml-2 self-end flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#EE8631]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="bg-[#E0E0E0] p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#292B35]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-center font-medium">Start your conversation</p>
            <p className="text-center text-sm mt-1">Send a message to {contact.name}</p>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex">
          <div className="flex-none pr-2">
            <button
              type="button"
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
              title="Add emoji"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isSending ? "Sending..." : "Type a message..."}
            className={`flex-1 rounded-full px-4 py-2 focus:outline-none bg-gray-100 focus:ring-2 focus:ring-[#EE8631] min-h-[40px] max-h-[120px] resize-none ${
              isSending ? 'text-gray-500' : 'text-gray-800'
            }`}
            rows={1}
            disabled={isSending}
          />
          
          <div className="flex-none pl-2">
            <button 
              type="submit"
              className={`p-2 rounded-full transition-colors ${
                inputText.trim() === '' || isSending
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#EE8631] text-white hover:bg-[#AD662F]'
              }`}
              disabled={inputText.trim() === '' || isSending}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;