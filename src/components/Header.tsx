import { Home, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LanguageSwitcher } from './LanguageSwitcher'

interface HeaderProps {
  day: number
  premium: boolean
  onOpenStore: () => void
  onMainMenu: () => void
}

export function Header({ day, premium, onOpenStore, onMainMenu }: HeaderProps) {
  const { ui, player } = useApp()

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-500/20 bg-[#060d18]/95 px-3 py-2 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-cyan-300">{player?.nickname}</p>
          <p className="text-[10px] text-slate-500">
            {ui.day} {day} · 10s
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={onMainMenu}
            className="rounded-full border border-slate-600 p-1.5 text-slate-400 hover:text-white"
            aria-label={ui.mainMenu}
          >
            <Home className="h-4 w-4" />
          </button>
          {!premium && (
            <button
              type="button"
              onClick={onOpenStore}
              className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-1.5 text-xs font-bold text-amber-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
