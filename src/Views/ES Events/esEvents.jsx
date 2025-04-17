import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const EVENTS_SERVICE = import.meta.env.VITE_EVENTS_SERVICE;
console.log(EVENTS_SERVICE);
import {
  FaSearch,
  FaFilter,
  FaGamepad,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrophy,
  FaSort,
  FaChevronDown,
  FaList,
  FaTh,
} from "react-icons/fa";
import RightSlider from "../components/rightSlider";
import LeftSlider from "../components/leftSlider";
import { DatabaseZap } from "lucide-react";

function EsEvents() {
  const [AllEvents, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log(`http://${EVENTS_SERVICE}/Events/AllEvents`)
        const response = await fetch(`http://${EVENTS_SERVICE}/Events/AllEvents`);
        console.log(response)
        const data = await response.json();
        console.log(data)
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConsole, setSelectedConsole] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedGameType, setSelectedGameType] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const gameTypeOptions = ["All Types", "FPS", "Battle Royale", "Sports MMO"];
  const gamesByType = {
    FPS: ["Valorant", "Overwatch"],
    "Battle Royale": ["Fortnite", "PUBG", "Apex: Legends", "Garena Free Fire"],
    "Sports MMO": ["EA Sports FC 25"],
  };
  const consoleOptions = [
    "All Consoles",
    "PC",
    "PlayStation",
    "Xbox",
    "Mobile",
  ];
  const locationOptions = [
    "All Locations",
    "Delhi ",
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Chennai",
    "Pune",
  ];

  const handleGameTypeChange = (type) => {
    setSelectedGameType(type);
    setSelectedGame("");
  };

  const availableGames = useMemo(() => {
    if (!selectedGameType || selectedGameType === "All Types")
      return ["All Games"];
    return ["All Games", ...gamesByType[selectedGameType]];
  }, [selectedGameType]);

  const handleViewDetails = (eventId) => {
    navigate(`/event-info/${eventId}`);
  };

  const esportsEvents = useMemo(() => {
    if (!AllEvents?.EVENTS) return [];
    return AllEvents.EVENTS.map((event) => ({
      id: event.EVENT_ID,
      title: event.EVENT_NAME,
      game: event.GAME,
      gameType: event.GAME_TYPE,
      date: new Date(event.EVENT_DATE.$date || event.EVENT_DATE),
      venue: event.VENUE,
      description: event.DESCRIPTION,
      prizePool: event.PRIZE_POOL,
      format: event.FORMAT,
      console: event.CONSOLE,
      location: event.LOCATION,
      image: event.IMAGE || "https://via.placeholder.com/400x200",
    }));
  }, [AllEvents]);

  const parsePrizePool = (prizeStr) => {
    if (!prizeStr) return 0;
    try {
      return parseInt(prizeStr.replace(/[^0-9]/g, "")) || 0;
    } catch (e) {
      console.warn("Invalid prize pool format:", prizeStr);
      return 0;
    }
  };

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = [...esportsEvents];
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event?.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedConsole && selectedConsole !== "All Consoles") {
      filtered = filtered.filter((event) => event.console === selectedConsole);
    }
    if (selectedLocation && selectedLocation !== "All Locations") {
      filtered = filtered.filter(
        (event) => event.location === selectedLocation
      );
    }
    if (selectedGameType && selectedGameType !== "All Types") {
      filtered = filtered.filter(
        (event) => event.gameType === selectedGameType
      );
    }
    if (selectedGame && selectedGame !== "All Games") {
      filtered = filtered.filter((event) => event.game === selectedGame);
    }
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return a.date - b.date;
        case "prizePool":
          return parsePrizePool(b.prizePool) - parsePrizePool(a.prizePool);
        default:
          return 0;
      }
    });
  }, [
    searchQuery,
    selectedConsole,
    selectedLocation,
    selectedGameType,
    selectedGame,
    sortBy,
    esportsEvents,
  ]);

  if (!esportsEvents) {
    return (
      <div className="text-[#95C5C5] text-center p-8">
        No events data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#292B35] to-[#23242b] text-[#E0E0E0] pb-15">
      <LeftSlider />
      <div className="relative h-[38vh] md:h-[44vh] flex items-center justify-center bg-gradient-to-br from-[#23242b] via-[#292B35] to-[#1a1b20] overflow-hidden mb-10">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Esports Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#292B35]/90"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#95C5C5] drop-shadow-lg mb-4 tracking-tight">
            <span className="inline-block bg-[#292B35]/80 px-6 py-2 rounded-xl shadow-lg">
              Upcoming Esports Events
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#E0E0E0]/80 mb-4 font-medium">
            Discover, filter, and join the most exciting tournaments in the
            esports world.
          </p>
          <div className="flex gap-2 flex-row justify-center ">
            <button
              className="mt-2 px-8 py-3 bg-[#EE8631] text-white font-bold rounded-lg shadow-lg hover:bg-[#AD662F] transition-all duration-300 text-lg"
              onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
            >
              Browse Events
            </button>

            <button
              className="mt-2 px-8 py-3 bg-[#EE8631] text-white font-bold rounded-lg shadow-lg hover:bg-[#AD662F] transition-all duration-300 text-lg"
              onClick={() => navigate("/manage-events")}
            >
              Manage Events
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tournaments..."
              className="w-full px-5 py-4 rounded-lg bg-[#23242b] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none text-lg shadow-inner placeholder-[#95C5C5]/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#EE8631]">
              <FaSearch />
            </span>
          </div>
          <button
            className="md:hidden flex items-center gap-2 px-4 py-3 bg-[#292B35] border border-[#95C5C5]/30 rounded-lg text-[#95C5C5] font-medium hover:bg-[#23242b] transition"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
          <div className="flex items-center gap-2 bg-[#23242b] px-4 py-3 rounded-lg border border-[#95C5C5]/20">
            <span className="text-[#95C5C5] font-medium">Sort by</span>
            <select
              className="px-4 py-2 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none text-[#E0E0E0] hover:bg-[#95C5C5]/10 transition"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="prizePool">Prize Pool</option>
            </select>
            <span className="text-[#95C5C5]">
              <FaSort />
            </span>
          </div>
          <div className="flex items-center gap-1 bg-[#23242b] p-1 rounded-lg border border-[#95C5C5]/20">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-[#95C5C5] text-[#292B35]"
                  : "text-[#E0E0E0] hover:bg-[#292B35]"
              }`}
              title="Grid View"
            >
              <FaTh />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-[#95C5C5] text-[#292B35]"
                  : "text-[#E0E0E0] hover:bg-[#292B35]"
              }`}
              title="List View"
            >
              <FaList />
            </button>
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${
            showFilters ? "block" : "hidden md:block"
          } mb-8`}
        >
          <div className="bg-[#23242b] p-6 rounded-xl shadow-lg border border-[#95C5C5]/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[#95C5C5] font-semibold mb-2 flex items-center gap-2">
                  <FaGamepad /> Platform
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none text-[#E0E0E0] hover:bg-[#95C5C5]/10 transition"
                  value={selectedConsole}
                  onChange={(e) => setSelectedConsole(e.target.value)}
                >
                  {consoleOptions.map((console) => (
                    <option key={console} value={console}>
                      {console}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#95C5C5] font-semibold mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt /> Location
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none text-[#E0E0E0] hover:bg-[#95C5C5]/10 transition"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#95C5C5] font-semibold mb-2 flex items-center gap-2">
                  <FaTrophy /> Game Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none text-[#E0E0E0] hover:bg-[#95C5C5]/10 transition"
                  value={selectedGameType}
                  onChange={(e) => handleGameTypeChange(e.target.value)}
                >
                  {gameTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#95C5C5] font-semibold mb-2 flex items-center gap-2">
                  <FaGamepad /> Game
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none text-[#E0E0E0] hover:bg-[#95C5C5]/10 transition disabled:opacity-50"
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  disabled={
                    !selectedGameType || selectedGameType === "All Types"
                  }
                >
                  {availableGames.map((game) => (
                    <option key={game} value={game}>
                      {game}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {isLoading ? (
            <div className="col-span-full text-[#95C5C5] text-center py-16 text-xl">
              Loading events...
            </div>
          ) : filteredAndSortedEvents.length === 0 ? (
            <div className="col-span-full text-[#95C5C5] text-center py-16 text-xl">
              No events found
            </div>
          ) : (
            filteredAndSortedEvents.map((event) => (
              <div
                key={event.id}
                className={`relative bg-[#23242b] rounded-2xl shadow-xl border border-[#95C5C5]/10 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col ${
                  viewMode === "list" ? "md:flex-row" : ""
                }`}
              >
                <div
                  className={`${
                    viewMode === "list" ? "md:w-1/3" : "h-56"
                  } overflow-hidden relative`}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      viewMode === "list" ? "md:h-full" : "hover:scale-105"
                    }`}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-[#EE8631] text-white px-4 py-2 rounded-lg font-bold shadow-lg text-sm">
                    {event.game}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#23242b] to-transparent h-20" />
                </div>
                <div className={`flex-1 p-6 flex flex-col justify-between`}>
                  <div>
                    <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                      <h2 className="text-2xl font-bold text-[#95C5C5] hover:text-[#EE8631] transition-colors duration-300">
                        {event.title}
                      </h2>
                      <div className="bg-[#292B35] text-[#EE8631] px-3 py-1 rounded-lg font-bold text-sm flex items-center gap-1">
                        <FaTrophy /> {event.prizePool}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4 text-[#E0E0E0]/90 text-sm">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-[#EE8631]" />{" "}
                        {event.date.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#EE8631]" />{" "}
                        {event.venue}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaGamepad className="text-[#EE8631]" /> {event.format}
                      </div>
                    </div>
                    <p className="text-[#E0E0E0]/80 mb-4 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      className="flex-1 py-3 bg-[#95C5C5] text-[#23242b] rounded-lg font-bold hover:bg-[#292B35] hover:text-[#E0E0E0] transition-colors duration-300 transform hover:scale-105"
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
