import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'finnish-survival-premium'

export function usePremium() {
  const [premium, setPremium] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    setPremium(localStorage.getItem(STORAGE_KEY) === '1')
  }, [])

  const purchasePremium = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, '1')
    setPremium(true)
    setShowSuccess(true)
  }, [])

  const restorePurchase = useCallback((): boolean => {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      setPremium(true)
      return true
    }
    return false
  }, [])

  const closeSuccess = useCallback(() => setShowSuccess(false), [])

  return { premium, showSuccess, purchasePremium, restorePurchase, closeSuccess }
}
