import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaUpload, FaGlobe, FaLock, FaCheck, FaPlus, FaTimes, FaUsers, FaTrophy, FaGamepad } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [showContent, setShowContent] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);
    
    const gameOptions = [
        { name: 'Valorant', icon: '🎯' },
        { name: 'CS2', icon: '🔫' },
        { name: 'League of Legends', icon: '🧙‍♂️' },
        { name: 'Dota 2', icon: '🛡️' },
        { name: 'Overwatch 2', icon: '🦸‍♂️' },
        { name: 'Apex Legends', icon: '🏃‍♂️' },
        { name: 'Fortnite', icon: '🏗️' },
        { name: 'Rocket League', icon: '🚗' }
    ];
    
    const regionOptions = [
        { name: 'Global', flag: '🌎' },
        { name: 'North America', flag: '🇺🇸' },
        { name: 'Europe', flag: '🇪🇺' },
        { name: 'Asia', flag: '🇯🇵' },
        { name: 'South America', flag: '🇧🇷' },
        { name: 'Oceania', flag: '🇦🇺' }
    ];
    
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
                    logo: reader.result
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
            window.scrollTo(0, 0);
        }
    };
    
    const handlePreviousStep = () => {
        setFormStep(formStep - 1);
        window.scrollTo(0, 0);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep(3)) {
            console.log("Form submitted with data:", formData);
            alert("Team created successfully!");
            onBackClick();
        }
    };
    
    const FormComponent = ({ children, title, subtitle }) => (
        <motion.div 
            className="bg-[#2F3140] rounded-xl shadow-xl overflow-hidden border border-[#3A3D4A]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="bg-gradient-to-r from-[#292B35] to-[#3A3D4A] p-6 border-b border-[#3A3D4A]">
                <h2 className="text-2xl font-bold text-[#E0E0E0] flex items-center">
                    {formStep === 1 && <FaUsers className="text-[#95C5C5] mr-3" />}
                    {formStep === 2 && <FaGamepad className="text-[#95C5C5] mr-3" />}
                    {formStep === 3 && <FaTrophy className="text-[#95C5C5] mr-3" />}
                    {title}
                </h2>
                {subtitle && <p className="text-[#95C5C5] mt-1 ml-8">{subtitle}</p>}
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
                {children}
            </form>
        </motion.div>
    );
    
    const ProgressSteps = () => (
        <motion.div 
            className="mb-8" 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between mb-2">
                {[1, 2, 3].map((step) => (
                    <div 
                        key={step} 
                        className={`relative flex flex-col items-center ${
                            step < formStep ? 'text-[#EE8631]' : 
                            step === formStep ? 'text-[#95C5C5]' : 'text-[#95C5C5]/50'
                        }`}
                    >
                        <motion.div 
                            className={`w-12 h-12 flex items-center justify-center rounded-full ${
                                step < formStep ? 'bg-[#EE8631] text-white' : 
                                step === formStep ? 'bg-[#95C5C5] text-[#292B35]' : 'bg-[#95C5C5]/30 text-[#E0E0E0]/70'
                            }`}
                            whileHover={step <= formStep ? { scale: 1.1 } : {}}
                            whileTap={step <= formStep ? { scale: 0.95 } : {}}
                        >
                            {step}
                        </motion.div>
                        <motion.div 
                            className="text-sm font-medium mt-2 whitespace-nowrap"
                            animate={{ scale: step === formStep ? 1.05 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {step === 1 ? 'Team Identity' : step === 2 ? 'Team Details' : 'Members & Finish'}
                        </motion.div>
                    </div>
                ))}
            </div>
            
            <div className="w-full bg-[#95C5C5]/30 h-2 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-[#EE8631]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((formStep - 1) / 2) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </motion.div>
    );
    
    const FormInput = ({ id, name, label, type = "text", value, onChange, placeholder, required = false, error }) => (
        <div className="mb-4">
            <label htmlFor={id} className="block text-[#95C5C5] font-medium mb-2">
                {label} {required && <span className="text-[#EE8631]">*</span>}
            </label>
            <input 
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-3 bg-[#292B35] border ${error ? 'border-red-500' : 'border-[#3A3D4A]'} rounded-lg focus:ring-2 focus:ring-[#95C5C5] focus:border-[#95C5C5] outline-none text-[#E0E0E0] placeholder-gray-500`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
    
    const FormSelect = ({ id, name, label, value, onChange, options, required = false, error }) => (
        <div className="mb-4">
            <label htmlFor={id} className="block text-[#95C5C5] font-medium mb-2">
                {label} {required && <span className="text-[#EE8631]">*</span>}
            </label>
            <div className="relative">
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full appearance-none px-4 py-3 bg-[#292B35] border ${error ? 'border-red-500' : 'border-[#3A3D4A]'} rounded-lg focus:ring-2 focus:ring-[#95C5C5] focus:border-[#95C5C5] outline-none text-[#E0E0E0] pr-10`}
                >
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                        <option key={option.name} value={option.name}>
                            {option.flag || option.icon} {option.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#95C5C5]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
    
    const FormTextArea = ({ id, name, label, value, onChange, placeholder, required = false, rows = 4, error }) => (
        <div className="mb-4">
            <label htmlFor={id} className="block text-[#95C5C5] font-medium mb-2">
                {label} {required && <span className="text-[#EE8631]">*</span>}
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`w-full px-4 py-3 bg-[#292B35] border ${error ? 'border-red-500' : 'border-[#3A3D4A]'} rounded-lg focus:ring-2 focus:ring-[#95C5C5] focus:border-[#95C5C5] outline-none text-[#E0E0E0] placeholder-gray-500`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
    
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };
    
    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-br from-[#292B35] to-[#363945] p-6">
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    className="flex items-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
                    transition={{ duration: 0.5 }}
                >
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
                
                <ProgressSteps />
                
                <AnimatePresence mode="wait">
                    {formStep === 1 && (
                        <FormComponent key="step1" title="Team Identity" subtitle="Establish your team's brand">
                            <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <FormInput 
                                        id="name"
                                        name="name"
                                        label="Team Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter a memorable team name"
                                        required
                                        error={errors.name}
                                    />
                                    
                                    <FormInput 
                                        id="tag"
                                        name="tag"
                                        label="Team Tag (2-5 characters)"
                                        value={formData.tag}
                                        onChange={handleChange}
                                        placeholder="e.g. NRG, T1, 100T"
                                        maxLength={5}
                                        required
                                        error={errors.tag}
                                    />
                                </div>
                                
                                <FormSelect 
                                    id="game"
                                    name="game"
                                    label="Primary Game"
                                    value={formData.game}
                                    onChange={handleChange}
                                    options={gameOptions}
                                    required
                                    error={errors.game}
                                />
                                
                                <div className="mb-6 mt-8">
                                    <label className="block text-[#95C5C5] font-medium mb-4">Team Logo</label>
                                    
                                    <div className="flex flex-col items-center">
                                        <motion.div 
                                            className="mb-6 relative"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {formData.logo ? (
                                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#95C5C5]">
                                                    <motion.img 
                                                        src={formData.logo} 
                                                        alt="Team Logo" 
                                                        className="w-full h-full object-cover"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-40 h-40 rounded-full bg-[#292B35] flex items-center justify-center border-4 border-dashed border-[#3A3D4A]">
                                                    <FaUpload className="text-[#95C5C5] text-4xl" />
                                                </div>
                                            )}
                                            
                                            {!formData.logo && (
                                                <motion.div 
                                                    className="absolute inset-0 rounded-full border-4 border-[#95C5C5]"
                                                    animate={{ 
                                                        scale: [1, 1.05, 1],
                                                        opacity: [0.7, 0.3, 0.7],
                                                    }}
                                                    transition={{ 
                                                        duration: 2,
                                                        repeat: Infinity,
                                                    }}
                                                />
                                            )}
                                        </motion.div>
                                        
                                        <label 
                                            htmlFor="logo" 
                                            className="px-6 py-3 bg-[#95C5C5] text-[#292B35] font-medium rounded-lg hover:bg-opacity-80 cursor-pointer transition-colors flex items-center"
                                        >
                                            <FaUpload className="mr-2" />
                                            {formData.logo ? 'Change Team Logo' : 'Upload Team Logo'}
                                        </label>
                                        
                                        <input 
                                            type="file"
                                            id="logo"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        
                                        {errors.logo && <p className="mt-2 text-sm text-red-500">{errors.logo}</p>}
                                        
                                        <p className="mt-3 text-sm text-[#95C5C5]/70 text-center">
                                            Upload a high-quality square image for best results.<br />
                                            Maximum size: 2MB
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                            
                            <div className="flex justify-end mt-8">
                                <motion.button 
                                    type="button" 
                                    onClick={handleNextStep}
                                    className="px-8 py-3 bg-[#EE8631] text-white font-medium rounded-lg hover:bg-[#AD662F] transition-colors shadow-lg flex items-center"
                                    whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(238, 134, 49, 0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Next Step
                                </motion.button>
                            </div>
                        </FormComponent>
                    )}
                    
                    {formStep === 2 && (
                        <FormComponent key="step2" title="Team Details" subtitle="Tell the community about your team">
                            <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                                <FormTextArea 
                                    id="description"
                                    name="description"
                                    label="Team Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your team's goals, achievements, and gaming style..."
                                    rows={5}
                                    required
                                    error={errors.description}
                                />
                                
                                <FormSelect 
                                    id="region"
                                    name="region"
                                    label="Team Region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    options={regionOptions}
                                />
                                
                                <div className="mb-6 mt-8">
                                    <label className="block text-[#95C5C5] font-medium mb-3">Team Privacy</label>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <motion.label 
                                            className={`flex items-center cursor-pointer p-4 rounded-lg border-2 ${
                                                formData.privacy === 'Public' 
                                                    ? 'border-[#95C5C5] bg-[#292B35]'
                                                    : 'border-[#3A3D4A] bg-[#292B35]/50'
                                            }`}
                                            whileHover={{ scale: 1.02, borderColor: '#95C5C5' }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <input 
                                                type="radio" 
                                                name="privacy" 
                                                value="Public"
                                                checked={formData.privacy === 'Public'}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                                                formData.privacy === 'Public' 
                                                    ? 'bg-[#95C5C5] text-[#292B35]'
                                                    : 'bg-[#3A3D4A] text-[#95C5C5]'
                                            }`}>
                                                <FaGlobe size={20} />
                                            </div>
                                            
                                            <div>
                                                <p className="font-medium text-[#E0E0E0]">Public Team</p>
                                                <p className="text-sm text-[#95C5C5]/70">Anyone can find and request to join your team</p>
                                            </div>
                                        </motion.label>
                                        
                                        <motion.label 
                                            className={`flex items-center cursor-pointer p-4 rounded-lg border-2 ${
                                                formData.privacy === 'Private' 
                                                    ? 'border-[#95C5C5] bg-[#292B35]'
                                                    : 'border-[#3A3D4A] bg-[#292B35]/50'
                                            }`}
                                            whileHover={{ scale: 1.02, borderColor: '#95C5C5' }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <input 
                                                type="radio" 
                                                name="privacy" 
                                                value="Private"
                                                checked={formData.privacy === 'Private'}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                                                formData.privacy === 'Private' 
                                                    ? 'bg-[#95C5C5] text-[#292B35]'
                                                    : 'bg-[#3A3D4A] text-[#95C5C5]'
                                            }`}>
                                                <FaLock size={20} />
                                            </div>
                                            
                                            <div>
                                                <p className="font-medium text-[#E0E0E0]">Private Team</p>
                                                <p className="text-sm text-[#95C5C5]/70">Only invited players can join your team</p>
                                            </div>
                                        </motion.label>
                                    </div>
                                </div>
                                
                                {formData.privacy === 'Public' && (
                                    <motion.div 
                                        className="mb-6 p-4 bg-[#292B35] rounded-lg border border-[#3A3D4A]"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                name="autoAccept"
                                                checked={formData.autoAccept}
                                                onChange={handleChange}
                                                className="form-checkbox h-5 w-5 text-[#EE8631] focus:ring-[#EE8631] rounded border-[#3A3D4A] bg-[#292B35]"
                                            />
                                            <div className="ml-3">
                                                <p className="font-medium text-[#E0E0E0]">Auto-accept join requests</p>
                                                <p className="text-sm text-[#95C5C5]/70">New players will automatically join without approval</p>
                                            </div>
                                        </label>
                                    </motion.div>
                                )}
                            </motion.div>
                            
                            <div className="flex justify-between mt-8">
                                <motion.button 
                                    type="button" 
                                    onClick={handlePreviousStep}
                                    className="px-6 py-3 border border-[#95C5C5] text-[#95C5C5] font-medium rounded-lg hover:bg-[#95C5C5] hover:text-[#292B35] transition-colors flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaArrowLeft className="mr-2" />
                                    Previous
                                </motion.button>
                                
                                <motion.button 
                                    type="button" 
                                    onClick={handleNextStep}
                                    className="px-8 py-3 bg-[#EE8631] text-white font-medium rounded-lg hover:bg-[#AD662F] transition-colors shadow-lg flex items-center"
                                    whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(238, 134, 49, 0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Next Step
                                </motion.button>
                            </div>
                        </FormComponent>
                    )}
                    
                    {formStep === 3 && (
                        <FormComponent key="step3" title="Members & Finish" subtitle="Invite players and launch your team">
                            <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                                <div className="mb-8">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 rounded-full bg-[#95C5C5] text-[#292B35] flex items-center justify-center mr-3">
                                            <FaUsers size={20} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-[#E0E0E0]">Invite Team Members</h3>
                                    </div>
                                    
                                    <div className="bg-[#292B35] rounded-lg p-4">
                                        <div className="flex">
                                            <input 
                                                type="text"
                                                value={newMember}
                                                onChange={(e) => setNewMember(e.target.value)}
                                                placeholder="Enter username or email"
                                                className="flex-1 px-4 py-3 bg-[#292B35] border border-[#3A3D4A] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#95C5C5] text-[#E0E0E0] placeholder-gray-500"
                                            />
                                            <motion.button 
                                                onClick={handleAddMember}
                                                type="button"
                                                className="px-4 py-3 bg-[#95C5C5] text-[#292B35] font-medium rounded-r-lg hover:bg-opacity-80 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                disabled={!newMember.trim()}
                                            >
                                                <FaPlus />
                                            </motion.button>
                                        </div>
                                        
                                        <AnimatePresence>
                                            {formData.invitedMembers.length > 0 && (
                                                <motion.div 
                                                    className="mt-4"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <h4 className="font-medium text-[#95C5C5] mb-2">Invited Players</h4>
                                                    <div className="space-y-2">
                                                        {formData.invitedMembers.map((member, index) => (
                                                            <motion.div 
                                                                key={index} 
                                                                className="flex justify-between items-center p-3 bg-[#3A3D4A] rounded-lg"
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: 20 }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <div className="flex items-center">
                                                                    <div className="w-8 h-8 rounded-full bg-[#292B35] flex items-center justify-center mr-3 text-[#95C5C5]">
                                                                        {member.charAt(0).toUpperCase()}
                                                                    </div>
                                                                    <span className="text-[#E0E0E0]">{member}</span>
                                                                </div>
                                                                <motion.button 
                                                                    type="button" 
                                                                    onClick={() => handleRemoveMember(member)}
                                                                    className="text-red-400 hover:text-red-300 p-1"
                                                                    whileHover={{ scale: 1.2 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                >
                                                                    <FaTimes />
                                                                </motion.button>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        
                                        {formData.invitedMembers.length === 0 && (
                                            <p className="text-center text-[#95C5C5]/70 mt-3 italic">
                                                No players invited yet
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="mb-8">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 rounded-full bg-[#95C5C5] text-[#292B35] flex items-center justify-center mr-3">
                                            <FaTrophy size={20} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-[#E0E0E0]">Team Summary</h3>
                                    </div>
                                    
                                    <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                                    >
                                        <motion.div className="p-4 bg-[#292B35] rounded-lg" variants={containerVariants}>
                                            <p className="text-sm text-[#95C5C5]/70">Team Name</p>
                                            <p className="text-lg font-medium text-[#E0E0E0]">{formData.name || 'Not specified'}</p>
                                        </motion.div>
                                        
                                        <motion.div className="p-4 bg-[#292B35] rounded-lg" variants={containerVariants}>
                                            <p className="text-sm text-[#95C5C5]/70">Tag</p>
                                            <p className="text-lg font-medium text-[#E0E0E0]">{formData.tag || 'Not specified'}</p>
                                        </motion.div>
                                        
                                        <motion.div className="p-4 bg-[#292B35] rounded-lg" variants={containerVariants}>
                                            <p className="text-sm text-[#95C5C5]/70">Game</p>
                                            <p className="text-lg font-medium text-[#E0E0E0]">{formData.game || 'Not specified'}</p>
                                        </motion.div>
                                        
                                        <motion.div className="p-4 bg-[#292B35] rounded-lg" variants={containerVariants}>
                                            <p className="text-sm text-[#95C5C5]/70">Privacy</p>
                                            <div className="flex items-center text-lg font-medium text-[#E0E0E0]">
                                                {formData.privacy === 'Public' ? <FaGlobe className="mr-2 text-[#95C5C5]" /> : <FaLock className="mr-2 text-[#95C5C5]" />}
                                                {formData.privacy}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                                
                                <motion.div 
                                    className="p-4 bg-[#292B35] rounded-lg border border-[#3A3D4A] mb-6"
                                    whileHover={{ borderColor: '#EE8631' }}
                                    animate={{ 
                                        boxShadow: errors.acceptRules ? ['0 0 0 rgba(239, 68, 68, 0)', '0 0 10px rgba(239, 68, 68, 0.5)', '0 0 0 rgba(239, 68, 68, 0)'] : 'none',
                                    }}
                                    transition={{ 
                                        boxShadow: {
                                            repeat: 2,
                                            duration: 0.5
                                        }
                                    }}
                                >
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            name="acceptRules"
                                            checked={formData.acceptRules}
                                            onChange={handleChange}
                                            className="form-checkbox h-5 w-5 text-[#EE8631] focus:ring-[#EE8631] rounded border-[#3A3D4A] bg-[#292B35]"
                                        />
                                        <div className="ml-3">
                                            <p className="font-medium text-[#E0E0E0]">I accept the Team Rules and Code of Conduct</p>
                                            <p className="text-sm text-[#95C5C5]/70">All team members must adhere to community guidelines and fair play</p>
                                        </div>
                                    </label>
                                    {errors.acceptRules && <p className="mt-2 text-sm text-red-500 ml-8">{errors.acceptRules}</p>}
                                </motion.div>
                            </motion.div>
                            
                            <div className="flex justify-between mt-8">
                                <motion.button 
                                    type="button" 
                                    onClick={handlePreviousStep}
                                    className="px-6 py-3 border border-[#95C5C5] text-[#95C5C5] font-medium rounded-lg hover:bg-[#95C5C5] hover:text-[#292B35] transition-colors flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaArrowLeft className="mr-2" />
                                    Previous
                                </motion.button>
                                
                                <motion.button 
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="px-8 py-3 bg-[#EE8631] text-white font-medium rounded-lg hover:bg-[#AD662F] transition-colors shadow-lg flex items-center"
                                    whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(238, 134, 49, 0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaCheck className="mr-2" />
                                    Create Team
                                </motion.button>
                            </div>
                        </FormComponent>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CreateTeam;
