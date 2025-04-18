import { motion } from "framer-motion";
import React, { useState } from "react";

const tiers = [
  { name: "Legend", tier: 0, color: "#FF8C00", expRequired: 10000 },
  { name: "Professional", tier: 1, color: "#800080", expRequired: 7500 },
  { name: "Platinum", tier: 2, color: "#4F666A", expRequired: 5000 },
  { name: "Gold", tier: 3, color: "#8B4513", expRequired: 3000 },
  { name: "Silver", tier: 4, color: "#8B8B8B", expRequired: 1500 },
  { name: "Bronze", tier: 5, color: "#AD662F", expRequired: 500 },
  { name: "Iron", tier: 6, color: "#4A4A4A", expRequired: 0 },
].reverse();

// Simulate user's tier and current exp
const userTier = 3;
const userExp = 2500;

// Enhanced 3D Pyramid Component
const PyramidTier = ({
  color,
  name,
  height,
  width,
  bottom,
  delay,
  isHighlighted = false,
  onClick = null,
}) => (
  <motion.div
    className={`absolute left-1/2 transform -translate-x-1/2 ${
      isHighlighted ? "z-10" : "z-0"
    }`}
    style={{ bottom, width, height }}
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 0.6, delay }}
    onClick={onClick}
    whileHover={onClick ? { scale: 1.05, boxShadow: `0 0 15px ${color}` } : {}}
  >
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: color,
        boxShadow: isHighlighted ? `0 0 20px ${color}` : `0 0 5px ${color}`,
        transition: "all 0.3s ease",
        border: isHighlighted ? `2px solid ${color}` : "none",
      }}
    >
      <div className="text-white font-medium text-center z-10 drop-shadow-lg">
        {name}
      </div>
      {/* 3D Effect Edges */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  </motion.div>
);

// Full Pyramid Component
const Pyramid = ({ highlightTier = null, onTierClick = null }) => (
  <div className="relative h-[350px] w-full mx-auto">
    <PyramidTier
      name="Iron"
      color="#4A4A4A"
      height="50px"
      width="300px"
      bottom="0"
      delay={0.1}
      isHighlighted={highlightTier === 6}
      onClick={onTierClick ? () => onTierClick(6) : null}
    />
    <PyramidTier
      name="Bronze"
      color="#AD662F"
      height="50px"
      width="260px"
      bottom="50px"
      delay={0.2}
      isHighlighted={highlightTier === 5}
      onClick={onTierClick ? () => onTierClick(5) : null}
    />
    <PyramidTier
      name="Silver"
      color="#8B8B8B"
      height="50px"
      width="220px"
      bottom="100px"
      delay={0.3}
      isHighlighted={highlightTier === 4}
      onClick={onTierClick ? () => onTierClick(4) : null}
    />
    <PyramidTier
      name="Gold"
      color="#8B4513"
      height="50px"
      width="180px"
      bottom="150px"
      delay={0.4}
      isHighlighted={highlightTier === 3}
      onClick={onTierClick ? () => onTierClick(3) : null}
    />
    <PyramidTier
      name="Platinum"
      color="#4F666A"
      height="50px"
      width="140px"
      bottom="200px"
      delay={0.5}
      isHighlighted={highlightTier === 2}
      onClick={onTierClick ? () => onTierClick(2) : null}
    />
    <PyramidTier
      name="Professional"
      color="#800080"
      height="50px"
      width="100px"
      bottom="250px"
      delay={0.6}
      isHighlighted={highlightTier === 1}
      onClick={onTierClick ? () => onTierClick(1) : null}
    />
    <PyramidTier
      name="Legend"
      color="#FF8C00"
      height="50px"
      width="60px"
      bottom="300px"
      delay={0.7}
      isHighlighted={highlightTier === 0}
      onClick={onTierClick ? () => onTierClick(0) : null}
    />
  </div>
);

// Leaderboard Data (Top 100 Players)
const leaderboardData = [
  { username: "ShadowMaster", xp: "12450" },
  { username: "PhoenixRider", xp: "11890" },
  { username: "StardustKnight", xp: "11230" },
  { username: "VoidWalker", xp: "9870" },
  { username: "ThunderBolt", xp: "9540" },
  { username: "CrimsonBlade", xp: "9120" },
  { username: "FrostQueen", xp: "8950" },
  { username: "DragonHeart", xp: "8780" },
  { username: "NightRaven", xp: "8650" },
  { username: "BlazeFury", xp: "8430" },
  { username: "ArcaneWizard", xp: "8120" },
  { username: "SteelPhoenix", xp: "7980" },
  { username: "MysticRogue", xp: "7890" },
  { username: "IceWarrior", xp: "7750" },
  { username: "StormBringer", xp: "7620" },
  { username: "ShadowHunter", xp: "6990" },
  { username: "FireLord", xp: "6780" },
  { username: "DarkKnight", xp: "6540" },
  { username: "LightBearer", xp: "6320" },
  { username: "EarthShaker", xp: "6150" },
  { username: "WindRunner", xp: "5980" },
  { username: "FrostGiant", xp: "5840" },
  { username: "Blademaster", xp: "5720" },
  { username: "SpellWeaver", xp: "5590" },
  { username: "SoulReaper", xp: "5440" },
  { username: "WarChief", xp: "4890" },
  { username: "MoonHunter", xp: "4780" },
  { username: "StarSeeker", xp: "4650" },
  { username: "StormRider", xp: "4520" },
  { username: "FlameKeeper", xp: "4390" },
  { username: "IronHeart", xp: "4280" },
  { username: "CloudWalker", xp: "4150" },
  { username: "DreamWeaver", xp: "4020" },
  { username: "RainMaker", xp: "3890" },
  { username: "ThunderLord", xp: "3780" },
  { username: "SilverBlade", xp: "3450" },
  { username: "MistWalker", xp: "3320" },
  { username: "FrostBite", xp: "3190" },
  { username: "SilverFang", xp: "3150" },
  { username: "MoonStrider", xp: "3050" },
  { username: "DuskHunter", xp: "2980" },
  { username: "StormBringer", xp: "2920" },
  { username: "NightWalker", xp: "2890" },
  { username: "DawnSeeker", xp: "2750" },
  { username: "SkyWarden", xp: "2680" },
  { username: "EarthShaper", xp: "2610" },
  { username: "FlameWatcher", xp: "2540" },
  { username: "FrostSeeker", xp: "2470" },
  { username: "ShadowDancer", xp: "2400" },
  { username: "MistWeaver", xp: "2330" },
  { username: "StarForger", xp: "2260" },
  { username: "DuskBlade", xp: "2190" },
  { username: "MoonBlade", xp: "2730" },
  { username: "StarStriker", xp: "2620" },
  { username: "WindDancer", xp: "2510" },
  { username: "StormCaller", xp: "2400" },
  { username: "BronzeKnight", xp: "2290" },
  { username: "EarthWarden", xp: "2180" },
  { username: "FlameSeeker", xp: "2070" },
  { username: "FrostWarden", xp: "1960" },
  { username: "ShadowKeeper", xp: "1850" },
  { username: "StormWeaver", xp: "1740" },
  { username: "MoonWatcher", xp: "1630" },
  { username: "StarKeeper", xp: "1520" },
  { username: "WindWeaver", xp: "1410" },
  { username: "CrystalMage", xp: "2850" },
  { username: "ShadowBlade", xp: "2780" },
  { username: "DuskStrider", xp: "2710" },
  { username: "LightWeaver", xp: "2640" },
  { username: "StormHawk", xp: "2570" },
  { username: "FrostBringer", xp: "2500" },
  { username: "EarthWalker", xp: "2430" },
  { username: "FlameStrider", xp: "2360" },
  { username: "VoidKeeper", xp: "2290" },
  { username: "MistRunner", xp: "2220" },
  { username: "DawnStrider", xp: "2150" },
  { username: "NightWarden", xp: "2080" },
  { username: "StarWalker", xp: "2010" },
  { username: "CloudWeaver", xp: "1940" },
  { username: "MoonKeeper", xp: "1870" },
  { username: "IronLion", xp: "1800" },
  { username: "BronzeFalcon", xp: "1750" },
  { username: "SilverWolf", xp: "1700" },
  { username: "GoldTiger", xp: "1650" },
  { username: "PlatinumBear", xp: "1600" },
  { username: "ProEagle", xp: "1550" },
  { username: "LegendFox", xp: "1500" },
  { username: "IronOtter", xp: "1450" },
  { username: "BronzeShark", xp: "1400" },
  { username: "SilverHawk", xp: "1350" },
  { username: "GoldWolf", xp: "1300" },
  { username: "PlatinumLion", xp: "1250" },
  { username: "ProBear", xp: "1200" },
  { username: "LegendEagle", xp: "1150" },
  { username: "IronFox", xp: "1100" },
  { username: "BronzeOtter", xp: "1050" },
  { username: "SilverShark", xp: "1000" },
  { username: "GoldFalcon", xp: "950" },
  { username: "PlatinumTiger", xp: "900" },
  { username: "ProLion", xp: "850" },
];

// Assign rank (tier) based on XP requirements
const leaderboardWithRank = leaderboardData
  .map((player) => {
    const xp = parseInt(player.xp.replace(/,/g, ""));
    let rank = "Iron"; // Default rank
    for (const tier of tiers) {
      if (xp >= tier.expRequired) {
        rank = tier.name;
      }
    }
    return { ...player, rank: rank };
  })
  .sort((a, b) => parseInt(b.xp) - parseInt(a.xp))
  .slice(0, 100);

const RankHierarchy = () => {
  const [showRankingInfo, setShowRankingInfo] = useState(false);
  const [hoveredTier, setHoveredTier] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [highlightedTier, setHighlightedTier] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const playersPerPage = 10;
  const totalPages = Math.ceil(leaderboardWithRank.length / playersPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? prev : prev + 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? prev : prev - 1));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTierClick = (tierIndex) => {
    setHighlightedTier(tierIndex);
    goToSlide(6 - tierIndex); // Convert tier index to slide index
  };

  const slides = [
    {
      title: "Starting Your Journey",
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-[#E0E0E0]/80 text-lg">
            Welcome to our ranking system! New players start at level zero,
            while experienced players receive a rank based on their in-game
            level.
          </p>
          <div className="mt-6">
            <Pyramid />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-center text-[#EE8631] text-lg mt-4"
          >
            Climb through each tier to reach the legendary status!
          </motion.p>
        </motion.div>
      ),
    },
    {
      title: "Experience Multiplier System",
      content: (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[#E0E0E0]/80 text-lg mb-4">
                Experienced players receive a time-based multiplier that affects
                XP gains and losses:
              </p>
              <motion.div
                className="space-y-4 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="bg-[#292B35]/80 p-5 rounded-lg border border-[#95C5C5]/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="text-[#EE8631] font-semibold mb-2">Winning</h3>
                  <p className="text-[#E0E0E0]/90">
                    +(1/10 × multiplier) XP gain
                  </p>
                </motion.div>
                <motion.div
                  className="bg-[#292B35]/80 p-5 rounded-lg border border-[#95C5C5]/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h3 className="text-[#EE8631] font-semibold mb-2">Losing</h3>
                  <p className="text-[#E0E0E0]/90">-10x normal XP loss</p>
                </motion.div>
              </motion.div>
            </div>
            <div className="flex items-center justify-center">
              <Pyramid
                highlightTier={highlightedTier === null ? 6 : highlightedTier}
                onTierClick={handleTierClick}
              />
            </div>
          </div>
          <motion.div
            className="mt-8 p-4 bg-[#1A1B21]/80 rounded-lg border border-[#EE8631]/30"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-center text-[#E0E0E0]/90">
              <span className="text-[#EE8631] font-semibold">Tip:</span> As you
              rise through the ranks, your multiplier increases, making each
              victory more rewarding but each defeat more costly.
            </p>
          </motion.div>
        </motion.div>
      ),
    },
    {
      title: "Standard Progression",
      content: (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-[#E0E0E0]/80 text-lg mb-6">
                For new players or those with a 1x multiplier, progression is
                based on:
              </p>
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[
                  {
                    title: "Match Performance",
                    icon: "🎯",
                    details: "Better scores = more XP",
                  },
                  {
                    title: "Opponent's Rank",
                    icon: "⚔️",
                    details: "Defeating higher ranks = bonus XP",
                  },
                  {
                    title: "Tournament Participation",
                    icon: "🏆",
                    details: "Tournament wins multiply XP",
                  },
                  {
                    title: "Community Engagement",
                    icon: "🤝",
                    details: "Weekly challenges provide XP boosts",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#292B35]/70 p-4 rounded-lg border border-[#95C5C5]/20 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * (index + 1), duration: 0.4 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(238, 134, 49, 0.3)",
                    }}
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="text-[#EE8631] font-medium text-sm">
                      {item.title}
                    </h3>
                    <p className="text-[#E0E0E0]/70 text-xs mt-1">
                      {item.details}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="flex items-center justify-center">
              <Pyramid
                highlightTier={highlightedTier === null ? 5 : highlightedTier}
                onTierClick={handleTierClick}
              />
            </div>
          </div>
          <motion.div
            className="mt-6 p-4 bg-[#1A1B21]/80 rounded-lg border border-[#EE8631]/30"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-center text-[#E0E0E0]/90">
              <span className="text-[#EE8631] font-semibold">Remember:</span>{" "}
              Consistency is key. Regular participation will help you climb the
              ranks faster!
            </p>
          </motion.div>
        </motion.div>
      ),
    },
    {
      title: "The Path to Legend",
      content: (
        <motion.div
          className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="scale-90 min-w-[220px] flex-shrink-0 mb-4 md:mb-0">
            <Pyramid />
          </div>
          <div className="w-full max-w-xs min-w-[220px]">
            <h3 className="text-[#EE8631] text-center text-base font-bold mb-1 tracking-wide">
              Rank XP Requirements
            </h3>
            <div className="border-b border-[#95C5C5]/30 mb-2"></div>
            <div className="grid grid-cols-3 gap-2 bg-[#23242B]/80 rounded-xl shadow-lg p-2">
              {[
                { name: "Iron", color: "#4A4A4A", xp: "0" },
                { name: "Bronze", color: "#AD662F", xp: "500" },
                { name: "Silver", color: "#8B8B8B", xp: "1,500" },
                { name: "Gold", color: "#8B4513", xp: "3,000" },
                { name: "Platinum", color: "#4F666A", xp: "5,000" },
                { name: "Professional", color: "#800080", xp: "7,500" },
                { name: "Legend", color: "#FF8C00", xp: "10,000" },
              ].map((rank, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-1 p-2 rounded-lg border border-[#95C5C5]/10 bg-[#292B35]/70 transition-shadow hover:shadow-md hover:border-[#EE8631]/40"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ scale: 1.06 }}
                >
                  <div
                    className="w-3 h-3 rounded-full mb-1 border border-white/20"
                    style={{ backgroundColor: rank.color }}
                  />
                  <p
                    className="font-semibold text-xs leading-none text-center"
                    style={{ color: rank.color }}
                  >
                    {rank.name}
                  </p>
                  <p className="text-[#E0E0E0]/80 text-[11px] leading-none text-center">
                    {rank.xp} XP
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-[#EE8631] text-base font-semibold mt-2 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Your journey to becoming a Legend starts now!
            </motion.p>
          </div>
        </motion.div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = prev === slides.length - 1 ? prev : prev + 1;
      // Update highlighted tier based on slide
      if (newSlide === 0) setHighlightedTier(null);
      else if (newSlide === 1) setHighlightedTier(6);
      else if (newSlide === 2) setHighlightedTier(5);
      else if (newSlide === 3) setHighlightedTier(0);
      return newSlide;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = prev === 0 ? prev : prev - 1;
      // Update highlighted tier based on slide
      if (newSlide === 0) setHighlightedTier(null);
      else if (newSlide === 1) setHighlightedTier(6);
      else if (newSlide === 2) setHighlightedTier(5);
      else if (newSlide === 3) setHighlightedTier(0);
      return newSlide;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Update highlighted tier based on slide
    if (index === 0) setHighlightedTier(null);
    else if (index === 1) setHighlightedTier(6);
    else if (index === 2) setHighlightedTier(5);
    else if (index === 3) setHighlightedTier(0);
  };

  const toggleRankingInfo = () => {
    setShowRankingInfo(!showRankingInfo);
    setCurrentSlide(0);
    setHighlightedTier(null);
  };

  const currentTier = tiers.find((tier) => tier.tier === userTier);
  const nextTier = tiers.find((tier) => tier.tier === userTier - 1);
  const expToNextTier = nextTier ? nextTier.expRequired - userExp : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#292B35] to-[#1A1B21] py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto relative"
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

        {/* Roadmap-style Tier Display */}
        <div className="relative">
          <div className="flex justify-between items-center">
            {tiers.map((tier, index) => {
              const isCurrentTier = tier.tier === userTier;
              const isHigherTier = tier.tier < userTier;
              const isLowerTier = tier.tier > userTier;
              const expNeeded = tier.expRequired - userExp;

              return (
                <div
                  key={index}
                  className="text-center"
                  onMouseEnter={() => setHoveredTier(tier)}
                  onMouseLeave={() => setHoveredTier(null)}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center z-10 cursor-pointer relative
                                            ${
                                              isCurrentTier
                                                ? "border-2 border-[#EE8631]"
                                                : "border border-[#95C5C5]/20"
                                            }
                                        `}
                    style={{
                      backgroundColor: tier.color,
                      opacity: isLowerTier ? 0.3 : 1,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-white text-sm font-medium">
                      {tier.tier}
                    </span>
                    {hoveredTier === tier && (
                      <motion.div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-[#1A1B21]/95 text-[#E0E0E0] p-4 rounded-md shadow-xl border border-[#95C5C5]/30 backdrop-blur-sm z-20"
                        style={{ width: "220px" }}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                      >
                        <h3
                          className="font-semibold text-lg mb-2"
                          style={{ color: tier.color }}
                        >
                          {tier.name}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p className="flex justify-between">
                            <span className="text-[#E0E0E0]/70">
                              Total Exp Required:
                            </span>
                            <span className="font-medium">
                              {tier.expRequired}
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-[#E0E0E0]/70">
                              Exp To Reach:
                            </span>
                            <span className="font-medium">
                              {expNeeded > 0 ? expNeeded : 0}
                            </span>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  <p className="text-sm text-[#E0E0E0]/70 mt-2">{tier.name}</p>
                </div>
              );
            })}
          </div>
          {/* Highlighted Line */}
          <div className="absolute top-6 left-0 w-full h-[4px] bg-[#95C5C5]/20 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${
                  ((tiers.length - 1 - userTier) / (tiers.length - 1)) * 100
                }%`,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-[4px] bg-[#EE8631] rounded-full"
            />
          </div>
        </div>

        {/* "How do we rank you?" Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(238, 134, 49, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#EE8631] to-[#AD662F] text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition duration-300 border border-[#EE8631]/20"
            onClick={toggleRankingInfo}
          >
            How do we rank you?
          </motion.button>
        </div>

        {/* Ranking System Explanation Popup */}
        {showRankingInfo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={toggleRankingInfo}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#292B35] to-[#1A1B21] p-8 rounded-2xl shadow-2xl border border-[#95C5C5]/30 w-[90vw] max-w-4xl z-50 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#EE8631] rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#95C5C5] rounded-full filter blur-3xl"></div>
              </div>

              <div className="relative z-10">
                {/* Navigation Arrows */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between"
                  style={{
                    left: "-2rem",
                    right: "-2rem",
                    width: "calc(100% + 4rem)",
                  }}
                >
                  <motion.button
                    onClick={prevSlide}
                    className={`p-3 rounded-full bg-[#1A1B21]/80 border border-[#95C5C5]/30 hover:bg-[#EE8631]/20 transition-colors z-50 backdrop-blur-sm
                                            ${
                                              currentSlide === 0
                                                ? "opacity-50 cursor-not-allowed"
                                                : "cursor-pointer"
                                            }`}
                    disabled={currentSlide === 0}
                    whileHover={
                      currentSlide !== 0
                        ? {
                            scale: 1.1,
                            boxShadow: "0 0 15px rgba(238, 134, 49, 0.3)",
                          }
                        : {}
                    }
                    whileTap={currentSlide !== 0 ? { scale: 0.9 } : {}}
                  >
                    <svg
                      className="w-8 h-8 text-[#EE8631]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={nextSlide}
                    className={`p-3 rounded-full bg-[#1A1B21]/80 border border-[#95C5C5]/30 hover:bg-[#EE8631]/20 transition-colors z-50 backdrop-blur-sm
                                            ${
                                              currentSlide === slides.length - 1
                                                ? "opacity-50 cursor-not-allowed"
                                                : "cursor-pointer"
                                            }`}
                    disabled={currentSlide === slides.length - 1}
                    whileHover={
                      currentSlide !== slides.length - 1
                        ? {
                            scale: 1.1,
                            boxShadow: "0 0 15px rgba(238, 134, 49, 0.3)",
                          }
                        : {}
                    }
                    whileTap={
                      currentSlide !== slides.length - 1 ? { scale: 0.9 } : {}
                    }
                  >
                    <svg
                      className="w-8 h-8 text-[#EE8631]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Title with styled underline */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-[#E0E0E0] relative inline-block">
                    {slides[currentSlide].title}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#EE8631] to-transparent"
                    />
                  </h2>
                </div>

                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[480px] overflow-y-auto px-4 no-scrollbar"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {slides[currentSlide].content}
                </motion.div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-6">
                  {slides.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "bg-[#EE8631] w-8"
                          : "bg-[#95C5C5]/30 w-2"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                {/* Close Button */}
                <div className="text-center mt-6">
                  <motion.button
                    className="bg-gradient-to-r from-[#EE8631] to-[#AD662F] text-white font-semibold py-3 px-8 rounded-xl shadow-lg border border-[#EE8631]/20"
                    onClick={() => {
                      setShowRankingInfo(false);
                      setCurrentSlide(0);
                      setHighlightedTier(null);
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(238, 134, 49, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Leaderboard Section */}
        <div className="max-w-4xl mx-auto mt-20 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <h2 className="text-4xl font-bold text-center text-[#EE8631] mb-8">
              <span className="relative">
                Top 100 Leaderboard
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#EE8631] to-transparent"
                />
              </span>
            </h2>

            <div className="relative">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-xl shadow-2xl border border-[#95C5C5]/20"
              >
                <div className="bg-gradient-to-br from-[#23242B]/95 to-[#1A1B21]/95 backdrop-blur-sm">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-[#95C5C5]/20">
                        <th className="py-4 px-6 text-left text-sm font-semibold text-[#EE8631]">
                          Rank
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-[#EE8631]">
                          Gamertag
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-[#EE8631]">
                          Tier
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-[#EE8631]">
                          XP
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardWithRank
                        .slice(
                          currentPage * playersPerPage,
                          (currentPage + 1) * playersPerPage
                        )
                        .map((player, idx) => (
                          <motion.tr
                            key={player.username}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`
                                            ${
                                              idx % 2 === 0
                                                ? "bg-[#292B35]/40"
                                                : "bg-transparent"
                                            }
                                            hover:bg-[#EE8631]/10 transition-colors duration-200
                                        `}
                          >
                            <td className="py-4 px-6">
                              <span className="font-bold text-[#E0E0E0]">
                                #{currentPage * playersPerPage + idx + 1}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="font-medium text-[#E0E0E0]">
                                {player.username}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span
                                className="font-bold px-3 py-1 rounded-full text-sm"
                                style={{
                                  color: tiers.find(
                                    (t) => t.name === player.rank
                                  )?.color,
                                  backgroundColor: `${
                                    tiers.find((t) => t.name === player.rank)
                                      ?.color
                                  }20`,
                                }}
                              >
                                {player.rank}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-[#E0E0E0]/90">
                                {parseInt(player.xp).toLocaleString()} XP
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6">
                <motion.button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-lg bg-[#1A1B21]/80 border border-[#95C5C5]/30 
                        ${
                          currentPage === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-[#EE8631]/20"
                        }`}
                  whileHover={currentPage !== 0 ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== 0 ? { scale: 0.95 } : {}}
                >
                  <svg
                    className="w-6 h-6 text-[#EE8631]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => goToPage(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 
                                ${
                                  currentPage === idx
                                    ? "w-6 bg-[#EE8631]"
                                    : "bg-[#95C5C5]/30"
                                }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`p-2 rounded-lg bg-[#1A1B21]/80 border border-[#95C5C5]/30 
                        ${
                          currentPage === totalPages - 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-[#EE8631]/20"
                        }`}
                  whileHover={
                    currentPage !== totalPages - 1 ? { scale: 1.05 } : {}
                  }
                  whileTap={
                    currentPage !== totalPages - 1 ? { scale: 0.95 } : {}
                  }
                >
                  <svg
                    className="w-6 h-6 text-[#EE8631]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Page Indicator */}
              <motion.p
                className="text-center mt-4 text-[#E0E0E0]/70 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Page {currentPage + 1} of {totalPages}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RankHierarchy;
