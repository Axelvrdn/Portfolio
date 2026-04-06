import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'

type AnimatedTextProps = {
  text: string
  className?: string
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null)
  const words = useMemo(() => text.split(' '), [text])

  useEffect(() => {
    if (!containerRef.current) return

    const targets = containerRef.current.querySelectorAll('[data-word]')
    const tween = gsap.fromTo(
      targets,
      { autoAlpha: 0, yPercent: 120 },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.06,
        delay: 0.1,
      },
    )

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <h1
      ref={containerRef}
      className={`heading-display ${className}`}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-3 inline-block overflow-hidden">
          <span data-word className="inline-block">
            {word}
          </span>
        </span>
      ))}
    </h1>
  )
}
