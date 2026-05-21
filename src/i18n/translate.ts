import type { Locale, LocalizedText } from '../types/game'

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en
}

export function L(en: string, fi: string, sv: string, ru: string): LocalizedText {
  return { en, fi, sv, ru }
}
