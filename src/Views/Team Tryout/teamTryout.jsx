import React, { useState, useEffect } from 'react';
import { Bell, Search, Award, Users, Calendar, ChevronDown, Zap, Activity, Shield, Star, Trophy, Clock, Filter } from 'lucide-react';

const mockTryouts = [
  {
    id: 1,
    title: 'Team Phantom - Valorant Duelist',
    teamLogo: '/api/placeholder/100/100',
    teamBanner: '/api/placeholder/800/200',
    type: '1v1',
    mode: 'Invite Only',
    skillMode: 'Predefined',
    positions: ['Duelist'],
    game: 'Valorant',
    gameIcon: '/api/placeholder/24/24',
    description: 'Seeking an aggressive duelist with exceptional entry fragging capabilities.',
    requirements: {
      rank: 'Immortal+',
      kd: '1.5+',
      winRate: '60%+',
      avgACS: '275+',
      playtime: '1000hrs+'
    },
    deadline: '2024-03-15',
    slots: 1,
    applications: 37,
    maxApplications: 50,
    isApplied: false,
    featured: true,
    teamStats: {
      wins: 156,
      losses: 43,
      tournaments: 12
    }
  },
  {
    id: 2,
    title: 'NightOwl Esports CS2 Team',
    teamLogo: '/api/placeholder/100/100',
    teamBanner: '/api/placeholder/800/200',
    type: '5v5',
    mode: 'Limited (Max 10)',
    skillMode: 'Stat-based',
    positions: ['AWPer', 'IGL', 'Support', 'Entry', 'Lurker'],
    game: 'CS2',
    gameIcon: '/api/placeholder/24/24',
    description: 'Building a professional CS2 roster. Top performers on leaderboard will be invited to final trials.',
    requirements: {
      rank: 'Global Elite',
      kd: '1.2+',
      winRate: '55%+',
      avgADR: '85+',
      playtime: '1500hrs+'
    },
    deadline: '2024-04-10',
    slots: 5,
    applications: 23,
    maxApplications: 50,
    isApplied: false,
    featured: true,
    teamStats: {
      wins: 89,
      losses: 34,
      tournaments: 7
    }
  },
  {
    id: 3,
    title: 'Apex Predator Hunt',
    teamLogo: '/api/placeholder/100/100',
    type: '3v3',
    mode: 'Open',
    skillMode: 'Stat-based',
    game: 'Apex Legends',
    gameIcon: '/api/placeholder/24/24',
    description: 'Seeking top fraggers for our competitive Apex team.',
    deadline: '2024-03-30',
    slots: 3,
    applications: 12,
    maxApplications: 40,
    isApplied: false,
    featured: false
  },
  {
    id: 4,
    title: 'CS2 Rifler Position',
    teamLogo: '/api/placeholder/100/100',
    type: '1v1',
    mode: 'Invite Only',
    skillMode: 'Predefined',
    game: 'CS2',
    gameIcon: '/api/placeholder/24/24',
    description: 'Looking for a consistent rifler to complete our roster.',
    deadline: '2024-04-05',
    slots: 1,
    applications: 8,
    maxApplications: 15,
    isApplied: false,
    featured: false
  },
  {
    id: 5,
    title: 'Valorant Controller Tryout',
    teamLogo: '/api/placeholder/100/100',
    type: '5v5',
    mode: 'Limited',
    skillMode: 'Predefined',
    game: 'Valorant',
    gameIcon: '/api/placeholder/24/24',
    description: 'Need a controller main with exceptional game sense.',
    deadline: '2024-04-02',
    slots: 1,
    applications: 19,
    maxApplications: 25,
    isApplied: true,
    featured: false
  }
];

const gameBackgrounds = {
  'Valorant': 'from-red-600/20 to-red-900/10',
  'CS2': 'from-yellow-600/20 to-yellow-900/10',
  'Apex Legends': 'from-red-800/20 to-red-950/10',
  'Default': 'from-gray-800/20 to-gray-900/10'
};

const TeamTryout = () => {
  const [tryouts, setTryouts] = useState(mockTryouts);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    game: 'All Games',
    type: 'All Types',
    mode: 'All Modes',
    skillMode: 'All'
  });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [activeFilters, searchQuery]);

  const handleApply = (id) => {
    setTryouts(prev =>
      prev.map(t =>
        t.id === id ? { ...t, isApplied: true, applications: t.applications + 1 } : t
      )
    );
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Filter functions
  const getFilteredTryouts = () => {
    return tryouts.filter(tryout => {
      const matchesSearch = searchQuery === '' || 
        tryout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tryout.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tryout.game.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGame = activeFilters.game === 'All Games' || tryout.game === activeFilters.game;
      const matchesType = activeFilters.type === 'All Types' || tryout.type === activeFilters.type;
      const matchesMode = activeFilters.mode === 'All Modes' || tryout.mode.includes(activeFilters.mode);
      const matchesSkillMode = activeFilters.skillMode === 'All' || tryout.skillMode === activeFilters.skillMode;
      
      return matchesSearch && matchesGame && matchesType && matchesMode && matchesSkillMode;
    });
  };

  const filteredTryouts = getFilteredTryouts();
  const featuredTryouts = filteredTryouts.filter(t => t.featured);
  const regularTryouts = filteredTryouts.filter(t => !t.featured);

  // Components
  const Badge = ({ children, variant = "default", className = "" }) => {
    const variantClasses = {
      default: "bg-gray-800 text-gray-200",
      primary: "bg-indigo-900/30 text-indigo-300 border border-indigo-700/50",
      success: "bg-green-900/30 text-green-300 border border-green-700/50",
      danger: "bg-red-900/30 text-red-300 border border-red-700/50",
      warning: "bg-amber-900/30 text-amber-300 border border-amber-700/50",
      info: "bg-blue-900/30 text-blue-300 border border-blue-700/50",
      mode: "bg-violet-900/30 text-violet-300 border border-violet-700/50",
      skill: "bg-teal-900/30 text-teal-300 border border-teal-700/50",
      type: "bg-orange-900/30 text-orange-300 border border-orange-700/50",
    };
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${variantClasses[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/10 to-gray-900 text-gray-200">
      {/* HUD-style top bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-indigo-400" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">TRYOUT HUB</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all">
                <Bell className="w-5 h-5 text-indigo-400" />
              </button>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search tryouts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Dynamic Background */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute h-96 w-96 -top-20 -left-20 bg-indigo-600 rounded-full filter blur-3xl"></div>
            <div className="absolute h-96 w-96 top-10 right-20 bg-purple-600 rounded-full filter blur-3xl"></div>
            <div className="absolute h-96 w-96 bottom-10 left-1/2 bg-blue-600 rounded-full filter blur-3xl"></div>
          </div>
        </div>
        
        <div className="absolute inset-0">
          <div className="grid grid-cols-6 grid-rows-3 gap-2 opacity-10 h-full w-full">
            {Array(18).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-black mb-3 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
              COMPETE & CONQUER
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-6">
            Join elite esports teams through skill-based tryouts and prove your worth
          </p>
          
          <div className="flex gap-3">
            <button onClick={toggleFilter} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-700 hover:bg-indigo-600 transition-all rounded-lg text-white font-medium shadow-lg shadow-indigo-700/20">
              <Filter className="w-4 h-4" />
              Filter Tryouts
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all rounded-lg text-white font-medium shadow-lg shadow-purple-700/20">
              Host a Tryout
            </button>
          </div>
        </div>
      </div>

      {/* Animated Filter Panel */}
      <div className={`bg-gray-900/70 backdrop-blur-md border-y border-indigo-500/20 transition-all duration-300 overflow-hidden ${filterOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Game</label>
              <select
                value={activeFilters.game}
                onChange={(e) => setActiveFilters(prev => ({ ...prev, game: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Games</option>
                <option>Valorant</option>
                <option>CS2</option>
                <option>Apex Legends</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
              <select
                value={activeFilters.type}
                onChange={(e) => setActiveFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Types</option>
                <option>1v1</option>
                <option>5v5</option>
                <option>3v3</option>
                <option>Custom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Mode</label>
              <select
                value={activeFilters.mode}
                onChange={(e) => setActiveFilters(prev => ({ ...prev, mode: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Modes</option>
                <option>Open</option>
                <option>Invite Only</option>
                <option>Limited</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Skill Evaluation</label>
              <select
                value={activeFilters.skillMode}
                onChange={(e) => setActiveFilters(prev => ({ ...prev, skillMode: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All</option>
                <option>Predefined</option>
                <option>Stat-based</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Featured Tryouts */}
        {featuredTryouts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Featured Opportunities</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredTryouts.map((tryout) => {
                const bgGradient = gameBackgrounds[tryout.game] || gameBackgrounds.Default;
                
                return (
                  <div
                    key={tryout.id}
                    className={`group relative overflow-hidden rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 bg-gradient-to-br ${bgGradient}`}
                  >
                    {/* Header/Banner */}
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 z-10"></div>
                      <img 
                        src={tryout.teamBanner} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img 
                              src={tryout.teamLogo} 
                              alt={tryout.title}
                              className="w-12 h-12 rounded-lg border-2 border-indigo-500/50"
                            />
                            <img 
                              src={tryout.gameIcon}
                              alt={tryout.game}
                              className="absolute -bottom-1 -right-1 w-6 h-6 rounded border border-indigo-500/50"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{tryout.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <span>{tryout.game}</span>
                              <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                              <div className="flex items-center gap-1">
                                <Trophy className="w-3 h-3 text-amber-400" />
                                <span>{tryout.teamStats?.tournaments || 0} tournaments</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Body */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="type"><Zap className="w-3 h-3" /> {tryout.type}</Badge>
                        <Badge variant="mode"><Users className="w-3 h-3" /> {tryout.mode}</Badge>
                        <Badge variant="skill"><Activity className="w-3 h-3" /> {tryout.skillMode}</Badge>
                      </div>
                      
                      <p className="text-gray-300 mb-6">{tryout.description}</p>
                      
                      {tryout.requirements && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-indigo-400 mb-2">REQUIREMENTS</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {Object.entries(tryout.requirements).map(([key, value]) => (
                              <div key={key} className="bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-700/50">
                                <div className="text-xs text-gray-400 capitalize">{key}</div>
                                <div className="text-white font-medium">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-400">
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3" />
                              <span>Deadline: {tryout.deadline}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{tryout.applications}/{tryout.maxApplications} applicants</span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleApply(tryout.id)}
                          disabled={tryout.isApplied || tryout.mode === 'Invite Only'}
                          className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                            tryout.isApplied 
                              ? 'bg-green-600/20 text-green-400 border border-green-500/50' 
                              : tryout.mode === 'Invite Only'
                                ? 'bg-gray-800/50 text-gray-400 border border-gray-700'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                          }`}
                        >
                          {tryout.isApplied ? 'Applied' : 
                            tryout.mode === 'Invite Only' ? 'Invite Only' : 'Apply Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Tryouts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Available Tryouts</h2>
            </div>
            <div className="text-sm text-gray-400">
              Showing {regularTryouts.length} opportunities
            </div>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-98' : 'opacity-100 scale-100'}`}>
            {regularTryouts.length > 0 ? regularTryouts.map((tryout) => {
              const bgGradient = gameBackgrounds[tryout.game] || gameBackgrounds.Default;
              
              return (
                <div
                  key={tryout.id}
                  className={`relative overflow-hidden rounded-xl border border-gray-800 hover:border-indigo-500/50 bg-gray-900/50 transition-all duration-300 group hover:translate-y-1`}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={tryout.teamLogo} 
                        alt={tryout.title}
                        className="w-10 h-10 rounded-lg border border-gray-800"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-white">{tryout.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <img 
                            src={tryout.gameIcon}
                            alt={tryout.game}
                            className="w-4 h-4 rounded"
                          />
                          <span>{tryout.game}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{tryout.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="type">{tryout.type}</Badge>
                      <Badge variant="mode">{tryout.mode}</Badge>
                      <Badge variant="skill">{tryout.skillMode}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Ends {tryout.deadline}</span>
                      </div>
                      
                      <button
                        onClick={() => handleApply(tryout.id)}
                        disabled={tryout.isApplied || tryout.mode === 'Invite Only'}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          tryout.isApplied 
                            ? 'bg-green-600/20 text-green-400 border border-green-500/50' 
                            : tryout.mode === 'Invite Only'
                              ? 'bg-gray-800 text-gray-400 border border-gray-700'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {tryout.isApplied ? 'Applied' : 
                          tryout.mode === 'Invite Only' ? 'Invite Only' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-3 py-16 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-800/50 rounded-full p-4 mb-4">
                  <Search className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">No tryouts found</h3>
                <p className="text-gray-500 max-w-md">Try adjusting your filters or search query to find more opportunities</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-indigo-900/20 border-t border-indigo-500/20 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-1">250+</div>
              <div className="text-indigo-400">Active Teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">1,450</div>
              <div className="text-indigo-400">Players Selected</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">85+</div>
              <div className="text-indigo-400">Tournaments Won</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">$1.2M</div>
              <div className="text-indigo-400">Prize Money</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamTryout;