import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { AlertTriangle, ArrowLeft, ArrowRight, Calendar, Timer } from 'lucide-react'
import type { GameEvent } from '../types/game'
import { ACTION_TIMER_MS } from '../types/game'
import { useApp } from '../context/AppContext'
import { t } from '../i18n/translate'
import { useActionTimer } from '../hooks/useActionTimer'

interface EventCardProps {
  event: GameEvent
  day: number
  disabled: boolean
  panicFlash: boolean
  onChoice: (choice: 'a' | 'b') => void
  onPanic: () => void
}

export function EventCard({ event, day, disabled, panicFlash, onChoice, onPanic }: EventCardProps) {
  const { locale, ui } = useApp()
  const timerKey = `${event.id}-${day}`

  const { progress, secondsLeft, urgent } = useActionTimer(
    ACTION_TIMER_MS,
    !disabled && !panicFlash,
    timerKey,
    onPanic,
  )

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-10, 10])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (disabled || panicFlash) return
    if (info.offset.x > 100) onChoice('a')
    else if (info.offset.x < -100) onChoice('b')
  }

  const barColor = urgent
    ? 'from-red-600 via-orange-500 to-amber-500'
    : 'from-orange-500 via-red-500 to-rose-600'

  return (
    <div className="flex flex-1 flex-col px-4 pb-4">
      <div className="mb-2 flex items-center justify-center gap-2 text-cyan-400/90">
        <Calendar className="h-4 w-4" />
        <span className="text-sm font-bold tracking-widest uppercase">
          {ui.day} {day}
          {!disabled && day <= 5 && (
            <span className="ml-2 rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-300">DEMO</span>
          )}
        </span>
      </div>

      <p className="mb-2 text-center text-[11px] text-slate-500">{ui.swipeHint}</p>

      <div className="relative mx-auto w-full max-w-md flex-1">
        <motion.article
          drag={disabled || panicFlash ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ x, rotate }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl border bg-gradient-to-br from-slate-900/95 to-[#0f2847]/95 p-5 ${
            panicFlash ? 'border-red-500/60' : 'border-cyan-500/30'
          }`}
        >
          {event.premiumOnly && (
            <span className="mb-2 inline-block rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              ★ Premium
            </span>
          )}
          <p className="text-[15px] leading-relaxed text-slate-100">{t(event.text, locale)}</p>
        </motion.article>

        <AnimatePresence>
          {panicFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-red-950/85 backdrop-blur-sm"
            >
              <div className="text-center">
                <AlertTriangle className="mx-auto h-10 w-10 text-red-400" />
                <p className="mt-2 px-4 text-lg font-black text-red-200">{ui.panicMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-4 w-full max-w-md">
        <div className="mb-1 flex justify-between text-[10px] font-bold uppercase tracking-wider">
          <span className={`flex items-center gap-1 ${urgent ? 'text-red-400' : 'text-orange-400'}`}>
            <Timer className="h-3 w-3" />
            {ui.timerLabel}
          </span>
          <span className={`tabular-nums ${urgent ? 'animate-pulse text-red-400' : 'text-slate-400'}`}>
            {secondsLeft}s
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-800 ring-1 ring-red-500/25">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <p className="my-3 text-center text-xs text-slate-500">{ui.choose}</p>

      <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
        <motion.button
          type="button"
          disabled={disabled || panicFlash}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChoice('a')}
          className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-3.5 text-left text-sm text-emerald-100 disabled:opacity-40"
        >
          <ArrowRight className="h-5 w-5 shrink-0 text-emerald-400" />
          <span>{t(event.choiceA.label, locale)}</span>
        </motion.button>
        <motion.button
          type="button"
          disabled={disabled || panicFlash}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChoice('b')}
          className="flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 px-3 py-3.5 text-left text-sm text-violet-100 disabled:opacity-40"
        >
          <ArrowLeft className="h-5 w-5 shrink-0 text-violet-400" />
          <span>{t(event.choiceB.label, locale)}</span>
        </motion.button>
      </div>
    </div>
  )
}
