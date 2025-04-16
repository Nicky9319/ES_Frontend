import React, { useState } from 'react';

const EventRegister = () => {
    const [teams, setTeams] = useState([
        { name: 'Team Alpha', members: 5 },
        { name: 'The OGs', members: 4 }
    ]);

    const [newTeamName, setNewTeamName] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateTeam = () => {
        if (!newTeamName.trim()) return;

        const newTeam = { name: newTeamName.trim(), members: 1 };
        setTeams(prev => [...prev, newTeam]);
        setMessage(`Team "${newTeamName}" created and registered!`);
        setNewTeamName('');
    };

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-center mb-4">Register for the Event</h1>

            {/* Existing Teams */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Your Existing Teams</h2>
                {teams.length === 0 ? (
                    <p className="text-gray-600">You haven't created any teams yet.</p>
                ) : (
                    <ul className="list-disc ml-6 space-y-1">
                        {teams.map((team, idx) => (
                            <li key={idx}>
                                <strong>{team.name}</strong> – {team.members} member{team.members > 1 ? 's' : ''}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Create a New Team */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Create and Register a New Team</h2>
                <input
                    type="text"
                    placeholder="Enter new team name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full mb-3"
                />
                <button
                    onClick={handleCreateTeam}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                >
                    Create Team & Register
                </button>
                {message && <p className="text-green-600 mt-2">{message}</p>}
            </div>
        </div>
    );
};

export default EventRegister;
