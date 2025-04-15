import React, { useState } from 'react';
import { FaArrowLeft, FaUpload, FaGlobe, FaLock, FaCheck, FaPlus, FaTimes } from 'react-icons/fa';

const CreateTeam = ({ onBackClick }) => {
    const [formStep, setFormStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        tag: '',
        game: '',
        description: '',
        region: 'Global',
        privacy: 'Public',
        autoAccept: false,
        acceptRules: false,
        logo: null,
        invitedMembers: []
    });
    
    const [newMember, setNewMember] = useState('');
    const [errors, setErrors] = useState({});
    
    // Sample game options
    const gameOptions = [
        'Valorant', 'CS2', 'League of Legends', 'Dota 2', 
        'Overwatch 2', 'Apex Legends', 'Fortnite', 'Rocket League'
    ];
    
    // Sample region options
    const regionOptions = [
        'Global', 'North America', 'Europe', 'Asia', 'South America', 'Oceania'
    ];
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Clear error for this field if it exists
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };
    
    const handleFileChange = (e) => {
        // Handle logo upload
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                logo: URL.createObjectURL(e.target.files[0])
            });
            
            if (errors.logo) {
                setErrors({
                    ...errors,
                    logo: null
                });
            }
        }
    };
    
    const handleAddMember = (e) => {
        e.preventDefault();
        if (newMember.trim() && !formData.invitedMembers.includes(newMember.trim())) {
            setFormData({
                ...formData,
                invitedMembers: [...formData.invitedMembers, newMember.trim()]
            });
            setNewMember('');
        }
    };
    
    const handleRemoveMember = (memberToRemove) => {
        setFormData({
            ...formData,
            invitedMembers: formData.invitedMembers.filter(member => member !== memberToRemove)
        });
    };
    
    const validateStep = (step) => {
        const newErrors = {};
        
        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = "Team name is required";
            if (!formData.tag.trim()) {
                newErrors.tag = "Team tag is required";
            } else if (formData.tag.length < 2 || formData.tag.length > 5) {
                newErrors.tag = "Tag must be 2-5 characters";
            }
            if (!formData.game) newErrors.game = "Please select a game";
            if (!formData.logo) newErrors.logo = "Team logo is required";
        }
        
        if (step === 2) {
            if (!formData.description.trim()) newErrors.description = "Team description is required";
        }
        
        if (step === 3) {
            if (!formData.acceptRules) newErrors.acceptRules = "You must accept the team rules";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleNextStep = () => {
        if (validateStep(formStep)) {
            setFormStep(formStep + 1);
        }
    };
    
    const handlePreviousStep = () => {
        setFormStep(formStep - 1);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep(3)) {
            // Submit logic would go here
            console.log("Form submitted with data:", formData);
            // Display success message or redirect
            alert("Team created successfully!");
            onBackClick(); // Go back to main view
        }
    };
    
    return (
        <div className="h-screen overflow-y-auto bg-[#E0E0E0] p-6">
            <div className="max-w-3xl mx-auto">
                {/* Header with back button */}
                <div className="flex items-center mb-6">
                    <button onClick={onBackClick} className="mr-4 text-[#292B35] hover:text-[#EE8631]">
                        <FaArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-[#292B35]">Create New Team</h1>
                </div>
                
                {/* Progress indicator */}
                <div className="flex mb-8 justify-between">
                    <div className={`flex-1 text-center ${formStep >= 1 ? 'text-[#292B35] font-medium' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 
                            ${formStep >= 1 ? 'bg-[#95C5C5]' : 'bg-gray-200'}`}>
                            1
                        </div>
                        Team Identity
                    </div>
                    <div className="w-16 self-center border-t-2 border-gray-300"></div>
                    <div className={`flex-1 text-center ${formStep >= 2 ? 'text-[#292B35] font-medium' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 
                            ${formStep >= 2 ? 'bg-[#95C5C5]' : 'bg-gray-200'}`}>
                            2
                        </div>
                        Team Details
                    </div>
                    <div className="w-16 self-center border-t-2 border-gray-300"></div>
                    <div className={`flex-1 text-center ${formStep >= 3 ? 'text-[#292B35] font-medium' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 
                            ${formStep >= 3 ? 'bg-[#95C5C5]' : 'bg-gray-200'}`}>
                            3
                        </div>
                        Members & Finish
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Team Identity */}
                        {formStep === 1 && (
                            <div>
                                <h2 className="text-xl font-bold mb-6 text-[#292B35]">Team Identity</h2>
                                
                                <div className="mb-4">
                                    <label htmlFor="name" className="block font-medium mb-2 text-gray-700">Team Name *</label>
                                    <input 
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter team name"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-[#95C5C5] focus:border-[#95C5C5] outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="tag" className="block font-medium mb-2 text-gray-700">Team Tag (2-5 characters) *</label>
                                    <input 
                                        type="text"
                                        id="tag"
                                        name="tag"
                                        value={formData.tag}
                                        onChange={handleChange}
                                        placeholder="e.g. NRG, T1"
                                        maxLength={5}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-[#95C5C5] focus:border-[#95C5C5] outline-none ${errors.tag ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.tag && <p className="mt-1 text-sm text-red-500">{errors.tag}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="game" className="block font-medium mb-2 text-gray-700">Game *</label>
                                    <select
                                        id="game"
                                        name="game"
                                        value={formData.game}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-[#95C5C5] focus:border-[#95C5C5] outline-none ${errors.game ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select a game</option>
                                        {gameOptions.map(game => (
                                            <option key={game} value={game}>{game}</option>
                                        ))}
                                    </select>
                                    {errors.game && <p className="mt-1 text-sm text-red-500">{errors.game}</p>}
                                </div>
                                
                                <div className="mb-6">
                                    <label className="block font-medium mb-2 text-gray-700">Team Logo *</label>
                                    
                                    <div className="flex flex-col items-center">
                                        {formData.logo ? (
                                            <div className="mb-4">
                                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#95C5C5]">
                                                    <img src={formData.logo} alt="Team Logo" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
                                                <FaUpload className="text-gray-400 text-2xl" />
                                            </div>
                                        )}
                                        
                                        <label htmlFor="logo" className="px-4 py-2 bg-[#292B35] text-white rounded-lg hover:bg-[#3D3F4A] transition cursor-pointer">
                                            <FaUpload className="inline mr-2" />
                                            {formData.logo ? 'Change Logo' : 'Upload Logo'}
                                        </label>
                                        <input 
                                            type="file"
                                            id="logo"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        {errors.logo && <p className="mt-1 text-sm text-red-500">{errors.logo}</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Step 2: Team Details */}
                        {formStep === 2 && (
                            <div>
                                <h2 className="text-xl font-bold mb-6 text-[#292B35]">Team Details</h2>
                                
                                <div className="mb-4">
                                    <label htmlFor="description" className="block font-medium mb-2 text-gray-700">Team Description *</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Tell us about your team, strategy, or goals"
                                        rows={4}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-[#95C5C5] focus:border-[#95C5C5] outline-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                    ></textarea>
                                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="region" className="block font-medium mb-2 text-gray-700">Team Region</label>
                                    <select
                                        id="region"
                                        name="region"
                                        value={formData.region}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#95C5C5] focus:border-[#95C5C5] outline-none"
                                    >
                                        {regionOptions.map(region => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block font-medium mb-2 text-gray-700">Team Privacy</label>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="privacy" 
                                                value="Public"
                                                checked={formData.privacy === 'Public'}
                                                onChange={handleChange}
                                                className="mr-2 text-[#EE8631] focus:ring-[#EE8631]"
                                            />
                                            <div className="flex items-center">
                                                <FaGlobe className="mr-2 text-[#292B35]" />
                                                <span>Public</span>
                                            </div>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="privacy" 
                                                value="Private"
                                                checked={formData.privacy === 'Private'}
                                                onChange={handleChange}
                                                className="mr-2 text-[#EE8631] focus:ring-[#EE8631]"
                                            />
                                            <div className="flex items-center">
                                                <FaLock className="mr-2 text-[#292B35]" />
                                                <span>Private</span>
                                            </div>
                                        </label>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {formData.privacy === 'Public' ? 
                                            'Public teams can be found by anyone' : 
                                            'Private teams are invite-only'}
                                    </p>
                                </div>
                                
                                {formData.privacy === 'Public' && (
                                    <div className="mb-6">
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                name="autoAccept"
                                                checked={formData.autoAccept}
                                                onChange={handleChange}
                                                className="mr-2 text-[#EE8631] focus:ring-[#EE8631]"
                                            />
                                            <div>
                                                <span className="font-medium">Auto-accept join requests</span>
                                                <p className="text-xs text-gray-500">New players will automatically join without approval</p>
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* Step 3: Team Members & Finish */}
                        {formStep === 3 && (
                            <div>
                                <h2 className="text-xl font-bold mb-6 text-[#292B35]">Invite Members</h2>
                                
                                <div className="mb-4">
                                    <label className="block font-medium mb-2 text-gray-700">Invite Players</label>
                                    <div className="flex">
                                        <input 
                                            type="text"
                                            value={newMember}
                                            onChange={(e) => setNewMember(e.target.value)}
                                            placeholder="Enter username or email"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-[#95C5C5] focus:border-[#95C5C5] outline-none"
                                        />
                                        <button 
                                            onClick={handleAddMember}
                                            type="button"
                                            className="px-4 py-2 bg-[#95C5C5] text-[#292B35] font-medium rounded-r-lg hover:bg-[#7BA3A3] transition"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>
                                
                                {formData.invitedMembers.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="font-medium mb-2 text-gray-700">Invited Players</h3>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            {formData.invitedMembers.map((member, index) => (
                                                <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
                                                    <span>{member}</span>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleRemoveMember(member)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                <div className="mb-6 bg-[#292B35] bg-opacity-5 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2 text-[#292B35]">Team Summary</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Team Name</p>
                                            <p className="font-medium">{formData.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Tag</p>
                                            <p className="font-medium">{formData.tag}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Game</p>
                                            <p className="font-medium">{formData.game}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Privacy</p>
                                            <p className="font-medium">{formData.privacy}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            name="acceptRules"
                                            checked={formData.acceptRules}
                                            onChange={handleChange}
                                            className={`mr-2 text-[#EE8631] focus:ring-[#EE8631] ${errors.acceptRules ? 'border-red-500' : ''}`}
                                        />
                                        <div>
                                            <span className="font-medium">I accept the Team Rules and Code of Conduct</span>
                                        </div>
                                    </label>
                                    {errors.acceptRules && <p className="mt-1 text-sm text-red-500">{errors.acceptRules}</p>}
                                </div>
                            </div>
                        )}
                        
                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                            {formStep > 1 ? (
                                <button 
                                    type="button" 
                                    onClick={handlePreviousStep}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Previous
                                </button>
                            ) : (
                                <div></div> // Empty div for spacing
                            )}
                            
                            {formStep < 3 ? (
                                <button 
                                    type="button" 
                                    onClick={handleNextStep}
                                    className="px-6 py-2 bg-[#EE8631] text-white rounded-lg hover:bg-[#AD662F] transition"
                                >
                                    Next
                                </button>
                            ) : (
                                <button 
                                    type="submit"
                                    className="px-8 py-2 bg-[#292B35] text-white rounded-lg hover:bg-[#3D3F4A] transition flex items-center"
                                >
                                    <FaCheck className="mr-2" />
                                    Create Team
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTeam;
