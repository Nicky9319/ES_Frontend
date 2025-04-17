import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Users,
  Trophy,
  Edit,
  Eye,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Grid,
  List,
  MapPin,
  Clock,
  HelpCircle,
  Monitor,
  AlertCircle,
} from "lucide-react";
import dummyEvents from "./dummyEvents.json";
import { useNavigate } from "react-router-dom";

export default function ManageEvents() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    game: "all",
    prize: "all",
    location: "all",
  });
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  // Load and transform event data from the JSON file
  useEffect(() => {
    try {
      // Process the raw events data from JSON
      const processedEvents = dummyEvents.EVENTS.map((event, index) => {
        // Parse the event date from the JSON date format
        const eventDate = new Date(event.EVENT_DATE.$date);
        const formattedDate = eventDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        // Determine event status based on date
        const now = new Date();
        let status = "Upcoming";
        if (eventDate < now) {
          status = "Past";
        } else if (Math.abs(eventDate - now) < 24 * 60 * 60 * 1000) {
          status = "Active";
        }

        // Calculate registrations based on NUMBER_OF_TEAMS if available
        const registeredTeams = Math.floor(
          Math.random() * event.NUMBER_OF_TEAMS
        );
        const registrations = `${registeredTeams}/${event.NUMBER_OF_TEAMS}`;

        return {
          id: event.EVENT_ID || `event-${index + 1}`,
          title: event.EVENT_NAME,
          date: formattedDate,
          game: `${event.GAME} - ${event.GAME_TYPE}`,
          registrations: registrations,
          prize: event.PRIZE_POOL,
          status: status,
          location: event.VENUE,
          image: event.IMAGE || "/api/placeholder/60/60",
          description: event.DESCRIPTION,
          deadline: new Date(
            event.REGISTRATION_DEADLINE.$date
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          eligibility: event.ELIGIBILITY,
          console: event.CONSOLE,
          format: event.FORMAT,
          contact: event.CONTACT_INFO,
          faq: event.FAQ,
          teamSize: event.NUMBER_OF_MEMBERS,
        };
      });

      setEvents(processedEvents);
    } catch (error) {
      console.error("Error loading event data:", error);
      // Fallback to sample data if JSON loading fails
      setEvents([
        {
          id: "EVT12345",
          title: "Spring Gaming Bash",
          date: "May 20, 2025",
          game: "Fortnite - Battle Royale",
          registrations: "12/16",
          prize: "$5,000",
          status: "Active",
          location: "Neon Arena, Game City",
          image: "/api/placeholder/60/60",
        },
        {
          id: "EVT12346",
          title: "Summer Apex Legends Cup",
          date: "June 15, 2025",
          game: "Apex Legends - Squads",
          registrations: "8/20",
          prize: "$3,500",
          status: "Upcoming",
          location: "Virtual Gaming Hub",
          image: "/api/placeholder/60/60",
        },
      ]);
    }
  }, []);

  const tabs = [
    { id: "all", label: "All Events" },
    { id: "upcoming", label: "Upcoming" },
    { id: "active", label: "Active Now" },
    { id: "past", label: "Past" },
  ];

  // Generate game options from the available events
  const games = [
    "all",
    ...new Set(events.map((event) => event.game.split(" - ")[0])),
  ];

  // Generate prize options
  const prizes = ["all", "Under $3,000", "$3,000-$5,000", "Over $5,000"];

  // Generate location options from the available events
  const locations = [
    "all",
    ...new Set(
      events.map((event) => {
        const venue = event.location.split(",")[0];
        return venue;
      })
    ),
  ];

  // Custom styles based on the color palette
  const styles = {
    background: "#292B35",
    cardBackground: "#1e2028",
    primary: "#95C5C5",
    secondary: "#EE8631",
    tertiary: "#AD662F",
    text: "#E0E0E0",
    textSecondary: "#a0aec0",
    cardHover: "#292e3d",
  };

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Filter events based on active tab and filters
  const filteredEvents = events
    .filter(
      (event) =>
        activeTab === "all" ||
        event.status.toLowerCase() === activeTab.toLowerCase()
    )
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.game.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (event) => filters.game === "all" || event.game.includes(filters.game)
    )
    .filter((event) => {
      if (filters.prize === "all") return true;
      const prizeAmount = parseFloat(
        event.prize.replace("$", "").replace(",", "")
      );
      if (filters.prize === "Under $3,000") return prizeAmount < 3000;
      if (filters.prize === "$3,000-$5,000")
        return prizeAmount >= 3000 && prizeAmount <= 5000;
      if (filters.prize === "Over $5,000") return prizeAmount > 5000;
      return true;
    })
    .filter(
      (event) =>
        filters.location === "all" || event.location.includes(filters.location)
    );

  // Card view component with expanded event details
  const EventCard = ({ event }) => (
    <div
      className="rounded-xl overflow-hidden transition-transform duration-300 hover:scale-102 hover:shadow-xl cursor-pointer"
      style={{
        backgroundColor: styles.cardBackground,
        borderColor: styles.background,
      }}
      onClick={() => {
        navigate("/view-event-info");
      }}
    >
      <div className="h-40 relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/400/200";
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 p-2 text-white"
          style={{ backgroundColor: "rgba(30, 32, 40, 0.8)" }}
        >
          <span
            className="px-2 py-1 rounded-md text-xs inline-block"
            style={{
              backgroundColor:
                event.status === "Active"
                  ? "rgba(149, 197, 197, 0.2)"
                  : event.status === "Upcoming"
                  ? "rgba(238, 134, 49, 0.2)"
                  : "rgba(173, 102, 47, 0.2)",
              color:
                event.status === "Active"
                  ? styles.primary
                  : event.status === "Upcoming"
                  ? styles.secondary
                  : styles.tertiary,
            }}
          >
            {event.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2" style={{ color: styles.text }}>
          {event.title}
        </h3>

        <div className="space-y-2">
          <div
            className="flex items-center text-sm"
            style={{ color: styles.textSecondary }}
          >
            <Calendar size={14} className="mr-2" />
            {event.date}
          </div>
          <div
            className="flex items-center text-sm"
            style={{ color: styles.textSecondary }}
          >
            <Trophy size={14} className="mr-2" />
            {event.game}
          </div>
          <div
            className="flex items-center text-sm"
            style={{ color: styles.textSecondary }}
          >
            <Users size={14} className="mr-2" />
            {event.registrations} Teams
          </div>
          {event.location && (
            <div
              className="flex items-center text-sm"
              style={{ color: styles.textSecondary }}
            >
              <MapPin size={14} className="mr-2" />
              {event.location}
            </div>
          )}
          {event.deadline && (
            <div
              className="flex items-center text-sm"
              style={{ color: styles.textSecondary }}
            >
              <Clock size={14} className="mr-2" />
              Registration ends: {event.deadline}
            </div>
          )}
        </div>

        <div
          className="mt-4 pt-4 border-t flex justify-between items-center"
          style={{ borderColor: styles.background }}
        >
          <div style={{ color: styles.primary }} className="font-bold">
            {event.prize}
          </div>
          <div className="flex gap-2">
            {/* <button
              className="p-2 rounded-md transition-colors"
              style={{
                backgroundColor: "rgba(149, 197, 197, 0.1)",
                color: styles.primary,
              }}
            >
              <Eye size={16} />
            </button> */}
            {/* <button
              className="p-2 rounded-md transition-colors"
              style={{
                backgroundColor: "rgba(238, 134, 49, 0.1)",
                color: styles.secondary,
              }}
            >
              <Edit size={16} />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: styles.background }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: styles.text }}>
            Manage Your Events
          </h1>
          <button
            className="px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: styles.primary,
              color: styles.background,
            }}
            onClick={() => (window.location.href = "/create-event")}
          >
            <Plus size={20} />
            <span className="">Create Event</span>
          </button>
        </div>

        {/* Events Overview */}
        <div
          className="rounded-xl  overflow-hidden mb-8"
          style={{
            // backgroundColor: styles.cardBackground,
            borderColor: styles.background,
          }}
        >
          {/* Tabs */}
          <div
            className="flex border-b"
            style={{ borderColor: styles.background }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className="px-6 py-4 font-medium text-sm focus:outline-none"
                style={{
                  color:
                    activeTab === tab.id
                      ? styles.primary
                      : styles.textSecondary,
                  borderBottom:
                    activeTab === tab.id
                      ? `2px solid ${styles.primary}`
                      : "none",
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search and View Options */}
          <div
            className="p-6 pl-2 border-b flex items-center justify-between"
            style={{ borderColor: styles.background }}
          >
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search your events..."
                className="w-full rounded-lg px-4 py-3 border-white border pl-10 focus:outline-none"
                style={{
                  backgroundColor: styles.background,
                  color: styles.text,
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute top-3.5 left-3"
                style={{ color: styles.textSecondary }}
                size={18}
              />
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  className="px-4 py-3 rounded-lg flex items-center gap-2"
                  style={{
                    backgroundColor: filterOpen
                      ? styles.primary
                      : styles.background,
                    color: filterOpen ? styles.background : styles.text,
                  }}
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter size={16} />
                  <span>Filter</span>
                </button>

                {filterOpen && (
                  <div
                    className="absolute right-0 top-12 p-4 rounded-lg shadow-xl z-10 w-64"
                    style={{ backgroundColor: styles.cardBackground }}
                  >
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-medium"
                        style={{ color: styles.text }}
                      >
                        Game
                      </label>
                      <select
                        className="w-full p-2 rounded text-sm"
                        style={{
                          backgroundColor: styles.background,
                          color: styles.text,
                        }}
                        value={filters.game}
                        onChange={(e) =>
                          setFilters({ ...filters, game: e.target.value })
                        }
                      >
                        {games.map((game) => (
                          <option key={game} value={game}>
                            {game === "all" ? "All Games" : game}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-medium"
                        style={{ color: styles.text }}
                      >
                        Prize Pool
                      </label>
                      <select
                        className="w-full p-2 rounded text-sm"
                        style={{
                          backgroundColor: styles.background,
                          color: styles.text,
                        }}
                        value={filters.prize}
                        onChange={(e) =>
                          setFilters({ ...filters, prize: e.target.value })
                        }
                      >
                        {prizes.map((prize) => (
                          <option key={prize} value={prize}>
                            {prize === "all" ? "All Prizes" : prize}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-medium"
                        style={{ color: styles.text }}
                      >
                        Location
                      </label>
                      <select
                        className="w-full p-2 rounded text-sm"
                        style={{
                          backgroundColor: styles.background,
                          color: styles.text,
                        }}
                        value={filters.location}
                        onChange={(e) =>
                          setFilters({ ...filters, location: e.target.value })
                        }
                      >
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location === "all" ? "All Locations" : location}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-between">
                      <button
                        className="px-3 py-1 rounded text-sm"
                        style={{
                          backgroundColor: styles.background,
                          color: styles.text,
                        }}
                        onClick={() =>
                          setFilters({
                            game: "all",
                            prize: "all",
                            location: "all",
                          })
                        }
                      >
                        Reset
                      </button>
                      <button
                        className="px-3 py-1 rounded text-sm"
                        style={{
                          backgroundColor: styles.primary,
                          color: styles.background,
                        }}
                        onClick={() => setFilterOpen(false)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="flex border rounded-lg overflow-hidden"
                style={{ borderColor: styles.background }}
              >
                <button
                  className="px-3 py-2"
                  style={{
                    backgroundColor:
                      viewMode === "list" ? styles.primary : styles.background,
                    color:
                      viewMode === "list" ? styles.background : styles.text,
                  }}
                  onClick={() => setViewMode("list")}
                >
                  <List size={16} />
                </button>
                <button
                  className="px-3 py-2"
                  style={{
                    backgroundColor:
                      viewMode === "grid" ? styles.primary : styles.background,
                    color:
                      viewMode === "grid" ? styles.background : styles.text,
                  }}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Content based on view mode */}
          {viewMode === "list" ? (
            /* Table View */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    style={{ borderBottom: `1px solid ${styles.background}` }}
                  >
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: styles.textSecondary }}
                    >
                      Event
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: styles.textSecondary }}
                    >
                      Date
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: styles.textSecondary }}
                    >
                      Game
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: styles.textSecondary }}
                    >
                      Location
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: styles.textSecondary }}
                    >
                      Teams
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: styles.textSecondary }}
                    >
                      Prize Pool
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium"
                      style={{ color: styles.textSecondary }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="hover:bg-opacity-30 border-b"
                      style={{
                        borderColor: styles.background,
                        backgroundColor: "transparent",
                        color: styles.text,
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/api/placeholder/60/60";
                              }}
                            />
                          </div>
                          <span className="font-medium">{event.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {event.date}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {event.game}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {event.registrations}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {event.prize}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="p-2 rounded-md transition-colors"
                          onClick={() => (window.location.href = "/event-info")}
                          style={{
                            backgroundColor: "rgba(149, 197, 197, 0.1)",
                            color: styles.primary,
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="p-2 rounded-md transition-colors"
                          style={{
                            backgroundColor: "rgba(238, 134, 49, 0.1)",
                            color: styles.secondary,
                          }}
                          onClick={() => (window.location.href = "/")}
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Grid Card View */
            <div className="p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          <div
            className="px-6 py-4 flex items-center justify-between border-t"
            style={{ borderColor: styles.background }}
          >
            <div className="text-sm" style={{ color: styles.textSecondary }}>
              Showing{" "}
              <span className="font-medium">{filteredEvents.length}</span> of{" "}
              <span className="font-medium">{events.length}</span> events
            </div>
            {/* <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-md"
                style={{
                  backgroundColor: styles.background,
                  color: styles.text,
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="px-3 py-1 rounded-md font-medium"
                style={{
                  backgroundColor: styles.primary,
                  color: styles.background,
                }}
              >
                1
              </button>
              <button
                className="px-3 py-1 rounded-md"
                style={{
                  backgroundColor: styles.background,
                  color: styles.text,
                }}
              >
                2
              </button>
              <button
                className="p-2 rounded-md"
                style={{
                  backgroundColor: styles.background,
                  color: styles.text,
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
