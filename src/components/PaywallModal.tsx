import { motion } from 'framer-motion'
import { Check, Lock, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'

interface PaywallModalProps {
  days: number
  onUnlock: () => void
  onRestore: () => void
}

export function PaywallModal({ days, onUnlock, onRestore }: PaywallModalProps) {
  const { ui } = useApp()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/90 p-4 sm:items-center"
    >
      <motion.div
        initial={{ y: 60, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#0f2847] via-slate-900 to-[#060d18] p-6 shadow-[0_0_80px_rgba(251,191,36,0.15)]"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex justify-center">
          <div className="rounded-full bg-amber-500/20 p-4">
            <Lock className="h-10 w-10 text-amber-400" />
          </div>
        </div>

        <h2 className="relative mt-4 text-center text-2xl font-black text-amber-300">{ui.paywallTitle}</h2>
        <p className="relative mt-2 text-center text-sm leading-relaxed text-slate-300">{ui.paywallSubtitle}</p>
        <p className="relative mt-3 text-center text-xs text-cyan-400/80">
          {ui.survived} {days} {ui.days} — {ui.demoFinished}
        </p>

        <ul className="relative mt-5 space-y-2">
          {ui.paywallFeatures.map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-sm text-slate-200">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              {feat}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onUnlock}
          className="relative mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 py-4 text-base font-black text-slate-900 shadow-lg shadow-amber-500/30"
        >
          <Sparkles className="h-5 w-5" />
          {ui.unlockFullGame}
        </button>

        <button
          type="button"
          onClick={onRestore}
          className="relative mt-3 w-full rounded-xl border border-slate-600 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800"
        >
          {ui.restorePurchase}
        </button>
      </motion.div>
    </motion.div>
  )
}
