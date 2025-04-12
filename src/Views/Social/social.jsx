import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';

function Social() {
    const navigate = useNavigate(); // Initialize navigate

    // Define callback functions for Feed and News
    const handleFeedClick = () => {
        console.log("Feed section clicked, navigating...");
        // Example navigation: navigate('/feed'); 
        // Replace with your actual route
    };

    const handleNewsClick = () => {
        console.log("News section clicked, navigating...");
        // Example navigation: navigate('/news'); 
        // Replace with your actual route
    };

    return (

        <>

<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            ES Events
                        </h1>
                    </div>

        <div className="flex h-screen bg-gray-100">
            {/* Pass callbacks and custom props for Feed and News */}
            <LeftSlider 
                mentorIcon="📰" // Icon for Feed (Top section)
                mentorTitle="Feed"
                mentorDescription="Latest community updates"
                // mentorColor="#OptionalCustomColor" // Optional: Override default color
                upperVerticalClick={handleFeedClick} // Use the renamed handler

                playerIcon="📢" // Icon for News (Bottom section)
                playerTitle="News"
                playerDescription="Esports headlines & articles"
                // playerColor="#OptionalCustomColor" // Optional: Override default color
                lowerVerticalClick={handleNewsClick} // Use the renamed handler
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow">
                    
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                        </div>
                    </div>
                </main>
            </div>
            <RightSlider />
        </div>


        </>


    );
}

export default Social;