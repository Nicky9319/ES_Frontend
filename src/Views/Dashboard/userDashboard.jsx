import { useState, useEffect } from "react";
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
  Gamepad,
  Award,
  CheckCircle,
  Circle,
  Flag,
  PlusCircle,
  CheckSquare,
  Square,
  Trash2,
  LineChart,
  Calendar as CalendarIcon,
} from "lucide-react";

// Import only the needed components from recharts
import {
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts/es6";

// Color constants for consistent styling
const COLORS = {
  primary: "#292B35",
  secondary: "#35383f",
  accent1: "#95C5C5",
  accent2: "#EE8631",
  accent3: "#AD662F",
  text: "#E0E0E0",
  textSecondary: "#A0A0A0",
};

// Generate dummy data
const generateDummyData = (days) => {
  const data = [];
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    data.push({
      date: date.toISOString().split("T")[0],
      avgCombatScore: 150 + Math.floor(Math.random() * 150),
      kdRatio: (0.8 + Math.random() * 2).toFixed(2),
      econRating: Math.floor(50 + Math.random() * 100),
      firstBloods: Math.floor(Math.random() * 5),
      matchesPlayed: Math.floor(1 + Math.random() * 5),
      winRate: Math.floor(40 + Math.random() * 60),
      headshots: Math.floor(30 + Math.random() * 40),
      agentPlayed: ["Jett", "Reyna", "Omen", "Killjoy", "Sage"][
        Math.floor(Math.random() * 5)
      ],
    });
  }

  return data;
};

// Generate a full year of data
const fullYearData = generateDummyData(365);

export default function UserDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("dashboard");
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Reach Diamond Rank", completed: true, date: "2023-04-01" },
    {
      id: 2,
      title: "Win Regional Tournament",
      completed: false,
      date: "2023-05-15",
    },
    {
      id: 3,
      title: "Reach 5000 Followers",
      completed: false,
      date: "2023-06-30",
    },
    {
      id: 4,
      title: "Achieve 75% Win Rate",
      completed: false,
      date: "2023-07-10",
    },
  ]);
  const [newMilestone, setNewMilestone] = useState({ title: "", date: "" });
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [calendarTasks, setCalendarTasks] = useState({
    "2023-04-14": [
      { id: 1, title: "Team Practice", time: "10:00", completed: true },
      { id: 2, title: "VOD Review", time: "13:00", completed: true },
      { id: 3, title: "Stream Session", time: "16:00", completed: false },
    ],
    "2023-04-15": [
      { id: 1, title: "Scrim vs Team Alpha", time: "11:00", completed: false },
      { id: 2, title: "Strategy Meeting", time: "14:00", completed: false },
    ],
    "2023-04-20": [
      { id: 1, title: "ESL Pro League Match", time: "19:00", completed: false },
    ],
  });
  const [selectedDay, setSelectedDay] = useState(formatDate(new Date()));
  const [newTask, setNewTask] = useState({ title: "", time: "" });
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Performance dashboard states
  const [timeRange, setTimeRange] = useState("last7days");
  const [data, setData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("avgCombatScore");

  // Time ranges mapping
  const timeRanges = {
    today: { label: "Today", days: 0 },
    yesterday: { label: "Yesterday", days: 1 },
    last7days: { label: "Last 7 Days", days: 7 },
    lastMonth: { label: "Last 1 Month", days: 30 },
    last6Months: { label: "Last 6 Months", days: 180 },
    lastYear: { label: "Last 1 Year", days: 365 },
  };

  // Metrics options
  const metrics = [
    { value: "avgCombatScore", label: "Avg Combat Score" },
    { value: "kdRatio", label: "K/D Ratio" },
    { value: "econRating", label: "Econ Rating" },
    { value: "firstBloods", label: "First Bloods" },
    { value: "winRate", label: "Win Rate" },
    { value: "headshots", label: "Headshots %" },
  ];

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

  // Upcoming events (replacing tournaments)
  const upcomingEvents = [
    {
      id: 1,
      title: "ESL Pro League",
      date: "2023-04-20",
      formattedDate: "Apr 20",
      prize: "$250K",
      important: true,
    },
    {
      id: 2,
      title: "DreamHack",
      date: "2023-05-05",
      formattedDate: "May 5",
      prize: "$100K",
      important: false,
    },
    {
      id: 3,
      title: "BLAST Premier",
      date: "2023-05-15",
      formattedDate: "May 15",
      prize: "$425K",
      important: true,
    },
    {
      id: 4,
      title: "Valorant Champions",
      date: "2023-04-10", // Past event
      formattedDate: "Apr 10",
      prize: "$300K",
      important: true,
    },
  ];

  // Filter to only get future events and today's events
  const today = formatDate(new Date());
  const futureEvents = upcomingEvents.filter((event) => event.date >= today);

  // Performance metrics
  const performanceData = {
    winRate: [65, 67, 70, 72, 75, 68, 70],
    kdRatio: [2.8, 3.0, 3.2, 3.1, 3.4, 3.2, 3.5],
    viewership: [1200, 1500, 1400, 1800, 2000, 2200, 2100],
    matches: [3, 2, 4, 3, 5, 3, 4],
  };

  // Player's teams (replacing team members)
  const playerTeams = [
    {
      id: 1,
      name: "Nexus Elite",
      role: "Captain",
      game: "Valorant",
      logo: "/api/placeholder/32/32",
      status: "active",
    },
    {
      id: 2,
      name: "Frontier Squad",
      role: "Member",
      game: "Apex Legends",
      logo: "/api/placeholder/32/32",
      status: "active",
    },
    {
      id: 3,
      name: "Midnight Gamers",
      role: "Sub",
      game: "CS:GO",
      logo: "/api/placeholder/32/32",
      status: "inactive",
    },
  ];

  // Get today's tasks from calendar data
  const todayTasks = calendarTasks[formatDate(new Date())] || [];

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `<span class="math-inline">\{year\}\-</span>{month}-${day}`;
  }

  useEffect(() => {
    // Filter data based on selected time range
    const filterData = () => {
      const days = timeRanges[timeRange].days;

      if (days === 0) {
        // Just today's data
        setData(fullYearData.slice(-1));
      } else if (days === 1) {
        // Just yesterday's data
        setData(fullYearData.slice(-2, -1));
      } else {
        // Last X days
        setData(fullYearData.slice(-(days + 1)));
      }
    };

    filterData();
  }, [timeRange]);

  // Calculate averages for the summary cards
  const calculateAverages = () => {
    if (data.length === 0)
      return {
        avgCombatScore: 0,
        kdRatio: 0,
        econRating: 0,
        firstBloods: 0,
        matchesPlayed: 0,
      };

    return {
      avgCombatScore: Math.round(
        data.reduce((sum, item) => sum + item.avgCombatScore, 0) / data.length
      ),
      kdRatio: (
        data.reduce((sum, item) => sum + parseFloat(item.kdRatio), 0) /
        data.length
      ).toFixed(2),
      econRating: Math.round(
        data.reduce((sum, item) => sum + item.econRating, 0) / data.length
      ),
      firstBloods: Math.round(
        data.reduce((sum, item) => sum + item.firstBloods, 0) / data.length
      ),
      matchesPlayed: data.reduce((sum, item) => sum + item.matchesPlayed, 0),
      winRate: Math.round(
        data.reduce((sum, item) => sum + item.winRate, 0) / data.length
      ),
    };
  };

  const averages = calculateAverages();

  // Component for section headers
  const SectionHeader = ({ icon, title, actionText, onAction }) => (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="text-[#95C5C5]">{icon}</div>
        <h2 className="font-semibold text-sm">{title}</h2>
      </div>
      {actionText && (
        <button
          className="text-[#EE8631] text-xs flex items-center"
          onClick={onAction}
        >
          {actionText} <ChevronRight size={12} />
        </button>
      )}
    </div>
  );

  // Component for stat cards
  const StatCard = ({
    title,
    value,
    change,
    icon,
    bgColor = "bg-[#292B35]",
  }) => (
    <div className={`${bgColor} rounded-lg p-2.5`}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-gray-400 text-xs">{title}</span>
        <div className="text-[#95C5C5]">{icon}</div>
      </div>
      <div className="flex items-end">
        <span className="text-base font-bold">{value}</span>
        {change && (
          <span
            className={`text-xs ml-1.5 ${
              change.startsWith("+") ? "text-green-400" : "text-red-400"
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );

  // Task component with completion toggle
  const TaskItem = ({ task, date, onToggle, onDelete }) => (
    <div className="flex items-center p-2 bg-[#292B35] rounded-lg group">
      <button onClick={() => onToggle(task.id, date)} className="mr-2.5">
        {task.completed ? (
          <CheckCircle size={16} className="text-[#95C5C5]" />
        ) : (
          <Circle size={16} className="text-gray-500" />
        )}
      </button>
      <div className="flex-grow">
        <div
          className={`text-sm font-medium ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </div>
        <div className="text-xs text-gray-500">{task.time}</div>
      </div>
      <button
        onClick={() => onDelete(task.id, date)}
        className="opacity-0 group-hover:opacity-100 text-red-400 transition-opacity"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );

  // Milestone component
  const MilestoneItem = ({ milestone, onToggle, onDelete }) => (
    <div className="flex items-start p-2 bg-[#292B35] rounded-lg mb-2 group">
      <button onClick={() => onToggle(milestone.id)} className="mt-0.5 mr-2.5">
        {milestone.completed ? (
          <CheckSquare size={16} className="text-[#EE8631]" />
        ) : (
          <Square size={16} className="text-gray-500" />
        )}
      </button>
      <div className="flex-grow">
        <div
          className={`text-sm font-medium ${
            milestone.completed ? "text-[#95C5C5]" : ""
          }`}
        >
          {milestone.title}
        </div>
        <div className="text-xs text-gray-500">Target: {milestone.date}</div>
      </div>
      <button
        onClick={() => onDelete(milestone.id)}
        className="opacity-0 group-hover:opacity-100 text-red-400 transition-opacity"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );

  // Handle milestone completion toggle
  const toggleMilestone = (id) => {
    setMilestones(
      milestones.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  // Handle milestone deletion
  const deleteMilestone = (id) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  // Handle adding new milestone
  const addMilestone = () => {
    if (newMilestone.title.trim() === "" || !newMilestone.date) return;

    const newId = Math.max(0, ...milestones.map((m) => m.id)) + 1;
    setMilestones([
      ...milestones,
      {
        id: newId,
        title: newMilestone.title,
        completed: false,
        date: newMilewMilestone.date,
      },
    ]);
    setNewMilestone({ title: "", date: "" });
    setShowMilestoneForm(false);
  };

  // Handle task completion toggle
  const toggleTask = (id, date) => {
    setCalendarTasks({
      ...calendarTasks,
      [date]: calendarTasks[date].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    });
  };

  // Handle task deletion
  const deleteTask = (id, date) => {
    setCalendarTasks({
      ...calendarTasks,
      [date]: calendarTasks[date].filter((task) => task.id !== id),
    });
  };

  // Add new task to calendar
  const addTask = () => {
    if (newTask.title.trim() === "" || !newTask.time) return;

    const tasksForDay = calendarTasks[selectedDay] || [];
    const newId =
      tasksForDay.length > 0
        ? Math.max(...tasksForDay.map((t) => t.id)) + 1
        : 1;

    setCalendarTasks({
      ...calendarTasks,
      [selectedDay]: [
        ...tasksForDay,
        {
          id: newId,
          title: newTask.title,
          time: newTask.time,
          completed: false,
        },
      ],
    });

    setNewTask({ title: "", time: "" });
    setShowTaskForm(false);
  };

  // Calendar rendering helpers
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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const days = [];
    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-600"></div>);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = formatDate(date);
      const isToday =
        i === today &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      const isSelected = dateString === selectedDay;
      const hasTasks =
        calendarTasks[dateString] && calendarTasks[dateString].length > 0;

      days.push(
        <div
          key={i}
          onClick={() => setSelectedDay(dateString)}
          className={`flex flex-col justify-center items-center h-9 w-9 mx-auto rounded-lg text-sm cursor-pointer
            ${isToday ? "bg-[#EE8631] text-[#292B35] font-bold" : ""}
            ${
              isSelected && !isToday
                ? "bg-[#95C5C5]/20 border border-[#95C5C5]"
                : ""
            }
            ${
              !isSelected && !isToday && hasTasks
                ? "border border-[#EE8631]/30"
                : ""
            }
            hover:bg-[#35383f]
          `}
        >
          {i}
          {hasTasks && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#EE8631] mt-0.5"></div>
          )}
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-3">
          <button
            className="text-gray-400 text-sm p-1 hover:bg-[#35383f] rounded"
            onClick={() => setCurrentDate(new Date(year, month - 1))}
          >
            ❮
          </button>
          <h3 className="font-medium text-gray-200 text-sm">
            {monthNames[month]} {year}
          </h3>
          <button
            className="text-gray-400 text-sm p-1 hover:bg-[#35383f] rounded"
            onClick={() => setCurrentDate(new Date(year, month + 1))}
          >
            ❯
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          <div className="text-gray-500 text-xs">S</div>
          <div className="text-gray-500 text-xs">M</div>
          <div className="text-gray-500 text-xs">T</div>
          <div className="text-gray-500 text-xs">W</div>
          <div className="text-gray-500 text-xs">T</div>
          <div className="text-gray-500 text-xs">F</div>
          <div className="text-gray-500 text-xs">S</div>
          {days}
        </div>
      </div>
    );
  };

  // Performance chart
  const PerformanceChart = ({ data, title, color, height = "h-24" }) => {
    const max = Math.max(...data);

    return (
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">{title}</span>
          <span className="text-xs font-medium" style={{ color }}>
            {data[data.length - 1]}
          </span>
        </div>
        <div className={`flex items-end ${height} gap-1`}>
          {data.map((value, index) => (
            <div key={index} className="flex-grow flex flex-col items-center">
              <div
                className="w-full rounded-sm"
                style={{
                  height: `${(value / max) * 100}%`,
                  backgroundColor: color,
                  opacity: 0.8,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Get agent usage data for pie chart
  const getAgentUsageData = () => {
    const agentCounts = {};
    data.forEach((match) => {
      agentCounts[match.agentPlayed] =
        (agentCounts[match.agentPlayed] || 0) + 1;
    });

    return Object.keys(agentCounts).map((agent) => ({
      name: agent,
      value: agentCounts[agent],
    }));
  };

  // Format date for x-axis
  const formatDateChart = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-[#292B35] text-[#E0E0E0] p-4">
      {/* Grid Layout - Rearranged */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Player and Stats Column - Left Column */}
        <div className="space-y-4">
          {/* Player Card */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 overflow-hidden shadow-lg">
            <div className="h-12 bg-gradient-to-r from-[#95C5C5]/60 to-[#EE8631]/60"></div>
            <div className="p-4 -mt-6">
              <div className="flex">
                <div className="w-18 h-18 rounded-xl bg-[#292B35] border-2 border-[#292B35] overflow-hidden">
                  <img
                    src="/api/placeholder/72/72"
                    alt="Player Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 mt-2">
                  <div className="flex items-center">
                    <h2 className="text-lg font-bold">UserName</h2>
                  </div>
                  <p className="text-gray-400 text-xs">TaglineOfPlayer</p>
                </div>
              </div>
            </div>
          </div>

          {/* My Teams (renamed from Team Roster) */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader
              icon={<Users size={16} />}
              title="MY TEAMS"
              onAction={() => {}}
            />

            <div className="space-y-3">
              {playerTeams.map((team) => (
                <div
                  key={team.id}
                  className={`flex items-center p-2.5 bg-[#292B35] hover:bg-[#292B35]/80 rounded-lg transition-colors ${
                    team.status === "inactive" ? "opacity-60" : ""
                  }`}
                >
                  <div className="relative mr-3">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-10 h-10 rounded-lg"
                    />
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#35383f] ${
                        team.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-medium">{team.name}</div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">{team.role}</span>
                      <span className="text-xs text-[#95C5C5]">
                        {team.game}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Tasks and Calendar */}
        <div className="space-y-4">
          {/* Today's Tasks */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader icon={<Clock size={16} />} title="TODAY'S TASKS" />

            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
              {todayTasks.length > 0 ? (
                todayTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    date={formatDate(new Date())}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <Clock size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No tasks scheduled for today</p>
                  <button
                    className="mt-2 text-xs text-[#EE8631]"
                    onClick={() => {
                      setSelectedDay(formatDate(new Date()));
                      setShowTaskForm(true);
                    }}
                  >
                    Add a task
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Calendar - Simplified Single Column */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader
              icon={<CalendarIcon size={16} />}
              title="MY CALENDAR"
            />
            {renderCalendar()}

            <div className="mt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-sm">
                  {new Date(selectedDay).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <button
                  onClick={() => setShowTaskForm(!showTaskForm)}
                  className="text-xs flex items-center text-[#EE8631]"
                >
                  {showTaskForm ? "Cancel" : "Add Task"}
                  {!showTaskForm && <PlusCircle size={12} className="ml-1" />}
                </button>
              </div>

              {showTaskForm && (
                <div className="mb-3 p-3 bg-[#292B35] rounded-lg">
                  <input
                    type="text"
                    placeholder="Task title"
                    className="w-full mb-2 p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <input
                      type="time"
                      className="flex-grow p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
                      value={newTask.time}
                      onChange={(e) =>
                        setNewTask({ ...newTask, time: e.target.value })
                      }
                    />
                    <button
                      onClick={addTask}
                      className="px-3 py-2 bg-[#EE8631] text-[#292B35] rounded font-medium text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                {(calendarTasks[selectedDay] || []).map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    date={selectedDay}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
                {(calendarTasks[selectedDay] || []).length === 0 &&
                  showTaskForm === false && (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No tasks for this day.
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Performance Overview */}
        <div className="space-y-4">
          {/* Performance Summary */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader
              icon={<BarChart2 size={16} />}
              title="PERFORMANCE SUMMARY"
            />
            <div className="grid grid-cols-2 gap-2.5">
              <StatCard
                title="Avg. Combat Score"
                value={averages.avgCombatScore}
                icon={<Target size={18} />}
              />
              <StatCard
                title="K/D Ratio"
                value={averages.kdRatio}
                icon={<Zap size={18} />}
              />
              <StatCard
                title="Econ Rating"
                value={averages.econRating}
                icon={<Activity size={18} />}
              />
              <StatCard
                title="First Bloods"
                value={averages.firstBloods}
                icon={<Flame size={18} />}
              />
              <StatCard
                title="Matches Played"
                value={averages.matchesPlayed}
                icon={<Gamepad size={18} />}
              />
              <StatCard
                title="Win Rate"
                value={`${averages.winRate}%`}
                icon={<Trophy size={18} />}
              />
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="text-[#95C5C5]">
                  <LineChart size={16} />
                </div>
                <h2 className="font-semibold text-sm">PERFORMANCE TREND</h2>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-400 text-xs flex items-center hover:text-gray-300"
                >
                  {timeRanges[timeRange].label}
                  <ChevronRight size={12} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#292B35] border border-[#95C5C5]/20 rounded-md shadow-lg z-10">
                    {Object.entries(timeRanges).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setTimeRange(key);
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-xs text-gray-400 hover:bg-[#35383f] ${
                          key === timeRange ? "font-semibold" : ""
                        }`}
                      >
                        {value.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsLineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#35383f" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDateChart}
                  stroke="#A0A0A0"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="#A0A0A0" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.secondary,
                    color: COLORS.text,
                  }}
                  itemStyle={{ color: COLORS.text }}
                />
                <Legend wrapperStyle={{ bottom: 0 }} />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={COLORS.accent1}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                  name={metrics.find((m) => m.value === selectedMetric)?.label}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
            <div className="mt-2">
              <select
                className="bg-[#292B35] border border-[#95C5C5]/20 rounded p-2 text-xs text-gray-400 w-full"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                {metrics.map((metric) => (
                  <option key={metric.value} value={metric.value}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Agent Usage */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader icon={<User size={16} />} title="AGENT USAGE" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={getAgentUsageData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill={COLORS.accent1}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    percent > 0.05
                      ? `${name} ${(percent * 100).toFixed(0)}%`
                      : null
                  }
                >
                  {getAgentUsageData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[["accent1", "accent2", "accent3"][index % 3]]
                      }
                    />
                  ))}
                  )) ;
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.secondary,
                    color: COLORS.text,
                  }}
                  itemStyle={{ color: COLORS.text }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{ color: COLORS.textSecondary }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Milestones Section - Moved outside the main grid for full width */}
      <div className="mt-8 bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
        <SectionHeader
          icon={<Target size={16} />}
          title="MY MILESTONES"
          actionText={showMilestoneForm ? "Cancel" : "Add Milestone"}
          onAction={() => setShowMilestoneForm(!showMilestoneForm)}
        />

        {showMilestoneForm && (
          <div className="mb-4 p-3 bg-[#292B35] rounded-lg">
            <input
              type="text"
              placeholder="Milestone Title"
              className="w-full mb-2 p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
              value={newMilestone.title}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, title: e.target.value })
              }
            />
            <input
              type="date"
              className="w-full mb-2 p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
              value={newMilestone.date}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, date: e.target.value })
              }
            />
            <button
              onClick={addMilestone}
              className="px-4 py-2 bg-[#EE8631] text-[#292B35] rounded font-medium text-sm"
            >
              Add Milestone
            </button>
          </div>
        )}

        <div className="space-y-2">
          {milestones.map((milestone) => (
            <MilestoneItem
              key={milestone.id}
              milestone={milestone}
              onToggle={toggleMilestone}
              onDelete={deleteMilestone}
            />
          ))}
          {milestones.length === 0 && !showMilestoneForm && (
            <p className="text-gray-500 text-sm text-center py-4">
              No milestones set yet.
            </p>
          )}
        </div>
      </div>

      {/* Upcoming Events Section - Moved outside the main grid for full width */}
      <div className="mt-8 bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
        <SectionHeader icon={<Flag size={16} />} title="UPCOMING EVENTS" />
        <div className="space-y-3">
          {futureEvents.length > 0 ? (
            futureEvents
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-2.5 bg-[#292B35] rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-gray-500">
                      {event.formattedDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">
                      Prize: {event.prize}
                    </span>
                    {event.important && (
                      <Award
                        size={16}
                        className="ml-1 text-[#EE8631] inline-block"
                      />
                    )}
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">
              No upcoming events scheduled.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
