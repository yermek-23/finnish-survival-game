import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Play, Sparkles, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { leaderboardService } from '../services/leaderboardService'
import { DEMO_MAX_DAY } from '../types/game'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Leaderboard } from './Leaderboard'

interface MainMenuProps {
  bestDays: number
  premium: boolean
  onStart: () => void
  onOpenStore: () => void
}

export function MainMenu({ bestDays, premium, onStart, onOpenStore }: MainMenuProps) {
  const { ui, player } = useApp()
  const nickname = player?.nickname ?? 'Player'

  const leaderboard = useMemo(
    () => leaderboardService.getLeaderboard(nickname, bestDays > 0 ? bestDays : 3),
    [nickname, bestDays],
  )

  return (
    <div className="flex min-h-[100dvh] flex-col px-4 pb-8 pt-3">
      <div className="mx-auto flex w-full max-w-md items-center justify-between gap-2">
        <p className="truncate text-sm font-semibold text-cyan-300/90">
          {nickname}
        </p>
        <LanguageSwitcher />
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-6 max-w-md text-center">
        <p className="text-5xl">🇫🇮</p>
        <h1 className="mt-3 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-2xl font-black text-transparent">
          {ui.appTitle}
        </h1>
        <p className="mt-1 text-sm text-slate-400">{ui.appSubtitle}</p>
        {!premium && (
          <span className="mt-2 inline-block rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
            {ui.demoBadge}
          </span>
        )}
        {premium && (
          <span className="mt-2 inline-block rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300">
            {ui.premiumActive}
          </span>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-5 flex max-w-md items-start gap-2 rounded-xl border border-orange-500/25 bg-orange-500/5 p-3"
      >
        <Zap className="h-5 w-5 shrink-0 text-orange-400" />
        <p className="text-xs leading-relaxed text-slate-300">{ui.howToPlay}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-auto mt-5 w-full max-w-md"
      >
        <Leaderboard rows={leaderboard.rows} compact />
        {bestDays > 0 && (
          <p className="mt-2 text-center text-xs text-slate-500">
            Best: <span className="font-bold text-cyan-400">{bestDays}</span> {ui.days}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-auto mt-6 w-full max-w-md space-y-3"
      >
        <button
          type="button"
          onClick={onStart}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]"
        >
          <Play className="h-6 w-6 fill-current" />
          {ui.startGame}
        </button>
        {!premium && (
          <p className="text-center text-[10px] text-slate-500">
            Free demo ends after {DEMO_MAX_DAY} {ui.days}
          </p>
        )}
        {!premium && (
          <button
            type="button"
            onClick={onOpenStore}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 py-3 text-sm font-semibold text-amber-200"
          >
            <Sparkles className="h-4 w-4" />
            {ui.unlockFullGame}
          </button>
        )}
      </motion.div>
    </div>
  )
}
