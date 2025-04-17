import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Trophy,
  Target,
  Activity,
  BarChart2,
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
  Calendar as CalendarIcon,
  ChevronRight,
} from "lucide-react";

import PerformanceCharts from "./performanceCharts";

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

// Update image paths to use a default avatar image
const defaultAvatar = "/assets/default-avatar.png"; // You should add this image to your public/assets folder

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

  // Player's teams (replacing team members)
  const playerTeams = [
    {
      id: 1,
      name: "Nexus Elite",
      role: "Captain",
      game: "Valorant",
      logo: defaultAvatar, // Using same default image for now
      status: "active",
    },
    {
      id: 2,
      name: "Frontier Squad",
      role: "Member",
      game: "Apex Legends",
      logo: defaultAvatar, // Using same default image for now
      status: "active",
    },
    {
      id: 3,
      name: "Midnight Gamers",
      role: "Sub",
      game: "CS:GO",
      logo: defaultAvatar, // Using same default image for now
      status: "inactive",
    },
  ];

  // Get today's tasks from calendar data
  const todayTasks = calendarTasks[formatDate(new Date())] || [];

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Calculate averages for the summary cards
  const calculateAverages = () => {
    if (fullYearData.length === 0)
      return {
        avgCombatScore: 0,
        kdRatio: 0,
        econRating: 0,
        firstBloods: 0,
        matchesPlayed: 0,
      };

    return {
      avgCombatScore: Math.round(
        fullYearData.reduce((sum, item) => sum + item.avgCombatScore, 0) /
          fullYearData.length
      ),
      kdRatio: (
        fullYearData.reduce((sum, item) => sum + parseFloat(item.kdRatio), 0) /
        fullYearData.length
      ).toFixed(2),
      econRating: Math.round(
        fullYearData.reduce((sum, item) => sum + item.econRating, 0) /
          fullYearData.length
      ),
      firstBloods: Math.round(
        fullYearData.reduce((sum, item) => sum + item.firstBloods, 0) /
          fullYearData.length
      ),
      matchesPlayed: fullYearData.reduce(
        (sum, item) => sum + item.matchesPlayed,
        0
      ),
      winRate: Math.round(
        fullYearData.reduce((sum, item) => sum + item.winRate, 0) /
          fullYearData.length
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
        date: newMilestone.date,
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

  return (
    <div className="min-h-screen bg-[#292B35] text-[#E0E0E0] p-4">
      {/* New User Header - Outside of Grid */}
      <div className="mb-6 bg-gradient-to-r from-[#35383f] to-[#292B35] rounded-xl border border-[#95C5C5]/30 shadow-lg overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-[#95C5C5] to-[#EE8631]"></div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-[#292B35] border-2 border-[#95C5C5] overflow-hidden shadow-lg">
              <img
                src={defaultAvatar}
                alt="Player Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#95C5C5] to-[#EE8631] bg-clip-text text-transparent">
                UserName
              </h1>
              <p className="text-[#A0A0A0]">@TaglineOfPlayer</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-4">
            {playerStats.map((stat) => (
              <div key={stat.id} className="text-center px-4">
                <div className="text-[#95C5C5] mb-1">{stat.icon}</div>
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.title}</div>
                <div
                  className={`text-xs ${
                    stat.change.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Player and Stats Column - Left Column */}
        <div className="space-y-4">
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

          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
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

        {/* Right Column - Performance Summary */}
        <div className="space-y-4">
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
        </div>
      </div>

      {/* Performance Charts Section */}
      <PerformanceCharts />
    </div>
  );
}
