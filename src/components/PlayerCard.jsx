import React from 'react';
import { FaStar, FaGamepad, FaDiscord } from 'react-icons/fa';

const PlayerCard = ({ player, onClick }) => {
    // Get the primary game info if available
    const primaryGame = player.GAMES_PLAYED && player.GAMES_PLAYED.length > 0 ? player.GAMES_PLAYED[0] : "Gamer";
    const playerRole = player.GAME_RELATED_INFO?.role || 
                       (player.HISTORY && player.HISTORY[0]?.ROLES_PLAYED?.length > 0 ? player.HISTORY[0].ROLES_PLAYED[0] : "Player");
    const playerRank = player.GAME_RELATED_INFO?.rank || "Unranked";

    return (
        <div 
            onClick={() => onClick && onClick(player)}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-[#EE8631] transform hover:-translate-y-1 cursor-pointer"
        >
            <div className="p-5 flex items-start space-x-4">
                <div className="relative">
                    <img
                        src={player.PROFILE_PIC || "https://via.placeholder.com/150"}
                        alt={player.BIO ? player.BIO.split(' ').slice(0, 2).join(' ') : "Player"}
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#E0E0E0]"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#95C5C5] text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                        {player.RATING || "4.5"}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#292B35]">{player.USER_NAME || player.NAME || "Player"}</h3>
                    <div className="flex items-center gap-1">
                        <FaGamepad className="text-[#EE8631]" />
                        <p className="text-sm font-medium text-[#EE8631] mb-1">{primaryGame} {playerRole}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                        {playerRank && (
                            <span className="px-2 py-1 bg-[#E0E0E0] text-[#292B35] rounded-full text-xs font-medium">
                                {playerRank}
                            </span>
                        )}
                        {player.LOCATION && (
                            <span className="px-2 py-1 bg-[#E0E0E0] text-[#292B35] rounded-full text-xs font-medium">
                                {player.LOCATION?.split(',')[0] || "Global"}
                            </span>
                        )}
                        {player.TEAM_STATUS && (
                            <span className="px-2 py-1 bg-[#E0E0E0] text-[#292B35] rounded-full text-xs font-medium">
                                {player.TEAM_STATUS}
                            </span>
                        )}
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {player.TAGLINE || player.BIO || "Competitive player looking to team up and climb the ranks."}
                    </p>
                    
                    <div className="flex space-x-2">
                        <button className="flex-grow bg-gradient-to-r from-[#95C5C5] to-[#6BA4A4] text-white py-2 px-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                            Team Up
                        </button>
                        {player.SOCIAL_LINKS?.DISCORD && (
                            <button className="bg-[#292B35] text-white py-2 px-3 rounded-md text-sm hover:bg-opacity-90 transition-opacity shadow-md">
                                <FaDiscord />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
