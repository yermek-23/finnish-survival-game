import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Share2, Skull, Tv } from 'lucide-react'
import type { Locale, StatKey } from '../types/game'
import { getDeathReason, getTitle, getUi } from '../i18n/ui'
import { shareResult } from '../utils/shareCard'
import { RewardedAd } from './RewardedAd'

interface GameOverModalProps {
  locale: Locale
  days: number
  failedStat: StatKey
  premium: boolean
  hasSecondLife: boolean
  onRestart: () => void
  onSecondLife: () => void
  onOpenStore: () => void
}

export function GameOverModal({
  locale,
  days,
  failedStat,
  premium,
  hasSecondLife,
  onRestart,
  onSecondLife,
  onOpenStore,
}: GameOverModalProps) {
  const ui = getUi(locale)
  const [showRewarded, setShowRewarded] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const title = getTitle(locale, days)
  const death = getDeathReason(locale, failedStat)

  const handleShare = async () => {
    const result = await shareResult(locale, days, ui.shareTemplate)
    if (result.copied) setToast(ui.shareCopied)
    else if (result.shared) setToast('Shared!')
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 p-4 sm:items-center"
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md rounded-2xl border border-red-500/30 bg-gradient-to-b from-slate-900 to-[#0a1628] p-6 shadow-[0_0_60px_rgba(239,68,68,0.15)]"
        >
          <div className="flex justify-center">
            <Skull className="h-12 w-12 text-red-400" />
          </div>
          <h2 className="mt-3 text-center text-2xl font-black text-red-300">{ui.gameOver}</h2>
          <p className="mt-4 text-center text-slate-300">
            {ui.survived}{' '}
            <span className="font-bold text-cyan-300">{days}</span>{' '}
            {locale === 'fi' ? 'päivää' : locale === 'ru' ? 'дней' : 'days'} — {death}.
          </p>
          <p className="mt-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-center text-sm text-cyan-200">
            {locale === 'fi' ? 'Status:' : locale === 'ru' ? 'Статус:' : 'Status:'}{' '}
            <strong>{title}</strong>
          </p>

          <button
            type="button"
            onClick={handleShare}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-base font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-110"
          >
            <Share2 className="h-5 w-5" />
            {ui.shareResult}
          </button>

          {hasSecondLife && (
            <button
              type="button"
              onClick={() => (premium ? onSecondLife() : setShowRewarded(true))}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/50 bg-amber-500/10 py-3 text-sm font-semibold text-amber-200"
            >
              <Tv className="h-4 w-4" />
              {premium ? ui.secondLife : `${ui.secondLife} — ${ui.watchAd}`}
            </button>
          )}

          <button
            type="button"
            onClick={onRestart}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
          >
            <RotateCcw className="h-4 w-4" />
            {ui.playAgain}
          </button>

          {!premium && (
            <button
              type="button"
              onClick={onOpenStore}
              className="mt-2 w-full text-center text-xs text-amber-400/80 underline"
            >
              {ui.buyPremium}
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
          locale={locale}
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
