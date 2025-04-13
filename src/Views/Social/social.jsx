import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';

function Social() {
    const navigate = useNavigate();
    const [mainContent, setMainContent] = useState(null);

    // Updated FeedCard Component with better styling
    const FeedCard = ({ user, role, time, content }) => (
        <div className="rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
             style={{ backgroundColor: '#ffffff', borderLeft: `4px solid #95C5C5` }}>
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#95C5C5] to-[#EE8631] flex items-center justify-center text-white text-xl font-bold mr-4 shadow-md">
                        {user.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-lg" style={{ color: '#292B35' }}>
                                {user}
                                <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium" 
                                      style={{ backgroundColor: role === 'Mentor' ? '#95C5C5' : '#EE8631', color: 'white' }}>
                                    {role}
                                </span>
                            </p>
                            <p className="text-sm" style={{ color: '#AD662F' }}>
                                {time}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ml-16">
                    <p className="text-gray-700 leading-relaxed">{content}</p>
                    <div className="mt-4 flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-sm transition-colors duration-300 hover:text-[#EE8631]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>Like</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm transition-colors duration-300 hover:text-[#EE8631]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>Reply</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm transition-colors duration-300 hover:text-[#EE8631]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleFeedClick = () => {
        console.log("Feed section clicked");
    
        const mockFeedData = [
            { 
                user: "Alice Chen", 
                role: "Mentor", 
                time: "2 mins ago", 
                content: "Just finished an amazing coaching session! Remember everyone: positioning is key in CS2. Will be sharing more advanced tips in tomorrow's workshop! 🎯 #ESports #Gaming #Coaching" 
            },
            { 
                user: "Bob Smith", 
                role: "Player", 
                time: "10 mins ago", 
                content: "Looking for a serious duo partner in Valorant (Diamond+). I main Controller/Sentinel. Available evenings EST. Let's climb together! 🎮 DM me for more details." 
            },
            { 
                user: "Chloe Park", 
                role: "Mentor", 
                time: "30 mins ago", 
                content: "Great progress with my students today! Remember: consistency is more important than raw aim. Practice these three core mechanics daily: counter-strafing, crosshair placement, and utility usage. 💪 #GamertipsTuesday" 
            },
        ];
    
        setMainContent(
            <div className="space-y-6 p-4 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold" style={{ color: '#292B35' }}>
                        Community Feed
                    </h2>
                    <button 
                        className="px-4 py-2 rounded-lg text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                        style={{ backgroundColor: '#EE8631' }}
                    >
                        New Post
                    </button>
                </div>
                <div className="space-y-6">
                    {mockFeedData.map((post, idx) => (
                        <FeedCard key={idx} {...post} />
                    ))}
                </div>
            </div>
        );
    };

    const NewsCard = ({ title, source, url }) => (
        <div 
            className="rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            style={{ backgroundColor: '#ffffff', borderTop: `4px solid #EE8631` }}
        >
            <div className="p-6">
                <a 
                    href={url}
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = url;
                    }}
                    className="block"
                >
                    <h3 
                        className="text-xl font-semibold mb-3 hover:text-[#EE8631] transition duration-300"
                        style={{ color: '#292B35' }}
                    >
                        {title}
                    </h3>
                    <div 
                        className="flex items-center mt-4 text-sm"
                        style={{ color: '#AD662F' }}
                    >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                        {source}
                    </div>
                </a>
            </div>
        </div>
    );

    const LoadingState = () => (
        <div className="flex items-center justify-center p-8" style={{ color: '#AD662F' }}>
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="space-y-3">
                    <div className="h-2 bg-slate-200 rounded w-48"></div>
                    <div className="h-2 bg-slate-200 rounded w-40"></div>
                </div>
            </div>
        </div>
    );

    const ErrorState = () => (
        <div className="text-center p-8">
            <div className="inline-block p-4 rounded-lg shadow-lg" style={{ backgroundColor: '#ffffff', color: '#EE8631' }}>
                <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <p className="font-medium">Failed to load news. Please try again.</p>
            </div>
        </div>
    );

    const handleNewsClick = async () => {
        setMainContent(<LoadingState />);

        try {
            const articles = [
                { title: "T1 secures MSI 2025 playoff spot with perfect record", source: "ESPN Esports", url: "https://www.youtube.com" },
                { title: "Sentinels shock the world in VCT playoffs", source: "Dot Esports", url: "https://www.youtube.com" },
                { title: "OG unveils new Dota 2 roster for TI12", source: "GosuGamers", url: "https://www.youtube.com" },
                { title: "NAVI wins CS2 Major in double overtime thriller", source: "HLTV", url: "https://www.youtube.com" },
                { title: "Epic Games announces $3M Fortnite 2025 World Cup", source: "IGN", url: "https://www.youtube.com" },
            ];

            setMainContent(
                <div className="space-y-6 p-4">
                    <h2 className="text-3xl font-bold mb-8" style={{ color: '#292B35' }}>
                        Latest Esports News
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article, idx) => (
                            <NewsCard key={idx} {...article} />
                        ))}
                    </div>
                </div>
            );
        } catch (error) {
            console.error('Simulated API error:', error);
            setMainContent(<ErrorState />);
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#E0E0E0' }}>
            <div className="flex min-h-screen">
                <LeftSlider
                    mentorIcon="📰"
                    mentorTitle="Feed"
                    mentorDescription="Latest community updates"
                    upperVerticalClick={handleFeedClick}
                    playerIcon="📢"
                    playerTitle="News"
                    playerDescription="Esports headlines & articles"
                    lowerVerticalClick={handleNewsClick}
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="shadow-md" style={{ backgroundColor: '#95C5C5', height: '4px' }}></header>
                    <main className="flex-1 overflow-x-hidden overflow-y-auto">
                        <div className="container mx-auto py-6">
                            {mainContent || (
                                <div className="text-center p-12 rounded-lg" style={{ color: '#292B35' }}>
                                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd"/>
                                    </svg>
                                    <p className="text-xl font-medium">Select a section from the sidebar to view content</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
                <RightSlider />
            </div>
        </div>
    );
}

export default Social;
