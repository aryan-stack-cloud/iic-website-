import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Gives each event its own pace while preserving a single continuous chapter. */
export function createFlagshipEventsTimeline(section) {
  if (!section) return () => {}

  const context = gsap.context(() => {
    const chapters = gsap.utils.toArray('.event-chapter', section)

    chapters.forEach((chapter) => {
      const copy = chapter.querySelector('.event-chapter__copy')
      const media = chapter.querySelector('.event-chapter__media')
      const opening = chapter.querySelector('.event-chapter__opening')
      const title = chapter.querySelector('h3')
      const description = chapter.querySelector('.event-chapter__description')
      const evidence = chapter.querySelector('.event-chapter__evidence')
      const quote = chapter.querySelector('.event-chapter__quote')
      const closing = chapter.querySelector('.event-chapter__closing')

      gsap.set([copy, media, closing].filter(Boolean), { autoAlpha: 0 })
      gsap.set([opening, title, description, evidence, quote].filter(Boolean), { y: 24, autoAlpha: 0 })

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: chapter,
          start: 'top 78%',
          end: 'bottom 25%',
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      })

      timeline
        .to(copy, { autoAlpha: 1, duration: 0.18 }, 0)
        .to(media, { autoAlpha: 1, duration: 0.22 }, 0.04)
        .to(opening, { y: 0, autoAlpha: 1, duration: 0.16 }, 0.1)
        .to(title, { y: 0, autoAlpha: 1, duration: 0.2 }, 0.15)
        .to(description, { y: 0, autoAlpha: 1, duration: 0.16 }, 0.25)
        .to(evidence, { y: 0, autoAlpha: 1, duration: 0.15 }, 0.39)
        .to(quote, { y: 0, autoAlpha: 1, duration: 0.15 }, 0.44)
        .to(closing, { autoAlpha: 0.72, duration: 0.18 }, 0.64)

      gsap.to(media, {
        yPercent: chapter.classList.contains('event-chapter--intensity') ? -4 : 4,
        ease: 'none',
        scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })

    const bridge = section.querySelector('.event-impact-bridge')
    if (bridge) {
      const impact = bridge.querySelector('span')
      const line = bridge.querySelector('i')
      const achievements = bridge.querySelector('strong')
      gsap.set([impact, line, achievements], { autoAlpha: 0 })
      gsap.timeline({
        scrollTrigger: { trigger: bridge, start: 'top 78%', end: 'bottom 38%', scrub: 1.1 },
      })
        .to(impact, { autoAlpha: 0.7, y: 0, duration: 0.3 })
        .to(line, { autoAlpha: 1, scaleX: 1, duration: 0.22 }, 0.25)
        .to(impact, { y: -40, scale: 0.75, autoAlpha: 0.24, duration: 0.3 }, 0.48)
        .to(achievements, { autoAlpha: 0.9, y: 0, duration: 0.3 }, 0.55)
    }
  }, section)

  ScrollTrigger.refresh()
  return () => context.revert()
}
