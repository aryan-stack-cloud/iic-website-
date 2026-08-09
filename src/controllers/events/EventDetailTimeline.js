import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function createEventDetailTimeline(page) {
  if (!page) return () => {}
  const context = gsap.context(() => gsap.fromTo('.event-detail__camera', { autoAlpha: 0, scale: .88, y: 24 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }), page)
  ScrollTrigger.refresh()
  return () => context.revert()
}
