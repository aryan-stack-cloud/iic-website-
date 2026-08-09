import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Portrait-first sequencing: presence arrives before the words attached to it. */
export function createLeadershipTimeline(section) {
  if (!section) return () => {}

  const context = gsap.context(() => {
    const chapters = gsap.utils.toArray('.leader-chapter', section)
    chapters.forEach((chapter, index) => {
      const portrait = chapter.querySelector('.leader-chapter__portrait-wrap')
      const quote = chapter.querySelector('.leader-chapter__quote')
      const identity = chapter.querySelector('.leader-chapter__identity')
      const insight = chapter.querySelector('.leader-chapter__insight')
      const project = chapter.querySelector('.leader-chapter__project')
      const links = chapter.querySelector('.leader-chapter__links')
      gsap.set(portrait, { autoAlpha: 0, scale: .94 })
      gsap.set([quote, identity, insight, project, links].filter(Boolean), { autoAlpha: 0, y: 22 })

      gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: { trigger: chapter, start: 'top 76%', end: 'bottom 25%', scrub: 1.1, invalidateOnRefresh: true },
      })
        .to(portrait, { autoAlpha: 1, scale: 1, duration: .28 }, 0)
        .to(quote, { autoAlpha: 1, y: 0, duration: .2 }, .22)
        .to(identity, { autoAlpha: 1, y: 0, duration: .16 }, .39)
        .to(insight, { autoAlpha: 1, y: 0, duration: .14 }, .51)
        .to(project, { autoAlpha: 1, y: 0, duration: .14 }, .57)
        .to(links, { autoAlpha: .55, y: 0, duration: .12 }, .64)

      gsap.to(portrait, { yPercent: index % 2 ? -3 : 3, ease: 'none', scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true } })
    })

    const handoff = section.querySelector('.leadership__gallery-handoff')
    const finalPortrait = chapters.at(-1)?.querySelector('.leader-chapter__portrait')
    if (handoff && finalPortrait) {
      gsap.timeline({ scrollTrigger: { trigger: handoff, start: 'top 78%', end: 'bottom 36%', scrub: 1.1 } })
        .to(finalPortrait, { filter: 'blur(9px)', opacity: .24, scale: 1.12, duration: .4 })
        .to(handoff, { autoAlpha: 1, duration: .36 }, .18)
        .to('.leadership__gallery-handoff i', { scaleX: 1, duration: .24 }, .42)
    }
  }, section)

  ScrollTrigger.refresh()
  return () => context.revert()
}
