import { useEffect, useRef } from 'react'
import { capabilityTracks } from '../../data/profile'
import { useScrollReveal } from '../../hooks/useScrollTrigger'
import { gsap } from '../../lib/gsap'

export default function Skills() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const cardsRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const nodes = cardsRef.current.filter(Boolean)
    if (!nodes.length) return

    const tween = gsap.fromTo(
      nodes,
      { autoAlpha: 0, y: 32 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.14,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: nodes[0],
          start: 'top 82%',
          once: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow">Expertises</p>
        <h2 className="heading-xl mt-3">Profil hybride, execution complete.</h2>
        <p className="body-copy mt-5 max-w-[60ch]">
          Je construis des produits solides en combinant expertise technique, sensibilite produit et
          competences transverses issues du contenu digital, de l&apos;evenementiel et du sport.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {capabilityTracks.map((group, index) => (
            <div
              key={group.title}
              ref={(node) => {
                cardsRef.current[index] = node
              }}
              className="themed-card group rounded-3xl border p-6 transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)]"
            >
              <h3 className="heading-lg">{group.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{group.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs tracking-[0.08em] text-slate-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
