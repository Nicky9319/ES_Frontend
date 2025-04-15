import React, { useState } from 'react';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';
import ManageTeams from './manageTeams';
import CreateTeam from './createTeam';

const Teams = () => {
    const [activeView, setActiveView] = useState('main'); // 'main', 'manage', 'create'
    
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
                mentorIcon="👥"
                mentorTitle="Manage Teams"
                mentorDescription="Organize and manage your teams"
                upperVerticalClick={handleManageTeamsClick}
                playerIcon="➕"
                playerTitle="Create Team"
                playerDescription="Form a new team and invite members"
                lowerVerticalClick={handleCreateTeamClick}
            />

            {/* Right Slider with dynamic content */}
            <div className="flex-1">
                {activeView === 'main' && <RightSlider />}
                {activeView === 'manage' && <ManageTeams onBackClick={handleBackClick} />}
                {activeView === 'create' && <CreateTeam onBackClick={handleBackClick} />}
            </div>
        </div>
    );
};

export default Teams;