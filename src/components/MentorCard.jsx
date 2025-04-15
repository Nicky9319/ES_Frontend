import React from 'react';
import { FaStar, FaClock, FaDiscord } from 'react-icons/fa';

const MentorCard = ({ mentor, onClick }) => {
    return (
        <div 
            onClick={() => onClick && onClick(mentor)} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-[#95C5C5] transform hover:-translate-y-1 cursor-pointer"
        >
            <div className="p-5 flex items-start space-x-4">
                <div className="relative">
                    <img
                        src={mentor.PROFILE_PIC || "https://via.placeholder.com/150"}
                        alt={mentor.BIO ? mentor.BIO.split(' ').slice(0, 2).join(' ') : "Mentor"}
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#E0E0E0]"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#EE8631] text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {mentor.RATING || "4.5"}
                    </div>
                    {mentor.VERIFIED && (
                        <div className="absolute -top-1 -right-1 bg-[#292B35] text-white rounded-full w-5 h-5 flex items-center justify-center">
                            ✓
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-[#292B35]">{mentor.USER_NAME || mentor.NAME || "Mentor"}</h3>
                        <span className="text-[#EE8631] text-sm font-semibold">${mentor.PRICE_PER_SESSION}/hr</span>
                    </div>
                    <p className="text-sm font-medium text-[#95C5C5] mb-1">
                        {mentor.GAMES && mentor.GAMES.length > 0 ? `${mentor.GAMES[0]} Coach` : "Coach"}
                        {mentor.GAMES && mentor.GAMES.length > 1 ? ` +${mentor.GAMES.length - 1}` : ""}
                    </p>
                    <div className="flex items-center text-xs text-[#292B35] opacity-70 mb-2 flex-wrap">
                        <span className="mr-2 flex items-center"><FaStar className="text-[#EE8631] mr-1" /> {mentor.RATING || "4.5"}</span>
                        <span className="flex items-center"><FaClock className="text-[#292B35] mr-1" /> {mentor.EXPERIENCE_YEARS} years</span>
                        {mentor.SESSIONS_COMPLETED && (
                            <span className="ml-2">{mentor.SESSIONS_COMPLETED}+ sessions</span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {mentor.TAGLINE || mentor.BIO || "Professional esports coach specializing in strategy and skill development."}
                    </p>
                    <div className="flex space-x-2">
                        <button className="flex-grow bg-gradient-to-r from-[#AD662F] to-[#EE8631] text-white py-2 px-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                            Book Session
                        </button>
                        {mentor.SOCIAL_LINKS?.DISCORD && (
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

export default MentorCard;
