import React, { useState } from "react";
import {
  FaFlagCheckered,
  FaTrophy,
  FaUsers,
  FaUser,
  FaPlus,
  FaEdit,
  FaSave,
  FaComments,
  FaTrash,
  FaTimes,
  FaArrowLeft,
  FaCheck,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Color constants for consistent styling
const COLORS = {
  primary: "#292B35",
  secondary: "#35383f",
  accent1: "#95C5C5",
  accent2: "#EE8631",
  accent3: "#AD662F",
  text: "#E0E0E0",
};

// Header component for each section
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
        {actionText}{" "}
        {actionText && <FaChevronRight className="ml-1" size={10} />}
      </button>
    )}
  </div>
);

const TeamDashboard = ({ team, userRole = "MEMBER", onBack }) => {
  const [milestones, setMilestones] = useState(team.MILESTONES || []);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: "Alex",
      message: "When is our next practice?",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: "Sarah",
      message: "Tomorrow at 8pm, don't be late!",
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      user: "Mike",
      message: "I might be 10 mins late, heads up",
      timestamp: "45 mins ago",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [newMilestone, setNewMilestone] = useState({
    name: "",
    description: "",
    date: "",
  });
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [teamMembers, setTeamMembers] = useState(team.PARTICIPANTS || []);

  const isAdmin = userRole === "ADMIN";

  const handleAddMilestone = () => {
    if (!newMilestone.name || !newMilestone.date) return;
    setMilestones([
      ...milestones,
      {
        MILESTONE_ID: `m_${Date.now()}`,
        MILESTONE_NAME: newMilestone.name,
        MILESTONE_DESCRIPTION: newMilestone.description,
        MILESTONE_DATE: newMilestone.date,
      },
    ]);
    setNewMilestone({ name: "", description: "", date: "" });
    setShowMilestoneForm(false);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        id: Date.now(),
        user: "You",
        message: chatInput,
        timestamp: "now",
      },
    ]);
    setChatInput("");
  };

  const deleteMilestone = (id) => {
    if (isAdmin) {
      setMilestones(milestones.filter((m) => m.MILESTONE_ID !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#292B35] text-[#E0E0E0] p-4">
      {/* Team Header Section */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-[#95C5C5] hover:text-[#EE8631] mr-4"
        >
          <FaArrowLeft size={20} />
        </button>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 flex items-center justify-center bg-[#95C5C5] rounded-full overflow-hidden">
            {team.TEAM_LOGO ? (
              <img
                src={team.TEAM_LOGO}
                alt="logo"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-2xl">{team.TAG?.slice(0, 2) || "T"}</span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{team.NAME}</h2>
            <p className="text-[#95C5C5]">
              {team.TAG} • {team.GAME}
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Team Info and Members - Left Column */}
        <div className="space-y-4">
          {/* Team Description Card */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader
              icon={<FaUsers size={16} />}
              title="TEAM INFO"
              actionText={isAdmin ? "Edit" : null}
              onAction={() => {}}
            />
            <div className="bg-[#292B35] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#E0E0E0] mb-3">
                {team.TEAM_DESCRIPTION || "No team description available."}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-[#95C5C5]/20 text-[#95C5C5] rounded-full">
                  Team Size: {team.TEAM_SIZE || teamMembers.length}
                </span>
                {team.TAGLINE && (
                  <span className="px-2 py-1 bg-[#EE8631]/20 text-[#EE8631] rounded-full">
                    "{team.TAGLINE}"
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Team Members Card */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader
              icon={<FaUsers size={16} />}
              title="TEAM MEMBERS"
              actionText={isAdmin ? "Manage" : null}
              onAction={() => {}}
            />
            <div className="space-y-2 max-h-[300px] min-h-[200px] overflow-y-auto pr-1">
              {teamMembers.length > 0 ? (
                teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-[#292B35] rounded-lg"
                  >
                    <FaUser
                      className={
                        member.ACCESS === "ADMIN"
                          ? "text-[#EE8631]"
                          : "text-[#95C5C5]"
                      }
                    />
                    <div className="flex-1 ml-3">
                      <div className="font-medium text-sm">
                        {member.USER_ID}
                      </div>
                      <div className="text-xs text-gray-400">
                        {member.ACCESS}
                      </div>
                    </div>
                    {isAdmin && member.ACCESS !== "ADMIN" && (
                      <button className="text-red-400 hover:text-red-300">
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-[#95C5C5]/70 italic text-center py-3">
                  No members
                </div>
              )}
              {isAdmin && (
                <button className="w-full mt-2 p-2 border border-dashed border-[#95C5C5]/30 rounded-lg text-sm text-[#95C5C5] hover:bg-[#292B35] flex items-center justify-center">
                  <FaPlus className="mr-2" size={12} /> Add Member
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Milestones Section - Middle Column */}
        <div className="space-y-4">
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader
              icon={<FaFlagCheckered size={16} />}
              title="TEAM MILESTONES"
              actionText={
                isAdmin ? (showMilestoneForm ? "Cancel" : "Add New") : null
              }
              onAction={() => setShowMilestoneForm(!showMilestoneForm)}
            />
            {showMilestoneForm && isAdmin && (
              <div className="mb-3 p-3 bg-[#292B35] rounded-lg">
                <input
                  type="text"
                  placeholder="Milestone name"
                  className="w-full mb-2 p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
                  value={newMilestone.name}
                  onChange={(e) =>
                    setNewMilestone({ ...newMilestone, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full mb-2 p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
                  value={newMilestone.description}
                  onChange={(e) =>
                    setNewMilestone({
                      ...newMilestone,
                      description: e.target.value,
                    })
                  }
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-grow p-2 bg-[#35383f] border border-[#95C5C5]/20 rounded text-sm"
                    value={newMilestone.date}
                    onChange={(e) =>
                      setNewMilestone({ ...newMilestone, date: e.target.value })
                    }
                  />
                  <button
                    onClick={handleAddMilestone}
                    className="px-3 py-2 bg-[#EE8631] text-[#292B35] rounded font-medium text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {milestones.length > 0 ? (
                milestones.map((m) => (
                  <div
                    key={m.MILESTONE_ID}
                    className="flex items-center p-3 bg-[#292B35] rounded-lg"
                  >
                    <div className="p-2 rounded-full mr-3 bg-[#EE8631]/10 text-[#EE8631]">
                      <FaFlagCheckered size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[#95C5C5]">
                        {m.MILESTONE_NAME}
                      </div>
                      <div className="text-[#E0E0E0] text-sm">
                        {m.MILESTONE_DESCRIPTION}
                      </div>
                      <div className="text-xs text-[#95C5C5] mt-1">
                        {new Date(m.MILESTONE_DATE).toLocaleDateString()}
                      </div>
                    </div>
                    {isAdmin && (
                      <button
                        className="ml-2 text-red-400 hover:text-red-300"
                        onClick={() => deleteMilestone(m.MILESTONE_ID)}
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaFlagCheckered
                    size={24}
                    className="mx-auto mb-2 opacity-50"
                  />
                  <p className="text-sm">No milestones set</p>
                  {isAdmin && (
                    <button
                      className="mt-2 text-xs text-[#EE8631]"
                      onClick={() => setShowMilestoneForm(true)}
                    >
                      Add a milestone
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader
              icon={<FaTrophy size={16} />}
              title="EVENT INFORMATION"
              actionText="View All"
              onAction={() => {}}
            />
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
              {team.EVENTS_ENROLLED && team.EVENTS_ENROLLED.length > 0 ? (
                team.EVENTS_ENROLLED.map((e) => (
                  <div
                    key={e.EVENT_ID}
                    className="bg-[#292B35] p-4 rounded-lg flex flex-col"
                  >
                    <div className="flex items-center mb-2">
                      <div className="p-2 rounded-full mr-3 bg-[#EE8631]/10 text-[#EE8631]">
                        <FaTrophy size={14} />
                      </div>
                      <span className="font-bold text-[#95C5C5]">
                        {e.EVENT_NAME}
                      </span>
                    </div>
                    <div className="text-[#E0E0E0] text-sm">
                      {e.DESCRIPTION}
                    </div>
                    <div className="text-xs text-[#95C5C5] mt-1">
                      {e.VENUE} • {e.LOCATION} • {e.GAME}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaTrophy size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No events enrolled</p>
                  {isAdmin && (
                    <button className="mt-2 text-xs text-[#EE8631]">
                      Find events
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Chat + Events */}
        <div className="space-y-4">
          {/* Team Chat Section */}
          <div className="bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-4 shadow-lg">
            <SectionHeader icon={<FaComments size={16} />} title="TEAM CHAT" />
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 bg-[#292B35] rounded-lg p-4 mb-4 overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="mb-2">
                    <span className="font-bold text-[#95C5C5]">
                      {msg.user}:
                    </span>
                    <span className="text-[#E0E0E0]"> {msg.message}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 bg-[#292B35] border border-[#95C5C5]/20 rounded text-[#E0E0E0]"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-[#95C5C5] text-[#292B35] rounded hover:bg-opacity-90"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Event Information Section */}
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
