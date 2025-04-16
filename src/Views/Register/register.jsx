import { motion } from 'framer-motion';
import React, { useState } from 'react';

const EventRegister = () => {
    const [teams, setTeams] = useState([
        { name: 'Team Alpha', members: 4 },
        { name: 'The OGs', members: 4 }
    ]);

    const [newTeamName, setNewTeamName] = useState('');
    const [teamSize, setTeamSize] = useState(1);
    const [members, setMembers] = useState([{ name: '', age: '', email: '' }]);
    const [message, setMessage] = useState('');

    const handleMemberChange = (index, field, value) => {
        const updated = [...members];
        updated[index][field] = value;
        setMembers(updated);
    };

    const handleCreateTeam = () => {
        if (!newTeamName.trim()) return;

        const newTeam = { name: newTeamName.trim(), members: teamSize };
        setTeams(prev => [...prev, newTeam]);
        setMessage(`Team "${newTeamName}" with ${teamSize} member(s) registered!`);
        setNewTeamName('');
        setTeamSize(1);
        setMembers([{ name: '', age: '', email: '' }]);
    };

    const updateTeamSize = (size) => {
        if (!size) return;
        const parsed = parseInt(size, 10);
        setTeamSize(parsed);
        const updatedMembers = Array.from({ length: parsed }, (_, i) => 
            members[i] || { name: '', age: '', email: '' }
        );
        setMembers(updatedMembers);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#292B35] to-[#1A1B21] py-10 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto space-y-8"
            >
                <h1 className="text-5xl font-light text-center mb-16 tracking-wider">
                    <span className="text-[#EE8631] relative inline-block">
                        EVENT REGISTRATION
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute -bottom-4 left-0 w-full h-[1px] bg-[#EE8631]/20"
                        />
                    </span>
                </h1>

                {/* Registered Teams */}
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="bg-[#292B35] backdrop-blur-lg bg-opacity-90 p-8 rounded-2xl shadow-lg border border-[#95C5C5]/20"
                >
                    <h2 className="text-2xl font-semibold text-[#95C5C5] mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Registered Teams
                    </h2>
                    {teams.length === 0 ? (
                        <p className="text-[#E0E0E0]">You haven't created any teams yet.</p>
                    ) : (
                        <ul className="list-disc ml-6 space-y-2 text-[#E0E0E0]">
                            {teams.map((team, idx) => (
                                <li key={idx}>
                                    <strong className="text-[#95C5C5]">{team.name}</strong> – {team.members} member{team.members > 1 ? 's' : ''}
                                </li>
                            ))}
                        </ul>
                    )}
                </motion.div>

                {/* Create New Team */}
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="bg-[#292B35] backdrop-blur-lg bg-opacity-90 p-8 rounded-2xl shadow-lg border border-[#95C5C5]/20 space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-[#95C5C5] mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create New Team
                    </h2>

                    <div className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter team name"
                                value={newTeamName}
                                onChange={(e) => setNewTeamName(e.target.value)}
                                className="w-full bg-[#1A1B21] border border-[#95C5C5]/30 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE8631] transition duration-200 text-[#E0E0E0] placeholder-[#E0E0E0]/50"
                            />
                        </div>

                        <div className="relative space-y-2">
                            <label className="block text-sm font-medium text-[#95C5C5]">
                                Team Size <span className="text-[#EE8631]">*</span>
                            </label>
                            <select
                                value={teamSize}
                                onChange={(e) => updateTeamSize(e.target.value)}
                                className="w-full bg-[#1A1B21] border border-[#95C5C5]/30 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE8631] transition duration-200 text-[#E0E0E0]"
                                required
                            >
                                <option value="" disabled>Select team size</option>
                                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                    <option key={num} value={num} className="bg-[#1A1B21]">
                                        {num} {num === 1 ? 'member' : 'members'}
                                    </option>
                                ))}
                            </select>
                            <p className="text-sm text-[#E0E0E0]/70">Please select the number of team members (1-10)</p>
                        </div>

                        {/* Members Form */}
                        <div className="space-y-4">
                            {members.map((member, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#1A1B21] p-6 rounded-lg border border-[#95C5C5]/20"
                                >
                                    <input
                                        type="text"
                                        placeholder={`Member ${idx + 1} Name`}
                                        value={member.name}
                                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                                        className="bg-[#292B35] border border-[#95C5C5]/30 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE8631] transition duration-200 text-[#E0E0E0] placeholder-[#E0E0E0]/50"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        value={member.age}
                                        onChange={(e) => handleMemberChange(idx, 'age', e.target.value)}
                                        className="bg-[#292B35] border border-[#95C5C5]/30 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE8631] transition duration-200 text-[#E0E0E0] placeholder-[#E0E0E0]/50"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={member.email}
                                        onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                                        className="bg-[#292B35] border border-[#95C5C5]/30 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE8631] transition duration-200 text-[#E0E0E0] placeholder-[#E0E0E0]/50"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCreateTeam}
                            className="w-full bg-gradient-to-r from-[#EE8631] to-[#AD662F] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-200"
                        >
                            Create Team & Register
                        </motion.button>

                        {message && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[#95C5C5] font-medium text-center p-4 bg-[#95C5C5]/10 rounded-lg border border-[#95C5C5]/20"
                            >
                                {message}
                            </motion.p>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default EventRegister;
