import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaTrophy, FaChartLine, FaPlus, FaArrowLeft, FaComments, FaCalendarAlt, FaFlag } from 'react-icons/fa';
import CreateTeam from './createTeam';
import ManageTeams from './manageTeams';
import teamsData from './Teams.json';

// Mock data for dashboard stats
const dashboardStats = [
    { title: "Total Teams", value: 3, icon: <FaUsers className="text-[#95C5C5]" /> },
    { title: "Active Events", value: 2, icon: <FaTrophy className="text-[#EE8631]" /> },
    { title: "Achievements", value: 5, icon: <FaChartLine className="text-[#95C5C5]" /> }
];

// TeamDashboard Component
const TeamDashboard = ({ team, onBackClick }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isAdmin, setIsAdmin] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { id: 1, user: 'Alex', message: 'When is our next practice?', timestamp: '2 hours ago' },
        { id: 2, user: 'Sarah', message: 'Tomorrow at 8pm, don\'t be late!', timestamp: '1 hour ago' },
        { id: 3, user: 'Mike', message: 'I might be 10 mins late, heads up', timestamp: '45 mins ago' }
    ]);

    useEffect(() => {
        // Check if current user is admin
        const userIsAdmin = team?.ROLE === "ADMIN" || team?.PARTICIPANTS?.some(p => p.ACCESS === "ADMIN");
        setIsAdmin(userIsAdmin);
    }, [team]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (chatMessage.trim() === '') return;
        
        setChatMessages([
            ...chatMessages, 
            {
                id: chatMessages.length + 1,
                user: 'You', 
                message: chatMessage,
                timestamp: 'Just now'
            }
        ]);
        setChatMessage('');
    };

    return (
        <div className="h-full bg-gradient-to-br from-[#292B35] to-[#363945] p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    className="mb-8 flex items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button 
                        onClick={onBackClick}
                        className="mr-4 text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                    >
                        <FaArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">
                            {team?.NAME || 'Team Dashboard'}
                        </h1>
                        <p className="text-[#E0E0E0] mt-2">
                            {team?.TAGLINE || team?.TEAM_DESCRIPTION || 'Team Management Dashboard'}
                        </p>
                    </div>
                </motion.div>

                {/* Team Info Card */}
                <motion.div 
                    className="bg-[#2F3140] rounded-xl shadow-lg mb-6 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="bg-gradient-to-r from-[#292B35] to-[#363945] p-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-20 h-20 bg-[#95C5C5] rounded-full flex items-center justify-center overflow-hidden mr-4">
                                {team?.TEAM_LOGO ? (
                                    <img src={team.TEAM_LOGO} alt={team.NAME} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-bold text-[#292B35]">{team?.TAG?.slice(0, 2) || team?.SHORT_NAME?.slice(0, 2) || 'T'}</span>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <h2 className="text-2xl font-bold text-[#E0E0E0]">{team?.NAME}</h2>
                                    <span className="ml-3 px-2 py-1 bg-[#95C5C5] text-[#292B35] text-xs rounded-full font-semibold">
                                        {team?.GAME}
                                    </span>
                                </div>
                                <div className="flex items-center mt-1">
                                    <span className="text-[#95C5C5] text-sm">Team Size: {team?.TEAM_SIZE}</span>
                                    <span className="text-[#95C5C5] text-sm mx-3">•</span>
                                    <span className="text-[#95C5C5] text-sm">Members: {team?.PARTICIPANTS?.length || 0}</span>
                                </div>
                            </div>
                        </div>
                        {isAdmin && (
                            <button className="px-4 py-2 bg-[#EE8631] text-white rounded-lg hover:bg-opacity-90 transition-colors">
                                Edit Team
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-[#3A3D4A] mb-6">
                    <button 
                        className={`px-5 py-3 font-medium ${activeTab === 'overview' ? 'text-[#EE8631] border-b-2 border-[#EE8631]' : 'text-[#95C5C5]'}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`px-5 py-3 font-medium ${activeTab === 'milestones' ? 'text-[#EE8631] border-b-2 border-[#EE8631]' : 'text-[#95C5C5]'}`}
                        onClick={() => setActiveTab('milestones')}
                    >
                        Milestones
                    </button>
                    <button 
                        className={`px-5 py-3 font-medium ${activeTab === 'events' ? 'text-[#EE8631] border-b-2 border-[#EE8631]' : 'text-[#95C5C5]'}`}
                        onClick={() => setActiveTab('events')}
                    >
                        Events
                    </button>
                    <button 
                        className={`px-5 py-3 font-medium ${activeTab === 'chat' ? 'text-[#EE8631] border-b-2 border-[#EE8631]' : 'text-[#95C5C5]'}`}
                        onClick={() => setActiveTab('chat')}
                    >
                        Team Chat
                    </button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div 
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {/* Team Description */}
                            <div className="md:col-span-2 bg-[#2F3140] rounded-lg p-6 shadow-lg">
                                <h3 className="text-xl font-semibold text-[#95C5C5] mb-3">Team Description</h3>
                                <p className="text-[#E0E0E0]">{team?.TEAM_DESCRIPTION || "No description available"}</p>
                            </div>

                            {/* Team Members */}
                            <div className="bg-[#2F3140] rounded-lg p-6 shadow-lg">
                                <h3 className="text-xl font-semibold text-[#95C5C5] mb-3">Team Members</h3>
                                <div className="space-y-3">
                                    {team?.PARTICIPANTS?.map((participant, idx) => (
                                        <div key={idx} className="flex items-center bg-[#292B35] p-3 rounded-lg">
                                            <div className="w-8 h-8 bg-[#95C5C5] rounded-full flex items-center justify-center text-[#292B35] font-bold mr-3">
                                                {participant.USER_ID?.charAt(2) || 'U'}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="text-sm text-[#E0E0E0]">{participant.USER_ID}</div>
                                            </div>
                                            <div className="bg-[#EE8631] px-2 py-1 rounded text-xs text-white">
                                                {participant.ACCESS}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Achievements */}
                            <div className="bg-[#2F3140] rounded-lg p-6 shadow-lg">
                                <h3 className="text-xl font-semibold text-[#95C5C5] mb-3">Recent Achievements</h3>
                                <div className="text-center p-4 text-[#E0E0E0] text-sm">
                                    No recent achievements
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="md:col-span-2 bg-[#2F3140] rounded-lg p-6 shadow-lg">
                                <h3 className="text-xl font-semibold text-[#95C5C5] mb-3">Team Stats</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-[#292B35] p-4 rounded-lg text-center">
                                        <div className="text-3xl font-bold text-[#EE8631]">
                                            {team?.MILESTONES?.length || 0}
                                        </div>
                                        <div className="text-sm text-[#95C5C5] mt-1">Milestones</div>
                                    </div>
                                    <div className="bg-[#292B35] p-4 rounded-lg text-center">
                                        <div className="text-3xl font-bold text-[#EE8631]">
                                            {team?.EVENTS_ENROLLED?.length || 0}
                                        </div>
                                        <div className="text-sm text-[#95C5C5] mt-1">Events</div>
                                    </div>
                                    <div className="bg-[#292B35] p-4 rounded-lg text-center">
                                        <div className="text-3xl font-bold text-[#EE8631]">0</div>
                                        <div className="text-sm text-[#95C5C5] mt-1">Wins</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'milestones' && (
                        <motion.div 
                            key="milestones"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-[#E0E0E0]">Team Milestones</h2>
                                {isAdmin && (
                                    <button className="px-4 py-2 bg-[#95C5C5] text-[#292B35] rounded-lg hover:bg-opacity-90 flex items-center">
                                        <FaPlus className="mr-2" /> Add Milestone
                                    </button>
                                )}
                            </div>
                            
                            {team?.MILESTONES?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {team.MILESTONES.map((milestone, idx) => (
                                        <motion.div 
                                            key={milestone.MILESTONE_ID}
                                            className="bg-[#2F3140] rounded-lg p-4 shadow-lg flex"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                                        >
                                            <div className="bg-[#EE8631]/20 p-3 rounded-full mr-4">
                                                <FaFlag className="text-[#EE8631]" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-[#E0E0E0]">{milestone.MILESTONE_NAME}</h3>
                                                <p className="text-[#95C5C5] text-sm mt-1">{milestone.MILESTONE_DESCRIPTION}</p>
                                                <div className="text-xs text-[#EE8631] mt-2">
                                                    Target: {new Date(milestone.MILESTONE_DATE).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-12 bg-[#2F3140] rounded-lg">
                                    <FaFlag className="text-[#95C5C5] opacity-30 text-5xl mx-auto mb-4" />
                                    <p className="text-[#E0E0E0] text-lg">No milestones set yet</p>
                                    {isAdmin && (
                                        <button className="mt-4 px-6 py-2 bg-[#EE8631] text-white rounded-lg hover:bg-opacity-90 inline-flex items-center">
                                            <FaPlus className="mr-2" /> Add Your First Milestone
                                        </button>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'events' && (
                        <motion.div 
                            key="events"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-[#E0E0E0]">Events</h2>
                                {isAdmin && (
                                    <button className="px-4 py-2 bg-[#95C5C5] text-[#292B35] rounded-lg hover:bg-opacity-90 flex items-center">
                                        <FaPlus className="mr-2" /> Enroll in Event
                                    </button>
                                )}
                            </div>
                            
                            {team?.EVENTS_ENROLLED?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {team.EVENTS_ENROLLED.map((event, idx) => (
                                        <motion.div 
                                            key={event.EVENT_ID}
                                            className="bg-[#2F3140] rounded-lg p-6 shadow-lg"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-[#E0E0E0] text-lg">{event.EVENT_NAME}</h3>
                                                    <p className="text-[#95C5C5] text-sm">{event.DESCRIPTION}</p>
                                                </div>
                                                <div className="bg-[#EE8631]/20 p-2 rounded-md">
                                                    <FaTrophy className="text-[#EE8631]" />
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-[#3A3D4A]">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-[#95C5C5]">Venue</p>
                                                        <p className="text-sm text-[#E0E0E0]">{event.VENUE}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-[#95C5C5]">Location</p>
                                                        <p className="text-sm text-[#E0E0E0]">{event.LOCATION}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-[#95C5C5]">Game</p>
                                                        <p className="text-sm text-[#E0E0E0]">{event.GAME}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-12 bg-[#2F3140] rounded-lg">
                                    <FaTrophy className="text-[#95C5C5] opacity-30 text-5xl mx-auto mb-4" />
                                    <p className="text-[#E0E0E0] text-lg">Not enrolled in any events yet</p>
                                    {isAdmin && (
                                        <button className="mt-4 px-6 py-2 bg-[#EE8631] text-white rounded-lg hover:bg-opacity-90 inline-flex items-center">
                                            <FaPlus className="mr-2" /> Explore Events
                                        </button>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'chat' && (
                        <motion.div 
                            key="chat"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#2F3140] rounded-lg shadow-lg overflow-hidden"
                        >
                            <div className="p-4 bg-[#292B35] border-b border-[#3A3D4A]">
                                <h3 className="font-semibold text-[#E0E0E0]">Team Chat</h3>
                            </div>
                            <div className="h-96 overflow-y-auto p-4">
                                {chatMessages.map((msg) => (
                                    <div key={msg.id} className={`mb-4 ${msg.user === 'You' ? 'text-right' : ''}`}>
                                        <div className={`inline-block max-w-3/4 rounded-lg px-4 py-2 ${
                                            msg.user === 'You' 
                                                ? 'bg-[#EE8631] text-white' 
                                                : 'bg-[#292B35] text-[#E0E0E0]'
                                        }`}>
                                            <div className="font-semibold text-sm">
                                                {msg.user === 'You' ? 'You' : msg.user}
                                            </div>
                                            <div>{msg.message}</div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">{msg.timestamp}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-[#3A3D4A]">
                                <form onSubmit={handleSendMessage} className="flex">
                                    <input 
                                        type="text" 
                                        value={chatMessage}
                                        onChange={(e) => setChatMessage(e.target.value)}
                                        placeholder="Type your message..." 
                                        className="flex-grow px-4 py-2 bg-[#292B35] border border-[#3A3D4A] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#95C5C5]"
                                    />
                                    <button 
                                        type="submit"
                                        className="px-6 py-2 bg-[#EE8631] text-white rounded-r-lg hover:bg-opacity-90"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const Teams = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [selectedTeam, setSelectedTeam] = useState(null);
    
    const handleManageTeamsClick = () => {
        setActiveView('manage');
    };

    const handleCreateTeamClick = () => {
        setActiveView('create');
    };

    const handleDashboardClick = () => {
        setActiveView('dashboard');
        setSelectedTeam(null);
    };

    const handleTeamSelect = (team) => {
        setSelectedTeam(team || teamsData);
        setActiveView('teamDashboard');
    };

    const handleBackClick = () => {
        if (activeView === 'teamDashboard') {
            setActiveView('manage');
            setSelectedTeam(null);
        } else {
            setActiveView('dashboard');
        }
    };

    // Dashboard overview component
    const DashboardOverview = () => (
        <div className="h-full bg-gradient-to-br from-[#292B35] to-[#363945] p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">
                        Teams Dashboard
                    </h1>
                    <p className="text-[#E0E0E0] mt-2">
                        Manage your teams, track milestones, and join events.
                    </p>
                </motion.div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {dashboardStats.map((stat, index) => (
                        <motion.div 
                            key={index}
                            className="bg-[#2F3140] rounded-lg shadow-lg p-6 flex items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="bg-[#292B35] p-4 rounded-full mr-4">
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-sm text-[#95C5C5]">{stat.title}</div>
                                <div className="text-3xl font-bold text-[#E0E0E0]">{stat.value}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Quick Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.button 
                        className="bg-gradient-to-r from-[#95C5C5] to-[#7BA3A3] hover:from-[#7BA3A3] hover:to-[#95C5C5] text-[#292B35] font-bold p-6 rounded-lg flex items-center justify-center"
                        onClick={handleManageTeamsClick}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaUsers className="text-2xl mr-3" />
                        <span className="text-xl">Manage Your Teams</span>
                    </motion.button>
                    
                    <motion.button 
                        className="bg-gradient-to-r from-[#EE8631] to-[#AD662F] hover:from-[#AD662F] hover:to-[#EE8631] text-white font-bold p-6 rounded-lg flex items-center justify-center"
                        onClick={handleCreateTeamClick}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaPlus className="text-2xl mr-3" />
                        <span className="text-xl">Create New Team</span>
                    </motion.button>
                </div>

                {/* Recent Activities - Placeholder */}
                <div className="bg-[#2F3140] rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-[#95C5C5] mb-4">Recent Activities</h2>
                    <div className="space-y-4">
                        <div className="bg-[#292B35] p-4 rounded-lg">
                            <div className="text-[#EE8631]">Team "Phoenix Flames" joined an event</div>
                            <div className="text-xs text-[#95C5C5]">2 days ago</div>
                        </div>
                        <div className="bg-[#292B35] p-4 rounded-lg">
                            <div className="text-[#EE8631]">New milestone reached by "Shadow Wolves"</div>
                            <div className="text-xs text-[#95C5C5]">5 days ago</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-screen bg-[#292B35]">
            <AnimatePresence mode="wait">
                {activeView === 'dashboard' && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full"
                    >
                        <DashboardOverview />
                    </motion.div>
                )}
                {activeView === 'create' && (
                    <motion.div
                        key="create"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full"
                    >
                        <CreateTeam onBackClick={handleDashboardClick} />
                    </motion.div>
                )}
                {activeView === 'manage' && (
                    <motion.div
                        key="manage"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full"
                    >
                        <ManageTeams 
                            onBackClick={handleDashboardClick} 
                            onTeamSelect={handleTeamSelect}
                        />
                    </motion.div>
                )}
                {activeView === 'teamDashboard' && selectedTeam && (
                    <motion.div
                        key="teamDashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full"
                    >
                        <TeamDashboard 
                            team={selectedTeam}
                            onBackClick={handleBackClick}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Teams;