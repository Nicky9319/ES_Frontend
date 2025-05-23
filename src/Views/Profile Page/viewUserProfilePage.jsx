import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const USER_PROFILE_SERVICE = import.meta.env.VITE_USER_PROFILE_SERVICE;

const ViewUserProfilePage = () => {
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [bannerError, setBannerError] = useState(false);
    const [profileError, setProfileError] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://${USER_PROFILE_SERVICE}/UserProfile/GetUserProfile/?USER_ID=${userId}`);
                const result = await response.json();
                const data = result.USER_PROFILE;

                if (!data) {
                    setUserData(null);
                    setLoading(false);
                    return;
                }

                const profileBanner = bannerError
                    ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                    : data.PROFILE_BANNER;
                const profilePic = profileError
                    ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    : data.PROFILE_PIC;

                // Handle date string (ISO format)
                let createdAt = data.CREATED_AT;
                let formattedDate = "Unknown";
                if (createdAt) {
                    const dateObj = new Date(createdAt);
                    formattedDate = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC'
                    }).format(dateObj);
                }

                const transformedData = {
                    name: data.USER_NAME,
                    tagline: data.TAGLINE,
                    username: data.SOCIAL_LINKS?.INSTAGRAM || "@player1",
                    bio: data.BIO || "No bio provided",
                    profilePic: profilePic || "https://via.placeholder.com/150",
                    bannerImage: profileBanner || "https://via.placeholder.com/1200x300/123456/ffffff",
                    location: data.LOCATION || "Unknown",
                    teamStatus: data.TEAM_STATUS || "Unknown",
                    gamesPlayed: Array.isArray(data.GAMES_PLAYED) ? data.GAMES_PLAYED : [],
                    socialLinks: typeof data.SOCIAL_LINKS === 'object' && data.SOCIAL_LINKS !== null ? data.SOCIAL_LINKS : {},
                    history: Array.isArray(data.HISTORY) ? data.HISTORY : [],
                    platformStatus: data.PLATFORM_STATUS || "INACTIVE",
                    userId: userId || data.USER_ID || "unknown-id",
                    createdAt: formattedDate
                };

                setUserData(transformedData);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId, bannerError, profileError]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#292B35] text-[#E0E0E0]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-[#EE8631] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#95C5C5]">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#292B35] text-[#E0E0E0]">
                <p className="text-[#95C5C5]">Error loading profile.</p>
            </div>
        );
    }

    const statsData = [
        { label: 'Team Status', value: userData.teamStatus, icon: '👥' },
        { label: 'Joined', value: userData.createdAt, icon: '📅' }
    ];

    const filteredClips = userData?.gameClips?.filter(clip =>
        selectedGameFilter === 'all' || clip.game === selectedGameFilter
    );

    return (
        <div className="bg-[#292B35] min-h-screen text-[#E0E0E0] font-sans">
            <div className="relative h-96">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-[#1a1b21]"
                    style={{
                        backgroundImage: `url(${userData.bannerImage})`,
                        backgroundPosition: 'center 30%'
                    }}
                    onError={() => setBannerError(true)}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#292B35]/30 via-[#292B35]/50 to-[#292B35] opacity-90"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
                    <div className="max-w-5xl mx-auto flex items-end gap-6">
                        <div className="relative">
                            <img
                                src={userData.profilePic}
                                alt="Profile"
                                className="w-40 h-40 rounded-xl border-4 border-[#EE8631] shadow-lg object-cover transform hover:scale-105 transition-transform duration-300"
                                onError={() => setProfileError(true)}
                            />
                        </div>
                        <div className="flex-1 mb-4">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-4xl font-bold text-[#E0E0E0] drop-shadow-lg">
                                    {userData.name}
                                </h1>
                                <span className={`px-4 py-1 rounded-full text-sm font-semibold shadow-lg ${userData.platformStatus === "ACTIVE" ? 'bg-[#95C5C5] text-[#292B35]' : 'bg-red-500 text-white'
                                    }`}>
                                    {userData.platformStatus === "ACTIVE" ? '✓ ACTIVE' : '✗ INACTIVE'}
                                </span>
                            </div>
                            <p className="text-[#95C5C5] text-xl font-medium mb-2">
                                {userData.tagline}
                            </p>
                            <div className="flex items-center text-[#E0E0E0]/80 text-sm mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {userData.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-6 mt-24 relative z-10 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-8">
                    {statsData.map(stat => (
                        <div key={stat.label} className="bg-[#292B35] p-4 rounded-xl border border-[#95C5C5]/20 hover:border-[#EE8631]/50 transition-colors">
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <div className="text-[#95C5C5] text-sm">{stat.label}</div>
                            <div className="text-[#E0E0E0] font-bold">{stat.value}</div>
                        </div>
                    ))}
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                                <span>📋</span> About
                            </h2>
                            <p className="text-[#E0E0E0]/90 leading-relaxed">{userData.bio}</p>
                        </div>
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                                <span>🎮</span> Games Played
                            </h2>
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {userData.gamesPlayed.map(game => (
                                        <span key={game} className="bg-[#EE8631]/10 text-[#EE8631] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#EE8631]/20 transition-colors cursor-pointer">
                                            {game}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                                <span>👥</span> Team History
                            </h2>
                            <div className="space-y-4">
                                {userData.history.length > 0 ? (
                                    userData.history.map((historyItem, index) => (
                                        <div key={index} className="p-4 bg-[#292B35]/60 rounded-lg border border-[#95C5C5]/10 hover:border-[#95C5C5]/30 transition-colors">
                                            <div className="flex flex-wrap justify-between items-start">
                                                <div>
                                                    <h3 className="text-[#95C5C5] font-medium text-lg">{historyItem.TEAM_NAME}</h3>
                                                    <p className="text-[#E0E0E0]/70 text-sm">Game: {historyItem.GAME_NAME}</p>
                                                    <p className="text-[#E0E0E0]/70 text-sm">Team ID: {historyItem.TEAM_ID}</p>
                                                    <p className="text-[#E0E0E0]/70 text-sm">Duration: {historyItem.DURATION}</p>
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {Array.isArray(historyItem.ROLES_PLAYED) && historyItem.ROLES_PLAYED.map((role, roleIndex) => (
                                                            <span key={roleIndex} className="bg-[#EE8631]/10 text-[#EE8631] px-2 py-1 rounded text-xs">
                                                                {role}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-[#E0E0E0]/60 italic">No team history available</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20 sticky top-4">
                            <button className="w-full bg-[#EE8631] text-white py-3 rounded-lg font-semibold hover:bg-[#EE8631]/80 transition-colors">
                                Message
                            </button>
                        </div>
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                                <span>🌐</span> Connect
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(userData.socialLinks).map(([platform, link]) => (
                                    <a
                                        key={platform}
                                        href={platform.toLowerCase() === 'website'
                                            ? `https://${link}`
                                            : `https://${platform.toLowerCase()}.com/${link.replace(/^@/, '')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-[#E0E0E0] hover:text-[#EE8631] transition-colors"
                                    >
                                        <span className="text-[#95C5C5]">
                                            {platform === 'DISCORD' ? '💬' :
                                                platform === 'TWITTER' ? '🐦' :
                                                    platform === 'YOUTUBE' ? '📺' :
                                                        platform === 'INSTAGRAM' ? '📸' :
                                                            platform === 'LINKEDIN' ? '💼' :
                                                                platform === 'WEBSITE' ? '🔗' : '💼'}
                                        </span>
                                        <span>{platform.toLowerCase()}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Section with Instagram Grid Layout */}
            <div className="max-w-5xl mx-auto px-6 mt-12 pb-12">
                <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-[#EE8631] flex items-center gap-2">
                            Game Achievements
                        </h2>
                        <button 
                            onClick={() => setShowAllPosts(prev => !prev)}
                            className="text-sm text-[#EE8631] hover:text-[#EE8631]/80 transition-colors"
                        >
                            {showAllPosts ? 'Show Less' : 'Show All Achievements'}
                        </button>
                    </div>
                    
                    {/* Game Filter for Achievements - Removed All option */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {userData?.gamesPlayed.map(game => (
                            <button
                                key={game}
                                onClick={() => setSelectedAchievementFilter(game)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    selectedAchievementFilter === game 
                                        ? 'bg-[#EE8631] text-white' 
                                        : 'bg-[#EE8631]/10 text-[#EE8631] hover:bg-[#EE8631]/20'
                                }`}
                            >
                                {game}
                            </button>
                        ))}
                    </div>
                    
                    {/* Instagram-style Grid Layout - Updated filter */}
                    <div className="grid grid-cols-3 gap-1">
                        {userData.activities
                            .filter(activity => activity.game === selectedAchievementFilter)
                            .slice(0, showAllPosts ? undefined : INITIAL_POSTS_TO_SHOW)
                            .map(activity => (
                                <div
                                    key={activity.id}
                                    onClick={() => {
                                        setSelectedActivity(activity);
                                        setShowActivityModal(true);
                                    }}
                                    className="relative aspect-square cursor-pointer group"
                                >
                                    <img
                                        src={activity.image}
                                        alt={activity.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="flex gap-6 text-white">
                                            <span className="flex items-center gap-2">
                                                <span>❤️</span>
                                                <span className="font-semibold">{activity.likes}</span>
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <span>💬</span>
                                                <span className="font-semibold">{activity.comments}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    
                    {/* Show More Button */}
                    {!showAllPosts && userData.activities.length > INITIAL_POSTS_TO_SHOW && (
                        <div className="text-center pt-4">
                            <button 
                                onClick={() => setShowAllPosts(true)}
                                className="text-[#EE8631] font-semibold hover:text-[#EE8631]/80"
                            >
                                Load more
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Game Clips Section - Now below Activity */}
            <div className="max-w-5xl mx-auto px-6 mt-12 pb-12">
                <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                    <h2 className="text-xl font-semibold text-[#EE8631] mb-6 flex items-center gap-2">
                        <span>🎮</span> Game Clips
                    </h2>

                    {/* Game Filter */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        <button
                            onClick={() => setSelectedGameFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedGameFilter === 'all' 
                                    ? 'bg-[#EE8631] text-white' 
                                    : 'bg-[#EE8631]/10 text-[#EE8631] hover:bg-[#EE8631]/20'
                            }`}
                        >
                            All Clips
                        </button>
                        {userData?.gamesPlayed.map(game => (
                            <button
                                key={game}
                                onClick={() => setSelectedGameFilter(game)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    selectedGameFilter === game 
                                        ? 'bg-[#EE8631] text-white' 
                                        : 'bg-[#EE8631]/10 text-[#EE8631] hover:bg-[#EE8631]/20'
                                }`}
                            >
                                {game}
                            </button>
                        ))}
                    </div>

                    {/* Clips Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredClips?.map(clip => (
                            <div
                                key={clip.id}
                                onClick={() => {
                                    setSelectedClip(clip);
                                    setShowClipModal(true);
                                }}
                                className="relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer group"
                            >
                                <img
                                    src={clip.thumbnail}
                                    alt={clip.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-white text-sm font-medium">{clip.title}</h3>
                                        <p className="text-white/70 text-xs">{clip.views} views</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Update Activity Modal to be more LinkedIn-style */}
            {showActivityModal && selectedActivity && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="relative bg-[#292B35] rounded-xl max-w-2xl w-full">
                        <button
                            onClick={() => {
                                setShowActivityModal(false);
                                setSelectedActivity(null);
                            }}
                            className="absolute -top-10 right-0 text-white/70 hover:text-white text-xl"
                        >
                            ✕
                        </button>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={userData.profilePic}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h3 className="font-medium text-white">{userData.name}</h3>
                                    <p className="text-sm text-[#95C5C5]">
                                        {new Date(selectedActivity.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <p className="text-[#E0E0E0] mb-4">{selectedActivity.description}</p>
                            <img
                                src={selectedActivity.image}
                                alt={selectedActivity.title}
                                className="w-full rounded-lg mb-4"
                            />
                            <div className="flex items-center justify-between border-t border-[#95C5C5]/20 pt-4 mt-4">
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 text-[#95C5C5] hover:text-[#EE8631]">
                                        <span>❤️</span>
                                        <span>{selectedActivity.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-[#95C5C5] hover:text-[#EE8631]">
                                        <span>💬</span>
                                        <span>{selectedActivity.comments}</span>
                                    </button>
                                </div>
                                <button className="text-[#EE8631] hover:text-[#EE8631]/80">
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Clip Modal */}
            {showClipModal && selectedClip && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="relative bg-[#292B35] rounded-xl max-w-4xl w-full">
                        <button
                            onClick={() => {
                                setShowClipModal(false);
                                setSelectedClip(null);
                            }}
                            className="absolute -top-10 right-0 text-white/70 hover:text-white text-xl"
                        >
                            ✕
                        </button>
                        <div className="w-full rounded-t-xl overflow-hidden">
                            {selectedClip.isYouTube ? (
                                <div className="aspect-video">
                                    <iframe
                                        className="w-full h-full"
                                        src={selectedClip.videoUrl}
                                        title={selectedClip.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <CustomVideoPlayer 
                                    src={selectedClip.videoUrl} 
                                    poster={selectedClip.thumbnail}
                                />
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-white">{selectedClip.title}</h3>
                            <p className="text-[#95C5C5]">{selectedClip.game}</p>
                            <p className="text-white/70 text-sm">
                                {new Date(selectedClip.date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewUserProfilePage;
