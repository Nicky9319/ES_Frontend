import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaUpload, FaGlobe, FaLock, FaCheck, FaPlus, FaTimes, FaUsers, FaTrophy, FaGamepad, FaFlagCheckered } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
    primaryDark: "#292B35",
    secondaryDark: "#2F3140",
    accent: "#95C5C5",
    highlight: "#EE8631",
    highlightDark: "#AD662F",
    light: "#E0E0E0"
};

const MilestoneInputList = ({ milestones, setMilestones }) => {
    const [newMilestone, setNewMilestone] = useState({ name: '', description: '', date: '' });

    const addMilestone = () => {
        if (newMilestone.name && newMilestone.date) {
            setMilestones([...milestones, {
                MILESTONE_ID: `m_${Date.now()}`,
                MILESTONE_NAME: newMilestone.name,
                MILESTONE_DESCRIPTION: newMilestone.description,
                MILESTONE_DATE: newMilestone.date
            }]);
            setNewMilestone({ name: '', description: '', date: '' });
        }
    };

    const removeMilestone = (id) => {
        setMilestones(milestones.filter(m => m.MILESTONE_ID !== id));
    };

    return (
        <div className="mb-6">
            <label className="block text-[#95C5C5] font-medium mb-2">Milestones</label>
            <div className="space-y-2 mb-3">
                {milestones.map(m => (
                    <div key={m.MILESTONE_ID} className="flex items-center bg-[#292B35] p-3 rounded-lg">
                        <FaFlagCheckered className="text-[#EE8631] mr-2" />
                        <div className="flex-1">
                            <div className="font-bold text-[#95C5C5]">{m.MILESTONE_NAME}</div>
                            <div className="text-[#E0E0E0]">{m.MILESTONE_DESCRIPTION}</div>
                            <div className="text-xs text-[#95C5C5]">{m.MILESTONE_DATE}</div>
                        </div>
                        <button onClick={() => removeMilestone(m.MILESTONE_ID)} className="ml-2 text-red-400 hover:text-red-300">
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <input
                    type="text"
                    placeholder="Milestone Name"
                    value={newMilestone.name}
                    onChange={e => setNewMilestone({ ...newMilestone, name: e.target.value })}
                    className="flex-1 px-3 py-2 bg-[#292B35] border border-[#3A3D4A] rounded text-[#E0E0E0]"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newMilestone.description}
                    onChange={e => setNewMilestone({ ...newMilestone, description: e.target.value })}
                    className="flex-1 px-3 py-2 bg-[#292B35] border border-[#3A3D4A] rounded text-[#E0E0E0]"
                />
                <input
                    type="date"
                    value={newMilestone.date}
                    onChange={e => setNewMilestone({ ...newMilestone, date: e.target.value })}
                    className="px-3 py-2 bg-[#292B35] border border-[#3A3D4A] rounded text-[#E0E0E0]"
                />
                <button
                    type="button"
                    onClick={addMilestone}
                    className="px-4 py-2 bg-[#95C5C5] text-[#292B35] rounded hover:bg-opacity-80"
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

const CreateTeam = ({ onBackClick }) => {
    const [formStep, setFormStep] = useState(1);
    const [formData, setFormData] = useState({
        NAME: '',
        TAG: '',
        GAME: '',
        TEAM_DESCRIPTION: '',
        TEAM_SIZE: 4,
        TEAM_LOGO: null,
        PARTICIPANTS: [],
        MILESTONES: [],
        EVENTS_ENROLLED: []
    });
    const [milestones, setMilestones] = useState([]);
    const [errors, setErrors] = useState({});
    const [showSummary, setShowSummary] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    TEAM_LOGO: reader.result
                });

                if (errors.logo) {
                    setErrors({
                        ...errors,
                        logo: null
                    });
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handleNextStep = () => {
        setFormStep(formStep + 1);
    };

    const handlePreviousStep = () => {
        setFormStep(formStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, MILESTONES: milestones });
        setShowSummary(true);
    };

    const SummaryView = () => (
        <div className="bg-[#2F3140] rounded-xl shadow-xl p-8 border border-[#3A3D4A]">
            <h2 className="text-2xl font-bold text-[#E0E0E0] mb-4 flex items-center">
                <FaCheck className="text-[#95C5C5] mr-3" /> Team Created!
            </h2>
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <div className="w-16 h-16 rounded-full bg-[#95C5C5] flex items-center justify-center overflow-hidden mr-4">
                        {formData.TEAM_LOGO ? (
                            <img src={formData.TEAM_LOGO} alt="logo" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <span className="text-2xl">{formData.TAG?.slice(0, 2) || "T"}</span>
                        )}
                    </div>
                    <div>
                        <div className="font-bold text-[#E0E0E0]">{formData.NAME}</div>
                        <div className="text-[#95C5C5]">{formData.TAG} • {formData.GAME}</div>
                    </div>
                </div>
                <div className="text-[#E0E0E0] mb-2">{formData.TEAM_DESCRIPTION}</div>
                <div className="text-[#95C5C5] text-sm mb-2">Team Size: {formData.TEAM_SIZE}</div>
            </div>
            <div className="mb-4">
                <h3 className="font-bold text-[#95C5C5] mb-2">Milestones</h3>
                <MilestoneInputList milestones={milestones} setMilestones={() => {}} />
            </div>
            <button
                className="px-6 py-3 bg-[#EE8631] text-white rounded-lg hover:bg-[#AD662F]"
                onClick={onBackClick}
            >
                Back to Teams
            </button>
        </div>
    );

    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-br from-[#292B35] to-[#363945] p-6">
            <div className="max-w-3xl mx-auto">
                <motion.div className="flex items-center mb-8">
                    <button
                        onClick={onBackClick}
                        className="mr-4 text-[#95C5C5] hover:text-[#EE8631]"
                    >
                        <FaArrowLeft size={24} />
                    </button>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">
                        Create New Team
                    </h1>
                </motion.div>
                <AnimatePresence mode="wait">
                    {showSummary ? (
                        <SummaryView />
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-[#2F3140] rounded-xl shadow-xl p-8 border border-[#3A3D4A]">
                            {formStep === 1 && (
                                <>
                                    <div className="mb-6">
                                        <label className="block text-[#95C5C5] font-medium mb-2">Team Name</label>
                                        <input
                                            type="text"
                                            value={formData.NAME}
                                            onChange={e => setFormData({ ...formData, NAME: e.target.value })}
                                            className="w-full px-4 py-3 bg-[#292B35] border border-[#3A3D4A] rounded-lg text-[#E0E0E0]"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-[#95C5C5] font-medium mb-2">Team Tag</label>
                                        <input
                                            type="text"
                                            value={formData.TAG}
                                            onChange={e => setFormData({ ...formData, TAG: e.target.value })}
                                            className="w-full px-4 py-3 bg-[#292B35] border border-[#3A3D4A] rounded-lg text-[#E0E0E0]"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-[#95C5C5] font-medium mb-2">Game</label>
                                        <input
                                            type="text"
                                            value={formData.GAME}
                                            onChange={e => setFormData({ ...formData, GAME: e.target.value })}
                                            className="w-full px-4 py-3 bg-[#292B35] border border-[#3A3D4A] rounded-lg text-[#E0E0E0]"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-[#95C5C5] font-medium mb-2">Team Logo</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="w-full"
                                        />
                                        {formData.TEAM_LOGO && (
                                            <img src={formData.TEAM_LOGO} alt="logo" className="w-24 h-24 mt-2 rounded-full object-cover" />
                                        )}
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="px-8 py-3 bg-[#EE8631] text-white rounded-lg hover:bg-[#AD662F]"
                                            onClick={handleNextStep}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                            {formStep === 2 && (
                                <>
                                    <div className="mb-6">
                                        <label className="block text-[#95C5C5] font-medium mb-2">Team Description</label>
                                        <textarea
                                            value={formData.TEAM_DESCRIPTION}
                                            onChange={e => setFormData({ ...formData, TEAM_DESCRIPTION: e.target.value })}
                                            className="w-full px-4 py-3 bg-[#292B35] border border-[#3A3D4A] rounded-lg text-[#E0E0E0]"
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-[#95C5C5] font-medium mb-2">Team Size</label>
                                        <input
                                            type="number"
                                            value={formData.TEAM_SIZE}
                                            min={1}
                                            max={10}
                                            onChange={e => setFormData({ ...formData, TEAM_SIZE: e.target.value })}
                                            className="w-full px-4 py-3 bg-[#292B35] border border-[#3A3D4A] rounded-lg text-[#E0E0E0]"
                                            required
                                        />
                                    </div>
                                    <MilestoneInputList milestones={milestones} setMilestones={setMilestones} />
                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            className="px-6 py-3 border border-[#95C5C5] text-[#95C5C5] rounded-lg hover:bg-[#95C5C5] hover:text-[#292B35]"
                                            onClick={handlePreviousStep}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="button"
                                            className="px-8 py-3 bg-[#EE8631] text-white rounded-lg hover:bg-[#AD662F]"
                                            onClick={handleNextStep}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                            {formStep === 3 && (
                                <>
                                    <div className="mb-6">
                                        <h3 className="font-bold text-[#95C5C5] mb-2">Review Your Team</h3>
                                        <div className="bg-[#292B35] p-4 rounded-lg">
                                            <div className="font-bold text-[#E0E0E0]">{formData.NAME}</div>
                                            <div className="text-[#95C5C5]">{formData.TAG} • {formData.GAME}</div>
                                            <div className="text-[#E0E0E0]">{formData.TEAM_DESCRIPTION}</div>
                                            <div className="text-[#95C5C5] text-sm">Team Size: {formData.TEAM_SIZE}</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            className="px-6 py-3 border border-[#95C5C5] text-[#95C5C5] rounded-lg hover:bg-[#95C5C5] hover:text-[#292B35]"
                                            onClick={handlePreviousStep}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-[#EE8631] text-white rounded-lg hover:bg-[#AD662F]"
                                        >
                                            <FaCheck className="mr-2" />
                                            Create Team
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CreateTeam;
