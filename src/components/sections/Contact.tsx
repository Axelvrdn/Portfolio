import type { MouseEvent } from 'react'
import { socialLinks } from '../../data/profile'
import { useScrollReveal } from '../../hooks/useScrollTrigger'

export default function Contact() {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 36 })

  const onCursorMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    event.currentTarget.style.setProperty('--cursor-x', `${x}px`)
    event.currentTarget.style.setProperty('--cursor-y', `${y}px`)
  }

  return (
    <section id="contact" ref={sectionRef} className="px-4 pb-20 pt-16 sm:px-6 lg:px-8">
      <div className="themed-card mx-auto w-full max-w-6xl rounded-3xl border p-8 sm:p-12">
        <p className="eyebrow">Contact</p>
        <h2 className="heading-xl mt-4 max-w-3xl">Construisons un produit qui met votre idee en valeur.</h2>
        <p className="body-copy mt-4">
          Disponible pour des missions, alternances et collaborations autour du developpement
          logiciel, du produit digital et de la valorisation de contenu technique.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onMouseMove={onCursorMove}
                className="cursor-reactive inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
