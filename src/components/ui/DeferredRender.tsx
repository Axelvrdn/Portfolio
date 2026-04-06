import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type DeferredRenderProps = {
  children: ReactNode
  fallback: ReactNode
  className?: string
  rootMargin?: string
  delayMs?: number
}

export default function DeferredRender({
  children,
  fallback,
  className,
  rootMargin = '220px 0px',
  delayMs = 0,
}: DeferredRenderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  )

  useEffect(() => {
    if (isVisible) return

    const node = containerRef.current
    if (!node) return

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return

        const reveal = () => setIsVisible(true)
        if (delayMs > 0) {
          timeoutId = setTimeout(reveal, delayMs)
        } else {
          reveal()
        }

        observer.disconnect()
      },
      { rootMargin, threshold: 0.01 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [delayMs, isVisible, rootMargin])

  return <div ref={containerRef} className={className}>{isVisible ? children : fallback}</div>
}
