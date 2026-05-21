import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { AlertTriangle, ArrowLeft, ArrowRight, Calendar, Timer } from 'lucide-react'
import type { GameEvent } from '../types/game'
import { ACTION_TIMER_MS } from '../types/game'
import { UI } from '../copy/strings'
import { useActionTimer } from '../hooks/useActionTimer'

interface EventCardProps {
  event: GameEvent
  day: number
  disabled: boolean
  panicFlash: boolean
  onChoice: (choice: 'a' | 'b') => void
  onPanic: () => void
}

export function EventCard({
  event,
  day,
  disabled,
  panicFlash,
  onChoice,
  onPanic,
}: EventCardProps) {
  const timerKey = `${event.id}-${day}`
  const { progress, secondsLeft, urgent } = useActionTimer(
    ACTION_TIMER_MS,
    !disabled && !panicFlash,
    timerKey,
    onPanic,
  )

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-10, 10])
  const opacityA = useTransform(x, [0, 120], [0, 1])
  const opacityB = useTransform(x, [-120, 0], [1, 0])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (disabled || panicFlash) return
    if (info.offset.x > 100) onChoice('a')
    else if (info.offset.x < -100) onChoice('b')
  }

  const barColor = urgent
    ? 'from-red-500 via-orange-500 to-amber-500'
    : 'from-orange-500 via-red-500 to-rose-600'

  return (
    <div className="flex flex-1 flex-col px-4 pb-4">
      <div className="mb-2 flex items-center justify-center gap-2 text-cyan-400/90">
        <Calendar className="h-4 w-4" />
        <span className="text-sm font-bold tracking-widest uppercase">
          {UI.day} {day}
        </span>
      </div>

      <p className="mb-2 text-center text-[11px] text-slate-500">{UI.swipeHint}</p>

      <div className="relative mx-auto w-full max-w-md flex-1">
        <motion.div style={{ opacity: opacityA }} className="pointer-events-none absolute right-3 top-6 z-10 rounded-lg border border-emerald-400/50 bg-emerald-500/20 px-2 py-1 text-xs font-bold text-emerald-300">
          A →
        </motion.div>
        <motion.div style={{ opacity: opacityB }} className="pointer-events-none absolute left-3 top-6 z-10 rounded-lg border border-violet-400/50 bg-violet-500/20 px-2 py-1 text-xs font-bold text-violet-300">
          ← B
        </motion.div>

        <motion.article
          drag={disabled || panicFlash ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          style={{ x, rotate }}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`rounded-2xl border bg-gradient-to-br from-slate-900/95 to-[#0f2847]/95 p-5 shadow-[0_0_32px_rgba(34,211,238,0.1)] ${
            panicFlash ? 'border-red-500/60' : 'border-cyan-500/30'
          } ${disabled ? 'opacity-60' : 'cursor-grab active:cursor-grabbing'}`}
        >
          {event.premiumOnly && (
            <span className="mb-2 inline-block rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              ★ Premium Event
            </span>
          )}
          <p className="text-[15px] leading-relaxed text-slate-100 sm:text-base">{event.text}</p>
        </motion.article>

        <AnimatePresence>
          {panicFlash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-red-950/80 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center gap-2 px-4 text-center">
                <AlertTriangle className="h-10 w-10 text-red-400" />
                <p className="text-lg font-black text-red-200">{UI.panicMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5-second timer bar */}
      <div className="mx-auto mt-4 w-full max-w-md">
        <div className="mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider">
          <span className={`flex items-center gap-1 ${urgent ? 'text-red-400' : 'text-orange-400/90'}`}>
            <Timer className="h-3 w-3" />
            {UI.timerLabel}
          </span>
          <span className={`tabular-nums ${urgent ? 'animate-pulse text-red-400' : 'text-slate-400'}`}>
            {secondsLeft}s
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-800 ring-1 ring-red-500/20">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${barColor} shadow-[0_0_12px_rgba(239,68,68,0.5)]`}
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        </div>
      </div>

      <p className="my-3 text-center text-xs font-medium text-slate-500">{UI.choose}</p>

      <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
        <motion.button
          type="button"
          disabled={disabled || panicFlash}
          whileTap={{ scale: disabled ? 1 : 0.97 }}
          onClick={() => onChoice('a')}
          className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-3.5 text-left text-sm text-emerald-100 transition enabled:hover:bg-emerald-500/20 disabled:opacity-40"
        >
          <ArrowRight className="h-5 w-5 shrink-0 text-emerald-400" />
          <span>{event.choiceA.label}</span>
        </motion.button>
        <motion.button
          type="button"
          disabled={disabled || panicFlash}
          whileTap={{ scale: disabled ? 1 : 0.97 }}
          onClick={() => onChoice('b')}
          className="flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 px-3 py-3.5 text-left text-sm text-violet-100 transition enabled:hover:bg-violet-500/20 disabled:opacity-40"
        >
          <ArrowLeft className="h-5 w-5 shrink-0 text-violet-400" />
          <span>{event.choiceB.label}</span>
        </motion.button>
      </div>
    </div>
  )
}
