export type StatKey = 'terveys' | 'raha' | 'mieli' | 'sisu'

export interface StatDelta {
  terveys?: number
  raha?: number
  mieli?: number
  sisu?: number
}

export interface Choice {
  label: string
  effects: StatDelta
}

export interface GameEvent {
  id: string
  text: string
  choiceA: Choice
  choiceB: Choice
  premiumOnly?: boolean
}

export interface Stats {
  terveys: number
  raha: number
  mieli: number
  sisu: number
}

export const INITIAL_STATS: Stats = {
  terveys: 70,
  raha: 60,
  mieli: 65,
  sisu: 55,
}

export const STAT_MAX = 100
export const STAT_MIN = 0
export const ACTION_TIMER_MS = 5000
