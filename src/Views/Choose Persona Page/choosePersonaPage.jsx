import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChoosePersona() {
    const [selectedPersona, setSelectedPersona] = useState(null);
    const navigate = useNavigate();

    const handleSelection = (persona) => {
        setSelectedPersona(persona);
    };

    const handleContinue = () => {
        // Navigate to the next page based on selection
        // This will be updated with the correct route later
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" 
             style={{ backgroundColor: '#292B35' }}>
            <div className="max-w-4xl w-full text-center mb-12">
                <h1 className="text-4xl font-bold mb-3" style={{ color: '#E0E0E0' }}>
                    Welcome to the ESports Ecosystem
                </h1>
                <p className="text-xl" style={{ color: '#95C5C5' }}>
                    Choose your path in the world of competitive gaming
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Player Card */}
                <div 
                    className={`rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedPersona === 'player' ? 'ring-4' : ''
                    }`}
                    style={{ 
                        backgroundColor: selectedPersona === 'player' ? '#3A3D4A' : '#2F3140',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        color: '#E0E0E0',
                        borderColor: selectedPersona === 'player' ? '#EE8631' : 'transparent'
                    }}
                    onClick={() => handleSelection('player')}
                >
                    <div className="flex flex-col items-center text-center h-full">
                        <div className="h-32 w-32 rounded-full flex items-center justify-center mb-6" 
                             style={{ backgroundColor: '#95C5C5' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="#292B35">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Player</h2>
                        <p className="text-gray-300 mb-4">
                            Join tournaments, connect with teams, and take your gaming career to the next level. Get coached by professionals and showcase your skills.
                        </p>
                        {selectedPersona === 'player' && (
                            <div className="mt-auto">
                                <span className="inline-block px-3 py-1 rounded" style={{ backgroundColor: '#95C5C5', color: '#292B35' }}>
                                    Selected
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mentor Card */}
                <div 
                    className={`rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedPersona === 'mentor' ? 'ring-4' : ''
                    }`}
                    style={{ 
                        backgroundColor: selectedPersona === 'mentor' ? '#3A3D4A' : '#2F3140',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        color: '#E0E0E0',
                        borderColor: selectedPersona === 'mentor' ? '#EE8631' : 'transparent'
                    }}
                    onClick={() => handleSelection('mentor')}
                >
                    <div className="flex flex-col items-center text-center h-full">
                        <div className="h-32 w-32 rounded-full flex items-center justify-center mb-6" 
                             style={{ backgroundColor: '#95C5C5' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="#292B35">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Mentor</h2>
                        <p className="text-gray-300 mb-4">
                            Share your expertise, coach upcoming players, and build your reputation in the ESports community. Create courses and offer personalized training.
                        </p>
                        {selectedPersona === 'mentor' && (
                            <div className="mt-auto">
                                <span className="inline-block px-3 py-1 rounded" style={{ backgroundColor: '#95C5C5', color: '#292B35' }}>
                                    Selected
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selectedPersona && (
                <div className="mt-12 transition-all duration-500 animate-fade-in">
                    <button 
                        onClick={handleContinue}
                        className="px-8 py-3 text-lg font-semibold rounded-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                        style={{ 
                            backgroundColor: '#EE8631',
                            color: '#FFFFFF'
                        }}
                    >
                        Continue as {selectedPersona === 'player' ? 'Player' : 'Mentor'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChoosePersona;