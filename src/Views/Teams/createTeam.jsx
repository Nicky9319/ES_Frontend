import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaUpload,
  FaGlobe,
  FaLock,
  FaCheck,
  FaPlus,
  FaTimes,
  FaUsers,
  FaTrophy,
  FaGamepad,
  FaFlagCheckered,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Color scheme constants for consistent styling
const COLORS = {
  primaryDark: "#292B35",
  secondaryDark: "#2F3140",
  accent: "#95C5C5",
  highlight: "#EE8631",
  highlightDark: "#AD662F",
  light: "#E0E0E0",
};

// Available games for selection
const GAMES = [
  "Valorant",
  "CS2",
  "League of Legends",
  "Dota 2",
  "Overwatch 2",
  "Rocket League",
  "Apex Legends",
  "Fortnite",
];

// Helper component for milestone input
const MilestoneInputList = ({ milestones, setMilestones }) => {
  const [newMilestone, setNewMilestone] = useState({
    name: "",
    description: "",
    date: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const addMilestone = () => {
    if (newMilestone.name && newMilestone.date) {
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
      setIsAdding(false);
    }
  };

  const removeMilestone = (id) => {
    setMilestones(milestones.filter((m) => m.MILESTONE_ID !== id));
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <label className="block text-[#95C5C5] font-medium">
          Team Milestones
        </label>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="text-[#EE8631] text-sm flex items-center"
          >
            Add Milestone <FaPlus className="ml-1" size={12} />
          </button>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <AnimatePresence>
          {milestones.map((m) => (
            <motion.div
              key={m.MILESTONE_ID}
              className="flex items-center bg-[#292B35] p-3 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaFlagCheckered className="text-[#EE8631] mr-2" />
              <div className="flex-1">
                <div className="font-bold text-[#95C5C5]">
                  {m.MILESTONE_NAME}
                </div>
                <div className="text-[#E0E0E0] text-sm">
                  {m.MILESTONE_DESCRIPTION}
                </div>
                <div className="text-xs text-[#95C5C5]">{m.MILESTONE_DATE}</div>
              </div>
              <button
                onClick={() => removeMilestone(m.MILESTONE_ID)}
                className="ml-2 text-red-400 hover:text-red-300"
              >
                <FaTimes />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            className="bg-[#292B35] p-4 rounded-lg mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="mb-3">
              <label className="block text-xs text-[#95C5C5] mb-1">
                Milestone Name
              </label>
              <input
                type="text"
                placeholder="e.g. Qualify for Regional Tournament"
                value={newMilestone.name}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#2F3140] border border-[#3A3D4A] rounded text-[#E0E0E0]"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs text-[#95C5C5] mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Win at least 3 matches in qualifiers"
                value={newMilestone.description}
                onChange={(e) =>
                  setNewMilestone({
                    ...newMilestone,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-[#2F3140] border border-[#3A3D4A] rounded text-[#E0E0E0]"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs text-[#95C5C5] mb-1">
                Target Date
              </label>
              <input
                type="date"
                value={newMilestone.date}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, date: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#2F3140] border border-[#3A3D4A] rounded text-[#E0E0E0]"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-3 py-1 text-[#95C5C5]"
              >
                Cancel
              </button>
              <button
                onClick={addMilestone}
                className="px-4 py-2 bg-[#95C5C5] text-[#292B35] rounded hover:bg-opacity-90"
              >
                Add
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper component for team member input
const TeamMembersList = ({ members, setMembers }) => {
  const [newMember, setNewMember] = useState({ id: "", access: "MEMBER" });
  const [isAdding, setIsAdding] = useState(false);

  const addMember = () => {
    if (newMember.id) {
      setMembers([
        ...members,
        {
          USER_ID: newMember.id,
          ACCESS: newMember.access,
        },
      ]);
      setNewMember({ id: "", access: "MEMBER" });
      setIsAdding(false);
    }
  };

  const removeMember = (id) => {
    setMembers(members.filter((m) => m.USER_ID !== id));
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <label className="block text-[#95C5C5] font-medium">Team Members</label>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="text-[#EE8631] text-sm flex items-center"
          >
            Add Member <FaPlus className="ml-1" size={12} />
          </button>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <AnimatePresence>
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="flex items-center bg-[#292B35] p-3 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaUsers className="text-[#95C5C5] mr-2" />
              <div className="flex-1">
                <div className="text-[#E0E0E0]">{member.USER_ID}</div>
                <div className="text-xs text-[#95C5C5]">{member.ACCESS}</div>
              </div>
              <button
                onClick={() => removeMember(member.USER_ID)}
                className="ml-2 text-red-400 hover:text-red-300"
              >
                <FaTimes />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Always show the current user as ADMIN */}
        <div className="flex items-center bg-[#292B35] p-3 rounded-lg border border-[#EE8631]/30">
          <FaUsers className="text-[#EE8631] mr-2" />
          <div className="flex-1">
            <div className="text-[#E0E0E0]">You</div>
            <div className="text-xs text-[#EE8631]">ADMIN (Team Creator)</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            className="bg-[#292B35] p-4 rounded-lg mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="mb-3">
              <label className="block text-xs text-[#95C5C5] mb-1">
                Member ID
              </label>
              <input
                type="text"
                placeholder="e.g. user_12345"
                value={newMember.id}
                onChange={(e) =>
                  setNewMember({ ...newMember, id: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#2F3140] border border-[#3A3D4A] rounded text-[#E0E0E0]"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs text-[#95C5C5] mb-1">
                Access Level
              </label>
              <select
                value={newMember.access}
                onChange={(e) =>
                  setNewMember({ ...newMember, access: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#2F3140] border border-[#3A3D4A] rounded text-[#E0E0E0]"
              >
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-3 py-1 text-[#95C5C5]"
              >
                Cancel
              </button>
              <button
                onClick={addMember}
                className="px-4 py-2 bg-[#95C5C5] text-[#292B35] rounded hover:bg-opacity-90"
              >
                Add
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main component
const CreateTeam = ({ onBackClick }) => {
  // State for multi-step form
  const [formStep, setFormStep] = useState(1);
  const totalSteps = 4;

  // Form data state
  const [formData, setFormData] = useState({
    NAME: "",
    TAG: "",
    TAGLINE: "",
    GAME: "",
    TEAM_DESCRIPTION: "",
    TEAM_SIZE: 4,
    TEAM_LOGO: null,
    PARTICIPANTS: [],
    MILESTONES: [],
    EVENTS_ENROLLED: [],
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Success state
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Handle file upload for team logo
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          TEAM_LOGO: reader.result,
        });

        if (errors.TEAM_LOGO) {
          setErrors({
            ...errors,
            TEAM_LOGO: null,
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle next step with validation
  const handleNextStep = () => {
    // Validate current step
    const currentErrors = validateStep(formStep);

    if (Object.keys(currentErrors).length === 0) {
      setFormStep(formStep + 1);
      window.scrollTo(0, 0);
    } else {
      setErrors(currentErrors);
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    setFormStep(formStep - 1);
    window.scrollTo(0, 0);
  };

  // Validation function for each step
  const validateStep = (step) => {
    const errors = {};

    switch (step) {
      case 1: // Team Identity
        if (!formData.NAME) errors.NAME = "Team name is required";
        if (!formData.TAG) errors.TAG = "Team tag is required";
        if (!formData.GAME) errors.GAME = "Game is required";
        break;

      case 2: // Team Details
        if (!formData.TEAM_DESCRIPTION)
          errors.TEAM_DESCRIPTION = "Team description is required";
        if (formData.TEAM_SIZE < 1)
          errors.TEAM_SIZE = "Team must have at least 1 member";
        break;

      case 3: // Team Members
        // No required validation for milestones and members
        break;

      default:
        break;
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add current user as ADMIN
    const finalTeamData = {
      ...formData,
      PARTICIPANTS: [
        ...formData.PARTICIPANTS,
        { USER_ID: "current_user_id", ACCESS: "ADMIN" },
      ],
    };

    console.log("Team Created:", finalTeamData);
    // Here you would typically send the data to your API
    setIsSuccess(true);
  };

  // Success view after submission
  const SuccessView = () => (
    <motion.div
      className="bg-[#2F3140] rounded-xl shadow-xl p-8 border border-[#3A3D4A]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-[#95C5C5]/20 rounded-full flex items-center justify-center">
          <FaCheck className="text-[#95C5C5] text-3xl" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#E0E0E0] mb-4 text-center">
        Team Created Successfully!
      </h2>

      <div className="mb-6 flex items-center bg-[#292B35] p-4 rounded-lg">
        <div className="w-16 h-16 rounded-full bg-[#95C5C5] flex items-center justify-center overflow-hidden mr-4">
          {formData.TEAM_LOGO ? (
            <img
              src={formData.TEAM_LOGO}
              alt="logo"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-2xl font-bold text-[#292B35]">
              {formData.TAG?.slice(0, 2) || "T"}
            </span>
          )}
        </div>
        <div>
          <div className="font-bold text-[#E0E0E0]">{formData.NAME}</div>
          <div className="text-[#95C5C5]">
            {formData.TAG} • {formData.GAME}
          </div>
          <div className="text-xs text-[#95C5C5] mt-1">
            Team Size: {formData.TEAM_SIZE}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-[#292B35] p-4 rounded-lg">
          <h3 className="font-semibold text-[#95C5C5] mb-2">
            Team Description
          </h3>
          <p className="text-[#E0E0E0]">{formData.TEAM_DESCRIPTION}</p>
        </div>

        <div className="bg-[#292B35] p-4 rounded-lg">
          <h3 className="font-semibold text-[#95C5C5] mb-2">Team Milestones</h3>
          {formData.MILESTONES.length > 0 ? (
            <div className="space-y-2">
              {formData.MILESTONES.map((m) => (
                <div
                  key={m.MILESTONE_ID}
                  className="border-l-2 border-[#EE8631] pl-3"
                >
                  <div className="font-medium text-[#E0E0E0]">
                    {m.MILESTONE_NAME}
                  </div>
                  <div className="text-sm text-[#95C5C5]">
                    {m.MILESTONE_DATE}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#95C5C5]">No milestones set</p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBackClick}
          className="py-3 border border-[#95C5C5] text-[#95C5C5] rounded-lg hover:bg-[#95C5C5] hover:text-[#292B35] flex-1 transition-all"
        >
          Back to Teams
        </button>
        <button
          onClick={() => (window.location.href = "/teams/manage")}
          className="py-3 bg-[#EE8631] text-white rounded-lg hover:bg-[#AD662F] flex-1 transition-all"
        >
          Manage Your Team
        </button>
      </div>
    </motion.div>
  );

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium 
                                ${
                                  index + 1 <= formStep
                                    ? "bg-[#95C5C5] text-[#292B35]"
                                    : "bg-[#292B35] text-[#95C5C5]"
                                }`}
            >
              {index + 1 <= formStep ? (
                index + 1 === formStep ? (
                  index + 1
                ) : (
                  <FaCheck />
                )
              ) : (
                index + 1
              )}
            </div>
            {index < totalSteps - 1 && (
              <div className="flex-1 mx-2">
                <div
                  className={`h-1 ${
                    index + 1 < formStep ? "bg-[#95C5C5]" : "bg-[#292B35]"
                  }`}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-[#95C5C5]">
        <div>Identity</div>
        <div className="text-center">Details</div>
        <div className="text-center">Members</div>
        <div className="text-right">Review</div>
      </div>
    </div>
  );

  // Form steps rendering
  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-[#95C5C5] mb-6">
              Team Identity
            </h2>

            <div className="mb-6">
              <label className="block text-[#95C5C5] font-medium mb-2">
                Team Name *
              </label>
              <input
                type="text"
                name="NAME"
                value={formData.NAME}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#292B35] border rounded-lg text-[#E0E0E0] ${
                  errors.NAME ? "border-red-500" : "border-[#3A3D4A]"
                }`}
                placeholder="e.g. Phoenix Flames"
              />
              {errors.NAME && (
                <p className="mt-1 text-red-500 text-sm">{errors.NAME}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-[#95C5C5] font-medium mb-2">
                Team Tag *
              </label>
              <input
                type="text"
                name="TAG"
                value={formData.TAG}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#292B35] border rounded-lg text-[#E0E0E0] ${
                  errors.TAG ? "border-red-500" : "border-[#3A3D4A]"
                }`}
                placeholder="e.g. [PF]"
                maxLength={5}
              />
              {errors.TAG && (
                <p className="mt-1 text-red-500 text-sm">{errors.TAG}</p>
              )}
              <p className="mt-1 text-[#95C5C5] text-sm">
                Short tag for your team (max 5 characters)
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-[#95C5C5] font-medium mb-2">
                Game *
              </label>
              <div className="relative">
                <select
                  name="GAME"
                  value={formData.GAME}
                  onChange={handleChange}
                  className={`w-full appearance-none px-4 py-3 bg-[#292B35] border rounded-lg text-[#E0E0E0] ${
                    errors.GAME ? "border-red-500" : "border-[#3A3D4A]"
                  }`}
                >
                  <option value="">Select a game</option>
                  {GAMES.map((game) => (
                    <option key={game} value={game}>
                      {game}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#95C5C5]">
                  <FaChevronDown size={12} />
                </div>
              </div>
              {errors.GAME && (
                <p className="mt-1 text-red-500 text-sm">{errors.GAME}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-[#95C5C5] font-medium mb-2">
                Team Tagline
              </label>
              <input
                type="text"
                name="TAGLINE"
                value={formData.TAGLINE}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#292B35] border border-[#3A3D4A] rounded-lg text-[#E0E0E0]"
                placeholder="e.g. Rising from the ashes"
              />
              <p className="mt-1 text-[#95C5C5] text-sm">
                A short phrase that describes your team's spirit
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-[#95C5C5] font-medium mb-2">
                Team Logo
              </label>
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-[#292B35] border border-dashed border-[#3A3D4A] rounded-full flex flex-col items-center justify-center overflow-hidden">
                  {formData.TEAM_LOGO ? (
                    <img
                      src={formData.TEAM_LOGO}
                      alt="Team Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <FaUpload className="text-[#95C5C5] mb-1" />
                      <span className="text-xs text-[#95C5C5]">Upload</span>
                    </>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="px-4 py-2 bg-[#292B35] border border-[#3A3D4A] rounded text-[#E0E0E0] cursor-pointer inline-flex items-center"
                  >
                    <FaUpload className="mr-2" size={14} />
                    Choose Image
                  </label>
                  <p className="mt-2 text-xs text-[#95C5C5]">
                    Recommended: Square image, at least 256x256 pixels
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-[#95C5C5] mb-6">
              Team Details
            </h2>

            <div className="mb-6">
              <label className="block text-[#95C5C5] font-medium mb-2">
                Team Description *
              </label>
              <textarea
                name="TEAM_DESCRIPTION"
                value={formData.TEAM_DESCRIPTION}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#292B35] border rounded-lg text-[#E0E0E0] min-h-[120px] ${
                  errors.TEAM_DESCRIPTION
                    ? "border-red-500"
                    : "border-[#3A3D4A]"
                }`}
                placeholder="Tell us about your team, its focus, goals, and vision..."
              ></textarea>
              {errors.TEAM_DESCRIPTION && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.TEAM_DESCRIPTION}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-[#95C5C5] font-medium mb-2">
                Team Size *
              </label>
              <input
                type="number"
                name="TEAM_SIZE"
                value={formData.TEAM_SIZE}
                onChange={handleChange}
                min={1}
                max={10}
                className={`w-full px-4 py-3 bg-[#292B35] border rounded-lg text-[#E0E0E0] ${
                  errors.TEAM_SIZE ? "border-red-500" : "border-[#3A3D4A]"
                }`}
              />
              {errors.TEAM_SIZE && (
                <p className="mt-1 text-red-500 text-sm">{errors.TEAM_SIZE}</p>
              )}
              <p className="mt-1 text-[#95C5C5] text-sm">
                Maximum number of team members
              </p>
            </div>

            {/* <div className="mb-6">
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="publicTeam"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="w-4 h-4 bg-[#292B35] border-[#3A3D4A] rounded focus:ring-[#95C5C5]"
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="publicTeam"
                    className="text-[#95C5C5] font-medium"
                  >
                    <FaGlobe className="inline mr-2" /> Make this team public
                  </label>
                </div>
              </div>
              <p className="mt-1 text-[#95C5C5] text-sm ml-7">
                Public teams are visible to everyone in the platform
              </p>
            </div> */}

            {/* <div className="mb-6">
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="requestJoin"
                    name="requireApproval"
                    checked={formData.requireApproval}
                    onChange={handleChange}
                    className="w-4 h-4 bg-[#292B35] border-[#3A3D4A] rounded focus:ring-[#95C5C5]"
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="requestJoin"
                    className="text-[#95C5C5] font-medium"
                  >
                    <FaLock className="inline mr-2" /> Require approval for new
                    members
                  </label>
                </div>
              </div>
              <p className="mt-1 text-[#95C5C5] text-sm ml-7">
                Team admins need to approve join requests
              </p>
            </div> */}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-[#95C5C5] mb-6">
              Team Members & Milestones
            </h2>

            <TeamMembersList
              members={formData.PARTICIPANTS}
              setMembers={(members) =>
                setFormData({ ...formData, PARTICIPANTS: members })
              }
            />

            <MilestoneInputList
              milestones={formData.MILESTONES}
              setMilestones={(milestones) =>
                setFormData({ ...formData, MILESTONES: milestones })
              }
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-[#95C5C5] mb-6">
              Review & Create
            </h2>

            <div className="bg-[#292B35] p-6 rounded-lg mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-[#95C5C5] rounded-full text-xl overflow-hidden mr-4">
                  {formData.TEAM_LOGO ? (
                    <img
                      src={formData.TEAM_LOGO}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-[#292B35]">
                      {formData.TAG?.slice(0, 2) || "T"}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold text-[#E0E0E0]">
                      {formData.NAME}
                    </h3>
                    <span className="ml-2 px-2 py-1 bg-[#3A3D4A] text-[#95C5C5] rounded text-xs">
                      {formData.TAG}
                    </span>
                  </div>
                  <div className="text-[#95C5C5]">{formData.TAGLINE}</div>
                  <div className="text-sm text-[#95C5C5] mt-1">
                    {formData.GAME}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#3A3D4A] pt-4 mt-4">
                <h4 className="font-medium text-[#95C5C5] mb-2">
                  Team Description:
                </h4>
                <p className="text-[#E0E0E0]">{formData.TEAM_DESCRIPTION}</p>
              </div>

              <div className="border-t border-[#3A3D4A] pt-4 mt-4">
                <h4 className="font-medium text-[#95C5C5] mb-2">
                  Team Size:{" "}
                  <span className="text-[#E0E0E0]">{formData.TEAM_SIZE}</span>
                </h4>
                <h4 className="font-medium text-[#95C5C5] mt-2">
                  Visibility:{" "}
                  <span className="text-[#E0E0E0]">
                    {formData.isPublic ? "Public" : "Private"}
                  </span>
                </h4>
                <h4 className="font-medium text-[#95C5C5] mt-2">
                  Member Joining:{" "}
                  <span className="text-[#E0E0E0]">
                    {formData.requireApproval
                      ? "Requires Approval"
                      : "Open to Join"}
                  </span>
                </h4>
              </div>

              <div className="border-t border-[#3A3D4A] pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-[#95C5C5]">Team Members:</h4>
                  <span className="text-sm text-[#95C5C5]">
                    {formData.PARTICIPANTS.length + 1} / {formData.TEAM_SIZE}
                  </span>
                </div>
                <div className="bg-[#2F3140] rounded-lg p-2">
                  <div className="flex items-center p-2 border-b border-[#3A3D4A]">
                    <FaUsers className="text-[#EE8631] mr-2" />
                    <div className="flex-1">You (Admin)</div>
                  </div>
                  {formData.PARTICIPANTS.map((member, idx) => (
                    <div key={idx} className="flex items-center p-2">
                      <FaUsers className="text-[#95C5C5] mr-2" />
                      <div className="flex-1">{member.USER_ID}</div>
                      <div className="text-xs text-[#95C5C5]">
                        {member.ACCESS}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#3A3D4A] pt-4 mt-4">
                <h4 className="font-medium text-[#95C5C5] mb-2">
                  Milestones:{" "}
                  <span className="text-[#E0E0E0]">
                    {formData.MILESTONES.length}
                  </span>
                </h4>
                {formData.MILESTONES.length > 0 && (
                  <div className="bg-[#2F3140] rounded-lg p-2">
                    {formData.MILESTONES.map((milestone) => (
                      <div
                        key={milestone.MILESTONE_ID}
                        className="p-2 border-b last:border-b-0 border-[#3A3D4A]"
                      >
                        <div className="font-medium text-[#E0E0E0]">
                          {milestone.MILESTONE_NAME}
                        </div>
                        <div className="text-xs text-[#95C5C5]">
                          Target: {milestone.MILESTONE_DATE}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Navigation buttons
  const renderNavButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {formStep > 1 && (
          <button
            type="button"
            onClick={handlePreviousStep}
            className="px-6 py-3 border border-[#95C5C5] text-[#95C5C5] rounded-lg hover:bg-[#95C5C5] hover:text-[#292B35] transition-colors"
          >
            Previous
          </button>
        )}

        {formStep < totalSteps ? (
          <button
            type="button"
            onClick={handleNextStep}
            className={`px-8 py-3 bg-[#EE8631] text-white rounded-lg hover:bg-[#AD662F] ml-auto transition-colors flex items-center`}
          >
            Next <FaChevronRight className="ml-2" size={12} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#95C5C5] text-[#292B35] rounded-lg hover:bg-opacity-90 ml-auto transition-colors font-medium flex items-center"
          >
            <FaCheck className="mr-2" /> Create Team
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-[#292B35] to-[#363945] p-6">
      <div className="max-w-3xl mx-auto">
        <motion.div className="flex items-center mb-8">
          <button
            onClick={onBackClick}
            className="mr-4 text-[#95C5C5] hover:text-[#EE8631] transition-colors"
          >
            <FaArrowLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">
            Create New Team
          </h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <SuccessView />
          ) : (
            <motion.form
              className="bg-[#2F3140] rounded-xl shadow-xl p-8 border border-[#3A3D4A]"
              onSubmit={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ProgressIndicator />

              <AnimatePresence mode="wait">{renderFormStep()}</AnimatePresence>

              {renderNavButtons()}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreateTeam;
