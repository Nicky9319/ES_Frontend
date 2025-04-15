import React, { useState } from 'react';
import { FaArrowLeft, FaEdit, FaUsers, FaTrash, FaTrophy, FaChartBar, FaCog, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ManageTeams = ({ onBackClick }) => {
    const [activeTeam, setActiveTeam] = useState(null);
    const [activeTab, setActiveTab] = useState('info');

    // Mock data for teams
    const mockTeams = [
        {
            id: 1,
            name: "Phoenix Flames",
            tag: "PF",
            logo: "🔥",
            description: "Rising from the ashes to dominate the eSports scene",
            game: "Valorant",
            members: [
                { id: 1, name: "DragonSlayer", role: "Captain", avatar: "😎" },
                { id: 2, name: "ShadowHunter", role: "Player", avatar: "🎮" },
                { id: 3, name: "NightRaven", role: "Player", avatar: "🦅" },
                { id: 4, name: "StormBreaker", role: "Player", avatar: "⚡" },
                { id: 5, name: "MindMaster", role: "Coach", avatar: "🧠" }
            ],
            stats: { wins: 15, losses: 3, rank: "Diamond" },
            tournaments: [
                { id: 1, name: "Summer Showdown 2023", status: "Completed", result: "1st Place" },
                { id: 2, name: "Winter Championship", status: "Upcoming", result: "Registered" }
            ]
        },
        {
            id: 2,
            name: "Shadow Wolves",
            tag: "SW",
            logo: "🐺",
            description: "Hunting in the darkness, striking when least expected",
            game: "CS2",
            members: [
                { id: 6, name: "SilentAssassin", role: "Captain", avatar: "🥷" },
                { id: 7, name: "GhostWalker", role: "Player", avatar: "👻" },
                { id: 8, name: "DarkPhoenix", role: "Player", avatar: "🦇" },
                { id: 9, name: "MidnightHunter", role: "Player", avatar: "🌙" },
                { id: 10, name: "TacticalMind", role: "Analyst", avatar: "🧮" }
            ],
            stats: { wins: 12, losses: 6, rank: "Platinum" },
            tournaments: [
                { id: 3, name: "Global Masters 2023", status: "Completed", result: "3rd Place" },
                { id: 4, name: "Regional Qualifier", status: "Upcoming", result: "Registered" }
            ]
        }
    ];

    const handleTeamSelect = (team) => {
        setActiveTeam(team);
        setActiveTab('info');
    };

    const handleBackFromTeamDetail = () => {
        setActiveTeam(null);
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-br from-[#292B35] to-[#363945] text-[#E0E0E0] p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with back button */}
                <motion.div 
                    className="flex items-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button 
                        onClick={activeTeam ? handleBackFromTeamDetail : onBackClick} 
                        className="mr-4 text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                    >
                        <FaArrowLeft size={24} />
                    </button>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">
                        {activeTeam ? activeTeam.name : "Manage Your Teams"}
                    </h1>
                    
                </motion.div>

                <AnimatePresence mode="wait">
                    {!activeTeam ? (
                        /* Team list view */
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                        >
                            {mockTeams.map((team, index) => (
                                <motion.div 
                                    key={team.id} 
                                    variants={itemVariants}
                                    transition={{ duration: 0.4 }}
                                    className="bg-[#2F3140] rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    onClick={() => handleTeamSelect(team)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="bg-[#292B35] p-6 flex items-center space-x-4 relative overflow-hidden">
                                        <div className="w-20 h-20 flex items-center justify-center bg-[#95C5C5] rounded-full text-5xl shadow-md relative z-10">
                                            {team.logo}
                                            <motion.div 
                                                className="absolute inset-0 rounded-full bg-[#95C5C5]"
                                                initial={{ scale: 1, opacity: 0.5 }}
                                                animate={{ 
                                                    scale: [1, 1.2, 1], 
                                                    opacity: [0.5, 0.2, 0.5] 
                                                }}
                                                transition={{ 
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    repeatType: "reverse"
                                                }}
                                                style={{ 
                                                    zIndex: -1,
                                                    filter: "blur(8px)"
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">{team.name}</h3>
                                            <p className="text-[#95C5C5]">{team.tag} • {team.game}</p>
                                        </div>
                                        <motion.div 
                                            className="absolute right-0 top-0 h-full w-24"
                                            initial={{ opacity: 0.1 }}
                                            style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(149, 197, 197, 0.1))'
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 bg-[#2F3140]">
                                        <p className="text-sm text-gray-300 mb-4">{team.description}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center text-[#95C5C5]">
                                                <FaUsers className="mr-2" />
                                                <span>{team.members.length} Members</span>
                                            </div>
                                            <div className="px-3 py-1 bg-gradient-to-r from-[#95C5C5] to-[#7BA3A3] text-[#292B35] rounded-full text-sm font-medium shadow-sm">
                                                {team.stats.rank}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        /* Team details view */
                        <motion.div 
                            className="bg-[#2F3140] rounded-lg shadow-xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Team header */}
                            <div className="bg-gradient-to-r from-[#292B35] to-[#363945] p-6 relative overflow-hidden">
                                <motion.div 
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        background: 'radial-gradient(circle at 30% 30%, rgba(149, 197, 197, 0.4) 0%, transparent 70%)'
                                    }}
                                />
                                <div className="flex flex-wrap items-center justify-between relative z-10">
                                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                        <div className="w-24 h-24 flex items-center justify-center bg-[#95C5C5] rounded-full text-6xl shadow-lg">
                                            {activeTeam.logo}
                                            <motion.div 
                                                className="absolute rounded-full bg-[#95C5C5]"
                                                initial={{ scale: 1 }}
                                                animate={{ 
                                                    scale: [1, 1.2, 1], 
                                                    opacity: [0.7, 0.2, 0.7] 
                                                }}
                                                transition={{ 
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    repeatType: "reverse"
                                                }}
                                                style={{ 
                                                    width: '96px',
                                                    height: '96px',
                                                    zIndex: -1,
                                                    filter: "blur(8px)"
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold">{activeTeam.name}</h2>
                                            <p className="text-[#95C5C5] text-lg">{activeTeam.tag} • {activeTeam.game}</p>
                                        </div>
                                    </div>
                                    <div className="space-x-3">
                                        <motion.button 
                                            className="px-4 py-2 bg-[#EE8631] text-white rounded-md shadow-md hover:bg-[#AD662F] transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FaEdit className="inline mr-2" />
                                            Edit Team
                                        </motion.button>
                                        <motion.button 
                                            className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FaTrash className="inline mr-2" />
                                            Disband Team
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="bg-[#292B35] flex overflow-x-auto scrollbar-hide">
                                {['info', 'members', 'tournaments', 'stats', 'settings'].map((tab) => (
                                    <motion.button 
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-4 font-medium whitespace-nowrap relative ${
                                            activeTab === tab ? 'text-[#292B35]' : 'text-gray-300 hover:text-white hover:bg-opacity-10 hover:bg-white'
                                        }`}
                                        whileHover={activeTab !== tab ? { backgroundColor: 'rgba(255,255,255,0.05)' } : {}}
                                    >
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="activeTabBg"
                                                className="absolute inset-0 bg-[#95C5C5]"
                                                initial={false}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10 capitalize">
                                            {tab === 'info' ? 'Team Info' : tab}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Tab content */}
                            <div className="p-6">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'info' && (
                                        <motion.div
                                            key="info"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-bold mb-4 text-[#95C5C5]">Team Information</h3>
                                            <div className="mb-6 bg-[#292B35] bg-opacity-40 p-5 rounded-lg">
                                                <h4 className="font-semibold text-[#95C5C5] mb-2">Description</h4>
                                                <p className="text-gray-200">{activeTeam.description}</p>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                <motion.div 
                                                    className="p-4 bg-[#292B35] bg-opacity-30 rounded-lg shadow-inner"
                                                    whileHover={{ y: -2, backgroundColor: 'rgba(41, 43, 53, 0.5)' }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <h4 className="font-semibold text-[#95C5C5]">Game</h4>
                                                    <p className="text-gray-200">{activeTeam.game}</p>
                                                </motion.div>
                                                <motion.div 
                                                    className="p-4 bg-[#292B35] bg-opacity-30 rounded-lg shadow-inner"
                                                    whileHover={{ y: -2, backgroundColor: 'rgba(41, 43, 53, 0.5)' }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <h4 className="font-semibold text-[#95C5C5]">Rank</h4>
                                                    <p className="text-gray-200">{activeTeam.stats.rank}</p>
                                                </motion.div>
                                                <motion.div 
                                                    className="p-4 bg-[#292B35] bg-opacity-30 rounded-lg shadow-inner"
                                                    whileHover={{ y: -2, backgroundColor: 'rgba(41, 43, 53, 0.5)' }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <h4 className="font-semibold text-[#95C5C5]">Team Tag</h4>
                                                    <p className="text-gray-200">{activeTeam.tag}</p>
                                                </motion.div>
                                            </div>
                                            <motion.div 
                                                className="p-6 bg-gradient-to-r from-[#95C5C5] to-[#7BA3A3] bg-opacity-20 rounded-lg shadow"
                                                initial={{ x: -10, opacity: 0.5 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2, duration: 0.4 }}
                                            >
                                                <h4 className="font-bold text-[#EE8631] mb-2">Team Noticeboard</h4>
                                                <p className="italic text-gray-200">Use this space for team announcements and strategy discussions.</p>
                                                <textarea 
                                                    className="w-full mt-3 p-3 bg-[#292B35] bg-opacity-50 border border-[#95C5C5] border-opacity-30 rounded text-white placeholder-gray-400"
                                                    placeholder="Write an announcement for your team..."
                                                    rows={3}
                                                ></textarea>
                                                <div className="flex justify-end mt-3">
                                                    <motion.button 
                                                        className="px-4 py-2 bg-[#EE8631] text-white rounded shadow"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Post Announcement
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'members' && (
                                        <motion.div
                                            key="members"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-xl font-bold text-[#95C5C5]">Team Members</h3>
                                                <motion.button 
                                                    className="px-4 py-2 bg-[#EE8631] text-white rounded shadow-md hover:bg-[#AD662F] transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <FaUserPlus className="inline mr-2" />
                                                    Invite Member
                                                </motion.button>
                                            </div>

                                            <div className="bg-[#292B35] bg-opacity-50 rounded-lg overflow-hidden shadow">
                                                <div className="bg-[#292B35] text-[#95C5C5] p-4 grid grid-cols-12">
                                                    <div className="col-span-6 font-medium">Member</div>
                                                    <div className="col-span-3 font-medium">Role</div>
                                                    <div className="col-span-3 font-medium">Actions</div>
                                                </div>
                                                <div>
                                                    {activeTeam.members.map((member, index) => (
                                                        <motion.div 
                                                            key={member.id} 
                                                            className={`grid grid-cols-12 p-4 items-center ${
                                                                index % 2 === 0 ? 'bg-[#292B35] bg-opacity-30' : 'bg-[#292B35] bg-opacity-10'
                                                            } hover:bg-[#292B35] hover:bg-opacity-40 transition-colors`}
                                                            whileHover={{ backgroundColor: 'rgba(41, 43, 53, 0.5)' }}
                                                        >
                                                            <div className="col-span-6 flex items-center">
                                                                <div className="w-10 h-10 rounded-full bg-[#95C5C5] bg-opacity-20 flex items-center justify-center mr-3 text-xl">
                                                                    {member.avatar}
                                                                </div>
                                                                <span className="text-gray-100">{member.name}</span>
                                                            </div>
                                                            <div className="col-span-3">
                                                                <span className={`px-2 py-1 rounded ${
                                                                    member.role === 'Captain' ? 'bg-yellow-500 bg-opacity-20 text-yellow-300' : 
                                                                    member.role === 'Coach' ? 'bg-blue-500 bg-opacity-20 text-blue-300' :
                                                                    'bg-green-500 bg-opacity-20 text-green-300'
                                                                }`}>
                                                                    {member.role}
                                                                </span>
                                                            </div>
                                                            <div className="col-span-3 flex">
                                                                <motion.button 
                                                                    className="text-[#95C5C5] hover:text-white mr-4"
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                >
                                                                    Edit Role
                                                                </motion.button>
                                                                <motion.button 
                                                                    className="text-red-400 hover:text-red-300"
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                >
                                                                    <FaUserMinus className="inline mr-1" /> Remove
                                                                </motion.button>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'tournaments' && (
                                        <motion.div
                                            key="tournaments"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-xl font-bold text-[#95C5C5]">Tournaments</h3>
                                                <motion.button 
                                                    className="px-4 py-2 bg-[#EE8631] text-white rounded shadow-md hover:bg-[#AD662F] transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <FaTrophy className="inline mr-2" />
                                                    Register for Tournament
                                                </motion.button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {activeTeam.tournaments.map((tournament, index) => (
                                                    <motion.div 
                                                        key={tournament.id} 
                                                        className="bg-[#292B35] bg-opacity-40 rounded-lg overflow-hidden shadow"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                                        whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}
                                                    >
                                                        <div className={`p-5 relative overflow-hidden ${
                                                            tournament.status === 'Upcoming' ? 'border-l-4 border-blue-500' : 'border-l-4 border-green-500'
                                                        }`}>
                                                            <motion.div 
                                                                className="absolute top-0 right-0 h-full w-24"
                                                                initial={{ opacity: 0.1 }}
                                                                style={{
                                                                    background: tournament.status === 'Upcoming'
                                                                        ? 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1))'
                                                                        : 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1))'
                                                                }}
                                                            />
                                                            
                                                            <h4 className="text-lg font-bold mb-3">{tournament.name}</h4>
                                                            <div className="flex justify-between items-center">
                                                                <span className={`px-3 py-1 rounded-full text-sm ${
                                                                    tournament.status === 'Upcoming' 
                                                                        ? 'bg-blue-500 bg-opacity-20 text-blue-300' 
                                                                        : 'bg-green-500 bg-opacity-20 text-green-300'
                                                                }`}>
                                                                    {tournament.status}
                                                                </span>
                                                                <span className={`font-medium ${
                                                                    tournament.result === '1st Place' 
                                                                        ? 'text-yellow-300' 
                                                                        : tournament.result === '2nd Place'
                                                                            ? 'text-gray-300'
                                                                            : tournament.result === '3rd Place'
                                                                                ? 'text-amber-500'
                                                                                : 'text-white'
                                                                }`}>
                                                                    {tournament.result}
                                                                </span>
                                                            </div>
                                                            
                                                            {tournament.status === 'Upcoming' && (
                                                                <div className="mt-4 flex justify-end">
                                                                    <motion.button 
                                                                        className="px-3 py-1 bg-[#95C5C5] bg-opacity-20 text-[#95C5C5] rounded hover:bg-opacity-30 text-sm"
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        View Details
                                                                    </motion.button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'stats' && (
                                        <motion.div
                                            key="stats"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-bold mb-6 text-[#95C5C5]">Team Statistics</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                                <motion.div 
                                                    className="bg-[#292B35] p-6 rounded-lg shadow-lg relative overflow-hidden"
                                                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
                                                >
                                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                                                            <path d="M15.293 7.293l-6 6-3.293-3.293-1.414 1.414L8 14.414l7.414-7.414-1.414-1.414z" />
                                                        </svg>
                                                    </div>
                                                    <h4 className="text-[#95C5C5] mb-1 font-medium">Wins</h4>
                                                    <p className="text-5xl font-bold text-green-400">{activeTeam.stats.wins}</p>
                                                    <div className="h-1 w-20 bg-green-500 mt-4"></div>
                                                </motion.div>
                                                
                                                <motion.div 
                                                    className="bg-[#292B35] p-6 rounded-lg shadow-lg relative overflow-hidden"
                                                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
                                                >
                                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                                                            <path d="M15.293 16.707l-1.414-1.414L12 17.586l-1.879-1.293-1.414 1.414L12 19.414l3.293-2.707z" />
                                                            <path d="M12 14c1.108 0 2-.892 2-2s-.892-2-2-2-2 .892-2 2 .892 2 2 2z" />
                                                        </svg>
                                                    </div>
                                                    <h4 className="text-[#95C5C5] mb-1 font-medium">Losses</h4>
                                                    <p className="text-5xl font-bold text-red-400">{activeTeam.stats.losses}</p>
                                                    <div className="h-1 w-20 bg-red-500 mt-4"></div>
                                                </motion.div>
                                                
                                                <motion.div 
                                                    className="bg-[#292B35] p-6 rounded-lg shadow-lg relative overflow-hidden"
                                                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
                                                >
                                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                                                            <path d="M8 9h8v2H8zm0 4h8v2H8z" />
                                                        </svg>
                                                    </div>
                                                    <h4 className="text-[#95C5C5] mb-1 font-medium">Win Rate</h4>
                                                    <p className="text-5xl font-bold text-[#95C5C5]">
                                                        {Math.round((activeTeam.stats.wins / (activeTeam.stats.wins + activeTeam.stats.losses)) * 100)}%
                                                    </p>
                                                    <div className="h-1 w-20 bg-[#95C5C5] mt-4"></div>
                                                </motion.div>
                                            </div>
                                            
                                            <motion.div 
                                                className="bg-[#292B35] p-6 rounded-lg shadow-lg mb-6"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                            >
                                                <h4 className="font-semibold text-[#95C5C5] mb-4">Performance Graph</h4>
                                                <div className="h-64 bg-[#1D1F28] rounded flex items-center justify-center relative">
                                                    {/* Mock graph UI with gradients */}
                                                    <div className="absolute inset-0 flex items-end p-4">
                                                        <div className="w-1/5 h-40% bg-gradient-to-t from-green-500 to-green-400 rounded-t opacity-80"></div>
                                                        <div className="w-1/5 h-70% bg-gradient-to-t from-green-500 to-green-400 rounded-t opacity-80 ml-1"></div>
                                                        <div className="w-1/5 h-30% bg-gradient-to-t from-red-500 to-red-400 rounded-t opacity-80 ml-1"></div>
                                                        <div className="w-1/5 h-80% bg-gradient-to-t from-green-500 to-green-400 rounded-t opacity-80 ml-1"></div>
                                                        <div className="w-1/5 h-60% bg-gradient-to-t from-green-500 to-green-400 rounded-t opacity-80 ml-1"></div>
                                                    </div>
                                                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                                                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'settings' && (
                                        <motion.div
                                            key="settings"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-xl font-bold mb-6 text-[#95C5C5]">Team Settings</h3>
                                            
                                            <motion.div 
                                                className="mb-6 p-6 rounded-lg bg-[#292B35] bg-opacity-40"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <h4 className="font-semibold text-[#EE8631] mb-4">Privacy Settings</h4>
                                                <div className="space-y-6">
                                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 border-b border-gray-700">
                                                        <div className="mb-3 md:mb-0">
                                                            <p className="font-medium text-white">Team Visibility</p>
                                                            <p className="text-sm text-gray-400">Make your team visible to others</p>
                                                        </div>
                                                        <select className="px-4 py-2 bg-[#1D1F28] text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#95C5C5] focus:border-transparent">
                                                            <option>Public</option>
                                                            <option>Private</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 border-b border-gray-700">
                                                        <div className="mb-3 md:mb-0">
                                                            <p className="font-medium text-white">Join Requests</p>
                                                            <p className="text-sm text-gray-400">Allow players to request joining your team</p>
                                                        </div>
                                                        <label className="inline-flex items-center cursor-pointer">
                                                            <div className="relative">
                                                                <input type="checkbox" className="sr-only" defaultChecked />
                                                                <div className="w-12 h-6 bg-gray-700 rounded-full"></div>
                                                                <div className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition"></div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
                                                        <div className="mb-3 md:mb-0">
                                                            <p className="font-medium text-white">Team Applications</p>
                                                            <p className="text-sm text-gray-400">Receive notifications for new applications</p>
                                                        </div>
                                                        <label className="inline-flex items-center cursor-pointer">
                                                            <div className="relative">
                                                                <input type="checkbox" className="sr-only" defaultChecked />
                                                                <div className="w-12 h-6 bg-gray-700 rounded-full"></div>
                                                                <div className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition"></div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            
                                            <motion.div 
                                                className="mb-6 p-6 rounded-lg bg-red-900 bg-opacity-20"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: 0.1 }}
                                            >
                                                <h4 className="font-semibold text-red-400 mb-4">Danger Zone</h4>
                                                <p className="mb-6 text-sm text-red-300">These actions cannot be undone. Please be certain before proceeding.</p>
                                                <div className="flex flex-wrap gap-4">
                                                    <motion.button 
                                                        className="px-4 py-2 bg-gray-800 text-gray-300 rounded border border-red-800 hover:bg-gray-700"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Transfer Ownership
                                                    </motion.button>
                                                    <motion.button 
                                                        className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Disband Team
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ManageTeams;
