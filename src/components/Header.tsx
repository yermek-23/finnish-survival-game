import { Globe, Sparkles } from 'lucide-react'
import type { Locale } from '../types/game'
import { getUi } from '../i18n/ui'

interface HeaderProps {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  premium: boolean
  onOpenStore: () => void
}

const locales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fi', label: 'FI' },
  { code: 'ru', label: 'RU' },
]

export function Header({ locale, onLocaleChange, premium, onOpenStore }: HeaderProps) {
  const ui = getUi(locale)

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-500/20 bg-[#0a1628]/90 px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight text-cyan-300">
            {ui.appTitle}
          </h1>
          <p className="truncate text-xs text-slate-400">{ui.appSubtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onOpenStore}
            className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/20"
            aria-label={ui.premiumPassport}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {premium ? '★' : '€'}
          </button>
          <div
            className="flex items-center gap-0.5 rounded-full border border-cyan-500/30 bg-slate-900/80 p-0.5"
            role="group"
            aria-label={ui.language}
          >
            <Globe className="ml-1.5 h-3.5 w-3.5 text-cyan-400" />
            {locales.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => onLocaleChange(l.code)}
                className={`rounded-full px-2 py-1 text-xs font-semibold transition ${
                  locale === l.code
                    ? 'bg-cyan-500 text-slate-900'
                    : 'text-slate-400 hover:text-cyan-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
