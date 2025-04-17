import { motion } from 'framer-motion';
import React, { useState } from 'react';

const tiers = [
    { name: 'Legend', tier: 0, color: '#FFD700', expRequired: 10000 },
    { name: 'Professional', tier: 1, color: '#FF8C00', expRequired: 7500 },
    { name: 'Platinum', tier: 2, color: '#95C5C5', expRequired: 5000 },
    { name: 'Gold', tier: 3, color: '#EE8631', expRequired: 3000 },
    { name: 'Silver', tier: 4, color: '#E0E0E0', expRequired: 1500 },
    { name: 'Bronze', tier: 5, color: '#AD662F', expRequired: 500 },
    { name: 'Iron', tier: 6, color: '#292B35', expRequired: 0 },
];

// Simulate user's tier and current exp
const userTier = 3;
const userExp = 2500;

const RankHierarchy = () => {
    const [showRankingInfo, setShowRankingInfo] = useState(false);

    const toggleRankingInfo = () => {
        setShowRankingInfo(!showRankingInfo);
    };

    const currentTier = tiers.find(tier => tier.tier === userTier);
    const nextTier = tiers.find(tier => tier.tier === userTier - 1);

    const expToNextTier = nextTier ? nextTier.expRequired - userExp : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#292B35] to-[#1A1B21] py-12 px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto"
            >
                <h1 className="text-5xl font-light text-center mb-8 tracking-wider text-[#E0E0E0]">
                    <span className="text-[#EE8631] relative inline-block">
                        RANK HIERARCHY
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute -bottom-4 left-0 w-full h-[1px] bg-[#EE8631]/20"
                        />
                    </span>
                </h1>

                {/* Linear Tier Display */}
                <div className="space-y-6">
                    {tiers.slice().sort((a, b) => a.tier - b.tier).map((tier, index) => (
                        <motion.div
                            key={index}
                            className={`rounded-xl p-6 border backdrop-blur-lg shadow-lg relative flex items-center justify-between
                                ${userTier === tier.tier
                                    ? 'border-[#FFD700]/50 bg-[#FFD700]/10'
                                    : 'border-[#95C5C5]/20 bg-[#1A1B21]'}
                            `}
                        >
                            <div className="flex items-center">
                                <span
                                    className="mr-4 w-4 h-4 rounded-full"
                                    style={{ backgroundColor: tier.color }}
                                />
                                <div className="text-[#E0E0E0]">
                                    <h2 className="text-2xl font-semibold">{tier.name}</h2>
                                    <p className="text-[#E0E0E0]/70">Tier {tier.tier}</p>
                                </div>
                            </div>

                            {/* Exp to Next Tier */}
                            {userTier === tier.tier && nextTier && (
                                <div className="text-right">
                                    <p className="text-[#95C5C5]">
                                        {expToNextTier} Exp to {nextTier.name}
                                    </p>
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#292B35]">
                                            <div
                                                style={{ width: `${(userExp / nextTier.expRequired) * 100}%` }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#EE8631]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* "How do we rank you?" Button */}
                <div className="text-center mt-12">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#EE8631] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:bg-[#AD662F] transition duration-300"
                        onClick={toggleRankingInfo}
                    >
                        How do we rank you?
                    </motion.button>
                </div>

                {/* Ranking System Explanation Bubble */}
                {showRankingInfo && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#292B35] p-8 rounded-2xl shadow-xl border border-[#95C5C5]/20 max-w-2xl mx-auto mt-8"
                    >
                        <h2 className="text-3xl font-semibold text-[#95C5C5] mb-4 text-center">
                            Ranking System Explained
                        </h2>
                        <p className="text-[#E0E0E0]/80 mb-6">
                            Our ranking system is based on a combination of factors, including your activity,
                            contributions, and performance in various events and challenges. The higher your
                            rank, the more exclusive benefits and recognition you'll receive.
                        </p>

                        {/* Pyramid View of Ranks */}
                        <div className="relative">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
                                <div className="text-[#FFD700] text-xl font-semibold">Legend</div>
                            </div>
                            <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 text-center">
                                <div className="text-[#FF8C00] text-xl font-semibold">Professional</div>
                            </div>
                            <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 text-center">
                                <div className="text-[#95C5C5] text-xl font-semibold">Platinum</div>
                            </div>
                            <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 text-center">
                                <div className="text-[#EE8631] text-xl font-semibold">Gold</div>
                            </div>
                            <div className="absolute top-[240px] left-1/2 transform -translate-x-1/2 text-center">
                                <div className="text-[#E0E0E0] text-xl font-semibold">Silver</div>
                            </div>
                            <div className="absolute top-[300px] left-1/2 transform -translate-x-1/2 text-center">
                                <div className="text-[#AD662F] text-xl font-semibold">Bronze</div>
                            </div>
                            <div className="absolute top-[360px] left-1/2 transform -translate-x-1/2 text-center">
                                <div className="text-[#292B35] text-xl font-semibold">Iron</div>
                            </div>
                            {/* Add pyramid graphic here */}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default RankHierarchy;


