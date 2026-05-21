import { CULTURAL_EVENTS } from './culturalEvents'
import { CLASSIC_EVENTS } from './classicEvents'

export const EVENTS = [...CULTURAL_EVENTS, ...CLASSIC_EVENTS]

export const PREMIUM_EVENTS = EVENTS.filter((ev) => ev.premiumOnly)
