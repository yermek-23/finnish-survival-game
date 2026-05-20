export type StatKey = 'terveys' | 'raha' | 'mieli' | 'sisu'

export type Locale = 'en' | 'fi' | 'ru'

export interface LocalizedText {
  en: string
  fi: string
  ru: string
}

export interface StatDelta {
  terveys?: number
  raha?: number
  mieli?: number
  sisu?: number
}

export interface Choice {
  label: LocalizedText
  effects: StatDelta
}

export interface GameEvent {
  id: string
  text: LocalizedText
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
export const INTERSTITIAL_EVERY_DAYS = 5
