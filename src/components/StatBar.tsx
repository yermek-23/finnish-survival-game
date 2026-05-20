import { Activity, Brain, Coins, Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Locale, StatKey, Stats } from '../types/game'
import { getUi } from '../i18n/ui'

const STAT_ICONS: Record<StatKey, typeof Activity> = {
  terveys: Activity,
  raha: Coins,
  mieli: Brain,
  sisu: Flame,
}

const STAT_COLORS: Record<StatKey, string> = {
  terveys: 'from-emerald-400 to-teal-500',
  raha: 'from-amber-400 to-yellow-500',
  mieli: 'from-violet-400 to-purple-500',
  sisu: 'from-cyan-400 to-blue-500',
}

interface StatBarProps {
  stats: Stats
  locale: Locale
}

export function StatBar({ stats, locale }: StatBarProps) {
  const ui = getUi(locale)
  const keys: StatKey[] = ['terveys', 'raha', 'mieli', 'sisu']

  return (
    <section className="grid grid-cols-2 gap-2 px-4 py-3">
      {keys.map((key) => {
        const Icon = STAT_ICONS[key]
        const value = stats[key]
        const low = value <= 25

        return (
          <div
            key={key}
            className={`rounded-xl border bg-slate-900/60 p-2.5 ${
              low ? 'border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.3)]' : 'border-cyan-500/20'
            }`}
          >
            <div className="mb-1.5 flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5">
                <Icon className={`h-4 w-4 ${low ? 'text-red-400' : 'text-cyan-300'}`} />
                <span className="text-xs font-medium text-slate-300">{ui.stats[key]}</span>
              </div>
              <span className={`text-xs font-bold tabular-nums ${low ? 'text-red-400' : 'text-white'}`}>
                {value}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${STAT_COLORS[key]}`}
                initial={false}
                animate={{ width: `${value}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        )
      })}
    </section>
  )
}
