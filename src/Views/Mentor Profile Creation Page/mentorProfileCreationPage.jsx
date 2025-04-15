import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import defaultMentorData from './mentorprofile.json';

// --- Helper Components (Adapted/Reused from User Profile) ---
const FormInput = ({ id, name, label, type = "text", value, onChange, placeholder, required = false, rows = 4, icon, accept, min, step, max }) => (
    <div>
        <label htmlFor={id} className="block text-[#E0E0E0] font-medium mb-2 flex items-center">
            {icon && <span className="mr-2 w-5 h-5 text-[#95C5C5]">{icon}</span>}
            {label}{required && <span className="text-[#EE8631] ml-1">*</span>}
        </label>
        {type === "textarea" ? (
            <textarea
                id={id}
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full bg-[#292B35] border border-[#3A3D4A] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#95C5C5] transition-colors placeholder-[#6b7280]"
                placeholder={placeholder}
            />
        ) : (
            <input
                type={type}
                id={id}
                name={name}
                value={value ?? ''}
                onChange={onChange}
                required={required}
                min={min}
                step={step}
                max={max}
                className={`w-full bg-[#292B35] border border-[#3A3D4A] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#95C5C5] transition-colors placeholder-[#6b7280] ${type === 'file' ? 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#95C5C5] file:text-[#292B35] hover:file:bg-opacity-80 cursor-pointer' : ''} ${type === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''}`}
                placeholder={placeholder}
                accept={accept}
                {...(type === "number" ? {
                    onFocus: (e) => {
                        if (e.target.value === "0") {
                            onChange({ target: { ...e.target, value: "" } });
                        }
                    },
                    onBlur: (e) => {
                        if (e.target.value === "") {
                            onChange({ target: { ...e.target, value: "0" } });
                        }
                    }
                } : {})}
            />
        )}
    </div>
);

const FormSelect = ({ id, name, label, value, onChange, options }) => (
    <div>
        {/* ...existing code... */}
    </div>
);

const TagInput = ({ label, tags, addTag, removeTag, placeholder }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            addTag(input.trim());
            setInput('');
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-[#E0E0E0] font-medium mb-2">{label}</label>
            <div className="flex flex-wrap gap-2 mb-2 min-h-[2.5rem] items-center">
                {tags.map((tag, index) => (
                    <motion.div
                        key={index}
                        className="bg-[#3A3D4A] text-[#E0E0E0] rounded-full px-3 py-1 flex items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span>{tag}</span>
                        <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-[#95C5C5] hover:text-[#EE8631]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </motion.div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-grow bg-[#292B35] border border-[#3A3D4A] rounded-l-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#95C5C5] transition-colors placeholder-[#6b7280]"
                />
                <button
                    type="button"
                    onClick={() => {
                        if (input.trim()) {
                            addTag(input.trim());
                            setInput('');
                        }
                    }}
                    className="bg-[#95C5C5] text-[#292B35] px-4 py-3 rounded-r-lg font-medium hover:bg-opacity-80 transition-colors"
                >
                    Add
                </button>
            </div>
        </div>
    );
};

const socialIcons = { /* ...existing socialIcons... */ };
const availableGames = [ /* ...existing availableGames... */ ];

// --- Section Components ---
const BasicInfoSection = ({ formData, handleChange, className }) => (
    <motion.div className={`space-y-6 ${className || ""}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <div className="grid md:grid-cols-2 gap-6">
            <FormInput id="userName" name="USER_NAME" label="Username" value={formData.USER_NAME || ''} onChange={handleChange} placeholder="Your mentor username" required />
            <FormInput id="tagline" name="TAGLINE" label="Tagline" value={formData.TAGLINE || ''} onChange={handleChange} placeholder="Your coaching motto" required />
        </div>
        <FormInput id="bio" name="BIO" label="Bio" type="textarea" value={formData.BIO || ''} onChange={handleChange} placeholder="Tell students about your coaching experience and style..." />
        <div className="grid md:grid-cols-2 gap-6">
            <FormInput id="location" name="LOCATION" label="Location" value={formData.LOCATION || ''} onChange={handleChange} placeholder="City, Country" />
            <FormInput id="experience" name="EXPERIENCE_YEARS" label="Years of Experience" type="number" value={formData.EXPERIENCE_YEARS ?? ''} onChange={handleChange} min="0" step="1" />
        </div>
    </motion.div>
);

const AppearanceSection = ({ handleChange, profilePicFile, bannerFile, profilePicPreview, bannerPreview, className }) => (
    <motion.div className={`space-y-6 ${className || ""}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
                <FormInput id="profilePic" name="PROFILE_PIC" label="Profile Picture" type="file" onChange={handleChange} accept="image/*" />
                {profilePicFile && <p className="text-sm text-[#95C5C5] mt-2">Selected: {profilePicFile.name}</p>}
                {profilePicPreview && (
                    <motion.div className="mt-4 flex justify-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <img src={profilePicPreview} alt="Profile preview" className="w-32 h-32 rounded-full object-cover border-4 border-[#3A3D4A]" />
                    </motion.div>
                )}
            </div>
            <div>
                <FormInput id="profileBanner" name="PROFILE_BANNER" label="Profile Banner" type="file" onChange={handleChange} accept="image/*" />
                {bannerFile && <p className="text-sm text-[#95C5C5] mt-2">Selected: {bannerFile.name}</p>}
                {bannerPreview && (
                    <motion.div className="mt-4 rounded-lg overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                        <img src={bannerPreview} alt="Banner preview" className="w-full h-32 object-cover border-2 border-[#3A3D4A]" />
                    </motion.div>
                )}
            </div>
        </div>
    </motion.div>
);

const ExpertiseSection = ({ formData, handleGameToggle, addSpeciality, removeSpeciality, addLanguage, removeLanguage, className }) => (
    <motion.div className={`space-y-8 ${className || ""}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <div>
            <label className="block text-[#E0E0E0] font-medium mb-4">Games You Can Coach</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {availableGames.map((game) => {
                    const isSelected = formData.GAMES?.includes(game.name);
                    return (
                        <motion.button key={game.name} type="button" onClick={() => handleGameToggle(game.name)}
                            className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 ${isSelected ? 'bg-[#95C5C5] border-[#95C5C5] text-[#292B35]' : 'bg-[#3A3D4A] border-[#3A3D4A] text-[#E0E0E0] hover:border-[#95C5C5]'}`}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <span className="text-3xl mb-2">{game.icon}</span>
                            <span className="text-sm font-medium text-center">{game.name}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>

        <TagInput
            label="Specialities (e.g., Aim Training, Strategy, Team Comps)"
            tags={formData.SPECIALITIES || []}
            addTag={addSpeciality}
            removeTag={removeSpeciality}
            placeholder="Add a speciality and press Enter"
        />

        <TagInput
            label="Languages Spoken"
            tags={formData.LANGUAGES || []}
            addTag={addLanguage}
            removeTag={removeLanguage}
            placeholder="Add a language and press Enter"
        />
    </motion.div>
);

const BusinessSection = ({ formData, handleChange, className }) => (
    <motion.div className={`space-y-6 ${className || ""}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <div className="grid md:grid-cols-2 gap-6">
            <FormInput
                id="pricePerSession"
                name="PRICE_PER_SESSION"
                label="Price Per Session (USD)"
                type="number"
                value={formData.PRICE_PER_SESSION ?? ''}
                onChange={handleChange}
                min="0"
                step="5"
            />
            <FormInput
                id="sessionsCompleted"
                name="SESSIONS_COMPLETED"
                label="Sessions Completed (Optional)"
                type="number"
                value={formData.SESSIONS_COMPLETED ?? ''}
                onChange={handleChange}
                min="0"
                step="1"
            />
        </div>
        <div>
            <FormInput
                id="successRate"
                name="SUCCESS_RATE"
                label="Success Rate (%) (Optional)"
                type="number"
                value={formData.SUCCESS_RATE ?? ''}
                onChange={handleChange}
                min="0"
                max="100"
                step="1"
            />
            <div className="relative pt-4">
                <div className="h-2 bg-[#3A3D4A] rounded-full overflow-hidden">
                    <motion.div
                        className="h-2 bg-[#95C5C5] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${formData.SUCCESS_RATE || 0}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <div className="mt-2 text-right text-sm text-[#95C5C5]">
                    {formData.SUCCESS_RATE || 0}%
                </div>
            </div>
        </div>
    </motion.div>
);

const SocialMediaSection = ({ formData, handleChange, className }) => (
    <motion.div className={`grid md:grid-cols-2 gap-x-6 gap-y-6 ${className || ""}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        {Object.entries(formData.SOCIAL_LINKS || {}).map(([key, value]) => (
            <FormInput
                key={key}
                id={key.toLowerCase()}
                name={`SOCIAL_LINKS.${key}`}
                label={key.charAt(0) + key.slice(1).toLowerCase()}
                value={value || ''}
                onChange={handleChange}
                placeholder={ key === 'INSTAGRAM' || key==='TWITTER' ? '@username' : key==='DISCORD' ? 'username#1234' : key==='LINKEDIN' ? 'linkedin.com/in/...' : key==='WEBSITE' ? 'yourdomain.com' : key==='YOUTUBE' ? 'youtube.com/c/...' : '' }
                icon={socialIcons[key]}
            />
        ))}
    </motion.div>
);

// --- Main Component ---
function MentorProfileCreationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        USER_NAME: '', TAGLINE: '', BIO: '',
        LOCATION: '', EXPERIENCE_YEARS: '',
        GAMES: [], SPECIALITIES: [], LANGUAGES: [],
        PRICE_PER_SESSION: '', SESSIONS_COMPLETED: '', SUCCESS_RATE: '',
        SOCIAL_LINKS: { INSTAGRAM: '', DISCORD: '', TWITTER: '', LINKEDIN: '', WEBSITE: '', YOUTUBE: '' }
    });
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState('');
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerPreview, setBannerPreview] = useState('');
    const [previewMode, setPreviewMode] = useState(false);
    const [activeSection, setActiveSection] = useState('basic');
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let picUrl, bannerUrl;
        if (profilePicFile) {
            picUrl = URL.createObjectURL(profilePicFile);
            setProfilePicPreview(picUrl);
        } else {
            setProfilePicPreview('');
        }
        if (bannerFile) {
            bannerUrl = URL.createObjectURL(bannerFile);
            setBannerPreview(bannerUrl);
        } else {
            setBannerPreview('');
        }
        return () => {
            if (picUrl) URL.revokeObjectURL(picUrl);
            if (bannerUrl) URL.revokeObjectURL(bannerUrl);
        };
    }, [profilePicFile, bannerFile]);

    const loadExampleData = () => {
        const exampleData = {
            USER_NAME: defaultMentorData.USER_NAME || '',
            TAGLINE: defaultMentorData.TAGLINE || '',
            BIO: defaultMentorData.BIO || '',
            LOCATION: defaultMentorData.LOCATION || '',
            EXPERIENCE_YEARS: defaultMentorData.EXPERIENCE_YEARS ?? '',
            GAMES: defaultMentorData.GAMES || [],
            SPECIALITIES: defaultMentorData.SPECIALITIES || [],
            LANGUAGES: defaultMentorData.LANGUAGES || [],
            PRICE_PER_SESSION: defaultMentorData.PRICE_PER_SESSION ?? '',
            SESSIONS_COMPLETED: defaultMentorData.SESSIONS_COMPLETED ?? '',
            SUCCESS_RATE: defaultMentorData.SUCCESS_RATE ?? '',
            SOCIAL_LINKS: {
                INSTAGRAM: defaultMentorData.SOCIAL_LINKS?.INSTAGRAM || '',
                DISCORD: defaultMentorData.SOCIAL_LINKS?.DISCORD || '',
                TWITTER: defaultMentorData.SOCIAL_LINKS?.TWITTER || '',
                LINKEDIN: defaultMentorData.SOCIAL_LINKS?.LINKEDIN || '',
                WEBSITE: defaultMentorData.SOCIAL_LINKS?.WEBSITE || '',
                YOUTUBE: defaultMentorData.SOCIAL_LINKS?.YOUTUBE || '',
            }
        };
        setFormData(exampleData);
        setBannerPreview(defaultMentorData.PROFILE_BANNER || '');
        setProfilePicPreview(defaultMentorData.PROFILE_PIC || '');
        setProfilePicFile(null);
        setBannerFile(null);
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            if (name === 'PROFILE_PIC') { setProfilePicFile(file || null); }
            else if (name === 'PROFILE_BANNER') { setBannerFile(file || null); }
        } else if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...(prev[parent] || {}), [child]: value }
            }));
        } else if (type === 'number') {
            const numericValue = value.replace(/[^0-9.]/g, '');
            if (name === 'SUCCESS_RATE' && parseFloat(numericValue) > 100) return;
            if (name === 'EXPERIENCE_YEARS' && parseFloat(numericValue) < 0) return;

            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleGameToggle = (gameName) => {
        setFormData(prev => {
            const games = prev.GAMES || [];
            const newGames = games.includes(gameName)
                ? games.filter(g => g !== gameName)
                : [...games, gameName];
            return { ...prev, GAMES: newGames };
        });
    };

    const addTag = (field, tag) => {
        setFormData(prev => {
            const currentTags = prev[field] || [];
            if (currentTags.includes(tag)) return prev;
            if ((field === 'SPECIALITIES' || field === 'LANGUAGES') && currentTags.length >= 5) {
                alert(`You can add a maximum of 5 ${(field === 'SPECIALITIES') ? 'specialities' : 'languages'}.`);
                return prev;
            }
            return { ...prev, [field]: [...currentTags, tag] };
        });
    };

    const removeTag = (field, tag) => {
        setFormData(prev => ({
            ...prev,
            [field]: (prev[field] || []).filter(t => t !== tag)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isSectionValid()) {
            alert('Please fill in all required fields before submitting.');
            return;
        }
        if (activeSection !== 'social') { nextSection(); return; }

        const submissionData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (['EXPERIENCE_YEARS', 'PRICE_PER_SESSION', 'SESSIONS_COMPLETED', 'SUCCESS_RATE'].includes(key)) {
                submissionData.append(key, parseFloat(value) || 0);
            } else if (Array.isArray(value)) {
                submissionData.append(key, JSON.stringify(value));
            } else if (typeof value === 'object' && value !== null) {
                submissionData.append(key, JSON.stringify(value));
            } else if (value !== undefined && value !== null) {
                submissionData.append(key, value);
            }
        });

        if (profilePicFile) submissionData.append('PROFILE_PIC_FILE', profilePicFile);
        if (bannerFile) submissionData.append('PROFILE_BANNER_FILE', bannerFile);

        console.log('Mentor profile data to be submitted:');
        for (let [key, value] of submissionData.entries()) {
            console.log(`${key}:`, value);
        }

        alert('Mentor profile created successfully!');
        navigate('/dashboard');
    };

    const sections = [
        { id: 'basic', label: 'Basic Info', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
        { id: 'appearance', label: 'Appearance', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
        { id: 'expertise', label: 'Expertise', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
        { id: 'business', label: 'Business', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { id: 'social', label: 'Social', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg> }
    ];

    const getSectionIndex = (id) => sections.findIndex(s => s.id === id);
    const isBasicSectionValid = () => formData.USER_NAME?.trim() !== '' && formData.TAGLINE?.trim() !== '';
    const canAccessSection = (sectionId) => sectionId === 'basic' ? true : isBasicSectionValid();

    const handleSectionChange = (sectionId) => {
        if (canAccessSection(sectionId)) setActiveSection(sectionId);
        else alert('Please fill in required fields (Username and Tagline) before proceeding.');
    };

    const nextSection = () => {
        if (!isSectionValid()) {
             alert('Please fill in all required fields for this section.');
             return;
        }
        const currentIndex = getSectionIndex(activeSection);
        if (currentIndex < sections.length - 1 && canAccessSection(sections[currentIndex + 1].id))
            setActiveSection(sections[currentIndex + 1].id);
    };

    const prevSection = () => {
        const currentIndex = getSectionIndex(activeSection);
        if (currentIndex > 0) setActiveSection(sections[currentIndex - 1].id);
    };

    const isSectionValid = () => {
        if (activeSection === 'basic') {
            return isBasicSectionValid();
        }
        return true;
    };

    return (
        <div className="min-h-screen bg-[#292B35] text-[#E0E0E0] py-10 px-4 md:px-8 bg-gradient-to-br from-[#292B35] to-[#2A2C36]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.7 }} className="max-w-7xl mx-auto">
                <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                    <motion.h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#E0E0E0] tracking-tight" initial={{ opacity: 0, y: -10 }} animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -10 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        Create Your Mentor Profile
                    </motion.h1>
                    <motion.p className="text-lg md:text-xl text-[#95C5C5]" initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                        Share your expertise and connect with aspiring players
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <motion.div className="hidden lg:block lg:w-1/4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -20 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <div className="bg-[#2F3140] rounded-xl overflow-hidden shadow-lg sticky top-8">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold">Profile Setup</h3>
                                    <motion.button onClick={loadExampleData} title="Load Example Data" className="text-[#95C5C5] hover:text-[#EE8631] transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M4 4h5m0 0v5m-5-5l4.293 4.293M20 20v-5h-.581m-15.357-2a8.001 8.001 0 0015.357 2M20 20h-5m0 0v-5m5 5l-4.293-4.293" /></svg>
                                    </motion.button>
                                </div>
                                <div className="space-y-2">
                                    {sections.map((section) => (
                                        <motion.button key={section.id} onClick={() => handleSectionChange(section.id)} className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 flex items-center ${activeSection === section.id ? 'bg-[#95C5C5] text-[#292B35] font-medium shadow-md' : 'text-[#E0E0E0] hover:bg-[#3A3D4A]'} ${!canAccessSection(section.id) ? 'opacity-50 cursor-not-allowed' : ''}`} whileHover={{ x: activeSection === section.id || !canAccessSection(section.id) ? 0 : 5 }} whileTap={{ scale: canAccessSection(section.id) ? 0.98 : 1 }}>
                                            <span className="mr-3 w-5 h-5 flex-shrink-0">{section.icon}</span>
                                            <span>{section.label}</span>
                                            {!canAccessSection(section.id) && section.id !== 'basic' && (
                                                <motion.div className="ml-auto">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t border-[#3A3D4A] p-4 bg-[#292B35] bg-opacity-30">
                                <motion.button onClick={() => setPreviewMode(!previewMode)} className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300 ${previewMode ? 'bg-[#EE8631] text-white hover:bg-[#AD662F]' : 'bg-[#95C5C5] text-[#292B35] hover:bg-opacity-80'}`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    {previewMode ? (
                                        <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>Back to Edit</>
                                    ) : (
                                        <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>Preview Profile</>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="lg:hidden mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-[#95C5C5]">Profile Setup</h3>
                            <div className="flex gap-2">
                                <motion.button onClick={loadExampleData} title="Load Example Data" className="p-2 bg-[#3A3D4A] rounded-md text-[#95C5C5]" whileTap={{ scale: 0.95 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M4 4h5m0 0v5m-5-5l4.293 4.293M20 20v-5h-.581m-15.357-2a8.001 8.001 0 0015.357 2M20 20h-5m0 0v-5m5 5l-4.293-4.293" /></svg>
                                </motion.button>
                                <motion.button onClick={() => setPreviewMode(!previewMode)} className={`p-2 rounded-md ${previewMode ? 'bg-[#EE8631] text-white' : 'bg-[#3A3D4A] text-[#95C5C5]'}`} whileTap={{ scale: 0.95 }}>
                                    {previewMode ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>}
                                </motion.button>
                            </div>
                        </div>
                        {!previewMode && (
                            <div className="flex overflow-x-auto gap-2 pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-[#3A3D4A] scrollbar-track-transparent">
                                {sections.map((section) => (
                                    <motion.button key={section.id} onClick={() => handleSectionChange(section.id)} className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center text-sm ${activeSection === section.id ? 'bg-[#95C5C5] text-[#292B35] font-medium' : 'bg-[#3A3D4A] text-[#E0E0E0]'} ${!canAccessSection(section.id) ? 'opacity-50 cursor-not-allowed' : ''}`} whileTap={{ scale: canAccessSection(section.id) ? 0.95 : 1 }}>
                                        <span className="mr-2 w-4 h-4">{section.icon}</span>
                                        {section.label}
                                        {!canAccessSection(section.id) && section.id !== 'basic' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </div>

                    <motion.div className="flex-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        {!previewMode ? (
                            <div className="bg-[#2F3140] rounded-xl overflow-hidden shadow-xl">
                                <div className="bg-gradient-to-r from-[#292B35] to-[#3A3D4A] p-6 border-b border-[#3A3D4A] flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#E0E0E0] flex items-center">
                                            <span className="mr-3 w-6 h-6 text-[#95C5C5]">{sections.find(s => s.id === activeSection)?.icon}</span>
                                            {sections.find(s => s.id === activeSection)?.label}
                                        </h2>
                                        <p className="text-[#95C5C5] mt-1 pl-9">
                                            {activeSection === 'basic' && "Introduce yourself to potential students"}
                                            {activeSection === 'appearance' && "Upload your profile visuals"}
                                            {activeSection === 'expertise' && "Showcase your coaching skills and languages"}
                                            {activeSection === 'business' && "Set your coaching rates and track record"}
                                            {activeSection === 'social' && "Connect your social media presence"}
                                        </p>
                                    </div>
                                    <div className="hidden sm:flex items-center text-sm text-[#95C5C5]">
                                        <span className="flex h-6 w-6 rounded-full bg-[#95C5C5] text-[#292B35] items-center justify-center font-semibold mr-2">
                                            {getSectionIndex(activeSection) + 1}
                                        </span>
                                        of {sections.length}
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="p-6">
                                        <BasicInfoSection
                                            formData={formData}
                                            handleChange={handleChange}
                                            className={activeSection === 'basic' ? "" : "hidden"}
                                        />
                                        <AppearanceSection
                                            handleChange={handleChange}
                                            profilePicFile={profilePicFile}
                                            bannerFile={bannerFile}
                                            profilePicPreview={profilePicPreview}
                                            bannerPreview={bannerPreview}
                                            className={activeSection === 'appearance' ? "" : "hidden"}
                                        />
                                        <ExpertiseSection
                                            formData={formData}
                                            handleGameToggle={handleGameToggle}
                                            addSpeciality={(tag) => addTag('SPECIALITIES', tag)}
                                            removeSpeciality={(tag) => removeTag('SPECIALITIES', tag)}
                                            addLanguage={(tag) => addTag('LANGUAGES', tag)}
                                            removeLanguage={(tag) => removeTag('LANGUAGES', tag)}
                                            className={activeSection === 'expertise' ? "" : "hidden"}
                                        />
                                        <BusinessSection
                                            formData={formData}
                                            handleChange={handleChange}
                                            className={activeSection === 'business' ? "" : "hidden"}
                                        />
                                        <SocialMediaSection
                                            formData={formData}
                                            handleChange={handleChange}
                                            className={activeSection === 'social' ? "" : "hidden"}
                                        />
                                    </div>

                                    <div className="p-6 border-t border-[#3A3D4A] flex justify-between items-center bg-[#292B35] bg-opacity-30">
                                        <motion.button type="button" onClick={prevSection} disabled={getSectionIndex(activeSection) === 0}
                                            className="px-6 py-3 border border-[#95C5C5] text-[#95C5C5] font-medium rounded-lg transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-[#95C5C5] hover:enabled:text-[#292B35]"
                                            whileHover={{ scale: getSectionIndex(activeSection) === 0 ? 1 : 1.05 }} whileTap={{ scale: 0.95 }}>
                                            Back
                                        </motion.button>

                                        {getSectionIndex(activeSection) < sections.length - 1 ? (
                                            <motion.button type="button" onClick={nextSection} disabled={!isSectionValid()}
                                                className={`px-6 py-3 font-medium rounded-lg transition-colors flex items-center ${ isSectionValid() ? 'bg-[#95C5C5] text-[#292B35] hover:bg-opacity-80' : 'bg-gray-500 text-gray-300 cursor-not-allowed' }`}
                                                whileHover={{ scale: isSectionValid() ? 1.05 : 1 }}
                                                whileTap={{ scale: isSectionValid() ? 0.95 : 1 }}>
                                                Next
                                            </motion.button>
                                        ) : (
                                            <motion.button type="submit" disabled={!isSectionValid()}
                                                className={`px-8 py-3 font-medium rounded-lg transition-colors flex items-center shadow-lg ${ isSectionValid() ? 'bg-[#EE8631] text-white hover:bg-[#AD662F]' : 'bg-gray-500 text-gray-300 cursor-not-allowed' }`}
                                                whileHover={{ scale: isSectionValid() ? 1.05 : 1 }} whileTap={{ scale: isSectionValid() ? 0.95 : 1 }}>
                                                Create Profile
                                            </motion.button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <motion.div className="bg-gradient-to-b from-[#2F3140] to-[#292B35] rounded-xl shadow-xl overflow-hidden" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                                <div className="h-48 md:h-56 bg-center bg-cover relative group" style={{ backgroundImage: `url(${bannerPreview || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80'})` }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#292B35] via-transparent to-transparent opacity-80"></div>
                                    <motion.button onClick={() => setPreviewMode(false)} className="absolute top-4 right-4 bg-[#95C5C5] text-[#292B35] px-4 py-2 rounded-lg font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                        Edit
                                    </motion.button>
                                </div>

                                <div className="px-6 md:px-8 pt-0 pb-8 relative">
                                    <div className="flex flex-col sm:flex-row sm:items-end -mt-12 sm:-mt-16">
                                        <motion.div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#292B35] relative z-10 shadow-xl flex-shrink-0 bg-[#3A3D4A]" layoutId="profilePic">
                                            <img
                                                src={profilePicPreview || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-grow">
                                            <h2 className="text-2xl sm:text-3xl font-bold text-[#E0E0E0]">{formData.USER_NAME || 'Mentor Username'}</h2>
                                            <p className="text-[#EE8631] text-base sm:text-lg italic">{formData.TAGLINE || 'Your coaching tagline'}</p>
                                            <div className="flex flex-wrap items-center text-[#95C5C5] text-sm mt-1 gap-x-3 gap-y-1">
                                                {formData.LOCATION && <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>{formData.LOCATION}</span>}
                                                {(formData.EXPERIENCE_YEARS !== '' && formData.EXPERIENCE_YEARS >= 0) && <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>{formData.EXPERIENCE_YEARS || 0} Year{formData.EXPERIENCE_YEARS !== 1 ? 's' : ''} Exp.</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 grid md:grid-cols-3 gap-8">
                                        <div className="md:col-span-2 space-y-6">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#95C5C5] mb-2 border-b border-[#3A3D4A] pb-1">About</h3>
                                                <p className="text-[#E0E0E0] leading-relaxed whitespace-pre-wrap">{formData.BIO || 'Your coaching biography will appear here...'}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#95C5C5] mb-2 border-b border-[#3A3D4A] pb-1">Expertise</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-[#95C5C5] mb-1">Coached Games:</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {formData.GAMES?.length > 0 ? formData.GAMES.map((game) => (
                                                                <span key={game} className="bg-[#3A3D4A] text-[#E0E0E0] px-3 py-1 rounded-full text-sm">{game}</span>
                                                            )) : <p className="text-[#6b7280] italic text-sm">No games specified.</p>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-[#95C5C5] mb-1">Specialities:</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {formData.SPECIALITIES?.length > 0 ? formData.SPECIALITIES.map((spec) => (
                                                                <span key={spec} className="bg-[#3A3D4A] text-[#E0E0E0] px-3 py-1 rounded-full text-sm">{spec}</span>
                                                            )) : <p className="text-[#6b7280] italic text-sm">No specialities listed.</p>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-[#95C5C5] mb-1">Languages:</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {formData.LANGUAGES?.length > 0 ? formData.LANGUAGES.map((lang) => (
                                                                <span key={lang} className="bg-[#3A3D4A] text-[#E0E0E0] px-3 py-1 rounded-full text-sm">{lang}</span>
                                                            )) : <p className="text-[#6b7280] italic text-sm">No languages listed.</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-1 space-y-6">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#95C5C5] mb-2 border-b border-[#3A3D4A] pb-1">Business</h3>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[#95C5C5]">Price/Session:</span>
                                                        <span className="font-semibold text-[#E0E0E0]">${formData.PRICE_PER_SESSION || 0}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[#95C5C5]">Sessions Done:</span>
                                                        <span className="font-semibold text-[#E0E0E0]">{formData.SESSIONS_COMPLETED || 0}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[#95C5C5]">Success Rate:</span>
                                                        <span className="font-semibold text-[#E0E0E0]">{formData.SUCCESS_RATE || 0}%</span>
                                                    </div>
                                                    <div className="pt-2">
                                                        <div className="h-2 bg-[#3A3D4A] rounded-full overflow-hidden">
                                                            <div className="h-2 bg-[#95C5C5] rounded-full" style={{width: `${formData.SUCCESS_RATE || 0}%`}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#95C5C5] mb-2 border-b border-[#3A3D4A] pb-1">Connect</h3>
                                                <div className="space-y-2">
                                                    {Object.entries(formData.SOCIAL_LINKS || {}).map(([key, value]) => value && (
                                                        <div key={key} className="flex items-center text-sm">
                                                            <span className="w-5 h-5 mr-2 text-[#95C5C5] flex-shrink-0">{socialIcons[key]}</span>
                                                            <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-[#E0E0E0] truncate hover:text-[#EE8631] transition-colors">
                                                                {value}
                                                            </a>
                                                        </div>
                                                    ))}
                                                    {Object.values(formData.SOCIAL_LINKS || {}).every(link => !link) && <p className="text-[#6b7280] italic text-sm">No social links added.</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default MentorProfileCreationPage;