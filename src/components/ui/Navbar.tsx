import type { MouseEvent } from 'react'
import { navItems } from '../../data/profile'
import { useTheme } from '../../hooks/useTheme'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()

  const onCursorMove = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    event.currentTarget.style.setProperty('--cursor-x', `${x}px`)
    event.currentTarget.style.setProperty('--cursor-y', `${y}px`)
  }

  return (
    <header className="app-nav fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#hero"
          onMouseMove={onCursorMove}
          className="cursor-reactive text-sm font-semibold uppercase tracking-[0.3em] text-slate-900"
        >
          Axel Verdon
        </a>

        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onMouseMove={onCursorMove}
                  className="cursor-reactive text-xs uppercase tracking-[0.18em] text-slate-500 transition hover:text-slate-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            onMouseMove={onCursorMove}
            className="theme-toggle cursor-reactive inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-300 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
            aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
          >
            <span className="theme-toggle-icons" aria-hidden>
              <svg
                viewBox="0 0 24 24"
                className={`theme-icon ${isDark ? 'theme-icon--sun-in' : 'theme-icon--sun-out'}`}
              >
                <circle cx="12" cy="12" r="4.2" fill="currentColor" />
                <path
                  d="M12 2.5V5.1M12 18.9v2.6M4.9 4.9l1.9 1.9M17.2 17.2l1.9 1.9M2.5 12h2.6M18.9 12h2.6M4.9 19.1l1.9-1.9M17.2 6.8l1.9-1.9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                className={`theme-icon ${isDark ? 'theme-icon--moon-out' : 'theme-icon--moon-in'}`}
              >
                <path
                  d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.7 6.7 0 1 0 10.2 10.2Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span>{isDark ? 'Clair' : 'Sombre'}</span>
          </button>
        </div>

      </nav>
    </header>
  )
}
