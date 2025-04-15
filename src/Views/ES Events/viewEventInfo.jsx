import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dummyData from './dummyEvents.json';
import SectionHeader from './components/SectionHeader';
import FAQItem from './components/FAQItem';
import { FaWhatsapp } from 'react-icons/fa';

import DiscussionItem from './components/DiscussionItem';

const ViewEventInfo = () => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [discussions, setDiscussions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate data fetching
        setLoading(true);

        // For demo purposes, we'll use the first event from dummy data
        // In a real app, you would fetch the specific event using eventId
        const eventData = dummyData.EVENTS.find(e => e.EVENT_ID === eventId) || dummyData.EVENTS[0];

        setTimeout(() => {
            setEvent(eventData);
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
                    src={event.IMAGE || "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                    alt={event.EVENT_NAME}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            {event.EVENT_NAME}
                        </h1>
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
                            <p className="text-lg mb-6">{event.DESCRIPTION}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <div className="bg-[#EE8631] p-3 rounded-full mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#EE8631]">Date & Time</h3>
                                        <p className="text-[#E0E0E0]">{formattedDate}</p>
                                        <p className="text-[#E0E0E0]">{formattedTime}</p>
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
                                        <p className="text-[#E0E0E0]">{event.VENUE}</p>
                                        <p className="text-[#E0E0E0]">{event.LOCATION}</p>
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
                                        <p className="text-[#E0E0E0]">{event.FORMAT}</p>
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
                                        <p className="text-[#E0E0E0] text-xl font-bold">{event.PRIZE_POOL}</p>
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
                                    <p className="text-xl">{event.FORMAT}</p>
                                </div>

                                {/* Team Information - New Section */}
                                {(event.NUMBER_OF_MEMBERS || event.NUMBER_OF_TEAMS) && (
                                    <>
                                        {event.NUMBER_OF_MEMBERS && (
                                            <div className="bg-[#292B35] p-4 rounded-lg border border-[#95C5C5]/30">
                                                <h3 className="text-[#EE8631] font-bold mb-2">Team Size</h3>
                                                <p className="text-xl">{event.NUMBER_OF_MEMBERS} Members</p>
                                            </div>
                                        )}
                                        {event.NUMBER_OF_TEAMS && (
                                            <div className="bg-[#292B35] p-4 rounded-lg border border-[#95C5C5]/30">
                                                <h3 className="text-[#EE8631] font-bold mb-2">Total Teams</h3>
                                                <p className="text-xl">{event.NUMBER_OF_TEAMS} Teams</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Eligibility Requirements */}
                        <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6">
                            <h2 className="text-3xl font-bold text-[#95C5C5] mb-6 border-b border-[#95C5C5]/20 pb-4">
                                Eligibility Requirements
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                {event.ELIGIBILITY.map((item, index) => (
                                    <li key={index} className="text-lg">{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* FAQ Section - Separate from Discussion Forum */}
                        {event.FAQ && event.FAQ.length > 0 && (
                            <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6">
                                <SectionHeader title="Frequently Asked Questions" />
                                <p className="text-[#E0E0E0] mb-6 italic">
                                    Find answers to common questions about this event.
                                </p>

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

                            <div className="bg-[#EE8631]/10 border border-[#EE8631] rounded-lg p-4 mb-6">
                                <p className="text-[#E0E0E0] font-medium">
                                    {event.REGISTRATION_DEADLINE ?
                                        `Registration closes on ${formattedDeadline}. Make sure to sign up early!` :
                                        'Registration closes 48 hours before the event. Sign up early!'}
                                </p>
                            </div>

                            <button
                                onClick={handleRegister}
                                disabled={registering}
                                className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${registering
                                    ? 'bg-[#95C5C5]/50 cursor-not-allowed'
                                    : 'bg-[#EE8631] hover:bg-[#AD662F] transform hover:scale-105'
                                    }`}
                            >
                                {registering ? 'Processing...' : 'Register Now'}
                            </button>

                            <div className="mt-6">
                                <h3 className="text-[#95C5C5] font-bold mb-2">Entry Fee</h3>
                                <p className="text-[#E0E0E0] text-xl">Free</p>
                            </div>

                            {/* Team Size Info in Registration Card */}
                            {event.NUMBER_OF_MEMBERS && (
                                <div className="mt-4 pt-4 border-t border-[#95C5C5]/20">
                                    <h3 className="text-[#95C5C5] font-bold mb-2">Team Information</h3>
                                    <p className="text-[#E0E0E0]">
                                        Teams must have {event.NUMBER_OF_MEMBERS} members
                                        {event.NUMBER_OF_TEAMS ? ` (Limited to ${event.NUMBER_OF_TEAMS} teams)` : ''}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Contact Information - Interactive Links */}
                        <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
                            <h2 className="text-3xl font-bold text-[#95C5C5] mb-6 border-b border-[#95C5C5]/20 pb-4">
                                Contact Information
                            </h2>

                            <div className="space-y-4">
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
                            </div>
                        </div>

                        {/* Social Media Sharing - Interactive Buttons */}
                        <div className="bg-[#292B35] border border-[#95C5C5]/20 rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
                            <h2 className="text-xl font-bold text-[#95C5C5] mb-4">
                                Share This Event
                            </h2>

                            <div className="flex space-x-4 justify-center">
                                {/* Social Media Buttons with Sharing Functionality */}
                                <button
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="bg-[#1877F2] p-3 rounded-full text-white hover:opacity-80 transition-all duration-300 transform hover:scale-110 shadow-md focus:ring-2 focus:ring-[#1877F2]/50 focus:outline-none active:scale-95"
                                    aria-label="Share on Facebook"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12.061c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54V9.861c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.873h2.773l-.443 2.891h-2.33v6.987C18.343 21.189 22 17.052 22 12.061z" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this amazing event: ${event.EVENT_NAME}`)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="bg-[#1DA1F2] p-3 rounded-full text-white hover:opacity-80 transition-all duration-300 transform hover:scale-110 shadow-md focus:ring-2 focus:ring-[#1DA1F2]/50 focus:outline-none active:scale-95"
                                    aria-label="Share on Twitter"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="bg-[#0077B5] p-3 rounded-full text-white hover:opacity-80 transition-all duration-300 transform hover:scale-110 shadow-md focus:ring-2 focus:ring-[#0077B5]/50 focus:outline-none active:scale-95"
                                    aria-label="Share on LinkedIn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() =>
                                        window.open(
                                            `https://api.whatsapp.com/send?text=${encodeURIComponent(
                                                `Check out this amazing event: ${event.EVENT_NAME} ${window.location.href}`
                                            )}`,
                                            '_blank'
                                        )
                                    }
                                    className="bg-[#25D366] p-3 rounded-full text-white hover:opacity-80 transition-all duration-300 transform hover:scale-110 shadow-md focus:ring-2 focus:ring-[#25D366]/50 focus:outline-none active:scale-95"
                                    aria-label="Share on WhatsApp"
                                >
                                    <FaWhatsapp className="w-5 h-5" />
                                </button>
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

export default ViewEventInfo;