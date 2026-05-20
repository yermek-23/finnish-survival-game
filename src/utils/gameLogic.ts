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
  const pool = events.filter((e) => {
    if (usedIds.has(e.id)) return false
    if (e.premiumOnly && !premium) return false
    return true
  })

  const source = pool.length > 0 ? pool : events.filter((e) => !e.premiumOnly || premium)
  const index = Math.floor(Math.random() * source.length)
  return source[index]!
}

export function shouldShowInterstitial(day: number, justEnded: boolean): boolean {
  if (justEnded) return true
  return day > 0 && day % 5 === 0
}
