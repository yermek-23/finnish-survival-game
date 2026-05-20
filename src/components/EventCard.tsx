import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import type { GameEvent, Locale } from '../types/game'
import { t, getUi } from '../i18n/ui'

interface EventCardProps {
  event: GameEvent
  day: number
  locale: Locale
  onChoice: (choice: 'a' | 'b') => void
}

export function EventCard({ event, day, locale, onChoice }: EventCardProps) {
  const ui = getUi(locale)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const opacityA = useTransform(x, [0, 120], [0, 1])
  const opacityB = useTransform(x, [-120, 0], [1, 0])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 100) onChoice('a')
    else if (info.offset.x < -100) onChoice('b')
  }

  return (
    <div className="flex flex-1 flex-col px-4 pb-4">
      <div className="mb-3 flex items-center justify-center gap-2 text-cyan-400/80">
        <Calendar className="h-4 w-4" />
        <span className="text-sm font-semibold tracking-widest uppercase">
          {ui.day} {day}
        </span>
      </div>

      <p className="mb-3 text-center text-xs text-slate-500">{ui.swipeHint}</p>

      <div className="relative mx-auto w-full max-w-md flex-1">
        <motion.div
          style={{ x, rotate, opacity: opacityA }}
          className="pointer-events-none absolute right-4 top-8 z-10 rounded-lg border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 text-sm font-bold text-emerald-300"
        >
          A →
        </motion.div>
        <motion.div
          style={{ opacity: opacityB }}
          className="pointer-events-none absolute left-4 top-8 z-10 rounded-lg border border-violet-400/50 bg-violet-500/20 px-3 py-1 text-sm font-bold text-violet-300"
        >
          ← B
        </motion.div>

        <motion.article
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ x, rotate }}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="cursor-grab touch-pan-y rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 to-[#0f2847]/90 p-6 shadow-[0_0_40px_rgba(34,211,238,0.12)] active:cursor-grabbing"
        >
          {event.premiumOnly && (
            <span className="mb-3 inline-block rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">
              ★ Premium
            </span>
          )}
          <p className="text-base leading-relaxed text-slate-100 md:text-lg">
            {t(locale, event.text)}
          </p>
        </motion.article>
      </div>

      <p className="my-3 text-center text-xs text-slate-500">{ui.choose}</p>

      <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => onChoice('a')}
          className="group flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-left text-sm text-emerald-100 transition hover:bg-emerald-500/20"
        >
          <ArrowRight className="h-5 w-5 shrink-0 text-emerald-400" />
          <span>{t(locale, event.choiceA.label)}</span>
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => onChoice('b')}
          className="group flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-3 text-left text-sm text-violet-100 transition hover:bg-violet-500/20"
        >
          <ArrowLeft className="h-5 w-5 shrink-0 text-violet-400" />
          <span>{t(locale, event.choiceB.label)}</span>
        </motion.button>
      </div>
    </div>
  )
}
