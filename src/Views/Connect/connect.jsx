import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';

function Connect() {
    const navigate = useNavigate();
    // Add state to track current view
    const [currentView, setCurrentView] = useState('feed');

    // Updated handlers to change the current view
    const handleMentorClick = () => {
        console.log("Feed section clicked");
        setCurrentView('feed');
    };

    const handlePlayerClick = () => {
        console.log("News section clicked");
        setCurrentView('news');
    };

    // Sample mentor/person data
    const people = [
        { id: 1, name: "John Doe", role: "CSGO Coach", rating: 4.8, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Jane Smith", role: "Valorant Pro", rating: 4.9, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Alex Johnson", role: "Fortnite Mentor", rating: 4.7, image: "https://via.placeholder.com/150" },
        { id: 4, name: "Sam Wilson", role: "Dota 2 Analyst", rating: 4.6, image: "https://via.placeholder.com/150" },
        { id: 5, name: "Maria Garcia", role: "League of Legends Coach", rating: 4.9, image: "https://via.placeholder.com/150" },
        { id: 6, name: "Chris Taylor", role: "Overwatch Strategist", rating: 4.5, image: "https://via.placeholder.com/150" },
    ];

    return (
        <>

            <div className="flex h-screen bg-gray-100 justify-center">
                {/* Left Slider */}
                                <LeftSlider
                                    mentorIcon="🧑‍🏫"
                                    mentorTitle="Mentors"
                                    mentorDescription="Connect with experienced mentors"
                                    upperVerticalClick={handleMentorClick}
                                    playerIcon="🎮"
                                    playerTitle="Players"
                                    playerDescription="Find skilled players to team up with"
                                    lowerVerticalClick={handlePlayerClick}
                                />
                                
                                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            {/* Dynamic heading based on current view */}
                            <div className="px-4 py-2 sm:px-0">
                                <h2 className="text-2xl font-semibold mb-4">
                                    {currentView === 'feed' ? 'Community Feed' : 'Esports News'}
                                </h2>
                            </div>
                            
                            {/* Filter section */}
                            <div className="px-4 py-2 sm:px-0 bg-white shadow rounded-lg mb-6">
                                <div className="flex flex-wrap items-center justify-between p-4">
                                    <div className="flex space-x-4 mb-2 sm:mb-0">
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                                            <option>Game</option>
                                            <option>CSGO</option>
                                            <option>Valorant</option>
                                            <option>Fortnite</option>
                                            <option>League of Legends</option>
                                        </select>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                                            <option>Role</option>
                                            <option>Coach</option>
                                            <option>Pro Player</option>
                                            <option>Analyst</option>
                                            <option>Mentor</option>
                                        </select>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                                            <option>Rating</option>
                                            <option>4.5+</option>
                                            <option>4.0+</option>
                                            <option>3.5+</option>
                                        </select>
                                    </div>
                                    <div className="w-full sm:w-auto">
                                        <input 
                                            type="text" 
                                            placeholder="Search..." 
                                            className="p-2 w-full sm:w-64 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Cards grid */}
                            <div className="px-4 sm:px-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {people.map(person => (
                                        <div key={person.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                            <div className="p-4 flex items-start space-x-4">
                                                <img 
                                                    src={person.image} 
                                                    alt={person.name} 
                                                    className="w-20 h-20 rounded-full object-cover"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
                                                    <p className="text-sm text-gray-600">{person.role}</p>
                                                    <div className="flex items-center mt-2">
                                                        <span className="text-yellow-500">★</span>
                                                        <span className="ml-1 text-sm text-gray-700">{person.rating}</span>
                                                    </div>
                                                    <button className="mt-2 bg-[#AD662F] text-white py-1 px-3 rounded-md text-sm hover:bg-[#8B5229]">
                                                        Connect
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                
                {/* Right Slider */}
                <RightSlider />
            </div>
        </>
    );
}

export default Connect;