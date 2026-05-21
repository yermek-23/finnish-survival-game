import { motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { UI } from '../copy/strings'

interface InterstitialAdProps {
  onClose: () => void
}

export function InterstitialAd({ onClose }: InterstitialAdProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={UI.adLabel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-600 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-3 py-2">
          <span className="text-xs font-medium text-slate-400">{UI.adSponsored}</span>
          <span className="rounded bg-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-400">AdMob</span>
        </div>
        <div className="bg-gradient-to-br from-indigo-900 to-cyan-900 p-8 text-center">
          <p className="text-4xl">🦌☕</p>
          <h2 className="mt-4 text-xl font-bold text-white">Super Salmiakki Energy</h2>
          <p className="mt-2 text-sm text-cyan-100/80">300% more Sisu per sip. Doctors hate this trick!</p>
          <button type="button" className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-bold text-slate-900">
            Install now <ExternalLink className="h-4 w-4" />
          </button>
        </div>
        <div className="p-3">
          <button
            type="button"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-700 py-3 text-sm font-semibold text-white"
          >
            <X className="h-4 w-4" />
            {UI.adSkip}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
