import { useState } from "react";
import {
  Calendar,
  Clock,
  Trophy,
  Target,
  Activity,
  ChevronRight,
  BarChart2,
  User,
  Users,
  Zap,
  Flame,
  Crown,
  Medal,
  Gamepad,
  ArrowUp,
  ThumbsUp,
  Award,
  Star,
} from "lucide-react";

export default function CompactEsportsDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample data for player stats
  const playerStats = [
    {
      id: 1,
      title: "Win Rate",
      value: "68%",
      change: "+2.4%",
      icon: <Trophy size={18} />,
    },
    {
      id: 2,
      title: "K/D Ratio",
      value: "3.2",
      change: "+0.4",
      icon: <Zap size={18} />,
    },
    {
      id: 3,
      title: "Stream Hours",
      value: "142h",
      change: "+6h",
      icon: <Flame size={18} />,
    },
  ];

  // Upcoming tournaments
  const tournaments = [
    {
      id: 1,
      title: "ESL Pro League",
      date: "Apr 20",
      prize: "$250K",
      important: true,
    },
    {
      id: 2,
      title: "DreamHack",
      date: "May 5",
      prize: "$100K",
      important: false,
    },
    {
      id: 3,
      title: "BLAST Premier",
      date: "May 15",
      prize: "$425K",
      important: true,
    },
  ];

  // Daily schedule
  const todaySchedule = [
    { id: 1, title: "Team Practice", time: "10:00", completed: true },
    { id: 2, title: "VOD Review", time: "13:00", completed: true },
    { id: 3, title: "Stream Session", time: "16:00", completed: false },
  ];

  // Performance metrics
  const performanceData = [65, 75, 90, 82, 88, 95, 78];

  // Team members
  const teamMembers = [
    {
      id: 1,
      name: "Alex 'Viper'",
      role: "Captain",
      avatar: "/api/placeholder/32/32",
      status: "online",
    },
    {
      id: 2,
      name: "Sam 'Blaze'",
      role: "Rifler",
      avatar: "/api/placeholder/32/32",
      status: "online",
    },
    {
      id: 3,
      name: "Taylor 'Ghost'",
      role: "AWPer",
      avatar: "/api/placeholder/32/32",
      status: "away",
    },
  ];

  // Calendar generation helpers
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date().getDate();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const days = [];
    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-600"></div>);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      const hasTournament = [4, 12, 15, 20, 21, 22, 23, 24, 25].includes(i);
      const hasStream = [2, 5, 8, 11, 14, 17, 19, 26, 29].includes(i);

      days.push(
        <div
          key={i}
          className={`flex justify-center items-center h-6 w-6 mx-auto rounded-full text-xs
          ${isToday ? "bg-[#EE8631] text-[#292B35] font-bold" : ""}
          ${
            hasTournament && !isToday
              ? "bg-[#95C5C5]/20 text-[#95C5C5] font-bold"
              : ""
          }
          ${
            hasStream && !hasTournament && !isToday
              ? "text-[#EE8631] font-bold"
              : ""
          }`}
        >
          {i}
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <button
            className="text-gray-400 text-xs"
            onClick={() => setCurrentDate(new Date(year, month - 1))}
          >
            ❮
          </button>
          <h3 className="font-medium text-gray-200 text-sm">
            {monthNames[month]} {year}
          </h3>
          <button
            className="text-gray-400 text-xs"
            onClick={() => setCurrentDate(new Date(year, month + 1))}
          >
            ❯
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          <div className="text-gray-500">S</div>
          <div className="text-gray-500">M</div>
          <div className="text-gray-500">T</div>
          <div className="text-gray-500">W</div>
          <div className="text-gray-500">T</div>
          <div className="text-gray-500">F</div>
          <div className="text-gray-500">S</div>
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#292B35] text-[#E0E0E0] p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="mr-3 bg-[#EE8631] p-1.5 rounded-lg">
            <Gamepad size={18} className="text-[#292B35]" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#95C5C5] to-[#EE8631] text-transparent bg-clip-text">
            NEXUS GAMING
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 p-1.5 rounded-lg bg-[#292B35] border border-[#95C5C5]/20">
            <Trophy size={14} className="text-[#95C5C5]" />
            <span className="text-xs">Rank #3</span>
          </div>
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#EE8631] flex items-center justify-center text-[#292B35] font-bold text-sm">
              VP
            </div>
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border-2 border-[#292B35]"></div>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Player Card */}
        <div className="bg-[#35383f] rounded-lg border border-[#95C5C5]/10 overflow-hidden shadow-lg">
          <div className="h-10 bg-gradient-to-r from-[#95C5C5]/70 to-[#EE8631]/70"></div>
          <div className="p-3 -mt-5">
            <div className="flex">
              <div className="w-16 h-16 rounded-lg bg-[#292B35] border-2 border-[#292B35] overflow-hidden">
                <img
                  src="/api/placeholder/64/64"
                  alt="Player Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3 mt-2">
                <div className="flex items-center">
                  <h2 className="text-base font-bold">InfinityX</h2>
                  <div className="ml-2 bg-[#95C5C5] text-[#292B35] text-xs px-1.5 py-0.5 rounded text-xs font-bold">
                    PRO
                  </div>
                </div>
                <p className="text-gray-400 text-xs">Victor Reynolds</p>
                <div className="mt-1 flex items-center text-[#EE8631] text-xs">
                  <Crown size={12} className="mr-1" />
                  <span className="font-medium">Team Captain</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-[#35383f] rounded-lg border border-[#95C5C5]/10 p-3 shadow-lg">
          <div className="flex items-center gap-1.5 mb-2">
            <BarChart2 className="text-[#95C5C5]" size={14} />
            <h2 className="font-medium text-sm">PERFORMANCE</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {playerStats.map((stat) => (
              <div key={stat.id} className="bg-[#292B35] rounded-lg p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-400 text-xs">{stat.title}</span>
                  <div className="text-[#95C5C5]">{stat.icon}</div>
                </div>
                <div className="flex items-end">
                  <span className="text-base font-bold">{stat.value}</span>
                  <span
                    className={`text-xs ml-1 ${
                      stat.change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-[#35383f] rounded-lg border border-[#95C5C5]/10 p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Clock className="text-[#95C5C5]" size={14} />
              <h2 className="font-medium text-sm">TODAY'S SCHEDULE</h2>
            </div>
            <span className="text-xs text-gray-400">Apr 14</span>
          </div>

          <div className="space-y-2">
            {todaySchedule.map((item) => (
              <div key={item.id} className="flex items-center text-sm">
                <div
                  className={`h-full w-1 rounded-full mr-2 ${
                    item.completed ? "bg-gray-600" : "bg-[#EE8631]"
                  }`}
                ></div>
                <div className="flex-grow">
                  <div
                    className={`text-xs font-medium ${
                      item.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Performance Chart */}
        <div className="bg-[#35383f] rounded-lg border border-[#95C5C5]/10 p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Activity className="text-[#95C5C5]" size={14} />
              <h2 className="font-medium text-sm">WEEKLY STATS</h2>
            </div>
            <span className="text-xs text-gray-400">Last 7 days</span>
          </div>

          <div className="flex items-end h-24 gap-1">
            {performanceData.map((value, index) => (
              <div key={index} className="flex-grow flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-[#EE8631] to-[#95C5C5] rounded opacity-80"
                  style={{ height: `${value}%` }}
                ></div>
                <div className="text-xs text-gray-400 mt-1">
                  {["M", "T", "W", "T", "F", "S", "S"][index]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-[#35383f] rounded-lg border border-[#95C5C5]/10 p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="text-[#EE8631]" size={14} />
              <h2 className="font-medium text-sm">TEAM CALENDAR</h2>
            </div>
          </div>
          {renderCalendar()}
          <div className="mt-2 flex space-x-3 text-xs">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#95C5C5] mr-1"></div>
              <span className="text-gray-400">Events</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#EE8631] mr-1"></div>
              <span className="text-gray-400">Stream</span>
            </div>
          </div>
        </div>

        {/* Upcoming Tournaments */}
        <div className="bg-[#35383f] rounded-lg border border-[#95C5C5]/10 p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Trophy className="text-[#EE8631]" size={14} />
              <h2 className="font-medium text-sm">TOURNAMENTS</h2>
            </div>
            <button className="text-[#95C5C5] text-xs flex items-center">
              View <ChevronRight size={12} />
            </button>
          </div>

          <div className="space-y-2">
            {tournaments.map((tournament) => (
              <div
                key={tournament.id}
                className={`flex items-center p-1.5 rounded ${
                  tournament.important ? "bg-[#EE8631]/10" : "bg-[#292B35]"
                }`}
              >
                <div
                  className={`p-1.5 rounded-full mr-2 ${
                    tournament.important
                      ? "bg-[#EE8631]/20 text-[#EE8631]"
                      : "bg-[#95C5C5]/10 text-[#95C5C5]"
                  }`}
                >
                  <Trophy size={14} />
                </div>
                <div className="flex-grow">
                  <div className="text-xs font-medium">{tournament.title}</div>
                  <div className="text-xs text-gray-400 flex justify-between">
                    <span>{tournament.date}</span>
                    <span className="font-medium text-[#95C5C5]">
                      {tournament.prize}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Roster */}
        <div className="bg-[#35383f] rounded-lg border border-[#95C5C5]/10 p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Users className="text-[#95C5C5]" size={14} />
              <h2 className="font-medium text-sm">TEAM ROSTER</h2>
            </div>
            <button className="text-[#EE8631] text-xs flex items-center">
              All <ChevronRight size={12} />
            </button>
          </div>

          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center p-1 hover:bg-[#292B35] rounded transition-colors"
              >
                <div className="relative mr-2">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-6 h-6 rounded"
                  />
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#35383f] ${
                      member.status === "online"
                        ? "bg-green-500"
                        : member.status === "away"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                </div>
                <div>
                  <div className="text-xs font-medium">{member.name}</div>
                  <div className="text-xs text-gray-400">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-[#35383f] rounded-lg border border-[#95C5C5]/10 p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Medal className="text-[#EE8631]" size={14} />
              <h2 className="font-medium text-sm">ACHIEVEMENTS</h2>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center p-1 bg-[#292B35] rounded">
              <div className="p-1.5 rounded-full bg-[#EE8631]/20 text-[#EE8631] mr-2">
                <Trophy size={12} />
              </div>
              <div>
                <div className="text-xs font-medium">Regional Champion</div>
                <div className="text-xs text-gray-400">Spring Series 2025</div>
              </div>
            </div>

            <div className="flex items-center p-1 bg-[#292B35] rounded">
              <div className="p-1.5 rounded-full bg-[#95C5C5]/20 text-[#95C5C5] mr-2">
                <Medal size={12} />
              </div>
              <div>
                <div className="text-xs font-medium">MVP Award</div>
                <div className="text-xs text-gray-400">DreamHack Open</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-[#35383f] rounded-lg border border-[#95C5C5]/10 p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Zap className="text-[#95C5C5]" size={14} />
              <h2 className="font-medium text-sm">QUICK STATS</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#292B35] p-2 rounded">
              <div className="text-xs text-gray-400">Total Matches</div>
              <div className="text-base font-bold">248</div>
            </div>
            <div className="bg-[#292B35] p-2 rounded">
              <div className="text-xs text-gray-400">Win Rate</div>
              <div className="text-base font-bold text-[#95C5C5]">72%</div>
            </div>
            <div className="bg-[#292B35] p-2 rounded">
              <div className="text-xs text-gray-400">Hours Played</div>
              <div className="text-base font-bold text-[#EE8631]">1,240</div>
            </div>
            <div className="bg-[#292B35] p-2 rounded">
              <div className="text-xs text-gray-400">Rankings</div>
              <div className="text-base font-bold flex items-center">
                #3 <Star size={12} className="ml-1 text-[#EE8631]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
