import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaTrash, FaPlus, FaImage, FaSave, FaEye, FaCheck } from 'react-icons/fa';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [formValid, setFormValid] = useState(false);
    
    // Form state
    const [eventForm, setEventForm] = useState({
        EVENT_NAME: '',
        DESCRIPTION: '',
        EVENT_DATE: '',
        REGISTRATION_DEADLINE: '',
        GAME: '',
        GAME_TYPE: '',
        CONSOLE: '',
        FORMAT: '',
        NUMBER_OF_MEMBERS: '',
        NUMBER_OF_TEAMS: '',
        PRIZE_POOL: '',
        VENUE: '',
        LOCATION: '',
        ELIGIBILITY: [''],
        CONTACT_INFO: {
            EMAIL: '',
            MOBILE_NUMBER: ''
        },
        FAQ: [{
            QUESTION: '',
            ANSWER: ''
        }],
        QUESTIONNAIRE: [{
            QUESTION: '',
            ANSWER: ''
        }],
        IMAGE: null
    });

    // Steps configuration
    const steps = [
        { number: 1, title: "Basic Information" },
        { number: 2, title: "Game Details" },
        { number: 3, title: "Location & Prize" },
        { number: 4, title: "Eligibility" },
        { number: 5, title: "Contact Info" },
        { number: 6, title: "FAQ & Questions" },
        { number: 7, title: "Preview & Publish" }
    ];

    // Game type options for dropdown
    const gameTypeOptions = ['FPS', 'Battle Royale', 'MOBA', 'Sports', 'Card Games', 'Strategy', 'Fighting'];
    
    // Game options based on game type
    const gameOptions = {
        'FPS': ['Valorant', 'CS:GO', 'Call of Duty', 'Overwatch'],
        'Battle Royale': ['Fortnite', 'PUBG', 'Apex Legends', 'Warzone'],
        'MOBA': ['League of Legends', 'Dota 2', 'Mobile Legends'],
        'Sports': ['FIFA', 'NBA 2K', 'Rocket League'],
        'Card Games': ['Hearthstone', 'Magic: The Gathering Arena'],
        'Strategy': ['Starcraft II', 'Age of Empires'],
        'Fighting': ['Street Fighter', 'Mortal Kombat', 'Super Smash Bros.']
    };

    // Platform options
    const consoleOptions = ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One', 'Nintendo Switch', 'Mobile'];
    
    // Format options
    const formatOptions = ['Single Elimination', 'Double Elimination', 'Round Robin', 'Swiss', 'League', 'Battle Royale'];

    // Locations
    const locationOptions = ['Online', 'Hybrid', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];

    // Validate form based on current step
    useEffect(() => {
        validateStep(currentStep);
    }, [eventForm, currentStep]);

    // Validate current step
    const validateStep = (step) => {
        let valid = false;

        switch (step) {
            case 1: // Basic Info
                valid = eventForm.EVENT_NAME.trim() !== '' && 
                        eventForm.DESCRIPTION.trim() !== '' && 
                        eventForm.EVENT_DATE !== '' && 
                        eventForm.REGISTRATION_DEADLINE !== '';
                break;
            case 2: // Game Details
                valid = eventForm.GAME.trim() !== '' && 
                        eventForm.GAME_TYPE.trim() !== '' && 
                        eventForm.CONSOLE.trim() !== '' && 
                        eventForm.FORMAT.trim() !== '' &&
                        eventForm.NUMBER_OF_MEMBERS !== '';
                break;
            case 3: // Location & Prize
                valid = eventForm.VENUE.trim() !== '' && 
                        eventForm.LOCATION.trim() !== '' && 
                        eventForm.PRIZE_POOL.trim() !== '';
                break;
            case 4: // Eligibility
                valid = eventForm.ELIGIBILITY.length > 0 && 
                        eventForm.ELIGIBILITY.every(item => item.trim() !== '');
                break;
            case 5: // Contact
                valid = eventForm.CONTACT_INFO.EMAIL.trim() !== '' && 
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eventForm.CONTACT_INFO.EMAIL) &&
                        eventForm.CONTACT_INFO.MOBILE_NUMBER.toString().trim() !== '';
                break;
            case 6: // FAQ & Questions
                valid = eventForm.FAQ.length > 0 && 
                        eventForm.FAQ.every(faq => faq.QUESTION.trim() !== '' && faq.ANSWER.trim() !== '') &&
                        eventForm.QUESTIONNAIRE.length > 0 &&
                        eventForm.QUESTIONNAIRE.every(q => q.QUESTION.trim() !== '');
                break;
            case 7: // Preview
                // All previous steps must be valid
                valid = validateStep(1) && validateStep(2) && validateStep(3) && 
                        validateStep(4) && validateStep(5) && validateStep(6);
                break;
            default:
                valid = false;
        }

        setFormValid(valid);
        return valid;
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle nested contact info changes
    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setEventForm(prev => ({
            ...prev,
            CONTACT_INFO: {
                ...prev.CONTACT_INFO,
                [name]: value
            }
        }));
    };

    // Handle eligibility array changes
    const handleEligibilityChange = (index, value) => {
        const newEligibility = [...eventForm.ELIGIBILITY];
        newEligibility[index] = value;
        setEventForm(prev => ({
            ...prev,
            ELIGIBILITY: newEligibility
        }));
    };

    // Add new eligibility item
    const addEligibilityItem = () => {
        setEventForm(prev => ({
            ...prev,
            ELIGIBILITY: [...prev.ELIGIBILITY, '']
        }));
    };

    // Remove eligibility item
    const removeEligibilityItem = (index) => {
        const newEligibility = [...eventForm.ELIGIBILITY];
        newEligibility.splice(index, 1);
        setEventForm(prev => ({
            ...prev,
            ELIGIBILITY: newEligibility
        }));
    };

    // Handle FAQ array changes
    const handleFAQChange = (index, field, value) => {
        const newFAQ = [...eventForm.FAQ];
        newFAQ[index][field] = value;
        setEventForm(prev => ({
            ...prev,
            FAQ: newFAQ
        }));
    };

    // Add new FAQ item
    const addFAQItem = () => {
        setEventForm(prev => ({
            ...prev,
            FAQ: [...prev.FAQ, { QUESTION: '', ANSWER: '' }]
        }));
    };

    // Remove FAQ item
    const removeFAQItem = (index) => {
        const newFAQ = [...eventForm.FAQ];
        newFAQ.splice(index, 1);
        setEventForm(prev => ({
            ...prev,
            FAQ: newFAQ
        }));
    };

    // Handle Questionnaire array changes
    const handleQuestionnaireChange = (index, field, value) => {
        const newQuestionnaire = [...eventForm.QUESTIONNAIRE];
        newQuestionnaire[index][field] = value;
        setEventForm(prev => ({
            ...prev,
            QUESTIONNAIRE: newQuestionnaire
        }));
    };

    // Add new Questionnaire item
    const addQuestionnaireItem = () => {
        setEventForm(prev => ({
            ...prev,
            QUESTIONNAIRE: [...prev.QUESTIONNAIRE, { QUESTION: '', ANSWER: '' }]
        }));
    };

    // Remove Questionnaire item
    const removeQuestionnaireItem = (index) => {
        const newQuestionnaire = [...eventForm.QUESTIONNAIRE];
        newQuestionnaire.splice(index, 1);
        setEventForm(prev => ({
            ...prev,
            QUESTIONNAIRE: newQuestionnaire
        }));
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventForm(prev => ({
                    ...prev,
                    IMAGE: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Next step
    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Previous step
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateStep(7)) {
            alert("Please complete all required fields before publishing.");
            return;
        }

        setIsSubmitting(true);

        try {
            // In a real application, you would send the data to an API
            // For demo purposes, we'll simulate an API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate an EVENT_ID (in a real app, this would be done by the backend)
            const eventId = 'EVT' + Math.floor(Math.random() * 100000);
            
            // Add created date
            const finalEvent = {
                ...eventForm,
                EVENT_ID: eventId,
                CREATED_AT: { $date: new Date().toISOString() }
            };

            // Here you would send finalEvent to your backend
            console.log("Event to be published:", finalEvent);

            // Simulate successful submission
            alert("Event successfully created!");
            
            // Navigate to the events page or the newly created event
            navigate(`/events/${eventId}`);
            
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Error creating event. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Toggle preview mode
    const togglePreview = () => {
        if (currentStep !== 7) {
            if (validateStep(currentStep)) {
                setCurrentStep(7);
                setPreviewMode(true);
            } else {
                alert("Please complete all required fields in this step before previewing.");
            }
        } else {
            setPreviewMode(!previewMode);
        }
    };

    // Save as draft
    const saveAsDraft = () => {
        // In a real app, you would save to localStorage or to a backend
        const draft = { ...eventForm, isDraft: true };
        localStorage.setItem('eventDraft', JSON.stringify(draft));
        alert("Event saved as draft!");
    };

    // Render input field with label
    const renderField = (label, name, value, onChange, type = "text", placeholder = "", required = true) => (
        <div className="mb-4">
            <label className="block text-[#95C5C5] font-semibold mb-2">
                {label} {required && <span className="text-[#EE8631]">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none focus:ring-2 focus:ring-[#EE8631]/50 text-[#E0E0E0] placeholder-[#95C5C5]/50"
                required={required}
            />
        </div>
    );

    // Render textarea field with label
    const renderTextarea = (label, name, value, onChange, placeholder = "", required = true) => (
        <div className="mb-4">
            <label className="block text-[#95C5C5] font-semibold mb-2">
                {label} {required && <span className="text-[#EE8631]">*</span>}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none focus:ring-2 focus:ring-[#EE8631]/50 text-[#E0E0E0] placeholder-[#95C5C5]/50"
                required={required}
            />
        </div>
    );

    // Render select field with label
    const renderSelect = (label, name, value, onChange, options, required = true) => (
        <div className="mb-4">
            <label className="block text-[#95C5C5] font-semibold mb-2">
                {label} {required && <span className="text-[#EE8631]">*</span>}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none focus:ring-2 focus:ring-[#EE8631]/50 text-[#E0E0E0]"
                required={required}
            >
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );

    // Render the form based on current step
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-[#95C5C5] mb-6">Basic Event Information</h2>
                        
                        {renderField("Event Name", "EVENT_NAME", eventForm.EVENT_NAME, handleChange, "text", "Enter event name")}
                        
                        {renderTextarea("Event Description", "DESCRIPTION", eventForm.DESCRIPTION, handleChange, "Describe your event")}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderField("Event Date & Time", "EVENT_DATE", eventForm.EVENT_DATE, handleChange, "datetime-local")}
                            
                            {renderField("Registration Deadline", "REGISTRATION_DEADLINE", eventForm.REGISTRATION_DEADLINE, handleChange, "datetime-local")}
                        </div>

                        <div className="mt-6">
                            <label className="block text-[#95C5C5] font-semibold mb-2">
                                Event Banner Image
                            </label>
                            <div className="border-2 border-dashed border-[#95C5C5]/30 rounded-lg p-6 text-center hover:border-[#EE8631]/50 transition-colors">
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                
                                {eventForm.IMAGE ? (
                                    <div className="relative">
                                        <img 
                                            src={eventForm.IMAGE} 
                                            alt="Event banner" 
                                            className="max-h-40 mx-auto rounded-lg"
                                        />
                                        <button 
                                            onClick={() => setEventForm(prev => ({ ...prev, IMAGE: null }))}
                                            className="absolute top-0 right-0 bg-[#EE8631] text-white p-1 rounded-full"
                                            type="button"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center">
                                            <FaImage className="text-[#95C5C5] text-5xl mb-3" />
                                            <p className="text-[#95C5C5]">Click to upload event banner</p>
                                            <p className="text-[#95C5C5]/70 text-sm">Recommended size: 1200 x 600 px</p>
                                        </div>
                                    </label>
                                )}
                            </div>
                        </div>
                    </>
                );

            case 2:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-[#95C5C5] mb-6">Game Details</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderSelect("Game Type", "GAME_TYPE", eventForm.GAME_TYPE, handleChange, gameTypeOptions)}
                            
                            {renderSelect("Game", "GAME", eventForm.GAME, handleChange, 
                                eventForm.GAME_TYPE ? (gameOptions[eventForm.GAME_TYPE] || []) : [])}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderSelect("Platform", "CONSOLE", eventForm.CONSOLE, handleChange, consoleOptions)}
                            
                            {renderSelect("Tournament Format", "FORMAT", eventForm.FORMAT, handleChange, formatOptions)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {renderField("Team Size (Number of Members)", "NUMBER_OF_MEMBERS", eventForm.NUMBER_OF_MEMBERS, handleChange, "number", "Enter team size")}
                            
                            {renderField("Maximum Number of Teams", "NUMBER_OF_TEAMS", eventForm.NUMBER_OF_TEAMS, handleChange, "number", "Enter max teams", false)}
                        </div>
                    </>
                );

            case 3:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-[#95C5C5] mb-6">Location & Prize</h2>
                        
                        {renderField("Venue Name", "VENUE", eventForm.VENUE, handleChange, "text", "Enter venue name")}
                        
                        {renderSelect("Location", "LOCATION", eventForm.LOCATION, handleChange, locationOptions)}
                        
                        {renderField("Prize Pool", "PRIZE_POOL", eventForm.PRIZE_POOL, handleChange, "text", "e.g. $5000")}
                    </>
                );

            case 4:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-[#95C5C5] mb-6">Eligibility Requirements</h2>
                        
                        <p className="text-[#E0E0E0] mb-4">
                            List the requirements participants must meet to join your event.
                        </p>
                        
                        {eventForm.ELIGIBILITY.map((item, index) => (
                            <div key={index} className="flex items-center mb-3">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleEligibilityChange(index, e.target.value)}
                                    placeholder="e.g. Must be 18+ years old"
                                    className="flex-1 px-4 py-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none focus:ring-2 focus:ring-[#EE8631]/50 text-[#E0E0E0] placeholder-[#95C5C5]/50"
                                />
                                <button 
                                    type="button" 
                                    onClick={() => removeEligibilityItem(index)}
                                    className="ml-2 p-3 text-[#EE8631] hover:text-[#EE8631]/70 transition-colors"
                                    disabled={eventForm.ELIGIBILITY.length <= 1}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        
                        <button 
                            type="button" 
                            onClick={addEligibilityItem}
                            className="mt-3 flex items-center text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                        >
                            <FaPlus className="mr-2" /> Add Requirement
                        </button>
                    </>
                );

            case 5:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-[#95C5C5] mb-6">Contact Information</h2>
                        
                        <p className="text-[#E0E0E0] mb-4">
                            How can participants reach out to you for questions?
                        </p>
                        
                        {renderField("Email", "EMAIL", eventForm.CONTACT_INFO.EMAIL, handleContactChange, "email", "Enter contact email")}
                        
                        {renderField("Mobile Number", "MOBILE_NUMBER", eventForm.CONTACT_INFO.MOBILE_NUMBER, handleContactChange, "tel", "Enter contact phone number")}
                    </>
                );

            case 6:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-[#95C5C5] mb-6">FAQs & Questionnaire</h2>
                        
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#95C5C5] mb-4">Frequently Asked Questions</h3>
                            <p className="text-[#E0E0E0] mb-4">
                                Add common questions and answers about your event.
                            </p>
                            
                            {eventForm.FAQ.map((faq, index) => (
                                <div key={index} className="p-4 mb-4 border border-[#95C5C5]/20 rounded-lg bg-[#292B35]">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-[#EE8631]">FAQ #{index + 1}</h4>
                                        <button 
                                            type="button" 
                                            onClick={() => removeFAQItem(index)}
                                            className="text-[#EE8631] hover:text-[#EE8631]/70 transition-colors"
                                            disabled={eventForm.FAQ.length <= 1}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    
                                    <input
                                        type="text"
                                        value={faq.QUESTION}
                                        onChange={(e) => handleFAQChange(index, 'QUESTION', e.target.value)}
                                        placeholder="Question"
                                        className="w-full px-4 py-3 mb-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none focus:ring-2 focus:ring-[#EE8631]/50 text-[#E0E0E0] placeholder-[#95C5C5]/50"
                                    />
                                    
                                    <textarea
                                        value={faq.ANSWER}
                                        onChange={(e) => handleFAQChange(index, 'ANSWER', e.target.value)}
                                        placeholder="Answer"
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none focus:ring-2 focus:ring-[#EE8631]/50 text-[#E0E0E0] placeholder-[#95C5C5]/50"
                                    />
                                </div>
                            ))}
                            
                            <button 
                                type="button" 
                                onClick={addFAQItem}
                                className="mt-2 flex items-center text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                            >
                                <FaPlus className="mr-2" /> Add FAQ
                            </button>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-[#95C5C5] mb-4">Registration Questions</h3>
                            <p className="text-[#E0E0E0] mb-4">
                                Add questions you want participants to answer during registration.
                            </p>
                            
                            {eventForm.QUESTIONNAIRE.map((question, index) => (
                                <div key={index} className="p-4 mb-4 border border-[#95C5C5]/20 rounded-lg bg-[#292B35]">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-[#EE8631]">Question #{index + 1}</h4>
                                        <button 
                                            type="button" 
                                            onClick={() => removeQuestionnaireItem(index)}
                                            className="text-[#EE8631] hover:text-[#EE8631]/70 transition-colors"
                                            disabled={eventForm.QUESTIONNAIRE.length <= 1}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    
                                    <input
                                        type="text"
                                        value={question.QUESTION}
                                        onChange={(e) => handleQuestionnaireChange(index, 'QUESTION', e.target.value)}
                                        placeholder="Question"
                                        className="w-full px-4 py-3 mb-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none focus:ring-2 focus:ring-[#EE8631]/50 text-[#E0E0E0] placeholder-[#95C5C5]/50"
                                    />
                                    
                                    <textarea
                                        value={question.ANSWER || ''}
                                        onChange={(e) => handleQuestionnaireChange(index, 'ANSWER', e.target.value)}
                                        placeholder="Default answer (optional)"
                                        rows="2"
                                        className="w-full px-4 py-3 rounded-lg bg-[#292B35] border border-[#95C5C5]/30 focus:border-[#EE8631] focus:outline-none focus:ring-2 focus:ring-[#EE8631]/50 text-[#E0E0E0] placeholder-[#95C5C5]/50"
                                    />
                                </div>
                            ))}
                            
                            <button 
                                type="button" 
                                onClick={addQuestionnaireItem}
                                className="mt-2 flex items-center text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                            >
                                <FaPlus className="mr-2" /> Add Question
                            </button>
                        </div>
                    </>
                );

            case 7:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-[#95C5C5] mb-6">Preview & Publish</h2>
                        
                        {previewMode ? (
                            <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl p-6 mb-6">
                                <div className="mb-6 relative">
                                    {eventForm.IMAGE ? (
                                        <img 
                                            src={eventForm.IMAGE} 
                                            alt={eventForm.EVENT_NAME} 
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-[#95C5C5]/20 rounded-lg flex items-center justify-center">
                                            <p className="text-[#95C5C5]">No banner image</p>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-[#EE8631] text-white px-4 py-2 rounded-lg font-bold">
                                        {eventForm.GAME}
                                    </div>
                                </div>
                                
                                <h2 className="text-2xl font-bold text-[#95C5C5] mb-4">{eventForm.EVENT_NAME}</h2>
                                
                                <div className="mb-4">
                                    <p className="text-[#E0E0E0] mb-2">{eventForm.DESCRIPTION}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <h3 className="text-[#EE8631] font-bold mb-1">Date & Time</h3>
                                        <p className="text-[#E0E0E0]">{new Date(eventForm.EVENT_DATE).toLocaleString()}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-[#EE8631] font-bold mb-1">Registration Deadline</h3>
                                        <p className="text-[#E0E0E0]">{new Date(eventForm.REGISTRATION_DEADLINE).toLocaleString()}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-[#EE8631] font-bold mb-1">Game</h3>
                                        <p className="text-[#E0E0E0]">{eventForm.GAME} ({eventForm.GAME_TYPE})</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-[#EE8631] font-bold mb-1">Platform</h3>
                                        <p className="text-[#E0E0E0]">{eventForm.CONSOLE}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-[#EE8631] font-bold mb-1">Format</h3>
                                        <p className="text-[#E0E0E0]">{eventForm.FORMAT}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-[#EE8631] font-bold mb-1">Team Size</h3>
                                        <p className="text-[#E0E0E0]">{eventForm.NUMBER_OF_MEMBERS} members per team</p>
                                        {eventForm.NUMBER_OF_TEAMS && <p className="text-[#E0E0E0]">Maximum {eventForm.NUMBER_OF_TEAMS} teams</p>}
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-[#EE8631] font-bold mb-1">Prize Pool</h3>
                                        <p className="text-[#E0E0E0] text-xl font-bold">{eventForm.PRIZE_POOL}</p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-[#EE8631] font-bold mb-1">Location</h3>
                                        <p className="text-[#E0E0E0]">{eventForm.VENUE}, {eventForm.LOCATION}</p>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-[#95C5C5] mb-2">Eligibility Requirements</h3>
                                    <ul className="list-disc pl-6">
                                        {eventForm.ELIGIBILITY.map((item, index) => (
                                            <li key={index} className="text-[#E0E0E0] mb-1">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-[#95C5C5] mb-2">Contact Information</h3>
                                    <p className="text-[#E0E0E0]">Email: {eventForm.CONTACT_INFO.EMAIL}</p>
                                    <p className="text-[#E0E0E0]">Phone: +91 {eventForm.CONTACT_INFO.MOBILE_NUMBER}</p>
                                </div>
                                
                                {eventForm.FAQ.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-[#95C5C5] mb-2">Frequently Asked Questions</h3>
                                        {eventForm.FAQ.map((faq, index) => (
                                            <div key={index} className="mb-4">
                                                <p className="text-[#EE8631] font-bold">{faq.QUESTION}</p>
                                                <p className="text-[#E0E0E0]">{faq.ANSWER}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl p-6 mb-6">
                                <p className="text-[#E0E0E0] mb-4">
                                    Your event is ready to be published! Click the "Preview" button to see how your event will look like, or "Publish Event" to make it live.
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <FaCheck className="text-green-500 mr-3" />
                                        <p className="text-[#E0E0E0]">
                                            <span className="font-bold">{eventForm.EVENT_NAME}</span> scheduled for <span className="font-bold">{new Date(eventForm.EVENT_DATE).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <FaCheck className="text-green-500 mr-3" />
                                        <p className="text-[#E0E0E0]">
                                            Game: <span className="font-bold">{eventForm.GAME}</span> on <span className="font-bold">{eventForm.CONSOLE}</span>
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <FaCheck className="text-green-500 mr-3" />
                                        <p className="text-[#E0E0E0]">
                                            Prize pool: <span className="font-bold">{eventForm.PRIZE_POOL}</span>
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <FaCheck className="text-green-500 mr-3" />
                                        <p className="text-[#E0E0E0]">
                                            Location: <span className="font-bold">{eventForm.VENUE}, {eventForm.LOCATION}</span>
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <FaCheck className="text-green-500 mr-3" />
                                        <p className="text-[#E0E0E0]">
                                            Teams: <span className="font-bold">{eventForm.NUMBER_OF_MEMBERS} members per team</span>
                                            {eventForm.NUMBER_OF_TEAMS && <span> (max {eventForm.NUMBER_OF_TEAMS} teams)</span>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#292B35] text-[#E0E0E0] py-10">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                    >
                        <FaArrowLeft className="mr-2" /> Back
                    </button>
                    
                    <h1 className="text-4xl font-bold text-[#95C5C5] text-center">Create New Event</h1>
                    
                    <div>
                        <button
                            onClick={saveAsDraft}
                            className="flex items-center text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                            type="button"
                        >
                            <FaSave className="mr-2" /> Save Draft
                        </button>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mb-10">
                    <div className="flex justify-between mb-2">
                        {steps.map((step) => (
                            <div 
                                key={step.number} 
                                className={`relative flex flex-col items-center ${
                                    step.number < currentStep ? 'text-[#EE8631]' : 
                                    step.number === currentStep ? 'text-[#95C5C5]' : 'text-[#95C5C5]/50'
                                }`}
                            >
                                <div 
                                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                                        step.number < currentStep ? 'bg-[#EE8631] text-white' : 
                                        step.number === currentStep ? 'bg-[#95C5C5] text-[#292B35]' : 'bg-[#95C5C5]/30 text-[#E0E0E0]/70'
                                    }`}
                                >
                                    {step.number}
                                </div>
                                <div className="text-xs mt-2 whitespace-nowrap">{step.title}</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="w-full bg-[#95C5C5]/30 h-2 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#EE8631] transition-all duration-300"
                            style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Form content */}
                <div className="bg-[#2D303A] p-8 rounded-xl shadow-xl border border-[#95C5C5]/20 max-w-4xl mx-auto">
                    <form onSubmit={(e) => e.preventDefault()}>
                        {renderStepContent()}
                        
                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={prevStep}
                                className={`flex items-center px-6 py-3 rounded-lg ${
                                    currentStep === 1 
                                    ? 'bg-[#95C5C5]/30 text-[#E0E0E0]/50 cursor-not-allowed' 
                                    : 'bg-[#95C5C5] text-white hover:bg-[#95C5C5]/80'
                                } transition-colors`}
                                disabled={currentStep === 1}
                            >
                                <FaArrowLeft className="mr-2" /> Previous
                            </button>
                            
                            <div className="flex gap-3">
                                {currentStep < steps.length ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={togglePreview}
                                            className="flex items-center px-6 py-3 bg-[#292B35] text-[#95C5C5] rounded-lg hover:bg-[#292B35]/80 transition-colors"
                                        >
                                            <FaEye className="mr-2" /> Preview
                                        </button>
                                        
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className={`flex items-center px-6 py-3 rounded-lg ${
                                                !formValid 
                                                ? 'bg-[#EE8631]/30 text-[#E0E0E0]/50 cursor-not-allowed' 
                                                : 'bg-[#EE8631] text-white hover:bg-[#EE8631]/80'
                                            } transition-colors`}
                                            disabled={!formValid}
                                        >
                                            Next <FaArrowRight className="ml-2" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={togglePreview}
                                            className={`flex items-center px-6 py-3 rounded-lg ${
                                                previewMode 
                                                ? 'bg-[#292B35] text-[#95C5C5]' 
                                                : 'bg-[#95C5C5] text-white'
                                            } hover:opacity-90 transition-colors`}
                                        >
                                            <FaEye className="mr-2" /> {previewMode ? 'Hide Preview' : 'Preview'}
                                        </button>
                                        
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className={`flex items-center px-6 py-3 rounded-lg ${
                                                !formValid || isSubmitting
                                                ? 'bg-[#EE8631]/30 text-[#E0E0E0]/50 cursor-not-allowed' 
                                                : 'bg-[#EE8631] text-white hover:bg-[#EE8631]/80'
                                            } transition-colors`}
                                            disabled={!formValid || isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Publishing...
                                                </>
                                            ) : (
                                                <>
                                                    Publish Event <FaCheck className="ml-2" />
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
