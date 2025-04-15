import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaTrophy,
  FaChartLine,
  FaPlus,
  FaArrowRight,
  FaBell,
} from "react-icons/fa";
import CreateTeam from "./createTeam";
import ManageTeams from "./manageTeams";
import TeamDashboard from "./TeamDashboard";
import teamsData from "./Teams.json";

// Mock data for dashboard stats
const dashboardStats = [
  {
    title: "Total Teams",
    value: 3,
    icon: <FaUsers size={24} />,
  },
  {
    title: "Active Events",
    value: 2,
    icon: <FaTrophy size={24} />,
  },
  {
    title: "Achievements",
    value: 5,
    icon: <FaChartLine size={24} />,
  },
];

// Recent activities data
const recentActivities = [
  {
    title: 'Team "Phoenix Flames" joined an event',
    time: "2 days ago",
    type: "event",
  },
  {
    title: 'New milestone reached by "Shadow Wolves"',
    time: "5 days ago",
    type: "milestone",
  },
];

const Teams = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleManageTeamsClick = () => {
    setActiveView("manage");
  };

  const handleCreateTeamClick = () => {
    setActiveView("create");
  };

  const handleDashboardClick = () => {
    setActiveView("dashboard");
    setSelectedTeam(null);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team || teamsData);
    setActiveView("teamDashboard");
  };

  const handleBackClick = () => {
    if (activeView === "teamDashboard") {
      setActiveView("manage");
      setSelectedTeam(null);
    } else {
      setActiveView("dashboard");
    }
  };

  // Dashboard overview component
  const DashboardOverview = () => (
    <div className="min-h-screen bg-[#292B35] text-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#95C5C5] to-[#EE8631] bg-clip-text text-transparent">
            Teams Dashboard
          </h1>
          <p className="text-[#E0E0E0] mt-2 text-lg">
            Build teams, track progress, and participate in events together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dashboardStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className={index === 1 ? "bg-[#EE8631]" : "bg-[#95C5C5]"}
                    style={{ height: "4px" }}
                  ></div>
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <div
                        className={`mr-3 ${
                          index === 1 ? "text-[#EE8631]" : "text-[#95C5C5]"
                        }`}
                      >
                        {stat.icon}
                      </div>
                      <div className="text-sm font-medium text-[#95C5C5]">
                        {stat.title}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-[#E0E0E0]">
                      {stat.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activities */}
            <motion.div
              className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-[#95C5C5] mb-4 flex items-center">
                <FaBell className="mr-2" /> Recent Activities
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 rounded-lg hover:bg-[#363945] transition-colors border border-[#95C5C5]/10"
                  >
                    <div
                      className={`mt-1 mr-4 p-2 rounded-full ${
                        activity.type === "event"
                          ? "bg-[#EE8631]/20 text-[#EE8631]"
                          : "bg-[#95C5C5]/20 text-[#95C5C5]"
                      }`}
                    >
                      {activity.type === "event" ? (
                        <FaTrophy />
                      ) : (
                        <FaChartLine />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-[#E0E0E0]">{activity.title}</div>
                      <div className="text-xs text-[#95C5C5] mt-1">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div>
            {/* Actions Card */}
            <motion.div
              className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-lg p-6 mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-[#95C5C5] mb-4">
                Quick Actions
              </h2>
              <div className="space-y-4">
                <motion.button
                  className="w-full bg-gradient-to-r from-[#95C5C5] to-[#95C5C5]/80 hover:from-[#95C5C5]/80 hover:to-[#95C5C5] text-[#292B35] font-medium p-4 rounded-lg flex items-center justify-between group"
                  onClick={handleManageTeamsClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <FaUsers className="text-xl mr-3" />
                    <span className="font-bold">Manage Your Teams</span>
                  </div>
                  <FaArrowRight className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </motion.button>

                <motion.button
                  className="w-full bg-gradient-to-r from-[#EE8631] to-[#AD662F] hover:from-[#AD662F] hover:to-[#EE8631] text-white font-medium p-4 rounded-lg flex items-center justify-between group"
                  onClick={handleCreateTeamClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <FaPlus className="text-xl mr-3" />
                    <span className="font-bold">Create New Team</span>
                  </div>
                  <FaArrowRight className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </motion.button>
              </div>
            </motion.div>

            {/* Team Highlights Card */}
            <motion.div
              className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-[#95C5C5] mb-4">
                Team Highlights
              </h2>
              <div className="space-y-3 text-[#E0E0E0]">
                <div className="bg-[#363945] p-4 rounded-lg border-l-4 border-[#EE8631]">
                  <div className="font-medium">Phoenix Flames</div>
                  <div className="text-xs text-[#95C5C5] mt-1">
                    Active since: Jan 2025
                  </div>
                </div>
                <div className="bg-[#363945] p-4 rounded-lg border-l-4 border-[#95C5C5]">
                  <div className="font-medium">Shadow Wolves</div>
                  <div className="text-xs text-[#95C5C5] mt-1">
                    Active since: Mar 2025
                  </div>
                </div>
              </div>
              <button
                className="mt-4 w-full text-center text-[#EE8631] hover:text-[#AD662F] text-sm font-medium"
                onClick={handleManageTeamsClick}
              >
                View all teams →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#292B35]">
      <AnimatePresence mode="wait">
        {activeView === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <DashboardOverview />
          </motion.div>
        )}
        {activeView === "create" && (
          <motion.div
            key="create"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <CreateTeam onBackClick={handleDashboardClick} />
          </motion.div>
        )}
        {activeView === "manage" && (
          <motion.div
            key="manage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <ManageTeams
              onBackClick={handleDashboardClick}
              onTeamSelect={handleTeamSelect}
            />
          </motion.div>
        )}
        {activeView === "teamDashboard" && selectedTeam && (
          <motion.div
            key="teamDashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <TeamDashboard
              team={selectedTeam}
              onBack={handleBackClick}
              userRole={selectedTeam?.ROLE || "MEMBER"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teams;
