import { Activity, Brain, Coins, Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import type { StatKey, Stats } from '../types/game'
import { useApp } from '../context/AppContext'

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
}

export function StatBar({ stats }: StatBarProps) {
  const { ui } = useApp()
  const keys: StatKey[] = ['terveys', 'raha', 'mieli', 'sisu']

  return (
    <section className="grid grid-cols-2 gap-2 px-3 py-2">
      {keys.map((key) => {
        const Icon = STAT_ICONS[key]
        const value = stats[key]
        const critical = value <= 15
        const low = value <= 30

        return (
          <div
            key={key}
            className={`rounded-xl border bg-slate-900/70 p-2 ${
              critical ? 'animate-pulse border-red-500/60' : low ? 'border-orange-500/35' : 'border-cyan-500/15'
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Icon className={`h-3.5 w-3.5 ${critical ? 'text-red-400' : 'text-cyan-300'}`} />
                <span className="text-[10px] font-semibold text-slate-300">{ui.stats[key]}</span>
              </div>
              <span className={`text-xs font-bold tabular-nums ${critical ? 'text-red-400' : 'text-white'}`}>
                {value}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${STAT_COLORS[key]}`}
                initial={false}
                animate={{ width: `${value}%` }}
                transition={{ type: 'spring', stiffness: 140, damping: 22 }}
              />
            </div>
          </div>
        )
      })}
    </section>
  )
}
