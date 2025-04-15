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
  Crown,
  Medal,
  Gamepad,
  ArrowUp,
  ThumbsUp,
  Award,
  Star,
  CheckCircle,
  Circle,
  Flag,
  PlusCircle,
  X,
  CheckSquare,
  Square,
  Trash2,
  Edit,
  LineChart,
  Save,
  Calendar as CalendarIcon,
} from "lucide-react";
import mentorProfile from "../Mentor Profile Page/mentorprofile.json"; // Import mentor profile JSON

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

export default function MentorDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("dashboard");
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Reach Diamond Rank", completed: true, date: "2023-04-01" },
    { id: 2, title: "Win Regional Tournament", completed: false, date: "2023-05-15" },
    { id: 3, title: "Reach 5000 Followers", completed: false, date: "2023-06-30" },
    { id: 4, title: "Achieve 75% Win Rate", completed: false, date: "2023-07-10" },
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

  // Use mentorProfile data
  const {
    RATING,
    VERIFIED,
    TAGLINE,
    SESSIONS_COMPLETED,
    USER_NAME,
    PROFILE_PIC,
  } = mentorProfile;

  // New stats row data
  const mentorStats = [
    {
      id: 1,
      title: "Rating",
      value: RATING,
      icon: <Star size={18} />,
      color: "#FFD700",
    },
    {
      id: 2,
      title: "Verified",
      value: VERIFIED ? "Yes" : "No",
      icon: <CheckCircle size={18} />,
      color: VERIFIED ? "#4ade80" : "#f87171",
    },
    {
      id: 3,
      title: "Tagline",
      value: TAGLINE,
      icon: <Award size={18} />,
      color: "#95C5C5",
    },
    {
      id: 4,
      title: "Sessions Completed",
      value: SESSIONS_COMPLETED,
      icon: <CheckSquare size={18} />,
      color: "#EE8631",
    },
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
  const futureEvents = upcomingEvents.filter(event => event.date >= today);

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
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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
  const StatCard = ({ title, value, change, icon, bgColor = "bg-[#292B35]" }) => (
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
      <button 
        onClick={() => onToggle(task.id, date)} 
        className="mr-2.5"
      >
        {task.completed ? (
          <CheckCircle size={16} className="text-[#95C5C5]" />
        ) : (
          <Circle size={16} className="text-gray-500" />
        )}
      </button>
      <div className="flex-grow">
        <div className={`text-sm font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
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
        <div className={`text-sm font-medium ${milestone.completed ? "text-[#95C5C5]" : ""}`}>
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
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    ));
  };

  // Handle milestone deletion
  const deleteMilestone = (id) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  // Handle adding new milestone
  const addMilestone = () => {
    if (newMilestone.title.trim() === "" || !newMilestone.date) return;
    
    const newId = Math.max(0, ...milestones.map(m => m.id)) + 1;
    setMilestones([
      ...milestones, 
      { 
        id: newId, 
        title: newMilestone.title, 
        completed: false, 
        date: newMilestone.date 
      }
    ]);
    setNewMilestone({ title: "", date: "" });
    setShowMilestoneForm(false);
  };

  // Handle task completion toggle
  const toggleTask = (id, date) => {
    setCalendarTasks({
      ...calendarTasks,
      [date]: calendarTasks[date].map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    });
  };

  // Handle task deletion
  const deleteTask = (id, date) => {
    setCalendarTasks({
      ...calendarTasks,
      [date]: calendarTasks[date].filter(task => task.id !== id)
    });
  };

  // Add new task to calendar
  const addTask = () => {
    if (newTask.title.trim() === "" || !newTask.time) return;
    
    const tasksForDay = calendarTasks[selectedDay] || [];
    const newId = tasksForDay.length > 0 
      ? Math.max(...tasksForDay.map(t => t.id)) + 1 
      : 1;
    
    setCalendarTasks({
      ...calendarTasks,
      [selectedDay]: [
        ...tasksForDay,
        { id: newId, title: newTask.title, time: newTask.time, completed: false }
      ]
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
      "January", "February", "March", "April", 
      "May", "June", "July", "August",
      "September", "October", "November", "December"
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
      const isToday = i === today && month === new Date().getMonth() && year === new Date().getFullYear();
      const isSelected = dateString === selectedDay;
      const hasTasks = calendarTasks[dateString] && calendarTasks[dateString].length > 0;
      
      days.push(
        <div
          key={i}
          onClick={() => setSelectedDay(dateString)}
          className={`flex flex-col justify-center items-center h-9 w-9 mx-auto rounded-lg text-sm cursor-pointer
            ${isToday ? "bg-[#EE8631] text-[#292B35] font-bold" : ""}
            ${isSelected && !isToday ? "bg-[#95C5C5]/20 border border-[#95C5C5]" : ""}
            ${!isSelected && !isToday && hasTasks ? "border border-[#EE8631]/30" : ""}
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
            {data[data.length-1]}
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
                  opacity: 0.8
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Animation helpers
  const fadeIn = "animate__animated animate__fadeIn";
  const fadeInUp = "animate__animated animate__fadeInUp";
  const fadeInLeft = "animate__animated animate__fadeInLeft";
  const fadeInRight = "animate__animated animate__fadeInRight";
  const glassCard = "bg-[#23242a]/80 backdrop-blur-md border border-[#95C5C5]/10 shadow-xl";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181a20] via-[#23242a] to-[#292B35] text-[#E0E0E0] p-0 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Sidebar - Player Card */}
        <aside className="lg:col-span-1 sticky top-8 self-start z-10">
          <div className={`${glassCard} rounded-2xl overflow-hidden shadow-2xl p-0 animate__animated animate__fadeInLeft`}>
            <div className="h-20 bg-gradient-to-r from-[#95C5C5]/60 to-[#EE8631]/60 relative">
              <div className="absolute inset-0 blur-xl opacity-40" style={{background: "radial-gradient(circle at 60% 40%, #EE8631 0%, transparent 70%)"}}></div>
            </div>
            <div className="p-6 -mt-12 flex flex-col items-center">
              <div className="relative w-28 h-28 rounded-full border-4 border-[#EE8631] shadow-lg overflow-hidden mb-3 animate__animated animate__pulse animate__infinite">
                <img
                  src={PROFILE_PIC}
                  alt="Player Avatar"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-[#23242a] rounded-full shadow"></span>
              </div>
              <h2 className="text-xl font-extrabold tracking-wide text-white drop-shadow-lg">{USER_NAME}</h2>
              <p className="text-[#95C5C5] text-sm font-medium mt-1">{TAGLINE}</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-5 flex flex-col gap-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentorStats.map((stat, idx) => (
              <div
                key={stat.id}
                className={`${glassCard} rounded-xl p-5 flex flex-col items-center hover:scale-105 transition-transform duration-300 ${fadeInUp}`}
                style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
              >
                <div className="mb-2" style={{ color: stat.color }}>{stat.icon}</div>
                <div className="text-2xl font-bold text-center">{stat.value}</div>
                <div className="text-xs text-gray-400 text-center">{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Milestones Section - now full width and clearer */}
          <section className={`${glassCard} rounded-2xl p-6 ${fadeInRight} relative mt-4`}>
            <SectionHeader 
              icon={<Flag size={18} />} 
              title="MILESTONES" 
              actionText={showMilestoneForm ? undefined : "Add New"}
              onAction={() => setShowMilestoneForm(!showMilestoneForm)}
            />
            {/* Floating Action Button for Milestone */}
            <button
              className="fixed bottom-8 right-8 z-50 bg-[#EE8631] text-[#23242a] rounded-full p-4 shadow-lg hover:scale-110 transition-transform animate__animated animate__bounceIn"
              style={{display: showMilestoneForm ? "none" : "block"}}
              onClick={() => setShowMilestoneForm(true)}
              title="Add Milestone"
            >
              <PlusCircle size={28} />
            </button>
            {showMilestoneForm && (
              <div className="mb-3 p-3 bg-[#23242a]/80 rounded-lg animate__animated animate__fadeInDown max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="Milestone title"
                  className="w-full mb-2 p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-grow p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
                    value={newMilestone.date}
                    onChange={(e) => setNewMilestone({...newMilestone, date: e.target.value})}
                  />
                  <button 
                    onClick={addMilestone}
                    className="px-3 py-2 bg-[#EE8631] text-[#23242a] rounded font-medium text-sm hover:bg-[#ffb366] transition-colors"
                  >
                    Add
                  </button>
                  <button 
                    onClick={() => setShowMilestoneForm(false)}
                    className="p-2 bg-[#35383f] text-gray-400 rounded hover:bg-[#23242a]/60 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1 mt-2">
              {milestones.map((milestone, idx) => (
                <div className="transition-all duration-300 hover:scale-[1.02]" key={milestone.id}>
                  <MilestoneItem 
                    milestone={milestone} 
                    onToggle={toggleMilestone}
                    onDelete={deleteMilestone}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Tasks & Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Today's Tasks */}
            <section className={`${glassCard} rounded-2xl p-6 ${fadeInLeft}`}>
              <SectionHeader 
                icon={<Clock size={18} />} 
                title="TODAY'S TASKS"  
              />
              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                {todayTasks.length > 0 ? (
                  todayTasks.map(task => (
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
                      className="mt-2 text-xs text-[#EE8631] hover:underline"
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
            </section>

            {/* Calendar */}
            <section className={`${glassCard} rounded-2xl p-6 ${fadeInRight}`}>
              <SectionHeader 
                icon={<CalendarIcon size={18} />} 
                title="MY CALENDAR" 
              />
              {renderCalendar()}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-sm">
                    {new Date(selectedDay).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <button 
                    onClick={() => setShowTaskForm(!showTaskForm)}
                    className="text-xs flex items-center text-[#EE8631] hover:scale-110 transition-transform"
                  >
                    {showTaskForm ? 'Cancel' : 'Add Task'} 
                    {!showTaskForm && <PlusCircle size={14} className="ml-1" />}
                  </button>
                </div>
                {showTaskForm && (
                  <div className="mb-3 p-3 bg-[#23242a]/80 rounded-lg animate__animated animate__fadeIn">
                    <input
                      type="text"
                      placeholder="Task title"
                      className="w-full mb-2 p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                    <div className="flex gap-2">
                      <input
                        type="time"
                        className="flex-grow p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
                        value={newTask.time}
                        onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                      />
                      <button 
                        onClick={addTask}
                        className="px-3 py-2 bg-[#EE8631] text-[#23242a] rounded font-medium text-sm hover:bg-[#ffb366] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
                <div className="space-y-2 max-h-[150px] overflow-y-auto">
                  {calendarTasks[selectedDay]?.length > 0 ? (
                    calendarTasks[selectedDay].map(task => (
                      <TaskItem 
                        key={task.id} 
                        task={task} 
                        date={selectedDay}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">No tasks for this day</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
