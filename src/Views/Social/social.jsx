import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';

function Social() {
    const navigate = useNavigate();
    const [mainContent, setMainContent] = useState(null);

    // NewsCard Component
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
                        window.location.href = "https://www.youtube.com";
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

    // LoadingState Component
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

    // ErrorState Component
    const ErrorState = () => (
        <div className="text-center p-8">
            <div 
                className="inline-block p-4 rounded-lg shadow-lg"
                style={{ backgroundColor: '#ffffff', color: '#EE8631' }}
            >
                <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <p className="font-medium">Failed to load news. Please try again.</p>
            </div>
        </div>
    );

    const handleFeedClick = () => {
        console.log("Feed section clicked, navigating...");
        navigate('/feed');
    };

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
