import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function ChoosePersona() {
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Animate content in after component mounts
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const handleSelection = (persona) => {
        setSelectedPersona(persona);
    };

    const handleContinue = () => {
        // Animate out before navigating
        setShowContent(false);
        setTimeout(() => {
            navigate('/dashboard');
        }, 500);
    };

    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden" 
            style={{ 
                backgroundColor: '#292B35',
                backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(50, 52, 65, 0.6) 0%, rgba(41, 43, 53, 0.6) 100%)'
            }}
        >
            <motion.div 
                className="max-w-4xl w-full text-center mb-12 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <motion.h1 
                    className="text-5xl font-bold mb-3" 
                    style={{ color: '#E0E0E0' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -10 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Welcome to the ESports Ecosystem
                </motion.h1>
                <motion.p 
                    className="text-xl"
                    style={{ color: '#95C5C5' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showContent ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Choose your path in the world of competitive gaming
                </motion.p>
            </motion.div>

            <motion.div 
                className="grid md:grid-cols-2 gap-8 w-full max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
                {/* Player Card */}
                <motion.div 
                    className={`rounded-lg p-6 cursor-pointer shadow-lg relative overflow-hidden ${
                        selectedPersona === 'player' ? 'ring-4' : ''
                    }`}
                    style={{ 
                        backgroundColor: selectedPersona === 'player' ? '#3A3D4A' : '#2F3140',
                        boxShadow: selectedPersona === 'player' 
                            ? '0 10px 30px rgba(149, 197, 197, 0.2)' 
                            : '0 4px 20px rgba(0, 0, 0, 0.2)',
                        color: '#E0E0E0',
                        borderColor: selectedPersona === 'player' ? '#EE8631' : 'transparent'
                    }}
                    onClick={() => handleSelection('player')}
                    whileHover={{ 
                        scale: 1.03, 
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    layout
                >
                    {/* Background gradient effect */}
                    {selectedPersona === 'player' && (
                        <motion.div 
                            className="absolute inset-0 opacity-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            style={{
                                background: 'radial-gradient(circle at center, #EE8631 0%, transparent 70%)'
                            }}
                        />
                    )}
                    
                    <div className="flex flex-col items-center text-center h-full relative z-10">
                        <motion.div 
                            className="h-32 w-32 rounded-full flex items-center justify-center mb-6 relative"
                            whileHover={{ scale: 1.05 }}
                            style={{ backgroundColor: '#95C5C5' }}
                        >
                            {selectedPersona === 'player' && (
                                <motion.div 
                                    className="absolute inset-0 rounded-full"
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ 
                                        scale: [1.5, 1.2], 
                                        opacity: [0, 0.3, 0] 
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                    style={{ 
                                        background: '#95C5C5',
                                        zIndex: -1
                                    }}
                                />
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="#292B35">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                        </motion.div>
                        <motion.h2 
                            className="text-2xl font-bold mb-3"
                            animate={{ scale: selectedPersona === 'player' ? 1.05 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            Player
                        </motion.h2>
                        <motion.p 
                            className="text-gray-300 mb-4"
                            initial={{ opacity: 0.9 }}
                            animate={{ opacity: selectedPersona === 'player' ? 1 : 0.9 }}
                        >
                            Join tournaments, connect with teams, and take your gaming career to the next level. Get coached by professionals and showcase your skills.
                        </motion.p>
                        <AnimatePresence>
                            {selectedPersona === 'player' && (
                                <motion.div 
                                    className="mt-auto"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="inline-block px-3 py-1 rounded-full font-medium" style={{ backgroundColor: '#95C5C5', color: '#292B35' }}>
                                        Selected
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Mentor Card */}
                <motion.div 
                    className={`rounded-lg p-6 cursor-pointer shadow-lg relative overflow-hidden ${
                        selectedPersona === 'mentor' ? 'ring-4' : ''
                    }`}
                    style={{ 
                        backgroundColor: selectedPersona === 'mentor' ? '#3A3D4A' : '#2F3140',
                        boxShadow: selectedPersona === 'mentor' 
                            ? '0 10px 30px rgba(149, 197, 197, 0.2)' 
                            : '0 4px 20px rgba(0, 0, 0, 0.2)',
                        color: '#E0E0E0', 
                        borderColor: selectedPersona === 'mentor' ? '#EE8631' : 'transparent'
                    }}
                    onClick={() => handleSelection('mentor')}
                    whileHover={{ 
                        scale: 1.03, 
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    layout
                >
                    {/* Background gradient effect */}
                    {selectedPersona === 'mentor' && (
                        <motion.div 
                            className="absolute inset-0 opacity-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            style={{
                                background: 'radial-gradient(circle at center, #EE8631 0%, transparent 70%)'
                            }}
                        />
                    )}
                    
                    <div className="flex flex-col items-center text-center h-full relative z-10">
                        <motion.div 
                            className="h-32 w-32 rounded-full flex items-center justify-center mb-6 relative"
                            whileHover={{ scale: 1.05 }}
                            style={{ backgroundColor: '#95C5C5' }}
                        >
                            {selectedPersona === 'mentor' && (
                                <motion.div 
                                    className="absolute inset-0 rounded-full"
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ 
                                        scale: [1.5, 1.2], 
                                        opacity: [0, 0.3, 0] 
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                    style={{ 
                                        background: '#95C5C5',
                                        zIndex: -1
                                    }}
                                />
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="#292B35">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 a1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                        </motion.div>
                        <motion.h2 
                            className="text-2xl font-bold mb-3"
                            animate={{ scale: selectedPersona === 'mentor' ? 1.05 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            Mentor
                        </motion.h2>
                        <motion.p 
                            className="text-gray-300 mb-4"
                            initial={{ opacity: 0.9 }}
                            animate={{ opacity: selectedPersona === 'mentor' ? 1 : 0.9 }}
                        >
                            Share your expertise, coach upcoming players, and build your reputation in the ESports community. Create courses and offer personalized training.
                        </motion.p>
                        <AnimatePresence>
                            {selectedPersona === 'mentor' && (
                                <motion.div 
                                    className="mt-auto"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="inline-block px-3 py-1 rounded-full font-medium" style={{ backgroundColor: '#95C5C5', color: '#292B35' }}>
                                        Selected
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {selectedPersona && (
                    <motion.div 
                        className="mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.button 
                            onClick={handleContinue}
                            className="px-8 py-3 text-lg font-semibold rounded-md shadow-lg"
                            style={{ 
                                backgroundColor: '#EE8631',
                                color: '#FFFFFF',
                                boxShadow: '0 4px 10px rgba(238, 134, 49, 0.3)'
                            }}
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: '0 7px 15px rgba(238, 134, 49, 0.4)'
                            }}
                            whileTap={{ scale: 0.95 }}
                            animate={{ 
                                y: [0, -5, 0],
                                transition: { 
                                    y: { 
                                        repeat: Infinity, 
                                        duration: 3,
                                        ease: "easeInOut",
                                        repeatType: "reverse"
                                    }
                                }
                            }}
                        >
                            Continue as {selectedPersona === 'player' ? 'Player' : 'Mentor'}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ChoosePersona;