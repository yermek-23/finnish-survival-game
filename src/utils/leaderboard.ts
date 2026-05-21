export interface LeaderboardEntry {
  rank: number
  name: string
  days: number
  isPlayer?: boolean
}

const MOCK_LEADERBOARD: Omit<LeaderboardEntry, 'rank'>[] = [
  { name: 'SisuMaster_99', days: 48 },
  { name: 'Kimi_R', days: 36 },
  { name: 'SalmiakkiLover', days: 29 },
  { name: 'HelsinkiGhost', days: 27 },
  { name: 'MoominWhisperer', days: 24 },
  { name: 'AuroraHunter', days: 22 },
  { name: 'SaunaKing_FI', days: 19 },
  { name: 'NordicNoah', days: 17 },
  { name: 'ReindeerRacer', days: 15 },
  { name: 'BalticBreeze', days: 13 },
  { name: 'FrozenLatte', days: 11 },
  { name: 'PolarPingu', days: 9 },
]

const TOTAL_PLAYERS_BASE = 1240

export function buildLeaderboard(playerDays: number, playerName = 'You'): {
  entries: LeaderboardEntry[]
  rank: number
  totalPlayers: number
} {
  const combined = [
    ...MOCK_LEADERBOARD.map((e) => ({ ...e })),
    { name: playerName, days: playerDays, isPlayer: true as const },
  ].sort((a, b) => b.days - a.days)

  const rank = combined.findIndex((e) => e.isPlayer) + 1
  const totalPlayers = TOTAL_PLAYERS_BASE + Math.floor(Math.random() * 80)

  const entries: LeaderboardEntry[] = combined.slice(0, 12).map((e, i) => ({
    rank: i + 1,
    name: e.name,
    days: e.days,
    isPlayer: e.isPlayer,
  }))

  return { entries, rank, totalPlayers }
}
