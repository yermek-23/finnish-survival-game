import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Locale } from '../types/game'
import { getUi, type UiBundle } from '../i18n/ui'
import { playerService, type PlayerProfile } from '../services/playerService'

interface AppContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  ui: UiBundle
  player: PlayerProfile | null
  setNickname: (nickname: string) => void
  clearPlayer: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

const LOCALE_KEY = 'finnish-survival-locale'

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null
    if (stored && ['en', 'fi', 'sv', 'ru'].includes(stored)) return stored
    return 'en'
  })
  const [player, setPlayer] = useState<PlayerProfile | null>(() => playerService.load())

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem(LOCALE_KEY, l)
  }, [])

  const setNickname = useCallback((nickname: string) => {
    const profile = playerService.save(nickname)
    setPlayer(profile)
    void playerService.syncToCloud(profile)
  }, [])

  const clearPlayer = useCallback(() => {
    playerService.clear()
    setPlayer(null)
  }, [])

  const ui = useMemo(() => getUi(locale), [locale])

  const value = useMemo(
    () => ({ locale, setLocale, ui, player, setNickname, clearPlayer }),
    [locale, setLocale, ui, player, setNickname, clearPlayer],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
