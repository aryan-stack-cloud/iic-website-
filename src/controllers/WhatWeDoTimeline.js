import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Draws the ecosystem into view without imposing a chronological route. */
export function createWhatWeDoTimeline(section) {
  if (!section) return () => {}

  const context = gsap.context(() => {
    const edges = gsap.utils.toArray('.what-we-do__edge', section)
    const nodes = gsap.utils.toArray('.activity-node', section)

    gsap.set(edges, { strokeDasharray: 1, strokeDashoffset: 1 })
    gsap.set(nodes, { autoAlpha: 0, scale: 0.86 })

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        end: 'bottom 56%',
        scrub: 1.1,
        invalidateOnRefresh: true,
      },
    })

    timeline
      .fromTo('.what-we-do__eyebrow, .what-we-do__title, .what-we-do__intro', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.24 }, 0)
      .to(edges, { strokeDashoffset: 0, stagger: 0.025, duration: 0.56 }, 0.08)
      .to(nodes, { autoAlpha: 1, scale: 1, stagger: 0.025, duration: 0.48 }, 0.12)
      .to('.what-we-do__title', { x: '-22vw', y: '16vh', scale: 0.62, autoAlpha: 0.2, duration: 0.46 }, 0.43)
      .fromTo('.what-we-do__legend', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.18 }, 0.62)
  }, section)

  ScrollTrigger.refresh()
  return () => context.revert()
}
