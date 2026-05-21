import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'

interface RewardedAdProps {
  onComplete: () => void
  onCancel: () => void
}

export function RewardedAd({ onComplete, onCancel }: RewardedAdProps) {
  const { ui } = useApp()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-amber-500/30 bg-slate-900 p-6 text-center">
        <Sparkles className="mx-auto h-10 w-10 text-amber-400" />
        <h3 className="mt-3 text-lg font-bold text-white">{ui.watchAd}</h3>
        <button type="button" onClick={onComplete} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 font-bold text-slate-900">
          <Play className="h-5 w-5 fill-current" />
          {ui.watchAd}
        </button>
        <button type="button" onClick={onCancel} className="mt-2 w-full py-2 text-sm text-slate-500">
          {ui.close}
        </button>
      </div>
    </motion.div>
  )
}
