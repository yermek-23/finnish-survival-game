import type { GameEvent, StatDelta } from '../types/game'
import { L } from '../i18n/translate'

export function ev(
  id: string,
  text: [string, string, string, string],
  aLabel: [string, string, string, string],
  aFx: StatDelta,
  bLabel: [string, string, string, string],
  bFx: StatDelta,
  premiumOnly?: boolean,
): GameEvent {
  return {
    id,
    text: L(...text),
    choiceA: { label: L(...aLabel), effects: aFx },
    choiceB: { label: L(...bLabel), effects: bFx },
    premiumOnly,
  }
}
