import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaClock, FaDiscord, FaDollarSign, FaMedal } from 'react-icons/fa';

const MentorCard = ({ mentor, onClick, viewMode = 'grid' }) => {
    const isListMode = viewMode === 'list';

    return (
        <motion.div 
            onClick={() => onClick && onClick(mentor)}
            className={`bg-[#2F3140] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#3A3D4A] cursor-pointer`}
            whileHover={{ scale: 1.02, y: -4, borderColor: '#EE8631' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className={`relative ${isListMode ? 'flex items-center' : ''}`}>
                {/* Header with game badge */}
                {!isListMode && (
                    <div className="relative h-28 bg-gradient-to-r from-[#292B35] to-[#3D3F4D] overflow-hidden">
                        {/* Optional: Add banner image here if available */}
                        {/* <img src={mentor.PROFILE_BANNER || 'default_banner.jpg'} alt="Banner" className="w-full h-full object-cover opacity-50" /> */}
                        
                        {mentor.GAMES && mentor.GAMES.length > 0 && (
                            <div className="absolute top-2 right-2 bg-[#292B35]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#E0E0E0] border border-[#3A3D4A]">
                                {mentor.GAMES[0]}
                                {mentor.GAMES.length > 1 && <span className="ml-1">+{mentor.GAMES.length - 1}</span>}
                            </div>
                        )}
                        
                        {mentor.EXPERIENCE_YEARS >= 5 && (
                            <div className="absolute bottom-2 left-2 bg-[#EE8631]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white flex items-center">
                                <FaMedal className="mr-1" /> Expert
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
                                    src={mentor.PROFILE_PIC || "https://via.placeholder.com/150"}
                                    alt={mentor.BIO ? mentor.BIO.split(' ').slice(0, 2).join(' ') : "Mentor"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <div className="absolute -bottom-1 -right-1 bg-[#EE8631] text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold z-20 shadow-md">
                                {mentor.RATING || "4.5"}
                            </div>
                            
                            {mentor.VERIFIED && (
                                <div className="absolute -top-1 -right-1 bg-[#95C5C5] text-[#292B35] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold z-20 shadow-lg">
                                    ✓
                                </div>
                            )}
                        </div>
                        
                        {/* Info section */}
                        <div className={`${isListMode ? 'flex-1' : 'text-center'} w-full`}>
                            <div className={`${isListMode ? 'flex items-center justify-between' : ''}`}>
                                <h3 className="text-lg font-bold text-[#E0E0E0] line-clamp-1">
                                    {mentor.USER_NAME || mentor.NAME || "Mentor"}
                                </h3>
                                
                                {!isListMode && (
                                    <div className="flex items-center justify-center mt-1 mb-2">
                                        {/* Game badge for grid view */}
                                        {mentor.GAMES && mentor.GAMES.length > 0 && !isListMode && (
                                            <span className="bg-[#292B35] text-[#95C5C5] px-2 py-0.5 rounded-md text-xs mr-2">
                                                {mentor.GAMES[0]}
                                                {mentor.GAMES.length > 1 && <span className="ml-1">+{mentor.GAMES.length - 1}</span>}
                                            </span>
                                        )}
                                        <div className="flex items-center text-sm text-[#95C5C5]">
                                            <FaStar className="text-[#EE8631] mr-1" />
                                            <span>{mentor.RATING}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <p className="text-xs text-[#95C5C5] font-medium mb-2 line-clamp-1">
                                {mentor.TAGLINE || "Professional esports coach"}
                            </p>
                            
                            <div className={`flex ${isListMode ? 'justify-between' : 'justify-center'} items-center text-[11px] text-[#E0E0E0]/70 mb-3 flex-wrap gap-x-3 gap-y-1`}>
                                <div className="flex items-center">
                                    <FaClock className="text-[#95C5C5] mr-1" /> 
                                    <span>{mentor.EXPERIENCE_YEARS} years exp</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <FaDollarSign className="text-[#EE8631] mr-1" /> 
                                    <span>${mentor.PRICE_PER_SESSION}/hr</span>
                                </div>
                            </div>
                            
                            <div className="flex space-x-2 mt-4">
                                <button className="flex-grow bg-gradient-to-r from-[#AD662F] to-[#EE8631] text-white py-2 px-3 rounded-md text-sm font-medium hover:from-[#EE8631] hover:to-[#EE8631] transition-all shadow-md">
                                    Book Session
                                </button>
                                
                                {mentor.SOCIAL_LINKS?.DISCORD && (
                                    <button className="bg-[#414455] hover:bg-[#5865F2] text-white py-2 px-3 rounded-md text-sm transition-colors shadow-md flex items-center justify-center">
                                        <FaDiscord />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MentorCard;
