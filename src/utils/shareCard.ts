import type { Locale } from '../types/game'
import { getTitle } from '../i18n/ui'

export function buildShareText(locale: Locale, days: number, template: string): string {
  const title = getTitle(locale, days)
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://finnish-survival.game'
  return `${template.replace('{days}', String(days)).replace('{title}', title)}\n\n${siteUrl}`
}

export async function shareResult(
  locale: Locale,
  days: number,
  shareTemplate: string,
): Promise<{ copied: boolean; shared: boolean }> {
  const text = buildShareText(locale, days, shareTemplate)
  let shared = false
  let copied = false

  try {
    if (navigator.share) {
      await navigator.share({ title: 'Finnish Survival', text })
      shared = true
    }
  } catch {
    /* fallback */
  }

  if (!shared) {
    try {
      await navigator.clipboard.writeText(text)
      copied = true
    } catch {
      /* ignore */
    }
  }

  return { copied, shared }
}
