import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';

// Mentor Card Component with updated styling
const MentorCard = ({ mentor }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-[#95C5C5] transform hover:-translate-y-1">
            <div className="p-5 flex items-start space-x-4">
                <div className="relative">
                    <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#E0E0E0]"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#EE8631] text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                        {mentor.rating}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#292B35]">{mentor.name}</h3>
                    <p className="text-sm font-medium text-[#95C5C5] mb-1">{mentor.role}</p>
                    <div className="flex items-center text-xs text-[#292B35] opacity-70 mb-2">
                        <span className="mr-2">⭐ {mentor.rating}</span>
                        <span>🕒 {mentor.experience}</span>
                        <span className="ml-auto font-semibold text-[#EE8631]">{mentor.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        Professional esports coach specializing in strategy and skill development.
                    </p>
                    <button className="w-full bg-gradient-to-r from-[#AD662F] to-[#EE8631] text-white py-2 px-4 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                        Book Session
                    </button>
                </div>
            </div>
        </div>
    );
};

// Player Card Component with updated styling
const PlayerCard = ({ player }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-[#EE8631] transform hover:-translate-y-1">
            <div className="p-5 flex items-start space-x-4">
                <div className="relative">
                    <img
                        src={player.image}
                        alt={player.name}
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#E0E0E0]"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#95C5C5] text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                        {player.rating}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#292B35]">{player.name}</h3>
                    <p className="text-sm font-medium text-[#EE8631] mb-1">{player.role}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2 py-1 bg-[#E0E0E0] text-[#292B35] rounded-full text-xs font-medium">
                            {player.skill}
                        </span>
                        <span className="px-2 py-1 bg-[#E0E0E0] text-[#292B35] rounded-full text-xs font-medium">
                            {player.rank}
                        </span>
                        <span className="px-2 py-1 bg-[#E0E0E0] text-[#292B35] rounded-full text-xs font-medium">
                            {player.availability}
                        </span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-[#95C5C5] to-[#6BA4A4] text-white py-2 px-4 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                        Team Up
                    </button>
                </div>
            </div>
        </div>
    );
};

// Simulated API calls
const fetchMentors = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "John Doe", role: "CSGO Coach", experience: "5 years", rating: 4.8, image: "https://via.placeholder.com/150", price: "$50/hr" },
                { id: 2, name: "Maria Garcia", role: "League of Legends Coach", experience: "7 years", rating: 4.9, image: "https://via.placeholder.com/150", price: "$65/hr" },
                { id: 3, name: "Alex Johnson", role: "Fortnite Mentor", experience: "4 years", rating: 4.7, image: "https://via.placeholder.com/150", price: "$45/hr" },
                { id: 4, name: "Sam Wilson", role: "Dota 2 Analyst", experience: "6 years", rating: 4.6, image: "https://via.placeholder.com/150", price: "$55/hr" },
                { id: 5, name: "Chris Taylor", role: "Overwatch Strategist", experience: "3 years", rating: 4.5, image: "https://via.placeholder.com/150", price: "$40/hr" },
                { id: 6, name: "Lisa Wong", role: "Apex Legends Coach", experience: "4 years", rating: 4.8, image: "https://via.placeholder.com/150", price: "$45/hr" },
            ]);
        }, 1000);
    });
};

const fetchPlayers = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Jane Smith", role: "Valorant Pro", skill: "Expert", rank: "Radiant", rating: 4.9, image: "https://via.placeholder.com/150", availability: "Evenings" },
                { id: 2, name: "Mike Johnson", role: "CSGO Player", skill: "Advanced", rank: "Global Elite", rating: 4.7, image: "https://via.placeholder.com/150", availability: "Weekends" },
                { id: 3, name: "Emma Davis", role: "League Player", skill: "Expert", rank: "Diamond I", rating: 4.8, image: "https://via.placeholder.com/150", availability: "Flexible" },
                { id: 4, name: "David Kim", role: "Dota 2 Carry", skill: "Expert", rank: "Immortal", rating: 4.9, image: "https://via.placeholder.com/150", availability: "Afternoons" },
                { id: 5, name: "Tyler Brooks", role: "Fortnite Player", skill: "Advanced", rank: "Champion League", rating: 4.6, image: "https://via.placeholder.com/150", availability: "Weekends" },
                { id: 6, name: "Sarah Miller", role: "Overwatch DPS", skill: "Advanced", rank: "Master", rating: 4.7, image: "https://via.placeholder.com/150", availability: "Evenings" },
            ]);
        }, 1000);
    });
};

function Connect() {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('mentors');
    const [mentors, setMentors] = useState([]);
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [mentorData, playerData] = await Promise.all([
                    fetchMentors(),
                    fetchPlayers()
                ]);
                setMentors(mentorData);
                setPlayers(playerData);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const handleMentorClick = () => {
        console.log("Mentors section clicked");
        setCurrentView('mentors');
    };

    const handlePlayerClick = () => {
        console.log("Players section clicked");
        setCurrentView('players');
    };

    return (
        <>
            <div className="flex h-screen bg-[#E0E0E0] justify-center">
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
                    <main className="flex-1 overflow-x-hidden bg-[#E0E0E0]">
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            {/* Updated header with gradient */}
                            <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-[#292B35] to-[#3D3F4D] rounded-lg shadow-md mb-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {currentView === 'mentors' ? 'Find Mentors' : 'Find Players'}
                                </h2>
                                <p className="mt-1 text-sm text-gray-300">
                                    {currentView === 'mentors' 
                                        ? 'Connect with professional coaches to improve your skills'
                                        : 'Find teammates who match your play style and schedule'}
                                </p>
                            </div>

                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="text-lg text-gray-600">Loading...</div>
                                </div>
                            ) : (
                                <>
                                    {/* Filter section - adjusted for each view */}
                                    <div className="px-6 py-4 bg-white shadow-md rounded-lg mb-6 border-t-4 border-[#AD662F]">
                                        <div className="flex flex-wrap items-center justify-between">
                                            <div className="flex flex-wrap gap-3 mb-3 sm:mb-0">
                                                <select className="bg-[#E0E0E0] border-none text-[#292B35] text-sm rounded-lg p-2.5 shadow-sm focus:ring-2 focus:ring-[#95C5C5]">
                                                    <option>Game</option>
                                                    <option>CSGO</option>
                                                    <option>Valorant</option>
                                                    <option>Fortnite</option>
                                                    <option>League of Legends</option>
                                                </select>
                                                
                                                {currentView === 'mentors' ? (
                                                    <>
                                                        <select className="bg-[#E0E0E0] border-none text-[#292B35] text-sm rounded-lg p-2.5 shadow-sm focus:ring-2 focus:ring-[#95C5C5]">
                                                            <option>Role</option>
                                                            <option>Coach</option>
                                                            <option>Analyst</option>
                                                            <option>Strategist</option>
                                                        </select>
                                                        <select className="bg-[#E0E0E0] border-none text-[#292B35] text-sm rounded-lg p-2.5 shadow-sm focus:ring-2 focus:ring-[#95C5C5]">
                                                            <option>Price Range</option>
                                                            <option>Under $40/hr</option>
                                                            <option>$40-$60/hr</option>
                                                            <option>Over $60/hr</option>
                                                        </select>
                                                    </>
                                                ) : (
                                                    <>
                                                        <select className="bg-[#E0E0E0] border-none text-[#292B35] text-sm rounded-lg p-2.5 shadow-sm focus:ring-2 focus:ring-[#95C5C5]">
                                                            <option>Skill Level</option>
                                                            <option>Beginner</option>
                                                            <option>Intermediate</option>
                                                            <option>Advanced</option>
                                                            <option>Expert</option>
                                                        </select>
                                                        <select className="bg-[#E0E0E0] border-none text-[#292B35] text-sm rounded-lg p-2.5 shadow-sm focus:ring-2 focus:ring-[#95C5C5]">
                                                            <option>Availability</option>
                                                            <option>Weekdays</option>
                                                            <option>Weekends</option>
                                                            <option>Evenings</option>
                                                            <option>Flexible</option>
                                                        </select>
                                                    </>
                                                )}
                                            </div>
                                            <div className="w-full sm:w-auto relative">
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    className="pl-10 p-2.5 w-full sm:w-64 bg-[#E0E0E0] border-none text-[#292B35] text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-[#95C5C5]"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Results count and sorting */}
                                    {/* <div className="flex justify-between items-center px-4 mb-4">
                                        <p className="text-sm font-medium text-[#292B35]">
                                            Showing <span className="font-bold">6</span> results
                                        </p>
                                        <div className="flex items-center">
                                            <span className="text-sm text-[#292B35] mr-2">Sort by:</span>
                                            <select className="bg-white border border-gray-300 text-[#292B35] text-sm rounded-lg p-1 focus:ring-[#95C5C5] focus:border-[#95C5C5]">
                                                <option>Rating</option>
                                                <option>Experience</option>
                                                <option>Price</option>
                                            </select>
                                        </div>
                                    </div> */}

                                    {/* Cards grid - now using the modular components */}
                                    <div className="px-4 sm:px-0">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {currentView === 'mentors' ? (
                                                mentors.map(mentor => (
                                                    <MentorCard key={mentor.id} mentor={mentor} />
                                                ))
                                            ) : (
                                                players.map(player => (
                                                    <PlayerCard key={player.id} player={player} />
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
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