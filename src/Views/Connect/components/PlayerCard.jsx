import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaGamepad, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const PlayerCard = ({ player, onClick, viewMode = 'grid' }) => {
    const isListMode = viewMode === 'list';
    const primaryGame = player.GAMES_PLAYED && player.GAMES_PLAYED.length > 0 ? player.GAMES_PLAYED[0] : "Gamer";
    const playerRole = player.GAME_RELATED_INFO?.role || 
        (player.HISTORY && player.HISTORY[0]?.ROLES_PLAYED?.length > 0 ? player.HISTORY[0].ROLES_PLAYED[0] : "Player");
    const playerRank = player.GAME_RELATED_INFO?.rank || "Unranked";

    return (
        <motion.div
            onClick={() => onClick && onClick(player)}
            className="bg-[#2F3140] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#3A3D4A] cursor-pointer"
            whileHover={{ scale: 1.02, y: -4, borderColor: '#95C5C5' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className={`relative ${isListMode ? 'flex items-center' : ''}`}>
                {/* Header with game banner */}
                {!isListMode && (
                    <div className="relative h-28 bg-gradient-to-r from-[#292B35] to-[#3D3F4D] overflow-hidden">
                        {/* Optional banner image */}
                        {primaryGame && (
                            <div className="absolute top-2 right-2 bg-[#292B35]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#E0E0E0] border border-[#3A3D4A]">
                                {primaryGame}
                            </div>
                        )}
                        {playerRank && playerRank !== "Unranked" && (
                            <div className="absolute bottom-2 left-2 bg-[#95C5C5]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#292B35]">
                                {playerRank}
                            </div>
                        )}
                    </div>
                )}
                {/* Content */}
                <div className={`p-5 relative ${isListMode ? 'flex-1' : ''}`}>
                    <div className={`${isListMode ? 'flex items-center' : 'flex flex-col items-center'}`}>
                        {/* Profile Image */}
                        <div className={`${isListMode ? 'mr-5' : '-mt-14 mb-3'} relative`}>
                            <div className={`${isListMode ? 'w-16 h-16' : 'w-24 h-24'} rounded-full overflow-hidden border-4 border-[#292B35] relative z-10 bg-[#3A3D4A]`}>
                                <img
                                    src={player.PROFILE_PIC || "https://via.placeholder.com/150"}
                                    alt={player.BIO ? player.BIO.split(' ').slice(0, 2).join(' ') : "Player"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        {/* Info Section */}
                        <div className={`${isListMode ? 'flex-1' : 'text-center'} w-full`}>
                            <div className={`${isListMode ? 'flex items-center justify-between' : ''}`}>
                                <h3 className="text-lg font-bold text-[#E0E0E0] line-clamp-1">
                                    {player.USER_NAME || player.NAME || "Player"}
                                </h3>
                            </div>
                            <p className="text-xs text-[#95C5C5] font-medium mb-2 line-clamp-1">
                                {player.TAGLINE || "Competitive player looking to team up"}
                            </p>
                            <div className={`flex ${isListMode ? 'justify-start' : 'justify-center'} items-center text-[11px] text-[#E0E0E0]/70 mb-3 flex-wrap gap-x-3 gap-y-1`}>
                                <div className="flex items-center">
                                    <FaGamepad className="text-[#EE8631] mr-1" />
                                    <span>{primaryGame} - {playerRole}</span>
                                </div>
                                {player.LOCATION && (
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="text-[#95C5C5] mr-1" />
                                        <span>{player.LOCATION.split(',')[0] || "Global"}</span>
                                    </div>
                                )}
                                {player.TEAM_STATUS && (
                                    <div className="flex items-center">
                                        <FaUsers className="text-[#95C5C5] mr-1" />
                                        <span>{player.TEAM_STATUS}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                {player.TAGLINE || player.BIO || "Competitive player looking to team up and climb the ranks."}
                            </p>
                            <div className="flex space-x-2 mt-4">
                                <button className="flex-grow bg-gradient-to-r from-[#95C5C5] to-[#6BA4A4] text-white py-2 px-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                                    Team Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PlayerCard;
