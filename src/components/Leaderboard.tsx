import { motion } from 'framer-motion'
import { Crown, Medal, Trophy } from 'lucide-react'
import { UI } from '../copy/strings'
import type { LeaderboardEntry } from '../utils/leaderboard'

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  rank?: number
  totalPlayers?: number
  compact?: boolean
}

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="h-4 w-4 text-amber-400" />
  if (rank === 2) return <Medal className="h-4 w-4 text-slate-300" />
  if (rank === 3) return <Medal className="h-4 w-4 text-amber-700" />
  return <span className="w-4 text-center text-xs font-bold text-slate-500">{rank}</span>
}

export function Leaderboard({ entries, rank, totalPlayers, compact }: LeaderboardProps) {
  const show = compact ? entries.slice(0, 5) : entries.slice(0, 10)

  return (
    <section className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-cyan-400" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
          {UI.globalLeaderboard}
        </h2>
      </div>

      {rank != null && totalPlayers != null && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-center"
        >
          <p className="text-xs text-amber-200/80">{UI.yourRank}</p>
          <p className="text-lg font-black text-amber-300">
            #{rank}{' '}
            <span className="text-sm font-medium text-slate-400">
              {UI.outOf} {totalPlayers.toLocaleString()} {UI.players}
            </span>
          </p>
        </motion.div>
      )}

      <ul className="space-y-1.5">
        {show.map((entry, i) => (
          <motion.li
            key={`${entry.name}-${entry.rank}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-sm ${
              entry.isPlayer
                ? 'border border-cyan-400/50 bg-cyan-500/15 font-semibold text-cyan-100'
                : 'bg-slate-800/50 text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2 truncate">
              <RankIcon rank={entry.rank} />
              <span className="truncate">{entry.name}</span>
            </span>
            <span className="shrink-0 tabular-nums text-cyan-400/90">
              {UI.day} {entry.days}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
