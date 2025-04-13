import React from 'react';

const LeftPanel = ({ contacts, onSelectContact, activeContactId, isLoading }) => {
    return (
        <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Header */}
            <div className="bg-[#292B35] text-white px-4 py-4">
                <h2 className="font-semibold text-xl">Messages</h2>
                <p className="text-xs text-gray-300">Connect with fellow gamers</p>
            </div>
            
            {/* Search bar */}
            <div className="px-4 py-3 border-b border-gray-200">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#EE8631]"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            
            {/* Contacts list */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
                        <div className="w-12 h-12 border-4 border-[#EE8631] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p>Loading contacts...</p>
                    </div>
                ) : contacts.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {contacts.map((contact) => (
                            <li 
                                key={contact.id} 
                                onClick={() => onSelectContact(contact)}
                                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                                    activeContactId === contact.id ? 'bg-[#E0E0E0]' : ''
                                }`}
                            >
                                <div className="flex items-start">
                                    <div className="relative">
                                        <img 
                                            src={contact.profilePic} 
                                            alt={contact.name}
                                            className="h-12 w-12 rounded-full object-cover mr-3"
                                        />
                                        <div className="absolute bottom-0 right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                                            <span className="text-xs text-gray-500">{contact.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                                        <p className="text-xs text-gray-400 truncate mt-0.5">{contact.bio}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-center font-medium">No conversations yet</p>
                        <p className="text-center text-sm mt-1">Connect with other players to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeftPanel;