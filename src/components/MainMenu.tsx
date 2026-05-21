import { motion } from 'framer-motion'
import { Play, Sparkles, Zap } from 'lucide-react'
import { UI } from '../copy/strings'
import { buildLeaderboard } from '../utils/leaderboard'
import { Leaderboard } from './Leaderboard'

interface MainMenuProps {
  bestDays: number
  premium: boolean
  onStart: () => void
  onOpenStore: () => void
}

export function MainMenu({ bestDays, premium, onStart, onOpenStore }: MainMenuProps) {
  const preview = buildLeaderboard(bestDays > 0 ? bestDays : 7)

  return (
    <div className="flex flex-1 flex-col px-4 pb-8 pt-2">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-md text-center"
      >
        <p className="text-5xl">🇫🇮</p>
        <h1 className="mt-3 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-3xl font-black text-transparent">
          {UI.appTitle}
        </h1>
        <p className="mt-1 text-sm text-slate-400">{UI.appSubtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-6 flex w-full max-w-md items-start gap-2 rounded-xl border border-orange-500/30 bg-orange-500/5 p-3"
      >
        <Zap className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
        <p className="text-left text-xs leading-relaxed text-slate-300">{UI.howToPlay}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-auto mt-5 w-full max-w-md"
      >
        <Leaderboard entries={preview.entries} compact />
        {bestDays > 0 && (
          <p className="mt-2 text-center text-xs text-slate-500">
            Your best run: <span className="font-bold text-cyan-400">{bestDays} days</span>
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mx-auto mt-6 w-full max-w-md space-y-3"
      >
        <button
          type="button"
          onClick={onStart}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/30 transition hover:brightness-110 active:scale-[0.98]"
        >
          <Play className="h-6 w-6 fill-current" />
          {UI.startGame}
        </button>

        {!premium && (
          <button
            type="button"
            onClick={onOpenStore}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 py-3 text-sm font-semibold text-amber-200"
          >
            <Sparkles className="h-4 w-4" />
            {UI.buyPremium}
          </button>
        )}
      </motion.div>
    </div>
  )
}
