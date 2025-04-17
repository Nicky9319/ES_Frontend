import React, { useState } from "react";

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

  return (
    <div className="min-h-screen px-6 py-8 bg-[#292B35] text-[#E0E0E0] font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-[#95C5C5]">Esports League System</h1>
        <p className="text-lg mb-8 text-[#E0E0E0]">
          Welcome to the competitive hub! Track ongoing leagues, match results, and standings in real-time.
        </p>

        {/* Ranking Type Selector */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setRankingType("individual")}
            className={`px-6 py-3 rounded-lg text-lg ${
              rankingType === "individual"
                ? "bg-[#EE8631] text-[#E0E0E0]"
                : "bg-[#292B35] text-[#95C5C5] border border-[#95C5C5] hover:bg-[#AD662F]"
            }`}
          >
            Individual Rankings
          </button>
          <button
            onClick={() => setRankingType("team")}
            className={`px-6 py-3 rounded-lg text-lg ${
              rankingType === "team"
                ? "bg-[#EE8631] text-[#E0E0E0]"
                : "bg-[#292B35] text-[#95C5C5] border border-[#95C5C5] hover:bg-[#AD662F]"
            }`}
          >
            Team Rankings
          </button>
        </div>

        {rankingType === "individual" ? (
          <>
            {/* Game Filters */}
            <div className="mb-6 flex gap-4 flex-wrap">
              {allGames.map((game) => (
                <button
                  key={game}
                  onClick={() => setSelectedGame(game)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedGame === game
                      ? "bg-[#EE8631] text-[#E0E0E0]"
                      : "bg-[#292B35] text-[#95C5C5] border border-[#95C5C5] hover:bg-[#AD662F]"
                  }`}
                >
                  {game}
                </button>
              ))}
            </div>

            {/* League Standings */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-[#95C5C5] mb-4">
                {selectedGame === "All" ? "Current Standings" : `${selectedGame} League Standings`}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-[#292B35] rounded-lg shadow-lg border border-[#95C5C5]">
                  <thead>
                    <tr className="text-[#95C5C5] text-left">
                      <th className="py-3 px-4">League</th>
                      <th className="py-3 px-4">Season</th>
                      <th className="py-3 px-4">Played</th>
                      <th className="py-3 px-4">Wins</th>
                      <th className="py-3 px-4">Losses</th>
                      <th className="py-3 px-4">Points</th>
                    </tr>
                  </thead>
                  <tbody>
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

            {/* MMR Rankings */}
            {selectedGame !== "All" && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-[#95C5C5] mb-4">
                  {selectedGame} MMR Leaderboard
                </h2>
                {filteredPlayers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#292B35] rounded-lg shadow-lg border border-[#95C5C5]">
                      <thead>
                        <tr className="text-[#95C5C5] text-left">
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
                      <tbody>
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
            {/* Game Filters */}
            <div className="mb-6 flex gap-4 flex-wrap">
              {allGames.map((game) => (
                <button
                  key={game}
                  onClick={() => setSelectedGame(game)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedGame === game
                      ? "bg-[#EE8631] text-[#E0E0E0]"
                      : "bg-[#292B35] text-[#95C5C5] border border-[#95C5C5] hover:bg-[#AD662F]"
                  }`}
                >
                  {game}
                </button>
              ))}
            </div>

            {/* Player's Teams */}
            <div className="mb-12">
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

            {/* Tournament Team Rankings */}
            {selectedGame !== "All" && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-[#95C5C5] mb-4">
                  {selectedGame} Tournament Rankings
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-[#292B35] rounded-lg shadow-lg border border-[#95C5C5]">
                    <thead>
                      <tr className="text-[#95C5C5] text-left">
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
                    <tbody>
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

        {/* Upcoming Matches */}
        <div>
          <h2 className="text-2xl font-semibold text-[#95C5C5] mb-4">
            {selectedGame === "All" ? "All Upcoming Matches" : `${selectedGame} Upcoming Matches`}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredMatches.map((match, index) => (
              <div
                key={index}
                className="bg-[#292B35] p-5 rounded-xl shadow-md hover:shadow-[#EE8631]/30 border border-[#95C5C5]"
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
  );
};

export default LeagueSystem;
