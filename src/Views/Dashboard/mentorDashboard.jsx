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

  return (
    <div className="min-h-screen bg-[#292B35] text-[#E0E0E0] p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {/* Left Column */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 overflow-hidden shadow-lg">
            <div className="h-12 bg-gradient-to-r from-[#95C5C5]/60 to-[#EE8631]/60"></div>
            <div className="p-4 -mt-6">
              <div className="flex">
                <div className="w-18 h-18 rounded-xl bg-[#292B35] border-2 border-[#292B35] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* Middle Column */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader 
              icon={<Clock size={16} />} 
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
          
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader 
              icon={<CalendarIcon size={16} />} 
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
                  className="text-xs flex items-center text-[#EE8631]"
                >
                  {showTaskForm ? 'Cancel' : 'Add Task'} 
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
                      className="px-3 py-2 bg-[#EE8631] text-[#292B35] rounded font-medium text-sm"
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
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          {/* Right Column */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader 
              icon={<Flag size={16} />} 
              title="MILESTONES" 
              actionText="Add New"
              onAction={() => setShowMilestoneForm(!showMilestoneForm)}
            />
            
            {showMilestoneForm && (
              <div className="mb-3 p-3 bg-[#292B35] rounded-lg">
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
                    className="px-3 py-2 bg-[#EE8631] text-[#292B35] rounded font-medium text-sm"
                  >
                    Add
                  </button>
                  <button 
                    onClick={() => setShowMilestoneForm(false)}
                    className="p-2 bg-[#35383f] text-gray-400 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
            
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
              {milestones.map(milestone => (
                <MilestoneItem 
                  key={milestone.id} 
                  milestone={milestone} 
                  onToggle={toggleMilestone}
                  onDelete={deleteMilestone}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
