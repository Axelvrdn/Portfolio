import { useRef } from 'react'
import type { MouseEvent } from 'react'

type MagneticButtonProps = {
  label: string
  href: string
  variant?: 'primary' | 'ghost'
}

export default function MagneticButton({
  label,
  href,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cursorX = event.clientX - rect.left
    const cursorY = event.clientY - rect.top
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16
    const y = (event.clientY - rect.top - rect.height / 2) * 0.16
    ref.current.style.setProperty('--cursor-x', `${cursorX}px`)
    ref.current.style.setProperty('--cursor-y', `${cursorY}px`)
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate3d(0, 0, 0)'
  }

  const styles =
    variant === 'primary'
      ? 'btn-primary-theme hover:shadow-[0_0_24px_rgba(37,99,235,0.35)]'
      : 'btn-ghost-theme'

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`cursor-reactive inline-flex h-11 items-center justify-center rounded-full border px-5 text-xs font-semibold uppercase tracking-[0.16em] shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition duration-300 ${styles}`}
    >
      {label}
    </a>
  )
}
