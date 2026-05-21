import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import { useGame } from './hooks/useGame'
import { usePremium } from './hooks/usePremium'
import { useBestScore } from './hooks/useBestScore'
import { Header } from './components/Header'
import { StatBar } from './components/StatBar'
import { EventCard } from './components/EventCard'
import { GameOverModal } from './components/GameOverModal'
import { InterstitialAd } from './components/InterstitialAd'
import { PaywallModal } from './components/PaywallModal'
import { NicknameScreen } from './components/NicknameScreen'
import { MainMenu } from './components/MainMenu'
import { leaderboardService } from './services/leaderboardService'

type Screen = 'welcome' | 'menu' | 'game'

function GameApp() {
  const { player, ui } = useApp()
  const [screen, setScreen] = useState<Screen>(() => (player ? 'menu' : 'welcome'))
  const { premium, purchasePremium, restorePurchase } = usePremium()
  const { bestDays, recordRun } = useBestScore()
  const game = useGame({ premium })

  const showAd = screen === 'game' && !premium && game.phase === 'interstitial'
  const showGameOver = screen === 'game' && game.phase === 'gameover' && game.failedStat
  const showPaywall = screen === 'game' && game.phase === 'paywall' && !premium

  useEffect(() => {
    if (showGameOver && player) {
      recordRun(game.day)
      void leaderboardService.submitScore(player.nickname, game.day)
    }
  }, [showGameOver, game.day, player, recordRun])

  const goMenu = () => {
    setScreen('menu')
    game.restart()
  }

  const handleUnlock = () => {
    purchasePremium()
    game.continueAfterPaywall()
  }

  const handleRestore = () => {
    if (restorePurchase()) game.continueAfterPaywall()
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-[#060d18] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.07)_0%,_transparent_55%)]" />

      {screen === 'welcome' && (
        <NicknameScreen onContinue={() => setScreen('menu')} />
      )}

      {screen === 'menu' && player && (
        <MainMenu
          bestDays={bestDays}
          premium={premium}
          onStart={() => {
            game.restart()
            setScreen('game')
          }}
          onOpenStore={handleUnlock}
        />
      )}

      {screen === 'game' && player && (
        <>
          <Header day={game.day} premium={premium} onOpenStore={handleUnlock} onMainMenu={goMenu} />
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
              <p className="animate-pulse text-sm text-slate-500">{ui.loadingNext}</p>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {showAd && <InterstitialAd key="ad" onClose={game.dismissInterstitial} />}
      </AnimatePresence>

      {showPaywall && (
        <PaywallModal days={game.day} onUnlock={handleUnlock} onRestore={handleRestore} />
      )}

      {showGameOver && (
        <GameOverModal
          days={game.day}
          failedStat={game.failedStat!}
          premium={premium}
          hasSecondLife={game.hasSecondLife}
          onRestart={() => {
            recordRun(game.day)
            game.restart()
          }}
          onSecondLife={game.secondLife}
          onMainMenu={goMenu}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <GameApp />
    </AppProvider>
  )
}
