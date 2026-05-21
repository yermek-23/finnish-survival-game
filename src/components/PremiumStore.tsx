import { motion } from 'framer-motion'
import { Check, CreditCard, Lock, Sparkles, X } from 'lucide-react'
import { UI } from '../copy/strings'

interface PremiumStoreProps {
  premium: boolean
  showSuccess: boolean
  onClose: () => void
  onPurchase: () => void
  onCloseSuccess: () => void
}

const PERKS = ['No ads', 'Secret premium events', 'Honorary Moomin badge']

export function PremiumStore({ premium, showSuccess, onClose, onPurchase, onCloseSuccess }: PremiumStoreProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-amber-500/30 bg-slate-900 p-6"
      >
        <button type="button" onClick={onClose} className="absolute right-3 top-3 rounded-full p-1 text-slate-400 hover:bg-slate-800" aria-label={UI.close}>
          <X className="h-5 w-5" />
        </button>

        {showSuccess ? (
          <div className="py-6 text-center">
            <Check className="mx-auto h-12 w-12 text-emerald-400" />
            <h3 className="mt-4 text-lg font-bold text-white">{UI.premiumSuccess}</h3>
            <p className="mt-2 text-sm text-slate-400">{UI.premiumDemo}</p>
            <button type="button" onClick={onCloseSuccess} className="mt-6 w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white">
              {UI.close}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-white">{UI.premiumPassport}</h3>
                <p className="text-sm text-amber-300/80">€1.99 · Stripe / PayPal demo</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="h-4 w-4 text-cyan-400" />
                  {perk}
                </li>
              ))}
            </ul>
            {premium ? (
              <p className="mt-6 rounded-xl bg-emerald-500/10 py-3 text-center text-sm text-emerald-300">{UI.premiumOwned}</p>
            ) : (
              <button
                type="button"
                onClick={onPurchase}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-4 font-bold text-slate-900"
              >
                <CreditCard className="h-5 w-5" />
                {UI.buyPremium}
              </button>
            )}
            <p className="mt-3 flex items-center justify-center gap-1 text-[10px] text-slate-500">
              <Lock className="h-3 w-3" />
              Demo — no real payment processed
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
