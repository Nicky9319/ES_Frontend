import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaTrophy, FaChartLine, FaPlus } from "react-icons/fa";
import CreateTeam from "./createTeam";
import ManageTeams from "./manageTeams";
import TeamDashboard from "./TeamDashboard";
import teamsData from "./Teams.json";

import RightSlider from '../components/rightSlider';
import LeftSlider from '../components/leftSlider';

// Mock data for dashboard stats
const dashboardStats = [
  {
    title: "Total Teams",
    value: 3,
    icon: <FaUsers className="text-[#95C5C5]" />,
  },
  {
    title: "Active Events",
    value: 2,
    icon: <FaTrophy className="text-[#EE8631]" />,
  },
  {
    title: "Achievements",
    value: 5,
    icon: <FaChartLine className="text-[#95C5C5]" />,
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
    <div className="h-full bg-gradient-to-br from-[#292B35] to-[#363945] p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">
            Teams Dashboard
          </h1>
          <p className="text-[#E0E0E0] mt-2">
            Manage your teams, track milestones, and join events.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-[#2F3140] rounded-lg shadow-lg p-6 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-[#292B35] p-4 rounded-full mr-4">
                {stat.icon}
              </div>
              <div>
                <div className="text-sm text-[#95C5C5]">{stat.title}</div>
                <div className="text-3xl font-bold text-[#E0E0E0]">
                  {stat.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.button
            className="bg-gradient-to-r from-[#95C5C5] to-[#7BA3A3] hover:from-[#7BA3A3] hover:to-[#95C5C5] text-[#292B35] font-bold p-6 rounded-lg flex items-center justify-center"
            onClick={handleManageTeamsClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaUsers className="text-2xl mr-3" />
            <span className="text-xl">Manage Your Teams</span>
          </motion.button>

          <motion.button
            className="bg-gradient-to-r from-[#EE8631] to-[#AD662F] hover:from-[#AD662F] hover:to-[#EE8631] text-white font-bold p-6 rounded-lg flex items-center justify-center"
            onClick={handleCreateTeamClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPlus className="text-2xl mr-3" />
            <span className="text-xl">Create New Team</span>
          </motion.button>
        </div>

        {/* Recent Activities - Placeholder */}
        <div className="bg-[#2F3140] rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#95C5C5] mb-4">
            Recent Activities
          </h2>
          <div className="space-y-4">
            <div className="bg-[#292B35] p-4 rounded-lg">
              <div className="text-[#EE8631]">
                Team "Phoenix Flames" joined an event
              </div>
              <div className="text-xs text-[#95C5C5]">2 days ago</div>
            </div>
            <div className="bg-[#292B35] p-4 rounded-lg">
              <div className="text-[#EE8631]">
                New milestone reached by "Shadow Wolves"
              </div>
              <div className="text-xs text-[#95C5C5]">5 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-[#292B35]">
      <LeftSlider/>
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
      <RightSlider/>
    </div>
  );
};

export default Teams;
