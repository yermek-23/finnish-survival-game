import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Locale } from './types/game'
import { useGame } from './hooks/useGame'
import { usePremium } from './hooks/usePremium'
import { Header } from './components/Header'
import { StatBar } from './components/StatBar'
import { EventCard } from './components/EventCard'
import { GameOverModal } from './components/GameOverModal'
import { InterstitialAd } from './components/InterstitialAd'
import { PremiumStore } from './components/PremiumStore'

function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const [storeOpen, setStoreOpen] = useState(false)
  const { premium, showSuccess, purchasePremium, closeSuccess } = usePremium()
  const game = useGame({ premium })

  const showAd =
    !premium && game.phase === 'interstitial'

  const showGameOver = game.phase === 'gameover' && game.failedStat

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#0a1628] text-slate-100">
      <Header
        locale={locale}
        onLocaleChange={setLocale}
        premium={premium}
        onOpenStore={() => setStoreOpen(true)}
      />

      <StatBar stats={game.stats} locale={locale} />

      {game.phase === 'playing' && (
        <EventCard
          key={game.event.id + game.day}
          event={game.event}
          day={game.day}
          locale={locale}
          onChoice={game.makeChoice}
        />
      )}

      {game.phase === 'interstitial' && !premium && (
        <div className="flex flex-1 items-center justify-center px-4 pb-8">
          <p className="animate-pulse text-sm text-slate-500">Loading next challenge...</p>
        </div>
      )}

      <AnimatePresence>
        {showAd && (
          <InterstitialAd
            key="interstitial"
            locale={locale}
            onClose={game.dismissInterstitial}
          />
        )}
      </AnimatePresence>

      {showGameOver && (
        <GameOverModal
          locale={locale}
          days={game.day}
          failedStat={game.failedStat!}
          premium={premium}
          hasSecondLife={game.hasSecondLife}
          onRestart={game.restart}
          onSecondLife={game.secondLife}
          onOpenStore={() => setStoreOpen(true)}
        />
      )}

      {storeOpen && (
        <PremiumStore
          locale={locale}
          premium={premium}
          showSuccess={showSuccess}
          onClose={() => setStoreOpen(false)}
          onPurchase={purchasePremium}
          onCloseSuccess={() => {
            closeSuccess()
            setStoreOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default App
