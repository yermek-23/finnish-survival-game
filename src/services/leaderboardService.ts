/**
 * Cloud-ready leaderboard — replace MOCK_ENTRIES with API fetch later.
 * Example: await supabase.from('scores').select().order('days', { ascending: false })
 */

export interface LeaderboardRow {
  rank: number
  nickname: string
  days: number
  isLocalPlayer?: boolean
}

export interface LeaderboardResult {
  rows: LeaderboardRow[]
  playerRank: number
  totalPlayers: number
}

/** Static seed data — simulates global competition */
const MOCK_ENTRIES: { nickname: string; days: number }[] = [
  { nickname: 'SisuMaster_99', days: 48 },
  { nickname: 'Kimi_R', days: 36 },
  { nickname: 'SalmiakkiLover', days: 29 },
  { nickname: 'HelsinkiGhost', days: 27 },
  { nickname: 'MoominWhisperer', days: 24 },
  { nickname: 'AuroraHunter', days: 22 },
  { nickname: 'SaunaKing_FI', days: 19 },
  { nickname: 'NordicNoah', days: 17 },
  { nickname: 'ReindeerRacer', days: 15 },
  { nickname: 'BalticBreeze', days: 13 },
  { nickname: 'FrozenLatte', days: 11 },
  { nickname: 'VolvoVintage', days: 9 },
]

export const leaderboardService = {
  /**
   * Build leaderboard with local player injected.
   * @param playerNickname — from playerService
   * @param playerDays — current or best run
   */
  getLeaderboard(playerNickname: string, playerDays: number): LeaderboardResult {
    const combined = [
      ...MOCK_ENTRIES,
      { nickname: playerNickname, days: playerDays, isLocalPlayer: true as const },
    ].sort((a, b) => b.days - a.days)

    const playerRank =
      combined.findIndex((e) => 'isLocalPlayer' in e && e.isLocalPlayer) + 1

    const totalPlayers = 1240 + Math.floor(Math.random() * 120)

    const rows: LeaderboardRow[] = combined.slice(0, 12).map((e, i) => ({
      rank: i + 1,
      nickname: e.nickname,
      days: e.days,
      isLocalPlayer: 'isLocalPlayer' in e && !!e.isLocalPlayer,
    }))

    return { rows, playerRank, totalPlayers }
  },

  /** Future: persist score after game over */
  async submitScore(_nickname: string, _days: number): Promise<void> {
    // await supabase.from('scores').insert({ nickname, days })
  },
}
