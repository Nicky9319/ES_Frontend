import React, { useState } from 'react';
import { FaArrowLeft, FaEdit, FaUsers, FaTrash, FaTrophy, FaChartBar, FaCog, FaUserPlus, FaUserMinus } from 'react-icons/fa';

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

    return (
        <div className="h-screen overflow-y-auto bg-[#E0E0E0] p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with back button */}
                <div className="flex items-center mb-6">
                    <button onClick={onBackClick} className="mr-4 text-[#292B35] hover:text-[#EE8631]">
                        <FaArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-[#292B35]">Manage Your Teams</h1>
                </div>

                {!activeTeam ? (
                    /* Team list view */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockTeams.map(team => (
                            <div 
                                key={team.id} 
                                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                                onClick={() => handleTeamSelect(team)}
                            >
                                <div className="bg-[#292B35] p-4 flex items-center space-x-4">
                                    <div className="w-16 h-16 flex items-center justify-center bg-[#95C5C5] rounded-full text-4xl">
                                        {team.logo}
                                    </div>
                                    <div className="text-white">
                                        <h3 className="text-xl font-bold">{team.name}</h3>
                                        <p className="text-[#95C5C5]">{team.tag} • {team.game}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-white">
                                    <p className="text-sm text-gray-600 mb-4">{team.description}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <FaUsers className="text-[#292B35] mr-2" />
                                            <span>{team.members.length} Members</span>
                                        </div>
                                        <div className="px-3 py-1 bg-[#95C5C5] text-[#292B35] rounded-full text-sm font-medium">
                                            {team.stats.rank}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Team details view */
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Team header */}
                        <div className="bg-[#292B35] p-6 flex flex-wrap items-center justify-between">
                            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                <div className="w-20 h-20 flex items-center justify-center bg-[#95C5C5] rounded-full text-5xl">
                                    {activeTeam.logo}
                                </div>
                                <div className="text-white">
                                    <h2 className="text-2xl font-bold">{activeTeam.name}</h2>
                                    <p className="text-[#95C5C5]">{activeTeam.tag} • {activeTeam.game}</p>
                                </div>
                            </div>
                            <div className="space-x-2">
                                <button className="px-4 py-2 bg-[#EE8631] text-white rounded hover:bg-[#AD662F] transition-colors">
                                    <FaEdit className="inline mr-2" />
                                    Edit Team
                                </button>
                                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                                    <FaTrash className="inline mr-2" />
                                    Disband Team
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-[#292B35] text-white flex border-b border-gray-700">
                            <button 
                                onClick={() => setActiveTab('info')}
                                className={`px-6 py-3 font-medium ${activeTab === 'info' ? 'bg-[#95C5C5] text-[#292B35]' : 'hover:bg-gray-700'}`}
                            >
                                Team Info
                            </button>
                            <button 
                                onClick={() => setActiveTab('members')}
                                className={`px-6 py-3 font-medium ${activeTab === 'members' ? 'bg-[#95C5C5] text-[#292B35]' : 'hover:bg-gray-700'}`}
                            >
                                Members
                            </button>
                            <button 
                                onClick={() => setActiveTab('tournaments')}
                                className={`px-6 py-3 font-medium ${activeTab === 'tournaments' ? 'bg-[#95C5C5] text-[#292B35]' : 'hover:bg-gray-700'}`}
                            >
                                Tournaments
                            </button>
                            <button 
                                onClick={() => setActiveTab('stats')}
                                className={`px-6 py-3 font-medium ${activeTab === 'stats' ? 'bg-[#95C5C5] text-[#292B35]' : 'hover:bg-gray-700'}`}
                            >
                                Stats
                            </button>
                            <button 
                                onClick={() => setActiveTab('settings')}
                                className={`px-6 py-3 font-medium ${activeTab === 'settings' ? 'bg-[#95C5C5] text-[#292B35]' : 'hover:bg-gray-700'}`}
                            >
                                Settings
                            </button>
                        </div>

                        {/* Tab content */}
                        <div className="p-6">
                            {activeTab === 'info' && (
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-[#292B35]">Team Information</h3>
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                                        <p>{activeTeam.description}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold text-gray-700">Game</h4>
                                            <p>{activeTeam.game}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold text-gray-700">Rank</h4>
                                            <p>{activeTeam.stats.rank}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold text-gray-700">Team Tag</h4>
                                            <p>{activeTeam.tag}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-[#95C5C5] bg-opacity-20 rounded-lg">
                                        <h4 className="font-semibold text-[#292B35] mb-2">Team Noticeboard</h4>
                                        <p className="italic">Use this space for team announcements and strategy discussions.</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'members' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-[#292B35]">Team Members</h3>
                                        <button className="px-4 py-2 bg-[#EE8631] text-white rounded hover:bg-[#AD662F] transition-colors">
                                            <FaUserPlus className="inline mr-2" />
                                            Invite Member
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full bg-white border-collapse">
                                            <thead className="bg-[#292B35] text-white">
                                                <tr>
                                                    <th className="p-3 text-left">Member</th>
                                                    <th className="p-3 text-left">Role</th>
                                                    <th className="p-3 text-left">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {activeTeam.members.map(member => (
                                                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                        <td className="p-3 flex items-center space-x-3">
                                                            <span className="text-2xl">{member.avatar}</span>
                                                            <span>{member.name}</span>
                                                        </td>
                                                        <td className="p-3">{member.role}</td>
                                                        <td className="p-3">
                                                            <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                                Edit Role
                                                            </button>
                                                            <button className="text-red-600 hover:text-red-800">
                                                                <FaUserMinus className="inline" /> Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tournaments' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-[#292B35]">Tournaments</h3>
                                        <button className="px-4 py-2 bg-[#EE8631] text-white rounded hover:bg-[#AD662F] transition-colors">
                                            <FaTrophy className="inline mr-2" />
                                            Register for Tournament
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {activeTeam.tournaments.map(tournament => (
                                            <div key={tournament.id} className="border rounded-lg overflow-hidden">
                                                <div className={`p-4 ${tournament.status === 'Upcoming' ? 'bg-blue-50' : 'bg-green-50'}`}>
                                                    <h4 className="font-bold">{tournament.name}</h4>
                                                    <div className="flex justify-between mt-2">
                                                        <span className={`px-2 py-1 rounded text-sm ${tournament.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                            {tournament.status}
                                                        </span>
                                                        <span className="font-medium">{tournament.result}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'stats' && (
                                <div>
                                    <h3 className="text-xl font-bold mb-6 text-[#292B35]">Team Statistics</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <div className="bg-white p-6 rounded-lg shadow text-center">
                                            <h4 className="text-gray-500 mb-1">Wins</h4>
                                            <p className="text-4xl font-bold text-green-600">{activeTeam.stats.wins}</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-lg shadow text-center">
                                            <h4 className="text-gray-500 mb-1">Losses</h4>
                                            <p className="text-4xl font-bold text-red-600">{activeTeam.stats.losses}</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-lg shadow text-center">
                                            <h4 className="text-gray-500 mb-1">Win Rate</h4>
                                            <p className="text-4xl font-bold text-blue-600">
                                                {Math.round((activeTeam.stats.wins / (activeTeam.stats.wins + activeTeam.stats.losses)) * 100)}%
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                                        <h4 className="font-semibold mb-4">Performance Graph</h4>
                                        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                                            <p className="text-gray-500">Performance visualization would appear here</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div>
                                    <h3 className="text-xl font-bold mb-6 text-[#292B35]">Team Settings</h3>
                                    
                                    <div className="mb-6 p-4 rounded-lg bg-gray-50">
                                        <h4 className="font-semibold mb-4">Privacy Settings</h4>
                                        <div className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="font-medium">Team Visibility</p>
                                                <p className="text-sm text-gray-600">Make your team visible to others</p>
                                            </div>
                                            <select className="px-3 py-2 border rounded bg-white">
                                                <option>Public</option>
                                                <option>Private</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-t">
                                            <div>
                                                <p className="font-medium">Join Requests</p>
                                                <p className="text-sm text-gray-600">Allow players to request joining your team</p>
                                            </div>
                                            <label className="switch">
                                                <input type="checkbox" checked/>
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6 p-4 rounded-lg bg-red-50">
                                        <h4 className="font-semibold mb-4 text-red-800">Danger Zone</h4>
                                        <p className="mb-4 text-sm text-red-800">These actions cannot be undone. Please be certain.</p>
                                        <div className="flex space-x-4">
                                            <button className="px-4 py-2 bg-red-100 text-red-600 rounded border border-red-200 hover:bg-red-200">
                                                Transfer Ownership
                                            </button>
                                            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                                Disband Team
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageTeams;
