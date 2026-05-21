import { useCallback, useState } from 'react'
import { EVENTS } from '../data/events'
import type { GameEvent, StatKey, Stats } from '../types/game'
import { INITIAL_STATS } from '../types/game'
import {
  applyEffects,
  applyPanicPenalty,
  getFailedStat,
  pickRandomEvent,
  shouldShowInterstitial,
} from '../utils/gameLogic'

export type GamePhase = 'playing' | 'gameover' | 'interstitial'

interface UseGameOptions {
  premium: boolean
}

type Snapshot = {
  stats: Stats
  day: number
  usedEventIds: Set<string>
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
  const [panicFlash, setPanicFlash] = useState(false)
  const [savedSnapshot, setSavedSnapshot] = useState<Snapshot | null>(null)

  const loadNextEvent = useCallback(
    (ids: Set<string>) => {
      const next = pickRandomEvent(EVENTS, ids, premium)
      setEvent(next)
      return next
    },
    [premium],
  )

  const resolveTurn = useCallback(
    (newStats: Stats, currentDay: number, ids: Set<string>, eventId: string) => {
      const newUsed = new Set(ids)
      newUsed.add(eventId)
      setUsedEventIds(newUsed)
      setStats(newStats)

      const fail = getFailedStat(newStats)
      if (fail) {
        setFailedStat(fail)
        setSavedSnapshot({ stats: newStats, day: currentDay, usedEventIds: newUsed })
        setPhase('interstitial')
        return
      }

      const nextDay = currentDay + 1
      setDay(nextDay)

      if (shouldShowInterstitial(nextDay, false)) {
        loadNextEvent(newUsed)
        setPhase('interstitial')
        return
      }

      loadNextEvent(newUsed)
    },
    [loadNextEvent],
  )

  const makeChoice = useCallback(
    (choice: 'a' | 'b') => {
      if (phase !== 'playing' || panicFlash) return
      const effects = choice === 'a' ? event.choiceA.effects : event.choiceB.effects
      resolveTurn(applyEffects(stats, effects), day, usedEventIds, event.id)
    },
    [day, event, panicFlash, phase, resolveTurn, stats, usedEventIds],
  )

  const triggerPanic = useCallback(() => {
    if (phase !== 'playing' || panicFlash) return
    setPanicFlash(true)
    const penalized = applyPanicPenalty(stats)
    window.setTimeout(() => {
      setPanicFlash(false)
      resolveTurn(penalized, day, usedEventIds, event.id)
    }, 1400)
  }, [day, event.id, panicFlash, phase, resolveTurn, stats, usedEventIds])

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
    setUsedEventIds(savedSnapshot.usedEventIds)
    setFailedStat(null)
    setPhase('playing')
    setSavedSnapshot(null)
    loadNextEvent(savedSnapshot.usedEventIds)
  }, [loadNextEvent, savedSnapshot])

  const restart = useCallback(() => {
    setDay(1)
    setStats(INITIAL_STATS)
    setUsedEventIds(new Set())
    setFailedStat(null)
    setSavedSnapshot(null)
    setPanicFlash(false)
    setPhase('playing')
    loadNextEvent(new Set())
  }, [loadNextEvent])

  return {
    day,
    stats,
    event,
    phase,
    failedStat,
    panicFlash,
    hasSecondLife: !!savedSnapshot && !!failedStat,
    makeChoice,
    triggerPanic,
    dismissInterstitial,
    secondLife,
    restart,
  }
}
