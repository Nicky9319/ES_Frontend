import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dummyData from './dummyEvents.json';
import SectionHeader from './components/SectionHeader';
import FAQItem from './components/FAQItem';
import { FaWhatsapp, FaPlus, FaTrash, FaImage } from 'react-icons/fa';

import DiscussionItem from './components/DiscussionItem';

const EventInfo = () => {
    const [event, setEvent] = useState(null);
    const [editedEvent, setEditedEvent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [discussions, setDiscussions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { eventId } = useParams();
    const navigate = useNavigate();
    
    // Ref for file inputs
    const imageInputRef = useRef(null);

    useEffect(() => {
        // Simulate data fetching
        setLoading(true);

        // For demo purposes, we'll use the first event from dummy data
        // In a real app, you would fetch the specific event using eventId
        const eventData = dummyData.EVENTS.find(e => e.EVENT_ID === eventId) || dummyData.EVENTS[0];

        setTimeout(() => {
            setEvent(eventData);
            setEditedEvent(eventData);
            // Initialize discussions from the event data
            if (eventData.QUESTIONNAIRE) {
                setDiscussions(eventData.QUESTIONNAIRE);
            }
            setLoading(false);
        }, 800);
    }, [eventId]);

    const handleRegister = () => {
        setRegistering(true);
        // Simulate registration process
        setTimeout(() => {
            setRegistering(false);
            alert("Registration successful! Check your email for confirmation.");
        }, 1500);
    };

    const toggleExpandFAQ = (index) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    const handleQuestionSubmit = (e) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;

        setIsSubmitting(true);

        // Simulate API call to post a new question
        setTimeout(() => {
            // Create a new discussion object
            const newDiscussion = {
                QUESTION: newQuestion,
                ANSWER: "Waiting for a response from the organizers...",
                timestamp: new Date().toISOString()
            };

            // Add the new discussion to the list
            setDiscussions([newDiscussion, ...discussions]);
            setNewQuestion('');
            setIsSubmitting(false);
        }, 1500);
    };

    const handleSaveChanges = () => {
        setEvent(editedEvent);
        setIsEditing(false);
        alert("Event details updated successfully!");
    };

    const handleCancelEdit = () => {
        setEditedEvent(event);
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setEditedEvent(prev => ({ ...prev, [field]: value }));
    };

    // Handle nested contact info changes
    const handleContactChange = (field, value) => {
        setEditedEvent(prev => ({
            ...prev,
            CONTACT_INFO: {
                ...prev.CONTACT_INFO,
                [field]: value
            }
        }));
    };

    // Handle eligibility array changes
    const handleEligibilityChange = (index, value) => {
        const newEligibility = [...editedEvent.ELIGIBILITY];
        newEligibility[index] = value;
        setEditedEvent(prev => ({
            ...prev,
            ELIGIBILITY: newEligibility
        }));
    };

    // Add new eligibility item
    const addEligibilityItem = () => {
        setEditedEvent(prev => ({
            ...prev,
            ELIGIBILITY: [...prev.ELIGIBILITY, '']
        }));
    };

    // Remove eligibility item
    const removeEligibilityItem = (index) => {
        const newEligibility = [...editedEvent.ELIGIBILITY];
        newEligibility.splice(index, 1);
        setEditedEvent(prev => ({
            ...prev,
            ELIGIBILITY: newEligibility
        }));
    };

    // Handle FAQ array changes
    const handleFAQChange = (index, field, value) => {
        const newFAQ = [...editedEvent.FAQ];
        newFAQ[index][field] = value;
        setEditedEvent(prev => ({
            ...prev,
            FAQ: newFAQ
        }));
    };

    // Add new FAQ item
    const addFAQItem = () => {
        setEditedEvent(prev => ({
            ...prev,
            FAQ: [...prev.FAQ, { QUESTION: '', ANSWER: '' }]
        }));
    };

    // Remove FAQ item
    const removeFAQItem = (index) => {
        const newFAQ = [...editedEvent.FAQ];
        newFAQ.splice(index, 1);
        setEditedEvent(prev => ({
            ...prev,
            FAQ: newFAQ
        }));
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedEvent(prev => ({
                    ...prev,
                    IMAGE: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#292B35] flex items-center justify-center">
                <div className="animate-pulse text-[#95C5C5] text-2xl font-bold">
                    Loading event details...
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-[#292B35] flex items-center justify-center">
                <div className="text-[#EE8631] text-2xl font-bold">
                    Event not found!
                </div>
            </div>
        );
    }

    // Format date for display - handle the new date format with $date field
    const eventDate = new Date(event.EVENT_DATE.$date || event.EVENT_DATE);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Format edited event date for input field
    const formatDateTimeForInput = (dateString) => {
        const date = new Date(dateString.$date || dateString);
        return date.toISOString().slice(0, 16); // Format as "YYYY-MM-DDThh:mm"
    };

    // Format registration deadline if available
    let formattedDeadline = "";
    if (event.REGISTRATION_DEADLINE) {
        const deadlineDate = new Date(event.REGISTRATION_DEADLINE.$date || event.REGISTRATION_DEADLINE);
        formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return (<>
        <div className="min-h-screen bg-[#292B35] text-[#E0E0E0]">
            {/* Hero Section with Event Banner */}
            <div className="relative h-[50vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#292B35]"></div>
                <img
                    src={isEditing ? editedEvent.IMAGE : event.IMAGE || "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                    alt={isEditing ? editedEvent.EVENT_NAME : event.EVENT_NAME}
                    className="w-full h-full object-cover object-center"
                />
                {/* Image upload button in edit mode */}
                {isEditing && (
                    <div className="absolute top-4 left-4 z-10">
                        <button
                            onClick={() => imageInputRef.current.click()}
                            className="bg-[#292B35]/80 text-[#E0E0E0] p-2 rounded-lg hover:bg-[#292B35] transition-colors"
                            aria-label="Change banner image"
                        >
                            <FaImage className="h-6 w-6" />
                        </button>
                        <input
                            type="file"
                            ref={imageInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                )}
                
                {/* Edit controls in hero */}
                <div className="absolute top-4 right-4 z-50">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <button onClick={handleSaveChanges} className="bg-[#95C5C5] text-[#292B35] px-4 py-2 rounded-lg font-semibold hover:bg-[#95C5C5]/80">Save Changes</button>
                            <button onClick={handleCancelEdit} className="bg-[#EE8631]/20 text-[#EE8631] px-4 py-2 rounded-lg font-semibold hover:bg-[#EE8631]/30">Cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="bg-[#EE8631] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#EE8631]/80">Edit Event</button>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedEvent.EVENT_NAME}
                                onChange={e => handleInputChange("EVENT_NAME", e.target.value)}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full"
                            />
                        ) : (
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                                {event.EVENT_NAME}
                            </h1>
                        )}
                        <div className="bg-[#EE8631] text-white inline-block px-4 py-2 rounded-lg font-bold text-lg drop-shadow-lg">
                            {event.GAME}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Event Basic Info Card */}
                        <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6">
                            <h2 className="text-3xl font-bold text-[#95C5C5] mb-6 border-b border-[#95C5C5]/20 pb-4">
                                Event Details
                            </h2>
                            {isEditing ? (
                                <textarea
                                    value={editedEvent.DESCRIPTION}
                                    onChange={e => handleInputChange("DESCRIPTION", e.target.value)}
                                    className="text-lg mb-6 bg-transparent border border-[#95C5C5]/30 rounded-lg p-4 text-[#E0E0E0] focus:outline-none focus:border-[#EE8631] w-full"
                                    rows="4"
                                    placeholder="Event Description"
                                />
                            ) : (
                                <p className="text-lg mb-6">{event.DESCRIPTION}</p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <div className="bg-[#EE8631] p-3 rounded-full mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#EE8631]">Date & Time</h3>
                                        {isEditing ? (
                                            <input
                                                type="datetime-local"
                                                value={formatDateTimeForInput(editedEvent.EVENT_DATE)}
                                                onChange={e => handleInputChange("EVENT_DATE", {$date: new Date(e.target.value).toISOString()})}
                                                className="text-[#E0E0E0] bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full"
                                            />
                                        ) : (
                                            <>
                                                <p className="text-[#E0E0E0]">{formattedDate}</p>
                                                <p className="text-[#E0E0E0]">{formattedTime}</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-[#EE8631] p-3 rounded-full mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#EE8631]">Location</h3>
                                        {isEditing ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedEvent.VENUE}
                                                    onChange={e => handleInputChange("VENUE", e.target.value)}
                                                    className="text-[#E0E0E0] bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full mb-2"
                                                    placeholder="Venue Name"
                                                />
                                                <input
                                                    type="text"
                                                    value={editedEvent.LOCATION}
                                                    onChange={e => handleInputChange("LOCATION", e.target.value)}
                                                    className="text-[#E0E0E0] bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full"
                                                    placeholder="City/Location"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-[#E0E0E0]">{event.VENUE}</p>
                                                <p className="text-[#E0E0E0]">{event.LOCATION}</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-[#EE8631] p-3 rounded-full mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#EE8631]">Format</h3>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedEvent.FORMAT}
                                                onChange={e => handleInputChange("FORMAT", e.target.value)}
                                                className="text-[#E0E0E0] bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full"
                                                placeholder="Tournament Format"
                                            />
                                        ) : (
                                            <p className="text-[#E0E0E0]">{event.FORMAT}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-[#EE8631] p-3 rounded-full mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#EE8631]">Prize Pool</h3>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedEvent.PRIZE_POOL}
                                                onChange={e => handleInputChange("PRIZE_POOL", e.target.value)}
                                                className="text-[#E0E0E0] text-xl font-bold bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full"
                                                placeholder="e.g. $5000"
                                            />
                                        ) : (
                                            <p className="text-[#E0E0E0] text-xl font-bold">{event.PRIZE_POOL}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Game Information */}
                        <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6">
                            <h2 className="text-3xl font-bold text-[#95C5C5] mb-6 border-b border-[#95C5C5]/20 pb-4">
                                Game Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#292B35] p-4 rounded-lg border border-[#95C5C5]/30">
                                    <h3 className="text-[#EE8631] font-bold mb-2">Game</h3>
                                    <p className="text-xl">{event.GAME}</p>
                                </div>
                                <div className="bg-[#292B35] p-4 rounded-lg border border-[#95C5C5]/30">
                                    <h3 className="text-[#EE8631] font-bold mb-2">Game Type</h3>
                                    <p className="text-xl">{event.GAME_TYPE}</p>
                                </div>
                                <div className="bg-[#292B35] p-4 rounded-lg border border-[#95C5C5]/30">
                                    <h3 className="text-[#EE8631] font-bold mb-2">Platform</h3>
                                    <p className="text-xl">{event.CONSOLE}</p>
                                </div>
                                <div className="bg-[#292B35] p-4 rounded-lg border border-[#95C5C5]/30">
                                    <h3 className="text-[#EE8631] font-bold mb-2">Format</h3>
                                    <p className="text-xl">{isEditing ? editedEvent.FORMAT : event.FORMAT}</p>
                                </div>

                                {/* Team Information - New Section */}
                                {(event.NUMBER_OF_MEMBERS || event.NUMBER_OF_TEAMS) && (
                                    <>
                                        <div className="bg-[#292B35] p-4 rounded-lg border border-[#95C5C5]/30">
                                            <h3 className="text-[#EE8631] font-bold mb-2">Team Size</h3>
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={editedEvent.NUMBER_OF_MEMBERS}
                                                    onChange={e => handleInputChange("NUMBER_OF_MEMBERS", parseInt(e.target.value) || 0)}
                                                    className="text-xl bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full"
                                                    min="1"
                                                />
                                            ) : (
                                                <p className="text-xl">{event.NUMBER_OF_MEMBERS} Members</p>
                                            )}
                                        </div>
                                        <div className="bg-[#292B35] p-4 rounded-lg border border-[#95C5C5]/30">
                                            <h3 className="text-[#EE8631] font-bold mb-2">Total Teams</h3>
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={editedEvent.NUMBER_OF_TEAMS}
                                                    onChange={e => handleInputChange("NUMBER_OF_TEAMS", parseInt(e.target.value) || 0)}
                                                    className="text-xl bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full"
                                                    min="1"
                                                />
                                            ) : (
                                                <p className="text-xl">{event.NUMBER_OF_TEAMS} Teams</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Eligibility Requirements */}
                        <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6">
                            <h2 className="text-3xl font-bold text-[#95C5C5] mb-6 border-b border-[#95C5C5]/20 pb-4">
                                Eligibility Requirements
                            </h2>
                            
                            {isEditing ? (
                                <div className="space-y-3">
                                    {editedEvent.ELIGIBILITY.map((item, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => handleEligibilityChange(index, e.target.value)}
                                                className="flex-1 px-3 py-2 bg-transparent border border-[#95C5C5]/30 rounded-lg text-lg focus:outline-none focus:border-[#EE8631]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeEligibilityItem(index)}
                                                className="ml-2 p-2 text-[#EE8631] hover:text-[#EE8631]/70"
                                                disabled={editedEvent.ELIGIBILITY.length <= 1}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addEligibilityItem}
                                        className="flex items-center mt-2 text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                                    >
                                        <FaPlus className="mr-2" /> Add Requirement
                                    </button>
                                </div>
                            ) : (
                                <ul className="list-disc pl-6 space-y-2">
                                    {event.ELIGIBILITY.map((item, index) => (
                                        <li key={index} className="text-lg">{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* FAQ Section - Separate from Discussion Forum */}
                        {(event.FAQ && event.FAQ.length > 0) && (
                            <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6">
                                <SectionHeader title="Frequently Asked Questions" />
                                <p className="text-[#E0E0E0] mb-6 italic">
                                    Find answers to common questions about this event.
                                </p>

                                {isEditing ? (
                                    <div className="space-y-4">
                                        {editedEvent.FAQ.map((faq, index) => (
                                            <div key={index} className="bg-[#292B35]/70 p-4 border border-[#95C5C5]/30 rounded-lg">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="font-bold text-[#EE8631]">FAQ #{index + 1}</h3>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeFAQItem(index)}
                                                        className="text-[#EE8631] hover:text-[#EE8631]/70 p-1"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={faq.QUESTION}
                                                    onChange={(e) => handleFAQChange(index, 'QUESTION', e.target.value)}
                                                    className="w-full mb-2 px-3 py-2 bg-transparent border border-[#95C5C5]/30 rounded-lg focus:outline-none"
                                                    placeholder="Question"
                                                />
                                                <textarea
                                                    value={faq.ANSWER}
                                                    onChange={(e) => handleFAQChange(index, 'ANSWER', e.target.value)}
                                                    className="w-full px-3 py-2 bg-transparent border border-[#95C5C5]/30 rounded-lg focus:outline-none"
                                                    placeholder="Answer"
                                                    rows="3"
                                                />
                                            </div>
                                        ))}
                                        <button 
                                            type="button" 
                                            onClick={addFAQItem}
                                            className="flex items-center mt-4 text-[#95C5C5] hover:text-[#EE8631] transition-colors"
                                        >
                                            <FaPlus className="mr-2" /> Add FAQ
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {event.FAQ.map((faq, index) => (
                                            <FAQItem
                                                key={index}
                                                faq={faq}
                                                index={index}
                                                isExpanded={expandedFAQ === index}
                                                toggleExpand={toggleExpandFAQ}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Discussion Forum - Enhanced Design */}
                        <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
                            <SectionHeader title="Discussion Forum" />
                            <p className="text-[#E0E0E0] mb-6 italic">
                                Join the conversation about this event. Ask questions and share your thoughts.
                            </p>

                            {/* New Question Form - Enhanced */}
                            <form onSubmit={handleQuestionSubmit} className="mb-8">
                                <div className="bg-[#292B35]/70 rounded-lg p-5 border border-[#95C5C5]/30 transition-all duration-300 hover:border-[#95C5C5]/50">
                                    <div className="flex items-start space-x-3 mb-4">
                                        <div className="bg-[#95C5C5] p-2 rounded-full flex-shrink-0 mt-1 transform transition-transform duration-300 hover:scale-110">
                                            <svg className="w-5 h-5 text-[#292B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <textarea
                                                className="w-full rounded-lg bg-[#2D3039] border border-[#95C5C5]/30 p-4 text-[#E0E0E0] placeholder-[#95C5C5]/50 focus:outline-none focus:ring-2 focus:ring-[#EE8631]/50 transition-all duration-300"
                                                placeholder="Ask a question about this event..."
                                                rows="3"
                                                value={newQuestion}
                                                onChange={(e) => setNewQuestion(e.target.value)}
                                                disabled={isSubmitting}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className={`px-5 py-2.5 rounded-lg font-semibold flex items-center ${isSubmitting ? 'bg-[#EE8631]/50 cursor-not-allowed' : 'bg-[#EE8631] hover:bg-[#EE8631]/80'
                                                } transition-all duration-300 transform hover:scale-105 shadow-md`}
                                            disabled={isSubmitting || !newQuestion.trim()}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Posting...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                                    </svg>
                                                    Post Question
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Discussion List - Enhanced */}
                            {discussions.length > 0 ? (
                                <div className="space-y-6">
                                    {discussions.map((discussion, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#2D3039] rounded-xl p-5 border border-[#95C5C5]/20 transition-all duration-300 hover:border-[#95C5C5]/40 hover:shadow-lg"
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="bg-[#EE8631]/80 p-3 rounded-full flex-shrink-0">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-lg text-[#95C5C5]">Question</h3>
                                                        {discussion.timestamp && (
                                                            <span className="text-xs text-[#95C5C5]/60">
                                                                {new Date(discussion.timestamp).toLocaleString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[#E0E0E0] mb-4">{discussion.QUESTION}</p>

                                                    {/* Answer Section */}
                                                    <div className="mt-4 pl-4 border-l-2 border-[#EE8631]/30">
                                                        <h4 className="font-semibold text-md text-[#EE8631] mb-2">Response</h4>
                                                        <p className="text-[#E0E0E0]/90">{discussion.ANSWER}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-[#2D3039]/50 rounded-xl border border-dashed border-[#95C5C5]/30 transition-all duration-300">
                                    <div className="inline-flex items-center justify-center p-4 bg-[#292B35]/50 rounded-full mb-4">
                                        <svg className="w-10 h-10 text-[#95C5C5]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                        </svg>
                                    </div>
                                    <p className="text-[#95C5C5]/70 text-lg mb-2">No discussions yet.</p>
                                    <p className="text-[#95C5C5]/50">Be the first to start a conversation!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Fixed Position on Desktop */}
                    <div className="space-y-8 lg:sticky lg:top-8 h-fit">
                        {/* Registration Card */}
                        <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6">
                            <h2 className="text-3xl font-bold text-[#95C5C5] mb-6 border-b border-[#95C5C5]/20 pb-4">
                                Registration
                            </h2>

                            <div className="mt-6">
                                <h3 className="text-[#95C5C5] font-bold mb-2">Entry Fee</h3>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedEvent.ENTRY_FEE || "Free"}
                                        onChange={e => handleInputChange("ENTRY_FEE", e.target.value)}
                                        className="text-[#E0E0E0] text-xl bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full"
                                    />
                                ) : (
                                    <p className="text-[#E0E0E0] text-xl">{event.ENTRY_FEE || "Free"}</p>
                                )}
                            </div>
                            
                            {isEditing && (
                                <div className="mt-4">
                                    <h3 className="text-[#95C5C5] font-bold mb-2">Registration Deadline</h3>
                                    <input
                                        type="datetime-local"
                                        value={formatDateTimeForInput(editedEvent.REGISTRATION_DEADLINE)}
                                        onChange={e => handleInputChange("REGISTRATION_DEADLINE", {$date: new Date(e.target.value).toISOString()})}
                                        className="text-[#E0E0E0] bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Contact Information - Interactive Links */}
                        <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
                            <h2 className="text-3xl font-bold text-[#95C5C5] mb-6 border-b border-[#95C5C5]/20 pb-4">
                                Contact Information
                            </h2>

                            <div className="space-y-4">
                                {isEditing ? (
                                    <>
                                        <div className="flex items-center space-x-4 p-3 rounded-lg">
                                            <div className="bg-[#EE8631] p-3 rounded-full">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-[#E0E0E0] font-semibold">Email</h3>
                                                <input
                                                    type="email"
                                                    value={editedEvent.CONTACT_INFO.EMAIL}
                                                    onChange={e => handleContactChange("EMAIL", e.target.value)}
                                                    className="text-[#95C5C5] bg-transparent border-b border-[#95C5C5]/50 focus:outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4 p-3 rounded-lg">
                                            <div className="bg-[#EE8631] p-3 rounded-full">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-[#E0E0E0] font-semibold">Phone</h3>
                                                <div className="flex items-center">
                                                    <span className="text-[#95C5C5] mr-2">+91</span>
                                                    <input
                                                        type="tel"
                                                        value={editedEvent.CONTACT_INFO.MOBILE_NUMBER}
                                                        onChange={e => handleContactChange("MOBILE_NUMBER", e.target.value)}
                                                        className="text-[#95C5C5] bg-transparent border-b border-[#95C5C5]/50 focus:outline-none flex-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <a
                                            href={`mailto:${event.CONTACT_INFO.EMAIL}`}
                                            className="flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-[#2D3039] group"
                                        >
                                            <div className="bg-[#EE8631] p-3 rounded-full transform transition-all duration-300 group-hover:scale-110">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-[#E0E0E0] font-semibold">Email</h3>
                                                <p className="text-[#95C5C5] transition-all duration-300 group-hover:text-[#EE8631]">{event.CONTACT_INFO.EMAIL}</p>
                                            </div>
                                        </a>

                                        <a
                                            href={`tel:+91${event.CONTACT_INFO.MOBILE_NUMBER}`}
                                            className="flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-[#2D3039] group"
                                        >
                                            <div className="bg-[#EE8631] p-3 rounded-full transform transition-all duration-300 group-hover:scale-110">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-[#E0E0E0] font-semibold">Phone</h3>
                                                <p className="text-[#95C5C5] transition-all duration-300 group-hover:text-[#EE8631]">+91 {event.CONTACT_INFO.MOBILE_NUMBER}</p>
                                            </div>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-8 right-8 z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-[#EE8631] hover:bg-[#AD662F] text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            </div>
        </div>

    </>
    );
};

export default EventInfo;