import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import mentorProfileData from './mentorprofile.json'; // Using static data for now

const ViewMentorProfilePage = () => {
    const { mentorId } = useParams(); // Get mentorId from URL
    const [mentor, setMentor] = useState(null);
    const [bannerError, setBannerError] = useState(false);
    const [profileError, setProfileError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate fetching data based on mentorId
    useEffect(() => {
        const fetchMentorData = async () => {
            console.log("Fetching profile for mentor ID:", mentorId);
            try {
                setIsLoading(true);
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 500));

                // In a real app, you would fetch data using mentorId.
                // For now, we'll use the static JSON if the ID matches (or just use it directly for demo).
                // This check is basic; a real API would handle ID matching.
                if (mentorProfileData.MENTOR_ID === mentorId || !mentorId) { // Allow viewing the default profile if no ID or matches
                    const baseData = {
                        ...mentorProfileData,
                        PROFILE_BANNER: bannerError ?
                            "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" :
                            mentorProfileData.PROFILE_BANNER,
                        PROFILE_PIC: profileError ?
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" :
                            mentorProfileData.PROFILE_PIC
                    };

                    const createdAt = new Date(baseData.CREATED_AT.$date);
                    const transformedData = {
                        ...baseData,
                        FORMATTED_DATE: createdAt.toLocaleDateString(),
                        PRICE_FORMATTED: `$${baseData.PRICE_PER_SESSION}/hr`
                    };
                    setMentor(transformedData);
                } else {
                    // Handle case where mentor ID doesn't match the static data
                    console.error(`Mentor with ID ${mentorId} not found.`);
                    setMentor(null); // Or set an error state
                }

            } catch (error) {
                console.error('Error loading mentor profile:', error);
                setMentor(null); // Set mentor to null on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchMentorData();
    }, [mentorId, bannerError, profileError]); // Re-fetch if ID changes or image errors occur

    if (isLoading) {
        return (
            <div className="bg-[#292B35] min-h-screen flex items-center justify-center text-[#E0E0E0]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-[#EE8631] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#95C5C5]">Loading mentor profile...</p>
                </div>
            </div>
        );
    }

    if (!mentor) {
        return (
            <div className="bg-[#292B35] min-h-screen flex items-center justify-center text-[#E0E0E0]">
                <p className="text-[#95C5C5]">Mentor profile not found or error loading.</p>
            </div>
        );
    }

    // Destructure data for the view
    const {
        GAMES,
        PROFILE_BANNER,
        PROFILE_PIC,
        LOCATION,
        EXPERIENCE_YEARS,
        PRICE_FORMATTED, // Use the pre-formatted price
        SOCIAL_LINKS,
        BIO,
        MENTOR_ID,
        RATING,
        SESSIONS_COMPLETED,
        SUCCESS_RATE,
        SPECIALITIES,
        TAGLINE,
        VERIFIED,
        FORMATTED_DATE,
        LANGUAGES,
        USER_NAME
    } = mentor;

    const statsData = [
        { label: 'Sessions', value: SESSIONS_COMPLETED, icon: '🎮' },
        { label: 'Experience', value: `${EXPERIENCE_YEARS}+ Years`, icon: '⚡' },
        { label: 'Success Rate', value: `${SUCCESS_RATE}%`, icon: '📈' },
        { label: 'Rate', value: PRICE_FORMATTED, icon: '💎' }
    ];

    return (
        <div className="bg-[#292B35] min-h-screen text-[#E0E0E0] font-sans">
            {/* Banner Section */}
            <div className="relative h-96">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-[#1a1b21]"
                    style={{
                        backgroundImage: `url(${PROFILE_BANNER})`, // Use mentor data
                        backgroundPosition: 'center 30%'
                    }}
                    onError={() => setBannerError(true)} // Handle image load error
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#292B35]/30 via-[#292B35]/50 to-[#292B35] opacity-90"></div>
                </div>

                {/* Profile Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
                    <div className="max-w-5xl mx-auto flex items-end gap-6">
                        <div className="relative">
                            <img
                                src={PROFILE_PIC} // Use mentor data
                                alt="Profile"
                                className="w-40 h-40 rounded-xl border-4 border-[#EE8631] shadow-lg object-cover"
                                onError={() => setProfileError(true)} // Handle image load error
                            />
                            <div className="absolute -bottom-2 -right-2 bg-[#95C5C5] text-[#292B35] px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                ⭐ {RATING}
                            </div>
                        </div>

                        <div className="flex-1 mb-4">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-4xl font-bold text-[#E0E0E0] drop-shadow-lg">
                                    {USER_NAME}
                                </h1>
                                <span className={`px-4 py-1 rounded-full text-sm font-semibold shadow-lg ${VERIFIED ? 'bg-[#EE8631] text-white' : 'bg-red-500 text-white'
                                    }`}>
                                    {VERIFIED ? 'VERIFIED' : 'UNVERIFIED'}
                                </span>
                            </div>
                            <p className="text-[#95C5C5] text-xl font-medium mb-2">
                                {TAGLINE}
                            </p>
                            <div className="flex items-center text-[#E0E0E0]/80 text-sm mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {LOCATION}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-5xl mx-auto px-6 mt-24 relative z-10 pb-12">
                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8">
                    {statsData.map(stat => (
                        <div key={stat.label} className="bg-[#292B35] p-4 rounded-xl border border-[#95C5C5]/20 hover:border-[#EE8631]/50 transition-colors">
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <div className="text-[#95C5C5] text-sm">{stat.label}</div>
                            <div className="text-[#E0E0E0] font-bold">{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {/* About Section */}
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                                <span>📋</span> About
                            </h2>
                            <p className="text-[#E0E0E0]/90 leading-relaxed">{BIO}</p>
                        </div>

                        {/* Games & Expertise Section */}
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                                <span>🎮</span> Games & Expertise
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-[#95C5C5] mb-2">Games</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {GAMES.map(game => (
                                            <span key={game} className="bg-[#EE8631]/10 text-[#EE8631] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#EE8631]/20 transition-colors cursor-default">
                                                {game}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[#95C5C5] mb-2">Specialties</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {SPECIALITIES.map(specialty => (
                                            <span key={specialty} className="bg-[#95C5C5]/10 text-[#95C5C5] px-4 py-2 rounded-lg text-sm font-medium cursor-default">
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[#95C5C5] mb-2">Languages</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {LANGUAGES.map(language => (
                                            <span key={language} className="bg-[#95C5C5]/10 text-[#95C5C5] px-4 py-2 rounded-lg text-sm font-medium cursor-default">
                                                {language}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Booking/Messaging Card */}
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20 sticky top-4">
                            <div className="text-center mb-6">
                                <div className="text-2xl font-bold text-[#EE8631]">{PRICE_FORMATTED}</div>
                                <div className="text-[#95C5C5] text-sm">per session</div>
                            </div>

                            <button className="w-full bg-gradient-to-r from-[#EE8631] to-[#AD662F] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 mb-4">
                                Book a Session
                            </button>

                            <button className="w-full bg-[#292B35] text-[#95C5C5] py-3 rounded-lg font-semibold border border-[#95C5C5] hover:bg-[#95C5C5]/10 transition-colors">
                                Message
                            </button>
                        </div>

                        {/* Connect Section */}
                        <div className="bg-[#292B35] rounded-xl p-6 border border-[#95C5C5]/20">
                            <h2 className="text-xl font-semibold text-[#EE8631] mb-4 flex items-center gap-2">
                                <span>🌐</span> Connect
                            </h2>
                            <div className="grid grid-cols-1 gap-3"> {/* Changed to grid-cols-1 */}
                                {Object.entries(SOCIAL_LINKS).map(([platform, link]) => (
                                    <a
                                        key={platform}
                                        href={link.startsWith('http') ? link : `https://${link}`} // Basic link handling
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-[#E0E0E0] hover:text-[#EE8631] transition-colors"
                                    >
                                        <span className="text-[#95C5C5] w-6 text-center">
                                            {platform === 'DISCORD' ? '💬' :
                                                platform === 'TWITTER' ? '🐦' :
                                                    platform === 'YOUTUBE' ? '📺' :
                                                        platform === 'INSTAGRAM' ? '📸' :
                                                            platform === 'LINKEDIN' ? '💼' :
                                                                platform === 'WEBSITE' ? '🔗' : '🔗'}
                                        </span>
                                        <span className="truncate text-sm">{link || platform.toLowerCase()}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewMentorProfilePage;
