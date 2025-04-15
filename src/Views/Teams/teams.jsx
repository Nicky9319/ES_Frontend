import React, { useState } from 'react';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';
import ManageTeams from './manageTeams';
import CreateTeam from './createTeam';
import { motion, AnimatePresence } from 'framer-motion';

const Teams = () => {
    const [activeView, setActiveView] = useState('manage'); // Changed default to 'manage' instead of 'main'
    
    const handleManageTeamsClick = () => {
        setActiveView('manage');
        console.log("Manage Teams clicked");
    }

    const handleCreateTeamClick = () => {
        setActiveView('create');
        console.log("Create Team clicked");
    }

    const handleBackClick = () => {
        setActiveView('main');
    }

    return (
        <div className="flex h-screen bg-[#E0E0E0] justify-center">
            {/* Left Slider */}
            <LeftSlider
                upperVerticalIcon="👥"
                upperVerticalTitle="Manage Teams"
                upperVerticalDescription="Organize and manage your teams"
                upperVerticalClick={handleManageTeamsClick}
                lowerVerticalIcon="➕"
                lowerVerticalTitle="Create Team"
                lowerVerticalDescription="Form a new team and invite members"
                lowerVerticalClick={handleCreateTeamClick}
            />

            {/* Right Slider with dynamic content and animations */}
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeView === 'main' && (
                        <motion.div 
                            key="main"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <RightSlider />
                        </motion.div>
                    )}
                    {activeView === 'manage' && (
                        <motion.div 
                            key="manage"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <ManageTeams onBackClick={handleBackClick} />
                        </motion.div>
                    )}
                    {activeView === 'create' && (
                        <motion.div 
                            key="create"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <CreateTeam onBackClick={handleBackClick} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <RightSlider/>
        </div>
    );
};

export default Teams;