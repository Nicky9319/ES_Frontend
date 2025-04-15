import React, { useState } from "react";
import {
  FaUsers,
  FaTrophy,
  FaChartLine,
  FaPlus,
  FaArrowLeft,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";
import CreateTeam from "./createTeam";
import TeamDashboard from "./TeamDashboard";
import teamsData from "./Teams.json";

// Enhanced dashboard stats with more context
const dashboardStats = [
  {
    title: "Total Teams",
    value: 3,
    icon: <FaUsers size={24} />,
    change: "+1 this month",
    positive: true,
  },
  {
    title: "Active Events",
    value: 2,
    icon: <FaTrophy size={24} />,
    change: "Both this week",
    positive: true,
  },
  {
    title: "Achievements",
    value: 5,
    icon: <FaChartLine size={24} />,
    change: "+2 since last month",
    positive: true,
  },
];

// Enhanced mock teams data with more fields
const mockTeams = [
  {
    TEAM_ID: "1",
    NAME: "Phoenix Flames",
    TAG: "PF",
    GAME: "Valorant",
    TEAM_DESCRIPTION:
      "Rising from the ashes to dominate the competitive scene with strategy and precision",
    TEAM_SIZE: 5,
    PARTICIPANTS: [
      { USER_ID: "user1", USERNAME: "FlameLeader", ACCESS: "ADMIN" },
      { USER_ID: "user2", USERNAME: "FireStarter", ACCESS: "MEMBER" },
      { USER_ID: "user4", USERNAME: "EmberKnight", ACCESS: "MEMBER" },
    ],
    TEAM_LOGO: "",
    UPCOMING_EVENTS: 1,
    RECENT_ACHIEVEMENTS: 2,
  },
  {
    TEAM_ID: "2",
    NAME: "Shadow Wolves",
    TAG: "SW",
    GAME: "CS2",
    TEAM_DESCRIPTION:
      "Striking from the shadows with tactical precision and unwavering teamwork",
    TEAM_SIZE: 5,
    PARTICIPANTS: [
      { USER_ID: "user3", USERNAME: "AlphaWolf", ACCESS: "ADMIN" },
      { USER_ID: "user5", USERNAME: "NightHunter", ACCESS: "MEMBER" },
    ],
    TEAM_LOGO: "",
    UPCOMING_EVENTS: 1,
    RECENT_ACHIEVEMENTS: 1,
  },
  {
    TEAM_ID: "3",
    NAME: "Techno Tigers",
    TAG: "TT",
    GAME: "League of Legends",
    TEAM_DESCRIPTION:
      "Combining technical prowess with aggressive gameplay to dominate the rift",
    TEAM_SIZE: 5,
    PARTICIPANTS: [
      { USER_ID: "user6", USERNAME: "TechMaster", ACCESS: "ADMIN" },
      { USER_ID: "user7", USERNAME: "TigerFang", ACCESS: "MEMBER" },
      { USER_ID: "user8", USERNAME: "CodeStriker", ACCESS: "MEMBER" },
      { USER_ID: "user9", USERNAME: "BitBrawler", ACCESS: "MEMBER" },
    ],
    TEAM_LOGO: "",
    UPCOMING_EVENTS: 0,
    RECENT_ACHIEVEMENTS: 2,
  },
];

// Enhanced TeamCard component - activity indicator removed
const TeamCard = ({ team, onClick }) => {
  return (
    <div
      className="bg-[#2F3140] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={() => onClick(team)}
    >
      <div className="p-6 bg-[#292B35] relative overflow-hidden">
        <div className="flex items-center space-x-4 relative z-10">
          <div className="w-20 h-20 flex items-center justify-center bg-[#95C5C5] rounded-full text-5xl shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
            {team.TEAM_LOGO ? (
              <img
                src={team.TEAM_LOGO}
                alt={`${team.NAME} logo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#292B35] font-bold">
                {team.TAG?.slice(0, 2) || "T"}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-[#95C5C5] transition-colors">
              {team.NAME}
            </h3>
            <div className="flex items-center">
              <span className="text-[#95C5C5] mr-2">{team.TAG}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#95C5C5] opacity-50"></span>
              <span className="ml-2 text-[#95C5C5]">{team.GAME}</span>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#95C5C5]/10 to-transparent opacity-30"></div>
      </div>

      <div className="p-6">
        <p className="text-sm text-gray-300 mb-5 line-clamp-2">
          {team.TEAM_DESCRIPTION}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="text-center p-2 bg-[#292B35] rounded-lg">
            <div className="text-lg font-bold text-white">
              {team.PARTICIPANTS.length}
            </div>
            <div className="text-xs text-gray-400">Members</div>
          </div>
          <div className="text-center p-2 bg-[#292B35] rounded-lg">
            <div className="text-lg font-bold text-white">
              {team.UPCOMING_EVENTS}
            </div>
            <div className="text-xs text-gray-400">Events</div>
          </div>
          {/* <div className="text-center p-2 bg-[#292B35] rounded-lg">
            <div className="text-lg font-bold text-white">
              {team.RECENT_ACHIEVEMENTS}
            </div>
            <div className="text-xs text-gray-400">Trophies</div>
          </div> */}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {team.PARTICIPANTS.slice(0, 3).map((participant, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full bg-[#95C5C5] border-2 border-[#2F3140] flex items-center justify-center text-xs font-bold text-[#292B35]"
              >
                {participant.USERNAME?.charAt(0) || "U"}
              </div>
            ))}
            {team.PARTICIPANTS.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-[#292B35] border-2 border-[#2F3140] flex items-center justify-center text-xs text-white">
                +{team.PARTICIPANTS.length - 3}
              </div>
            )}
          </div>
          <div className="px-3 py-1 bg-gradient-to-r from-[#EE8631] to-[#AD662F] text-[#292B35] rounded-full text-sm font-bold">
            {team.TEAM_SIZE}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats card component
const StatCard = ({ stat, index }) => (
  <div className="bg-[#292B35] rounded-xl shadow-lg overflow-hidden border border-[#95C5C5]/10 hover:border-[#95C5C5]/30 transition-all duration-300">
    <div
      className={`h-1 ${index === 1 ? "bg-[#EE8631]" : "bg-[#95C5C5]"}`}
    ></div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div
            className={`p-3 rounded-lg ${
              index === 1
                ? "bg-[#EE8631]/10 text-[#EE8631]"
                : "bg-[#95C5C5]/10 text-[#95C5C5]"
            }`}
          >
            {stat.icon}
          </div>
          <h3 className="ml-3 text-base font-medium text-gray-300">
            {stat.title}
          </h3>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-white">{stat.value}</div>
        <div
          className={`text-xs ${
            stat.positive ? "text-green-400" : "text-orange-400"
          }`}
        >
          {stat.change}
        </div>
      </div>
    </div>
  </div>
);

// Main component
const Teams = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams] = useState(Array.isArray(teamsData) ? teamsData : mockTeams);

  const handleCreateTeamClick = () => {
    setActiveView("create");
  };

  const handleDashboardClick = () => {
    setActiveView("dashboard");
    setSelectedTeam(null);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setActiveView("teamDashboard");
  };

  const handleBackClick = () => {
    setActiveView("dashboard");
    setSelectedTeam(null);
  };

  // Dashboard overview component with teams grid
  const DashboardOverview = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#292B35] to-[#363945] p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Team{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">
                Dashboard
              </span>
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your teams, track events, and monitor achievements
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-2">
            {/* <button className="p-2 rounded-lg bg-[#2F3140] text-gray-400 hover:text-white transition-colors">
              <FaCalendarAlt size={20} />
            </button> */}
            {/* <button className="p-2 rounded-lg bg-[#2F3140] text-gray-400 hover:text-white transition-colors">
              <FaCog size={20} />
            </button> */}
          </div>
        </div>

        {/* Create Team Button - Filters removed */}
        <div className="flex justify-end mb-8">
          <button
            className="bg-gradient-to-r from-[#EE8631] to-[#AD662F] hover:from-[#f39240] hover:to-[#c27535] text-white font-bold px-6 py-3 rounded-lg flex items-center shadow-lg transition-all duration-300"
            onClick={handleCreateTeamClick}
          >
            <FaPlus className="mr-2" />
            <span>Create New Team</span>
          </button>
        </div>

        {/* Teams Grid with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <div
              key={team.TEAM_ID}
              className="transform transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TeamCard team={team} onClick={handleTeamSelect} />
            </div>
          ))}

          {teams.length === 0 && (
            <div className="col-span-3 flex flex-col items-center justify-center p-12 bg-[#292B35]/50 rounded-xl border border-dashed border-gray-600">
              <div className="text-6xl mb-4 text-gray-500">🏆</div>
              <h3 className="text-xl font-medium text-gray-300 mb-2">
                No teams found
              </h3>
              <p className="text-gray-400 text-center mb-6">
                You haven't created any teams yet.
              </p>
              <button
                className="bg-gradient-to-r from-[#95C5C5] to-[#7BA3A3] text-[#292B35] px-6 py-2 rounded-lg font-medium"
                onClick={handleCreateTeamClick}
              >
                Create Your First Team
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div> */}
    </div>
  );

  // Create Back Button Component
  // const BackButton = ({ onClick }) => (
  //   <button
  //     onClick={onClick}
  //     className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
  //   >
  //     <FaArrowLeft className="mr-2" />
  //     <span>Back to Dashboard</span>
  //   </button>
  // );

  return (
    <div className="min-h-screen bg-[#292B35]">
      {activeView === "dashboard" && <DashboardOverview />}

      {activeView === "create" && (
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* <BackButton onClick={handleDashboardClick} /> */}
            <CreateTeam onBackClick={handleDashboardClick} />
          </div>
        </div>
      )}

      {activeView === "teamDashboard" && selectedTeam && (
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* <BackButton onClick={handleBackClick} /> */}
            <TeamDashboard
              team={selectedTeam}
              onBack={handleBackClick}
              userRole={
                selectedTeam?.PARTICIPANTS?.find((p) => p.USER_ID === "user1")
                  ?.ACCESS || "MEMBER"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
