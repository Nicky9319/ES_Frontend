import React, { useState, useEffect } from 'react';
import ChatWindow from './chatWindow';
import LeftPanel from './leftPanel';
import peopleData from './people.json';
import messagesData from './messages.json';

// Update fetchContacts to use JSON file
const fetchContacts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(peopleData.CONTACTS);
    }, 1000);
  });
};

// Update fetchConversation to use capitalized JSON keys
const fetchConversation = (contactId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const conversation = messagesData.CONVERSATIONS[contactId] || [];
      resolve(conversation.sort((a, b) => {
        return new Date('1970/01/01 ' + a.TIMESTAMP) - new Date('1970/01/01 ' + b.TIMESTAMP);
      }));
    }, 800);
  });
};

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
    
    const updatedMessages = [...messages, {
      ID: `msg_${Date.now()}`,
      TEXT: newMessage,
      IS_USER: true,
      TIMESTAMP: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }];
    
    setMessages(updatedMessages);
    
    // Simulate a response after a delay
    setTimeout(() => {
      const responseMessage = {
        ID: `msg_${Date.now() + 1}`,
        TEXT: `This is a simulated response from ${activeContact.NAME}`,
        IS_USER: false,
        TIMESTAMP: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages([...updatedMessages, responseMessage]);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-[#292B35] p-4">
      <div className="w-1/3 pr-3">
        <div className="bg-[#191A21] h-full rounded-lg shadow-lg overflow-hidden border border-[#95C5C5]/20">
          <div className="bg-gradient-to-r from-[#292B35] to-[#353744] p-4 border-b border-[#95C5C5]/30">
            <h2 className="text-[#E0E0E0] font-bold text-xl">Messages</h2>
            <p className="text-[#95C5C5] text-sm">Connect with your esports network</p>
          </div>
          <div className="p-2">
            <LeftPanel
              contacts={contacts}
              onSelectContact={handleContactSelect}
              activeContactId={activeContact?.id}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="white">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#E0E0E0] mb-3">Select a conversation</h2>
              <p className="text-[#95C5C5] mb-6">Connect with teammates, coaches and competitors in your esports network</p>
              <div className="w-32 h-1 bg-gradient-to-r from-[#95C5C5] to-[#EE8631] mx-auto rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DMPage;