import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    // Placeholder state for user data - replace with actual data fetching later
    const [userData, setUserData] = useState({
        name: "Player One",
        username: "@player1",
        bio: "Professional esports player specializing in FPS games",
        profilePic: "https://via.placeholder.com/150",
        bannerImage: "https://via.placeholder.com/1200x300/123456/ffffff",
        stats: {
            wins: 156,
            losses: 43,
            winRate: "78%"
        }
    });
    
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto p-4 max-w-5xl">
                {/* Banner and Profile Picture Section */}
                <div className="relative mb-20 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-indigo-500/30">
                    <div 
                        className="w-full h-72 bg-cover bg-center opacity-90 transition-transform duration-500 hover:scale-105"
                        style={{ backgroundImage: `url(${userData.bannerImage})` }}
                    />
                    <div className="absolute -bottom-16 left-8 transform transition-transform duration-300 hover:scale-105">
                        <img 
                            src={userData.profilePic} 
                            alt="Profile" 
                            className="w-36 h-36 rounded-full border-4 border-indigo-500 shadow-lg ring-4 ring-black/50" 
                        />
                    </div>
                    <button 
                        className="absolute top-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <span>Edit Profile</span>
                    </button>
                </div>

                {/* User Information Section */}
                <div className="mt-20 px-8 py-6 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{userData.name}</h1>
                    <p className="text-indigo-300 mb-3 text-lg">{userData.username}</p>
                    <p className="text-gray-300 mb-6 text-lg border-l-4 border-indigo-500 pl-3 italic">{userData.bio}</p>
                    
                    <div className="flex gap-8 mt-8 mb-8 justify-center">
                        <div className="flex flex-col items-center bg-gray-700/50 p-4 rounded-lg shadow-inner min-w-28 hover:bg-gray-700 transition-all duration-200">
                            <span className="text-3xl font-bold text-indigo-300">{userData.stats.wins}</span>
                            <span className="text-gray-400">Wins</span>
                        </div>
                        <div className="flex flex-col items-center bg-gray-700/50 p-4 rounded-lg shadow-inner min-w-28 hover:bg-gray-700 transition-all duration-200">
                            <span className="text-3xl font-bold text-indigo-300">{userData.stats.losses}</span>
                            <span className="text-gray-400">Losses</span>
                        </div>
                        <div className="flex flex-col items-center bg-gray-700/50 p-4 rounded-lg shadow-inner min-w-28 hover:bg-gray-700 transition-all duration-200">
                            <span className="text-3xl font-bold text-indigo-300">{userData.stats.winRate}</span>
                            <span className="text-gray-400">Win Rate</span>
                        </div>
                    </div>
                </div>

                {/* Additional Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-gray-800/70 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Recent Achievements
                        </h2>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <span className="mr-2 text-yellow-400">🏆</span> First place in Summer Tournament
                            </li>
                            <li className="flex items-center p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <span className="mr-2 text-blue-400">🎮</span> 10-win streak in ranked matches
                            </li>
                            <li className="flex items-center p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <span className="mr-2 text-green-400">📈</span> Reached Diamond League
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800/70 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Upcoming Matches
                        </h2>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/80 transition-colors">
                                <p className="font-medium text-indigo-300">Team Alpha vs Team Omega</p>
                                <p className="text-sm text-gray-400">Aug 15, 2023 • 8:00 PM EST</p>
                            </div>
                            <div className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/80 transition-colors">
                                <p className="font-medium text-indigo-300">Summer Championship - Quarterfinals</p>
                                <p className="text-sm text-gray-400">Aug 22, 2023 • 7:30 PM EST</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

export default ProfilePage;