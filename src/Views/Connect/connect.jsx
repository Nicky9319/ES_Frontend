import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaTimes, FaGamepad, FaUser, FaSort, FaChevronDown, FaStar, FaDollarSign, FaClock, FaMedal, FaList, FaTh } from 'react-icons/fa';
import MentorCard from './components/MentorCard';
import PlayerCard from './components/PlayerCard';

import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';

// Import sample data for development (will be replaced with API calls later)
import mentorProfileData from './mentorprofile.json';
import playerProfileData from './playerProfileData.json';

const MENTOR_PROFILE_SERVICE = import.meta.env.VITE_MENTOR_PROFILE_SERVICE;
const USER_PROFILE_SERVICE = import.meta.env.VITE_USER_PROFILE_SERVICE;

// Simulated API call loading data from JSON files
const fetchMentors = () => {
    return new Promise(async (resolve) => {
        const response = await fetch(`http://${MENTOR_PROFILE_SERVICE}/MentorProfile/GetAllMentorProfiles`);
        const data = await response.json();

        console.log(data)
        console.log("Resolving Mentor Data")

        resolve(data["MENTOR_PROFILES"]);

    });
};

const fetchPlayers = () => {
    return new Promise(async (resolve) => {
        const response = await fetch(`http://${USER_PROFILE_SERVICE}/UserProfile/GetAllUserProfiles`);
        const data = await response.json();

        // console.log(data)
        // console.log("Resolving User Data")

        resolve(data["USER_PROFILES"]);
    });
};

// Filter badge component
const FilterBadge = ({ label, onRemove }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-[#3A3D4A] text-[#E0E0E0] px-3 py-1 rounded-full text-sm flex items-center gap-1"
    >
        <span>{label}</span>
        <button 
            onClick={onRemove}
            className="bg-[#292B35] hover:bg-[#EE8631] p-1 rounded-full w-4 h-4 flex items-center justify-center text-[10px] transition-colors"
        >
            <FaTimes />
        </button>
    </motion.div>
);

// FilterSelector component for consistent styling
const FilterSelector = ({ label, value, onChange, options, icon, disabled = false }) => (
    <div className="filter-group">
        <label className="flex items-center gap-2 text-[#95C5C5] font-medium mb-2 text-sm">
            {icon}
            {label}
        </label>
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full appearance-none bg-[#292B35] border border-[#3A3D4A] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#95C5C5] transition-colors pr-10 text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {options.map(option => (
                    <option key={typeof option === 'string' ? option : option.value} 
                            value={typeof option === 'string' ? option : option.value}>
                        {typeof option === 'string' ? option : option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#95C5C5]">
                <FaChevronDown size={12} />
            </div>
        </div>
    </div>
);

function Connect() {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('mentors');
    const [mentors, setMentors] = useState([]);
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Filter states
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
    const handleGameChange = (e) => {
        setSelectedGame(e.target.value);
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
                setInitialLoadComplete(true);
            }
        };

        loadData();
    }, []);

    const handleMentorClick = () => {
        setCurrentView('mentors');
        resetFilters();
    };

    const handlePlayerClick = () => {
        setCurrentView('players');
        resetFilters();
    };

    // Reset all filters
    const resetFilters = () => {
        setSearchQuery('');
        setSearchApplied(false);
        setSelectedGame('');
        setSelectedRole('');
        setSelectedTier('');
        setSelectedMentorGame('');
        setSelectedPriceRange('');
        setSelectedExperience('');
    };

    // Handle search button click
    const handleSearch = () => {
        if (searchQuery.trim() === '') return;
        
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

    // Handle card click to navigate to profile
    const handleMentorCardClick = (mentor) => {
        // Navigate to /profile/{mentor_id}
        console.log(mentor.MENTOR_ID);
        window.open(`/mentorProfile/${mentor.MENTOR_ID}`, '_blank');
    };

    const handlePlayerCardClick = (player) => {
        // Navigate to /profile/{user_id}
        console.log(player.USER_ID);
        window.open(`/profile/${player.USER_ID}`, '_blank');
    };

    // Toggle filter visibility
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Handle keypress in search field
    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Filter mentors based on selected filters
    const filteredMentors = useMemo(() => {
        if (!mentors.length) return [];

        let filtered = [...mentors];

        if (searchApplied && searchQuery) {
            const query = searchQuery.toLowerCase();
            return filtered.filter(mentor =>
                (mentor.USER_NAME && mentor.USER_NAME.toLowerCase().includes(query)) ||
                (mentor.NAME && mentor.NAME.toLowerCase().includes(query)) ||
                (mentor.BIO && mentor.BIO.toLowerCase().includes(query)) ||
                (mentor.TAGLINE && mentor.TAGLINE.toLowerCase().includes(query)) ||
                (mentor.GAMES && mentor.GAMES.some(game => game.toLowerCase().includes(query)))
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

    // Filter players based on selected filters
    const filteredPlayers = useMemo(() => {
        if (!players.length) return [];

        let filtered = [...players];

        if (searchApplied && searchQuery) {
            const query = searchQuery.toLowerCase();
            return filtered.filter(player =>
                (player.USER_NAME && player.USER_NAME.toLowerCase().includes(query)) ||
                (player.NAME && player.NAME.toLowerCase().includes(query)) ||
                (player.BIO && player.BIO.toLowerCase().includes(query)) ||
                (player.TAGLINE && player.TAGLINE.toLowerCase().includes(query)) ||
                (player.GAMES_PLAYED && player.GAMES_PLAYED.some(game =>
                    game.toLowerCase().includes(query))
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
                    (selectedTier === "Expert" && ["Radiant", "Immortal", "Global Elite", "Champion League"].includes(player.GAME_RELATED_INFO.rank)) ||
                    (selectedTier === "Advanced" && ["Diamond", "Master", "Supreme"].includes(player.GAME_RELATED_INFO.rank)) ||
                    (selectedTier === "Intermediate" && ["Platinum", "Gold"].includes(player.GAME_RELATED_INFO.rank)) ||
                    (selectedTier === "Beginner" && ["Silver", "Bronze"].includes(player.GAME_RELATED_INFO.rank))
                )
            );
        }

        return filtered;
    }, [players, searchQuery, searchApplied, selectedGame, selectedRole, selectedTier]);

    // Get active filters count
    const getActiveFiltersCount = () => {
        if (currentView === 'mentors') {
            return [
                selectedMentorGame !== '' && selectedMentorGame !== 'All Games',
                selectedPriceRange !== '' && selectedPriceRange !== 'All Prices',
                selectedExperience !== '' && selectedExperience !== 'All Experience'
            ].filter(Boolean).length;
        } else {
            return [
                selectedGame !== '' && selectedGame !== 'All Games',
                selectedRole !== '' && selectedRole !== 'All Roles',
                selectedTier !== '' && selectedTier !== 'All Tiers'
            ].filter(Boolean).length;
        }
    };
    const activeFiltersCount = getActiveFiltersCount();

    // Get active filter labels and removal functions
    const activeFilterBadges = useMemo(() => {
        const badges = [];
        if (currentView === 'mentors') {
            if (selectedMentorGame && selectedMentorGame !== 'All Games') badges.push({ label: `Game: ${selectedMentorGame}`, onRemove: () => setSelectedMentorGame('') });
            if (selectedPriceRange && selectedPriceRange !== 'All Prices') badges.push({ label: `Price: ${selectedPriceRange}`, onRemove: () => setSelectedPriceRange('') });
            if (selectedExperience && selectedExperience !== 'All Experience') badges.push({ label: `Exp: ${selectedExperience}`, onRemove: () => setSelectedExperience('') });
        } else {
            if (selectedGame && selectedGame !== 'All Games') badges.push({ label: `Game: ${selectedGame}`, onRemove: () => { setSelectedGame(''); setSelectedRole(''); } });
            if (selectedRole && selectedRole !== 'All Roles') badges.push({ label: `Role: ${selectedRole}`, onRemove: () => setSelectedRole('') });
            if (selectedTier && selectedTier !== 'All Tiers') badges.push({ label: `Tier: ${selectedTier}`, onRemove: () => setSelectedTier('') });
        }
        return badges;
    }, [currentView, selectedMentorGame, selectedPriceRange, selectedExperience, selectedGame, selectedRole, selectedTier]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#292B35] to-[#2A2C36] text-[#E0E0E0]">
            <LeftSlider/>

            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: initialLoadComplete ? 1 : 0, y: initialLoadComplete ? 0 : -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#E0E0E0] tracking-tight">
                        Connect & Conquer
                    </h1>
                    <p className="text-lg md:text-xl text-[#95C5C5]">
                        Find the perfect mentors or teammates to elevate your game.
                    </p>
                </motion.div>

                {/* View Toggle: Mentors / Players */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: initialLoadComplete ? 1 : 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className="bg-[#2F3140] p-1 rounded-lg flex space-x-1 shadow-md">
                        <button 
                            onClick={handleMentorClick}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentView === 'mentors' ? 'bg-[#EE8631] text-white shadow-sm' : 'text-[#E0E0E0] hover:bg-[#3A3D4A]'}`}
                        >
                            <FaUser /> Mentors
                        </button>
                        <button 
                            onClick={handlePlayerClick}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentView === 'players' ? 'bg-[#95C5C5] text-[#292B35] shadow-sm' : 'text-[#E0E0E0] hover:bg-[#3A3D4A]'}`}
                        >
                            <FaGamepad /> Players
                        </button>
                    </div>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: initialLoadComplete ? 1 : 0, y: initialLoadComplete ? 0 : 20 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-[#2F3140] p-4 rounded-xl shadow-lg mb-6 border border-[#3A3D4A]"
                >
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        {/* Search Input */}
                        <div className="relative flex-grow w-full md:w-auto">
                            <input
                                type="text"
                                placeholder={searchApplied ? "Search applied. Clear to use filters." : `Search ${currentView}...`}
                                className="w-full bg-[#292B35] border border-[#3A3D4A] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#95C5C5] transition-colors placeholder-[#6b7280] pl-10 text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleSearchKeyPress}
                                disabled={searchApplied}
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#95C5C5]">
                                <FaSearch />
                            </div>
                            {searchApplied ? (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                                    title="Clear search"
                                >
                                    <FaTimes />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSearch}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                                    title="Apply search"
                                >
                                    <FaSearch />
                                </button>
                            )}
                        </div>

                        {/* Filter and View Buttons */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                            <button 
                                onClick={toggleFilters}
                                disabled={searchApplied}
                                className={`relative p-3 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium ${searchApplied ? 'bg-[#3A3D4A] text-[#6b7280] cursor-not-allowed' : `${showFilters ? 'bg-[#EE8631] text-white' : 'bg-[#3A3D4A] text-[#E0E0E0] hover:bg-[#4A4D5A]'}`}`}
                                title="Toggle Filters"
                            >
                                <FaFilter />
                                <span className="hidden sm:inline">Filters</span>
                                {activeFiltersCount > 0 && !searchApplied && (
                                    <span className="absolute -top-1 -right-1 bg-[#EE8631] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {activeFiltersCount}
                                    </span>
                                )}
                            </button>
                            <div className="bg-[#3A3D4A] p-1 rounded-lg flex">
                                <button 
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#95C5C5] text-[#292B35]' : 'text-[#E0E0E0] hover:bg-[#4A4D5A]'}`}
                                    title="Grid View"
                                >
                                    <FaTh />
                                </button>
                                <button 
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#95C5C5] text-[#292B35]' : 'text-[#E0E0E0] hover:bg-[#4A4D5A]'}`}
                                    title="List View"
                                >
                                    <FaList />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Active Filter Badges */}
                    <AnimatePresence>
                        {activeFilterBadges.length > 0 && !searchApplied && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                className="flex flex-wrap gap-2 pt-4 border-t border-[#3A3D4A]"
                            >
                                {activeFilterBadges.map(badge => (
                                    <FilterBadge key={badge.label} label={badge.label} onRemove={badge.onRemove} />
                                ))}
                                <button 
                                    onClick={resetFilters}
                                    className="text-xs text-[#EE8631] hover:text-[#AD662F] transition-colors font-medium ml-auto self-center"
                                >
                                    Reset All
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Filter Panel */}
                <AnimatePresence>
                    {showFilters && !searchApplied && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#2F3140] rounded-xl shadow-lg mb-6 border border-[#3A3D4A] overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-[#E0E0E0]">Filter Options</h3>
                                    <button 
                                        onClick={resetFilters}
                                        className="text-sm text-[#EE8631] hover:text-[#AD662F] transition-colors font-medium"
                                    >
                                        Reset All
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {currentView === 'mentors' ? (
                                        /* Mentor Filters */
                                        <>
                                            <FilterSelector 
                                                label="Game" 
                                                value={selectedMentorGame} 
                                                onChange={(e) => setSelectedMentorGame(e.target.value)} 
                                                options={gameOptions} 
                                                icon={<FaGamepad />} 
                                            />
                                            <FilterSelector 
                                                label="Price Range" 
                                                value={selectedPriceRange} 
                                                onChange={(e) => setSelectedPriceRange(e.target.value)} 
                                                options={priceRangeOptions} 
                                                icon={<FaDollarSign />} 
                                            />
                                            <FilterSelector 
                                                label="Experience" 
                                                value={selectedExperience} 
                                                onChange={(e) => setSelectedExperience(e.target.value)} 
                                                options={experienceOptions} 
                                                icon={<FaClock />} 
                                            />
                                        </>
                                    ) : (
                                        /* Player Filters */
                                        <>
                                            <FilterSelector 
                                                label="Game" 
                                                value={selectedGame} 
                                                onChange={handleGameChange} 
                                                options={gameOptions} 
                                                icon={<FaGamepad />} 
                                            />
                                            <FilterSelector 
                                                label="Role" 
                                                value={selectedRole} 
                                                onChange={(e) => setSelectedRole(e.target.value)} 
                                                options={availableRoles} 
                                                icon={<FaUser />} 
                                                disabled={!selectedGame || selectedGame === 'All Games'}
                                            />
                                            <FilterSelector 
                                                label="Tier" 
                                                value={selectedTier} 
                                                onChange={(e) => setSelectedTier(e.target.value)} 
                                                options={tierOptions} 
                                                icon={<FaMedal />} 
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Area */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="p-4 bg-[#2F3140] rounded-lg shadow-lg">
                            <div className="animate-pulse flex items-center justify-center">
                                <div className="w-6 h-6 bg-[#EE8631] rounded-full mr-2"></div>
                                <div className="text-lg text-[#E0E0E0] font-medium">Loading...</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div 
                        layout 
                        className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
                    >
                        <AnimatePresence>
                            {currentView === 'mentors' ? (
                                filteredMentors.length > 0 ? (
                                    filteredMentors.map(mentor => (
                                        <MentorCard 
                                            key={mentor.MENTOR_ID || mentor._id.$oid} 
                                            mentor={mentor} 
                                            onClick={() => handleMentorCardClick(mentor)}
                                            viewMode={viewMode}
                                        />
                                    ))
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="col-span-full text-center bg-[#2F3140] p-10 rounded-xl shadow-md border border-[#3A3D4A]"
                                    >
                                        <div className="text-6xl mb-4 text-[#EE8631]">🤷</div>
                                        <h3 className="text-xl font-bold text-[#E0E0E0] mb-2">No mentors found</h3>
                                        <p className="text-[#95C5C5]">Try adjusting your filters or search query.</p>
                                    </motion.div>
                                )
                            ) : (
                                filteredPlayers.length > 0 ? (
                                    filteredPlayers.map(player => (
                                        <PlayerCard 
                                            key={player.USER_ID || player._id.$oid} 
                                            player={player} 
                                            onClick={() => handlePlayerCardClick(player)}
                                            viewMode={viewMode}
                                        />
                                    ))
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="col-span-full text-center bg-[#2F3140] p-10 rounded-xl shadow-md border border-[#3A3D4A]"
                                    >
                                        <div className="text-6xl mb-4 text-[#95C5C5]">🤷</div>
                                        <h3 className="text-xl font-bold text-[#E0E0E0] mb-2">No players found</h3>
                                        <p className="text-[#EE8631]">Try adjusting your filters or search query.</p>
                                    </motion.div>
                                )
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            <RightSlider />
        </div>
    );
}

export default Connect;