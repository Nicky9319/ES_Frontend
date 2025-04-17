import React, { useState, useEffect } from 'react';
import { Bell, Search, Award, Users, Calendar, ChevronDown, Zap, Activity, Shield, Star, Trophy, Clock, Filter, X, Loader, PlusCircle } from 'lucide-react';

const gameImages = {
  'Valorant': {
    banner: 'https://cdn.oneesports.gg/cdn-data/2023/06/Valorant_Episode7_Artwork_Split.jpg'
  },
  'CS2': {
    banner: 'https://news.xbox.com/en-us/wp-content/uploads/sites/2/2024/01/Counter-Strike-2-c4bb7459e9dfed3d5549.jpg'
  },
  'Apex Legends': {
    banner: 'https://media.contentapi.ea.com/content/dam/apex-legends/common/articles/season-20/apex-legends-breakout-media-share.jpg.adapt.crop16x9.1455w.jpg'
  }
};

const mockTryouts = [
  {
    id: 1,
    title: 'Team Phantom - Valorant Duelist',
    teamBanner: gameImages['Valorant'].banner,
    type: '1v1',
    mode: 'Invite Only',
    skillMode: 'Predefined',
    positions: ['Duelist'],
    game: 'Valorant',
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
    teamBanner: gameImages['CS2'].banner,
    type: '5v5',
    mode: 'Limited (Max 10)',
    skillMode: 'Stat-based',
    positions: ['AWPer', 'IGL', 'Support', 'Entry', 'Lurker'],
    game: 'CS2',
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
    type: '3v3',
    mode: 'Open',
    skillMode: 'Stat-based',
    game: 'Apex Legends',
    teamBanner: gameImages['Apex Legends'].banner,
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
    type: '1v1',
    mode: 'Invite Only',
    skillMode: 'Predefined',
    game: 'CS2',
    teamBanner: gameImages['CS2'].banner,
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
    type: '5v5',
    mode: 'Limited',
    skillMode: 'Predefined',
    game: 'Valorant',
    teamBanner: gameImages['Valorant'].banner,
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

const PlatformInfo = () => (
  <div className="py-16 bg-[#292B35]/50 border-y border-[#95C5C5]/10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-[#E0E0E0]/80 max-w-2xl mx-auto">
          ES Tryout Hub connects competitive players with professional esports teams through a 
          structured tryout system. Teams can host custom tryouts and evaluate players based on 
          their performance and stats.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#292B35] p-6 rounded-xl border border-[#95C5C5]/20 hover:border-[#EE8631]/50 transition-all">
          <div className="w-12 h-12 rounded-lg bg-[#EE8631]/10 flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-[#EE8631]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Find Opportunities</h3>
          <p className="text-[#E0E0E0]/70">Search and filter tryouts based on your game, role, and skill level.</p>
        </div>

        <div className="bg-[#292B35] p-6 rounded-xl border border-[#95C5C5]/20 hover:border-[#EE8631]/50 transition-all">
          <div className="w-12 h-12 rounded-lg bg-[#95C5C5]/10 flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 text-[#95C5C5]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Show Your Skills</h3>
          <p className="text-[#E0E0E0]/70">Participate in skill-based evaluations or submit your existing competitive stats.</p>
        </div>

        <div className="bg-[#292B35] p-6 rounded-xl border border-[#95C5C5]/20 hover:border-[#EE8631]/50 transition-all">
          <div className="w-12 h-12 rounded-lg bg-[#EE8631]/10 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-[#EE8631]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Join Pro Teams</h3>
          <p className="text-[#E0E0E0]/70">Get selected based on your performance and start your professional journey.</p>
        </div>
      </div>
    </div>
  </div>
);

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
      <div className="bg-[#292B35] rounded-xl border border-[#95C5C5]/20 w-full max-w-3xl p-8 mx-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Host a Tryout</h3>
            <p className="text-[#E0E0E0]/70">Create a custom tryout for your team</p>
          </div>
          <button onClick={() => setShowHostModal(false)} className="p-2 hover:bg-[#95C5C5]/10 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(gameImages).map(game => (
              <button
                type="button"
                key={game}
                className="p-6 rounded-xl border border-[#95C5C5]/20 hover:border-[#EE8631] hover:bg-[#EE8631]/10 transition-all"
              >
                <span className="block text-lg font-medium mb-2">{game}</span>
                <span className="text-sm text-[#E0E0E0]/70">Select Game</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium">Type</label>
              <div className="bg-[#292B35] rounded-lg border border-[#95C5C5]/20 p-2">
                {['1v1', '5v5', '3v3', 'Custom'].map((type, i) => (
                  <button
                    key={type}
                    type="button"
                    className={`w-full p-2 rounded-lg text-center ${
                      i === 0 ? 'bg-[#EE8631] text-white' : 'hover:bg-[#95C5C5]/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium">Mode</label>
              <div className="bg-[#292B35] rounded-lg border border-[#95C5C5]/20 p-2">
                {['Open', 'Invite Only', 'Limited'].map((mode, i) => (
                  <button
                    key={mode}
                    type="button"
                    className={`w-full p-2 rounded-lg text-center ${
                      i === 0 ? 'bg-[#EE8631] text-white' : 'hover:bg-[#95C5C5]/10'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Requirements</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Rank', placeholder: 'e.g. Diamond+' },
                { label: 'K/D', placeholder: 'e.g. 1.5+' },
                { label: 'Win Rate', placeholder: 'e.g. 60%+' },
                { label: 'Playtime', placeholder: 'e.g. 1000hrs+' }
              ].map(field => (
                <div key={field.label} className="space-y-2">
                  <label className="block text-sm font-medium">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full bg-[#292B35] border border-[#95C5C5]/20 rounded-lg px-4 py-3 focus:border-[#EE8631] transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowHostModal(false)}
              className="px-6 py-3 rounded-lg border border-[#95C5C5]/20 hover:bg-[#95C5C5]/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#EE8631] hover:bg-[#AD662F] rounded-lg text-white"
            >
              Create Tryout
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const FilterSection = () => (
    <div className="bg-[#292B35]/90 rounded-xl border border-[#95C5C5]/20 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-2">Filter Tryouts</h3>
          <p className="text-[#E0E0E0]/70">Find the perfect opportunity that matches your skills</p>
        </div>
        <button 
          onClick={() => setActiveFilters({
            game: 'All Games',
            type: 'All Types',
            mode: 'All Modes',
            skillMode: 'All'
          })}
          className="px-4 py-2 text-sm text-[#95C5C5] hover:text-[#EE8631] border border-[#95C5C5]/20 rounded-lg hover:bg-[#95C5C5]/10 transition-all"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Game Selection</label>
            <div className="space-y-2">
              {Object.keys(gameImages).map(game => (
                <button
                  key={game}
                  onClick={() => handleFilterChange('game', game)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    activeFilters.game === game
                      ? 'bg-[#EE8631] text-white'
                      : 'hover:bg-[#292B35] border border-[#95C5C5]/20 hover:border-[#EE8631]/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeFilters.game === game ? 'bg-white' : 'bg-[#95C5C5]'}`} />
                  {game}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Match Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['1v1', '3v3', '5v5', 'Custom'].map(type => (
                <button
                  key={type}
                  onClick={() => handleFilterChange('type', type)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    activeFilters.type === type
                      ? 'bg-[#EE8631] text-white'
                      : 'hover:bg-[#292B35] border border-[#95C5C5]/20 hover:border-[#EE8631]/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Tryout Mode</label>
            <div className="space-y-2">
              {['Open', 'Invite Only', 'Limited'].map(mode => (
                <button
                  key={mode}
                  onClick={() => handleFilterChange('mode', mode)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    activeFilters.mode === mode
                      ? 'bg-[#EE8631] text-white'
                      : 'hover:bg-[#292B35] border border-[#95C5C5]/20 hover:border-[#EE8631]/50'
                  }`}
                >
                  {mode}
                  {activeFilters.mode === mode && <ChevronDown className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Skill Evaluation</label>
            <div className="grid grid-cols-2 gap-2">
              {['Predefined', 'Stat-based'].map(mode => (
                <button
                  key={mode}
                  onClick={() => handleFilterChange('skillMode', mode)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    activeFilters.skillMode === mode
                      ? 'bg-[#EE8631] text-white'
                      : 'hover:bg-[#292B35] border border-[#95C5C5]/20 hover:border-[#EE8631]/50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedFilters.length > 0 && (
        <div className="mt-8 pt-8 border-t border-[#95C5C5]/10">
          <div className="flex items-center gap-2 text-sm text-[#95C5C5] mb-3">
            <Filter className="w-4 h-4" />
            <span>Active Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
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
        </div>
      )}
    </div>
  );

  const renderTryoutCard = (tryout) => (
    <div className="relative h-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#292B35]/90 z-10"></div>
      <img 
        src={tryout.teamBanner} 
        alt="" 
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-4 z-20">
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
  );

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

      <PlatformInfo />

      <div className={`transform transition-all duration-300 ease-in-out overflow-hidden ${
        filterOpen 
          ? 'h-auto opacity-100 border-y border-[#95C5C5]/20 bg-[#292B35]/70 backdrop-blur-md'
          : 'h-0 opacity-0 border-y border-transparent'
      }`}>
        <div className={`max-w-7xl mx-auto px-4 py-6 transform transition-all duration-300 ${
          filterOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
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
                    {renderTryoutCard(tryout)}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 bg-[#292B35] text-[#E0E0E0]">
                          <Zap className="w-3 h-3" /> {tryout.type}
                        </span>
                        <span className="px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 bg-[#292B35] text-[#E0E0E0]">
                          <Users className="w-3 h-3" /> {tryout.mode}
                        </span>
                        <span className="px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 bg-[#292B35] text-[#E0E0E0]">
                          <Activity className="w-3 h-3" /> {tryout.skillMode}
                        </span>
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
                      <div>
                        <h3 className="text-lg font-bold text-[#E0E0E0]">{tryout.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-[#E0E0E0]">
                          <span>{tryout.game}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-[#E0E0E0] text-sm mb-4 line-clamp-2">{tryout.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 bg-[#292B35] text-[#E0E0E0]">
                        {tryout.type}
                      </span>
                      <span className="px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 bg-[#292B35] text-[#E0E0E0]">
                        {tryout.mode}
                      </span>
                      <span className="px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 bg-[#292B35] text-[#E0E0E0]">
                        {tryout.skillMode}
                      </span>
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