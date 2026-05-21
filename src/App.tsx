import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGame } from './hooks/useGame'
import { usePremium } from './hooks/usePremium'
import { useBestScore } from './hooks/useBestScore'
import { Header } from './components/Header'
import { StatBar } from './components/StatBar'
import { EventCard } from './components/EventCard'
import { GameOverModal } from './components/GameOverModal'
import { InterstitialAd } from './components/InterstitialAd'
import { PremiumStore } from './components/PremiumStore'
import { MainMenu } from './components/MainMenu'

type Screen = 'menu' | 'game'

function App() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [storeOpen, setStoreOpen] = useState(false)
  const { premium, showSuccess, purchasePremium, closeSuccess } = usePremium()
  const { bestDays, recordRun } = useBestScore()
  const game = useGame({ premium })

  const showAd = screen === 'game' && !premium && game.phase === 'interstitial'
  const showGameOver = screen === 'game' && game.phase === 'gameover' && game.failedStat

  useEffect(() => {
    if (showGameOver) recordRun(game.day)
  }, [showGameOver, game.day, recordRun])

  const handleStart = () => {
    game.restart()
    setScreen('game')
  }

  const handleGameOverMenu = () => {
    if (game.failedStat) recordRun(game.day)
    setScreen('menu')
    game.restart()
  }

  const handleRestart = () => {
    recordRun(game.day)
    game.restart()
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#060d18] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.08)_0%,_transparent_55%)]" />

      {screen === 'menu' && (
        <MainMenu
          bestDays={bestDays}
          premium={premium}
          onStart={handleStart}
          onOpenStore={() => setStoreOpen(true)}
        />
      )}

      {screen === 'game' && (
        <>
          <Header
            day={game.day}
            premium={premium}
            onOpenStore={() => setStoreOpen(true)}
            onMainMenu={handleGameOverMenu}
          />
          <StatBar stats={game.stats} />

          {game.phase === 'playing' && (
            <EventCard
              key={`${game.event.id}-${game.day}`}
              event={game.event}
              day={game.day}
              disabled={false}
              panicFlash={game.panicFlash}
              onChoice={game.makeChoice}
              onPanic={game.triggerPanic}
            />
          )}

          {game.phase === 'interstitial' && !premium && (
            <div className="flex flex-1 items-center justify-center px-4 pb-8">
              <p className="animate-pulse text-sm text-slate-500">Next Finnish chaos loading...</p>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {showAd && <InterstitialAd key="ad" onClose={game.dismissInterstitial} />}
      </AnimatePresence>

      {showGameOver && (
        <GameOverModal
          days={game.day}
          failedStat={game.failedStat!}
          premium={premium}
          hasSecondLife={game.hasSecondLife}
          onRestart={handleRestart}
          onSecondLife={game.secondLife}
          onOpenStore={() => setStoreOpen(true)}
          onMainMenu={handleGameOverMenu}
        />
      )}

      {storeOpen && (
        <PremiumStore
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
