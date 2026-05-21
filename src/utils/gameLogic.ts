import type { GameEvent, StatDelta, StatKey, Stats } from '../types/game'
import { STAT_MAX, STAT_MIN } from '../types/game'

export function applyEffects(stats: Stats, effects: StatDelta): Stats {
  const keys: StatKey[] = ['terveys', 'raha', 'mieli', 'sisu']
  const next = { ...stats }
  for (const key of keys) {
    const delta = effects[key] ?? 0
    next[key] = Math.max(STAT_MIN, Math.min(STAT_MAX, next[key] + delta))
  }
  return next
}

/** Panic penalty: -15% Sanity, -10% Health */
export function applyPanicPenalty(stats: Stats): Stats {
  return {
    ...stats,
    mieli: Math.max(STAT_MIN, Math.round(stats.mieli * 0.85)),
    terveys: Math.max(STAT_MIN, Math.round(stats.terveys * 0.9)),
  }
}

export function getFailedStat(stats: Stats): StatKey | null {
  const keys: StatKey[] = ['terveys', 'raha', 'mieli', 'sisu']
  for (const key of keys) {
    if (stats[key] <= STAT_MIN) return key
  }
  return null
}

export function pickRandomEvent(
  events: GameEvent[],
  usedIds: Set<string>,
  premium: boolean,
): GameEvent {
  const pool = events.filter((ev) => {
    if (usedIds.has(ev.id)) return false
    if (ev.premiumOnly && !premium) return false
    return true
  })

  const source = pool.length > 0 ? pool : events.filter((ev) => !ev.premiumOnly || premium)
  const index = Math.floor(Math.random() * source.length)
  return source[index]!
}

export function shouldShowInterstitial(day: number, justEnded: boolean): boolean {
  if (justEnded) return true
  return day > 0 && day % 5 === 0
}
