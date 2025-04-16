import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import profileData from './playerProfileData.json';

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [activeTab, setActiveTab] = useState('stats');
    const [bannerError, setBannerError] = useState(false);
    const [profileError, setProfileError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const [gameClips, setGameClips] = useState([]);
    const [showClipModal, setShowClipModal] = useState(false);
    const [achievements, setAchievements] = useState([]);

    const profilePicInputRef = useRef(null);
    const bannerImageInputRef = useRef(null);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));

            const transformedData = {
                name: profileData.USER_NAME,
                tagline: profileData.TAGLINE,
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
                userId: profileData.USER_ID || "unknown-id",
                createdAt: profileData.CREATED_AT
                    ? new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC'
                    }).format(new Date(profileData.CREATED_AT.$date))
                    : "Unknown"
            };

            setUserData(transformedData);
            setEditedData(transformedData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditedData(prev => ({
                    ...prev,
                    profilePic: event.target.result
                }));
            };
            reader.readAsDataURL(file);

            console.log("Profile picture would be uploaded to server:", file);
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            alert("Failed to upload profile picture. Please try again.");
        }
    };

    const handleBannerImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditedData(prev => ({
                    ...prev,
                    bannerImage: event.target.result
                }));
            };
            reader.readAsDataURL(file);

            console.log("Banner image would be uploaded to server:", file);
        } catch (error) {
            console.error("Error uploading banner image:", error);
            alert("Failed to upload banner image. Please try again.");
        }
    };

    const handleProfileUpdate = async () => {
        try {
            setLoading(true);

            const updateData = {
                USER_NAME: editedData.name,
                TAGLINE: editedData.tagline,
                BIO: editedData.bio,
                LOCATION: editedData.location,
                TEAM_STATUS: editedData.teamStatus,
                GAMES_PLAYED: editedData.gamesPlayed,
                SOCIAL_LINKS: editedData.socialLinks,
                HISTORY: editedData.history,
                PLATFORM_STATUS: editedData.platformStatus,
                achievements: achievements,
                gameClips: gameClips
            };

            console.log("Profile data would be updated:", updateData);
            await new Promise(resolve => setTimeout(resolve, 800));
            
            setUserData(editedData);
            setIsEditing(false);
            setLoading(false);
            
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            setLoading(false);
            alert("Failed to update profile. Please try again.");
        }
    };

    const handleAddTeamHistory = () => {
        setEditedData(prev => ({
            ...prev,
            history: [
                ...prev.history,
                {
                    TEAM_NAME: "New Team",
                    TEAM_ID: "",
                    GAME_NAME: "",
                    DURATION: "",
                    ROLES_PLAYED: []
                }
            ]
        }));
    };

    const handleUpdateTeamHistory = (index, field, value) => {
        const updatedHistory = [...editedData.history];
        
        if (field === "ROLES_PLAYED" && typeof value === "string") {
            updatedHistory[index][field] = value.split(",").map(role => role.trim());
        } else {
            updatedHistory[index][field] = value;
        }
        
        setEditedData(prev => ({
            ...prev,
            history: updatedHistory
        }));
    };

    const handleRemoveTeamHistory = (index) => {
        setEditedData(prev => ({
            ...prev,
            history: prev.history.filter((_, i) => i !== index)
        }));
    };

    const handleAddGameClip = () => {
        const newClip = {
            id: Date.now(),
            game: userData.gamesPlayed[0] || "",
            title: "",
            thumbnail: "",
            videoUrl: "",
            date: new Date().toISOString()
        };
        setGameClips([...gameClips, newClip]);
    };

    const handleUpdateClip = (clipId, field, value) => {
        setGameClips(clips => 
            clips.map(clip => 
                clip.id === clipId ? { ...clip, [field]: value } : clip
            )
        );
    };

    const handleRemoveClip = (clipId) => {
        setGameClips(clips => clips.filter(clip => clip.id !== clipId));
    };

    const handleAddAchievement = () => {
        const newAchievement = {
            id: Date.now(),
            game: userData.gamesPlayed[0] || "",
            image: "",
            title: "",
            description: "",
            likes: 0,
            comments: 0,
            date: new Date().toISOString(),
            type: "achievement"
        };
        setAchievements([...achievements, newAchievement]);
    };

    const handleUpdateAchievement = (achievementId, field, value) => {
        setAchievements(items => 
            items.map(item => 
                item.id === achievementId ? { ...item, [field]: value } : item
            )
        );
    };

    const handleRemoveAchievement = (achievementId) => {
        setAchievements(items => items.filter(item => item.id !== achievementId));
    };

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

    return (
        <div className="bg-[#292B35] min-h-screen text-[#E0E0E0] font-sans">
            <div className="fixed top-4 right-4 z-50">
                {isEditing ? (
                    <div className="flex gap-2">
                        <button 
                            onClick={handleProfileUpdate}
                            className="bg-[#95C5C5] text-[#292B35] px-4 py-2 rounded-lg font-semibold hover:bg-[#95C5C5]/80 transition-colors"
                        >
                            Save Changes
                        </button>
                        <button 
                            onClick={() => {
                                setEditedData(userData);
                                setIsEditing(false);
                            }}
                            className="bg-[#EE8631]/20 text-[#EE8631] px-4 py-2 rounded-lg font-semibold hover:bg-[#EE8631]/30 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="bg-[#EE8631] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#EE8631]/80 transition-colors"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="relative h-96">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-[#1a1b21]"
                    style={{
                        backgroundImage: `url(${bannerError ?
                            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" :
                            (isEditing ? editedData.bannerImage : userData.bannerImage)
                            })`,
                        backgroundPosition: 'center 30%'
                    }}
                    onError={() => setBannerError(true)}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#292B35]/30 via-[#292B35]/50 to-[#292B35] opacity-90"></div>
                </div>

                {isEditing && (
                    <div className="absolute top-4 left-4 z-10">
                        <button 
                            onClick={() => bannerImageInputRef.current.click()}
                            className="bg-[#292B35]/80 text-[#E0E0E0] p-2 rounded-lg hover:bg-[#292B35] transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <input
                            type="file"
                            ref={bannerImageInputRef}
                            onChange={handleBannerImageUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
                    <div className="max-w-5xl mx-auto flex items-end gap-6">
                        <div className="relative">
                            <img
                                src={isEditing ? editedData.profilePic : userData.profilePic}
                                alt="Profile"
                                className="w-40 h-40 rounded-xl border-4 border-[#EE8631] shadow-lg object-cover transform hover:scale-105 transition-transform duration-300"
                                onError={() => setProfileError(true)}
                            />
                            
                            {isEditing && (
                                <div className="absolute top-2 left-2">
                                    <button 
                                        onClick={() => profilePicInputRef.current.click()}
                                        className="bg-[#292B35]/80 text-[#E0E0E0] p-2 rounded-full hover:bg-[#292B35] transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <input
                                        type="file"
                                        ref={profilePicInputRef}
                                        onChange={handleProfilePicUpload}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 mb-4">
                            <div className="flex items-center gap-4 mb-2">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedData.name}
                                        onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                                        className="text-3xl font-bold text-[#E0E0E0] bg-transparent border-b border-[#95C5C5] focus:outline-none focus:border-[#EE8631] px-1"
                                    />
                                ) : (
                                    <h1 className="text-4xl font-bold text-[#E0E0E0] drop-shadow-lg">
                                        {userData.name}
                                    </h1>
                                )}
                                <span className={`px-4 py-1 rounded-full text-sm font-semibold shadow-lg ${userData.platformStatus === "ACTIVE" ? 'bg-[#95C5C5] text-[#292B35]' : 'bg-red-500 text-white'
                                    }`}>
                                    {userData.platformStatus === "ACTIVE" ? '✓ ACTIVE' : '✗ INACTIVE'}
                                </span>
                            </div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.tagline}
                                    onChange={(e) => setEditedData({...editedData, tagline: e.target.value})}
                                    className="text-xl font-medium text-[#95C5C5] bg-transparent border-b border-[#95C5C5] focus:outline-none focus:border-[#EE8631] px-1 mb-2"
                                />
                            ) : (
                                <p className="text-[#95C5C5] text-xl font-medium mb-2">
                                    {userData.tagline}
                                </p>
                            )}
                            <div className="flex items-center text-[#E0E0E0]/80 text-sm mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedData.location}
                                        onChange={(e) => setEditedData({...editedData, location: e.target.value})}
                                        className="bg-transparent border-b border-[#95C5C5] focus:outline-none focus:border-[#EE8631] px-1"
                                    />
                                ) : (
                                    userData.location
                                )}
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
                            {stat.label === 'Team Status' && isEditing ? (
                                <select
                                    value={editedData.teamStatus}
                                    onChange={(e) => setEditedData({...editedData, teamStatus: e.target.value})}
                                    className="w-full bg-[#292B35] text-[#E0E0E0] font-bold border border-[#95C5C5]/20 rounded p-1 focus:outline-none focus:border-[#EE8631]"
                                >
                                    <option value="Looking for Team">Looking for Team</option>
                                    <option value="In a Team">In a Team</option>
                                    <option value="Not Looking">Not Looking</option>
                                </select>
                            ) : (
                                <div className="text-[#E0E0E0] font-bold">{stat.value}</div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                                <span>📋</span> About
                            </h2>
                            {isEditing ? (
                                <textarea
                                    value={editedData.bio}
                                    onChange={(e) => setEditedData({...editedData, bio: e.target.value})}
                                    className="w-full bg-[#292B35] text-[#E0E0E0]/90 leading-relaxed border border-[#95C5C5]/20 rounded p-2 focus:outline-none focus:border-[#EE8631] min-h-[100px]"
                                />
                            ) : (
                                <p className="text-[#E0E0E0]/90 leading-relaxed">{userData.bio}</p>
                            )}
                        </div>

                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                                <span>🎮</span> Games Played
                            </h2>
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {(isEditing ? editedData.gamesPlayed : userData.gamesPlayed).map((game, index) => (
                                        <div key={index} className="relative group">
                                            <span className="bg-[#EE8631]/10 text-[#EE8631] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#EE8631]/20 transition-colors cursor-pointer">
                                                {isEditing ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={game}
                                                            onChange={(e) => {
                                                                const updatedGames = [...editedData.gamesPlayed];
                                                                updatedGames[index] = e.target.value;
                                                                setEditedData({...editedData, gamesPlayed: updatedGames});
                                                            }}
                                                            className="bg-transparent border-none focus:outline-none w-24"
                                                        />
                                                        <button 
                                                            onClick={() => {
                                                                const updatedGames = editedData.gamesPlayed.filter((_, i) => i !== index);
                                                                setEditedData({...editedData, gamesPlayed: updatedGames});
                                                            }}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ) : (
                                                    game
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                    {isEditing && (
                                        <button 
                                            onClick={() => setEditedData({...editedData, gamesPlayed: [...editedData.gamesPlayed, ""]})}
                                            className="bg-[#95C5C5]/10 text-[#95C5C5] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#95C5C5]/20 transition-colors"
                                        >
                                            + Add Game
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[#EE8631] flex items-center gap-2">
                                    <span>👥</span> Team History
                                </h2>
                                {isEditing && (
                                    <button 
                                        onClick={handleAddTeamHistory}
                                        className="bg-[#95C5C5]/10 text-[#95C5C5] px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#95C5C5]/20 transition-colors"
                                    >
                                        + Add Team
                                    </button>
                                )}
                            </div>
                            <div className="space-y-4">
                                {(isEditing ? editedData.history : userData.history).length > 0 ? (
                                    (isEditing ? editedData.history : userData.history).map((historyItem, index) => (
                                        <div key={index} className="p-4 bg-[#292B35]/60 rounded-lg border border-[#95C5C5]/10 hover:border-[#95C5C5]/30 transition-colors">
                                            <div className="flex flex-wrap justify-between items-start">
                                                <div className="w-full">
                                                    {isEditing ? (
                                                        <div className="space-y-3">
                                                            <div className="flex justify-between">
                                                                <h3 className="text-[#95C5C5] font-medium text-lg">Team Details</h3>
                                                                <button 
                                                                    onClick={() => handleRemoveTeamHistory(index)}
                                                                    className="text-red-500 hover:text-red-700"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <div>
                                                                    <label className="block text-[#95C5C5] text-xs mb-1">Team Name</label>
                                                                    <input 
                                                                        type="text" 
                                                                        value={historyItem.TEAM_NAME}
                                                                        onChange={(e) => handleUpdateTeamHistory(index, "TEAM_NAME", e.target.value)}
                                                                        className="w-full bg-[#292B35] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-1 focus:outline-none focus:border-[#EE8631]"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[#95C5C5] text-xs mb-1">Team ID</label>
                                                                    <input 
                                                                        type="text" 
                                                                        value={historyItem.TEAM_ID}
                                                                        onChange={(e) => handleUpdateTeamHistory(index, "TEAM_ID", e.target.value)}
                                                                        className="w-full bg-[#292B35] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-1 focus:outline-none focus:border-[#EE8631]"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[#95C5C5] text-xs mb-1">Game</label>
                                                                    <input 
                                                                        type="text" 
                                                                        value={historyItem.GAME_NAME}
                                                                        onChange={(e) => handleUpdateTeamHistory(index, "GAME_NAME", e.target.value)}
                                                                        className="w-full bg-[#292B35] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-1 focus:outline-none focus:border-[#EE8631]"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[#95C5C5] text-xs mb-1">Duration</label>
                                                                    <input 
                                                                        type="text" 
                                                                        value={historyItem.DURATION}
                                                                        onChange={(e) => handleUpdateTeamHistory(index, "DURATION", e.target.value)}
                                                                        className="w-full bg-[#292B35] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-1 focus:outline-none focus:border-[#EE8631]"
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-2">
                                                                    <label className="block text-[#95C5C5] text-xs mb-1">Roles (comma separated)</label>
                                                                    <input 
                                                                        type="text" 
                                                                        value={historyItem.ROLES_PLAYED.join(", ")}
                                                                        onChange={(e) => handleUpdateTeamHistory(index, "ROLES_PLAYED", e.target.value)}
                                                                        className="w-full bg-[#292B35] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-1 focus:outline-none focus:border-[#EE8631]"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <h3 className="text-[#95C5C5] font-medium text-lg">{historyItem.TEAM_NAME}</h3>
                                                            <p className="text-[#E0E0E0]/70 text-sm">Game: {historyItem.GAME_NAME}</p>
                                                            <p className="text-[#E0E0E0]/70 text-sm">Team ID: {historyItem.TEAM_ID}</p>
                                                            <p className="text-[#E0E0E0]/70 text-sm">Duration: {historyItem.DURATION}</p>

                                                            <div className="flex flex-wrap gap-2 mt-3">
                                                                {historyItem.ROLES_PLAYED.map((role, roleIndex) => (
                                                                    <span key={roleIndex} className="bg-[#EE8631]/10 text-[#EE8631] px-2 py-1 rounded text-xs">
                                                                        {role}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-[#E0E0E0]/60 italic">No team history available</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[#EE8631] flex items-center gap-2">
                                    <span>🏆</span> Game Achievements
                                </h2>
                                <button 
                                    onClick={handleAddAchievement}
                                    className="bg-[#95C5C5]/10 text-[#95C5C5] px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#95C5C5]/20 transition-colors"
                                >
                                    + Add Achievement
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {achievements.map(achievement => (
                                    <div key={achievement.id} className="space-y-2">
                                        <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1E1F25]">
                                            {achievement.image ? (
                                                <img
                                                    src={achievement.image}
                                                    alt={achievement.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-[#95C5C5]">No image</span>
                                                </div>
                                            )}
                                            <button 
                                                onClick={() => handleRemoveAchievement(achievement.id)}
                                                className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <select
                                            value={achievement.game}
                                            onChange={(e) => handleUpdateAchievement(achievement.id, 'game', e.target.value)}
                                            className="w-full bg-[#1E1F25] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-2 text-sm"
                                        >
                                            {userData.gamesPlayed.map(game => (
                                                <option key={game} value={game}>{game}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            value={achievement.title}
                                            onChange={(e) => handleUpdateAchievement(achievement.id, 'title', e.target.value)}
                                            placeholder="Achievement title"
                                            className="w-full bg-[#1E1F25] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-2 text-sm"
                                        />
                                        <textarea
                                            value={achievement.description}
                                            onChange={(e) => handleUpdateAchievement(achievement.id, 'description', e.target.value)}
                                            placeholder="Achievement description"
                                            className="w-full bg-[#1E1F25] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-2 text-sm min-h-[80px]"
                                        />
                                        <input
                                            type="text"
                                            value={achievement.image}
                                            onChange={(e) => handleUpdateAchievement(achievement.id, 'image', e.target.value)}
                                            placeholder="Image URL"
                                            className="w-full bg-[#1E1F25] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-2 text-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[#EE8631] flex items-center gap-2">
                                    <span>🎮</span> Game Clips
                                </h2>
                                <button 
                                    onClick={handleAddGameClip}
                                    className="bg-[#95C5C5]/10 text-[#95C5C5] px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#95C5C5]/20 transition-colors"
                                >
                                    + Add Clip
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {gameClips.map(clip => (
                                    <div key={clip.id} className="space-y-2">
                                        <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-[#1E1F25]">
                                            {clip.thumbnail ? (
                                                <img
                                                    src={clip.thumbnail}
                                                    alt={clip.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-[#95C5C5]">No thumbnail</span>
                                                </div>
                                            )}
                                            <button 
                                                onClick={() => handleRemoveClip(clip.id)}
                                                className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={clip.title}
                                            onChange={(e) => handleUpdateClip(clip.id, 'title', e.target.value)}
                                            placeholder="Clip title"
                                            className="w-full bg-[#1E1F25] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-2 text-sm"
                                        />
                                        <select
                                            value={clip.game}
                                            onChange={(e) => handleUpdateClip(clip.id, 'game', e.target.value)}
                                            className="w-full bg-[#1E1F25] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-2 text-sm"
                                        >
                                            {userData.gamesPlayed.map(game => (
                                                <option key={game} value={game}>{game}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            value={clip.videoUrl}
                                            onChange={(e) => handleUpdateClip(clip.id, 'videoUrl', e.target.value)}
                                            placeholder="YouTube video URL"
                                            className="w-full bg-[#1E1F25] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-2 text-sm"
                                        />
                                        <input
                                            type="text"
                                            value={clip.thumbnail}
                                            onChange={(e) => handleUpdateClip(clip.id, 'thumbnail', e.target.value)}
                                            placeholder="Thumbnail URL"
                                            className="w-full bg-[#1E1F25] text-[#E0E0E0] border border-[#95C5C5]/20 rounded p-2 text-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                                <span>🌐</span> Connect
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(isEditing ? editedData.socialLinks : userData.socialLinks).map(([platform, link]) => (
                                    <div key={platform} className="flex items-center gap-2">
                                        <span className="text-[#95C5C5]">
                                            {platform === 'DISCORD' ? '💬' :
                                                platform === 'TWITTER' ? '🐦' :
                                                    platform === 'YOUTUBE' ? '📺' :
                                                        platform === 'INSTAGRAM' ? '📸' :
                                                            platform === 'LINKEDIN' ? '💼' :
                                                                platform === 'WEBSITE' ? '🔗' : '💼'}
                                        </span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={link}
                                                onChange={(e) => {
                                                    const updatedLinks = {...editedData.socialLinks};
                                                    updatedLinks[platform] = e.target.value;
                                                    setEditedData({...editedData, socialLinks: updatedLinks});
                                                }}
                                                className="w-full bg-[#292B35] text-[#E0E0E0] border-b border-[#95C5C5]/20 focus:outline-none focus:border-[#EE8631] text-sm"
                                                placeholder={`${platform.toLowerCase()}`}
                                            />
                                        ) : (
                                            <a
                                                href={platform.toLowerCase() === 'website' ?
                                                    `https://${link}` :
                                                    `https://${platform.toLowerCase()}.com/${link.replace(/^@/, '')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[#E0E0E0] hover:text-[#EE8631] transition-colors"
                                            >
                                                <span>{platform.toLowerCase()}</span>
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;