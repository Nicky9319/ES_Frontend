import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';

function EsEvents() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGame, setSelectedGame] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const esportsEvents = [
        {
            id: 1,
            title: "ESL Pro League Season 18",
            game: "CS:GO",
            date: "Dec 15-20, 2023",
            venue: "Spodek Arena, Katowice",
            description: "Premier CS:GO tournament featuring top 24 teams competing for $850,000 prize pool.",
            prizePool: "$850,000",
            format: "Group Stage + Single Elimination",
            image: "https://example.com/csgo-tournament.jpg"
        },
        {
            id: 2,
            title: "Valorant Champions Tour 2024",
            game: "Valorant",
            date: "Jan 5-15, 2024",
            venue: "Mercedes-Benz Arena, Berlin",
            description: "The biggest Valorant tournament of the year with international teams battling for glory.",
            prizePool: "$1,000,000",
            format: "Double Elimination",
            image: "https://example.com/valorant-tour.jpg"
        },
        {
            id: 3,
            title: "Dota 2 Major Championship",
            game: "Dota 2",
            date: "Jan 20-28, 2024",
            venue: "Singapore Indoor Stadium",
            description: "Premier Dota 2 tournament featuring elite teams from all regions.",
            prizePool: "$500,000",
            format: "Round Robin + Playoffs",
            image: "https://example.com/dota2-major.jpg"
        },
        {
            id: 4,
            title: "League of Legends World Cup",
            game: "LoL",
            date: "Feb 1-15, 2024",
            venue: "T-Mobile Arena, Las Vegas",
            description: "The most prestigious LoL tournament with top teams from every region.",
            prizePool: "$2,000,000",
            format: "Group Stage + Double Elimination",
            image: "https://example.com/lol-worldcup.jpg"
        }
    ];

    // Extract unique games for filter dropdown
    const gameOptions = useMemo(() => 
        ['All Games', ...new Set(esportsEvents.map(event => event.game))],
        []);

    // Filter and sort events
    const filteredAndSortedEvents = useMemo(() => {
        let filtered = [...esportsEvents];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(event => 
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply game filter
        if (selectedGame && selectedGame !== 'All Games') {
            filtered = filtered.filter(event => event.game === selectedGame);
        }

        // Apply sorting
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(a.date.split('-')[0]) - new Date(b.date.split('-')[0]);
                case 'prizePool':
                    return parseInt(b.prizePool.replace(/[^0-9]/g, '')) - 
                           parseInt(a.prizePool.replace(/[^0-9]/g, ''));
                default:
                    return 0;
            }
        });
    }, [searchQuery, selectedGame, sortBy, esportsEvents]);

    return (
        <div className="min-h-screen bg-[#292B35] bg-opacity-95 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2395C5C5' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-bold text-[#95C5C5] text-center mb-8 tracking-wide">
                    <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                        Upcoming Events
                    </span>
                </h1>
                
                {/* Enhanced Filter Controls */}
                <div className="bg-[#292B35] p-6 rounded-xl shadow-lg mb-8 border border-[#95C5C5]/20">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search tournaments..."
                                    className="w-full px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none transition-colors duration-300 placeholder-[#292B35]/60"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <span className="absolute right-3 top-3 text-[#292B35]/60">🔍</span>
                            </div>
                        </div>
                        <div className="flex gap-4 flex-wrap md:flex-nowrap">
                            <select
                                className="px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none transition-colors duration-300 cursor-pointer hover:bg-[#95C5C5]/10"
                                value={selectedGame}
                                onChange={(e) => setSelectedGame(e.target.value)}
                            >
                                {gameOptions.map(game => (
                                    <option key={game} value={game}>{game}</option>
                                ))}
                            </select>
                            <div className="flex items-center gap-2">
                                <span className="text-[#95C5C5] font-medium">Sort:</span>
                                <select
                                    className="px-4 py-3 rounded-lg bg-[#E0E0E0] border-2 border-[#95C5C5]/50 focus:border-[#EE8631] focus:outline-none transition-colors duration-300 cursor-pointer hover:bg-[#95C5C5]/10"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="date">Date</option>
                                    <option value="prizePool">Prize Pool</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Event Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredAndSortedEvents.map(event => (
                        <div key={event.id} className="bg-[#E0E0E0] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#95C5C5]/50">
                            <div className="h-56 overflow-hidden relative">
                                <img 
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
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
                                    <button className="flex-1 py-3 bg-[#95C5C5] text-white rounded-lg font-bold hover:bg-[#292B35] transition-colors duration-300 transform hover:scale-105">
                                        Register Now
                                    </button>
                                    <button className="flex-1 py-3 bg-[#EE8631] text-white rounded-lg font-bold hover:bg-[#AD662F] transition-colors duration-300 transform hover:scale-105">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <RightSlider />
        </div>
    );
}

export default EsEvents;