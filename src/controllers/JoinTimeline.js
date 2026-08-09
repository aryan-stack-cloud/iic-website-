import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** A quiet, type-led ending. The frame arrives before the invitation. */
export function createJoinTimeline(section) {
  if (!section) return () => {}
  const context = gsap.context(() => {
    const frame = section.querySelector('.join-iic__frame')
    const firstLine = section.querySelector('.join-iic__line--first')
    const secondLine = section.querySelector('.join-iic__line--second')
    const principles = gsap.utils.toArray('.join-principle', section)
    const cta = section.querySelector('.join-iic__cta')

    gsap.set([frame, firstLine, secondLine, ...principles, cta], { autoAlpha: 0 })
    gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: { trigger: section, start: 'top 78%', end: 'bottom 42%', scrub: 1.1, invalidateOnRefresh: true },
    })
      .to(frame, { autoAlpha: 1, scale: 1, duration: .32 }, 0)
      .to(firstLine, { autoAlpha: 1, y: 0, duration: .22 }, .28)
      .to(secondLine, { autoAlpha: 1, y: 0, duration: .24 }, .55)
      .to(principles, { autoAlpha: .5, y: 0, stagger: .04, duration: .18 }, .76)
      .to(cta, { autoAlpha: 1, y: 0, duration: .22 }, .91)
  }, section)
  ScrollTrigger.refresh()
  return () => context.revert()
}
