import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function Vision() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const quoteRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    if (!sectionRef.current || !quoteRef.current) return

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        end: 'bottom 30%',
        scrub: true,
      },
    })

    timeline
      .fromTo(
        quoteRef.current,
        { y: 70, autoAlpha: 0.2, scale: 0.97 },
        { y: 0, autoAlpha: 1, scale: 1, ease: 'none' },
      )
      .to(quoteRef.current, { y: -24, ease: 'none' })

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, [])

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="section-shell vision-shell neon-focus--vision px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow">Vision</p>
        <h2 ref={quoteRef} className="heading-xl mt-5 max-w-4xl sm:text-[4rem]">
          Le code est mon socle, l'impact est mon objectif.
        </h2>
        <p className="body-copy mt-6">
          Je developpe un profil complet : ingenierie logicielle, execution produit, communication
          visuelle et organisation terrain. Le montage video, le contenu internet, l&apos;evenementiel et
          le sport renforcent ma capacite a produire vite, bien, et avec une narration claire.
        </p>
      </div>
    </section>
  )
}
