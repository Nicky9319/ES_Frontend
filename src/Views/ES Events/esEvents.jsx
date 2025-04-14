import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';
import dummyData from './dummyEvents.json';

function EsEvents() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConsole, setSelectedConsole] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedGameType, setSelectedGameType] = useState('');
    const [selectedGame, setSelectedGame] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [isLoading, setIsLoading] = useState(false);

    // Define filter options
    const gameTypeOptions = ['All Types', 'FPS', 'Battle Royale', 'Sports MMO'];
    const gamesByType = {
        'FPS': ['Valorant', 'Overwatch'],
        'Battle Royale': ['Fortnite', 'PUBG', 'Apex: Legends', 'Garena Free Fire'],
        'Sports MMO': ['EA Sports FC 25']
    };
    const consoleOptions = ['All Consoles', 'PC', 'PlayStation', 'Xbox', 'Mobile'];
    const locationOptions = ['All Locations', 'Delhi ', 'Bangalore', 'Hyderabad', 'Mumbai', 'Chennai', 'Pune'];

    // Handle game type change
    const handleGameTypeChange = (type) => {
        setSelectedGameType(type);
        setSelectedGame(''); // Reset game selection when type changes
    };

    // Get available games based on selected game type
    const availableGames = useMemo(() => {
        if (!selectedGameType || selectedGameType === 'All Types') return ['All Games'];
        return ['All Games', ...gamesByType[selectedGameType]];
    }, [selectedGameType]);

    // Function to handle view details navigation
    const handleViewDetails = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    // Transform the raw events data to match our component's expected structure
    const esportsEvents = useMemo(() => {
        if (!dummyData?.EVENTS) return [];
        
        return dummyData.EVENTS.map(event => ({
            id: event.EVENT_ID,
            title: event.EVENT_NAME,
            game: event.GAME,
            gameType: event.GAME_TYPE,
            // Handle both date formats (string and object with $date)
            date: new Date(event.EVENT_DATE.$date || event.EVENT_DATE).toLocaleDateString(),
            venue: event.VENUE,
            description: event.DESCRIPTION,
            prizePool: event.PRIZE_POOL,
            format: event.FORMAT,
            console: event.CONSOLE,
            location: event.LOCATION,
            // Use provided image or fallback
            image: event.IMAGE || "https://via.placeholder.com/400x200"
        }));
    }, [dummyData]);

    // Add console log to debug
    console.log('Transformed events:', esportsEvents);

    // Helper function to safely parse date
    const parseDate = (dateStr) => {
        if (!dateStr) return new Date(0); // return earliest possible date if undefined
        try {
            return new Date(dateStr);
        } catch (e) {
            console.warn('Invalid date format:', dateStr);
            return new Date(0);
        }
    };

    // Helper function to safely parse prize pool
    const parsePrizePool = (prizeStr) => {
        if (!prizeStr) return 0;
        try {
            return parseInt(prizeStr.replace(/[^0-9]/g, '')) || 0;
        } catch (e) {
            console.warn('Invalid prize pool format:', prizeStr);
            return 0;
        }
    };

    // Filter and sort events with error handling
    const filteredAndSortedEvents = useMemo(() => {
        if (!Array.isArray(esportsEvents)) {
            console.error('Events data is not an array:', esportsEvents);
            return [];
        }

        let filtered = [...esportsEvents];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(event => {
                try {
                    return (event?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event?.description?.toLowerCase().includes(searchQuery.toLowerCase()));
                } catch (e) {
                    console.warn('Error filtering event:', event);
                    return false;
                }
            });
        }

        // Apply console filter
        if (selectedConsole && selectedConsole !== 'All Consoles') {
            filtered = filtered.filter(event => event.console === selectedConsole);
        }

        // Apply location filter
        if (selectedLocation && selectedLocation !== 'All Locations') {
            filtered = filtered.filter(event => event.location === selectedLocation);
        }

        // Apply game type filter
        if (selectedGameType && selectedGameType !== 'All Types') {
            filtered = filtered.filter(event => event.gameType === selectedGameType);
        }

        // Apply game filter
        if (selectedGame && selectedGame !== 'All Games') {
            filtered = filtered.filter(event => event.game === selectedGame);
        }

        // Apply sorting with error handling
        return filtered.sort((a, b) => {
            try {
                switch (sortBy) {
                    case 'date':
                        return parseDate(a?.date) - parseDate(b?.date);
                    case 'prizePool':
                        return parsePrizePool(b?.prizePool) - parsePrizePool(a?.prizePool);
                    default:
                        return 0;
                }
            } catch (e) {
                console.warn('Error sorting events:', e);
                return 0;
            }
        });
    }, [searchQuery, selectedConsole, selectedLocation, selectedGameType, selectedGame, sortBy, esportsEvents]);

    // Add error boundary for the component
    if (!esportsEvents) {
        return <div className="text-[#95C5C5] text-center p-8">No events data available</div>;
    }

    return (
        <div className="bg-[#292B35]">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-bold text-[#95C5C5] text-center mb-8 tracking-wide">
                    <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                        Upcoming Events
                    </span>
                </h1>
                
                {/* Enhanced Filter Controls */}
                <div className="bg-[#292B35] p-6 rounded-xl shadow-lg mb-8 border border-[#95C5C5]/20">
                    {/* Search Bar with Icon */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search tournaments..."
                            className="w-full px-6 py-4 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none text-lg shadow-inner"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#EE8631] p-2 rounded-full">
                            <span className="text-white">🔍</span>
                        </div>
                    </div>

                    {/* Filter Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Filter Groups */}
                        <div className="filter-group">
                            <label className="block text-[#95C5C5] font-medium mb-2">Platform</label>
                            <select
                                className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300"
                                value={selectedConsole}
                                onChange={(e) => setSelectedConsole(e.target.value)}
                            >
                                {consoleOptions.map(console => (
                                    <option key={console} value={console}>{console}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="block text-[#95C5C5] font-medium mb-2">Location</label>
                            <select
                                className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                {locationOptions.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="block text-[#95C5C5] font-medium mb-2">Game Category</label>
                            <select
                                className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300"
                                value={selectedGameType}
                                onChange={(e) => handleGameTypeChange(e.target.value)}
                            >
                                {gameTypeOptions.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="block text-[#95C5C5] font-medium mb-2">Game</label>
                            <select
                                className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300 disabled:opacity-50"
                                value={selectedGame}
                                onChange={(e) => setSelectedGame(e.target.value)}
                                disabled={!selectedGameType || selectedGameType === 'All Types'}
                            >
                                {availableGames.map(game => (
                                    <option key={game} value={game}>{game}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Sort Control */}
                    <div className="mt-4 flex justify-end">
                        <div className="flex items-center gap-2 bg-[#292B35] px-4 py-2 rounded-lg border border-[#95C5C5]/20">
                            <span className="text-[#95C5C5] font-medium">Sort by:</span>
                            <select
                                className="px-4 py-2 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none hover:bg-[#95C5C5]/10 transition-colors duration-300"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="date">Date</option>
                                <option value="prizePool">Prize Pool</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Enhanced Event Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {isLoading ? (
                        <div className="text-[#95C5C5] text-center">Loading events...</div>
                    ) : filteredAndSortedEvents.length === 0 ? (
                        <div className="text-[#95C5C5] text-center">No events found</div>
                    ) : (
                        filteredAndSortedEvents.map(event => (
                            <div key={event.id} className="bg-[#E0E0E0] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#95C5C5]/50">
                                <div className="h-56 overflow-hidden relative">
                                    <img 
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x200';
                                        }}
                                    />
                                    <div className="absolute top-4 right-4 bg-[#EE8631] text-white px-4 py-2 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
                                        {event.game}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#292B35] to-transparent h-20"/>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-2xl font-bold text-[#292B35] hover:text-[#EE8631] transition-colors duration-300">{event.title}</h2>
                                        <div className="bg-[#292B35] text-[#EE8631] px-3 py-1 rounded-lg font-bold">
                                            {event.prizePool}
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <p className="text-[#292B35] flex items-center gap-2"><span className="text-[#EE8631]">📅</span> {event.date}</p>
                                        <p className="text-[#292B35] flex items-center gap-2"><span className="text-[#EE8631]">📍</span> {event.venue}</p>
                                        <p className="text-[#292B35] flex items-center gap-2"><span className="text-[#EE8631]">🎮</span> {event.format}</p>
                                    </div>
                                    <p className="text-[#292B35]/80 mb-4">{event.description}</p>
                                    <div className="flex gap-4">
                                        <button 
                                            className="flex-1 py-3 bg-[#95C5C5] text-white rounded-lg font-bold hover:bg-[#292B35] transition-colors duration-300 transform hover:scale-105"
                                            onClick={() => handleViewDetails(event.id)}
                                        >
                                            Register Now
                                        </button>
                                        <button 
                                            className="flex-1 py-3 bg-[#EE8631] text-white rounded-lg font-bold hover:bg-[#AD662F] transition-colors duration-300 transform hover:scale-105"
                                            onClick={() => handleViewDetails(event.id)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <RightSlider />
        </div>
    );
}

export default EsEvents;