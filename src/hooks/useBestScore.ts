import { useCallback, useEffect, useState } from 'react'

const KEY = 'finnish-survival-best-days'

export function useBestScore() {
  const [bestDays, setBestDays] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem(KEY)
    if (stored) setBestDays(Number.parseInt(stored, 10) || 0)
  }, [])

  const recordRun = useCallback((days: number) => {
    setBestDays((prev) => {
      if (days <= prev) return prev
      localStorage.setItem(KEY, String(days))
      return days
    })
  }, [])

  return { bestDays, recordRun }
}
