import React, { useState } from 'react';

const LeftPanel = ({ contacts = [], onSelectContact, activeContactId, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts?.filter(contact =>
    contact.NAME.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="h-full flex flex-col">
      {/* Search bar */}
      <div className="px-2 mb-4 flex-shrink-0">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts..."
            className="w-full bg-[#292B35] border border-[#95C5C5]/20 rounded-full py-2 pl-10 pr-4 text-[#E0E0E0] placeholder:text-[#95C5C5]/70 focus:outline-none focus:ring-1 focus:ring-[#95C5C5]"
          />
          <div className="absolute left-3 top-2.5 text-[#95C5C5]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contacts list with improved scrolling */}
      <div 
        className="flex-1 overflow-y-auto px-2"
        style={{
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#95C5C5 transparent'
        }}
      >
        {isLoading ? (
          Array(5).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse flex p-2 mb-2 rounded-lg">
              <div className="rounded-full bg-[#353744] h-12 w-12"></div>
              <div className="ml-3 flex-1">
                <div className="h-4 bg-[#353744] rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-[#353744] rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : (
          filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <div
                key={contact.ID}
                onClick={() => onSelectContact(contact)}
                className={`p-3 mb-2 rounded-lg flex items-center cursor-pointer transition-all hover:bg-[#2D2F3A] ${
                  activeContactId === contact.ID ? 'bg-[#353744] border-l-4 border-[#EE8631]' : ''
                }`}
              >
                <div className="relative">
                  <img 
                    src={contact.PROFILE_PIC} 
                    alt={contact.NAME} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#95C5C5]/30" 
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-[1.5px] border-[#292B35]"></div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className={`font-medium ${activeContactId === contact.ID ? 'text-[#E0E0E0]' : 'text-[#E0E0E0]/90'}`}>
                      {contact.NAME}
                    </h3>
                    <span className="text-xs text-[#95C5C5]">{contact.TIMESTAMP}</span>
                  </div>
                  <p className="text-sm text-[#95C5C5] truncate mt-1">
                    {contact.LAST_MESSAGE}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-[#95C5C5]">
              No contacts found matching "{searchQuery}"
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LeftPanel;