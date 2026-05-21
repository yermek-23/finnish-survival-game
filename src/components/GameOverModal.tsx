import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, RotateCcw, Share2, Skull, Tv } from 'lucide-react'
import type { StatKey } from '../types/game'
import { useApp } from '../context/AppContext'
import { getTitle } from '../i18n/ui'
import { shareResult } from '../utils/shareCard'
import { leaderboardService } from '../services/leaderboardService'
import { RewardedAd } from './RewardedAd'
import { Leaderboard } from './Leaderboard'

interface GameOverModalProps {
  days: number
  failedStat: StatKey
  premium: boolean
  hasSecondLife: boolean
  onRestart: () => void
  onSecondLife: () => void
  onMainMenu: () => void
}

export function GameOverModal({
  days,
  failedStat,
  premium,
  hasSecondLife,
  onRestart,
  onSecondLife,
  onMainMenu,
}: GameOverModalProps) {
  const { locale, ui, player } = useApp()
  const [showRewarded, setShowRewarded] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const death = ui.gameOverByStat[failedStat]
  const title = getTitle(locale, days)
  const nickname = player?.nickname ?? 'You'

  const leaderboard = useMemo(
    () => leaderboardService.getLeaderboard(nickname, days),
    [nickname, days],
  )

  const handleShare = async () => {
    const result = await shareResult(locale, days, ui.shareTemplate)
    if (result.copied) setToast(ui.shareCopied)
    else if (result.shared) setToast('OK')
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-40 overflow-y-auto bg-black/85 p-4 pt-6"
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-auto w-full max-w-md rounded-2xl border border-red-500/30 bg-gradient-to-b from-slate-900 to-[#060d18] p-5"
        >
          <Skull className="mx-auto h-11 w-11 text-red-400" />
          <h2 className="mt-2 text-center text-2xl font-black text-red-300">{ui.gameOver}</h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            {nickname} · {ui.survived}{' '}
            <span className="font-black text-cyan-300">{days}</span> {ui.days}
          </p>

          <div className="mt-4 rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3">
            <h3 className="text-center font-bold text-red-200">{death.headline}</h3>
            <p className="mt-2 text-center text-sm text-slate-300">{death.body}</p>
          </div>

          <p className="mt-3 text-center text-xs text-cyan-200">
            {ui.finalStatus}: <strong>{title}</strong>
          </p>

          <div className="mt-4">
            <Leaderboard
              rows={leaderboard.rows}
              rank={leaderboard.playerRank}
              totalPlayers={leaderboard.totalPlayers}
            />
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 font-bold text-white"
          >
            <Share2 className="h-5 w-5" />
            {ui.shareResult}
          </button>

          {hasSecondLife && (
            <button
              type="button"
              onClick={() => (premium ? onSecondLife() : setShowRewarded(true))}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/50 bg-amber-500/10 py-3 text-sm text-amber-200"
            >
              <Tv className="h-4 w-4" />
              {premium ? ui.secondLife : `${ui.secondLife} — ${ui.watchAd}`}
            </button>
          )}

          <button type="button" onClick={onRestart} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 py-3 text-sm text-slate-300">
            <RotateCcw className="h-4 w-4" />
            {ui.playAgain}
          </button>

          <button type="button" onClick={onMainMenu} className="mt-2 flex w-full items-center justify-center gap-2 py-2 text-sm text-slate-500">
            <Home className="h-4 w-4" />
            {ui.mainMenu}
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-cyan-600 px-4 py-2 text-sm text-white"
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
