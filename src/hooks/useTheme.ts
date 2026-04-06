import { useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const storedTheme = window.localStorage.getItem('portfolio-theme')
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const isDark = theme === 'dark'

  const toggleTheme = useMemo(() => {
    return () => {
      setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
    }
  }, [])

  return { theme, isDark, toggleTheme }
}
