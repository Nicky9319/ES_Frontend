import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileData from './playerProfileData.json';

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('stats');

    // Simulate API call to fetch user profile data
    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            // In a real app, this would be an actual API call
            // For now, simulate network delay and return the JSON data
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Transform JSON data into the structure needed by our UI
            const transformedData = {
                name: "Player One", // This could come from a separate user info endpoint
                username: profileData.SOCIAL_LINKS?.INSTAGRAM || "@player1",
                bio: profileData.BIO || "No bio provided",
                profilePic: profileData.PROFILE_PIC || "https://via.placeholder.com/150",
                bannerImage: profileData.PROFILE_BANNER || "https://via.placeholder.com/1200x300/123456/ffffff",
                location: profileData.LOCATION || "Unknown",
                teamStatus: profileData.TEAM_STATUS || "Unknown",
                gamesPlayed: profileData.GAMES_PLAYED || [],
                socialLinks: profileData.SOCIAL_LINKS || {},
                history: profileData.HISTORY || [],
                platformStatus: profileData.PLATFORM_STATUS || "INACTIVE",
                stats: {
                    // Sample stats - in a real app these would come from the backend
                    wins: 156,
                    losses: 43,
                    winRate: "78%"
                }
            };
            
            setUserData(transformedData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#292B35] text-[#E0E0E0]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#EE8631] mx-auto mb-4"></div>
                    <p className="text-xl">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#292B35] text-[#E0E0E0]">
                <div className="text-center bg-[#292B35]/80 p-8 rounded-xl shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#EE8631] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
                    <p className="mb-4">We couldn't load the profile data. Please try again later.</p>
                    <button 
                        onClick={() => fetchUserProfile()}
                        className="bg-[#EE8631] hover:bg-[#AD662F] text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-200"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#292B35] text-[#E0E0E0] overflow-x-hidden">
            {/* Hero Banner Section - Full Width */}
            <div className="w-full h-96 relative">
                <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url(${userData.bannerImage})`,
                        filter: 'brightness(0.7)'
                    }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#292B35] to-transparent opacity-90"></div>
                
                {/* Top Navigation */}
                <div className="absolute top-0 w-full p-4 flex justify-between items-center">
                    <div className="text-[#E0E0E0] font-bold text-xl">
                        <span className="text-[#EE8631]">Esports</span>Elite
                    </div>
                    <button 
                        className="bg-[#EE8631] hover:bg-[#AD662F] text-[#E0E0E0] px-4 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <span>Edit Profile</span>
                    </button>
                </div>
                
                {/* Main Profile Info - Centered */}
                <div className="absolute bottom-0 w-full">
                    <div className="container mx-auto px-4 pb-6 flex flex-col md:flex-row items-end md:items-center gap-6">
                        <div className="relative -mb-20 z-10">
                            <img 
                                src={userData.profilePic} 
                                alt="Profile" 
                                className="w-40 h-40 rounded-full border-4 border-[#95C5C5] shadow-2xl ring-4 ring-[#292B35]/80 object-cover transform hover:scale-105 transition-all duration-300" 
                            />
                            <div className="absolute -bottom-2 -right-2 bg-[#EE8631] text-white p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                        </div>
                        <div className="md:ml-6">
                            <h1 className="text-5xl font-bold text-[#95C5C5] drop-shadow-lg">{userData.name}</h1>
                            <p className="text-[#E0E0E0]/90 mb-1 text-xl">{userData.username}</p>
                            <div className="flex items-center text-[#E0E0E0]/80 text-sm mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {userData.location}
                            </div>
                            <div className="mt-2 flex items-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    userData.teamStatus === "Looking for Team" 
                                    ? "bg-[#EE8631]/20 text-[#EE8631]" 
                                    : "bg-[#95C5C5]/20 text-[#95C5C5]"
                                }`}>
                                    {userData.teamStatus}
                                </span>
                                <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                                    userData.platformStatus === "ACTIVE" 
                                    ? "bg-green-500/20 text-green-500" 
                                    : "bg-gray-500/20 text-gray-400"
                                }`}>
                                    {userData.platformStatus === "ACTIVE" ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 ml-auto">
                            <button className="bg-[#95C5C5] hover:bg-[#95C5C5]/80 text-[#292B35] font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                                Follow
                            </button>
                            <button className="bg-[#292B35]/60 hover:bg-[#292B35]/80 text-[#E0E0E0] border border-[#95C5C5]/30 py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                                Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="sticky top-0 w-full bg-[#292B35] border-b border-[#95C5C5]/20 shadow-md z-10">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto md:justify-center py-2 space-x-8 no-scrollbar">
                        {['stats', 'achievements', 'matches', 'teams'].map(tab => (
                            <button
                                key={tab}
                                className={`whitespace-nowrap px-4 py-2 text-lg font-medium border-b-2 transition-all duration-200 ${
                                    activeTab === tab 
                                    ? 'border-[#EE8631] text-[#EE8631]' 
                                    : 'border-transparent text-[#E0E0E0]/70 hover:text-[#E0E0E0] hover:border-[#95C5C5]/30'
                                }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full py-20 bg-[#292B35]">
                <div className="container mx-auto px-4">
                    {/* Profile Bio */}
                    <div className="px-4 py-8 bg-[#292B35]/80 backdrop-blur-sm rounded-xl shadow-xl border border-[#95C5C5]/10 mb-10">
                        <p className="text-[#E0E0E0] text-lg border-l-4 border-[#EE8631] pl-4 italic">{userData.bio}</p>
                    </div>
                    
                    {/* Games Played Section */}
                    <div className="px-4 py-6 bg-[#292B35]/80 backdrop-blur-sm rounded-xl shadow-xl border border-[#95C5C5]/10 mb-10">
                        <h2 className="text-xl font-semibold mb-4 flex items-center text-[#95C5C5]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#EE8631]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                            </svg>
                            Games Played
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {userData.gamesPlayed.map((game, index) => (
                                <span key={index} className="bg-[#292B35] text-[#E0E0E0] px-3 py-1 rounded-lg border border-[#95C5C5]/30 text-sm">
                                    {game}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-gradient-to-br from-[#292B35] to-[#292B35]/80 rounded-xl shadow-xl overflow-hidden transform hover:translate-y-[-5px] transition-all duration-300 border border-[#95C5C5]/10">
                            <div className="bg-[#95C5C5]/10 p-4 border-b border-[#95C5C5]/20">
                                <h3 className="text-[#95C5C5] font-semibold text-lg">Total Matches</h3>
                            </div>
                            <div className="p-6 flex items-center justify-between">
                                <div className="text-5xl font-bold text-[#E0E0E0]">{userData.stats.wins + userData.stats.losses}</div>
                                <div className="bg-[#292B35] p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#95C5C5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-[#292B35] to-[#292B35]/80 rounded-xl shadow-xl overflow-hidden transform hover:translate-y-[-5px] transition-all duration-300 border border-[#95C5C5]/10">
                            <div className="bg-[#95C5C5]/10 p-4 border-b border-[#95C5C5]/20">
                                <h3 className="text-[#95C5C5] font-semibold text-lg">Win Rate</h3>
                            </div>
                            <div className="p-6 flex items-center justify-between">
                                <div className="text-5xl font-bold text-[#E0E0E0]">{userData.stats.winRate}</div>
                                <div className="bg-[#292B35] p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#EE8631]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-[#292B35] to-[#292B35]/80 rounded-xl shadow-xl overflow-hidden transform hover:translate-y-[-5px] transition-all duration-300 border border-[#95C5C5]/10">
                            <div className="bg-[#95C5C5]/10 p-4 border-b border-[#95C5C5]/20">
                                <h3 className="text-[#95C5C5] font-semibold text-lg">Win/Loss</h3>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-[#E0E0E0]/70">Wins</span>
                                    <span className="text-[#E0E0E0]">{userData.stats.wins}</span>
                                </div>
                                <div className="w-full bg-[#292B35] rounded-full h-2.5 mb-4">
                                    <div className="bg-[#95C5C5] h-2.5 rounded-full" style={{ width: userData.stats.winRate }}></div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#E0E0E0]/70">Losses</span>
                                    <span className="text-[#E0E0E0]">{userData.stats.losses}</span>
                                </div>
                                <div className="w-full bg-[#292B35] rounded-full h-2.5 mt-2">
                                    <div className="bg-[#AD662F] h-2.5 rounded-full" style={{ width: `${100 - parseInt(userData.stats.winRate)}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team History Section */}
                    <div className="bg-[#292B35]/80 p-6 rounded-xl shadow-xl hover:shadow-[#EE8631]/10 transition-all duration-300 border border-[#95C5C5]/10 mb-10">
                        <h2 className="text-xl font-semibold mb-4 flex items-center text-[#95C5C5]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#EE8631]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Team History
                        </h2>
                        <div className="space-y-4">
                            {userData.history.map((historyItem, index) => (
                                <div key={index} className="p-4 bg-[#292B35] rounded-lg border border-[#95C5C5]/10 hover:border-[#95C5C5]/30 transition-colors">
                                    <div className="flex flex-wrap justify-between items-start">
                                        <div>
                                            <h3 className="text-[#95C5C5] font-medium text-lg">{historyItem.TEAM_NAME}</h3>
                                            <p className="text-[#E0E0E0]/70 text-sm mb-2">Game: {historyItem.GAME_NAME}</p>
                                            
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {historyItem.ROLES_PLAYED.map((role, roleIndex) => (
                                                    <span key={roleIndex} className="bg-[#EE8631]/10 text-[#EE8631] px-2 py-1 rounded text-xs">
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-[#292B35]/80 px-3 py-1 rounded border border-[#95C5C5]/20 text-[#E0E0E0]/80 text-sm">
                                            {historyItem.DURATION}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-[#292B35]/80 p-6 rounded-xl shadow-xl border border-[#95C5C5]/10 mb-10">
                        <h2 className="text-xl font-semibold mb-4 flex items-center text-[#95C5C5]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#EE8631]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            Connect With Me
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {Object.entries(userData.socialLinks).map(([platform, handle], index) => (
                                <a 
                                    key={index}
                                    href="#" 
                                    className="flex flex-col items-center p-3 bg-[#292B35] rounded-lg border border-[#95C5C5]/10 hover:border-[#95C5C5]/30 transition-all hover:transform hover:scale-105"
                                >
                                    <div className="text-2xl mb-2">
                                        {platform === 'INSTAGRAM' && '📸'}
                                        {platform === 'DISCORD' && '💬'}
                                        {platform === 'TWITTER' && '🐦'}
                                        {platform === 'LINKEDIN' && '💼'}
                                        {platform === 'WEBSITE' && '🌐'}
                                        {platform === 'YOUTUBE' && '▶️'}
                                    </div>
                                    <div className="text-xs text-[#E0E0E0]/70">{platform}</div>
                                    <div className="text-sm text-[#E0E0E0] mt-1 truncate max-w-full">{handle}</div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Featured Content */}
                    <div className="bg-gradient-to-r from-[#292B35] to-[#292B35]/90 p-6 rounded-xl shadow-xl mb-10 border border-[#95C5C5]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#EE8631]/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#95C5C5]/10 rounded-full blur-3xl"></div>
                        
                        <h2 className="text-2xl font-bold mb-6 text-[#95C5C5] relative">Featured Video</h2>
                        <div className="relative aspect-video bg-[#292B35] rounded-lg overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-[#EE8631]/90 text-white p-5 rounded-full transform group-hover:scale-110 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-white font-medium">Championship Highlights - Best Plays</h3>
                                <p className="text-white/70 text-sm">1.2M views • 2 weeks ago</p>
                            </div>
                            <img 
                                src="https://via.placeholder.com/1200x675/123456/ffffff" 
                                alt="Video thumbnail" 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

export default ProfilePage;