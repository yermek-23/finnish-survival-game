import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, RotateCcw, Share2, Skull, Tv } from 'lucide-react'
import type { StatKey } from '../types/game'
import { UI, GAME_OVER_BY_STAT, getTitle } from '../copy/strings'
import { shareResult } from '../utils/shareCard'
import { buildLeaderboard } from '../utils/leaderboard'
import { RewardedAd } from './RewardedAd'
import { Leaderboard } from './Leaderboard'

interface GameOverModalProps {
  days: number
  failedStat: StatKey
  premium: boolean
  hasSecondLife: boolean
  onRestart: () => void
  onSecondLife: () => void
  onOpenStore: () => void
  onMainMenu: () => void
}

export function GameOverModal({
  days,
  failedStat,
  premium,
  hasSecondLife,
  onRestart,
  onSecondLife,
  onOpenStore,
  onMainMenu,
}: GameOverModalProps) {
  const [showRewarded, setShowRewarded] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const death = GAME_OVER_BY_STAT[failedStat]
  const title = getTitle(days)
  const leaderboard = useMemo(() => buildLeaderboard(days), [days])

  const handleShare = async () => {
    const result = await shareResult(days, UI.shareTemplate)
    if (result.copied) setToast(UI.shareCopied)
    else if (result.shared) setToast('Shared!')
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-40 overflow-y-auto bg-black/80 p-4"
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-auto w-full max-w-md rounded-2xl border border-red-500/30 bg-gradient-to-b from-slate-900 to-[#0a1628] p-5 shadow-[0_0_60px_rgba(239,68,68,0.12)]"
        >
          <div className="flex justify-center">
            <Skull className="h-11 w-11 text-red-400" />
          </div>
          <h2 className="mt-2 text-center text-2xl font-black text-red-300">{UI.gameOver}</h2>

          <p className="mt-3 text-center text-sm text-slate-400">
            {UI.survived}{' '}
            <span className="text-xl font-black text-cyan-300">{days}</span> {UI.days}
          </p>

          <div className="mt-4 rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3">
            <h3 className="text-center text-base font-bold text-red-200">{death.headline}</h3>
            <p className="mt-2 text-center text-sm leading-relaxed text-slate-300">{death.body}</p>
          </div>

          <p className="mt-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 text-center text-xs text-cyan-200">
            Final status: <strong>{title}</strong>
          </p>

          <div className="mt-4">
            <Leaderboard
              entries={leaderboard.entries}
              rank={leaderboard.rank}
              totalPlayers={leaderboard.totalPlayers}
            />
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-base font-bold text-white shadow-lg shadow-cyan-500/25"
          >
            <Share2 className="h-5 w-5" />
            {UI.shareResult}
          </button>

          {hasSecondLife && (
            <button
              type="button"
              onClick={() => (premium ? onSecondLife() : setShowRewarded(true))}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/50 bg-amber-500/10 py-3 text-sm font-semibold text-amber-200"
            >
              <Tv className="h-4 w-4" />
              {premium ? UI.secondLife : `${UI.secondLife} — ${UI.watchAd}`}
            </button>
          )}

          <button
            type="button"
            onClick={onRestart}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
          >
            <RotateCcw className="h-4 w-4" />
            {UI.playAgain}
          </button>

          <button
            type="button"
            onClick={onMainMenu}
            className="mt-2 flex w-full items-center justify-center gap-2 py-2 text-sm text-slate-500 hover:text-slate-300"
          >
            <Home className="h-4 w-4" />
            {UI.mainMenu}
          </button>

          {!premium && (
            <button type="button" onClick={onOpenStore} className="mt-1 w-full text-center text-xs text-amber-400/80 underline">
              {UI.buyPremium}
            </button>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-lg"
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>

      {showRewarded && (
        <RewardedAd
          onComplete={() => {
            setShowRewarded(false)
            onSecondLife()
          }}
          onCancel={() => setShowRewarded(false)}
        />
      )}
    </>
  )
}
