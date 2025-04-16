import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaTrophy,
  FaUsers,
  FaUserPlus,
  FaUserMinus,
  FaFlagCheckered,
  FaSave,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import TeamDashboard from "./TeamDashboard";

// Color palette
const COLORS = {
  primaryDark: "#292B35",
  secondaryDark: "#2F3140",
  accent: "#95C5C5",
  highlight: "#EE8631",
  highlightDark: "#AD662F",
  light: "#E0E0E0",
};

// Reusable Team Card
const TeamCard = ({ team, onClick }) => (
  <motion.div
    className="bg-[#2F3140] rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    onClick={() => onClick(team)}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="bg-[#292B35] p-6 flex items-center space-x-4 relative">
      <div className="w-20 h-20 flex items-center justify-center bg-[#95C5C5] rounded-full text-5xl shadow-md relative z-10 overflow-hidden">
        {team.TEAM_LOGO ? (
          <img
            src={team.TEAM_LOGO}
            alt="logo"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{team.TAG?.slice(0, 2) || "T"}</span>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold">{team.NAME}</h3>
        <p className="text-[#95C5C5]">
          {team.TAG} • {team.GAME}
        </p>
      </div>
    </div>
    <div className="p-6 bg-[#2F3140]">
      <p className="text-sm text-gray-300 mb-4">{team.TEAM_DESCRIPTION}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-[#95C5C5]">
          <FaUsers className="mr-2" />
          <span>{team.PARTICIPANTS?.length || 0} Members</span>
        </div>
        <div className="px-3 py-1 bg-gradient-to-r from-[#95C5C5] to-[#7BA3A3] text-[#292B35] rounded-full text-sm font-medium shadow-sm">
          {team.TEAM_SIZE || 0}
        </div>
      </div>
    </div>
  </motion.div>
);

// Milestone List
const MilestoneList = ({ milestones, editable }) => (
  <div className="space-y-4">
    {milestones && milestones.length > 0 ? (
      milestones.map((m) => (
        <div
          key={m.MILESTONE_ID}
          className="bg-[#292B35] p-4 rounded-lg flex items-center"
        >
          <FaFlagCheckered className="text-[#EE8631] mr-4 text-2xl" />
          <div className="flex-1">
            <div className="font-bold text-[#95C5C5]">{m.MILESTONE_NAME}</div>
            <div className="text-[#E0E0E0]">{m.MILESTONE_DESCRIPTION}</div>
            <div className="text-xs text-[#95C5C5] mt-1">
              {new Date(m.MILESTONE_DATE).toLocaleDateString()}
            </div>
          </div>
          {editable && (
            <button className="ml-2 text-[#EE8631] hover:text-[#AD662F]">
              <FaEdit />
            </button>
          )}
        </div>
      ))
    ) : (
      <div className="text-[#95C5C5]/70 italic">No milestones yet.</div>
    )}
  </div>
);

// Event List
const EventList = ({ events }) => (
  <div className="space-y-4">
    {events && events.length > 0 ? (
      events.map((e) => (
        <div
          key={e.EVENT_ID}
          className="bg-[#292B35] p-4 rounded-lg flex flex-col"
        >
          <div className="flex items-center mb-2">
            <FaTrophy className="text-[#EE8631] mr-2" />
            <span className="font-bold text-[#95C5C5]">{e.EVENT_NAME}</span>
          </div>
          <div className="text-[#E0E0E0]">{e.DESCRIPTION}</div>
          <div className="text-xs text-[#95C5C5] mt-1">
            {e.VENUE} • {e.LOCATION} • {e.GAME}
          </div>
        </div>
      ))
    ) : (
      <div className="text-[#95C5C5]/70 italic">No events enrolled.</div>
    )}
  </div>
);

const ManageTeams = ({
  onBackClick,
  onTeamSelect,
  selectedTeam,
  viewMode = "list",
  userRole = "ADMIN",
}) => {
  // Example: list of teams, each matching the JSON structure
  const [teams] = useState([
    {
      NAME: "Phoenix Flames",
      SHORT_NAME: "PF",
      TAG: "PF",
      TAGLINE: "Rising from the ashes",
      TEAM_SIZE: 5,
      PARTICIPANTS: [
        { ACCESS: "ADMIN", USER_ID: "u_1" },
        { ACCESS: "MEMBER", USER_ID: "u_2" },
      ],
      TEAM_LOGO: "",
      TEAM_DESCRIPTION: "Rising from the ashes to dominate the eSports scene",
      GAME: "Valorant",
      TEAM_ID: "c_1",
      MILESTONES: [
        {
          MILESTONE_ID: "m_1",
          MILESTONE_NAME: "First Win",
          MILESTONE_DESCRIPTION: "Won our first tournament!",
          MILESTONE_DATE: "2023-10-01T00:00:00Z",
        },
      ],
      EVENTS_ENROLLED: [
        {
          EVENT_ID: "e_1",
          EVENT_NAME: "Spring Gaming Bash",
          DESCRIPTION: "An exciting gaming tournament.",
          VENUE: "Neon Arena",
          LOCATION: "Online",
          GAME: "Valorant",
        },
      ],
    },
    {
      NAME: "Shadow Wolves",
      SHORT_NAME: "SW",
      TAG: "SW",
      TAGLINE: "Hunting in the darkness",
      TEAM_SIZE: 5,
      PARTICIPANTS: [
        { ACCESS: "ADMIN", USER_ID: "u_3" },
        { ACCESS: "MEMBER", USER_ID: "u_4" },
      ],
      TEAM_LOGO: "",
      TEAM_DESCRIPTION: "Hunting in the darkness, striking when least expected",
      GAME: "CS2",
      TEAM_ID: "c_2",
      MILESTONES: [
        {
          MILESTONE_ID: "m_2",
          MILESTONE_NAME: "Regional Qualifier",
          MILESTONE_DESCRIPTION: "Qualified for regionals.",
          MILESTONE_DATE: "2023-11-01T00:00:00Z",
        },
      ],
      EVENTS_ENROLLED: [
        {
          EVENT_ID: "e_2",
          EVENT_NAME: "Winter Championship",
          DESCRIPTION: "A thrilling winter tournament.",
          VENUE: "Frost Arena",
          LOCATION: "Offline",
          GAME: "CS2",
        },
      ],
    },
  ]);
  const [activeTeam, setActiveTeam] = useState(selectedTeam || null);

  useEffect(() => {
    setActiveTeam(selectedTeam);
  }, [selectedTeam]);

  const handleTeamClick = (team) => {
    setActiveTeam(team);
    if (onTeamSelect) {
      onTeamSelect(team);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-[#292B35] to-[#363945] text-[#E0E0E0] p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => {
              if (activeTeam && viewMode !== "details") {
                setActiveTeam(null);
              } else {
                onBackClick();
              }
            }}
            className="mr-4 text-[#95C5C5] hover:text-[#EE8631] transition-colors"
          >
            <FaArrowLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent leading-loose bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">
            Manage your team
          </h1>
        </motion.div>
        <AnimatePresence mode="wait">
          {!activeTeam || viewMode === "details" ? (
            viewMode === "details" && selectedTeam ? (
              <TeamDashboard
                team={selectedTeam}
                userRole={userRole}
                onBack={onBackClick}
              />
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {teams.map((team) => (
                  <TeamCard
                    key={team.TEAM_ID}
                    team={team}
                    onClick={handleTeamClick}
                  />
                ))}
              </motion.div>
            )
          ) : (
            <TeamDashboard
              team={activeTeam}
              userRole={userRole}
              onBack={() => setActiveTeam(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageTeams;
