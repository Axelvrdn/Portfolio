import { useEffect, useState } from 'react'

type Adaptive3D = {
  isLite: boolean
  dpr: [number, number]
}

const defaultState: Adaptive3D = {
  isLite: false,
  dpr: [1, 1.6],
}

function getAdaptiveState(): Adaptive3D {
  if (typeof window === 'undefined') return defaultState

  const isSmallScreen = window.matchMedia('(max-width: 900px)').matches
  const isTouchFirst = window.matchMedia('(pointer: coarse)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isLite = isSmallScreen || isTouchFirst || prefersReducedMotion

  return {
    isLite,
    dpr: isLite ? [1, 1.2] : [1, 1.8],
  }
}

export function useAdaptive3D() {
  const [state, setState] = useState<Adaptive3D>(() => getAdaptiveState())

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia('(max-width: 900px)'),
      window.matchMedia('(pointer: coarse)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ]

    const onChange = () => setState(getAdaptiveState())
    mediaQueries.forEach((query) => query.addEventListener('change', onChange))

    return () => {
      mediaQueries.forEach((query) => query.removeEventListener('change', onChange))
    }
  }, [])

  return state
}
