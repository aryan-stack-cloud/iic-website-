import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function createEventsPageTimeline(page) {
  if (!page) return () => {}
  const context = gsap.context(() => {
    gsap.fromTo('.events-hero__axis', { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: 'power3.out' })
    gsap.fromTo('.events-hero h1, .events-hero__intro', { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, stagger: .12, duration: .8, delay: .25, ease: 'power3.out' })
    gsap.utils.toArray('.events-journey, .featured-experience, .living-archive, .event-explorer', page).forEach((section) => gsap.fromTo(section, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 84%', end: 'top 58%', scrub: 1.1 } }))
    gsap.utils.toArray('.event-environment', page).forEach((environment) => gsap.fromTo(environment, { autoAlpha: 0, y: 42, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: environment, start: 'top 88%', end: 'top 52%', scrub: 1.1 } }))
  }, page)
  ScrollTrigger.refresh()
  return () => context.revert()
}
