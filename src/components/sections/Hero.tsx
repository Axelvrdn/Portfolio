import { lazy, Suspense } from 'react'
import AnimatedText from '../ui/AnimatedText'
import MagneticButton from '../ui/MagneticButton'
import { useScrollReveal } from '../../hooks/useScrollTrigger'

const HeroScene = lazy(() => import('../three/HeroScene'))

const focusAreas = ['Developpement full-stack', 'Montage video', 'Contenu digital', 'Evenementiel & sport']

export default function Hero() {
  const ref = useScrollReveal<HTMLElement>({ y: 28, duration: 0.9, start: 'top 90%' })

  return (
    <section
      id="hero"
      ref={ref}
      className="section-shell hero-shell neon-focus--hero relative isolate overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="relative z-10 max-w-3xl space-y-7">
          <p className="eyebrow">Developpeur logiciel / Product builder</p>
          <AnimatedText text="Transformer les idees en produits qui performent." className="max-w-[15ch]" />
          <p className="body-copy">
            Je conçois et livre des experiences digitales claires, rapides et fiables. Mon approche
            combine exigence d&apos;ingenierie, sens produit et competences transverses pour creer des
            solutions vendeuses, utiles et memorables.
          </p>
          <ul className="flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600"
              >
                {area}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <MagneticButton label="Voir mes projets" href="#projects" />
            <MagneticButton label="Discuter d'une collaboration" href="#contact" variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  )
}
