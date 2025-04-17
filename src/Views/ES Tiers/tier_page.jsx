import { motion } from 'framer-motion';
import React from 'react';

const tiers = [
  { name: 'Legend', tier: 0, color: '#FFD700' },
  { name: 'Professional', tier: 1, color: '#FF8C00' },
  { name: 'Platinum', tier: 2, color: '#95C5C5' },
  { name: 'Gold', tier: 3, color: '#EE8631' },
  { name: 'Silver', tier: 4, color: '#E0E0E0' },
  { name: 'Bronze', tier: 5, color: '#AD662F' },
  { name: 'Iron', tier: 6, color: '#292B35' },
];

// Simulate user's tier
const userTier = 3;

const RankHierarchy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#292B35] to-[#1A1B21] py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-light text-center mb-16 tracking-wider text-[#E0E0E0]">
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

        <div className="grid md:grid-cols-2 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl p-6 border backdrop-blur-lg shadow-lg relative
                ${userTier === tier.tier
                  ? 'border-[#FFD700]/50 bg-[#FFD700]/10'
                  : 'border-[#95C5C5]/20 bg-[#1A1B21]'}
              `}
            >
              <h2 className="text-2xl font-semibold text-[#E0E0E0] flex items-center justify-between">
                {tier.name}
                <span
                  className="ml-4 w-4 h-4 rounded-full"
                  style={{ backgroundColor: tier.color }}
                />
              </h2>
              <p className="mt-2 text-[#E0E0E0]/70">Tier {tier.tier}</p>
              {userTier === tier.tier && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 text-sm bg-[#95C5C5]/10 text-[#95C5C5] rounded-md border border-[#95C5C5]/20"
                >
                  You are currently ranked in <strong>{tier.name}</strong> tier.
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RankHierarchy;
