import React from 'react';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';

const handleManageTeamsClick = () => {
    // Logic for managing teams
    console.log("Manage Teams clicked");
}

const handleCreateTeamClick = () => {
    // Logic for creating a team
    console.log("Create Team clicked");
}


const Teams = () => {
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

            {/* Right Slider */}
            <RightSlider />
        </div>
    );
};

export default Teams;