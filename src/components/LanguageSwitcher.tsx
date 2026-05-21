import { Globe } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LOCALES } from '../i18n/ui'

export function LanguageSwitcher() {
  const { locale, setLocale } = useApp()

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-cyan-500/30 bg-slate-900/90 p-0.5 shadow-lg shadow-cyan-500/5"
      role="group"
      aria-label="Language"
    >
      <Globe className="ml-1.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLocale(l.code)}
          className={`min-w-[2rem] rounded-full px-2 py-1 text-[11px] font-bold transition ${
            locale === l.code
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
              : 'text-slate-400 hover:text-cyan-200'
          }`}
          aria-pressed={locale === l.code}
          title={l.label}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
