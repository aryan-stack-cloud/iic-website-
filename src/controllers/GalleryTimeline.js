import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Reveals memories as a calm accumulation rather than a single gallery load. */
export function createGalleryTimeline(section) {
  if (!section) return () => {}

  const context = gsap.context(() => {
    const frames = gsap.utils.toArray('.memory-frame', section)
    frames.forEach((frame) => {
      const depth = frame.classList.contains('memory-frame--near') ? 1 : frame.classList.contains('memory-frame--far') ? .78 : .9
      gsap.set(frame, { autoAlpha: 0, y: 34, scale: depth })
      gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 88%', end: 'top 54%', scrub: 1.1, invalidateOnRefresh: true } })
        .to(frame, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' })
    })

    const handoff = section.querySelector('.gallery__handoff')
    if (handoff) {
      gsap.fromTo(handoff, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'power2.out', scrollTrigger: { trigger: handoff, start: 'top 82%', end: 'top 48%', scrub: 1.1 } })
      gsap.fromTo('.gallery__empty-frame', { scale: .86, filter: 'blur(3px)' }, { scale: 1, filter: 'blur(0)', duration: .6, ease: 'power2.out', scrollTrigger: { trigger: handoff, start: 'top 78%', end: 'top 42%', scrub: 1.1 } })
    }
  }, section)

  ScrollTrigger.refresh()
  return () => context.revert()
}
