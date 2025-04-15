import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import defaultPlayerData from './playerProfileData.json';

// --- Helper Components ---
const FormInput = ({ id, name, label, type = "text", value, onChange, placeholder, required = false, rows = 4, icon, accept }) => (
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
                onChange={onChange}
                required={required}
                className={`w-full bg-[#292B35] border border-[#3A3D4A] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#95C5C5] transition-colors placeholder-[#6b7280] ${type === 'file' ? 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#95C5C5] file:text-[#292B35] hover:file:bg-opacity-80 cursor-pointer' : ''}`}
                placeholder={placeholder}
                accept={accept}
            />
        )}
    </div>
);

const FormSelect = ({ id, name, label, value, onChange, options }) => (
    <div>
        <label htmlFor={id} className="block text-[#E0E0E0] font-medium mb-2">{label}</label>
        <div className="relative">
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full appearance-none bg-[#292B35] border border-[#3A3D4A] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#95C5C5] transition-colors pr-10"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#95C5C5]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    </div>
);

const socialIcons = {
    INSTAGRAM: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    DISCORD: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5865F2" viewBox="0 0 16 16"><path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/></svg>,
    TWITTER: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1DA1F2" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>,
    LINKEDIN: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0077B5" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>,
    WEBSITE: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 019-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9" /></svg>,
    YOUTUBE: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FF0000" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/></svg>,
};

const availableGames = [
    { name: 'Valorant', icon: '🎮' },
    { name: 'Fortnite', icon: '🧱' },
    { name: 'Overwatch', icon: '🛡️' },
    { name: 'PUBG', icon: '🍳' },
    { name: 'Apex Legends', icon: '🚀' },
    { name: 'EA Sports FC 25', icon: '⚽' },
    { name: 'Garena Free Fire', icon: '🔥' }
];

// --- Section Components ---
const BasicInfoSection = ({ formData, handleChange, teamStatusOptions, className }) => (
    <motion.div className={`space-y-6 ${className || ""}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
        <div className="grid md:grid-cols-2 gap-6">
            <FormInput id="userName" name="USER_NAME" label="Username" value={formData.USER_NAME} onChange={handleChange} placeholder="Your gaming alias" required />
            <FormInput id="tagline" name="TAGLINE" label="Tagline" value={formData.TAGLINE} onChange={handleChange} placeholder="Your gaming motto" required />
        </div>
        <FormInput id="bio" name="BIO" label="Bio" type="textarea" value={formData.BIO} onChange={handleChange} placeholder="Tell us about your gaming journey..." />
        <div className="grid md:grid-cols-2 gap-6">
            <FormInput id="location" name="LOCATION" label="Location" value={formData.LOCATION} onChange={handleChange} placeholder="City, Country" />
            <FormSelect id="teamStatus" name="TEAM_STATUS" label="Team Status" value={formData.TEAM_STATUS} onChange={handleChange} options={teamStatusOptions} />
        </div>
    </motion.div>
);

const AppearanceSection = ({ handleChange, profilePicFile, bannerFile, profilePicPreview, bannerPreview, className }) => (
    <motion.div className={`space-y-6 ${className || ""}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
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

const GamesSection = ({ formData, handleGameToggle, className }) => (
    <motion.div className={`space-y-6 ${className || ""}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
        <div>
            <label className="block text-[#E0E0E0] font-medium mb-4">Select Games You Play</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {availableGames.map((game) => {
                    const isSelected = formData.GAMES_PLAYED.includes(game.name);
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
    </motion.div>
);

const SocialMediaSection = ({ formData, handleChange, className }) => (
    <motion.div className={`grid md:grid-cols-2 gap-x-6 gap-y-6 ${className || ""}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
        {Object.entries(formData.SOCIAL_LINKS).map(([key, value]) => (
            <FormInput key={key} id={key.toLowerCase()} name={`SOCIAL_LINKS.${key}`} label={key.charAt(0) + key.slice(1).toLowerCase()}
                value={value} onChange={handleChange} placeholder={ key === 'INSTAGRAM' || key==='TWITTER' ? '@username' : key==='DISCORD' ? 'username#1234' : key==='LINKEDIN' ? 'linkedin.com/in/...' : key==='WEBSITE' ? 'yourdomain.com' : key==='YOUTUBE' ? 'youtube.com/c/...' : '' }
                icon={socialIcons[key]} />
        ))}
    </motion.div>
);

// --- Main Component ---
function UserProfileCreationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        USER_NAME: '', TAGLINE: '', BIO: '',
        LOCATION: '', TEAM_STATUS: 'Looking For Team', GAMES_PLAYED: [],
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
        if (profilePicFile) {
            const objectUrl = URL.createObjectURL(profilePicFile);
            setProfilePicPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [profilePicFile]);

    useEffect(() => {
        if (bannerFile) {
            const objectUrl = URL.createObjectURL(bannerFile);
            setBannerPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [bannerFile]);

    const loadExampleData = () => {
        setFormData({ ...defaultPlayerData, PROFILE_PIC: undefined, PROFILE_BANNER: undefined });
        setBannerPreview(defaultPlayerData.PROFILE_BANNER || '');
        setProfilePicPreview(defaultPlayerData.PROFILE_PIC || '');
        setProfilePicFile(null);
        setBannerFile(null);
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            if (name === 'PROFILE_PIC' && file) { setProfilePicFile(file); }
            else if (name === 'PROFILE_BANNER' && file) { setBannerFile(file); }
        } else if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleGameToggle = (gameName) => {
        setFormData(prev => {
            const newGamesPlayed = prev.GAMES_PLAYED.includes(gameName)
                ? prev.GAMES_PLAYED.filter(g => g !== gameName)
                : [...prev.GAMES_PLAYED, gameName];
            return { ...prev, GAMES_PLAYED: newGamesPlayed };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeSection !== 'social') { nextSection(); return; }
        const submissionData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'SOCIAL_LINKS') submissionData.append(key, JSON.stringify(value));
            else if (key === 'GAMES_PLAYED') value.forEach(game => submissionData.append('GAMES_PLAYED[]', game));
            else submissionData.append(key, value);
        });
        if (profilePicFile) submissionData.append('PROFILE_PIC_FILE', profilePicFile);
        if (bannerFile) submissionData.append('PROFILE_BANNER_FILE', bannerFile);
        console.log('Profile data to be submitted:');
        for (let [key, value] of submissionData.entries()) {
            console.log(`${key}:`, value);
        }
        alert('Profile created successfully!');
        navigate('/dashboard');
    };

    const sections = [
        { id: 'basic', label: 'Basic Info', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
        { id: 'appearance', label: 'Appearance', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
        { id: 'games', label: 'Games', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg> },
        { id: 'social', label: 'Social', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg> }
    ];

    const teamStatusOptions = [
        { value: 'Looking For Team', label: 'Looking For Team' },
        { value: 'Away', label: 'Away' }
    ];

    const getSectionIndex = (id) => sections.findIndex(s => s.id === id);
    const isBasicSectionValid = () => formData.USER_NAME.trim() !== '' && formData.TAGLINE.trim() !== '';
    const canAccessSection = (sectionId) => sectionId === 'basic' ? true : isBasicSectionValid();
    const handleSectionChange = (sectionId) => {
        if (canAccessSection(sectionId)) setActiveSection(sectionId);
        else alert('Please fill in required fields (Username and Tagline) before proceeding.');
    };
    const nextSection = () => {
        const currentIndex = getSectionIndex(activeSection);
        if (currentIndex < sections.length - 1 && canAccessSection(sections[currentIndex + 1].id))
            setActiveSection(sections[currentIndex + 1].id);
    };
    const prevSection = () => {
        const currentIndex = getSectionIndex(activeSection);
        if (currentIndex > 0) setActiveSection(sections[currentIndex - 1].id);
    };
    const isSectionValid = () => activeSection === 'basic' ? isBasicSectionValid() : true;

    return (
        <div className="min-h-screen bg-[#292B35] text-[#E0E0E0] py-10 px-4 md:px-8 bg-gradient-to-br from-[#292B35] to-[#2A2C36]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.7 }} className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                    <motion.h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#E0E0E0] tracking-tight" initial={{ opacity: 0, y: -10 }} animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -10 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        Craft Your Player Profile
                    </motion.h1>
                    <motion.p className="text-lg md:text-xl text-[#95C5C5]" initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                        Showcase your skills and connect with the community
                    </motion.p>
                </motion.div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <motion.div className="hidden lg:block lg:w-1/4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -20 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <div className="bg-[#2F3140] rounded-xl overflow-hidden shadow-lg sticky top-8">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold">Profile Setup</h3>
                                    <motion.button onClick={loadExampleData} title="Load Example Data" className="text-[#95C5C5] hover:text-[#EE8631] transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.97l-2.308.964a2 2 0 01-1.566 0l-2.308-.964a6 6 0 00-3.86-.97l-2.387.477a2 2 0 00-1.022.547m16.022 0v1.046a2 2 0 01-.999 1.75l-2.387.955a6 6 0 01-3.86.97l-2.308-.964a2 2 0 00-1.566 0l-2.308.964a6 6 0 01-3.86-.97l-2.387-.955a2 2 0 01-.999-1.75v-1.046m16.022 0l-3-17.32a2 2 0 00-2-1.68h-6a2 2 0 00-2 1.68l-3 17.32" /></svg>
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
                            {/* Preview toggle */}
                            <div className="border-t border-[#3A3D4A] p-4 bg-[#292B35] bg-opacity-30">
                                <motion.button onClick={() => setPreviewMode(!previewMode)} className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300 ${previewMode ? 'bg-[#EE8631] text-white hover:bg-[#AD662F]' : 'bg-[#95C5C5] text-[#292B35] hover:bg-opacity-80'}`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    {previewMode ? <>Back to Edit</> : <>Preview Profile</>}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile Tabs */}
                    <div className="lg:hidden mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-[#95C5C5]">Profile Setup</h3>
                            <div className="flex gap-2">
                                <motion.button onClick={loadExampleData} title="Load Example Data" className="p-2 bg-[#3A3D4A] rounded-md text-[#95C5C5]" whileTap={{ scale: 0.95 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.97l-2.308.964a2 2 0 01-1.566 0l-2.308-.964a6 6 0 00-3.86-.97l-2.387.477a2 2 0 00-1.022.547m16.022 0v1.046a2 2 0 01-.999 1.75l-2.387.955a6 6 0 01-3.86.97l-2.308-.964a2 2 0 00-1.566 0l-2.308.964a6 6 0 01-3.86-.97l-2.387-.955a2 2 0 01-.999-1.75v-1.046m16.022 0l-3-17.32a2 2 0 00-2-1.68h-6a2 2 0 00-2 1.68l-3 17.32" /></svg>
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

                    {/* Main Form/Preview Area */}
                    <motion.div className="flex-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        {!previewMode ? (
                            <div className="bg-[#2F3140] rounded-xl overflow-hidden shadow-xl">
                                {/* Form Header */}
                                <div className="bg-gradient-to-r from-[#292B35] to-[#3A3D4A] p-6 border-b border-[#3A3D4A] flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#E0E0E0] flex items-center">
                                            <span className="mr-3 w-6 h-6 text-[#95C5C5]">{sections.find(s => s.id === activeSection)?.icon}</span>
                                            {sections.find(s => s.id === activeSection)?.label}
                                        </h2>
                                        <p className="text-[#95C5C5] mt-1 pl-9">
                                            {activeSection === 'basic' && "Tell the community about yourself"}
                                            {activeSection === 'appearance' && "Upload your profile visuals"}
                                            {activeSection === 'games' && "What games do you play professionally?"}
                                            {activeSection === 'social' && "Connect with your followers"}
                                        </p>
                                    </div>
                                    <div className="hidden sm:flex items-center text-sm text-[#95C5C5]">
                                        <span className="flex h-6 w-6 rounded-full bg-[#95C5C5] text-[#292B35] items-center justify-center font-semibold mr-2">
                                            {getSectionIndex(activeSection) + 1}
                                        </span>
                                        of {sections.length}
                                    </div>
                                </div>

                                {/* Form Content */}
                                <form onSubmit={handleSubmit}>
                                    <div className="p-6">
                                        <BasicInfoSection 
                                            formData={formData} 
                                            handleChange={handleChange} 
                                            teamStatusOptions={teamStatusOptions} 
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
                                        <GamesSection 
                                            formData={formData} 
                                            handleGameToggle={handleGameToggle} 
                                            className={activeSection === 'games' ? "" : "hidden"} 
                                        />
                                        <SocialMediaSection 
                                            formData={formData} 
                                            handleChange={handleChange} 
                                            className={activeSection === 'social' ? "" : "hidden"} 
                                        />
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="p-6 border-t border-[#3A3D4A] flex justify-between items-center bg-[#292B35] bg-opacity-30">
                                        <motion.button type="button" onClick={prevSection} disabled={getSectionIndex(activeSection) === 0}
                                            className="px-6 py-3 border border-[#95C5C5] text-[#95C5C5] font-medium rounded-lg transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-[#95C5C5] hover:enabled:text-[#292B35]"
                                            whileHover={{ scale: getSectionIndex(activeSection) === 0 ? 1 : 1.05 }} whileTap={{ scale: 0.95 }}>
                                            Back
                                        </motion.button>

                                        {getSectionIndex(activeSection) < sections.length - 1 ? (
                                            <motion.button type="button" onClick={nextSection} disabled={activeSection === 'basic' ? !isBasicSectionValid() : false}
                                                className={`px-6 py-3 font-medium rounded-lg transition-colors flex items-center ${ (activeSection === 'basic' && isBasicSectionValid()) || activeSection !== 'basic' ? 'bg-[#95C5C5] text-[#292B35] hover:bg-opacity-80' : 'bg-gray-500 text-gray-300 cursor-not-allowed' }`}
                                                whileHover={{ scale: ((activeSection === 'basic' && isBasicSectionValid()) || activeSection !== 'basic') ? 1.05 : 1 }}
                                                whileTap={{ scale: ((activeSection === 'basic' && isBasicSectionValid()) || activeSection !== 'basic') ? 0.95 : 1 }}>
                                                Next
                                            </motion.button>
                                        ) : (
                                            <motion.button type="button" onClick={handleSubmit} disabled={!isSectionValid()}
                                                className="px-8 py-3 bg-[#EE8631] text-white font-medium rounded-lg transition-colors hover:bg-[#AD662F] flex items-center shadow-lg"
                                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                Create Profile
                                            </motion.button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        ) : (
                            // Preview Mode (unchanged)
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
                                            <h2 className="text-2xl sm:text-3xl font-bold text-[#E0E0E0]">{formData.USER_NAME || 'Your Username'}</h2>
                                            <p className="text-[#EE8631] text-base sm:text-lg italic">{formData.TAGLINE || 'Your gaming tagline'}</p>
                                            <div className="flex items-center text-[#95C5C5] text-sm mt-1">
                                                {formData.LOCATION && <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>{formData.LOCATION}</>}
                                                {formData.LOCATION && formData.TEAM_STATUS && <span className="mx-2">|</span>}
                                                {formData.TEAM_STATUS && <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3a4 4 0 00-8 0v3H4v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>{formData.TEAM_STATUS}</>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid md:grid-cols-3 gap-8">
                                        <div className="md:col-span-2 space-y-6">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#95C5C5] mb-2 border-b border-[#3A3D4A] pb-1">About</h3>
                                                <p className="text-[#E0E0E0] leading-relaxed whitespace-pre-wrap">{formData.BIO || 'Your gaming biography will appear here...'}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#95C5C5] mb-2 border-b border-[#3A3D4A] pb-1">Games</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.GAMES_PLAYED.length > 0 ? formData.GAMES_PLAYED.map((game) => (
                                                        <span key={game} className="bg-[#3A3D4A] text-[#E0E0E0] px-3 py-1 rounded-full text-sm">{game}</span>
                                                    )) : <p className="text-[#6b7280] italic">No games added yet.</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-1 space-y-4">
                                            <h3 className="text-xl font-semibold text-[#95C5C5] mb-2 border-b border-[#3A3D4A] pb-1">Connect</h3>
                                            {Object.entries(formData.SOCIAL_LINKS).map(([key, value]) => value && (
                                                <div key={key} className="flex items-center text-sm">
                                                    <span className="w-5 h-5 mr-2 text-[#95C5C5] flex-shrink-0">{socialIcons[key]}</span>
                                                    <span className="text-[#E0E0E0] truncate hover:text-clip hover:overflow-visible">{value}</span>
                                                </div>
                                            ))}
                                            {Object.values(formData.SOCIAL_LINKS).every(link => !link) && <p className="text-[#6b7280] italic text-sm">No social links added.</p>}
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

export default UserProfileCreationPage;