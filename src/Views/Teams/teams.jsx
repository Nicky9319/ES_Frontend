import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaTrophy,
  FaChartLine,
  FaPlus,
  FaArrowLeft,
  FaCalendarAlt,
  FaCog,
  FaTrash,
  FaSignOutAlt,
  FaExclamationTriangle,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import CreateTeam from "./createTeam";
import TeamDashboard from "./TeamDashboard";
// import teamsData from "./Teams.json";
// const teamsData2 = teamsData;

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
      { USER_ID: "user1", USERNAME: "FlameLeader", ACCESS: "MEMBER" },
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
      { USER_ID: "user1", USERNAME: "FlameLeader", ACCESS: "MEMBER" },
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

// Modal Component for confirmations
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmType,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 gap-2 flex items-center justify-center z-50 px-4">
      <div className="bg-[#292B35] rounded-xl border border-[#95C5C5]/20 shadow-xl max-w-md w-full animate-fadeIn">
        <div className="p-6 border-b border-[#95C5C5]/20">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white flex items-center">
              <FaExclamationTriangle className="text-[#EE8631] mr-2" />
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-300">{message}</p>
        </div>

        <div className="p-4 flex justify-end space-x-3 border-t border-[#95C5C5]/20">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#2F3140] text-gray-300 hover:bg-[#393b4d] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 rounded-lg flex items-center ${
              confirmType === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gradient-to-r from-[#EE8631] to-[#AD662F] hover:from-[#f39240] hover:to-[#c27535]"
            } text-white transition-colors`}
          >
            {confirmType === "danger" ? (
              <FaTrash className="mr-2" />
            ) : (
              <FaCheck className="mr-2" />
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced TeamCard component - with team management options
const TeamCard = ({
  team,
  onClick,
  onDiscard,
  onLeave,
  currentUserId = "u_003",
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const userParticipation = team.PARTICIPANTS.find(
    (p) => p.USER_ID === currentUserId
  );
  console.log(currentUserId);
  console.log("\n\n\n\n\n\n\n", userParticipation, "\n\n\n\n\n");

  const isAdmin = userParticipation?.ACCESS === "ADMIN";
  const isMember = userParticipation?.ACCESS === "MEMBER";
  console.log("\n\n\n\n\n\n\n", userParticipation?.ACCESS, "\n\n\n\n\n");
  return (
    <div
      className="bg-[#2F3140] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group relative"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {/* Team management options */}
      {showOptions && isMember && (
        <div className="absolute top-4 right-4 z-20 flex space-x-2">
          {isAdmin ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDiscard(team);
              }}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-lg transition-colors flex items-center"
              title="Disband Team"
            >
              <FaTrash size={16} />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLeave(team);
              }}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-lg transition-colors flex items-center"
              title="Leave Team"
            >
              <FaSignOutAlt size={16} />
            </button>
          )}
        </div>
      )}

      <div
        className="p-6 bg-[#292B35] relative overflow-hidden"
        onClick={() => onClick(team)}
      >
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

        {/* Role indicator */}
        <div className="absolute top-6 right-6">
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              isAdmin
                ? "bg-gradient-to-r from-[#EE8631] to-[#AD662F] text-white"
                : "bg-[#2F3140] text-[#95C5C5]"
            }`}
          >
            {isAdmin ? "Admin" : "Member"}
          </span>
        </div>

        {/* Decorative element */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#95C5C5]/10 to-transparent opacity-30"></div>
      </div>

      <div className="p-6" onClick={() => onClick(team)}>
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
          <div className="px-3 py-1 bg-gradient-to-r from-[#EE8631] to-[#AD662F] text-white rounded-full text-sm font-bold">
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
  const VITE_TEAMS_SERVICE = import.meta.env.VITE_TEAMS_SERVICE;
  const storedUserId = localStorage.getItem("USER_ID");
  const currentUserId =
    storedUserId || "u_c3d4e5f6-a7b8-9012-3456-7890abcdef12";
  const [teamsData, setTeamsData] = useState(null);
  useEffect(() => {
    fetch(
      `http://${VITE_TEAMS_SERVICE}/Teams/User/GetAllTeams?USER_ID=${currentUserId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Teams:", data);
        setTeamsData(data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, [VITE_TEAMS_SERVICE, currentUserId]);

  useEffect(() => {
    if (teamsData) {
      console.log("Updated teamsData:", teamsData);
    }
  }, [teamsData]);

  const [activeView, setActiveView] = useState("dashboard");
  const [selectedTeam, setSelectedTeam] = useState(null);
  // Use teamsData.TEAMS if available, otherwise fallback to mockTeams
  const teams = Array.isArray(teamsData?.TEAMS) ? teamsData.TEAMS : mockTeams;
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [teamToManage, setTeamToManage] = useState(null);
  const [notification, setNotification] = useState(null);

  // Simulated current user ID - would come from auth context in real app

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

  // Updated function to handle team discard by admin
  const handleTeamDiscard = (team) => {
    // Only allow admins to discard teams
    const userRole = team.PARTICIPANTS.find(
      (p) => p.USER_ID === currentUserId
    )?.ACCESS;
    if (userRole !== "ADMIN") return;

    setTeamToManage(team);
    setShowDiscardModal(true);
  };

  // Updated function to handle team leave by member
  const handleTeamLeave = (team) => {
    // Only allow members to leave teams
    const userParticipation = team.PARTICIPANTS.find(
      (p) => p.USER_ID === currentUserId
    );
    if (!userParticipation || userParticipation.ACCESS === "ADMIN") return;

    setTeamToManage(team);
    setShowLeaveModal(true);
  };

  // Updated function to confirm team discard
  const confirmTeamDiscard = () => {
    setNotification({
      message: `Team "${teamToManage?.NAME}" has been disbanded`,
      type: "success",
    });
    setTimeout(() => setNotification(null), 5000);
    setShowDiscardModal(false);
    setTeamToManage(null);
    if (activeView === "teamDashboard") {
      handleBackClick();
    }
    // Optionally: refetch teamsData here
  };

  const confirmTeamLeave = () => {
    setNotification({
      message: `You have left team "${teamToManage?.NAME}"`,
      type: "info",
    });
    setTimeout(() => setNotification(null), 5000);
    setShowLeaveModal(false);
    setTeamToManage(null);
    if (activeView === "teamDashboard") {
      handleBackClick();
    }
    // Optionally: refetch teamsData here
  };

  // Notification component
  const Notification = ({ notification }) => {
    if (!notification) return null;

    const bgColor =
      notification.type === "success"
        ? "bg-gradient-to-r from-green-500 to-green-600"
        : "bg-gradient-to-r from-[#95C5C5] to-[#7BA3A3]";

    return (
      <div className="fixed bottom-6 right-6 z-50 animate-slideInRight">
        <div className={`${bgColor} rounded-lg shadow-lg p-4 max-w-md`}>
          <div className="flex items-center">
            {notification.type === "success" ? (
              <FaCheck className="text-white mr-3" />
            ) : (
              <FaSignOutAlt className="text-white mr-3" />
            )}
            <p className="text-white">{notification.message}</p>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-white/80 hover:text-white"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>
      </div>
    );
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
            {/* Additional action buttons could go here */}
          </div>
        </div>

        {/* Create Team Button */}
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
              <TeamCard
                team={team}
                onClick={handleTeamSelect}
                onDiscard={handleTeamDiscard}
                onLeave={handleTeamLeave}
                currentUserId={currentUserId}
              />
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
    </div>
  );

  return (
    <div className="min-h-screen bg-[#292B35]">
      {activeView === "dashboard" && <DashboardOverview />}

      {activeView === "create" && (
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <CreateTeam onBackClick={handleDashboardClick} />
          </div>
        </div>
      )}

      {activeView === "teamDashboard" && selectedTeam && (
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <TeamDashboard
              team={selectedTeam}
              onBack={handleBackClick}
              userRole={
                selectedTeam?.PARTICIPANTS?.find(
                  (p) => p.USER_ID === currentUserId
                )?.ACCESS || "MEMBER"
              }
              onDiscard={() => {
                handleTeamDiscard(selectedTeam);
                handleBackClick();
              }}
              onLeave={() => {
                handleTeamLeave(selectedTeam);
                handleBackClick();
              }}
            />
          </div>
        </div>
      )}

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
        onConfirm={confirmTeamDiscard}
        title="Disband Team"
        message={`Are you sure you want to disband "${teamToManage?.NAME}"? This action cannot be undone and will remove the team for all members.`}
        confirmText="Disband Team"
        confirmType="danger"
      />

      <ConfirmationModal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        onConfirm={confirmTeamLeave}
        title="Leave Team"
        message={`Are you sure you want to leave "${teamToManage?.NAME}"? You'll need to be invited again if you want to rejoin.`}
        confirmText="Leave Team"
        confirmType="warning"
      />

      {/* Notification */}
      <Notification notification={notification} />

      {/* Global Styles */}
      <style>
        {`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
};

export default Teams;
