import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaEdit, FaTrash, FaTrophy, FaUsers, FaUserPlus, FaUserMinus, FaFlagCheckered, FaSave } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Color palette
const COLORS = {
    primaryDark: "#292B35",
    secondaryDark: "#2F3140",
    accent: "#95C5C5",
    highlight: "#EE8631",
    highlightDark: "#AD662F",
    light: "#E0E0E0"
};

// Reusable Team Card
const TeamCard = ({ team, onClick }) => (
    <motion.div
        className="bg-[#2F3140] rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        onClick={() => onClick(team)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <div className="bg-[#292B35] p-6 flex items-center space-x-4 relative">
            <div className="w-20 h-20 flex items-center justify-center bg-[#95C5C5] rounded-full text-5xl shadow-md relative z-10 overflow-hidden">
                {team.TEAM_LOGO ? (
                    <img src={team.TEAM_LOGO} alt="logo" className="w-full h-full object-cover rounded-full" />
                ) : (
                    <span>{team.TAG?.slice(0, 2) || "T"}</span>
                )}
            </div>
            <div>
                <h3 className="text-2xl font-bold">{team.NAME}</h3>
                <p className="text-[#95C5C5]">{team.TAG} • {team.GAME}</p>
            </div>
        </div>
        <div className="p-6 bg-[#2F3140]">
            <p className="text-sm text-gray-300 mb-4">{team.TEAM_DESCRIPTION}</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center text-[#95C5C5]">
                    <FaUsers className="mr-2" />
                    <span>{team.PARTICIPANTS?.length || 0} Members</span>
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-[#95C5C5] to-[#7BA3A3] text-[#292B35] rounded-full text-sm font-medium shadow-sm">
                    {team.TEAM_SIZE || 0}
                </div>
            </div>
        </div>
    </motion.div>
);

// Milestone List
const MilestoneList = ({ milestones, editable }) => (
    <div className="space-y-4">
        {milestones && milestones.length > 0 ? milestones.map(m => (
            <div key={m.MILESTONE_ID} className="bg-[#292B35] p-4 rounded-lg flex items-center">
                <FaFlagCheckered className="text-[#EE8631] mr-4 text-2xl" />
                <div className="flex-1">
                    <div className="font-bold text-[#95C5C5]">{m.MILESTONE_NAME}</div>
                    <div className="text-[#E0E0E0]">{m.MILESTONE_DESCRIPTION}</div>
                    <div className="text-xs text-[#95C5C5] mt-1">{new Date(m.MILESTONE_DATE).toLocaleDateString()}</div>
                </div>
                {editable && (
                    <button className="ml-2 text-[#EE8631] hover:text-[#AD662F]">
                        <FaEdit />
                    </button>
                )}
            </div>
        )) : (
            <div className="text-[#95C5C5]/70 italic">No milestones yet.</div>
        )}
    </div>
);

// Event List
const EventList = ({ events }) => (
    <div className="space-y-4">
        {events && events.length > 0 ? events.map(e => (
            <div key={e.EVENT_ID} className="bg-[#292B35] p-4 rounded-lg flex flex-col">
                <div className="flex items-center mb-2">
                    <FaTrophy className="text-[#EE8631] mr-2" />
                    <span className="font-bold text-[#95C5C5]">{e.EVENT_NAME}</span>
                </div>
                <div className="text-[#E0E0E0]">{e.DESCRIPTION}</div>
                <div className="text-xs text-[#95C5C5] mt-1">{e.VENUE} • {e.LOCATION} • {e.GAME}</div>
            </div>
        )) : (
            <div className="text-[#95C5C5]/70 italic">No events enrolled.</div>
        )}
    </div>
);

// Team Details (Tabs) with edit capability
const TeamDetails = ({ team, onBack, isEditing, setIsEditing }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [editedTeam, setEditedTeam] = useState({...team});

    useEffect(() => {
        setEditedTeam({...team});
    }, [team]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            // Save changes logic would go here
            console.log("Saving changes:", editedTeam);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTeam({
            ...editedTeam,
            [name]: value
        });
    };

    return (
        <motion.div
            className="bg-[#2F3140] rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#292B35] to-[#363945] p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={onBack} className="text-[#95C5C5] hover:text-[#EE8631] mr-4">
                        <FaArrowLeft size={24} />
                    </button>
                    <div className="w-20 h-20 flex items-center justify-center bg-[#95C5C5] rounded-full overflow-hidden">
                        {team.TEAM_LOGO ? (
                            <img src={team.TEAM_LOGO} alt="logo" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <span className="text-3xl">{team.TAG?.slice(0, 2) || "T"}</span>
                        )}
                    </div>
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                name="NAME"
                                value={editedTeam.NAME}
                                onChange={handleChange}
                                className="text-3xl font-bold bg-[#292B35] border border-[#95C5C5] rounded px-2"
                            />
                        ) : (
                            <h2 className="text-3xl font-bold">{team.NAME}</h2>
                        )}
                        <p className="text-[#95C5C5]">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="TAG"
                                    value={editedTeam.TAG}
                                    onChange={handleChange}
                                    className="bg-[#292B35] border border-[#95C5C5] rounded px-2 mr-1 w-16"
                                />
                            ) : (
                                team.TAG
                            )}
                            {" • "}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="GAME"
                                    value={editedTeam.GAME}
                                    onChange={handleChange}
                                    className="bg-[#292B35] border border-[#95C5C5] rounded px-2 ml-1"
                                />
                            ) : (
                                team.GAME
                            )}
                        </p>
                    </div>
                </div>
                <div className="space-x-2">
                    <motion.button 
                        onClick={handleEditToggle}
                        className={`px-4 py-2 ${isEditing ? 'bg-[#95C5C5] text-[#292B35]' : 'bg-[#EE8631] text-white'} rounded-md hover:opacity-90`}
                    >
                        {isEditing ? (
                            <>
                                <FaSave className="inline mr-2" /> Save
                            </>
                        ) : (
                            <>
                                <FaEdit className="inline mr-2" /> Edit
                            </>
                        )}
                    </motion.button>
                    {!isEditing && (
                        <motion.button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                            <FaTrash className="inline mr-2" /> Disband
                        </motion.button>
                    )}
                </div>
            </div>
            {/* Tabs */}
            <div className="bg-[#292B35] flex">
                {['info', 'members', 'milestones', 'events'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 font-medium capitalize ${activeTab === tab ? 'text-[#EE8631] border-b-2 border-[#EE8631]' : 'text-[#95C5C5]'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            {/* Tab Content */}
            <div className="p-6">
                {activeTab === 'info' && (
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-[#95C5C5]">Team Description</h3>
                        {isEditing ? (
                            <textarea
                                name="TEAM_DESCRIPTION"
                                value={editedTeam.TEAM_DESCRIPTION}
                                onChange={handleChange}
                                className="w-full mb-4 px-4 py-3 bg-[#292B35] border border-[#3A3D4A] rounded-lg text-[#E0E0E0]"
                                rows={4}
                            />
                        ) : (
                            <p className="mb-4 text-[#E0E0E0]">{team.TEAM_DESCRIPTION}</p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-[#292B35] p-4 rounded-lg">
                                <div className="font-semibold text-[#95C5C5]">Game</div>
                                <div className="text-[#E0E0E0]">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="GAME"
                                            value={editedTeam.GAME}
                                            onChange={handleChange}
                                            className="w-full bg-[#292B35] border border-[#3A3D4A] rounded px-2"
                                        />
                                    ) : (
                                        team.GAME
                                    )}
                                </div>
                            </div>
                            <div className="bg-[#292B35] p-4 rounded-lg">
                                <div className="font-semibold text-[#95C5C5]">Team Size</div>
                                <div className="text-[#E0E0E0]">
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="TEAM_SIZE"
                                            value={editedTeam.TEAM_SIZE}
                                            onChange={handleChange}
                                            min={1}
                                            className="w-full bg-[#292B35] border border-[#3A3D4A] rounded px-2"
                                        />
                                    ) : (
                                        team.TEAM_SIZE
                                    )}
                                </div>
                            </div>
                            <div className="bg-[#292B35] p-4 rounded-lg">
                                <div className="font-semibold text-[#95C5C5]">Tag</div>
                                <div className="text-[#E0E0E0]">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="TAG"
                                            value={editedTeam.TAG}
                                            onChange={handleChange}
                                            className="w-full bg-[#292B35] border border-[#3A3D4A] rounded px-2"
                                        />
                                    ) : (
                                        team.TAG
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'members' && (
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-[#95C5C5]">Members</h3>
                        <div className="space-y-2">
                            {team.PARTICIPANTS?.map((p, idx) => (
                                <div key={p.USER_ID} className="flex items-center bg-[#292B35] p-3 rounded-lg">
                                    <FaUsers className="text-[#95C5C5] mr-3" />
                                    <span className="text-[#E0E0E0]">{p.USER_ID}</span>
                                    <span className="ml-auto px-2 py-1 rounded bg-[#95C5C5] text-[#292B35] text-xs font-bold">{p.ACCESS}</span>
                                    {isEditing && (
                                        <button className="ml-2 text-red-400 hover:text-red-300">
                                            <FaUserMinus />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <div className="mt-4 flex">
                                    <input
                                        type="text"
                                        placeholder="Add member by ID"
                                        className="flex-1 px-3 py-2 bg-[#292B35] border border-[#3A3D4A] rounded-l text-[#E0E0E0]"
                                    />
                                    <button className="px-4 py-2 bg-[#95C5C5] text-[#292B35] rounded-r">
                                        <FaUserPlus />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {activeTab === 'milestones' && (
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-[#95C5C5]">Milestones</h3>
                        <MilestoneList milestones={team.MILESTONES} editable={isEditing} />
                        {isEditing && (
                            <div className="mt-4 bg-[#292B35] p-4 rounded-lg">
                                <h4 className="font-bold text-[#95C5C5] mb-2">Add Milestone</h4>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <input
                                        type="text"
                                        placeholder="Milestone Name"
                                        className="flex-1 px-3 py-2 bg-[#2F3140] border border-[#3A3D4A] rounded text-[#E0E0E0]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        className="flex-1 px-3 py-2 bg-[#2F3140] border border-[#3A3D4A] rounded text-[#E0E0E0]"
                                    />
                                    <input
                                        type="date"
                                        className="px-3 py-2 bg-[#2F3140] border border-[#3A3D4A] rounded text-[#E0E0E0]"
                                    />
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-[#95C5C5] text-[#292B35] rounded hover:bg-opacity-80"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'events' && (
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-[#95C5C5]">Events Enrolled</h3>
                        <EventList events={team.EVENTS_ENROLLED} />
                        {isEditing && (
                            <button className="mt-4 px-4 py-2 bg-[#EE8631] text-white rounded hover:bg-[#AD662F] flex items-center">
                                <FaTrophy className="mr-2" /> Find Events to Join
                            </button>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const ManageTeams = ({ onBackClick, onTeamSelect, selectedTeam, viewMode = "list" }) => {
    // Example: list of teams, each matching the JSON structure
    const [teams] = useState([
        {
            NAME: "Phoenix Flames",
            SHORT_NAME: "PF",
            TAG: "PF",
            TAGLINE: "Rising from the ashes",
            TEAM_SIZE: 5,
            PARTICIPANTS: [
                { ACCESS: "ADMIN", USER_ID: "u_1" },
                { ACCESS: "MEMBER", USER_ID: "u_2" }
            ],
            TEAM_LOGO: "",
            TEAM_DESCRIPTION: "Rising from the ashes to dominate the eSports scene",
            GAME: "Valorant",
            TEAM_ID: "c_1",
            MILESTONES: [
                {
                    MILESTONE_ID: "m_1",
                    MILESTONE_NAME: "First Win",
                    MILESTONE_DESCRIPTION: "Won our first tournament!",
                    MILESTONE_DATE: "2023-10-01T00:00:00Z"
                }
            ],
            EVENTS_ENROLLED: [
                {
                    EVENT_ID: "e_1",
                    EVENT_NAME: "Spring Gaming Bash",
                    DESCRIPTION: "An exciting gaming tournament.",
                    VENUE: "Neon Arena",
                    LOCATION: "Online",
                    GAME: "Valorant"
                }
            ]
        },
        {
            NAME: "Shadow Wolves",
            SHORT_NAME: "SW",
            TAG: "SW",
            TAGLINE: "Hunting in the darkness",
            TEAM_SIZE: 5,
            PARTICIPANTS: [
                { ACCESS: "ADMIN", USER_ID: "u_3" },
                { ACCESS: "MEMBER", USER_ID: "u_4" }
            ],
            TEAM_LOGO: "",
            TEAM_DESCRIPTION: "Hunting in the darkness, striking when least expected",
            GAME: "CS2",
            TEAM_ID: "c_2",
            MILESTONES: [
                {
                    MILESTONE_ID: "m_2",
                    MILESTONE_NAME: "Regional Qualifier",
                    MILESTONE_DESCRIPTION: "Qualified for regionals.",
                    MILESTONE_DATE: "2023-11-01T00:00:00Z"
                }
            ],
            EVENTS_ENROLLED: [
                {
                    EVENT_ID: "e_2",
                    EVENT_NAME: "Winter Championship",
                    DESCRIPTION: "A thrilling winter tournament.",
                    VENUE: "Frost Arena",
                    LOCATION: "Offline",
                    GAME: "CS2"
                }
            ]
        }
    ]);
    const [activeTeam, setActiveTeam] = useState(selectedTeam || null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setActiveTeam(selectedTeam);
    }, [selectedTeam]);

    const handleTeamClick = (team) => {
        setActiveTeam(team);
        if (onTeamSelect) {
            onTeamSelect(team);
        }
    };

    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-br from-[#292B35] to-[#363945] text-[#E0E0E0] p-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="flex items-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={() => {
                            if (activeTeam && viewMode !== "details") {
                                setActiveTeam(null);
                            } else {
                                onBackClick();
                            }
                        }}
                        className="mr-4 text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                    >
                        <FaArrowLeft size={24} />
                    </button>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">
                        {activeTeam && viewMode !== "details" ? activeTeam.NAME : "Manage Your Teams"}
                    </h1>
                </motion.div>
                <AnimatePresence mode="wait">
                    {!activeTeam || viewMode === "details" ? (
                        viewMode === "details" && selectedTeam ? (
                            <TeamDetails 
                                team={selectedTeam} 
                                onBack={onBackClick}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                            />
                        ) : (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                {teams.map(team => (
                                    <TeamCard key={team.TEAM_ID} team={team} onClick={handleTeamClick} />
                                ))}
                            </motion.div>
                        )
                    ) : (
                        <TeamDetails 
                            team={activeTeam} 
                            onBack={() => setActiveTeam(null)}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ManageTeams;
