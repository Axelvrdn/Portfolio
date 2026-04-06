import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

type RevealOptions = {
  y?: number
  duration?: number
  start?: string
  scrub?: boolean
}

export function useScrollReveal<T extends HTMLElement>({
  y = 40,
  duration = 1,
  start = 'top 80%',
  scrub = false,
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const target = ref.current

    const tween = gsap.fromTo(
      target,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target,
          start,
          once: !scrub,
          scrub,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [duration, scrub, start, y])

  return ref
}
