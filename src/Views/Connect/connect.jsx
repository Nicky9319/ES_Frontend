import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';

// Mentor Card Component updated to match MongoDB schema
const MentorCard = ({ mentor }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-[#95C5C5] transform hover:-translate-y-1">
            <div className="p-5 flex items-start space-x-4">
                <div className="relative">
                    <img
                        src={mentor.PROFILE_PIC || "https://via.placeholder.com/150"}
                        alt={mentor.BIO.split(' ').slice(0, 2).join(' ')}
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#E0E0E0]"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#EE8631] text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                        {mentor.RATING || "4.5"}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#292B35]">{mentor.NAME || "Mentor"}</h3>
                    <p className="text-sm font-medium text-[#95C5C5] mb-1">
                        {mentor.GAMES && mentor.GAMES.length > 0 ? `${mentor.GAMES[0]} Coach` : "Coach"}
                    </p>
                    <div className="flex items-center text-xs text-[#292B35] opacity-70 mb-2">
                        <span className="mr-2">⭐ {mentor.RATING || "4.5"}</span>
                        <span>🕒 {mentor.EXPERIENCE_YEARS} years</span>
                        <span className="ml-auto font-semibold text-[#EE8631]">${mentor.PRICE_PER_SESSION}/hr</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {mentor.BIO || "Professional esports coach specializing in strategy and skill development."}
                    </p>
                    <button className="w-full bg-gradient-to-r from-[#AD662F] to-[#EE8631] text-white py-2 px-4 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                        Book Session
                    </button>
                </div>
            </div>
        </div>
    );
};

// Player Card Component updated to match MongoDB schema
const PlayerCard = ({ player }) => {
    // Get the primary game info if available
    const primaryGame = player.GAMES_PLAYED && player.GAMES_PLAYED.length > 0 ? player.GAMES_PLAYED[0] : "Gamer";
    const playerRole = player.GAME_RELATED_INFO?.role || "Player";
    const playerRank = player.GAME_RELATED_INFO?.rank || "Unranked";

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-[#EE8631] transform hover:-translate-y-1">
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
                    <h3 className="text-xl font-bold text-[#292B35]">{player.NAME || "Player"}</h3>
                    <p className="text-sm font-medium text-[#EE8631] mb-1">{primaryGame} {playerRole}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2 py-1 bg-[#E0E0E0] text-[#292B35] rounded-full text-xs font-medium">
                            {playerRank}
                        </span>
                        <span className="px-2 py-1 bg-[#E0E0E0] text-[#292B35] rounded-full text-xs font-medium">
                            {player.LOCATION?.split(',')[0] || "Global"}
                        </span>
                        <span className="px-2 py-1 bg-[#E0E0E0] text-[#292B35] rounded-full text-xs font-medium">
                            {player.TEAM_STATUS || "Solo Player"}
                        </span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-[#95C5C5] to-[#6BA4A4] text-white py-2 px-4 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                        Team Up
                    </button>
                </div>
            </div>
        </div>
    );
};

// Updated simulated API calls to match MongoDB schema
const fetchMentors = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    _id: { $oid: "67fb206239c201880a3ae3ef" },
                    NAME: "John Doe",
                    GAMES: ["CSGO", "Valorant"],
                    PROFILE_BANNER: "https://example.com/mentor_banner1.jpg",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "New York, USA",
                    EXPERIENCE_YEARS: 5,
                    PRICE_PER_SESSION: 50,
                    RATING: 4.8,
                    SOCIAL_LINKS: {
                        INSTAGRAM: "@john_doe",
                        DISCORD: "johndoe#1234"
                    },
                    BIO: "Professional CSGO coach with experience in major tournaments.",
                    MENTOR_ID: "590b6f34-feff-4a5b-8bc6-626b975ef4cd"
                },
                {
                    _id: { $oid: "67fb206239c201880a3ae3f0" },
                    NAME: "Maria Garcia",
                    GAMES: ["League of Legends"],
                    PROFILE_BANNER: "https://example.com/mentor_banner2.jpg",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "Madrid, Spain",
                    EXPERIENCE_YEARS: 7,
                    PRICE_PER_SESSION: 65,
                    RATING: 4.9,
                    SOCIAL_LINKS: {
                        INSTAGRAM: "@maria_lol",
                        DISCORD: "maria#5678"
                    },
                    BIO: "League of Legends strategist specializing in team coordination.",
                    MENTOR_ID: "590b6f34-feff-4a5b-8bc6-626b975ef4ce"
                },
                {
                    _id: { $oid: "67fb206239c201880a3ae3f1" },
                    NAME: "Alex Johnson",
                    GAMES: ["Fortnite"],
                    PROFILE_BANNER: "https://example.com/mentor_banner3.jpg",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "London, UK",
                    EXPERIENCE_YEARS: 4,
                    PRICE_PER_SESSION: 45,
                    RATING: 4.7,
                    SOCIAL_LINKS: {
                        INSTAGRAM: "@alex_fortnite",
                        DISCORD: "alex#9012"
                    },
                    BIO: "Fortnite building expert, focusing on competitive techniques.",
                    MENTOR_ID: "590b6f34-feff-4a5b-8bc6-626b975ef4cf"
                },
                {
                    _id: { $oid: "67fb206239c201880a3ae3f2" },
                    NAME: "Sam Wilson",
                    GAMES: ["Dota 2"],
                    PROFILE_BANNER: "https://example.com/mentor_banner4.jpg",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "Seattle, USA",
                    EXPERIENCE_YEARS: 6,
                    PRICE_PER_SESSION: 55,
                    RATING: 4.6,
                    SOCIAL_LINKS: {
                        INSTAGRAM: "@sam_dota",
                        DISCORD: "sam#3456"
                    },
                    BIO: "Dota 2 analyst with deep understanding of the meta.",
                    MENTOR_ID: "590b6f34-feff-4a5b-8bc6-626b975ef4d0"
                },
                {
                    _id: { $oid: "67fb206239c201880a3ae3f3" },
                    NAME: "Chris Taylor",
                    GAMES: ["Overwatch"],
                    PROFILE_BANNER: "https://example.com/mentor_banner5.jpg",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "Toronto, Canada",
                    EXPERIENCE_YEARS: 3,
                    PRICE_PER_SESSION: 40,
                    RATING: 4.5,
                    SOCIAL_LINKS: {
                        INSTAGRAM: "@chris_overwatch",
                        DISCORD: "chris#7890"
                    },
                    BIO: "Overwatch strategist specializing in team compositions.",
                    MENTOR_ID: "590b6f34-feff-4a5b-8bc6-626b975ef4d1"
                },
                {
                    _id: { $oid: "67fb206239c201880a3ae3f4" },
                    NAME: "Lisa Wong",
                    GAMES: ["Apex Legends"],
                    PROFILE_BANNER: "https://example.com/mentor_banner6.jpg",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "Sydney, Australia",
                    EXPERIENCE_YEARS: 4,
                    PRICE_PER_SESSION: 45,
                    RATING: 4.8,
                    SOCIAL_LINKS: {
                        INSTAGRAM: "@lisa_apex",
                        DISCORD: "lisa#1234"
                    },
                    BIO: "Apex Legends movement and positioning specialist.",
                    MENTOR_ID: "590b6f34-feff-4a5b-8bc6-626b975ef4d2"
                }
            ]);
        }, 1000);
    });
};

const fetchPlayers = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    _id: { $oid: "67fbf085fda1e70ffc118590" },
                    NAME: "Jane Smith",
                    GAMES_PLAYED: ["Valorant"],
                    GAME_RELATED_INFO: {
                        rank: "Radiant",
                        role: "Duelist"
                    },
                    HISTORY: [
                        {
                            ROLES_PLAYED: ["Entry Fragger"],
                            DURATION: "3 years",
                            TEAM_NAME: "Phoenix Rising",
                            GAME_NAME: "Valorant"
                        }
                    ],
                    PLATFORM_STATUS: "ACTIVE",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "Los Angeles, USA",
                    TEAM_STATUS: "Looking for Team",
                    RATING: 4.9,
                    BIO: "Pro Valorant player specializing in aggressive playstyles.",
                    USER_ID: "727da271-5319-45f7-b049-b8e737c22a8e"
                },
                {
                    _id: { $oid: "67fbf085fda1e70ffc118591" },
                    NAME: "Mike Johnson",
                    GAMES_PLAYED: ["CSGO"],
                    GAME_RELATED_INFO: {
                        rank: "Global Elite",
                        role: "Rifler"
                    },
                    HISTORY: [
                        {
                            ROLES_PLAYED: ["Support", "Entry"],
                            DURATION: "4 years",
                            TEAM_NAME: "Strike Force",
                            GAME_NAME: "CSGO"
                        }
                    ],
                    PLATFORM_STATUS: "ACTIVE",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "Berlin, Germany",
                    TEAM_STATUS: "Looking for Team",
                    RATING: 4.7,
                    BIO: "CSGO strategist focusing on team coordination.",
                    USER_ID: "727da271-5319-45f7-b049-b8e737c22a8f"
                },
                {
                    _id: { $oid: "67fbf085fda1e70ffc118592" },
                    NAME: "Emma Davis",
                    GAMES_PLAYED: ["League of Legends"],
                    GAME_RELATED_INFO: {
                        rank: "Diamond I",
                        role: "Mid"
                    },
                    HISTORY: [
                        {
                            ROLES_PLAYED: ["Mid", "Support"],
                            DURATION: "3 years",
                            TEAM_NAME: "Arcane Mages",
                            GAME_NAME: "League of Legends"
                        }
                    ],
                    PLATFORM_STATUS: "ACTIVE",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "Seoul, South Korea",
                    TEAM_STATUS: "Open to Offers",
                    RATING: 4.8,
                    BIO: "League player with strong map awareness and roaming ability.",
                    USER_ID: "727da271-5319-45f7-b049-b8e737c22a90"
                },
                {
                    _id: { $oid: "67fbf085fda1e70ffc118593" },
                    NAME: "David Kim",
                    GAMES_PLAYED: ["Dota 2"],
                    GAME_RELATED_INFO: {
                        rank: "Immortal",
                        role: "Carry"
                    },
                    HISTORY: [
                        {
                            ROLES_PLAYED: ["Carry", "Mid"],
                            DURATION: "5 years",
                            TEAM_NAME: "Divine Aegis",
                            GAME_NAME: "Dota 2"
                        }
                    ],
                    PLATFORM_STATUS: "ACTIVE",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "Vancouver, Canada",
                    TEAM_STATUS: "Looking for Team",
                    RATING: 4.9,
                    BIO: "Dota 2 carry player with exceptional farming patterns.",
                    USER_ID: "727da271-5319-45f7-b049-b8e737c22a91"
                },
                {
                    _id: { $oid: "67fbf085fda1e70ffc118594" },
                    NAME: "Tyler Brooks",
                    GAMES_PLAYED: ["Fortnite"],
                    GAME_RELATED_INFO: {
                        rank: "Champion League",
                        role: "Builder"
                    },
                    HISTORY: [
                        {
                            ROLES_PLAYED: ["Builder", "Fragger"],
                            DURATION: "2 years",
                            TEAM_NAME: "Sky Fortress",
                            GAME_NAME: "Fortnite"
                        }
                    ],
                    PLATFORM_STATUS: "ACTIVE",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "Chicago, USA",
                    TEAM_STATUS: "Looking for Duo Partner",
                    RATING: 4.6,
                    BIO: "Fortnite player specializing in box fighting and fast edits.",
                    USER_ID: "727da271-5319-45f7-b049-b8e737c22a92"
                },
                {
                    _id: { $oid: "67fbf085fda1e70ffc118595" },
                    NAME: "Sarah Miller",
                    GAMES_PLAYED: ["Overwatch"],
                    GAME_RELATED_INFO: {
                        rank: "Master",
                        role: "DPS"
                    },
                    HISTORY: [
                        {
                            ROLES_PLAYED: ["DPS", "Flex"],
                            DURATION: "3 years",
                            TEAM_NAME: "Overseers",
                            GAME_NAME: "Overwatch"
                        }
                    ],
                    PLATFORM_STATUS: "ACTIVE",
                    PROFILE_PIC: "https://via.placeholder.com/150",
                    LOCATION: "Paris, France",
                    TEAM_STATUS: "Open to Offers",
                    RATING: 4.7,
                    BIO: "Overwatch DPS main focusing on hitscan heroes.",
                    USER_ID: "727da271-5319-45f7-b049-b8e737c22a93"
                }
            ]);
        }, 1000);
    });
};

function Connect() {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('mentors');
    const [mentors, setMentors] = useState([]);
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // New filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [searchApplied, setSearchApplied] = useState(false);

    // Player filters
    const [selectedGame, setSelectedGame] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedTier, setSelectedTier] = useState('');

    // Mentor filters
    const [selectedMentorGame, setSelectedMentorGame] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [selectedExperience, setSelectedExperience] = useState('');

    // Define filter options
    const gameOptions = ['All Games', 'CSGO', 'Valorant', 'Fortnite', 'League of Legends', 'Dota 2', 'Overwatch', 'Apex Legends'];
    const rolesByGame = {
        'CSGO': ['Entry Fragger', 'AWPer', 'Support', 'IGL', 'Lurker'],
        'Valorant': ['Duelist', 'Sentinel', 'Controller', 'Initiator'],
        'Fortnite': ['Builder', 'Fragger', 'Support'],
        'League of Legends': ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
        'Dota 2': ['Carry', 'Mid', 'Offlane', 'Soft Support', 'Hard Support'],
        'Overwatch': ['Tank', 'DPS', 'Support'],
        'Apex Legends': ['Fragger', 'Support', 'Recon']
    };
    const tierOptions = ['All Tiers', 'Beginner', 'Intermediate', 'Advanced', 'Expert', 'Professional'];
    const priceRangeOptions = ['All Prices', 'Under $40/hr', '$40-$60/hr', 'Over $60/hr'];
    const experienceOptions = ['All Experience', 'Under 3 years', '3-5 years', 'Over 5 years'];

    // Handle game selection for players
    const handleGameChange = (game) => {
        setSelectedGame(game);
        setSelectedRole(''); // Reset role when game changes
    };

    // Get available roles based on selected game
    const availableRoles = useMemo(() => {
        if (!selectedGame || selectedGame === 'All Games') return ['All Roles'];
        return ['All Roles', ...rolesByGame[selectedGame]];
    }, [selectedGame]);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [mentorData, playerData] = await Promise.all([
                    fetchMentors(),
                    fetchPlayers()
                ]);
                setMentors(mentorData);
                setPlayers(playerData);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const handleMentorClick = () => {
        console.log("Mentors section clicked");
        setCurrentView('mentors');
    };

    const handlePlayerClick = () => {
        console.log("Players section clicked");
        setCurrentView('players');
    };

    // Handle search button click
    const handleSearch = () => {
        // Reset all other filters
        if (currentView === 'mentors') {
            setSelectedMentorGame('');
            setSelectedPriceRange('');
            setSelectedExperience('');
        } else {
            setSelectedGame('');
            setSelectedRole('');
            setSelectedTier('');
        }
        setSearchApplied(true);
    };

    // Reset search
    const clearSearch = () => {
        setSearchQuery('');
        setSearchApplied(false);
    };

    // Filter mentors based on selected filters, updated for new schema
    const filteredMentors = useMemo(() => {
        if (!mentors.length) return [];

        let filtered = [...mentors];

        if (searchApplied && searchQuery) {
            return filtered.filter(mentor =>
                (mentor.NAME && mentor.NAME.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (mentor.BIO && mentor.BIO.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (mentor.GAMES && mentor.GAMES.some(game => game.toLowerCase().includes(searchQuery.toLowerCase())))
            );
        }

        if (selectedMentorGame && selectedMentorGame !== 'All Games') {
            filtered = filtered.filter(mentor =>
                mentor.GAMES && mentor.GAMES.some(game =>
                    game.toLowerCase().includes(selectedMentorGame.toLowerCase())
                )
            );
        }

        if (selectedPriceRange && selectedPriceRange !== 'All Prices') {
            if (selectedPriceRange === 'Under $40/hr') {
                filtered = filtered.filter(mentor => mentor.PRICE_PER_SESSION < 40);
            } else if (selectedPriceRange === '$40-$60/hr') {
                filtered = filtered.filter(mentor =>
                    mentor.PRICE_PER_SESSION >= 40 && mentor.PRICE_PER_SESSION <= 60
                );
            } else if (selectedPriceRange === 'Over $60/hr') {
                filtered = filtered.filter(mentor => mentor.PRICE_PER_SESSION > 60);
            }
        }

        if (selectedExperience && selectedExperience !== 'All Experience') {
            if (selectedExperience === 'Under 3 years') {
                filtered = filtered.filter(mentor => mentor.EXPERIENCE_YEARS < 3);
            } else if (selectedExperience === '3-5 years') {
                filtered = filtered.filter(mentor =>
                    mentor.EXPERIENCE_YEARS >= 3 && mentor.EXPERIENCE_YEARS <= 5
                );
            } else if (selectedExperience === 'Over 5 years') {
                filtered = filtered.filter(mentor => mentor.EXPERIENCE_YEARS > 5);
            }
        }

        return filtered;
    }, [mentors, searchQuery, searchApplied, selectedMentorGame, selectedPriceRange, selectedExperience]);

    // Filter players based on selected filters, updated for new schema
    const filteredPlayers = useMemo(() => {
        if (!players.length) return [];

        let filtered = [...players];

        if (searchApplied && searchQuery) {
            return filtered.filter(player =>
                (player.NAME && player.NAME.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (player.BIO && player.BIO.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (player.GAMES_PLAYED && player.GAMES_PLAYED.some(game =>
                    game.toLowerCase().includes(searchQuery.toLowerCase()))
                )
            );
        }

        if (selectedGame && selectedGame !== 'All Games') {
            filtered = filtered.filter(player =>
                player.GAMES_PLAYED && player.GAMES_PLAYED.some(game =>
                    game.toLowerCase().includes(selectedGame.toLowerCase())
                )
            );
        }

        if (selectedRole && selectedRole !== 'All Roles') {
            filtered = filtered.filter(player =>
                (player.GAME_RELATED_INFO &&
                    player.GAME_RELATED_INFO.role &&
                    player.GAME_RELATED_INFO.role.toLowerCase().includes(selectedRole.toLowerCase())) ||
                (player.HISTORY && player.HISTORY.some(history =>
                    history.ROLES_PLAYED && history.ROLES_PLAYED.some(role =>
                        role.toLowerCase().includes(selectedRole.toLowerCase())
                    )
                ))
            );
        }

        if (selectedTier && selectedTier !== 'All Tiers') {
            filtered = filtered.filter(player =>
                player.GAME_RELATED_INFO &&
                player.GAME_RELATED_INFO.rank &&
                (player.GAME_RELATED_INFO.rank === selectedTier ||
                    // Match skill level to rank categories
                    (selectedTier === "Expert" && ["Radiant", "Immortal", "Global Elite", "Champion League"].includes(player.GAME_RELATED_INFO.rank)) ||
                    (selectedTier === "Advanced" && ["Diamond", "Master", "Supreme"].includes(player.GAME_RELATED_INFO.rank)) ||
                    (selectedTier === "Intermediate" && ["Platinum", "Gold"].includes(player.GAME_RELATED_INFO.rank)) ||
                    (selectedTier === "Beginner" && ["Silver", "Bronze"].includes(player.GAME_RELATED_INFO.rank))
                )
            );
        }

        return filtered;
    }, [players, searchQuery, searchApplied, selectedGame, selectedRole, selectedTier]);

    return (
        <>
            <div className="flex h-screen bg-[#E0E0E0] justify-center">
                {/* Left Slider */}
                <LeftSlider
                    mentorIcon="🧑‍🏫"
                    mentorTitle="Mentors"
                    mentorDescription="Connect with experienced mentors"
                    upperVerticalClick={handleMentorClick}
                    playerIcon="🎮"
                    playerTitle="Players"
                    playerDescription="Find skilled players to team up with"
                    lowerVerticalClick={handlePlayerClick}
                />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-x-hidden bg-[#E0E0E0]">
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            {/* Updated header with gradient */}
                            <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-[#292B35] to-[#3D3F4D] rounded-lg shadow-md mb-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {currentView === 'mentors' ? 'Find Mentors' : 'Find Players'}
                                </h2>
                                <p className="mt-1 text-sm text-gray-300">
                                    {currentView === 'mentors'
                                        ? 'Connect with professional coaches to improve your skills'
                                        : 'Find teammates who match your play style and schedule'}
                                </p>
                            </div>

                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="text-lg text-gray-600">Loading...</div>
                                </div>
                            ) : (
                                <>
                                    {/* Enhanced Filter Controls */}
                                    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-t-4 border-[#AD662F]">
                                        {/* Search Bar with Icon */}
                                        <div className="relative mb-6">
                                            <input
                                                type="text"
                                                placeholder={searchApplied ? "Search applied. Clear to use filters." : "Search by name or role. Clears all other filters when used."}
                                                className="w-full px-6 py-4 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none text-lg shadow-inner"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                disabled={searchApplied}
                                            />
                                            {searchApplied ? (
                                                <button
                                                    onClick={clearSearch}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#95C5C5] p-2 rounded-full">
                                                    <span className="text-white">✖</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleSearch}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#EE8631] p-2 rounded-full">
                                                    <span className="text-white">🔍</span>
                                                </button>
                                            )}
                                        </div>

                                        {/* Filter Groups */}
                                        {!searchApplied && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {currentView === 'mentors' ? (
                                                    /* Mentor Filters */
                                                    <>
                                                        <div className="filter-group">
                                                            <label className="block text-[#95C5C5] font-medium mb-2">Game</label>
                                                            <select
                                                                className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300"
                                                                value={selectedMentorGame}
                                                                onChange={(e) => setSelectedMentorGame(e.target.value)}
                                                            >
                                                                {gameOptions.map(game => (
                                                                    <option key={game} value={game}>{game}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="filter-group">
                                                            <label className="block text-[#95C5C5] font-medium mb-2">Price Range</label>
                                                            <select
                                                                className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300"
                                                                value={selectedPriceRange}
                                                                onChange={(e) => setSelectedPriceRange(e.target.value)}
                                                            >
                                                                {priceRangeOptions.map(range => (
                                                                    <option key={range} value={range}>{range}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="filter-group">
                                                            <label className="block text-[#95C5C5] font-medium mb-2">Experience</label>
                                                            <select
                                                                className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300"
                                                                value={selectedExperience}
                                                                onChange={(e) => setSelectedExperience(e.target.value)}
                                                            >
                                                                {experienceOptions.map(exp => (
                                                                    <option key={exp} value={exp}>{exp}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </>
                                                ) : (
                                                    /* Player Filters */
                                                    <>
                                                        <div className="filter-group">
                                                            <label className="block text-[#95C5C5] font-medium mb-2">Game</label>
                                                            <select
                                                                className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300"
                                                                value={selectedGame}
                                                                onChange={(e) => handleGameChange(e.target.value)}
                                                            >
                                                                {gameOptions.map(game => (
                                                                    <option key={game} value={game}>{game}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="filter-group">
                                                            <label className="block text-[#95C5C5] font-medium mb-2">Role</label>
                                                            <select
                                                                className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300 disabled:opacity-50"
                                                                value={selectedRole}
                                                                onChange={(e) => setSelectedRole(e.target.value)}
                                                                disabled={!selectedGame || selectedGame === 'All Games'}
                                                            >
                                                                {availableRoles.map(role => (
                                                                    <option key={role} value={role}>{role}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="filter-group">
                                                            <label className="block text-[#95C5C5] font-medium mb-2">Tier</label>
                                                            <select
                                                                className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300"
                                                                value={selectedTier}
                                                                onChange={(e) => setSelectedTier(e.target.value)}
                                                            >
                                                                {tierOptions.map(tier => (
                                                                    <option key={tier} value={tier}>{tier}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Cards grid - update to use the filtered data with MongoDB schema */}
                                    <div className="px-4 sm:px-0">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {currentView === 'mentors' ? (
                                                filteredMentors.length > 0 ?
                                                    filteredMentors.map(mentor => (
                                                        <MentorCard key={mentor.MENTOR_ID || mentor._id.$oid} mentor={mentor} />
                                                    )) :
                                                    <div className="col-span-3 text-center text-gray-600 py-12">
                                                        No mentors found matching your criteria
                                                    </div>
                                            ) : (
                                                filteredPlayers.length > 0 ?
                                                    filteredPlayers.map(player => (
                                                        <PlayerCard key={player.USER_ID || player._id.$oid} player={player} />
                                                    )) :
                                                    <div className="col-span-3 text-center text-gray-600 py-12">
                                                        No players found matching your criteria
                                                    </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </main>
                </div>

                {/* Right Slider */}
                <RightSlider />
            </div>
        </>
    );
}

export default Connect;