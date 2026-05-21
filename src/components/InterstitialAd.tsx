import { motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

interface InterstitialAdProps {
  onClose: () => void
}

export function InterstitialAd({ onClose }: InterstitialAdProps) {
  const { ui } = useApp()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
    >
      <motion.div
        initial={{ scale: 0.92 }}
        animate={{ scale: 1 }}
        className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-600 bg-slate-900"
      >
        <div className="flex justify-between border-b border-slate-700 px-3 py-2 text-xs text-slate-400">
          <span>{ui.adSponsored}</span>
          <span className="text-yellow-400">AdMob</span>
        </div>
        <div className="bg-gradient-to-br from-indigo-900 to-cyan-900 p-8 text-center">
          <p className="text-4xl">🦌☕</p>
          <h2 className="mt-3 text-lg font-bold text-white">Super Salmiakki Energy</h2>
          <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-900">
            Install <ExternalLink className="h-4 w-4" />
          </button>
        </div>
        <div className="p-3">
          <button type="button" onClick={onClose} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-700 py-3 text-sm font-semibold text-white">
            <X className="h-4 w-4" />
            {ui.adSkip}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
