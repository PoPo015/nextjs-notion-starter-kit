import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'darkMode'

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        setIsDarkMode(stored === 'true')
      } else if (window.matchMedia) {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.classList.toggle('dark-mode', isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  return {
    isDarkMode,
    toggleDarkMode
  }
}
