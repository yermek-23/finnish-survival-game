import { motion } from 'framer-motion'
import { Check, CreditCard, Lock, Sparkles, X } from 'lucide-react'
import type { Locale } from '../types/game'
import { getUi } from '../i18n/ui'

interface PremiumStoreProps {
  locale: Locale
  premium: boolean
  showSuccess: boolean
  onClose: () => void
  onPurchase: () => void
  onCloseSuccess: () => void
}

export function PremiumStore({
  locale,
  premium,
  showSuccess,
  onClose,
  onPurchase,
  onCloseSuccess,
}: PremiumStoreProps) {
  const ui = getUi(locale)

  const perks = [
    locale === 'fi' ? 'Ei mainoksia' : locale === 'ru' ? 'Без рекламы' : 'No ads',
    locale === 'fi' ? 'Salainen premium-tapahtumat' : locale === 'ru' ? 'Секретные ивенты' : 'Secret premium events',
    locale === 'fi' ? 'Kunnia Muumi-status' : locale === 'ru' ? 'Статус Moomin' : 'Honorary Moomin badge',
  ]

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
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          aria-label={ui.close}
        >
          <X className="h-5 w-5" />
        </button>

        {showSuccess ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
              <Check className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{ui.premiumSuccess}</h3>
            <p className="mt-2 text-sm text-slate-400">{ui.premiumDemo}</p>
            <button
              type="button"
              onClick={onCloseSuccess}
              className="mt-6 w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white"
            >
              {ui.close}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-white">{ui.premiumPassport}</h3>
                <p className="text-sm text-amber-300/80">€1.99 · Stripe / PayPal demo</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                  {perk}
                </li>
              ))}
            </ul>

            {premium ? (
              <p className="mt-6 rounded-xl bg-emerald-500/10 py-3 text-center text-sm font-medium text-emerald-300">
                {ui.premiumOwned}
              </p>
            ) : (
              <button
                type="button"
                onClick={onPurchase}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-4 font-bold text-slate-900 shadow-lg"
              >
                <CreditCard className="h-5 w-5" />
                {ui.buyPremium}
              </button>
            )}

            <p className="mt-3 flex items-center justify-center gap-1 text-center text-[10px] text-slate-500">
              <Lock className="h-3 w-3" />
              Demo — no real payment processed
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
