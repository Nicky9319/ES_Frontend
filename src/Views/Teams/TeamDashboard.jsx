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
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGamepad,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Color constants using the specified theme
const COLORS = {
  background: "#292B35", // Dark Blue-Gray
  cardBg: "#35383f", // Slightly lighter version of background
  primary: "#95C5C5", // Teal/Seafoam
  secondary: "#EE8631", // Orange
  tertiary: "#AD662F", // Brown
  text: "#E0E0E0", // Light Gray
  textMuted: "#A8A8A8", // Slightly darker version of text
};

// Enhanced Card component for consistent styling
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-[#35383f] rounded-xl border border-[#95C5C5]/10 p-5 shadow-lg ${className}`}
  >
    {children}
  </div>
);

// Improved Section Header component
const SectionHeader = ({ icon, title, actionText, onAction }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <div className="text-[#95C5C5] bg-[#95C5C5]/10 p-2 rounded-lg">
        {icon}
      </div>
      <h2 className="font-bold text-sm tracking-wider">{title}</h2>
    </div>
    {actionText && (
      <button
        className="text-[#EE8631] text-xs flex items-center hover:bg-[#EE8631]/10 py-1 px-2 rounded-md transition-all"
        onClick={onAction}
      >
        {actionText}{" "}
        <FaChevronRight
          className="ml-1 transition-transform group-hover:translate-x-1"
          size={10}
        />
      </button>
    )}
  </div>
);

// Badge component for consistent styling
const Badge = ({ children, color = "primary" }) => {
  const colorClasses = {
    primary: "bg-[#95C5C5]/15 text-[#95C5C5]",
    secondary: "bg-[#EE8631]/15 text-[#EE8631]",
    tertiary: "bg-[#AD662F]/15 text-[#AD662F]",
    neutral: "bg-[#E0E0E0]/15 text-[#E0E0E0]",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
};

// Button component for consistent styling
const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  onClick,
  className = "",
}) => {
  const variantClasses = {
    primary: "bg-[#95C5C5] hover:bg-[#7daeae] text-[#292B35] font-medium",
    secondary: "bg-[#EE8631] hover:bg-[#d6752c] text-[#292B35] font-medium",
    tertiary: "bg-[#AD662F] hover:bg-[#96582a] text-[#E0E0E0] font-medium",
    outline:
      "bg-transparent border border-[#95C5C5] text-[#95C5C5] hover:bg-[#95C5C5]/10",
    danger: "bg-[#EE8631] hover:bg-[#d6752c] text-[#292B35] font-medium",
    ghost: "bg-transparent hover:bg-[#E0E0E0]/10 text-[#E0E0E0]",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-lg transition-all flex items-center justify-center gap-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

// Input component for consistent styling
const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) => (
  <div className="mb-3">
    {label && (
      <label className="block text-xs text-[#95C5C5] mb-1 font-medium">
        {label}
      </label>
    )}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 bg-[#292B35] border border-[#95C5C5]/20 rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-1 focus:ring-[#95C5C5] focus:border-[#95C5C5] transition-all ${className}`}
    />
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
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState({ id: "", access: "MEMBER" });

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

  const addMember = () => {
    if (!newMember.id) return;

    setTeamMembers([
      ...teamMembers,
      {
        USER_ID: newMember.id,
        ACCESS: newMember.access,
      },
    ]);

    setNewMember({ id: "", access: "MEMBER" });
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-[#292B35] text-[#E0E0E0] p-6">
      {/* Team Header Section */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="text-[#95C5C5] hover:text-[#EE8631] mr-4 bg-[#35383f] p-2 rounded-full transition-colors"
        >
          <FaArrowLeft size={18} />
        </button>
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#95C5C5] to-[#EE8631] rounded-xl overflow-hidden shadow-lg">
            {team.TEAM_LOGO ? (
              <img
                src={team.TEAM_LOGO}
                alt="logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-[#292B35]">
                {team.TAG?.slice(0, 2) || "T"}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#E0E0E0]">{team.NAME}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge color="primary">{team.TAG}</Badge>
              <Badge color="secondary">{team.GAME}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Team Info and Members - Left Column */}
        <div className="space-y-5">
          {/* Team Description Card */}
          <Card>
            <SectionHeader
              icon={<FaUsers size={16} />}
              title="TEAM INFO"
              actionText={isAdmin ? "Edit" : null}
              onAction={() => {}}
            />
            <div className="bg-[#292B35] rounded-xl p-4 mb-4">
              <p className="text-sm text-[#E0E0E0] mb-4 leading-relaxed">
                {team.TEAM_DESCRIPTION || "No team description available."}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge color="primary">
                  Team Size: {team.TEAM_SIZE || teamMembers.length}
                </Badge>
                {team.TAGLINE && (
                  <Badge color="secondary">"{team.TAGLINE}"</Badge>
                )}
              </div>
            </div>
          </Card>

          {/* Team Members Card */}
          <Card>
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
                    className="flex items-center p-3 bg-[#292B35] rounded-xl transition-all hover:bg-[#35383f] border border-transparent hover:border-[#95C5C5]/20"
                  >
                    <div
                      className={
                        member.ACCESS === "ADMIN"
                          ? "p-2 bg-[#EE8631]/10 rounded-lg text-[#EE8631]"
                          : "p-2 bg-[#95C5C5]/10 rounded-lg text-[#95C5C5]"
                      }
                    >
                      <FaUser size={14} />
                    </div>
                    <div className="flex-1 ml-3">
                      <div className="font-medium text-sm">
                        {member.USER_ID}
                      </div>
                      <div className="text-xs text-[#A8A8A8]">
                        {member.ACCESS}
                      </div>
                    </div>
                    {isAdmin && member.ACCESS !== "ADMIN" && (
                      <button className="text-[#EE8631] hover:text-[#d6752c] bg-[#EE8631]/10 p-2 rounded-lg">
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-[#A8A8A8] italic text-center py-6 bg-[#292B35] rounded-xl">
                  No members
                </div>
              )}
              {isAdmin && (
                <>
                  <AnimatePresence>
                    {isAdding && (
                      <motion.div
                        className="bg-[#292B35] p-4 rounded-xl mb-4 border border-[#95C5C5]/20"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Input
                          label="Member ID"
                          placeholder="e.g. user_12345"
                          value={newMember.id}
                          onChange={(e) =>
                            setNewMember({
                              ...newMember,
                              id: e.target.value,
                            })
                          }
                        />

                        <div className="mb-3">
                          <label className="block text-xs text-[#95C5C5] mb-1 font-medium">
                            Access Level
                          </label>
                          <select
                            value={newMember.access}
                            onChange={(e) =>
                              setNewMember({
                                ...newMember,
                                access: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-[#292B35] border border-[#95C5C5]/20 rounded-lg text-[#E0E0E0] focus:outline-none focus:ring-1 focus:ring-[#95C5C5] focus:border-[#95C5C5]"
                          >
                            <option value="MEMBER">Member</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsAdding(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={addMember}
                            icon={<FaPlus size={12} />}
                          >
                            Add
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!isAdding && (
                    <button
                      className="w-full mt-3 p-3 border border-dashed border-[#95C5C5]/30 rounded-xl text-sm text-[#95C5C5] hover:bg-[#95C5C5]/10 transition-colors flex items-center justify-center"
                      onClick={() => setIsAdding(true)}
                    >
                      <FaPlus className="mr-2" size={12} /> Add Member
                    </button>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Milestones Section - Middle Column */}
        <div className="space-y-5">
          <Card>
            <SectionHeader
              icon={<FaFlagCheckered size={16} />}
              title="TEAM MILESTONES"
              actionText={
                isAdmin ? (showMilestoneForm ? "Cancel" : "Add New") : null
              }
              onAction={() => setShowMilestoneForm(!showMilestoneForm)}
            />

            <AnimatePresence>
              {showMilestoneForm && isAdmin && (
                <motion.div
                  className="mb-4 p-4 bg-[#292B35] rounded-xl border border-[#95C5C5]/20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Input
                    label="Milestone Name"
                    placeholder="Enter milestone name"
                    value={newMilestone.name}
                    onChange={(e) =>
                      setNewMilestone({ ...newMilestone, name: e.target.value })
                    }
                  />

                  <Input
                    label="Description"
                    placeholder="Brief description"
                    value={newMilestone.description}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        description: e.target.value,
                      })
                    }
                  />

                  <div className="flex gap-3">
                    <div className="flex-grow">
                      <Input
                        label="Date"
                        type="date"
                        value={newMilestone.date}
                        onChange={(e) =>
                          setNewMilestone({
                            ...newMilestone,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-end mb-3">
                      <Button
                        variant="secondary"
                        onClick={handleAddMilestone}
                        icon={<FaCheck size={12} />}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {milestones.length > 0 ? (
                milestones.map((m) => (
                  <div
                    key={m.MILESTONE_ID}
                    className="bg-[#292B35] rounded-xl p-4 transition-all hover:bg-[#35383f] border border-transparent hover:border-[#95C5C5]/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-[#EE8631]/10 text-[#EE8631]">
                        <FaFlagCheckered size={14} />
                      </div>
                      <div className="font-bold text-[#95C5C5]">
                        {m.MILESTONE_NAME}
                      </div>
                      {isAdmin && (
                        <button
                          className="ml-auto text-[#EE8631] hover:text-[#d6752c] bg-[#EE8631]/10 p-2 rounded-lg"
                          onClick={() => deleteMilestone(m.MILESTONE_ID)}
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>
                    <div className="text-[#E0E0E0] text-sm ml-11 mb-2">
                      {m.MILESTONE_DESCRIPTION}
                    </div>
                    <div className="flex items-center gap-2 ml-11">
                      <FaCalendarAlt className="text-[#AD662F] text-xs" />
                      <div className="text-xs text-[#A8A8A8]">
                        {new Date(m.MILESTONE_DATE).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-[#292B35] rounded-xl">
                  <FaFlagCheckered
                    size={32}
                    className="mx-auto mb-3 text-[#A8A8A8] opacity-30"
                  />
                  <p className="text-sm text-[#A8A8A8]">No milestones set</p>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => setShowMilestoneForm(true)}
                      icon={<FaPlus size={12} />}
                    >
                      Add milestone
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>

          <Card>
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
                    className="bg-[#292B35] p-4 rounded-xl transition-all hover:bg-[#35383f] border border-transparent hover:border-[#95C5C5]/20"
                  >
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-lg bg-[#AD662F]/10 text-[#AD662F]">
                        <FaTrophy size={14} />
                      </div>
                      <span className="font-bold text-[#95C5C5] ml-3">
                        {e.EVENT_NAME}
                      </span>
                    </div>
                    <div className="text-[#E0E0E0] text-sm ml-11 mb-3">
                      {e.DESCRIPTION}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#A8A8A8] ml-11">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-[#EE8631]" />
                        {e.VENUE}, {e.LOCATION}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaGamepad className="text-[#AD662F]" />
                        {e.GAME}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-[#292B35] rounded-xl">
                  <FaTrophy
                    size={32}
                    className="mx-auto mb-3 text-[#A8A8A8] opacity-30"
                  />
                  <p className="text-sm text-[#A8A8A8]">No events enrolled</p>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      icon={<FaPlus size={12} />}
                    >
                      Find events
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Chat + Events */}
        <div className="space-y-5">
          {/* Team Chat Section */}
          <Card className="h-full flex flex-col">
            <SectionHeader icon={<FaComments size={16} />} title="TEAM CHAT" />
            <div className="flex flex-col flex-grow">
              <div className="flex-1 bg-[#292B35] rounded-xl p-4 mb-4 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`mb-3 ${
                      msg.user === "You"
                        ? "ml-auto max-w-[80%]"
                        : "mr-auto max-w-[80%]"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl ${
                        msg.user === "You"
                          ? "bg-[#95C5C5]/20 text-white rounded-br-none"
                          : "bg-[#EE8631]/20 text-white rounded-bl-none"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`font-bold text-xs ${
                            msg.user === "You"
                              ? "text-[#95C5C5]"
                              : "text-[#EE8631]"
                          }`}
                        >
                          {msg.user}
                        </span>
                        <span className="text-xs text-[#A8A8A8]">
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-[#E0E0E0]">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 bg-[#292B35] border border-[#95C5C5]/20 rounded-xl text-[#E0E0E0] focus:outline-none focus:ring-1 focus:ring-[#95C5C5] focus:border-[#95C5C5] transition-all"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button variant="primary" onClick={handleSendMessage}>
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
