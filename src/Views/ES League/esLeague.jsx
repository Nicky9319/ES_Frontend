import React, { useState } from "react";
import { FaTrophy, FaGamepad, FaChartLine, FaUsers, FaCalendarAlt } from "react-icons/fa";

const leagues = [
  {
    name: "Valorant Champions League",
    game: "Valorant",
    season: "Spring 2025",
    matchesPlayed: 10,
    wins: 8,
    losses: 2,
    points: 24,
  },
  {
    name: "Valorant Pro Series",
    game: "Valorant",
    season: "Spring 2025",
    matchesPlayed: 8,
    wins: 5,
    losses: 3,
    points: 15,
  },
  {
    name: "CS:GO Premier League",
    game: "CS:GO",
    season: "Spring 2025",
    matchesPlayed: 9,
    wins: 6,
    losses: 3,
    points: 18,
  },
  {
    name: "Overwatch Arena",
    game: "Overwatch",
    season: "Spring 2025",
    matchesPlayed: 8,
    wins: 4,
    losses: 4,
    points: 12,
  },
];

const matchSchedule = [
  {
    game: "Valorant",
    teams: "Team Alpha vs Team Omega",
    date: "April 20, 2025",
    time: "6:00 PM IST",
  },
  {
    game: "CS:GO",
    teams: "Phantom Squad vs Night Raiders",
    date: "April 22, 2025",
    time: "8:00 PM IST",
  },
];

const playerRankings = [
  {
    name: "HexKnight",
    game: "Valorant",
    currentMMR: 1850,
    peakMMR: 1920,
    matchesPlayed: 32,
    averageACS: 245,
    mvpCount: 8,
    wins: 18,
    losses: 14,
    recentMMRChanges: [+24, -12, +28, +15, -8],
    rank: "Diamond 2",
  },
  {
    name: "VoidRunner",
    game: "Valorant",
    currentMMR: 1780,
    peakMMR: 1830,
    matchesPlayed: 28,
    averageACS: 232,
    mvpCount: 6,
    wins: 16,
    losses: 12,
    recentMMRChanges: [+18, +22, -15, +20, -10],
    rank: "Diamond 1",
  },
  {
    name: "PhantomAce",
    game: "Valorant",
    currentMMR: 1920,
    peakMMR: 2100,
    matchesPlayed: 45,
    averageACS: 268,
    mvpCount: 14,
    wins: 28,
    losses: 17,
    recentMMRChanges: [+18, +22, +30, -8, +15],
    rank: "Diamond 3",
  },
  {
    name: "ShadowStrike",
    game: "Valorant",
    currentMMR: 1810,
    peakMMR: 1950,
    matchesPlayed: 40,
    averageACS: 238,
    mvpCount: 9,
    wins: 22,
    losses: 18,
    recentMMRChanges: [+15, -10, +20, +12, -8],
    rank: "Diamond 2",
  },
  {
    name: "BlitzKrieg",
    game: "Valorant",
    currentMMR: 1795,
    peakMMR: 1880,
    matchesPlayed: 35,
    averageACS: 228,
    mvpCount: 7,
    wins: 19,
    losses: 16,
    recentMMRChanges: [+12, +18, -15, +20, -5],
    rank: "Diamond 1",
  },
  {
    name: "AstralAce",
    game: "Valorant",
    currentMMR: 1760,
    peakMMR: 1840,
    matchesPlayed: 30,
    averageACS: 225,
    mvpCount: 5,
    wins: 16,
    losses: 14,
    recentMMRChanges: [+10, -8, +15, +20, -12],
    rank: "Diamond 1",
  },
  {
    name: "NightOwl",
    game: "Valorant",
    currentMMR: 1740,
    peakMMR: 1820,
    matchesPlayed: 28,
    averageACS: 220,
    mvpCount: 4,
    wins: 15,
    losses: 13,
    recentMMRChanges: [+15, +10, -12, +18, -8],
    rank: "Diamond 1",
  },
  {
    name: "StormRider",
    game: "Valorant",
    currentMMR: 1720,
    peakMMR: 1800,
    matchesPlayed: 25,
    averageACS: 215,
    mvpCount: 3,
    wins: 14,
    losses: 11,
    recentMMRChanges: [+12, -10, +15, +8, -5],
    rank: "Diamond 1",
  },
  {
    name: "ThunderBolt",
    game: "Valorant",
    currentMMR: 1700,
    peakMMR: 1780,
    matchesPlayed: 22,
    averageACS: 210,
    mvpCount: 2,
    wins: 12,
    losses: 10,
    recentMMRChanges: [+10, +15, -8, +12, -6],
    rank: "Diamond 1",
  },
  {
    name: "Phoenix",
    game: "Valorant",
    currentMMR: 1680,
    peakMMR: 1760,
    matchesPlayed: 20,
    averageACS: 205,
    mvpCount: 1,
    wins: 11,
    losses: 9,
    recentMMRChanges: [+8, -5, +12, +15, -10],
    rank: "Platinum 3",
  },
];

const teamRankings = [
  {
    name: "Team Phantom",
    game: "Valorant",
    tournament: "Valorant Champions League",
    rank: 1,
    points: 2800,
    matchesPlayed: 45,
    wins: 32,
    losses: 13,
    winRate: "71%",
    recentForm: ["W", "W", "L", "W", "W"],
  },
  {
    name: "Velocity Gaming",
    game: "Valorant",
    tournament: "Valorant Pro Series",
    rank: 2,
    points: 2650,
    matchesPlayed: 42,
    wins: 28,
    losses: 14,
    winRate: "67%",
    recentForm: ["W", "L", "W", "W", "L"],
  },
  {
    name: "Team Liquid",
    game: "Valorant",
    tournament: "Valorant Champions League",
    rank: 3,
    points: 2600,
    matchesPlayed: 44,
    wins: 29,
    losses: 15,
    winRate: "66%",
    recentForm: ["W", "W", "W", "L", "W"],
  },
  {
    name: "BOOM Esports",
    game: "Valorant",
    tournament: "Valorant Champions League",
    rank: 4,
    points: 2550,
    matchesPlayed: 40,
    wins: 26,
    losses: 14,
    winRate: "65%",
    recentForm: ["W", "L", "W", "W", "L"],
  },
  {
    name: "Paper Rex",
    game: "Valorant",
    tournament: "Valorant Pro Series",
    rank: 5,
    points: 2500,
    matchesPlayed: 38,
    wins: 24,
    losses: 14,
    winRate: "63%",
    recentForm: ["W", "W", "L", "W", "L"],
  },
  {
    name: "DRX",
    game: "Valorant",
    tournament: "Valorant Champions League",
    rank: 6,
    points: 2450,
    matchesPlayed: 36,
    wins: 22,
    losses: 14,
    winRate: "61%",
    recentForm: ["L", "W", "W", "L", "W"],
  },
  {
    name: "LOUD",
    game: "Valorant",
    tournament: "Valorant Pro Series",
    rank: 7,
    points: 2400,
    matchesPlayed: 34,
    wins: 20,
    losses: 14,
    winRate: "59%",
    recentForm: ["W", "L", "L", "W", "W"],
  },
  {
    name: "NRG",
    game: "Valorant",
    tournament: "Valorant Champions League",
    rank: 8,
    points: 2350,
    matchesPlayed: 32,
    wins: 18,
    losses: 14,
    winRate: "56%",
    recentForm: ["L", "W", "L", "W", "L"],
  },
  {
    name: "Evil Geniuses",
    game: "Valorant",
    tournament: "Valorant Pro Series",
    rank: 9,
    points: 2300,
    matchesPlayed: 30,
    wins: 16,
    losses: 14,
    winRate: "53%",
    recentForm: ["W", "L", "W", "L", "L"],
  },
  {
    name: "100 Thieves",
    game: "Valorant",
    tournament: "Valorant Champions League",
    rank: 10,
    points: 2250,
    matchesPlayed: 28,
    wins: 14,
    losses: 14,
    winRate: "50%",
    recentForm: ["L", "L", "W", "W", "L"],
  },
];

const userTeams = [
  {
    name: "Nova Esports",
    game: "Valorant",
    role: "Team Captain",
    joinedDate: "2024-01-15",
    tournaments: [
      {
        name: "Valorant Champions League",
        rank: 4,
        points: 2200,
      },
      {
        name: "Valorant Pro Series",
        rank: 2,
        points: 1800,
      },
    ],
  },
];

const LeagueSystem = () => {
  const [selectedGame, setSelectedGame] = useState("All");
  const [rankingType, setRankingType] = useState("individual");

  const allGames = ["All", ...new Set(leagues.map((l) => l.game))];

  const filteredLeagues = leagues.filter(
    (league) => selectedGame === "All" || league.game === selectedGame
  );

  const filteredMatches = matchSchedule.filter(
    (match) => selectedGame === "All" || match.game === selectedGame
  );

  const filteredPlayers = playerRankings
    .filter((player) => player.game === selectedGame)
    .sort((a, b) => b.currentMMR - a.currentMMR);

  const filteredTeams = teamRankings
    .filter((team) => selectedGame === "All" || team.game === selectedGame)
    .sort((a, b) => b.points - a.points);

  const filteredUserTeams = userTeams.filter(
    (team) => selectedGame === "All" || team.game === selectedGame
  );

  const stats = [
    {
      title: "Active Players",
      value: "10,000+",
      icon: <FaUsers className="text-[#EE8631]" size={24} />,
      change: "+12%",
    },
    {
      title: "Total Tournaments",
      value: "250+",
      icon: <FaTrophy className="text-[#EE8631]" size={24} />,
      change: "+8%",
    },
    {
      title: "Prize Pool",
      value: "$500K",
      icon: <FaChartLine className="text-[#EE8631]" size={24} />,
      change: "+15%",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1b20]">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#292B35]/90 to-[#1a1b20]/90" />
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
          alt="Esports Banner"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b20] to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#95C5C5] to-[#EE8631]">
              Esports League Hub
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#E0E0E0]/80 max-w-2xl">
            Track rankings, tournaments, and compete at the highest level
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#292B35]/50 backdrop-blur-sm p-6 rounded-xl border border-[#95C5C5]/10 hover:border-[#EE8631]/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#EE8631]/10 rounded-lg">{stat.icon}</div>
                <span className="text-[#95C5C5] text-sm">{stat.change}</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-[#95C5C5]">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Game Selection */}
        <div className="bg-[#292B35]/30 p-8 rounded-2xl mb-12 backdrop-blur-sm border border-[#95C5C5]/10">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
            <div className="flex gap-4 flex-wrap justify-center">
              {["individual", "team"].map((type) => (
                <button
                  key={type}
                  onClick={() => setRankingType(type)}
                  className={`px-8 py-3 rounded-lg text-lg transform transition-all duration-300 ${
                    rankingType === type
                      ? "bg-gradient-to-r from-[#EE8631] to-[#AD662F] text-white scale-105 shadow-lg"
                      : "bg-[#292B35] text-[#95C5C5] border border-[#95C5C5] hover:bg-[#AD662F]/20"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Rankings
                </button>
              ))}
            </div>
            
            <div className="flex gap-2 flex-wrap justify-center">
              {allGames.map((game) => (
                <button
                  key={game}
                  onClick={() => setSelectedGame(game)}
                  className={`px-4 py-2 rounded-lg text-sm transform transition-all duration-300 ${
                    selectedGame === game
                      ? "bg-[#EE8631] text-white"
                      : "bg-[#292B35] text-[#95C5C5] hover:bg-[#AD662F]/20"
                  }`}
                >
                  {game}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections - keep existing table code but update styling */}
        <div className="space-y-8">
          {rankingType === "individual" ? (
            <>
              <div className="mb-12 rounded-xl bg-[#292B35]/50 backdrop-blur-sm p-6 shadow-xl border border-[#95C5C5]/20">
                <h2 className="text-2xl font-semibold text-[#95C5C5] mb-4">
                  {selectedGame === "All" ? "Current Standings" : `${selectedGame} League Standings`}
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#292B35] to-[#1a1c22] text-[#95C5C5] text-left">
                        <th className="py-3 px-4">League</th>
                        <th className="py-3 px-4">Season</th>
                        <th className="py-3 px-4">Played</th>
                        <th className="py-3 px-4">Wins</th>
                        <th className="py-3 px-4">Losses</th>
                        <th className="py-3 px-4">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#95C5C5]/10">
                      {filteredLeagues.map((league, index) => (
                        <tr key={index} className="hover:bg-[#AD662F]/20 transition duration-200">
                          <td className="py-3 px-4">{league.name}</td>
                          <td className="py-3 px-4">{league.season}</td>
                          <td className="py-3 px-4">{league.matchesPlayed}</td>
                          <td className="py-3 px-4">{league.wins}</td>
                          <td className="py-3 px-4">{league.losses}</td>
                          <td className="py-3 px-4 font-semibold text-[#EE8631]">{league.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {selectedGame !== "All" && (
                <div className="mb-12 rounded-xl bg-[#292B35]/50 backdrop-blur-sm p-6 shadow-xl border border-[#95C5C5]/20">
                  <h2 className="text-2xl font-semibold text-[#95C5C5] mb-4">
                    {selectedGame} MMR Leaderboard
                  </h2>
                  {filteredPlayers.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-[#292B35] to-[#1a1c22] text-[#95C5C5] text-left">
                            <th className="py-3 px-4">Rank</th>
                            <th className="py-3 px-4">Player</th>
                            <th className="py-3 px-4">Current MMR</th>
                            <th className="py-3 px-4">Peak MMR</th>
                            <th className="py-3 px-4">Avg ACS</th>
                            <th className="py-3 px-4">MVP Count</th>
                            <th className="py-3 px-4">W/L</th>
                            <th className="py-3 px-4">Last 5 Matches (MMR)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#95C5C5]/10">
                          {filteredPlayers.map((player, index) => (
                            <tr key={player.name} className="hover:bg-[#AD662F]/20 transition duration-200">
                              <td className="py-3 px-4 text-[#EE8631] font-bold">#{index + 1}</td>
                              <td className="py-3 px-4">
                                <div>
                                  <div className="font-semibold">{player.name}</div>
                                  <div className="text-sm text-[#95C5C5]">{player.rank}</div>
                                </div>
                              </td>
                              <td className="py-3 px-4 font-semibold">{player.currentMMR}</td>
                              <td className="py-3 px-4 text-[#95C5C5]">{player.peakMMR}</td>
                              <td className="py-3 px-4">{player.averageACS}</td>
                              <td className="py-3 px-4">{player.mvpCount}</td>
                              <td className="py-3 px-4">{player.wins}/{player.losses}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-1 items-center">
                                  {player.recentMMRChanges.map((change, i) => (
                                    <span
                                      key={i}
                                      className={`px-2 py-1 rounded ${
                                        change > 0
                                          ? "bg-green-400/10 text-green-400"
                                          : "bg-red-400/10 text-red-400"
                                      }`}
                                    >
                                      {change > 0 ? "+" : ""}
                                      {change}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-[#E0E0E0]">No MMR data available for {selectedGame} yet.</p>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-12 rounded-xl bg-[#292B35]/50 backdrop-blur-sm p-6 shadow-xl border border-[#95C5C5]/20">
                <h2 className="text-2xl font-semibold text-[#95C5C5] mb-4">Your Teams</h2>
                {filteredUserTeams.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredUserTeams.map((team) => (
                      <div
                        key={team.name}
                        className="bg-[#292B35] p-5 rounded-xl border border-[#95C5C5]"
                      >
                        <h3 className="text-xl font-semibold text-[#EE8631] mb-2">{team.name}</h3>
                        <p className="text-[#E0E0E0] mb-1">Role: {team.role}</p>
                        <p className="text-[#E0E0E0] mb-3">Joined: {team.joinedDate}</p>
                        <div className="space-y-2">
                          <p className="text-[#95C5C5] font-semibold">Tournament Rankings:</p>
                          {team.tournaments.map((tournament) => (
                            <div
                              key={tournament.name}
                              className="flex justify-between items-center"
                            >
                              <span className="text-[#E0E0E0]">{tournament.name}</span>
                              <span className="text-[#EE8631]">
                                #{tournament.rank} ({tournament.points} pts)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#E0E0E0]">You haven't joined any teams for {selectedGame} yet.</p>
                )}
              </div>

              {selectedGame !== "All" && (
                <div className="mb-12 rounded-xl bg-[#292B35]/50 backdrop-blur-sm p-6 shadow-xl border border-[#95C5C5]/20">
                  <h2 className="text-2xl font-semibold text-[#95C5C5] mb-4">
                    {selectedGame} Tournament Rankings
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-[#292B35] to-[#1a1c22] text-[#95C5C5] text-left">
                          <th className="py-3 px-4">Rank</th>
                          <th className="py-3 px-4">Team</th>
                          <th className="py-3 px-4">Tournament</th>
                          <th className="py-3 px-4">Points</th>
                          <th className="py-3 px-4">Played</th>
                          <th className="py-3 px-4">W/L</th>
                          <th className="py-3 px-4">Win Rate</th>
                          <th className="py-3 px-4">Form</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#95C5C5]/10">
                        {filteredTeams.map((team) => (
                          <tr
                            key={team.name}
                            className="hover:bg-[#AD662F]/20 transition duration-200"
                          >
                            <td className="py-3 px-4 text-[#EE8631] font-bold">#{team.rank}</td>
                            <td className="py-3 px-4 font-semibold">{team.name}</td>
                            <td className="py-3 px-4">{team.tournament}</td>
                            <td className="py-3 px-4 font-semibold">{team.points}</td>
                            <td className="py-3 px-4">{team.matchesPlayed}</td>
                            <td className="py-3 px-4">{team.wins}/{team.losses}</td>
                            <td className="py-3 px-4">{team.winRate}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-1">
                                {team.recentForm.map((result, i) => (
                                  <span
                                    key={i}
                                    className={`w-6 h-6 flex items-center justify-center rounded ${
                                      result === "W"
                                        ? "bg-green-400/20 text-green-400"
                                        : "bg-red-400/10 text-red-400"
                                    }`}
                                  >
                                    {result}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <h2 className="text-2xl font-semibold text-[#95C5C5] mb-4">
              {selectedGame === "All" ? "All Upcoming Matches" : `${selectedGame} Upcoming Matches`}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredMatches.map((match, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#292B35] to-[#1a1c22] p-6 rounded-xl shadow-xl border border-[#95C5C5]/20 hover:shadow-2xl hover:border-[#EE8631]/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2 text-[#EE8631]">{match.teams}</h3>
                  <p className="text-[#E0E0E0]">Game: {match.game}</p>
                  <p className="text-[#E0E0E0]">Date: {match.date}</p>
                  <p className="text-[#E0E0E0]">Time: {match.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueSystem;
