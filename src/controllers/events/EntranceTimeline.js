import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Keeps the entrance quiet: a one-time reveal, then a restrained upward drift
 * which creates space for the first exhibit without introducing it yet.
 */
export function createEntranceTimeline({ section, heading, statement, metadata, poster }) {
  if (!section || !heading || !statement || !metadata) return null

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const context = gsap.context(() => {
    if (reduceMotion) return

    const reveal = gsap.timeline({ defaults: { ease: 'power1.inOut' } })
    reveal
      .fromTo(section, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
      .fromTo(heading, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1.65 }, 0.28)
      .fromTo(statement, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 1.35 }, 0.62)
      .fromTo(metadata, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.82)

    if (poster) {
      reveal.fromTo(poster, { autoAlpha: 0, scale: 0.985 }, { autoAlpha: 1, scale: 1, duration: 2.6 }, 0.12)
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
    })
      .to([heading, statement, metadata], { yPercent: -7, ease: 'none' }, 0)
      .to(poster, { yPercent: -1, scale: 1.005, ease: 'none' }, 0)
  }, section)

  return context
}
