import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Send,
  User,
  Clock,
  CheckCheck,
} from "lucide-react";
import peopleData from "./people.json";
import messagesData from "./messages.json";

// Fetch contacts from JSON file
const fetchContacts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(peopleData.CONTACTS);
    }, 600);
  });
};

// Fetch conversation data
const fetchConversation = (contactId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const conversation = messagesData.CONVERSATIONS[contactId] || [];
      resolve(
        conversation.sort((a, b) => {
          return (
            new Date("1970/01/01 " + a.TIMESTAMP) -
            new Date("1970/01/01 " + b.TIMESTAMP)
          );
        })
      );
    }, 400);
  });
};

// Contact Card Component
const ContactCard = ({ contact, isActive, onClick }) => {
  const activeClass = isActive
    ? "bg-gradient-to-r from-[#292B35] to-[#353744] border-l-4 border-[#EE8631]"
    : "hover:bg-[#292B35]/60";

  return (
    <div
      className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all ${activeClass}`}
      onClick={() => onClick(contact)}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#AD662F] to-[#EE8631] flex items-center justify-center overflow-hidden">
          {contact.AVATAR ? (
            <img
              src={contact.AVATAR}
              alt={contact.NAME}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={24} color="#E0E0E0" />
          )}
        </div>
        {contact.ONLINE && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#191A21]"></div>
        )}
      </div>
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[#E0E0E0] truncate">
            {contact.NAME}
          </h3>
          <span className="text-xs text-[#95C5C5]/70">
            {contact.LAST_MESSAGE_TIME}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#95C5C5] truncate">
            {contact.LAST_MESSAGE}
          </p>
          {contact.UNREAD_COUNT > 0 && (
            <div className="bg-[#EE8631] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {contact.UNREAD_COUNT}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Left Panel Component
const LeftPanel = ({
  contacts,
  onSelectContact,
  activeContactId,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse flex items-center">
            <div className="rounded-full bg-[#292B35] h-12 w-12"></div>
            <div className="ml-3 space-y-2 flex-1">
              <div className="h-4 bg-[#292B35] rounded w-3/4"></div>
              <div className="h-3 bg-[#292B35] rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full bg-[#292B35] text-[#E0E0E0] rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#95C5C5]/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-[#95C5C5]"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-2">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactCard
              key={contact.ID}
              contact={contact}
              isActive={activeContactId === contact.ID}
              onClick={onSelectContact}
            />
          ))
        ) : (
          <div className="text-center p-4 text-[#95C5C5]">
            No contacts found
          </div>
        )}
      </div>

      <div className="p-3 border-t border-[#95C5C5]/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#95C5C5] to-[#292B35] flex items-center justify-center">
            <User size={20} color="#E0E0E0" />
          </div>
          <div>
            <h3 className="font-semibold text-[#E0E0E0]">Your Profile</h3>
            <p className="text-xs text-[#95C5C5]">Pro Gamer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Message Bubble Component
const MessageBubble = ({ message, isUser }) => {
  const alignment = isUser ? "justify-end" : "justify-start";
  const bubbleStyle = isUser
    ? "bg-gradient-to-r from-[#95C5C5]/90 to-[#95C5C5]/70 text-[#292B35]"
    : "bg-[#292B35] text-[#E0E0E0]";

  return (
    <div className={`flex ${alignment} mb-4`}>
      <div className="max-w-[70%]">
        <div className={`rounded-2xl px-4 py-2 ${bubbleStyle}`}>
          <p>{message.TEXT}</p>
        </div>
        <div
          className={`flex items-center mt-1 text-xs ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <Clock size={12} className="text-[#95C5C5]/70 mr-1" />
          <span className="text-[#95C5C5]/70">{message.TIMESTAMP}</span>
          {isUser && (
            <CheckCheck size={12} className="text-[#95C5C5]/70 ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};

// Chat Window Component
const ChatWindow = ({ contact, messages, onSendMessage, isLoading }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-[#292B35] to-[#353744] p-4 border-b border-[#95C5C5]/30 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#AD662F] to-[#EE8631] flex items-center justify-center overflow-hidden">
          {contact.AVATAR ? (
            <img
              src={contact.AVATAR}
              alt={contact.NAME}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={20} color="#E0E0E0" />
          )}
        </div>
        <div className="ml-3">
          <h2 className="text-[#E0E0E0] font-bold">{contact.NAME}</h2>
          <p className="text-xs text-[#95C5C5]">
            {contact.ONLINE ? "Online" : "Last active " + contact.LAST_ACTIVE}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#191A21]/70">
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex ${
                  i % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <div className="animate-pulse max-w-[70%]">
                  <div
                    className={`rounded-2xl h-12 w-48 ${
                      i % 2 === 0 ? "bg-[#95C5C5]/30" : "bg-[#292B35]/50"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : messages.length > 0 ? (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.ID}
                message={message}
                isUser={message.IS_USER}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6">
              <div className="bg-gradient-to-br from-[#EE8631]/20 to-[#AD662F]/20 p-4 rounded-full inline-flex mb-4">
                <MessageSquare size={32} className="text-[#EE8631]" />
              </div>
              <h3 className="text-[#E0E0E0] font-medium mb-2">
                No messages yet
              </h3>
              <p className="text-sm text-[#95C5C5]">
                Start a conversation with {contact.NAME}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-[#95C5C5]/20">
        <form onSubmit={handleSend} className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-[#292B35] text-[#E0E0E0] rounded-l-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[#95C5C5]/50"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#EE8631] to-[#AD662F] hover:opacity-90 text-white rounded-r-lg py-3 px-5 flex items-center transition-opacity"
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

// Main DM Page Component
const DMPage = () => {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConversationLoading, setIsConversationLoading] = useState(false);

  // Fetch contacts on component mount
  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);
        const contactsData = await fetchContacts();
        setContacts(contactsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    getContacts();
  }, []);

  // Fetch conversation when activeContact changes
  useEffect(() => {
    const getConversation = async () => {
      if (!activeContact) return;

      try {
        setIsConversationLoading(true);
        const conversationData = await fetchConversation(activeContact.ID);
        setMessages(conversationData);
        setIsConversationLoading(false);
      } catch (error) {
        console.error("Error fetching conversation:", error);
        setIsConversationLoading(false);
      }
    };

    getConversation();
  }, [activeContact]);

  const handleContactSelect = (contact) => {
    setActiveContact(contact);
  };

  const handleSendMessage = (newMessage) => {
    if (!activeContact) return;

    const updatedMessages = [
      ...messages,
      {
        ID: `msg_${Date.now()}`,
        TEXT: newMessage,
        IS_USER: true,
        TIMESTAMP: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ];

    setMessages(updatedMessages);

    // Simulate a response after a delay
    setTimeout(() => {
      const responseMessage = {
        ID: `msg_${Date.now() + 1}`,
        TEXT: `This is a response from ${activeContact.NAME}. Good luck with your next tournament!`,
        IS_USER: false,
        TIMESTAMP: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...updatedMessages, responseMessage]);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-[#292B35] p-4">
      {/* Left Panel - Contacts */}
      <div className="w-1/3 pr-3">
        <div className="bg-[#191A21] h-full rounded-lg shadow-lg overflow-hidden border border-[#95C5C5]/20">
          <div className="bg-gradient-to-r from-[#292B35] to-[#353744] p-4 border-b border-[#95C5C5]/30">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-[#EE8631] to-[#AD662F] p-2 rounded-lg mr-3">
                <MessageSquare size={20} color="#E0E0E0" />
              </div>
              <div>
                <h2 className="text-[#E0E0E0] font-bold text-xl">Messages</h2>
                <p className="text-[#95C5C5] text-sm">
                  Connect with your esports network
                </p>
              </div>
            </div>
          </div>
          <LeftPanel
            contacts={contacts}
            onSelectContact={handleContactSelect}
            activeContactId={activeContact?.ID}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Right Panel - Chat */}
      <div className="w-2/3 pl-3">
        {activeContact ? (
          <div className="bg-[#191A21] h-full rounded-lg shadow-lg overflow-hidden border border-[#95C5C5]/20">
            <ChatWindow
              contact={activeContact}
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isConversationLoading}
            />
          </div>
        ) : (
          <div className="bg-[#191A21] h-full rounded-lg shadow-lg flex items-center justify-center border border-[#95C5C5]/20">
            <div className="text-center p-8 max-w-md">
              <div className="bg-gradient-to-br from-[#EE8631] to-[#AD662F] p-6 rounded-full inline-flex mb-6 shadow-lg">
                <MessageSquare size={32} color="white" />
              </div>
              <h2 className="text-2xl font-bold text-[#E0E0E0] mb-3">
                Welcome to Team Chat
              </h2>
              <p className="text-[#95C5C5] mb-6">
                Select a conversation to connect with teammates, coaches and
                competitors in your esports network
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-[#95C5C5] to-[#EE8631] mx-auto rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DMPage;
