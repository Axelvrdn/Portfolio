import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { projects } from '../../data/profile'
import { useScrollReveal } from '../../hooks/useScrollTrigger'
import DeferredRender from '../ui/DeferredRender'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const ProjectPreview = lazy(() => import('../three/ProjectPreview'))

const accents = ['#2563eb', '#0ea5e9']

type ProjectFeatureProps = {
  title: string
  description: string
  tags: string[]
  highlights: string[]
  repository: string
  accent: string
  variant: 'phone' | 'laptop'
  reverse?: boolean
}

function ProjectFeature({
  title,
  description,
  tags,
  highlights,
  repository,
  accent,
  variant,
  reverse = false,
}: ProjectFeatureProps) {
  const blockRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  const isImmersiveShowcase = variant === 'phone' || variant === 'laptop'

  useEffect(() => {
    if (!blockRef.current) return

    let rafId = 0

    const trigger = ScrollTrigger.create({
      trigger: blockRef.current,
      start: 'top bottom',
      end: 'bottom top-=120',
      scrub: true,
      onUpdate: (self) => {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => setProgress(self.progress))
      },
    })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      trigger.kill()
    }
  }, [])

  useEffect(() => {
    if (!blockRef.current) return

    const tween = gsap.fromTo(
      blockRef.current,
      { autoAlpha: 0, y: 64 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: blockRef.current,
          start: 'top 86%',
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
    <article
      ref={blockRef}
      className={
        isImmersiveShowcase
          ? 'relative py-16 lg:min-h-[68vh] lg:py-24'
          : 'grid gap-8 border-b border-slate-200/80 py-16 last:border-b-0 lg:min-h-[68vh] lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-24'
      }
    >
      {isImmersiveShowcase ? (
        <div className="immersive-device-layer absolute inset-y-0 -left-[14vw] -right-[14vw] z-0">
          <Suspense fallback={<div className="h-full w-full bg-transparent" />}>
            <ProjectPreview accent={accent} variant={variant} scrollProgress={progress} />
          </Suspense>
        </div>
      ) : null}

      <div
        className={
          isImmersiveShowcase
            ? reverse
              ? 'relative z-10 ml-auto max-w-3xl space-y-0 lg:pl-[38%]'
              : 'relative z-10 max-w-3xl space-y-0 lg:pr-[38%]'
            : reverse
              ? 'lg:order-2 lg:pl-10'
              : 'lg:pr-10'
        }
      >
        <p className="eyebrow">Projet produit</p>
        <h3 className="mt-4 text-[clamp(2rem,4.1vw,4.3rem)] font-bold leading-[0.95] tracking-[-0.035em] text-slate-900">
          {title}
        </h3>
        <p className="body-copy mt-6 max-w-[52ch]">{description}</p>
        <ul className="mt-6 space-y-2 text-sm leading-relaxed text-slate-600">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <ul className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-slate-600"
            >
              {tag}
            </li>
          ))}
        </ul>
        <a
          href={repository}
          target="_blank"
          rel="noreferrer"
          className="project-repo-link cursor-reactive mt-5 inline-flex h-10 items-center justify-center rounded-full border px-4 text-xs font-semibold uppercase tracking-[0.12em]"
        >
          Explorer le projet
        </a>
      </div>

      {isImmersiveShowcase ? <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-slate-200/80" /> : null}

      {!isImmersiveShowcase ? (
        <DeferredRender
          className={
            reverse
              ? 'project-stage relative h-[360px] overflow-hidden rounded-[2rem] sm:h-[430px] lg:order-1'
              : 'project-stage relative h-[360px] overflow-hidden rounded-[2rem] sm:h-[430px]'
          }
          rootMargin="220px 0px"
          fallback={<div className="h-full w-full animate-pulse rounded-[2rem] bg-slate-200/70" />}
        >
          <div className="pointer-events-none absolute inset-x-12 bottom-5 h-20 rounded-full bg-slate-300/30 blur-2xl" />
          <Suspense fallback={<div className="h-full w-full animate-pulse rounded-[2rem] bg-slate-200/70" />}>
            <ProjectPreview accent={accent} variant={variant} scrollProgress={progress} />
          </Suspense>
        </DeferredRender>
      ) : null}
    </article>
  )
}

export default function Projects() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="projects" ref={sectionRef} className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-4xl">
          <p className="eyebrow">Etudes de cas</p>
          <h2 className="mt-3 text-[clamp(2.2rem,5.4vw,5.2rem)] font-black leading-[0.94] tracking-[-0.04em] text-slate-900">
            Produits concus pour
            <br />
            convaincre et performer.
          </h2>
          <p className="body-copy mt-6 max-w-[56ch]">
            Ces projets illustrent ma maniere de travailler: cadrage utilisateur, execution technique
            et presentation premium pour valoriser le produit autant que son impact.
          </p>
        </div>

        <div className="mt-12 px-6 sm:px-10">
          {projects.map((project, index) => (
            <ProjectFeature
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              highlights={project.highlights}
              repository={project.repository}
              accent={accents[index] ?? '#2563eb'}
              variant={index === 0 ? 'phone' : 'laptop'}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
