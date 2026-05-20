import { useCallback, useState } from 'react'
import { EVENTS } from '../data/events'
import type { GameEvent, StatKey, Stats } from '../types/game'
import { INITIAL_STATS } from '../types/game'
import {
  applyEffects,
  getFailedStat,
  pickRandomEvent,
  shouldShowInterstitial,
} from '../utils/gameLogic'

export type GamePhase = 'playing' | 'gameover' | 'interstitial'

interface UseGameOptions {
  premium: boolean
}

export function useGame({ premium }: UseGameOptions) {
  const [day, setDay] = useState(1)
  const [stats, setStats] = useState<Stats>(INITIAL_STATS)
  const [event, setEvent] = useState<GameEvent>(() =>
    pickRandomEvent(EVENTS, new Set(), premium),
  )
  const [usedEventIds, setUsedEventIds] = useState<Set<string>>(new Set())
  const [phase, setPhase] = useState<GamePhase>('playing')
  const [failedStat, setFailedStat] = useState<StatKey | null>(null)
  const [savedSnapshot, setSavedSnapshot] = useState<{
    stats: Stats
    day: number
    event: GameEvent
    usedEventIds: Set<string>
  } | null>(null)

  const loadNextEvent = useCallback(
    (ids: Set<string>) => {
      const next = pickRandomEvent(EVENTS, ids, premium)
      setEvent(next)
      return next
    },
    [premium],
  )

  const makeChoice = useCallback(
    (choice: 'a' | 'b') => {
      const effects = choice === 'a' ? event.choiceA.effects : event.choiceB.effects
      const newStats = applyEffects(stats, effects)
      const fail = getFailedStat(newStats)

      const newUsed = new Set(usedEventIds)
      newUsed.add(event.id)
      setUsedEventIds(newUsed)
      setStats(newStats)

      if (fail) {
        setFailedStat(fail)
        setSavedSnapshot({ stats: newStats, day, event, usedEventIds: newUsed })
        setPhase('interstitial')
        return
      }

      const nextDay = day + 1
      setDay(nextDay)

      if (shouldShowInterstitial(nextDay, false)) {
        loadNextEvent(newUsed)
        setPhase('interstitial')
        return
      }

      loadNextEvent(newUsed)
    },
    [day, event, loadNextEvent, stats, usedEventIds],
  )

  const dismissInterstitial = useCallback(() => {
    if (failedStat) {
      setPhase('gameover')
    } else {
      setPhase('playing')
    }
  }, [failedStat])

  const secondLife = useCallback(() => {
    if (!savedSnapshot) return
    setStats(savedSnapshot.stats)
    setDay(savedSnapshot.day)
    setEvent(savedSnapshot.event)
    setUsedEventIds(savedSnapshot.usedEventIds)
    setFailedStat(null)
    setPhase('playing')
    setSavedSnapshot(null)
  }, [savedSnapshot])

  const restart = useCallback(() => {
    setDay(1)
    setStats(INITIAL_STATS)
    setUsedEventIds(new Set())
    setFailedStat(null)
    setSavedSnapshot(null)
    setPhase('playing')
    loadNextEvent(new Set())
  }, [loadNextEvent])

  return {
    day,
    stats,
    event,
    phase,
    failedStat,
    hasSecondLife: !!savedSnapshot && !!failedStat,
    makeChoice,
    dismissInterstitial,
    secondLife,
    restart,
  }
}
