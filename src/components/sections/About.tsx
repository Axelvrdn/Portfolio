import { lazy, Suspense, useEffect, useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollTrigger'

const SkillsOrb = lazy(() => import('../three/SkillsOrb'))

const stats = [
  { label: 'Technologies maitrisees', value: 9 },
  { label: 'Projets produits en cours', value: 2 },
  { label: "Annees d'ingenierie", value: 3 },
]

const crossDomainSkills = [
  'Montage video pour valoriser les livrables',
  'Creation de contenu pour rendre la technique lisible',
  'Organisation evenementielle et coordination d equipe',
  'Discipline sportive au service de la regularite',
]

export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40 })
  const countersRef = useRef<Array<HTMLParagraphElement | null>>([])
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const nodes = countersRef.current.filter(Boolean) as HTMLParagraphElement[]
    if (!nodes.length) return
    const duration = 1200

    const animateCounters = () => {
      if (hasAnimatedRef.current) return
      hasAnimatedRef.current = true

      const startTime = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)

        nodes.forEach((node, index) => {
          const target = stats[index]?.value ?? 0
          const value = Math.round(target * eased)
          node.textContent = `${value}+`
        })

        if (progress < 1) {
          requestAnimationFrame(tick)
        }
      }

      requestAnimationFrame(tick)
    }

    const firstNode = nodes[0]
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        animateCounters()
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(firstNode)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-shell relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-full lg:w-1/2">
        <Suspense fallback={null}>
          <SkillsOrb />
        </Suspense>
      </div>

      <div className="mx-auto relative z-10 grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 lg:pr-12">
          <p className="eyebrow">Profil</p>
          <h2 className="heading-xl">Ingenierie, code et progression.</h2>
          <p className="body-copy">
            Etudiant ingenieur specialise en developpement logiciel, je construis des produits web et
            full-stack pour des usages concrets. Je combine rigueur technique, sens business et
            execution rapide pour transformer une idee en resultat exploitable.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <article
                key={stat.label}
                className="themed-card rounded-2xl border p-4"
              >
                <p
                  ref={(node) => {
                    countersRef.current[index] = node
                  }}
                  className="text-2xl font-black text-slate-900 sm:text-3xl"
                >
                  0+
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{stat.label}</p>
              </article>
            ))}
          </div>
          <div className="themed-card rounded-2xl border p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Soft skills operationnels
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {crossDomainSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
