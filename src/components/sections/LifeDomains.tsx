import { useEffect, useRef } from 'react'
import { lifeDomains } from '../../data/profile'
import { useScrollReveal } from '../../hooks/useScrollTrigger'
import { gsap } from '../../lib/gsap'
import { lazy, Suspense } from 'react'

const AmbientOrbs = lazy(() => import('../three/AmbientOrbs'))

export default function LifeDomains() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const cardsRef = useRef<Array<HTMLElement | null>>([])

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
    <section id="univers" ref={sectionRef} className="section-shell relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Suspense fallback={null}>
          <AmbientOrbs />
        </Suspense>
      </div>

      <div className="mx-auto relative z-10 w-full max-w-6xl">
        <p className="eyebrow">Au-dela du code</p>
        <h2 className="heading-xl mt-3">Des projets de terrain qui nourrissent ma vision produit.</h2>
        <p className="body-copy mt-5 max-w-[62ch]">
          Je developpe aussi des projets sportifs, evenementiels et de creation visuelle. Cette
          polyvalence renforce ma capacite a construire des experiences utiles, coherentes et
          memorables.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {lifeDomains.map((domain, index) => (
            <article
              key={domain.title}
              ref={(node) => {
                cardsRef.current[index] = node
              }}
              className="themed-card rounded-3xl border p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                {domain.category}
              </p>
              <h3 className="heading-lg mt-3">{domain.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{domain.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {domain.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs tracking-[0.08em] text-slate-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              {domain.link ? (
                <a
                  href={domain.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 hover:text-blue-500"
                >
                  Voir le canal
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
