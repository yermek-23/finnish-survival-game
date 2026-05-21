import { Home, Sparkles } from 'lucide-react'
import { UI } from '../copy/strings'

interface HeaderProps {
  day: number
  premium: boolean
  onOpenStore: () => void
  onMainMenu?: () => void
}

export function Header({ day, premium, onOpenStore, onMainMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-cyan-500/20 bg-[#0a1628]/95 px-4 py-2.5 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-cyan-300">{UI.appTitle}</h1>
          <p className="text-[10px] text-slate-500">
            {UI.day} {day} · 5s per choice
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {onMainMenu && (
            <button
              type="button"
              onClick={onMainMenu}
              className="rounded-full border border-slate-600 p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label={UI.mainMenu}
            >
              <Home className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onOpenStore}
            className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-300"
            aria-label={UI.premiumPassport}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {premium ? '★' : '€'}
          </button>
        </div>
      </div>
    </header>
  )
}
