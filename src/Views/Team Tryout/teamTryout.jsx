import React, { useState, useEffect } from 'react';
import { Bell, Search, Award, Users, Calendar, ChevronDown, Zap, Activity, Shield, Star, Trophy, Clock, Filter, X, Loader, PlusCircle } from 'lucide-react';

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
  'Valorant': `from-[#EE8631]/20 to-[#AD662F]/10`,
  'CS2': `from-[#95C5C5]/20 to-[#292B35]/10`,
  'Apex Legends': `from-[#EE8631]/20 to-[#292B35]/10`,
  'Default': `from-[#292B35]/20 to-[#292B35]/10`
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
  const [showHostModal, setShowHostModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [activeFilters, searchQuery]);

  useEffect(() => {
    setIsSearching(true);
    const debounce = setTimeout(() => {
      const results = tryouts.filter(tryout => {
        return tryout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               tryout.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               tryout.game.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setTryouts(searchQuery ? results : mockTryouts);
      setIsSearching(false);
    }, 300);
    
    return () => clearTimeout(debounce);
  }, [searchQuery]);

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

  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
    if (value !== 'All' && value !== 'All Games' && value !== 'All Types' && value !== 'All Modes') {
      setSelectedFilters(prev => [...prev.filter(f => f.key !== key), { key, value }]);
    } else {
      setSelectedFilters(prev => prev.filter(f => f.key !== key));
    }
  };

  const HostTryoutModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#292B35] rounded-xl border border-[#95C5C5]/20 w-full max-w-2xl p-6 mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#E0E0E0]">Host a Tryout</h3>
          <button 
            onClick={() => setShowHostModal(false)}
            className="p-2 hover:bg-[#95C5C5]/10 rounded-lg transition-all"
          >
            <X className="w-5 h-5 text-[#95C5C5]" />
          </button>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">Game</label>
              <select className="w-full bg-[#292B35] border border-[#95C5C5]/20 rounded-lg px-4 py-2.5 text-[#E0E0E0]">
                <option>Select Game</option>
                <option>Valorant</option>
                <option>CS2</option>
                <option>Apex Legends</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">Type</label>
              <select className="w-full bg-[#292B35] border border-[#95C5C5]/20 rounded-lg px-4 py-2.5 text-[#E0E0E0]">
                <option>1v1</option>
                <option>5v5</option>
                <option>3v3</option>
                <option>Custom</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#E0E0E0] mb-2">Requirements</label>
            <div className="grid grid-cols-2 gap-4">
              {['Rank', 'K/D', 'Win Rate', 'Playtime'].map(req => (
                <div key={req} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={req}
                    className="w-full bg-[#292B35] border border-[#95C5C5]/20 rounded-lg px-4 py-2.5 text-[#E0E0E0]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowHostModal(false)}
              className="px-4 py-2 border border-[#95C5C5]/20 rounded-lg text-[#E0E0E0] hover:bg-[#95C5C5]/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#EE8631] hover:bg-[#AD662F] rounded-lg text-[#E0E0E0]"
            >
              Create Tryout
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const FilterSection = () => (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {selectedFilters.map(({ key, value }) => (
          <div
            key={key}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#EE8631]/10 text-[#EE8631] rounded-full text-sm"
          >
            <span>{value}</span>
            <button
              onClick={() => handleFilterChange(key, key === 'game' ? 'All Games' : 'All')}
              className="hover:text-[#AD662F]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <select
          value={activeFilters.game}
          onChange={(e) => handleFilterChange('game', e.target.value)}
          className="w-full bg-[#292B35] border border-[#95C5C5]/20 rounded-lg px-4 py-2.5 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EE8631]"
        >
          <option>All Games</option>
          <option>Valorant</option>
          <option>CS2</option>
          <option>Apex Legends</option>
        </select>
        <select
          value={activeFilters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="w-full bg-[#292B35] border border-[#95C5C5]/20 rounded-lg px-4 py-2.5 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EE8631]"
        >
          <option>All Types</option>
          <option>1v1</option>
          <option>5v5</option>
          <option>3v3</option>
          <option>Custom</option>
        </select>
        <select
          value={activeFilters.mode}
          onChange={(e) => handleFilterChange('mode', e.target.value)}
          className="w-full bg-[#292B35] border border-[#95C5C5]/20 rounded-lg px-4 py-2.5 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EE8631]"
        >
          <option>All Modes</option>
          <option>Open</option>
          <option>Invite Only</option>
          <option>Limited</option>
        </select>
        <select
          value={activeFilters.skillMode}
          onChange={(e) => handleFilterChange('skillMode', e.target.value)}
          className="w-full bg-[#292B35] border border-[#95C5C5]/20 rounded-lg px-4 py-2.5 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EE8631]"
        >
          <option>All</option>
          <option>Predefined</option>
          <option>Stat-based</option>
        </select>
      </div>
    </div>
  );

  const SearchSection = () => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {isSearching ? (
          <Loader className="h-4 w-4 text-[#95C5C5] animate-spin" />
        ) : (
          <Search className="h-4 w-4 text-[#95C5C5]" />
        )}
      </div>
      <input 
        type="text" 
        placeholder="Search tryouts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 w-full md:w-64 bg-[#292B35] rounded-lg border border-[#95C5C5]/20 focus:outline-none focus:ring-2 focus:ring-[#EE8631]"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#95C5C5] hover:text-[#EE8631]"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  const Badge = ({ children, variant = "default", className = "" }) => {
    const variantClasses = {
      default: "bg-[#292B35] text-[#E0E0E0]",
      primary: "bg-[#95C5C5]/30 text-[#95C5C5] border border-[#95C5C5]/50",
      success: "bg-[#95C5C5]/20 text-[#95C5C5] border border-[#95C5C5]/50",
      danger: "bg-[#EE8631]/20 text-[#EE8631] border border-[#EE8631]/50",
      warning: "bg-[#AD662F]/20 text-[#AD662F] border border-[#AD662F]/50",
      mode: "bg-[#292B35]/30 text-[#95C5C5] border border-[#95C5C5]/50",
      skill: "bg-[#292B35]/30 text-[#95C5C5] border border-[#95C5C5]/50",
      type: "bg-[#292B35]/30 text-[#EE8631] border border-[#EE8631]/50",
    };
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${variantClasses[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#292B35] via-[#292B35]/90 to-[#292B35] text-[#E0E0E0]">
      {showHostModal && <HostTryoutModal />}
      
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#292B35]/80 border-b border-[#95C5C5]/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#95C5C5]" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">TRYOUT HUB</h1>
            </div>
            <div className="flex items-center gap-4">
              <SearchSection />
              <button
                onClick={() => setShowHostModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#EE8631] hover:bg-[#AD662F] rounded-lg text-[#E0E0E0] transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden md:inline">Host Tryout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#95C5C5]/30 to-[#292B35]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute h-96 w-96 -top-20 -left-20 bg-[#EE8631] rounded-full filter blur-3xl"></div>
            <div className="absolute h-96 w-96 top-10 right-20 bg-[#AD662F] rounded-full filter blur-3xl"></div>
            <div className="absolute h-96 w-96 bottom-10 left-1/2 bg-[#95C5C5] rounded-full filter blur-3xl"></div>
          </div>
        </div>
        
        <div className="absolute inset-0">
          <div className="grid grid-cols-6 grid-rows-3 gap-2 opacity-10 h-full w-full">
            {Array(18).fill(0).map((_, i) => (
              <div key={i} className="bg-[#292B35] rounded-lg"></div>
            ))}
          </div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-black mb-3 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#95C5C5] via-[#EE8631] to-[#95C5C5]">
              COMPETE & CONQUER
            </span>
          </h1>
          <p className="text-[#E0E0E0] text-lg max-w-2xl mb-6">
            Join elite esports teams through skill-based tryouts and prove your worth
          </p>
          
          <div className="flex gap-3">
            <button onClick={toggleFilter} className="flex items-center gap-2 px-5 py-2.5 bg-[#EE8631] hover:bg-[#AD662F] transition-all rounded-lg text-[#E0E0E0] font-medium shadow-lg shadow-[#EE8631]/20">
              <Filter className="w-4 h-4" />
              Filter Tryouts
            </button>
            <button
              onClick={() => setShowHostModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#EE8631] to-[#AD662F] hover:from-[#AD662F] hover:to-[#EE8631] transition-all rounded-lg text-[#E0E0E0] font-medium shadow-lg shadow-[#AD662F]/20"
            >
              Host a Tryout
            </button>
          </div>
        </div>
      </div>

      <div className={`bg-[#292B35]/70 backdrop-blur-md border-y border-[#95C5C5]/20 transition-all duration-300 overflow-hidden ${filterOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <FilterSection />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Featured Tryouts */}
        {tryouts.filter(t => t.featured).length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-[#EE8631]" />
              <h2 className="text-xl font-bold text-[#E0E0E0]">Featured Opportunities</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tryouts.filter(t => t.featured).map((tryout) => {
                const bgGradient = gameBackgrounds[tryout.game] || gameBackgrounds.Default;
                
                return (
                  <div
                    key={tryout.id}
                    className={`group relative overflow-hidden rounded-xl border border-[#95C5C5]/20 hover:border-[#95C5C5]/50 transition-all duration-300 bg-gradient-to-br ${bgGradient}`}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#292B35]/90 z-10"></div>
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
                              className="w-12 h-12 rounded-lg border-2 border-[#95C5C5]/50"
                            />
                            <img 
                              src={tryout.gameIcon}
                              alt={tryout.game}
                              className="absolute -bottom-1 -right-1 w-6 h-6 rounded border border-[#95C5C5]/50"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[#E0E0E0]">{tryout.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-[#E0E0E0]">
                              <span>{tryout.game}</span>
                              <span className="w-1 h-1 rounded-full bg-[#95C5C5]"></span>
                              <div className="flex items-center gap-1">
                                <Trophy className="w-3 h-3 text-[#EE8631]" />
                                <span>{tryout.teamStats?.tournaments || 0} tournaments</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="type"><Zap className="w-3 h-3" /> {tryout.type}</Badge>
                        <Badge variant="mode"><Users className="w-3 h-3" /> {tryout.mode}</Badge>
                        <Badge variant="skill"><Activity className="w-3 h-3" /> {tryout.skillMode}</Badge>
                      </div>
                      
                      <p className="text-[#E0E0E0] mb-6">{tryout.description}</p>
                      
                      {tryout.requirements && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-[#95C5C5] mb-2">REQUIREMENTS</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {Object.entries(tryout.requirements).map(([key, value]) => (
                              <div key={key} className="bg-[#292B35]/50 rounded-lg px-3 py-2 border border-[#95C5C5]/50">
                                <div className="text-xs text-[#E0E0E0] capitalize">{key}</div>
                                <div className="text-[#E0E0E0] font-medium">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-[#E0E0E0]">
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
                              ? 'bg-[#95C5C5]/20 text-[#95C5C5] border border-[#95C5C5]/50' 
                              : tryout.mode === 'Invite Only'
                                ? 'bg-[#292B35]/50 text-[#E0E0E0]/50 border border-[#95C5C5]/20'
                                : 'bg-[#EE8631] hover:bg-[#AD662F] text-[#E0E0E0]'
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

        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#95C5C5]" />
              <h2 className="text-xl font-bold text-[#E0E0E0]">Available Tryouts</h2>
            </div>
            <div className="text-sm text-[#E0E0E0]">
              Showing {tryouts.filter(t => !t.featured).length} opportunities
            </div>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-98' : 'opacity-100 scale-100'}`}>
            {tryouts.filter(t => !t.featured).length > 0 ? tryouts.filter(t => !t.featured).map((tryout) => {
              const bgGradient = gameBackgrounds[tryout.game] || gameBackgrounds.Default;
              
              return (
                <div
                  key={tryout.id}
                  className={`relative overflow-hidden rounded-xl border border-[#292B35] hover:border-[#95C5C5]/50 bg-[#292B35]/50 transition-all duration-300 group hover:translate-y-1`}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={tryout.teamLogo} 
                        alt={tryout.title}
                        className="w-10 h-10 rounded-lg border border-[#292B35]"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-[#E0E0E0]">{tryout.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-[#E0E0E0]">
                          <img 
                            src={tryout.gameIcon}
                            alt={tryout.game}
                            className="w-4 h-4 rounded"
                          />
                          <span>{tryout.game}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-[#E0E0E0] text-sm mb-4 line-clamp-2">{tryout.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="type">{tryout.type}</Badge>
                      <Badge variant="mode">{tryout.mode}</Badge>
                      <Badge variant="skill">{tryout.skillMode}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#E0E0E0]">
                        <Clock className="w-4 h-4" />
                        <span>Ends {tryout.deadline}</span>
                      </div>
                      
                      <button
                        onClick={() => handleApply(tryout.id)}
                        disabled={tryout.isApplied || tryout.mode === 'Invite Only'}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          tryout.isApplied 
                            ? 'bg-[#95C5C5]/20 text-[#95C5C5] border border-[#95C5C5]/50' 
                            : tryout.mode === 'Invite Only'
                              ? 'bg-[#292B35] text-[#E0E0E0]/50 border border-[#95C5C5]/20'
                              : 'bg-[#EE8631] hover:bg-[#AD662F] text-[#E0E0E0]'
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
                <div className="bg-[#292B35]/50 rounded-full p-4 mb-4">
                  <Search className="w-8 h-8 text-[#95C5C5]" />
                </div>
                <h3 className="text-xl font-bold text-[#E0E0E0] mb-2">No tryouts found</h3>
                <p className="text-[#E0E0E0] max-w-md">Try adjusting your filters or search query to find more opportunities</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-[#292B35] via-[#AD662F]/10 to-[#292B35] border-t border-[#95C5C5]/20 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-[#E0E0E0] mb-1">250+</div>
              <div className="text-[#95C5C5]">Active Teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#E0E0E0] mb-1">1,450</div>
              <div className="text-[#95C5C5]">Players Selected</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#E0E0E0] mb-1">85+</div>
              <div className="text-[#95C5C5]">Tournaments Won</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#E0E0E0] mb-1">$1.2M</div>
              <div className="text-[#95C5C5]">Prize Money</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamTryout;