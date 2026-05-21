import { useEffect, useRef, useState } from 'react'

const TICK_MS = 50

export function useActionTimer(
  durationMs: number,
  active: boolean,
  resetKey: string,
  onExpire: () => void,
) {
  const [progress, setProgress] = useState(1)
  const firedRef = useRef(false)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    firedRef.current = false
    setProgress(1)
    if (!active) return

    const start = performance.now()

    const id = window.setInterval(() => {
      const elapsed = performance.now() - start
      const remaining = Math.max(0, 1 - elapsed / durationMs)
      setProgress(remaining)

      if (remaining <= 0 && !firedRef.current) {
        firedRef.current = true
        onExpireRef.current()
      }
    }, TICK_MS)

    return () => clearInterval(id)
  }, [durationMs, active, resetKey])

  const secondsLeft = Math.ceil(progress * (durationMs / 1000))

  return { progress, secondsLeft, urgent: progress < 0.35 }
}
