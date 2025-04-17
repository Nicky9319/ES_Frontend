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
    <div className="min-h-screen bg-gradient-to-br from-[#181a20] via-[#23242a] to-[#292B35] text-[#E0E0E0]">
      {/* Hero Section */}
      <div className="relative h-[44vh] flex items-center justify-center overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
          alt="Esports Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#23242b]/90" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight">
            <span className="inline-block bg-[#292B35]/80 px-6 py-2 rounded-xl shadow-lg">
              Esports League Hub
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#95C5C5]/90 mb-4 font-medium max-w-2xl mx-auto">
            Track rankings, tournaments, and compete at the highest level.
          </p>
          <div className="flex gap-2 flex-row justify-center">
            <button
              className="mt-2 px-8 py-3 bg-[#EE8631] text-white font-bold rounded-lg shadow-lg hover:bg-[#AD662F] transition-all duration-300 text-lg"
              onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
            >
              View Rankings
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#292B35]/60 backdrop-blur-md rounded-2xl border border-[#95C5C5]/10 hover:border-[#EE8631]/40 shadow-xl p-6 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#EE8631]/10 to-[#95C5C5]/10">{stat.icon}</div>
                <span className="text-[#95C5C5] text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-1">{stat.value}</h3>
              <p className="text-[#95C5C5] font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Game & Ranking Type Selection */}
        <div className="bg-[#23242b]/80 rounded-2xl border border-[#95C5C5]/10 p-8 mb-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex gap-4 flex-wrap justify-center">
            {["individual", "team"].map((type) => (
              <button
                key={type}
                onClick={() => setRankingType(type)}
                className={`px-8 py-3 rounded-lg text-lg font-bold transition-all duration-300 ${
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
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  selectedGame === game
                    ? "bg-[#EE8631] text-white shadow"
                    : "bg-[#292B35] text-[#95C5C5] hover:bg-[#AD662F]/20"
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {rankingType === "individual" ? (
            <>
              {/* League Standings Table */}
              <div className="rounded-2xl bg-[#23242b]/80 border border-[#95C5C5]/20 shadow-xl p-8">
                <h2 className="text-2xl font-bold text-[#95C5C5] mb-6 flex items-center gap-2">
                  <FaTrophy className="text-[#EE8631]" />{" "}
                  {selectedGame === "All" ? "Current Standings" : `${selectedGame} League Standings`}
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#292B35] to-[#1a1c22] text-[#95C5C5]">
                        <th className="py-3 px-4 font-semibold">League</th>
                        <th className="py-3 px-4 font-semibold">Season</th>
                        <th className="py-3 px-4 font-semibold">Played</th>
                        <th className="py-3 px-4 font-semibold">Wins</th>
                        <th className="py-3 px-4 font-semibold">Losses</th>
                        <th className="py-3 px-4 font-semibold">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#95C5C5]/10">
                      {filteredLeagues.length > 0 ? (
                        filteredLeagues.map((league, index) => (
                          <tr key={index} className="hover:bg-[#AD662F]/10 transition duration-200">
                            <td className="py-3 px-4">{league.name}</td>
                            <td className="py-3 px-4">{league.season}</td>
                            <td className="py-3 px-4">{league.matchesPlayed}</td>
                            <td className="py-3 px-4">{league.wins}</td>
                            <td className="py-3 px-4">{league.losses}</td>
                            <td className="py-3 px-4 font-bold text-[#EE8631]">{league.points}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-[#95C5C5]/70">
                            No leagues found for this game.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MMR Leaderboard */}
              {selectedGame !== "All" && (
                <div className="rounded-2xl bg-[#23242b]/80 border border-[#95C5C5]/20 shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-[#95C5C5] mb-6 flex items-center gap-2">
                    <FaChartLine className="text-[#EE8631]" /> {selectedGame} MMR Leaderboard
                  </h2>
                  {filteredPlayers.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead>
                          <tr className="bg-gradient-to-r from-[#292B35] to-[#1a1c22] text-[#95C5C5]">
                            <th className="py-3 px-4 font-semibold">Rank</th>
                            <th className="py-3 px-4 font-semibold">Player</th>
                            <th className="py-3 px-4 font-semibold">Current MMR</th>
                            <th className="py-3 px-4 font-semibold">Peak MMR</th>
                            <th className="py-3 px-4 font-semibold">Avg ACS</th>
                            <th className="py-3 px-4 font-semibold">MVPs</th>
                            <th className="py-3 px-4 font-semibold">W/L</th>
                            <th className="py-3 px-4 font-semibold">Last 5 (MMR)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#95C5C5]/10">
                          {filteredPlayers.map((player, index) => (
                            <tr key={player.name} className="hover:bg-[#AD662F]/10 transition duration-200">
                              <td className="py-3 px-4 text-[#EE8631] font-bold">#{index + 1}</td>
                              <td className="py-3 px-4">
                                <div>
                                  <div className="font-semibold">{player.name}</div>
                                  <div className="text-xs text-[#95C5C5]">{player.rank}</div>
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
                                      className={`px-2 py-1 rounded font-mono text-xs ${
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
                    <div className="text-center py-8 text-[#95C5C5]/70">No MMR data available for {selectedGame} yet.</div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {/* User Teams */}
              <div className="rounded-2xl bg-[#23242b]/80 border border-[#95C5C5]/20 shadow-xl p-8">
                <h2 className="text-2xl font-bold text-[#95C5C5] mb-6 flex items-center gap-2">
                  <FaUsers className="text-[#EE8631]" /> Your Teams
                </h2>
                {filteredUserTeams.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredUserTeams.map((team) => (
                      <div
                        key={team.name}
                        className="bg-[#292B35] p-6 rounded-xl border border-[#95C5C5]/20 shadow hover:shadow-xl transition-all"
                      >
                        <h3 className="text-xl font-bold text-[#EE8631] mb-2">{team.name}</h3>
                        <p className="text-[#E0E0E0] mb-1">Role: <span className="font-semibold">{team.role}</span></p>
                        <p className="text-[#E0E0E0] mb-3">Joined: <span className="font-semibold">{team.joinedDate}</span></p>
                        <div className="space-y-2">
                          <p className="text-[#95C5C5] font-semibold">Tournament Rankings:</p>
                          {team.tournaments.map((tournament) => (
                            <div
                              key={tournament.name}
                              className="flex justify-between items-center"
                            >
                              <span className="text-[#E0E0E0]">{tournament.name}</span>
                              <span className="text-[#EE8631] font-bold">
                                #{tournament.rank} <span className="text-xs text-[#95C5C5]">({tournament.points} pts)</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#95C5C5]/70">You haven't joined any teams for {selectedGame} yet.</div>
                )}
              </div>

              {/* Team Tournament Rankings */}
              {selectedGame !== "All" && (
                <div className="rounded-2xl bg-[#23242b]/80 border border-[#95C5C5]/20 shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-[#95C5C5] mb-6 flex items-center gap-2">
                    <FaTrophy className="text-[#EE8631]" /> {selectedGame} Tournament Rankings
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                      <thead>
                        <tr className="bg-gradient-to-r from-[#292B35] to-[#1a1c22] text-[#95C5C5]">
                          <th className="py-3 px-4 font-semibold">Rank</th>
                          <th className="py-3 px-4 font-semibold">Team</th>
                          <th className="py-3 px-4 font-semibold">Tournament</th>
                          <th className="py-3 px-4 font-semibold">Points</th>
                          <th className="py-3 px-4 font-semibold">Played</th>
                          <th className="py-3 px-4 font-semibold">W/L</th>
                          <th className="py-3 px-4 font-semibold">Win Rate</th>
                          <th className="py-3 px-4 font-semibold">Form</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#95C5C5]/10">
                        {filteredTeams.length > 0 ? (
                          filteredTeams.map((team) => (
                            <tr
                              key={team.name}
                              className="hover:bg-[#AD662F]/10 transition duration-200"
                            >
                              <td className="py-3 px-4 text-[#EE8631] font-bold">#{team.rank}</td>
                              <td className="py-3 px-4 font-semibold">{team.name}</td>
                              <td className="py-3 px-4">{team.tournament}</td>
                              <td className="py-3 px-4 font-bold">{team.points}</td>
                              <td className="py-3 px-4">{team.matchesPlayed}</td>
                              <td className="py-3 px-4">{team.wins}/{team.losses}</td>
                              <td className="py-3 px-4">{team.winRate}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-1">
                                  {team.recentForm.map((result, i) => (
                                    <span
                                      key={i}
                                      className={`w-6 h-6 flex items-center justify-center rounded font-bold ${
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
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="py-6 text-center text-[#95C5C5]/70">
                              No tournament rankings found for this game.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Upcoming Matches */}
          <div className="rounded-2xl bg-[#23242b]/80 border border-[#95C5C5]/20 shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#95C5C5] mb-6 flex items-center gap-2">
              <FaCalendarAlt className="text-[#EE8631]" />
              {selectedGame === "All" ? "All Upcoming Matches" : `${selectedGame} Upcoming Matches`}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#292B35] to-[#1a1c22] p-6 rounded-xl shadow-lg border border-[#95C5C5]/20 hover:shadow-2xl hover:border-[#EE8631]/30 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold mb-2 text-[#EE8631]">{match.teams}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <FaGamepad className="text-[#95C5C5]" />
                      <span className="text-[#E0E0E0] font-medium">{match.game}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <FaCalendarAlt className="text-[#EE8631]" />
                      <span className="text-[#E0E0E0]">{match.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#95C5C5] font-semibold">Time:</span>
                      <span className="text-[#E0E0E0]">{match.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-[#95C5C5]/70">
                  No upcoming matches found for {selectedGame}.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueSystem;
