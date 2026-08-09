import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * One smooth-scroll clock for the experience. Scene 2 scrubs against the
 * existing Hero runway, so no second scroll container or nested scrollbar is
 * introduced.
 */
export function createScrollTimeline({ stage, scene, reducedMotion = false }) {
  if (!stage || !scene || reducedMotion) return () => {}

  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false })
  const onLenisScroll = () => ScrollTrigger.update()
  const tick = (time) => lenis.raf(time * 1000)

  lenis.on('scroll', onLenisScroll)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  const context = gsap.context(() => {
    const fragments = gsap.utils.toArray('[data-word-fragment]', scene)
    const particles = gsap.utils.toArray('.scene2-particle', scene)
    const connections = gsap.utils.toArray('.scene2-connection', scene)

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.15,
        invalidateOnRefresh: true,
      },
    })

    const heroSelectors = '.hero-eyebrow, .hero-tagline, .hero-actions, .hero-social, .hero-meta, .hero-scroll-cue'

    // The Hero exhales first. Scene 2 remains hidden until the badge is the
    // final source of light, then the sentence is allowed to arrive alone.
    timeline
      .to(heroSelectors, { autoAlpha: 0, duration: 0.24, stagger: 0.02 }, 0.02)
      .to('.hero-title', { autoAlpha: 0.14, y: -26, duration: 0.32 }, 0.08)
      .to('.innovation-badge', { scale: 1.12, filter: 'brightness(1.15)', duration: 0.3 }, 0.1)
      .to('.hero-orbits, .energy-system', { autoAlpha: 0.18, duration: 0.34 }, 0.11)
      .fromTo(scene, { autoAlpha: 0, scale: 0.74 }, { autoAlpha: 1, scale: 1, duration: 0.2 }, 0.24)
      // The camera pulls back, settles for the silence, then moves forward.
      .fromTo('.scene2-camera', { scale: 0.9 }, { scale: 0.955, duration: 0.28 }, 0.24)
      .to('.scene2-camera', { scale: 0.97, duration: 0.12 }, 0.52)
      .fromTo('.scene2-sentence__step:nth-child(1)', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.56)
      .to('.scene2-camera', { scale: 1.025, duration: 0.44 }, 0.57)
      // The sentence unfolds one thought at a time, with no static hold.
      .to('.scene2-sentence__step:nth-child(1)', { autoAlpha: 0, y: -8, duration: 0.08 }, 0.64)
      .fromTo('.scene2-sentence__step:nth-child(2)', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.64)
      .to('.scene2-sentence__step:nth-child(2)', { autoAlpha: 0, y: -8, duration: 0.08 }, 0.7)
      .fromTo('.scene2-sentence__step:nth-child(3)', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.7)
      .to('.scene2-sentence__step:nth-child(3)', { autoAlpha: 0, y: -8, duration: 0.08 }, 0.77)
      .fromTo('.scene2-sentence__step:nth-child(4)', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.77)
      .to('.scene2-sentence__step:nth-child(4)', { autoAlpha: 0, y: -8, duration: 0.08 }, 0.84)
      .fromTo('.scene2-sentence__step:nth-child(5)', { autoAlpha: 0, y: 14 }, { autoAlpha: 0.78, y: 0, duration: 0.1 }, 0.84)
      // The words are already becoming material as the last phrase lands.
      .fromTo(particles, { autoAlpha: 0, scale: 0.15 }, { autoAlpha: 0.78, scale: 1, stagger: 0.008, duration: 0.3 }, 0.72)
      .fromTo(connections, { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 0.72, transformOrigin: 'left center', stagger: 0.025, duration: 0.28 }, 0.75)
      .to('.scene2-sentence', { scale: 0.9, filter: 'blur(1px)', duration: 0.22 }, 0.9)
      .to(fragments, { autoAlpha: 0.52, y: -8, scale: 0.9, filter: 'blur(.6px)', stagger: 0.018, duration: 0.25 }, 0.88)
      .to('.scene2-world', { scale: 1.16, opacity: 0.92, duration: 0.28 }, 0.86)
      .fromTo('.scene2-handoff', { autoAlpha: 0, scale: 0.84 }, { autoAlpha: 1, scale: 1, duration: 0.22 }, 0.93)
      .to('.scene2', { scale: 1.04, opacity: 1, duration: 0.18 }, 0.94)
  }, scene)

  ScrollTrigger.refresh()

  return () => {
    context.revert()
    lenis.off('scroll', onLenisScroll)
    gsap.ticker.remove(tick)
    lenis.destroy()
  }
}
